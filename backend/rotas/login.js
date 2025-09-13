/** @format */

// Importação dos módulos necessários
import express from "express";
import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db/conexao.js";

const router = Router();

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
    const result = await db.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);
    const usuario = result.rows[0];

    // Verifica se o usuário existe
    if (!usuario) {
      return res.status(401).json({
        erro: true,
        mensagem: "Email ou senha incorretos",
      });
    }

    // Compara a senha informada com a senha armazenada (hash)
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({
        erro: true,
        mensagem: "Email ou senha incorretos",
      });
    }

    // Gera o token JWT com ID, papel e nome do usuário
    const token = jwt.sign(
      { id: usuario.id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" } // Token válido por 1 dia
    );

    // Remove a senha antes de enviar
    delete usuario.senha;

    // Resposta de sucesso com o token
    return res.json({
      erro: false,
      usuario,
      token,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({
      erro: true,
      mensagem: "Erro interno do servidor",
    });
  }
});

export default router;
