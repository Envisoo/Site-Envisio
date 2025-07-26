/** @format */

// configuracoes/baseDados.js

// Importa o pacote pg (PostgreSQL)
const { Pool } = require("pg");

// Cria a pool de conexão usando a variável DATABASE_URL do .env
const pool = new Pool({
  user: "postgres", // ex: "postgres"
  password: "9900", // ex: "12345" (como string direta)
  host: "localhost", // ou IP do servidor
  port: 5432, // porta padrão
  database: "academia", // ex: "meu_banco"
});

// Testa a conexão com o banco
pool
  .connect()
  .then(() => {
    console.log(
      "🔗 Conexão com o banco de dados PostgreSQL estabelecida com sucesso!"
    );
  })
  .catch((erro) => {
    console.error("❌ Erro ao conectar ao banco de dados:", erro);
  });

// Exporta o pool para uso nos outros arquivos
module.exports = pool;
