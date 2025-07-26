/** @format */

// Importação dos módulos necessários
const express = require("express");
const bcrypt = require("bcrypt");
const baseDados = require("../configuracoes/baseDados"); // Verifique se este caminho está correto

// Importa os middlewares de autenticação e autorização
const autenticar = require("../middleware/autenticar");
const autorizarPapel = require("../middleware/autorizarPapel");

// Cria um roteador do Express para organizar as rotas
const router = express.Router();

/**
 * Rota POST para cadastrar um novo usuário
 * Endpoint: /usuarios
 * Acesso: Somente administradores (com autenticação)
 */
router.post("/", autenticar, autorizarPapel("admin"), async (req, res) => {
  // Extrai os dados do corpo da requisição
  const { nome, email, senha, papel } = req.body;

  // Validação dos campos obrigatórios
  if (!nome || !email || !senha || !papel) {
    return res.status(400).json({
      sucesso: false,
      erro: "DADOS_INCOMPLETOS",
      mensagem: "Todos os campos são obrigatórios: nome, email, senha, papel",
    });
  }

  try {
    // Criptografa a senha com bcrypt (10 é o custo do salt)
    const senhaHash = await bcrypt.hash(senha, 10);

    // Insere o usuário no banco de dados
    const resultado = await baseDados.query(
      `INSERT INTO usuarios (nome, email, senha, papel)
       VALUES ($1, $2, $3, $4) 
       RETURNING id, nome, email, papel`, // Não retorna a senha por segurança
      [nome, email, senhaHash, papel]
    );

    // Resposta de sucesso (status 201 - Created)
    return res.status(201).json({
      sucesso: true,
      mensagem: "Usuário cadastrado com sucesso",
      usuario: resultado.rows[0],
    });
  } catch (erro) {
    console.error("Erro ao cadastrar usuário:", erro);

    // Tratamento específico para email duplicado
    if (erro.code === "23505") {
      return res.status(409).json({
        sucesso: false,
        erro: "EMAIL_DUPLICADO",
        mensagem: "Este email já está cadastrado",
      });
    }

    // Erro genérico para outros casos
    return res.status(500).json({
      sucesso: false,
      erro: "ERRO_INTERNO",
      mensagem: "Falha ao cadastrar usuário",
      detalhes:
        process.env.NODE_ENV === "development" ? erro.message : undefined,
    });
  }
});

/**
 * GET /usuarios
 * Lista todos os usuários (somente admin)
 */
router.get("/", autenticar, autorizarPapel("admin"), async (req, res) => {
  try {
    const resultado = await baseDados.query(
      "SELECT id, nome, email, papel FROM usuarios ORDER BY id"
    );

    return res.json({
      sucesso: true,
      quantidade: resultado.rows.length,
      usuarios: resultado.rows,
    });
  } catch (erro) {
    console.error("Erro ao listar usuários:", erro);
    return res.status(500).json({
      sucesso: false,
      erro: "ERRO_BANCO_DADOS",
      mensagem: "Falha ao recuperar lista de usuários",
    });
  }
});

// Exporta o roteador para ser usado no arquivo principal
module.exports = router;
