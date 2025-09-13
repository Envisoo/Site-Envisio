/** @format */

import express from "express";
import { Router } from "express";
import { db } from "../db/conexao.js";
import { verificarToken } from "../middlewares/auth.js";

const router = Router();

// Rota para listar todos os cursos
router.get("/", async (req, res) => {
  try {
    const cursos = await db.query("SELECT * FROM cursos");
    res.json(cursos.rows);
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Obter um curso específico
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await db.query(
      `
      SELECT 
        id,
        titulo,
        descricao,
        categoria,
        duracao,
        nivel,
        preco,
        status,
        acesso_vitalicio,
        suporte,
        certificado,
        visualizacoes,
        avaliacao,
        instrutor_nome,
        instrutor_avaliacao,
        instrutor_alunos,
        instrutor_aulas,
        criado_em
      FROM cursos 
      WHERE id = $1
    `,
      [id]
    );

    if (resultado.rows.length === 0)
      return res.status(404).json({ mensagem: "Curso não encontrado." });

    const curso = resultado.rows[0];

    // Formatar dados
    const cursoFormatado = {
      id: curso.id.toString(),
      titulo: curso.titulo,
      descricao: curso.descricao,
      categoria: curso.categoria,
      duracao: curso.duracao || 0,
      nivel: curso.nivel || "iniciante",
      preco: parseFloat(curso.preco) || 0,
      status: curso.status || "disponivel",
      acessoVitalicio: curso.acesso_vitalicio || false,
      suporte: curso.suporte || false,
      certificado: curso.certificado || false,
      visualizacoes: curso.visualizacoes || 0,
      avaliacao: parseFloat(curso.avaliacao) || 0,
      instrutor: {
        nome: curso.instrutor_nome || "Instrutor",
        avaliacao: parseFloat(curso.instrutor_avaliacao) || 0,
        alunos: curso.instrutor_alunos || 0,
        aulas: curso.instrutor_aulas || 0,
      },
    };

    res.json(cursoFormatado);
  } catch (erro) {
    console.error("Erro ao buscar curso:", erro);
    res.status(500).json({ mensagem: "Erro interno ao buscar o curso." });
  }
});

// Buscar cursos com filtros (título, categoria, etc)
router.get("/buscar", async (req, res) => {
  const {
    titulo,
    categoria,
    instrutor,
    status,
    pagina = 1,
    limite = 6,
    ordenacao = "recentes",
    busca,
  } = req.query;

  // Montar condições dinamicamente
  const condicoes = [];
  const valores = [];
  let contador = 1;

  if (titulo) {
    valores.push(`%${titulo}%`);
    condicoes.push(`titulo ILIKE $${contador}`);
    contador++;
  }

  if (categoria) {
    valores.push(categoria);
    condicoes.push(`categoria = $${contador}`);
    contador++;
  }

  if (instrutor) {
    valores.push(`%${instrutor}%`);
    condicoes.push(`instrutor_nome ILIKE $${contador}`);
    contador++;
  }

  if (status) {
    valores.push(status);
    condicoes.push(`status = $${contador}`);
    contador++;
  }

  // Adicionar busca textual se fornecida
  if (busca) {
    valores.push(`%${busca}%`);
    condicoes.push(
      `(titulo ILIKE $${contador} OR descricao ILIKE $${contador})`
    );
    contador++;
  }

  const where = condicoes.length > 0 ? `WHERE ${condicoes.join(" AND ")}` : "";

  // Definir ordenação
  let orderBy = "criado_em DESC";
  switch (ordenacao) {
    case "antigos":
      orderBy = "criado_em ASC";
      break;
    case "avaliacoes":
      orderBy = "avaliacao DESC";
      break;
    case "alunos":
      orderBy = "instrutor_alunos DESC";
      break;
    default:
      orderBy = "criado_em DESC";
  }

  try {
    // Primeiro, buscar o total de resultados para paginação
    const totalResultados = await db.query(
      `SELECT COUNT(*) FROM cursos ${where}`,
      valores
    );

    // Calcular offset para paginação
    const offset = (pagina - 1) * limite;
    valores.push(limite);
    valores.push(offset);

    const resultado = await db.query(
      `
      SELECT 
        id,
        titulo,
        descricao,
        categoria,
        duracao,
        nivel,
        preco,
        status,
        acesso_vitalicio,
        suporte,
        certificado,
        visualizacoes,
        avaliacao,
        instrutor_nome,
        instrutor_avaliacao,
        instrutor_alunos,
        instrutor_aulas,
        criado_em
      FROM cursos 
      ${where}
      ORDER BY ${orderBy}
      LIMIT $${contador} OFFSET $${contador + 1}
    `,
      valores
    );

    // Transformar dados
    const cursosFormatados = resultado.rows.map((curso) => ({
      id: curso.id.toString(),
      titulo: curso.titulo,
      descricao: curso.descricao,
      categoria: curso.categoria,
      duracao: curso.duracao || 0,
      nivel: curso.nivel || "iniciante",
      preco: parseFloat(curso.preco) || 0,
      status: curso.status || "disponivel",
      acessoVitalicio: curso.acesso_vitalicio || false,
      suporte: curso.suporte || false,
      certificado: curso.certificado || false,
      visualizacoes: curso.visualizacoes || 0,
      avaliacao: parseFloat(curso.avaliacao) || 0,
      instrutor: {
        nome: curso.instrutor_nome || "Instrutor",
        avaliacao: parseFloat(curso.instrutor_avaliacao) || 0,
        alunos: curso.instrutor_alunos || 0,
        aulas: curso.instrutor_aulas || 0,
      },
    }));

    res.status(200).json({
      sucesso: true,
      cursos: cursosFormatados,
      paginacao: {
        total: parseInt(totalResultados.rows[0].count),
        pagina: parseInt(pagina),
        limite: parseInt(limite),
        totalPaginas: Math.ceil(
          parseInt(totalResultados.rows[0].count) / limite
        ),
      },
    });
  } catch (erro) {
    console.error("Erro ao buscar cursos:", erro);
    res.status(500).json({ erro: "Erro ao buscar cursos" });
  }
});

// Listar aulas de um curso (usuário autenticado)
router.get("/:id/aulas", verificarToken, async (req, res) => {
  const cursoId = req.params.id;
  try {
    const resultado = await db.query(
      "SELECT * FROM aulas WHERE curso_id = $1 ORDER BY ordem ASC",
      [cursoId]
    );
    res.status(200).json(resultado.rows);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao listar aulas" });
  }
});

// Obter detalhes de uma aula (usuário autenticado)
router.get("/aulas/:id", verificarToken, async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await db.query("SELECT * FROM aulas WHERE id = $1", [id]);
    if (resultado.rows.length === 0)
      return res.status(404).json({ erro: "Aula não encontrada" });

    res.status(200).json(resultado.rows[0]);
  } catch (erro) {
    res.status(500).json({ erro: "Erro interno ao buscar aula" });
  }
});

// **************** POSTs (Somente Admin/Instrutor) **************** //

// Criar novo curso
router.post("/", verificarToken, async (req, res) => {
  const { titulo, descricao, imagem } = req.body;
  const { nome } = req.usuario;

  if (!titulo || !descricao) {
    return res
      .status(400)
      .json({ mensagem: "Título e descrição são obrigatórios." });
  }

  try {
    const resultado = await db.query(
      `INSERT INTO cursos (titulo, descricao, imagem, instrutor, criado_em)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [titulo, descricao, imagem, nome, new Date()]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro interno ao cadastrar curso." });
  }
});

// Adicionar nova aula a um curso
router.post("/:id/aulas", verificarToken, async (req, res) => {
  const cursoId = req.params.id;
  const { titulo, descricao, video_url, material_url, ordem } = req.body;

  try {
    const cursoExiste = await db.query("SELECT * FROM cursos WHERE id = $1", [
      cursoId,
    ]);
    if (cursoExiste.rowCount === 0)
      return res.status(404).json({ erro: "Curso não encontrado" });

    const resultado = await db.query(
      `INSERT INTO aulas (titulo, descricao, video_url, material_url, ordem, curso_id)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [titulo, descricao, video_url, material_url, ordem, cursoId]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao adicionar aula" });
  }
});

// **************** PUTs (Somente Admin/Instrutor) **************** //

// Editar curso
router.put("/:id", verificarToken, async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, imagem, instrutor } = req.body;

  if (!titulo || !descricao) {
    return res
      .status(400)
      .json({ mensagem: "Título e descrição são obrigatórios." });
  }

  try {
    const verificarCurso = await db.query(
      "SELECT * FROM cursos WHERE id = $1",
      [id]
    );
    if (verificarCurso.rows.length === 0) {
      return res.status(404).json({ mensagem: "Curso não encontrado." });
    }

    const comandoSQL = `
        UPDATE cursos SET 
          titulo = $1, 
          descricao = $2, 
          imagem = $3, 
          instrutor = $4 
        WHERE id = $5 RETURNING *;
      `;

    const valores = [titulo, descricao, imagem, instrutor, id];
    const resultado = await db.query(comandoSQL, valores);

    res.status(200).json({
      sucesso: true,
      mensagem: "Curso atualizado com sucesso!",
      dados: resultado.rows[0],
    });
  } catch (erro) {
    res
      .status(500)
      .json({ sucesso: false, mensagem: "Erro ao editar o curso." });
  }
});

// Editar aula
router.put("/aulas/:id", verificarToken, async (req, res) => {
  const aulaId = req.params.id;
  const { titulo, descricao, video_url, material_url, ordem } = req.body;

  try {
    const resultado = await db.query(
      `UPDATE aulas 
         SET titulo = $1, descricao = $2, video_url = $3, material_url = $4, ordem = $5 
         WHERE id = $6`,
      [titulo, descricao, video_url, material_url, ordem, aulaId]
    );

    if (resultado.rowCount === 0)
      return res.status(404).json({ erro: "Aula não encontrada" });

    res.status(200).json({ mensagem: "Aula atualizada com sucesso" });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao atualizar aula" });
  }
});

// **************** DELETEs (Somente Admin/Instrutor) **************** //

// Excluir curso
router.delete("/:id", verificarToken, async (req, res) => {
  const { id } = req.params;

  try {
    const curso = await db.query("SELECT * FROM cursos WHERE id = $1", [id]);
    if (curso.rows.length === 0)
      return res.status(404).json({ mensagem: "Curso não encontrado." });

    await db.query("DELETE FROM cursos WHERE id = $1", [id]);
    res.json({ mensagem: "Curso excluído com sucesso!" });
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro interno ao excluir o curso." });
  }
});

// Excluir aula
router.delete("/aulas/:id", verificarToken, async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await db.query("DELETE FROM aulas WHERE id = $1", [id]);
    if (resultado.rowCount === 0)
      return res.status(404).json({ erro: "Aula não encontrada" });

    res.status(200).json({ mensagem: "Aula apagada com sucesso" });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao apagar aula" });
  }
});

export default router;
