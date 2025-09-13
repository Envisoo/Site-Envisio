/** @format */

const baseDados = require("../configuracoes/baseDados");

async function atualizarTabelaCursos() {
    try {
        console.log("🔄 Atualizando estrutura da tabela cursos...\n");

        // Adicionar colunas que faltam na tabela cursos
        const colunasParaAdicionar = [
            "ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'disponivel'",
            "ADD COLUMN IF NOT EXISTS acesso_vitalicio BOOLEAN DEFAULT false",
            "ADD COLUMN IF NOT EXISTS suporte BOOLEAN DEFAULT false",
            "ADD COLUMN IF NOT EXISTS certificado BOOLEAN DEFAULT false",
            "ADD COLUMN IF NOT EXISTS visualizacoes INTEGER DEFAULT 0",
            "ADD COLUMN IF NOT EXISTS avaliacao DECIMAL(3,2) DEFAULT 0.0",
            "ADD COLUMN IF NOT EXISTS instrutor_nome VARCHAR(255)",
            "ADD COLUMN IF NOT EXISTS instrutor_avaliacao DECIMAL(3,2) DEFAULT 0.0",
            "ADD COLUMN IF NOT EXISTS instrutor_alunos INTEGER DEFAULT 0",
            "ADD COLUMN IF NOT EXISTS instrutor_aulas INTEGER DEFAULT 0",
        ];

        for (const coluna of colunasParaAdicionar) {
            try {
                await baseDados.query(`ALTER TABLE cursos ${coluna}`);
                console.log(`✅ Coluna adicionada: ${coluna.split(" ")[3]}`);
            } catch (erro) {
                console.log(`⚠️ Coluna já existe ou erro: ${coluna.split(" ")[3]}`);
            }
        }

        console.log("\n✅ Estrutura da tabela cursos atualizada!");
    } catch (erro) {
        console.error("❌ Erro ao atualizar tabela:", erro);
    } finally {
        process.exit(0);
    }
}

atualizarTabelaCursos();