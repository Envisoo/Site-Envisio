/** @format */

const baseDados = require("../configuracoes/baseDados");
const bcrypt = require("bcrypt");

async function popularCursoExemplo() {
    try {
        console.log(" Iniciando cadastro de curso exemplo...");

        // 1. Verificar se o instrutor já existe
        let instrutorRes = await baseDados.query(
            "SELECT id FROM usuarios WHERE email = $1", ["joao@exemplo.com"]
        );

        let instrutorId;
        if (instrutorRes.rows.length > 0) {
            instrutorId = instrutorRes.rows[0].id;
            console.log("✅ Instrutor já existe (ID: " + instrutorId + ")");
        } else {
            // Criar instrutor (usuário)
            const senhaHash = await bcrypt.hash("123456", 10);
            await baseDados.query(
                `INSERT INTO usuarios (nome, email, senha, papel)
         VALUES ($1, $2, $3, 'instrutor')`, ["João Instrutor", "joao@exemplo.com", senhaHash]
            );

            instrutorRes = await baseDados.query(
                "SELECT id FROM usuarios WHERE email = $1", ["joao@exemplo.com"]
            );
            instrutorId = instrutorRes.rows[0].id;
            console.log("✅ Instrutor criado (ID: " + instrutorId + ")");
        }

        // 2. Verificar se o curso já existe
        let cursoRes = await baseDados.query(
            "SELECT id FROM cursos WHERE titulo = $1", ["Curso de Redes e Segurança"]
        );

        let cursoId;
        if (cursoRes.rows.length > 0) {
            cursoId = cursoRes.rows[0].id;
            console.log("✅ Curso já existe (ID: " + cursoId + ")");
        } else {
            // Criar curso
            await baseDados.query(
                `INSERT INTO cursos (
          titulo, descricao, categoria, duracao, nivel, preco, status,
          acesso_vitalicio, suporte, certificado, visualizacoes, avaliacao,
          instrutor_nome, instrutor_avaliacao, instrutor_alunos, instrutor_aulas, imagem, instrutor_id
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7,
          $8, $9, $10, $11, $12,
          $13, $14, $15, $16, $17, $18
        )`, [
                    "Curso de Redes e Segurança",
                    "Curso completo sobre redes de computadores e segurança, incluindo práticas com Fortigate. Aprenda a configurar firewalls, implementar políticas de segurança e proteger sua infraestrutura de rede.",
                    "Redes",
                    40,
                    "intermediario",
                    150000,
                    "disponivel",
                    true,
                    true,
                    true,
                    120,
                    4.8,
                    "João Instrutor",
                    4.9,
                    300,
                    25,
                    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
                    instrutorId,
                ]
            );

            cursoRes = await baseDados.query(
                "SELECT id FROM cursos WHERE titulo = $1", ["Curso de Redes e Segurança"]
            );
            cursoId = cursoRes.rows[0].id;
            console.log("✅ Curso criado (ID: " + cursoId + ")");
        }

        // 3. Verificar se já existem aulas para este curso
        const aulasExistentes = await baseDados.query(
            "SELECT COUNT(*) as total FROM aulas WHERE curso_id = $1", [cursoId]
        );

        if (aulasExistentes.rows[0].total > 0) {
            console.log("✅ Aulas já existem para este curso");
        } else {
            // Criar aulas
            const aulas = [{
                    titulo: "Introdução ao Curso",
                    descricao: "Bem-vindo ao curso! Nesta aula você conhecerá a estrutura do curso e os objetivos de aprendizagem.",
                    video_url: "https://www.youtube.com/embed/VIDEO_ID1",
                    ordem: 1,
                },
                {
                    titulo: "Configuração Inicial",
                    descricao: "Primeiros passos com Fortigate. Aprenda a configurar o ambiente básico.",
                    video_url: "https://www.youtube.com/embed/VIDEO_ID2",
                    ordem: 2,
                },
                {
                    titulo: "Políticas de Segurança",
                    descricao: "Como criar e gerenciar políticas de segurança eficazes.",
                    video_url: "https://www.youtube.com/embed/VIDEO_ID3",
                    ordem: 3,
                },
                {
                    titulo: "Exercícios Práticos",
                    descricao: "Praticando o que foi aprendido com exercícios hands-on.",
                    video_url: "https://www.youtube.com/embed/VIDEO_ID4",
                    ordem: 4,
                },
                {
                    titulo: "Configuração de VPN",
                    descricao: "Implementando VPNs seguras para acesso remoto.",
                    video_url: "https://www.youtube.com/embed/VIDEO_ID5",
                    ordem: 5,
                },
                {
                    titulo: "Monitoramento e Logs",
                    descricao: "Como monitorar e analisar logs de segurança.",
                    video_url: "https://www.youtube.com/embed/VIDEO_ID6",
                    ordem: 6,
                },
            ];

            for (const aula of aulas) {
                await baseDados.query(
                    `INSERT INTO aulas (titulo, descricao, video_url, ordem, curso_id)
           VALUES ($1, $2, $3, $4, $5)`, [aula.titulo, aula.descricao, aula.video_url, aula.ordem, cursoId]
                );
            }
            console.log("✅ " + aulas.length + " aulas criadas");
        }

        console.log(" Processo concluído com sucesso!");
        console.log(`📊 Resumo:`);
        console.log(`   - Instrutor: João Instrutor (ID: ${instrutorId})`);
        console.log(`   - Curso: Curso de Redes e Segurança (ID: ${cursoId})`);
        console.log(`   - Acesse: http://localhost:3000/academia/curso/${cursoId}`);
    } catch (erro) {
        console.error("❌ Erro ao popular dados:", erro);
    } finally {
        process.exit(0);
    }
}

popularCursoExemplo();