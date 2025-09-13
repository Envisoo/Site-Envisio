/** @format */

const baseDados = require("../configuracoes/baseDados");

async function inserirCursosCompletos() {
    try {
        console.log("🔄 Inserindo cursos completos...\n");

        // Limpar cursos existentes
        await baseDados.query("DELETE FROM cursos");
        console.log("✅ Cursos existentes removidos");

        // Inserir cursos com dados completos
        const cursos = [{
                titulo: "JavaScript Básico ao Avançado",
                descricao: "Aprenda JavaScript do zero até conceitos avançados. Ideal para iniciantes que querem dominar a linguagem mais popular do mundo web.",
                categoria: "Programação",
                duracao: 25,
                nivel: "iniciante",
                preco: 150000,
                status: "disponivel",
                acesso_vitalicio: true,
                suporte: true,
                certificado: true,
                visualizacoes: 1250,
                avaliacao: 4.8,
                instrutor_nome: "João Silva",
                instrutor_avaliacao: 4.9,
                instrutor_alunos: 1250,
                instrutor_aulas: 45,
            },
            {
                titulo: "React.js Completo",
                descricao: "Domine React.js com hooks, context API, e desenvolvimento de aplicações modernas. Do básico ao avançado.",
                categoria: "Programação",
                duracao: 30,
                nivel: "intermediario",
                preco: 200000,
                status: "disponivel",
                acesso_vitalicio: true,
                suporte: true,
                certificado: true,
                visualizacoes: 2100,
                avaliacao: 4.9,
                instrutor_nome: "Maria Santos",
                instrutor_avaliacao: 4.8,
                instrutor_alunos: 1890,
                instrutor_aulas: 52,
            },
            {
                titulo: "Node.js Backend",
                descricao: "Desenvolva APIs robustas com Node.js, Express e MongoDB. Aprenda a criar backends escaláveis.",
                categoria: "Programação",
                duracao: 28,
                nivel: "intermediario",
                preco: 180000,
                status: "disponivel",
                acesso_vitalicio: true,
                suporte: true,
                certificado: true,
                visualizacoes: 980,
                avaliacao: 4.7,
                instrutor_nome: "Carlos Oliveira",
                instrutor_avaliacao: 4.6,
                instrutor_alunos: 750,
                instrutor_aulas: 38,
            },
            {
                titulo: "UX/UI Design Avançado",
                descricao: "Aprenda design de interfaces modernas e experiência do usuário. Ferramentas: Figma, Adobe XD, e princípios de design.",
                categoria: "Design",
                duracao: 35,
                nivel: "avancado",
                preco: 250000,
                status: "disponivel",
                acesso_vitalicio: true,
                suporte: true,
                certificado: true,
                visualizacoes: 1650,
                avaliacao: 4.9,
                instrutor_nome: "Ana Costa",
                instrutor_avaliacao: 4.9,
                instrutor_alunos: 1100,
                instrutor_aulas: 60,
            },
            {
                titulo: "Marketing Digital",
                descricao: "Estratégias de marketing digital para o mercado angolano. SEO, redes sociais, e publicidade online.",
                categoria: "Marketing",
                duracao: 20,
                nivel: "iniciante",
                preco: 120000,
                status: "disponivel",
                acesso_vitalicio: true,
                suporte: false,
                certificado: true,
                visualizacoes: 890,
                avaliacao: 4.6,
                instrutor_nome: "Pedro Lima",
                instrutor_avaliacao: 4.5,
                instrutor_alunos: 650,
                instrutor_aulas: 25,
            },
            {
                titulo: "Python para Data Science",
                descricao: "Análise de dados e machine learning com Python. Pandas, NumPy, Matplotlib e Scikit-learn.",
                categoria: "Programação",
                duracao: 40,
                nivel: "avancado",
                preco: 300000,
                status: "brevemente",
                acesso_vitalicio: true,
                suporte: true,
                certificado: true,
                visualizacoes: 450,
                avaliacao: 0,
                instrutor_nome: "Dr. Manuel Silva",
                instrutor_avaliacao: 4.9,
                instrutor_alunos: 320,
                instrutor_aulas: 0,
            },
            {
                titulo: "Flutter Mobile Development",
                descricao: "Desenvolva aplicações móveis multiplataforma com Flutter e Dart. Do conceito ao deploy.",
                categoria: "Programação",
                duracao: 32,
                nivel: "intermediario",
                preco: 220000,
                status: "brevemente",
                acesso_vitalicio: true,
                suporte: true,
                certificado: true,
                visualizacoes: 320,
                avaliacao: 0,
                instrutor_nome: "Luísa Fernandes",
                instrutor_avaliacao: 4.7,
                instrutor_alunos: 280,
                instrutor_aulas: 0,
            },
            {
                titulo: "Gestão de Projetos Ágeis",
                descricao: "Metodologias ágeis, Scrum, Kanban e ferramentas de gestão de projetos para o contexto angolano.",
                categoria: "Negócios",
                duracao: 18,
                nivel: "intermediario",
                preco: 160000,
                status: "desenvolvimento",
                acesso_vitalicio: false,
                suporte: false,
                certificado: false,
                visualizacoes: 120,
                avaliacao: 0,
                instrutor_nome: "Roberto Almeida",
                instrutor_avaliacao: 4.4,
                instrutor_alunos: 95,
                instrutor_aulas: 0,
            },
            {
                titulo: "Angular Framework",
                descricao: "Desenvolvimento de aplicações web com Angular. TypeScript, componentes, serviços e roteamento.",
                categoria: "Programação",
                duracao: 26,
                nivel: "intermediario",
                preco: 190000,
                status: "desenvolvimento",
                acesso_vitalicio: true,
                suporte: true,
                certificado: true,
                visualizacoes: 85,
                avaliacao: 0,
                instrutor_nome: "Sofia Martins",
                instrutor_avaliacao: 4.6,
                instrutor_alunos: 45,
                instrutor_aulas: 0,
            },
            {
                titulo: "Design Gráfico Profissional",
                descricao: "Adobe Photoshop, Illustrator e InDesign. Criação de identidades visuais e materiais gráficos.",
                categoria: "Design",
                duracao: 22,
                nivel: "iniciante",
                preco: 140000,
                status: "disponivel",
                acesso_vitalicio: false,
                suporte: true,
                certificado: true,
                visualizacoes: 720,
                avaliacao: 4.5,
                instrutor_nome: "Teresa Santos",
                instrutor_avaliacao: 4.4,
                instrutor_alunos: 520,
                instrutor_aulas: 28,
            },
        ];

        for (const curso of cursos) {
            await baseDados.query(
                `
                INSERT INTO cursos (
                    titulo, descricao, categoria, duracao, nivel, preco, status,
                    acesso_vitalicio, suporte, certificado, visualizacoes, avaliacao,
                    instrutor_nome, instrutor_avaliacao, instrutor_alunos, instrutor_aulas
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
            `, [
                    curso.titulo,
                    curso.descricao,
                    curso.categoria,
                    curso.duracao,
                    curso.nivel,
                    curso.preco,
                    curso.status,
                    curso.acesso_vitalicio,
                    curso.suporte,
                    curso.certificado,
                    curso.visualizacoes,
                    curso.avaliacao,
                    curso.instrutor_nome,
                    curso.instrutor_avaliacao,
                    curso.instrutor_alunos,
                    curso.instrutor_aulas,
                ]
            );
        }

        console.log("✅ Cursos inseridos com sucesso!");
        console.log(`📊 Total de cursos inseridos: ${cursos.length}`);

        // Mostrar estatísticas
        const stats = await baseDados.query(`
            SELECT 
                status,
                COUNT(*) as total,
                AVG(preco) as preco_medio,
                AVG(avaliacao) as avaliacao_media
            FROM cursos 
            GROUP BY status
        `);

        console.log("\n📈 Estatísticas dos cursos:");
        stats.rows.forEach((row) => {
            console.log(
                `- ${row.status}: ${
          row.total
        } cursos (Preço médio: ${row.preco_medio?.toFixed(
          0
        )} Kz, Avaliação: ${row.avaliacao_media?.toFixed(1)})`
            );
        });
    } catch (erro) {
        console.error("❌ Erro ao inserir cursos:", erro);
    } finally {
        process.exit(0);
    }
}

inserirCursosCompletos();