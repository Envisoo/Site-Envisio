/** @format */

const express = require("express");
const router = express.Router();
const db = require("../configuracoes/baseDados");
const autenticar = require("../middleware/autenticar");
const autorizarPapel = require("../middleware/autorizarPapel");

// Adicionar curso aos favoritos
router.post(
  "/:cursoId",
  autenticar,
  autorizarPapel("aluno"),
  async (req, res) => {
    const { cursoId } = req.params;
    const usuarioId = req.usuario.id;

    try {
      await db.query(
        `INSERT INTO favoritos (usuario_id, curso_id)
       VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [usuarioId, cursoId]
      );

      res
        .status(201)
        .json({ sucesso: true, mensagem: "Curso adicionado aos favoritos" });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao adicionar aos favoritos" });
    }
  }
);

// Listar favoritos do aluno
router.get("/", autenticar, autorizarPapel("aluno"), async (req, res) => {
  const usuarioId = req.usuario.id;

  try {
    const resultado = await db.query(
      `SELECT c.*
       FROM favoritos f
       JOIN cursos c ON c.id = f.curso_id
       WHERE f.usuario_id = $1`,
      [usuarioId]
    );

    res.status(200).json({ sucesso: true, cursos: resultado.rows });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao buscar favoritos" });
  }
});

// Remover curso dos favoritos
router.delete(
  "/:cursoId",
  autenticar,
  autorizarPapel("aluno"),
  async (req, res) => {
    const { cursoId } = req.params;
    const usuarioId = req.usuario.id;

    try {
      await db.query(
        `DELETE FROM favoritos
       WHERE usuario_id = $1 AND curso_id = $2`,
        [usuarioId, cursoId]
      );

      res
        .status(200)
        .json({ sucesso: true, mensagem: "Curso removido dos favoritos" });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao remover favorito" });
    }
  }
);

module.exports = router;
