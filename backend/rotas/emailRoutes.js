/** @format */

import express from "express";
import {
  enviarEmail,
  uploadMiddleware,
} from "../controllers/emailController.js";

const router = express.Router();

// Rota para envio de email com upload de arquivos
router.post("/email", uploadMiddleware, enviarEmail);

export default router;
