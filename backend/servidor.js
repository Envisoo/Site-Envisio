/** @format */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lista de rotas para importar
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

// Função para carregar rotas dinamicamente
for (const { path, route } of routeFiles) {
  try {
    console.log(`📂 Carregando rota: ${path}`);
    const module = require(join(__dirname, path)); // garante caminho certo
    app.use(route, module.default || module); // fallback se não for default
    console.log(`✅ Rota carregada: ${route}`);
  } catch (error) {
    console.error(`❌ Erro ao carregar ${path}:`, error.message);
    throw error;
  }
}

// Inicializa as rotas
await setupRoutes();

// Configuração de arquivos estáticos (uploads de usuários)
app.use("/uploads", express.static(join(__dirname, "uploads")));

// Servir o frontend buildado
app.use(express.static(join(__dirname, "public")));
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🟢 Servidor rodando na porta ${PORT}`);
  console.log(`🔗 Acesse: http://localhost:${PORT}`);
});

export default app;
