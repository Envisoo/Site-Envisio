/** @format */

const baseDados = require("../configuracoes/baseDados");

async function verificarUsuarios() {
    try {
        console.log("🔍 Verificando usuários no banco de dados...\n");

        const resultado = await baseDados.query(
            "SELECT id, nome, email, papel, criado_em FROM usuarios ORDER BY id"
        );

        if (resultado.rows.length === 0) {
            console.log("❌ Nenhum usuário encontrado no banco de dados");
            return;
        }

        console.log(`✅ Encontrados ${resultado.rows.length} usuário(s):\n`);

        resultado.rows.forEach((usuario, index) => {
            console.log(`${index + 1}. ${usuario.nome}`);
            console.log(`   Email: ${usuario.email}`);
            console.log(`   Papel: ${usuario.papel}`);
            console.log(`   ID: ${usuario.id}`);
            console.log(`   Criado em: ${usuario.criado_em}`);
            console.log("");
        });
    } catch (erro) {
        console.error("❌ Erro ao verificar usuários:", erro);
    } finally {
        process.exit(0);
    }
}

verificarUsuarios();