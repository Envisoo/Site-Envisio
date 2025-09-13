import express from 'express';
import cors from 'cors';
import * as postmark from 'postmark';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN || '');

app.post('/api/email', async (req, res) => {
  try {
    const { name, email, phone, message, area, empresa, apelido, nif, tipoCliente } = req.body;

    const response = await client.sendEmail({
      From: process.env.EMAIL_FROM || '',
      To: process.env.EMAIL_TO || '',
      Subject: `Novo Contato - ${area} - ${name}`,
      HtmlBody: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e11d48;">Nova Mensagem de Contato</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
            <p><strong>Tipo de Cliente:</strong> ${tipoCliente}</p>
            <p><strong>Nome:</strong> ${name}</p>
            ${empresa ? `<p><strong>Empresa:</strong> ${empresa}</p>` : ''}
            ${apelido ? `<p><strong>Apelido:</strong> ${apelido}</p>` : ''}
            ${nif ? `<p><strong>NIF:</strong> ${nif}</p>` : ''}
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
            <p><strong>Área de Interesse:</strong> ${area}</p>
            <p><strong>Mensagem:</strong></p>
            <p>${message}</p>
          </div>
        </div>
      `,
      ReplyTo: email
    });

    res.json({ success: true, messageId: response.MessageID });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ success: false, error: 'Erro ao enviar email' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});