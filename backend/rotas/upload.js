/** @format */

import express from "express";
import { Router } from "express";
import multer from "multer";
import path from "path";
import { db } from "../db/conexao.js";
import { autenticar } from "../middlewares/autenticar.js";
import { autorizarPapel } from "../middlewares/autorizarPapel.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

// Configuração do destino e nome do arquivo
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destino =
      file.fieldname === "imagemPerfil" ? "uploads/perfis" : "uploads/capas";
    cb(null, destino);
  },
  filename: (req, file, cb) => {
    const nomeUnico = `${Date.now()}-${file.originalname}`;
    cb(null, nomeUnico);
  },
});

//aceitar apenas imagens
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const tiposPermitidos = /jpeg|jpg|png|webp/;
    const ehValido = tiposPermitidos.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (ehValido) cb(null, true);
    else cb(new Error("Apenas imagens são permitidas."));
  },
});

// 📸 Upload de imagem de perfil
router.post(
  "/perfil",
  autenticar,
  autorizarPapel("instrutor"),
  upload.single("imagemPerfil"),
  async (req, res) => {
    const caminho = req.file.path.replace(/\\/g, "/");
    res.status(200).json({
      sucesso: true,
      mensagem: "Imagem de perfil enviada com sucesso!",
      caminho,
    });
  }
);

// 📸 Upload de capa de curso
router.post(
  "/capa/:cursoId",
  autenticar,
  autorizarPapel("instrutor"),
  upload.single("imagemCapa"),
  async (req, res) => {
    const { cursoId } = req.params;
    const caminho = req.file.path.replace(/\\/g, "/");

    try {
      await db.query(
        "UPDATE cursos SET imagem = $1 WHERE id = $2",
        [caminho, cursoId]
      );

      res.status(200).json({
        sucesso: true,
        mensagem: "Capa do curso atualizada com sucesso!",
        caminho,
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao atualizar imagem do curso" });
    }
  }
);

export default router;
