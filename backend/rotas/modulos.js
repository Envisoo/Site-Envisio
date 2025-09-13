/** @format */

import express from "express";
import { Router } from "express";
import { db } from "../db/conexao.js";
import { autenticar } from "../middlewares/autenticar.js";
import { autorizarPapel } from "../middlewares/autorizarPapel.js";

const router = Router();

// 📘 Criar novo módulo para um curso
router.post(
  "/:cursoId",
  autenticar,
  autorizarPapel("instrutor"),
  async (req, res) => {
    const { cursoId } = req.params;
    const { titulo, descricao, ordem } = req.body;

    try {
      // Verifica se o curso pertence ao instrutor autenticado
      const curso = await db.query(
        "SELECT * FROM cursos WHERE id = $1 AND instrutor_id = $2",
        [cursoId, req.usuario.id]
      );

      if (curso.rowCount === 0) {
        return res
          .status(403)
          .json({ erro: "Curso não encontrado ou acesso negado" });
      }

      // Cria o módulo
      const resultado = await db.query(
        `INSERT INTO modulos (curso_id, titulo, descricao, ordem)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [cursoId, titulo, descricao, ordem || 0]
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

// 📘 Listar todos os módulos de um curso
router.get("/:cursoId", autenticar, async (req, res) => {
  const { cursoId } = req.params;

  try {
    const resultado = await db.query(
      `SELECT * FROM modulos
         WHERE curso_id = $1
         ORDER BY ordem ASC, id ASC`,
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
});

// ✅ Editar módulo
router.put(
  "/:id",
  autenticar,
  autorizarPapel("instrutor"),
  async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao } = req.body;

    try {
      const resultado = await db.query(
        "UPDATE modulos SET titulo = $1, descricao = $2 WHERE id = $3 RETURNING *",
        [titulo, descricao, id]
      );

      if (resultado.rowCount === 0) {
        return res.status(404).json({ erro: "Módulo não encontrado" });
      }

      res.json({ sucesso: true, modulo: resultado.rows[0] });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao editar módulo" });
    }
  }
);

// ✅ Excluir módulo
router.delete(
  "/:id",
  autenticar,
  autorizarPapel("instrutor"),
  async (req, res) => {
    const { id } = req.params;

    try {
      await db.query("DELETE FROM modulos WHERE id = $1", [id]);
      res.json({ sucesso: true, mensagem: "Módulo excluído com sucesso" });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao excluir módulo" });
    }
  }
);

export default router;
