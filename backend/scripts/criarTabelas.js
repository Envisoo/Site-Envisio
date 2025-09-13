/** @format */

const baseDados = require("../configuracoes/baseDados");

async function criarTabelas() {
    try {
        console.log("�� Criando tabelas do banco de dados...\n");

        // Tabela usuarios
        await baseDados.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL,
        papel VARCHAR(50) NOT NULL DEFAULT 'aluno',
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log("✅ Tabela 'usuarios' criada/verificada");

        // Tabela categorias
        await baseDados.query(`
      CREATE TABLE IF NOT EXISTS categorias (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        descricao TEXT,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log("✅ Tabela 'categorias' criada/verificada");

        // Tabela cursos
        await baseDados.query(`
      CREATE TABLE IF NOT EXISTS cursos (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        descricao TEXT,
        categoria VARCHAR(255),
        duracao INTEGER,
        nivel VARCHAR(50),
        preco DECIMAL(10,2) DEFAULT 0,
        instrutor_id INTEGER REFERENCES usuarios(id),
        imagem VARCHAR(500),
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log("✅ Tabela 'cursos' criada/verificada");

        // Tabela inscricoes
        await baseDados.query(`
      CREATE TABLE IF NOT EXISTS inscricoes (
        id SERIAL PRIMARY KEY,
        usuario_id INTEGER REFERENCES usuarios(id),
        curso_id INTEGER REFERENCES cursos(id),
        data_inscricao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) DEFAULT 'ativo'
      );
    `);
        console.log("✅ Tabela 'inscricoes' criada/verificada");

        // Tabela avaliacoes
        await baseDados.query(`
      CREATE TABLE IF NOT EXISTS avaliacoes (
        id SERIAL PRIMARY KEY,
        usuario_id INTEGER REFERENCES usuarios(id),
        curso_id INTEGER REFERENCES cursos(id),
        nota INTEGER CHECK (nota >= 1 AND nota <= 5),
        comentario TEXT,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log("✅ Tabela 'avaliacoes' criada/verificada");

        // Tabela favoritos
        await baseDados.query(`
      CREATE TABLE IF NOT EXISTS favoritos (
        id SERIAL PRIMARY KEY,
        usuario_id INTEGER REFERENCES usuarios(id),
        curso_id INTEGER REFERENCES cursos(id),
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(usuario_id, curso_id)
      );
    `);
        console.log("✅ Tabela 'favoritos' criada/verificada");

        console.log("\n🎉 Todas as tabelas foram criadas com sucesso!");
    } catch (erro) {
        console.error("❌ Erro ao criar tabelas:", erro);
    } finally {
        process.exit(0);
    }
}

criarTabelas();