/** @format */

// middlewares/autenticar.js

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET; // Ideal usar variável de ambiente (.env)

function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;

  // Verifica se o token foi enviado
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ erro: "Token de autenticação ausente ou inválido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verifica e decodifica o token
    const payload = jwt.verify(token, JWT_SECRET);

    // Adiciona os dados do usuário à requisição para uso posterior
    req.usuario = payload;

    next(); // Usuário autenticado, segue para a rota
  } catch (erro) {
    console.error("Erro na autenticação:", erro.message);
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}

module.exports = autenticar;
