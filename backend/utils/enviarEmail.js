/** @format */

// utils/enviarEmail.js
const nodemailer = require("nodemailer");

// Substitua pelos dados do seu provedor (Gmail, Outlook etc)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "seuemail@gmail.com", // ✅ seu e-mail real
    pass: "sua_senha_ou_app_password", // ✅ senha ou senha de aplicativo (ver abaixo)
  },
});

async function enviarEmail(destinatario, assunto, corpo) {
  try {
    await transporter.sendMail({
      from: '"Equipe Cursos" <seuemail@gmail.com>',
      to: destinatario,
      subject: assunto,
      html: `<p>${corpo}</p>`,
    });

    console.log("📧 E-mail enviado com sucesso para:", destinatario);
  } catch (erro) {
    console.error("❌ Erro ao enviar e-mail:", erro);
  }
}

module.exports = enviarEmail;
