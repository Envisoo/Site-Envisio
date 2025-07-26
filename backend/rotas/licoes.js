/** @format */

const express = require("express");
const router = express.Router();
const db = require("../configuracoes/baseDados");
const autenticar = require("../middleware/autenticar");
const autorizarPapel = require("../middleware/autorizarPapel");

// 📘 Criar nova lição dentro de um módulo
router.post(
  "/:moduloId",
  autenticar,
  autorizarPapel("instrutor"),
  async (req, res) => {
    const { moduloId } = req.params;
    const { titulo, conteudo, ordem } = req.body;

    try {
      // Verifica se o módulo pertence ao instrutor autenticado
      const modulo = await db.query(
        `SELECT m.*, c.instrutor_id
         FROM modulos m
         JOIN cursos c ON c.id = m.curso_id
         WHERE m.id = $1`,
        [moduloId]
      );

      if (
        modulo.rowCount === 0 ||
        modulo.rows[0].instrutor_id !== req.usuario.id
      ) {
        return res
          .status(403)
          .json({ erro: "Módulo não encontrado ou acesso negado" });
      }

      // Cria a lição
      const resultado = await db.query(
        `INSERT INTO licoes (modulo_id, titulo, conteudo, ordem)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [moduloId, titulo, conteudo, ordem || 0]
      );

      res.status(201).json({
        sucesso: true,
        mensagem: "Lição criada com sucesso",
        licao: resultado.rows[0],
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao criar lição" });
    }
  }
);

// 📘 Listar lições de um módulo
router.get("/:moduloId", autenticar, async (req, res) => {
  const { moduloId } = req.params;

  try {
    const resultado = await db.query(
      `SELECT * FROM licoes
       WHERE modulo_id = $1
       ORDER BY ordem ASC, id ASC`,
      [moduloId]
    );

    res.status(200).json({
      sucesso: true,
      licoes: resultado.rows,
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao listar lições" });
  }
});

// ✅ Editar lição
router.put(
  "/:id",
  autenticar,
  autorizarPapel("instrutor"),
  async (req, res) => {
    const { id } = req.params;
    const { titulo, conteudo } = req.body;

    try {
      const resultado = await db.query(
        "UPDATE licoes SET titulo = $1, conteudo = $2 WHERE id = $3 RETURNING *",
        [titulo, conteudo, id]
      );

      if (resultado.rowCount === 0) {
        return res.status(404).json({ erro: "Lição não encontrada" });
      }

      res.json({ sucesso: true, licao: resultado.rows[0] });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao editar lição" });
    }
  }
);

// ✅ Excluir lição
router.delete(
  "/:id",
  autenticar,
  autorizarPapel("instrutor"),
  async (req, res) => {
    const { id } = req.params;

    try {
      await db.query("DELETE FROM licoes WHERE id = $1", [id]);
      res.json({ sucesso: true, mensagem: "Lição excluída com sucesso" });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao excluir lição" });
    }
  }
);

// ✅ Marcar lição como concluída (aluno)
router.post(
  "/concluir/:licaoId",
  autenticar,
  autorizarPapel("aluno"),
  async (req, res) => {
    const { licaoId } = req.params;
    const alunoId = req.usuario.id;

    try {
      const existente = await db.query(
        "SELECT * FROM progresso_licoes WHERE licao_id = $1 AND aluno_id = $2",
        [licaoId, alunoId]
      );

      if (existente.rowCount > 0) {
        return res
          .status(400)
          .json({ erro: "Lição já marcada como concluída" });
      }

      await db.query(
        "INSERT INTO progresso_licoes (licao_id, aluno_id) VALUES ($1, $2)",
        [licaoId, alunoId]
      );

      res.json({ sucesso: true, mensagem: "Lição marcada como concluída" });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao marcar lição" });
    }
  }
);

// ✅ Progresso do aluno em um curso
router.get(
  "/progresso/:cursoId",
  autenticar,
  autorizarPapel("aluno"),
  async (req, res) => {
    const { cursoId } = req.params;
    const alunoId = req.usuario.id;

    try {
      // Total de lições no curso
      const total = await db.query(
        `SELECT COUNT(*) AS total
       FROM licoes
       WHERE modulo_id IN (SELECT id FROM modulos WHERE curso_id = $1)`,
        [cursoId]
      );

      // Total de lições concluídas
      const concluido = await db.query(
        `SELECT COUNT(*) AS concluidas
       FROM progresso_licoes
       WHERE aluno_id = $1 AND licao_id IN (
         SELECT id FROM licoes WHERE modulo_id IN (
           SELECT id FROM modulos WHERE curso_id = $2
         )
       )`,
        [alunoId, cursoId]
      );

      const totalLicoes = parseInt(total.rows[0].total);
      const concluidas = parseInt(concluido.rows[0].concluidas);
      const percentual =
        totalLicoes === 0 ? 0 : Math.round((concluidas / totalLicoes) * 100);

      res.json({
        sucesso: true,
        totalLicoes,
        concluidas,
        percentual,
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao obter progresso" });
    }
  }
);

module.exports = router;
