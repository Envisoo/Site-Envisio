/** @format */

import express from "express";
import { Router } from "express";
import { db } from "../db/conexao.js";
import { verificarToken } from "../middlewares/auth.js";
import { autenticar } from "../middlewares/autenticar.js";
import { autorizarPapel } from "../middlewares/autorizarPapel.js";
import bcrypt from "bcrypt";

const router = Router();

// Middleware para verificar se é admin
const verificarAdmin = async(req, res, next) => {
    try {
        const result = await db.query(
            "SELECT tipo FROM usuarios WHERE id = $1", [req.userId]
        );

        if (result.rows[0]?.tipo === "admin") {
            next();
        } else {
            res.status(403).json({ error: "Acesso negado" });
        }
    } catch (error) {
        console.error("Erro ao verificar admin:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};

// Rotas protegidas por autenticação e verificação de admin
router.use(verificarToken);
router.use(verificarAdmin);

// Rota para listar todos os usuários
router.get("/usuarios", async(req, res) => {
    try {
        const usuarios = await db.query(
            "SELECT id, nome, email, tipo, created_at FROM usuarios"
        );
        res.json(usuarios.rows);
    } catch (error) {
        console.error("Erro ao listar usuários:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

// ✅ Rota: Resumo geral para admin
router.get("/resumo", autenticar, autorizarPapel("admin"), async(req, res) => {
    try {
        // Faz múltiplas consultas para contar registros
        const [usuarios, cursos, categorias, inscricoes] = await Promise.all([
            db.query("SELECT COUNT(*) FROM usuarios"),
            db.query("SELECT COUNT(*) FROM cursos"),
            db.query("SELECT COUNT(*) FROM categorias"),
            db.query("SELECT COUNT(*) FROM inscricoes"),
        ]);

        res.status(200).json({
            sucesso: true,
            resumo: {
                totalUsuarios: parseInt(usuarios.rows[0].count),
                totalCursos: parseInt(cursos.rows[0].count),
                totalCategorias: parseInt(categorias.rows[0].count),
                totalInscricoes: parseInt(inscricoes.rows[0].count),
            },
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao buscar resumo do sistema" });
    }
});

// ✅ Rota: Alunos por curso (somente admin)
router.get(
    "/alunos-por-curso",
    autenticar,
    autorizarPapel("admin"),
    async(req, res) => {
        try {
            const resultado = await db.query(`
        SELECT c.id, c.titulo, COUNT(i.usuario_id) AS total_alunos
        FROM cursos c
        LEFT JOIN inscricoes i ON c.id = i.curso_id
        GROUP BY c.id
        ORDER BY total_alunos DESC;
      `);

            res.status(200).json({
                sucesso: true,
                dados: resultado.rows,
            });
        } catch (erro) {
            console.error(erro);
            res
                .status(500)
                .json({ erro: "Erro ao buscar estatísticas de alunos por curso" });
        }
    }
);

// ✅ Novo endpoint: Dashboard completo (estatísticas avançadas)
router.get(
    "/dashboard-completo",
    autenticar,
    autorizarPapel("admin"),
    async(req, res) => {
        try {
            // 📊 Receita total simulada (soma do preço dos cursos com inscrições)
            const receitaTotal = await db.query(`
      SELECT COALESCE(SUM(c.preco), 0) AS receita
      FROM inscricoes i
      JOIN cursos c ON c.id = i.curso_id
    `);

            // 🔄 Últimos cursos
            const ultimosCursos = await db.query(`
      SELECT id, titulo, criado_em
      FROM cursos
      ORDER BY criado_em DESC
      LIMIT 5
    `);

            // 🔄 Últimos alunos
            const ultimosAlunos = await db.query(`
      SELECT id, nome, criado_em
      FROM usuarios
      WHERE papel = 'aluno'
      ORDER BY criado_em DESC
      LIMIT 5
    `);

            // 🔄 Últimas avaliações
            const ultimasAvaliacoes = await db.query(`
      SELECT a.id, a.nota, a.comentario, u.nome AS aluno, c.titulo AS curso, a.criado_em
      FROM avaliacoes a
      JOIN usuarios u ON u.id = a.usuario_id
      JOIN cursos c ON c.id = a.curso_id
      ORDER BY a.criado_em DESC
      LIMIT 5
    `);

            // 🧩 Cursos por categoria
            const cursosPorCategoria = await db.query(`
      SELECT categoria, COUNT(*) AS total_cursos
      FROM cursos
      GROUP BY categoria
      ORDER BY total_cursos DESC
    `);

            // 👨‍🏫 Visão do instrutor
            const instrutores = await db.query(`
      SELECT u.id, u.nome, COUNT(c.id) AS total_cursos,
        COALESCE(SUM((SELECT COUNT(*) FROM avaliacoes a WHERE a.curso_id = c.id)), 0) AS total_avaliacoes,
        COALESCE(SUM((SELECT COUNT(*) FROM favoritos f WHERE f.curso_id = c.id)), 0) AS total_favoritos
      FROM usuarios u
      JOIN cursos c ON c.instrutor_id = u.id
      WHERE u.papel = 'instrutor'
      GROUP BY u.id, u.nome
      ORDER BY total_cursos DESC
    `);

            res.status(200).json({
                sucesso: true,
                dados: {
                    estatisticasFinanceiras: {
                        receitaTotal: parseFloat(receitaTotal.rows[0].receita),
                    },
                    atividadeRecente: {
                        ultimosCursos: ultimosCursos.rows,
                        ultimosAlunos: ultimosAlunos.rows,
                        ultimasAvaliacoes: ultimasAvaliacoes.rows,
                    },
                    estatisticasPorCategoria: cursosPorCategoria.rows,
                    visaoPorInstrutor: instrutores.rows,
                },
            });
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao gerar dashboard completo" });
        }
    }
);

export default router;