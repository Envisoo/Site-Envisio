/** @format */

import express from "express";
import { Router } from "express";
import { db } from "../db/conexao.js";
import { autenticar } from "../middlewares/autenticar.js";
import { autorizarPapel } from "../middlewares/autorizarPapel.js";
import exceljs from "exceljs";
import { enviarNotificacao } from "../utils/notificacao.js";
import PDFDocument from "pdfkit";

const router = Router();

// ==================== ROTAS ESPECÍFICAS DO INSTRUTOR ====================

// Ver cursos criados pelo instrutor com estatísticas
router.get(
  "/meus-cursos",
  autenticar,
  autorizarPapel("instrutor"),
  async (req, res) => {
    const instrutorId = req.usuario.id;

    try {
      const resultado = await db.query(
        `
        SELECT 
          c.id,
          c.titulo,
          c.descricao,
          c.categoria,
          c.duracao,
          c.nivel,
          c.preco,
          c.status,
          c.visualizacoes,
          c.avaliacao,
          COUNT(DISTINCT i.usuario_id) AS total_inscritos,
          ROUND(AVG(a.nota), 1) AS media_avaliacoes,
          COUNT(DISTINCT f.usuario_id) AS total_favoritos,
          COUNT(DISTINCT m.id) AS total_modulos,
          COUNT(DISTINCT au.id) AS total_aulas
        FROM cursos c
        LEFT JOIN inscricoes i ON i.curso_id = c.id
        LEFT JOIN avaliacoes a ON a.curso_id = c.id
        LEFT JOIN favoritos f ON f.curso_id = c.id
        LEFT JOIN modulos m ON m.curso_id = c.id
        LEFT JOIN aulas au ON au.curso_id = c.id
        WHERE c.instrutor_id = $1
        GROUP BY c.id, c.titulo, c.descricao, c.categoria, c.duracao, c.nivel, c.preco, c.status, c.visualizacoes, c.avaliacao
        ORDER BY c.criado_em DESC
      `,
        [instrutorId]
      );

      res.status(200).json({
        sucesso: true,
        cursos: resultado.rows,
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao buscar dados do instrutor" });
    }
  }
);

// Criar novo curso
router.post(
  "/cursos",
  autenticar,
  autorizarPapel("instrutor"),
  async (req, res) => {
    const instrutorId = req.usuario.id;
    const {
      titulo,
      descricao,
      categoria,
      duracao,
      nivel,
      preco,
      status = "rascunho",
      acesso_vitalicio = false,
      suporte = false,
      certificado = false,
      imagem,
    } = req.body;

    if (!titulo || !descricao || !categoria) {
      return res.status(400).json({
        erro: "Título, descrição e categoria são obrigatórios",
      });
    }

    try {
      const resultado = await db.query(
        `INSERT INTO cursos (
          titulo, descricao, categoria, duracao, nivel, preco, status,
          acesso_vitalicio, suporte, certificado, imagem, instrutor_id, criado_em
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())
        RETURNING *`,
        [
          titulo,
          descricao,
          categoria,
          duracao || 0,
          nivel || "iniciante",
          preco || 0,
          status,
          acesso_vitalicio,
          suporte,
          certificado,
          imagem,
          instrutorId,
        ]
      );

      res.status(201).json({
        sucesso: true,
        mensagem: "Curso criado com sucesso",
        curso: resultado.rows[0],
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao criar curso" });
    }
  }
);

// Editar curso
router.put(
  "/cursos/:id",
  autenticar,
  autorizarPapel("instrutor"),
  async (req, res) => {
    const { id } = req.params;
    const instrutorId = req.usuario.id;
    const {
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
      imagem,
    } = req.body;

    try {
      // Verifica se o curso pertence ao instrutor
      const curso = await db.query(
        "SELECT * FROM cursos WHERE id = $1 AND instrutor_id = $2",
        [id, instrutorId]
      );

      if (curso.rowCount === 0) {
        return res.status(403).json({
          erro: "Curso não encontrado ou acesso negado",
        });
      }

      const resultado = await db.query(
        `UPDATE cursos SET 
          titulo = COALESCE($1, titulo),
          descricao = COALESCE($2, descricao),
          categoria = COALESCE($3, categoria),
          duracao = COALESCE($4, duracao),
          nivel = COALESCE($5, nivel),
          preco = COALESCE($6, preco),
          status = COALESCE($7, status),
          acesso_vitalicio = COALESCE($8, acesso_vitalicio),
          suporte = COALESCE($9, suporte),
          certificado = COALESCE($10, certificado),
          imagem = COALESCE($11, imagem),
          atualizado_em = NOW()
        WHERE id = $12 AND instrutor_id = $13
        RETURNING *`,
        [
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
          imagem,
          id,
          instrutorId,
        ]
      );

      res.status(200).json({
        sucesso: true,
        mensagem: "Curso atualizado com sucesso",
        curso: resultado.rows[0],
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao atualizar curso" });
    }
  }
);

// Excluir curso
router.delete(
  "/cursos/:id",
  autenticar,
  autorizarPapel("instrutor"),
  async (req, res) => {
    const { id } = req.params;
    const instrutorId = req.usuario.id;

    try {
      // Verifica se o curso pertence ao instrutor
      const curso = await db.query(
        "SELECT * FROM cursos WHERE id = $1 AND instrutor_id = $2",
        [id, instrutorId]
      );

      if (curso.rowCount === 0) {
        return res.status(403).json({
          erro: "Curso não encontrado ou acesso negado",
        });
      }

      // Exclui o curso e todas as dependências
      await db.query("DELETE FROM cursos WHERE id = $1", [id]);

      res.status(200).json({
        sucesso: true,
        mensagem: "Curso excluído com sucesso",
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao excluir curso" });
    }
  }
);

// Obter detalhes de um curso específico
router.get(
  "/cursos/:id",
  autenticar,
  autorizarPapel("instrutor"),
  async (req, res) => {
    const { id } = req.params;
    const instrutorId = req.usuario.id;

    try {
      const resultado = await db.query(
        `SELECT 
          c.*,
          COUNT(DISTINCT i.usuario_id) AS total_inscritos,
          ROUND(AVG(a.nota), 1) AS media_avaliacoes,
          COUNT(DISTINCT f.usuario_id) AS total_favoritos,
          COUNT(DISTINCT m.id) AS total_modulos,
          COUNT(DISTINCT au.id) AS total_aulas
        FROM cursos c
        LEFT JOIN inscricoes i ON i.curso_id = c.id
        LEFT JOIN avaliacoes a ON a.curso_id = c.id
        LEFT JOIN favoritos f ON f.curso_id = c.id
        LEFT JOIN modulos m ON m.curso_id = c.id
        LEFT JOIN aulas au ON au.curso_id = c.id
        WHERE c.id = $1 AND c.instrutor_id = $2
        GROUP BY c.id`,
        [id, instrutorId]
      );

      if (resultado.rowCount === 0) {
        return res.status(404).json({
          erro: "Curso não encontrado",
        });
      }

      res.status(200).json({
        sucesso: true,
        curso: resultado.rows[0],
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao buscar curso" });
    }
  }
);

// ==================== GERENCIAMENTO DE AULAS ====================

// Listar aulas de um curso
router.get(
  "/cursos/:cursoId/aulas",
  autenticar,
  autorizarPapel("instrutor"),
  async (req, res) => {
    const { cursoId } = req.params;
    const instrutorId = req.usuario.id;

    try {
      // Verifica se o curso pertence ao instrutor
      const curso = await db.query(
        "SELECT * FROM cursos WHERE id = $1 AND instrutor_id = $2",
        [cursoId, instrutorId]
      );

      if (curso.rowCount === 0) {
        return res.status(403).json({
          erro: "Curso não encontrado ou acesso negado",
        });
      }

      const resultado = await db.query(
        `SELECT a.*, m.titulo AS modulo_titulo
         FROM aulas a
         LEFT JOIN modulos m ON m.id = a.modulo_id
         WHERE a.curso_id = $1
         ORDER BY m.ordem ASC, a.ordem ASC`,
        [cursoId]
      );

      res.status(200).json({
        sucesso: true,
        aulas: resultado.rows,
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao listar aulas" });
    }
  }
);

// Criar nova aula
router.post(
  "/cursos/:cursoId/aulas",
  autenticar,
  autorizarPapel("instrutor"),
  async (req, res) => {
    const { cursoId } = req.params;
    const instrutorId = req.usuario.id;
    const {
      titulo,
      descricao,
      video_url,
      material_url,
      duracao,
      ordem,
      modulo_id,
      livre = false,
    } = req.body;

    if (!titulo || !descricao) {
      return res.status(400).json({
        erro: "Título e descrição são obrigatórios",
      });
    }

    try {
      // Verifica se o curso pertence ao instrutor
      const curso = await db.query(
        "SELECT * FROM cursos WHERE id = $1 AND instrutor_id = $2",
        [cursoId, instrutorId]
      );

      if (curso.rowCount === 0) {
        return res.status(403).json({
          erro: "Curso não encontrado ou acesso negado",
        });
      }

      const resultado = await db.query(
        `INSERT INTO aulas (
          curso_id, modulo_id, titulo, descricao, video_url, material_url, 
          duracao, ordem, livre, criado_em
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
        RETURNING *`,
        [
          cursoId,
          modulo_id,
          titulo,
          descricao,
          video_url,
          material_url,
          duracao || 0,
          ordem || 0,
          livre,
        ]
      );

      res.status(201).json({
        sucesso: true,
        mensagem: "Aula criada com sucesso",
        aula: resultado.rows[0],
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao criar aula" });
    }
  }
);

// Editar aula
router.put(
  "/aulas/:id",
  autenticar,
  autorizarPapel("instrutor"),
  async (req, res) => {
    const { id } = req.params;
    const instrutorId = req.usuario.id;
    const {
      titulo,
      descricao,
      video_url,
      material_url,
      duracao,
      ordem,
      modulo_id,
      livre,
    } = req.body;

    try {
      // Verifica se a aula pertence a um curso do instrutor
      const aula = await db.query(
        `SELECT a.* FROM aulas a
         JOIN cursos c ON c.id = a.curso_id
         WHERE a.id = $1 AND c.instrutor_id = $2`,
        [id, instrutorId]
      );

      if (aula.rowCount === 0) {
        return res.status(403).json({
          erro: "Aula não encontrada ou acesso negado",
        });
      }

      const resultado = await db.query(
        `UPDATE aulas SET 
          titulo = COALESCE($1, titulo),
          descricao = COALESCE($2, descricao),
          video_url = COALESCE($3, video_url),
          material_url = COALESCE($4, material_url),
          duracao = COALESCE($5, duracao),
          ordem = COALESCE($6, ordem),
          modulo_id = COALESCE($7, modulo_id),
          livre = COALESCE($8, livre)
        WHERE id = $9
        RETURNING *`,
        [
          titulo,
          descricao,
          video_url,
          material_url,
          duracao,
          ordem,
          modulo_id,
          livre,
          id,
        ]
      );

      res.status(200).json({
        sucesso: true,
        mensagem: "Aula atualizada com sucesso",
        aula: resultado.rows[0],
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao atualizar aula" });
    }
  }
);

// Excluir aula
router.delete(
  "/aulas/:id",
  autenticar,
  autorizarPapel("instrutor"),
  async (req, res) => {
    const { id } = req.params;
    const instrutorId = req.usuario.id;

    try {
      // Verifica se a aula pertence a um curso do instrutor
      const aula = await db.query(
        `SELECT a.* FROM aulas a
         JOIN cursos c ON c.id = a.curso_id
         WHERE a.id = $1 AND c.instrutor_id = $2`,
        [id, instrutorId]
      );

      if (aula.rowCount === 0) {
        return res.status(403).json({
          erro: "Aula não encontrada ou acesso negado",
        });
      }

      await db.query("DELETE FROM aulas WHERE id = $1", [id]);

      res.status(200).json({
        sucesso: true,
        mensagem: "Aula excluída com sucesso",
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao excluir aula" });
    }
  }
);

// ==================== GERENCIAMENTO DE MÓDULOS ====================

// Listar módulos de um curso
router.get(
  "/cursos/:cursoId/modulos",
  autenticar,
  autorizarPapel("instrutor"),
  async (req, res) => {
    const { cursoId } = req.params;
    const instrutorId = req.usuario.id;

    try {
      // Verifica se o curso pertence ao instrutor
      const curso = await db.query(
        "SELECT * FROM cursos WHERE id = $1 AND instrutor_id = $2",
        [cursoId, instrutorId]
      );

      if (curso.rowCount === 0) {
        return res.status(403).json({
          erro: "Curso não encontrado ou acesso negado",
        });
      }

      const resultado = await db.query(
        `SELECT m.*, COUNT(a.id) AS total_aulas
         FROM modulos m
         LEFT JOIN aulas a ON a.modulo_id = m.id
         WHERE m.curso_id = $1
         GROUP BY m.id
         ORDER BY m.ordem ASC`,
        [cursoId]
      );

      res.status(200).json({
        sucesso: true,
        modulos: resultado.rows,
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao listar módulos" });
    }
  }
);

// Criar novo módulo
router.post(
  "/cursos/:cursoId/modulos",
  autenticar,
  autorizarPapel("instrutor"),
  async (req, res) => {
    const { cursoId } = req.params;
    const instrutorId = req.usuario.id;
    const { titulo, descricao, ordem } = req.body;

    if (!titulo) {
      return res.status(400).json({
        erro: "Título é obrigatório",
      });
    }

    try {
      // Verifica se o curso pertence ao instrutor
      const curso = await db.query(
        "SELECT * FROM cursos WHERE id = $1 AND instrutor_id = $2",
        [cursoId, instrutorId]
      );

      if (curso.rowCount === 0) {
        return res.status(403).json({
          erro: "Curso não encontrado ou acesso negado",
        });
      }

      const resultado = await db.query(
        `INSERT INTO modulos (curso_id, titulo, descricao, ordem)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [cursoId, titulo, descricao || "", ordem || 0]
      );

      res.status(201).json({
        sucesso: true,
        mensagem: "Módulo criado com sucesso",
        modulo: resultado.rows[0],
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao criar módulo" });
    }
  }
);

// Editar módulo
router.put(
  "/modulos/:id",
  autenticar,
  autorizarPapel("instrutor"),
  async (req, res) => {
    const { id } = req.params;
    const instrutorId = req.usuario.id;
    const { titulo, descricao, ordem } = req.body;

    try {
      // Verifica se o módulo pertence a um curso do instrutor
      const modulo = await db.query(
        `SELECT m.* FROM modulos m
         JOIN cursos c ON c.id = m.curso_id
         WHERE m.id = $1 AND c.instrutor_id = $2`,
        [id, instrutorId]
      );

      if (modulo.rowCount === 0) {
        return res.status(403).json({
          erro: "Módulo não encontrado ou acesso negado",
        });
      }

      const resultado = await db.query(
        `UPDATE modulos SET 
          titulo = COALESCE($1, titulo),
          descricao = COALESCE($2, descricao),
          ordem = COALESCE($3, ordem)
        WHERE id = $4
        RETURNING *`,
        [titulo, descricao, ordem, id]
      );

      res.status(200).json({
        sucesso: true,
        mensagem: "Módulo atualizado com sucesso",
        modulo: resultado.rows[0],
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao atualizar módulo" });
    }
  }
);

// Excluir módulo
router.delete(
  "/modulos/:id",
  autenticar,
  autorizarPapel("instrutor"),
  async (req, res) => {
    const { id } = req.params;
    const instrutorId = req.usuario.id;

    try {
      // Verifica se o módulo pertence a um curso do instrutor
      const modulo = await db.query(
        `SELECT m.* FROM modulos m
         JOIN cursos c ON c.id = m.curso_id
         WHERE m.id = $1 AND c.instrutor_id = $2`,
        [id, instrutorId]
      );

      if (modulo.rowCount === 0) {
        return res.status(403).json({
          erro: "Módulo não encontrado ou acesso negado",
        });
      }

      await db.query("DELETE FROM modulos WHERE id = $1", [id]);

      res.status(200).json({
        sucesso: true,
        mensagem: "Módulo excluído com sucesso",
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao excluir módulo" });
    }
  }
);

// ==================== ESTATÍSTICAS E RELATÓRIOS ====================

// Rota para buscar avaliações de um curso específico do instrutor
router.get(
  "/avaliacoes/:cursoId",
  autenticar,
  autorizarPapel("instrutor"),
  async (req, res) => {
    const instrutorId = req.usuario.id; // ID do instrutor autenticado
    const { cursoId } = req.params; // ID do curso a ser consultado

    try {
      // Verifica se o curso realmente pertence ao instrutor logado
      const curso = await db.query(
        "SELECT * FROM cursos WHERE id = $1 AND instrutor_id = $2",
        [cursoId, instrutorId]
      );

      // Se o curso não for encontrado ou não for do instrutor, bloqueia o acesso
      if (curso.rows.length === 0) {
        return res
          .status(403)
          .json({ erro: "Curso não encontrado ou acesso negado" });
      }

      // Busca as avaliações do curso, com informações do aluno
      const avaliacoes = await db.query(
        `
      SELECT a.id, a.usuario_id, u.nome AS nome_aluno, a.comentario, a.nota, a.criado_em
      FROM avaliacoes a
      JOIN usuarios u ON a.usuario_id = u.id
      WHERE a.curso_id = $1
      ORDER BY a.criado_em DESC
    `,
        [cursoId]
      );

      // Retorna as avaliações
      res.status(200).json({
        sucesso: true,
        total: avaliacoes.rowCount,
        avaliacoes: avaliacoes.rows,
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao buscar avaliações do curso" });
    }
  }
);

// Rota para buscar os alunos inscritos em um curso específico do instrutor
router.get(
  "/inscritos/:cursoId",
  autenticar,
  autorizarPapel("instrutor"),
  async (req, res) => {
    const instrutorId = req.usuario.id; // ID do instrutor autenticado
    const { cursoId } = req.params; // ID do curso a ser consultado

    try {
      // Verifica se o curso pertence ao instrutor autenticado
      const curso = await db.query(
        "SELECT * FROM cursos WHERE id = $1 AND instrutor_id = $2",
        [cursoId, instrutorId]
      );

      // Se o curso não for do instrutor, impede acesso
      if (curso.rows.length === 0) {
        return res
          .status(403)
          .json({ erro: "Curso não encontrado ou acesso negado" });
      }

      // Busca os alunos inscritos no curso, trazendo nome e data de inscrição
      const inscritos = await db.query(
        `
      SELECT i.id, i.usuario_id, u.nome AS nome_aluno, i.criado_em
      FROM inscricoes i
      JOIN usuarios u ON i.usuario_id = u.id
      WHERE i.curso_id = $1
      ORDER BY i.criado_em DESC
    `,
        [cursoId]
      );

      // Retorna a lista de alunos
      res.status(200).json({
        sucesso: true,
        total: inscritos.rowCount,
        inscritos: inscritos.rows,
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao buscar inscritos do curso" });
    }
  }
);

// ==================== ROTAS DE INSCRIÇÕES (MANTIDAS) ====================

// PATCH /inscricoes/:id/concluir
router.patch(
  "/:id/concluir",
  autenticar,
  autorizarPapel("aluno"),
  async (req, res) => {
    const { id } = req.params;

    try {
      const resultado = await db.query(
        "UPDATE inscricoes SET concluido = true WHERE id = $1 RETURNING *",
        [id]
      );

      if (resultado.rowCount === 0) {
        return res.status(404).json({ erro: "Inscrição não encontrada" });
      }

      res.status(200).json({
        sucesso: true,
        mensagem: "Curso marcado como concluído",
        dados: resultado.rows[0],
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao atualizar inscrição" });
    }
  }
);

// GET /historico — Lista os cursos concluídos do aluno
router.get(
  "/historico",
  autenticar,
  autorizarPapel("aluno"),
  async (req, res) => {
    try {
      const resultado = await db.query(
        `SELECT c.id, c.titulo, i.data_inicio, i.data_termino
       FROM inscricoes i
       JOIN cursos c ON c.id = i.curso_id
       WHERE i.usuario_id = $1 AND i.concluido = true`,
        [req.usuario.id]
      );

      res.status(200).json({
        sucesso: true,
        historico: resultado.rows,
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao buscar histórico" });
    }
  }
);

// PATCH /inscricoes/:id — Atualizar inscrição (apenas do próprio usuário)
router.patch("/:id", autenticar, autorizarPapel("aluno"), async (req, res) => {
  const { id } = req.params;
  const { data_termino, concluido } = req.body;

  try {
    const resultado = await db.query(
      `UPDATE inscricoes
       SET data_termino = COALESCE($1, data_termino),
           concluido = COALESCE($2, concluido)
       WHERE id = $3 AND usuario_id = $4
       RETURNING *`,
      [data_termino, concluido, id, req.usuario.id]
    );

    if (resultado.rowCount === 0) {
      return res
        .status(404)
        .json({ erro: "Inscrição não encontrada ou não é sua" });
    }

    res.status(200).json({
      sucesso: true,
      mensagem: "Inscrição atualizada",
      dados: resultado.rows[0],
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao atualizar inscrição" });
  }
});

// Inscrição do aluno/admin em um curso
router.post(
  "/:cursoId",
  autenticar,
  autorizarPapel("aluno", "admin"),
  async (req, res) => {
    const { cursoId } = req.params;
    const usuarioId = req.usuario.id;

    try {
      // Verifica se o curso existe
      const curso = await db.query("SELECT id FROM cursos WHERE id = $1", [
        cursoId,
      ]);
      if (curso.rowCount === 0)
        return res.status(404).json({ erro: "Curso não encontrado" });

      // Verifica se o aluno já está inscrito
      const inscricaoExiste = await db.query(
        "SELECT * FROM inscricoes WHERE curso_id = $1 AND usuario_id = $2",
        [cursoId, usuarioId]
      );
      if (inscricaoExiste.rowCount > 0)
        return res.status(400).json({ erro: "Já está inscrito neste curso" });

      // Inscreve o aluno
      const resultado = await db.query(
        `INSERT INTO inscricoes (curso_id, usuario_id) VALUES ($1, $2) RETURNING *`,
        [cursoId, usuarioId]
      );

      // Enviar notificação (simulada)
      enviarNotificacao(
        usuarioId,
        `Inscrição confirmada no curso ID ${cursoId}`
      );

      res.status(201).json({
        sucesso: true,
        mensagem: "Inscrição realizada com sucesso",
        inscricao: resultado.rows[0],
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro interno ao realizar inscrição" });
    }
  }
);

// Cancelar inscrição
router.delete(
  "/:cursoId",
  autenticar,
  autorizarPapel("aluno", "admin"),
  async (req, res) => {
    const { cursoId } = req.params;
    const usuarioId = req.usuario.id;

    try {
      const resultado = await db.query(
        `DELETE FROM inscricoes WHERE curso_id = $1 AND usuario_id = $2 RETURNING *`,
        [cursoId, usuarioId]
      );

      if (resultado.rowCount === 0) {
        return res.status(404).json({ erro: "Inscrição não encontrada" });
      }

      res.status(200).json({
        sucesso: true,
        mensagem: "Inscrição cancelada com sucesso",
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao cancelar inscrição" });
    }
  }
);

// Listar cursos inscritos
router.get(
  "/meus",
  autenticar,
  autorizarPapel("aluno", "admin"),
  async (req, res) => {
    const usuarioId = req.usuario.id;

    try {
      const resultado = await db.query(
        `SELECT c.* FROM cursos c
       JOIN inscricoes i ON i.curso_id = c.id
       WHERE i.usuario_id = $1`,
        [usuarioId]
      );

      res.status(200).json({
        sucesso: true,
        cursos: resultado.rows,
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao buscar cursos inscritos" });
    }
  }
);

// Estatísticas de alunos por curso
router.get(
  "/estatisticas",
  autenticar,
  autorizarPapel("admin"),
  async (req, res) => {
    try {
      const resultado = await db.query(`
      SELECT c.titulo, COUNT(i.usuario_id) AS total_alunos
      FROM cursos c
      LEFT JOIN inscricoes i ON c.id = i.curso_id
      GROUP BY c.id
    `);

      res.status(200).json({
        sucesso: true,
        estatisticas: resultado.rows,
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao gerar estatísticas" });
    }
  }
);

// Exportar inscrições em Excel
router.get(
  "/exportar/excel",
  autenticar,
  autorizarPapel("admin"),
  async (req, res) => {
    try {
      const resultado = await db.query(`
      SELECT u.nome AS aluno, c.titulo AS curso
      FROM inscricoes i
      JOIN usuarios u ON u.id = i.usuario_id
      JOIN cursos c ON c.id = i.curso_id
    `);

      const workbook = new exceljs.Workbook();
      const planilha = workbook.addWorksheet("Inscricoes");

      planilha.columns = [
        { header: "Aluno", key: "aluno", width: 30 },
        { header: "Curso", key: "curso", width: 30 },
      ];

      resultado.rows.forEach((row) => planilha.addRow(row));

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=inscricoes.xlsx"
      );

      await workbook.xlsx.write(res);
      res.end();
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao exportar Excel" });
    }
  }
);

// Exportar inscrições em PDF
router.get(
  "/exportar/pdf",
  autenticar,
  autorizarPapel("admin"),
  async (req, res) => {
    try {
      const resultado = await db.query(`
      SELECT u.nome AS aluno, c.titulo AS curso
      FROM inscricoes i
      JOIN usuarios u ON u.id = i.usuario_id
      JOIN cursos c ON c.id = i.curso_id
    `);

      const doc = new PDFDocument();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=inscricoes.pdf"
      );

      doc.pipe(res);

      doc
        .fontSize(16)
        .text("Relatório de Inscrições", { align: "center" })
        .moveDown();

      resultado.rows.forEach((row, index) => {
        doc
          .fontSize(12)
          .text(`${index + 1}. Aluno: ${row.aluno} | Curso: ${row.curso}`);
      });

      doc.end();
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao exportar PDF" });
    }
  }
);

export default router;
