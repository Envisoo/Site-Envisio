/** @format */

const bcrypt = require("bcrypt");
const baseDados = require("../configuracoes/baseDados");

async function criarAdmin() {
    try {
        // Verificar se já existe um admin
        const adminExistente = await baseDados.query(
            "SELECT * FROM usuarios WHERE papel = 'admin'"
        );

        if (adminExistente.rows.length > 0) {
            console.log("✅ Admin já existe:");
            adminExistente.rows.forEach((admin) => {
                console.log(`- ${admin.nome} (${admin.email})`);
            });
            return;
        }

        // Dados do admin
        const adminData = {
            nome: "Teodoro Pedro",
            email: "teodorop990@gmail.com",
            senha: "9900ooppl",
            papel: "admin",
        };

        // Hash da senha
        const senhaHash = await bcrypt.hash(adminData.senha, 10);

        // Inserir admin
        const resultado = await baseDados.query(
            `INSERT INTO usuarios (nome, email, senha, papel)
       VALUES ($1, $2, $3, $4)
       RETURNING id, nome, email, papel`, [adminData.nome, adminData.email, senhaHash, adminData.papel]
        );

        console.log("✅ Admin criado com sucesso:");
        console.log(`- Nome: ${resultado.rows[0].nome}`);
        console.log(`- Email: ${resultado.rows[0].email}`);
        console.log(`- Papel: ${resultado.rows[0].papel}`);
        console.log(`- ID: ${resultado.rows[0].id}`);
    } catch (erro) {
        console.error("❌ Erro ao criar admin:", erro);
    } finally {
        process.exit(0);
    }
}

criarAdmin();