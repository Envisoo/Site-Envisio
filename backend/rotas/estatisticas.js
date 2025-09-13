/** @format */

import express from "express";
import { Router } from "express";
import { db } from "../db/conexao.js";
import { autenticar } from "../middlewares/autenticar.js";
import { autorizarPapel } from "../middlewares/autorizarPapel.js";

const router = Router();

// Rota para obter estatísticas dos cursos de um instrutor
router.get("/estatisticas", autenticar, async (req, res) => {
  try {
    const instrutor = req.usuario.nome;

    // Buscar estatísticas básicas
    const resultadoBasico = await db.query(
      `
      SELECT 
        COUNT(*) as total_cursos,
        COUNT(CASE WHEN status = 'publicado' THEN 1 END) as cursos_publicados,
        COALESCE(AVG(avaliacao), 0) as avaliacao_media
      FROM cursos 
      WHERE instrutor_nome = $1
    `,
      [instrutor]
    );

    // Buscar total de alunos ativos
    const resultadoAlunos = await db.query(
      `
      SELECT 
        COUNT(DISTINCT matricula.aluno_id) as alunos_ativos
      FROM cursos 
      LEFT JOIN matriculas as matricula ON matricula.curso_id = cursos.id
      WHERE cursos.instrutor_nome = $1
      AND matricula.status = 'ativo'
    `,
      [instrutor]
    );

    const estatisticas = {
      totalCursos: parseInt(resultadoBasico.rows[0].total_cursos),
      cursosPublicados: parseInt(resultadoBasico.rows[0].cursos_publicados),
      avaliacaoMedia: parseFloat(resultadoBasico.rows[0].avaliacao_media),
      alunosAtivos: parseInt(resultadoAlunos.rows[0].alunos_ativos),
    };

    res.status(200).json({
      sucesso: true,
      estatisticas,
    });
  } catch (erro) {
    console.error("Erro ao buscar estatísticas:", erro);
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao buscar estatísticas dos cursos",
    });
  }
});

export default router;
