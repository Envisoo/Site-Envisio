/** @format */

const baseDados = require("../configuracoes/baseDados");

async function verificarTabelas() {
    try {
        console.log("🔍 Verificando estrutura do banco de dados...\n");

        // Verificar se as tabelas existem
        const tabelas = [
            "usuarios",
            "cursos",
            "categorias",
            "inscricoes",
            "avaliacoes",
            "favoritos",
        ];

        for (const tabela of tabelas) {
            try {
                const resultado = await baseDados.query(
                    `
          SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = $1
          );
        `, [tabela]
                );

                if (resultado.rows[0].exists) {
                    console.log(`✅ Tabela '${tabela}' existe`);

                    // Contar registros
                    const count = await baseDados.query(`SELECT COUNT(*) FROM ${tabela}`);
                    console.log(`   - Registros: ${count.rows[0].count}`);
                } else {
                    console.log(`❌ Tabela '${tabela}' NÃO existe`);
                }
            } catch (erro) {
                console.log(`❌ Erro ao verificar tabela '${tabela}':`, erro.message);
            }
        }
    } catch (erro) {
        console.error("❌ Erro geral:", erro);
    } finally {
        process.exit(0);
    }
}

verificarTabelas();