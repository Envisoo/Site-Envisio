/** @format */

const express = require("express");
const router = express.Router();
const db = require("../configuracoes/baseDados");
const autenticar = require("../middleware/autenticar");
const autorizarPapel = require("../middleware/autorizarPapel");

// Criar avaliação
router.post(
  "/:cursoId",
  autenticar,
  autorizarPapel("aluno"),
  async (req, res) => {
    const { cursoId } = req.params;
    const { nota, comentario } = req.body;
    const usuarioId = req.usuario.id;

    try {
      const resultado = await db.query(
        `INSERT INTO avaliacoes (curso_id, usuario_id, nota, comentario)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
        [cursoId, usuarioId, nota, comentario]
      );

      res.status(201).json({ sucesso: true, avaliacao: resultado.rows[0] });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao criar avaliação" });
    }
  }
);

// Listar avaliações de um curso
router.get("/:cursoId", async (req, res) => {
  const { cursoId } = req.params;

  try {
    const resultado = await db.query(
      `SELECT a.*, u.nome AS autor
       FROM avaliacoes a
       JOIN usuarios u ON u.id = a.usuario_id
       WHERE a.curso_id = $1`,
      [cursoId]
    );

    const media = await db.query(
      `SELECT AVG(nota)::numeric(3,2) AS media
       FROM avaliacoes
       WHERE curso_id = $1`,
      [cursoId]
    );

    res.status(200).json({
      sucesso: true,
      media: media.rows[0].media,
      avaliacoes: resultado.rows,
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao listar avaliações" });
  }
});

// Listar todas as avaliações (admin/instrutor)
router.get(
  "/",
  autenticar,
  autorizarPapel(["admin", "instrutor"]),
  async (req, res) => {
    try {
      const resultado = await db.query(
        `SELECT a.*, u.nome AS autor, c.titulo AS curso
       FROM avaliacoes a
       JOIN usuarios u ON u.id = a.usuario_id
       JOIN cursos c ON c.id = a.curso_id`
      );

      res.status(200).json({ sucesso: true, avaliacoes: resultado.rows });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao listar todas avaliações" });
    }
  }
);

module.exports = router;
