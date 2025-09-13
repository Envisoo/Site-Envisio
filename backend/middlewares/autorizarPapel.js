/** @format */

// middlewares/autorizarPapel.js

/**
 * Middleware para autorizar usuários com base no papel (admin, instrutor, aluno).
 * Uso: autorizarPapel("admin"), autorizarPapel("admin", "instrutor"), etc.
 */

function autorizarPapel(...papeisPermitidos) {
  return (req, res, next) => {
    const usuario = req.usuario; // Adicionado pelo middleware de autenticação

    if (!usuario || !papeisPermitidos.includes(usuario.papel)) {
      return res.status(403).json({
        erro: "Acesso negado: permissão insuficiente",
        permitido_para: papeisPermitidos,
      });
    }

    next(); // Continua para a rota
  };
}

export { autorizarPapel };
