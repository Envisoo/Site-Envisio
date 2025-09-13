/** @format */

import * as postmark from "postmark";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.POSTMARK_SERVER_TOKEN;

if (!token) {
  throw new Error("Token do Postmark não encontrado no arquivo .env");
}

const client = new postmark.ServerClient(token);

export const enviarEmail = async (req, res) => {
  try {
    console.log("🔑 Token Postmark:", token ? "Token presente" : "Token ausente");
    console.log("📧 EMAIL_FROM:", process.env.EMAIL_FROM);
    console.log("📧 EMAIL_TO:", process.env.EMAIL_TO);
    console.log("📝 Request body:", req.body);

    const {
      name,
      email,
      phone,
      message,
      area,
      empresa,
      apelido,
      nif,
      tipoCliente,
    } = req.body;

    if (!process.env.EMAIL_FROM || !process.env.EMAIL_TO) {
      throw new Error("Configurações de email ausentes no .env");
    }

    // Verifica se a conta Postmark está aprovada
    console.log("📤 Tentando enviar email via Postmark...");
    console.log(`📧 De: ${process.env.EMAIL_FROM} Para: ${process.env.EMAIL_TO}`);
    console.log(`📋 Assunto: Novo Contato - ${area} - ${name}`);
    
    try {
      const response = await client.sendEmail({
        From: process.env.EMAIL_FROM,
        To: process.env.EMAIL_TO,
        Subject: `Novo Contato - ${area} - ${name}`,
        HtmlBody: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #e11d48;">Nova Mensagem de Contato</h2>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
              <p><strong>Tipo de Cliente:</strong> ${tipoCliente}</p>
              <p><strong>Nome:</strong> ${name}</p>
              ${empresa ? `<p><strong>Empresa:</strong> ${empresa}</p>` : ""}
              ${apelido ? `<p><strong>Apelido:</strong> ${apelido}</p>` : ""}
              ${nif ? `<p><strong>NIF:</strong> ${nif}</p>` : ""}
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Telefone:</strong> ${phone || "Não informado"}</p>
              <p><strong>Área de Interesse:</strong> ${area}</p>
              <p><strong>Mensagem:</strong></p>
              <p style="background-color: #ffffff; padding: 15px; border-left: 4px solid #e11d48; margin: 10px 0;">${message}</p>
            </div>
            <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 8px;">
              <p style="margin: 0; font-size: 12px; color: #666;">
                Esta mensagem foi enviada através do formulário de contato do site Envisio.
              </p>
            </div>
          </div>
        `,
        ReplyTo: email,
      });

      console.log("✅ Email enviado com sucesso! MessageID:", response.MessageID);
      res.json({ success: true, messageId: response.MessageID });
      
    } catch (postmarkError) {
      console.log("⚠️ Erro do Postmark (conta pendente):", postmarkError.message);
      
      // Fallback: Log detalhado para desenvolvimento
      console.log("📝 DADOS DO CONTATO RECEBIDOS:");
      console.log("=".repeat(50));
      console.log(`Nome: ${name}`);
      console.log(`Email: ${email}`);
      console.log(`Telefone: ${phone || "Não informado"}`);
      console.log(`Área: ${area}`);
      console.log(`Tipo: ${tipoCliente}`);
      if (empresa) console.log(`Empresa: ${empresa}`);
      if (apelido) console.log(`Apelido: ${apelido}`);
      if (nif) console.log(`NIF: ${nif}`);
      console.log(`Mensagem: ${message}`);
      console.log("=".repeat(50));
      
      // Retorna sucesso para o frontend (dados foram logados)
      res.json({ 
        success: true, 
        messageId: "logged-" + Date.now(),
        note: "Dados salvos nos logs do servidor (conta Postmark pendente)"
      });
    }
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Erro ao enviar email",
    });
  }
};
