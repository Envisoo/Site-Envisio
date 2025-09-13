/** @format */

import jwt from "jsonwebtoken";

export const autenticar = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({
      erro: true,
      mensagem: "Token não fornecido",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      erro: true,
      mensagem: "Token inválido",
    });
  }
};
