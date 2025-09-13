/** @format */

import express from "express";
import { Router } from "express";
import { db } from "../db/conexao.js";
import { autenticar } from "../middlewares/autenticar.js";
import { autorizarPapel } from "../middlewares/autorizarPapel.js";

const router = Router();

// Inscrição do aluno em um curso
router.post(
  "/:cursoId",
  autenticar,
  autorizarPapel("aluno"),
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
        `INSERT INTO inscricoes (curso_id, usuario_id)
       VALUES ($1, $2) RETURNING *`,
        [cursoId, usuarioId]
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

// Listar cursos em que o aluno está inscrito
router.get("/meus", autenticar, autorizarPapel("aluno"), async (req, res) => {
  const usuarioId = req.usuario.id;

  try {
    const resultado = await db.query(
      `SELECT c.*
       FROM cursos c
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
});

export default router;
