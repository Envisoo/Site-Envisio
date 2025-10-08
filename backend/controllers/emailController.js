/** @format */

import * as postmark from "postmark";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";

dotenv.config();

const token = process.env.POSTMARK_SERVER_TOKEN;

// Configuração do multer para upload de arquivos
const storage = multer.memoryStorage(); // Armazena os arquivos em memória
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10MB
    fileFilter: (req, file, cb) => {
        // Apenas permite arquivos PDF
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Apenas arquivos PDF são permitidos"), false);
        }
    },
});

if (!token) {
    throw new Error("Token do Postmark não encontrado no arquivo .env");
}

const client = new postmark.ServerClient(token);

// Função para enviar email
export const enviarEmail = async(req, res) => {
        try {
            console.log("📝 Dados do formulário:", req.body);
            console.log("📁 Arquivos anexados:", req.files || "Nenhum arquivo");

            const attachments = [];
            if (req.files && req.files.length > 0) {
                req.files.forEach((file) => {
                    attachments.push({
                        Name: file.originalname,
                        Content: file.buffer.toString("base64"),
                        ContentType: file.mimetype,
                    });
                });
            }
            // Acessa os campos do formulário
            const {
                nome,
                sobrenome,
                email,
                telefone,
                empresa,
                mensagem,
                turno,
                curso,
                area,
                nivelExperiencia,
            } = req.body;

            // Verifica campos obrigatórios
            if (!nome || !email || !turno) {
                return res.status(400).json({
                    success: false,
                    message: "Por favor, preencha todos os campos obrigatórios.",
                });
            }

            // Verifica configurações de email
            if (!process.env.EMAIL_FROM || !process.env.EMAIL_TO) {
                throw new Error("Configurações de email ausentes no .env");
            }

            // Prepara o conteúdo do email
            const subject = `Nova inscrição de ${nome} ${sobrenome} - ${
      curso || "Curso"
    }`;
            const message = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px 8px 0 0; margin-bottom: 20px;">
          <h2 style="color: #2d3748; margin: 0;">Nova Inscrição Recebida</h2>
        </div>
        
        <div style="margin-bottom: 20px;">
          <p><strong>Nome:</strong> ${nome} ${sobrenome}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${telefone ? `<p><strong>Telefone:</strong> ${telefone}</p>` : ""}
          ${empresa ? `<p><strong>Empresa:</strong> ${empresa}</p>` : ""}
          ${curso ? `<p><strong>Curso:</strong> ${curso}</p>` : ""}
          ${area ? `<p><strong>Área:</strong> ${area}</p>` : ""}
          <p><strong>Turno:</strong> ${turno}</p>
          ${
            nivelExperiencia
              ? `<p><strong>Nível de Experiência:</strong> ${nivelExperiencia}</p>`
              : ""
          }
          
          ${
            mensagem
              ? `
            <div style="margin-top: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 5px;">
              <p style="margin: 0 0 5px 0; font-weight: bold;">Mensagem:</p>
              <p style="margin: 0; white-space: pre-line;">${mensagem}</p>
            </div>
          `
              : ""
          }
        </div>

        ${
          req.files && req.files.length > 0
            ? `
          <div style="margin-top: 20px; padding: 10px; background-color: #f0f9ff; border-radius: 5px; border-left: 4px solid #0ea5e9;">
            <p style="margin: 0 0 8px 0; font-weight: bold; color: #0369a1;">Arquivos Anexados (${
              req.files.length
            }):</p>
            <ul style="margin: 0; padding-left: 20px;">
              ${req.files
                .map(
                  (file) =>
                    `<li>${file.originalname} (${(file.size / 1024).toFixed(
                      2
                    )} KB)</li>`
                )
                .join("")}
            </ul>
          </div>
        `
            : ""
        }

        <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #6b7280;">
          <p style="margin: 5px 0;">Esta mensagem foi enviada através do formulário de contato do site Envisio.</p>
          <p style="margin: 5px 0; font-size: 11px; color: #9ca3af;">${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

    // Envia o email usando o Postmark
    const response = await client.sendEmail({
      From: process.env.EMAIL_FROM,
      To: process.env.EMAIL_TO,
      Subject: subject,
      HtmlBody: message,
      ReplyTo: email,
      Attachments: attachments,
    });

    console.log("✅ Email enviado com sucesso! MessageID:", response.MessageID);

    // Se houver arquivos, você pode processá-los aqui
    if (req.files && req.files.length > 0) {
      console.log(`📎 ${req.files.length} arquivo(s) anexado(s) ao email`);
      // Aqui você pode salvar os arquivos no servidor ou fazer outro processamento
      req.files.forEach((file, index) => {
        console.log(
          `  - Arquivo ${index + 1}: ${file.originalname} (${file.size} bytes)`
        );
      });
    }

    res.json({
      success: true,
      message: "Inscrição enviada com sucesso!",
      messageId: response.MessageID,
    });
  } catch (error) {
    console.error("❌ Erro ao processar o pedido:", error);

    // Tratamento de erros específicos
    let errorMessage = "Erro ao processar o pedido";
    if (error.code === "LIMIT_FILE_SIZE") {
      errorMessage = "O tamanho do arquivo excede o limite de 10MB";
    } else if (error.message.includes("Apenas arquivos PDF são permitidos")) {
      errorMessage = "Apenas arquivos no formato PDF são permitidos";
    } else if (error.message) {
      errorMessage = error.message;
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

// Middleware para processar upload de arquivos
export const uploadMiddleware = upload.array("arquivos");