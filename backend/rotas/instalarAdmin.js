/** @format */

// Rota para cadastrar o primeiro administrador (acesso público, apenas 1 vez)

import express from "express";
import { Router } from "express";
import bcrypt from "bcrypt";
import { db } from "../db/conexao.js";

const router = Router();

router.post("/instalar-admin", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({
      sucesso: false,
      erro: "DADOS_INCOMPLETOS",
      mensagem: "Informe nome, email e senha",
    });
  }

  try {
    // Verifica se já existe um admin
    const resultado = await db.query(
      "SELECT * FROM usuarios WHERE papel = 'admin'"
    );

    if (resultado.rows.length > 0) {
      return res.status(403).json({
        sucesso: false,
        erro: "JA_EXISTE_ADMIN",
        mensagem: "Já existe um administrador cadastrado",
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoAdmin = await db.query(
      `INSERT INTO usuarios (nome, email, senha, papel)
       VALUES ($1, $2, $3, 'admin')
       RETURNING id, nome, email, papel`,
      [nome, email, senhaHash]
    );

    return res.status(201).json({
      sucesso: true,
      mensagem: "Administrador criado com sucesso",
      admin: novoAdmin.rows[0],
    });
  } catch (erro) {
    console.error("Erro ao criar admin:", erro);
    return res.status(500).json({
      sucesso: false,
      erro: "ERRO_CRIAR_ADMIN",
      mensagem: "Erro interno ao criar o administrador",
    });
  }
});

export default router;
