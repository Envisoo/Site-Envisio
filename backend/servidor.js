/** @format */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Necessário para usar __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar variáveis de ambiente (.env)
dotenv.config();

const app = express();

// 🧩 Middlewares básicos
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📁 Lista de rotas para importar dinamicamente
const routeFiles = [
  { path: "./rotas/cursos.js", route: "/cursos" },
  { path: "./rotas/usuarios.js", route: "/usuarios" },
  { path: "./rotas/login.js", route: "/login" },
  { path: "./rotas/inscricoes.js", route: "/inscricoes" },
  { path: "./rotas/instrutor.js", route: "/instrutor" },
  { path: "./rotas/avaliacoes.js", route: "/avaliacoes" },
  { path: "./rotas/favoritos.js", route: "/favoritos" },
  { path: "./rotas/admin.js", route: "/admin" },
  { path: "./rotas/certificados.js", route: "/certificados" },
  { path: "./rotas/upload.js", route: "/upload" },
  { path: "./rotas/recuperarSenha.js", route: "/recuperar-senha" },
  { path: "./rotas/perfilAluno.js", route: "/perfil-aluno" },
  { path: "./rotas/pagamentos.js", route: "/pagamentos" },
  { path: "./rotas/webhook.js", route: "/webhook" },
  { path: "./rotas/modulos.js", route: "/modulos" },
  { path: "./rotas/licoes.js", route: "/licoes" },
  { path: "./rotas/emailRoutes.js", route: "/api" },
];

// 🔄 Função para carregar rotas dinamicamente
const setupRoutes = async () => {
  try {
    for (const { path, route } of routeFiles) {
      try {
        console.log(`📂 Tentando carregar rota: ${path} -> ${route}`);

        // Verifica se a rota é válida
        if (!route || typeof route !== "string" || !route.startsWith("/")) {
          throw new Error(`❌ Rota inválida: "${route}" em ${path}`);
        }

        const module = await import(path);

        if (!module.default) {
          throw new Error(`❌ Módulo sem export default: ${path}`);
        }

        app.use(route, module.default);
        console.log(`✅ Rota carregada com sucesso: ${route}`);
      } catch (err) {
        console.error(`⚠️ Falha ao carregar ${path}:`, err.message);
      }
    }

    console.log("✅ Todas as rotas carregadas com sucesso");
  } catch (error) {
    console.error("❌ Erro ao carregar rotas:", error);
    process.exit(1);
  }
};

// Inicializa as rotas
await setupRoutes();

// 🖼️ Servir uploads (imagens, certificados, etc.)
app.use("/uploads", express.static(join(__dirname, "uploads")));

// 🧱 Servir o build do React (frontend)
app.use(express.static(join(__dirname, "public")));

// 🛠️ Rota de teste da API
app.get("/api", (req, res) => {
  res.send("🚀 API da Envisio está no ar!");
});

// ⚛️ Rota fallback → React Router cuida das rotas do frontend
// Rota fallback: envia index.html para qualquer rota React
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🚀 Inicialização do servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🟢 Servidor rodando na porta ${PORT}`);
  console.log(`🔗 Acesse: http://localhost:${PORT}`);
});

export default app;
