/** @format */

const express = require("express");
const router = express.Router();
const db = require("../configuracoes/baseDados");
const autenticar = require("../middleware/autenticar");
const autorizarPapel = require("../middleware/autorizarPapel");

// 🔒 Rota protegida: Painel completo do aluno
router.get("/", autenticar, autorizarPapel("aluno"), async (req, res) => {
  const alunoId = req.usuario.id;

  try {
    // 1. Dados pessoais do aluno
    const dadosUsuario = await db.query(
      `SELECT id, nome, email, criado_em FROM usuarios WHERE id = $1`,
      [alunoId]
    );

    // 2. Cursos inscritos (com status de conclusão)
    const cursos = await db.query(
      `SELECT c.id, c.titulo, c.descricao, c.imagem,
              i.status, i.data_conclusao, i.criado_em AS data_inscricao
       FROM cursos c
       JOIN inscricoes i ON i.curso_id = c.id
       WHERE i.usuario_id = $1`,
      [alunoId]
    );

    // 3. Cursos concluídos
    const concluidos = cursos.rows.filter(
      (curso) => curso.status === "concluido"
    );

    // 4. Avaliações feitas
    const avaliacoes = await db.query(
      `SELECT a.id, a.nota, a.comentario, c.titulo AS curso, a.criado_em
       FROM avaliacoes a
       JOIN cursos c ON c.id = a.curso_id
       WHERE a.usuario_id = $1
       ORDER BY a.criado_em DESC`,
      [alunoId]
    );

    // 5. Favoritos
    const favoritos = await db.query(
      `SELECT c.id, c.titulo, c.descricao, c.imagem
       FROM favoritos f
       JOIN cursos c ON c.id = f.curso_id
       WHERE f.usuario_id = $1`,
      [alunoId]
    );

    // 6. Certificados (simulado: curso concluído + nota >= 7)
    const certificados = await db.query(
      `SELECT c.id, c.titulo, i.data_conclusao
       FROM cursos c
       JOIN inscricoes i ON i.curso_id = c.id
       JOIN avaliacoes a ON a.curso_id = c.id AND a.usuario_id = i.usuario_id
       WHERE i.usuario_id = $1 AND i.status = 'concluido' AND a.nota >= 7`,
      [alunoId]
    );

    return res.status(200).json({
      sucesso: true,
      dados: {
        aluno: dadosUsuario.rows[0],
        cursosInscritos: cursos.rows,
        cursosConcluidos: concluidos,
        avaliacoes: avaliacoes.rows,
        favoritos: favoritos.rows,
        certificados: certificados.rows,
      },
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao carregar perfil do aluno" });
  }
});

// 🔄 Rota: Atualizar dados pessoais do aluno
router.put("/editar", autenticar, autorizarPapel("aluno"), async (req, res) => {
  const alunoId = req.usuario.id;
  const { nome, email } = req.body;

  // Validação simples
  if (!nome || !email) {
    return res
      .status(400)
      .json({ erro: "Nome e email são obrigatórios para atualização." });
  }

  try {
    // Verifica se já existe outro usuário com o mesmo email
    const existeEmail = await db.query(
      `SELECT id FROM usuarios WHERE email = $1 AND id <> $2`,
      [email, alunoId]
    );
    if (existeEmail.rowCount > 0) {
      return res
        .status(400)
        .json({ erro: "Email já está em uso por outro usuário." });
    }

    // Atualiza os dados
    await db.query(`UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3`, [
      nome,
      email,
      alunoId,
    ]);

    res.status(200).json({
      sucesso: true,
      mensagem: "Dados atualizados com sucesso.",
      dadosAtualizados: { nome, email },
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao atualizar dados do aluno." });
  }
});

module.exports = router;
