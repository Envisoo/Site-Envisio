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

const API_URL = "https://site-envisio-production-9820.up.railway.app/api";

const emailService = {
  async enviar(data: SupportEmailData): Promise<EmailResponse> {
    try {
      const response = await axios.post(`${API_URL}/email`, {
        ...data,
        area: 'Suporte Técnico',
        tipoCliente: 'Suporte'
      });

      return {
        success: true,
        messageId: response.data.messageId
      };
    } catch (error: any) {
      console.error('Erro ao enviar email:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao enviar email'
      };
    }
  }
};

export async function sendSupportEmail(data: SupportEmailData): Promise<EmailResponse> {
  try {
    return await emailService.enviar(data);
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return { 
      success: false, 
      error: 'Falha ao enviar email de suporte' 
    };
  }
}