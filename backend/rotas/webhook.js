/** @format */

// rotas/webhook.js
const express = require("express");
const router = express.Router();
const db = require("../configuracoes/baseDados");

/**
 * POST /webhook/pagamento
 * Webhook para receber confirmação de pagamento de sistemas externos
 * O sistema de pagamento chama essa rota ao processar um pagamento
 */
router.post("/pagamento", async (req, res) => {
  const { referencia, status, valor } = req.body;

  try {
    // Busca o pagamento pela referência (única enviada pelo gateway externo)
    const resultado = await db.query(
      `SELECT * FROM pagamentos WHERE referencia = $1`,
      [referencia]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ erro: "Pagamento não encontrado" });
    }

    const pagamento = resultado.rows[0];

    // Atualiza o status do pagamento
    await db.query(
      `UPDATE pagamentos
       SET status = $1
       WHERE referencia = $2`,
      [status.toLowerCase(), referencia]
    );

    // Se o status for confirmado, inscreve o aluno automaticamente
    if (status.toLowerCase() === "confirmado") {
      await db.query(
        `INSERT INTO inscricoes (usuario_id, curso_id)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [pagamento.usuario_id, pagamento.curso_id]
      );
    }

    return res
      .status(200)
      .json({ sucesso: true, mensagem: "Webhook processado com sucesso" });
  } catch (erro) {
    console.error("Erro no webhook:", erro);
    return res.status(500).json({ erro: "Erro interno ao processar webhook" });
  }
});

module.exports = router;
