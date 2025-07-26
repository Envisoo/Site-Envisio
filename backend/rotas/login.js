/** @format */

// Carrega as variáveis do .env
require("dotenv").config();

// Importação dos módulos necessários
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const baseDados = require("../configuracoes/baseDados");

// Cria um roteador do Express
const router = express.Router();

// Chave secreta usada para gerar tokens JWT (idealmente deve ir para um arquivo .env)
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Rota POST para login de usuário
 * Endpoint: /login
 */
router.post("/", async (req, res) => {
  const { email, senha } = req.body;

  // Validação de campos obrigatórios
  if (!email || !senha) {
    return res.status(400).json({
      erro: "Email e senha são obrigatórios",
      sucesso: false,
    });
  }

  try {
    // Busca o usuário no banco de dados pelo email
    const resultado = await baseDados.query(
      "SELECT id, nome, email, senha, papel FROM usuarios WHERE email = $1",
      [email]
    );

    // Verifica se o usuário existe
    if (resultado.rows.length === 0) {
      return res.status(401).json({
        erro: "Credenciais inválidas",
        sucesso: false,
      });
    }

    const usuario = resultado.rows[0];

    // Compara a senha informada com a senha armazenada (hash)
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({
        erro: "Credenciais inválidas",
        sucesso: false,
      });
    }

    // Gera o token JWT com ID, papel e nome do usuário
    const token = jwt.sign(
      {
        id: usuario.id,
        nome: usuario.nome,
        papel: usuario.papel,
      },
      JWT_SECRET,
      { expiresIn: "1d" } // Token válido por 1 dia
    );

    // Resposta de sucesso com o token
    res.json({
      sucesso: true,
      mensagem: "Login efetuado com sucesso",
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        papel: usuario.papel,
      },
    });
  } catch (erro) {
    console.error("Erro ao fazer login:", erro);
    res.status(500).json({
      erro: "Erro interno no servidor",
      sucesso: false,
    });
  }
});

// Exporta o roteador
module.exports = router;
