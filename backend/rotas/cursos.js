/** @format */

const express = require("express");
const roteador = express.Router();
const baseDados = require("../configuracoes/baseDados");

// Middlewares de autenticação e autorização
const autenticar = require("../middleware/autenticar");
const autorizarPapel = require("../middleware/autorizarPapel");

// **************** GETs (Públicos ou Autenticados) **************** //

// Listar todos os cursos (acesso público)
roteador.get("/", autenticar, async (req, res) => {
  try {
    const resultado = await baseDados.query(
      "SELECT * FROM cursos ORDER BY id DESC"
    );
    res.json(resultado.rows);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro interno ao buscar cursos" });
  }
});

// Obter um curso específico
roteador.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await baseDados.query(
      "SELECT * FROM cursos WHERE id = $1",
      [id]
    );
    if (resultado.rows.length === 0)
      return res.status(404).json({ mensagem: "Curso não encontrado." });

    res.json(resultado.rows[0]);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro interno ao buscar o curso." });
  }
});

// Buscar cursos com filtros (título, categoria, etc)
roteador.get("/", async (req, res) => {
  const { titulo, categoria, instrutor } = req.query;

  // Montar condições dinamicamente
  const condicoes = [];
  const valores = [];

  if (titulo) {
    valores.push(`%${titulo}%`);
    condicoes.push(`c.titulo ILIKE $${valores.length}`);
  }

  if (categoria) {
    valores.push(categoria);
    condicoes.push(`c.categoria = $${valores.length}`);
  }

  if (instrutor) {
    valores.push(instrutor);
    condicoes.push(`u.nome ILIKE $${valores.length}`);
  }

  const where = condicoes.length > 0 ? `WHERE ${condicoes.join(" AND ")}` : "";

  try {
    const resultado = await db.query(
      `SELECT c.*, u.nome AS nome_instrutor
       FROM cursos c
       JOIN usuarios u ON u.id = c.instrutor_id
       ${where}
       ORDER BY c.id DESC`,
      valores
    );

    res.status(200).json({
      sucesso: true,
      cursos: resultado.rows,
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao buscar cursos" });
  }
});

// Listar aulas de um curso (usuário autenticado)
roteador.get("/:id/aulas", autenticar, async (req, res) => {
  const cursoId = req.params.id;
  try {
    const resultado = await baseDados.query(
      "SELECT * FROM aulas WHERE curso_id = $1 ORDER BY ordem ASC",
      [cursoId]
    );
    res.status(200).json(resultado.rows);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao listar aulas" });
  }
});

// Obter detalhes de uma aula (usuário autenticado)
roteador.get("/aulas/:id", autenticar, async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await baseDados.query(
      "SELECT * FROM aulas WHERE id = $1",
      [id]
    );
    if (resultado.rows.length === 0)
      return res.status(404).json({ erro: "Aula não encontrada" });

    res.status(200).json(resultado.rows[0]);
  } catch (erro) {
    res.status(500).json({ erro: "Erro interno ao buscar aula" });
  }
});

// **************** POSTs (Somente Admin/Instrutor) **************** //

// Criar novo curso
roteador.post(
  "/",
  autenticar,
  autorizarPapel("admin", "instrutor"),
  async (req, res) => {
    const { titulo, descricao, imagem } = req.body;
    const { nome } = req.usuario;

    if (!titulo || !descricao) {
      return res
        .status(400)
        .json({ mensagem: "Título e descrição são obrigatórios." });
    }

    try {
      const resultado = await baseDados.query(
        `INSERT INTO cursos (titulo, descricao, imagem, instrutor, criado_em)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [titulo, descricao, imagem, nome, new Date()]
      );
      res.status(201).json(resultado.rows[0]);
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro interno ao cadastrar curso." });
    }
  }
);

// Adicionar nova aula a um curso
roteador.post(
  "/:id/aulas",
  autenticar,
  autorizarPapel("admin", "instrutor"),
  async (req, res) => {
    const cursoId = req.params.id;
    const { titulo, descricao, video_url, material_url, ordem } = req.body;

    try {
      const cursoExiste = await baseDados.query(
        "SELECT * FROM cursos WHERE id = $1",
        [cursoId]
      );
      if (cursoExiste.rowCount === 0)
        return res.status(404).json({ erro: "Curso não encontrado" });

      const resultado = await baseDados.query(
        `INSERT INTO aulas (titulo, descricao, video_url, material_url, ordem, curso_id)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [titulo, descricao, video_url, material_url, ordem, cursoId]
      );
      res.status(201).json(resultado.rows[0]);
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao adicionar aula" });
    }
  }
);

// **************** PUTs (Somente Admin/Instrutor) **************** //

// Editar curso
roteador.put(
  "/:id",
  autenticar,
  autorizarPapel("admin", "instrutor"),
  async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, imagem, instrutor } = req.body;

    if (!titulo || !descricao) {
      return res
        .status(400)
        .json({ mensagem: "Título e descrição são obrigatórios." });
    }

    try {
      const verificarCurso = await baseDados.query(
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
      const resultado = await baseDados.query(comandoSQL, valores);

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
  }
);

// Editar aula
roteador.put(
  "/aulas/:id",
  autenticar,
  autorizarPapel("admin", "instrutor"),
  async (req, res) => {
    const aulaId = req.params.id;
    const { titulo, descricao, video_url, material_url, ordem } = req.body;

    try {
      const resultado = await baseDados.query(
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
  }
);

// **************** DELETEs (Somente Admin/Instrutor) **************** //

// Excluir curso
roteador.delete(
  "/:id",
  autenticar,
  autorizarPapel("admin", "instrutor"),
  async (req, res) => {
    const { id } = req.params;

    try {
      const curso = await baseDados.query(
        "SELECT * FROM cursos WHERE id = $1",
        [id]
      );
      if (curso.rows.length === 0)
        return res.status(404).json({ mensagem: "Curso não encontrado." });

      await baseDados.query("DELETE FROM cursos WHERE id = $1", [id]);
      res.json({ mensagem: "Curso excluído com sucesso!" });
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro interno ao excluir o curso." });
    }
  }
);

// Excluir aula
roteador.delete(
  "/aulas/:id",
  autenticar,
  autorizarPapel("admin", "instrutor"),
  async (req, res) => {
    const { id } = req.params;

    try {
      const resultado = await baseDados.query(
        "DELETE FROM aulas WHERE id = $1",
        [id]
      );
      if (resultado.rowCount === 0)
        return res.status(404).json({ erro: "Aula não encontrada" });

      res.status(200).json({ mensagem: "Aula apagada com sucesso" });
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao apagar aula" });
    }
  }
);

module.exports = roteador;
