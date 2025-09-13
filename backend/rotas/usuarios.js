/** @format */

// Importação dos módulos necessários
import express from "express";
import { Router } from "express";
import { db } from "../db/conexao.js";
import bcrypt from "bcrypt";
import { autenticar } from "../middlewares/autenticar.js";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, "../uploads/"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Rotas públicas
router.post("/registro", async (req, res) => {
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
    const resultado = await db.query(
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

router.post("/login", async (req, res) => {
  // ...existing code...
});

// Rotas protegidas
router.use(autenticar);

router.get("/perfil", async (req, res) => {
  // ...existing code...
});

router.put("/atualizar", upload.single("foto"), async (req, res) => {
  // ...existing code...
});

export default router;
