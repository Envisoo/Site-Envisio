/** @format */

const baseDados = require("../configuracoes/baseDados");
const bcrypt = require("bcrypt");

async function inserirDadosExemplo() {
    try {
        console.log("�� Inserindo dados de exemplo...\n");

        // Inserir categorias
        const categorias = [{
                nome: "Programação",
                descricao: "Cursos de desenvolvimento de software",
            },
            { nome: "Design", descricao: "Cursos de design gráfico e UX/UI" },
            { nome: "Marketing", descricao: "Cursos de marketing digital" },
            { nome: "Negócios", descricao: "Cursos de empreendedorismo" },
        ];

        for (const categoria of categorias) {
            await baseDados.query(
                "INSERT INTO categorias (nome, descricao) VALUES ($1, $2) ON CONFLICT DO NOTHING", [categoria.nome, categoria.descricao]
            );
        }
        console.log("✅ Categorias inseridas");

        // Inserir instrutores
        const senhaHash = await bcrypt.hash("123456", 10);
        const instrutores = [
            { nome: "João Silva", email: "joao@exemplo.com" },
            { nome: "Maria Santos", email: "maria@exemplo.com" },
        ];

        for (const instrutor of instrutores) {
            await baseDados.query(
                "INSERT INTO usuarios (nome, email, senha, papel) VALUES ($1, $2, $3, 'instrutor') ON CONFLICT DO NOTHING", [instrutor.nome, instrutor.email, senhaHash]
            );
        }
        console.log("✅ Instrutores inseridos");

        // Inserir alunos
        const alunos = [
            { nome: "Pedro Costa", email: "pedro@exemplo.com" },
            { nome: "Ana Oliveira", email: "ana@exemplo.com" },
            { nome: "Carlos Lima", email: "carlos@exemplo.com" },
        ];

        for (const aluno of alunos) {
            await baseDados.query(
                "INSERT INTO usuarios (nome, email, senha, papel) VALUES ($1, $2, $3, 'aluno') ON CONFLICT DO NOTHING", [aluno.nome, aluno.email, senhaHash]
            );
        }
        console.log("✅ Alunos inseridos");

        // Inserir cursos
        const cursos = [{
                titulo: "JavaScript Básico",
                descricao: "Aprenda JavaScript do zero",
                categoria: "Programação",
                preco: 99.9,
            },
            {
                titulo: "React Avançado",
                descricao: "Desenvolvimento com React",
                categoria: "Programação",
                preco: 149.9,
            },
            {
                titulo: "Design de Interfaces",
                descricao: "UX/UI Design",
                categoria: "Design",
                preco: 129.9,
            },
        ];

        for (const curso of cursos) {
            await baseDados.query(
                "INSERT INTO cursos (titulo, descricao, categoria, preco) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING", [curso.titulo, curso.descricao, curso.categoria, curso.preco]
            );
        }
        console.log("✅ Cursos inseridos");

        console.log("\n🎉 Dados de exemplo inseridos com sucesso!");
    } catch (erro) {
        console.error("❌ Erro ao inserir dados:", erro);
    } finally {
        process.exit(0);
    }
}

inserirDadosExemplo();