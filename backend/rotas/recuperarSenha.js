/** @format */

// rotas/recuperarSenha.js
const express = require("express");
const router = express.Router();
const db = require("../configuracoes/baseDados");
const crypto = require("crypto");
const enviarEmail = require("../utils/enviarEmail"); // criaremos isso já já

// Solicitar recuperação
router.post("/recuperar-senha", async (req, res) => {
  const { email } = req.body;

  try {
    // Verifica se o usuário existe
    const resultado = await db.query(
      "SELECT id FROM usuarios WHERE email = $1",
      [email]
    );
    if (resultado.rowCount === 0) {
      return res.status(404).json({ erro: "E-mail não encontrado" });
    }

    const usuarioId = resultado.rows[0].id;

    // Gera token e define validade (1 hora)
    const token = crypto.randomBytes(32).toString("hex");
    const validade = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    // Salva o token na base
    await db.query(
      `INSERT INTO tokens_recuperacao (usuario_id, token, validade)
       VALUES ($1, $2, $3)`,
      [usuarioId, token, validade]
    );

    // Envia e-mail (ou simula)
    const link = `${process.env.URL_FRONTEND}/redefinir-senha/${token}`;
    await enviarEmail(
      email,
      "Recuperação de Senha",
      `Clique no link para redefinir sua senha: <a href="${link}">${link}</a>`
    );

    res.status(200).json({
      sucesso: true,
      mensagem: "Link de recuperação enviado para o e-mail",
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao solicitar recuperação de senha" });
  }
});

// Redefinir senha
router.post("/redefinir-senha/:token", async (req, res) => {
  const { token } = req.params;
  const { novaSenha } = req.body;

  try {
    // Verifica o token
    const resultado = await db.query(
      `SELECT usuario_id, validade FROM tokens_recuperacao WHERE token = $1`,
      [token]
    );

    if (resultado.rowCount === 0) {
      return res.status(400).json({ erro: "Token inválido ou expirado" });
    }

    const { usuario_id, validade } = resultado.rows[0];

    if (new Date() > new Date(validade)) {
      return res.status(400).json({ erro: "Token expirado" });
    }

    // Criptografa a nova senha
    const hash = await bcrypt.hash(novaSenha, 10);

    // Atualiza a senha
    await db.query("UPDATE usuarios SET senha = $1 WHERE id = $2", [
      hash,
      usuario_id,
    ]);

    // Remove o token
    await db.query("DELETE FROM tokens_recuperacao WHERE token = $1", [token]);

    res
      .status(200)
      .json({ sucesso: true, mensagem: "Senha redefinida com sucesso" });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao redefinir a senha" });
  }
});

module.exports = router;
