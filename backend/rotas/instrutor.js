/** @format */

// rotas/inscricoes.js
const express = require("express");
const router = express.Router();
const db = require("../configuracoes/baseDados");
const autenticar = require("../middleware/autenticar");
const autorizarPapel = require("../middleware/autorizarPapel");
const exceljs = require("exceljs");
const { enviarNotificacao } = require("../utils/notificacao.js");
const PDFDocument = require("pdfkit");

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
          COUNT(DISTINCT i.usuario_id) AS total_inscritos,
          ROUND(AVG(a.nota), 1) AS media_avaliacoes,
          COUNT(DISTINCT f.usuario_id) AS total_favoritos
        FROM cursos c
        LEFT JOIN inscricoes i ON i.curso_id = c.id
        LEFT JOIN avaliacoes a ON a.curso_id = c.id
        LEFT JOIN favoritos f ON f.curso_id = c.id
        WHERE c.instrutor_id = $1
        GROUP BY c.id
        ORDER BY c.titulo
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

// Rota para buscar avaliações de um curso específico do instrutor
router.get(
  "/instrutor/avaliacoes/:cursoId",
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
  "/instrutor/inscritos/:cursoId",
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

      res
        .status(200)
        .json({
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

module.exports = router;
