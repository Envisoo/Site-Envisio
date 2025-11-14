import axios from 'axios';

interface SupportEmailData {
  name: string;
  email: string;
  phone?: string;
  urgency: string;
  issue: string;
}

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

const API_URL = "https://site-envisio-producao-1d15.up.railway.app/api";

const emailService = {
  async enviar(data: SupportEmailData): Promise<EmailResponse> {
    try {
      const response = await axios.post(`${API_URL}/email`, {
        nome: data.name,
        email: data.email,
        telefone: data.phone || 'Não informado',
        assunto: 'Solicitação de Orçamento',
        mensagem: data.issue,
        area: 'Comercial',
        tipoCliente: 'Cliente Potencial'
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return {
        success: response.status === 200,
        messageId: response.data.messageId
      };
    } catch (error: any) {
      console.error('Erro ao enviar email:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao enviar o formulário. Por favor, tente novamente mais tarde.'
      };
    }
  }
};

export async function sendSupportEmail(data: SupportEmailData): Promise<EmailResponse> {
  try {
    const result = await emailService.enviar(data);
    if (!result.success) {
      console.error('Erro na resposta da API:', result.error);
    }
    return result;
  } catch (error) {
    console.error('Erro ao processar o envio:', error);
    return { 
      success: false, 
      error: 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.'
    };
  }
}