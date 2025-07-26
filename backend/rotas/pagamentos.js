/** @format */

// rotas/pagamentos.js
const express = require("express");
const router = express.Router();
const db = require("../configuracoes/baseDados");
const autenticar = require("../middleware/autenticar");
const autorizarPapel = require("../middleware/autorizarPapel");

/**
 * POST /pagamentos/iniciar/:cursoId
 * Inicia um pagamento para um curso
 * Apenas para usuários com papel "aluno"
 */
router.post(
  "/iniciar/:cursoId",
  autenticar,
  autorizarPapel("aluno"),
  async (req, res) => {
    const usuarioId = req.usuario.id;
    const { cursoId } = req.params;
    const { metodo } = req.body; // ex: "transferencia", "multicaixa"

    try {
      // Busca o preço do curso
      const curso = await db.query("SELECT preco FROM cursos WHERE id = $1", [
        cursoId,
      ]);
      if (curso.rowCount === 0)
        return res.status(404).json({ erro: "Curso não encontrado" });

      const preco = curso.rows[0].preco;

      // Cria pagamento com status "pendente"
      const resultado = await db.query(
        `INSERT INTO pagamentos (usuario_id, curso_id, valor, metodo)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [usuarioId, cursoId, preco, metodo]
      );

      res.status(201).json({
        sucesso: true,
        mensagem: "Pagamento iniciado. Aguarde confirmação.",
        pagamento: resultado.rows[0],
      });

      const referencia = `REF-${Date.now()}-${Math.floor(
        Math.random() * 1000
      )}`;

      await db.query(
        `INSERT INTO pagamentos (usuario_id, curso_id, valor, metodo, referencia)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [usuarioId, cursoId, preco, metodo, referencia]
      );
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao iniciar pagamento" });
    }
  }
);

/**
 * PATCH /pagamentos/confirmar/:id
 * Confirma um pagamento e inscreve o aluno automaticamente
 * Apenas para usuários com papel "admin"
 */
router.patch(
  "/confirmar/:id",
  autenticar,
  autorizarPapel("admin"),
  async (req, res) => {
    const { id } = req.params;

    try {
      // Atualiza o status do pagamento para "confirmado"
      const pagamento = await db.query(
        `UPDATE pagamentos SET status = 'confirmado'
         WHERE id = $1 RETURNING *`,
        [id]
      );

      if (pagamento.rowCount === 0)
        return res.status(404).json({ erro: "Pagamento não encontrado" });

      const { usuario_id, curso_id } = pagamento.rows[0];

      // Inscreve o aluno automaticamente no curso pago
      await db.query(
        `INSERT INTO inscricoes (usuario_id, curso_id)
         VALUES ($1, $2)`,
        [usuario_id, curso_id]
      );

      res.status(200).json({
        sucesso: true,
        mensagem: "Pagamento confirmado e inscrição realizada",
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao confirmar pagamento" });
    }
  }
);

/**
 * GET /pagamentos/meus
 * Lista todos os pagamentos do aluno autenticado
 */
router.get("/meus", autenticar, autorizarPapel("aluno"), async (req, res) => {
  try {
    const resultado = await db.query(
      `SELECT * FROM pagamentos
         WHERE usuario_id = $1
         ORDER BY criado_em DESC`,
      [req.usuario.id]
    );

    res.status(200).json({
      sucesso: true,
      pagamentos: resultado.rows,
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao listar pagamentos" });
  }
});

module.exports = router;
