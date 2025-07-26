/** @format */

// Importação dos módulos necessários
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Inicializa variáveis de ambiente
dotenv.config();

// Cria a aplicação Express
const app = express(); // Padronizando para 'app' (convenção comum)

// Middlewares essenciais
app.use(cors()); // Permite CORS (deve vir primeiro)
app.use(express.json()); // Para parsear JSON nas requisições
app.use(express.urlencoded({ extended: true })); // Para forms HTML

// Importação das rotas
const cursosRouter = require("./rotas/cursos");
const usuariosRouter = require("./rotas/usuarios");
const loginRouter = require("./rotas/login");
const inscricoesRota = require("./rotas/inscricoes");
const rotasInstrutor = require("./rotas/instrutor");
const rotasAvaliacoes = require("./rotas/avaliacoes");
const rotasFavoritos = require("./rotas/favoritos");
const rotasAdmin = require("./rotas/admin");
const rotasCertificados = require("./rotas/certificados");
const rotasUpload = require("./rotas/upload");
const recuperarSenhaRotas = require("./rotas/recuperarSenha");
const perfilAlunoRotas = require("./rotas/perfilAluno");
const pagamentosRouter = require("./rotas/pagamentos");
const webhookRouter = require("./rotas/webhook");
const modulosRouter = require("./rotas/modulos");
const licoesRouter = require("./rotas/licoes");

// Configuração das rotas
app.use("/cursos", cursosRouter);
app.use("/usuarios", usuariosRouter);
app.use("/login", loginRouter);
app.use("/inscricoes", inscricoesRota);
app.use("/instrutor", rotasInstrutor);
app.use("/avaliacoes", rotasAvaliacoes);
app.use("/favoritos", rotasFavoritos);
app.use("/admin", rotasAdmin);
app.use("/certificados", rotasCertificados);
app.use("/upload", rotasUpload);
app.use("/uploads", express.static("uploads"));
app.use("/recuperar-senha", recuperarSenhaRotas);
app.use("/perfil-aluno", perfilAlunoRotas);
app.use("/pagamentos", pagamentosRouter);
app.use("/webhook", webhookRouter);
app.use("/modulos", modulosRouter);
app.use("/licoes", licoesRouter);

const instalarAdmin = require("./rotas/instalarAdmin");
app.use("/", instalarAdmin);

// Rota raiz para verificação do servidor
app.get("/", (req, res) => {
  res.status(200).json({
    status: "online",
    mensagem: "API funcionando corretamente",
    versao: "1.0.0",
  });
});

// Middleware para rotas não encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({
    sucesso: false,
    mensagem: "Rota não encontrada",
  });
});

// Middleware de tratamento de erros (deve ser o último)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    sucesso: false,
    mensagem: "Erro interno no servidor",
    detalhes: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Configuração da porta
const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🟢 Servidor rodando na porta ${PORT}`);
  console.log(`🔗 Acesse: http://localhost:${PORT}`);
});

// Exporta o app para testes (opcional)
module.exports = app;
