import axios from 'axios';

interface EmailData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  area: string;
  empresa?: string;
  apelido?: string;
  nif?: string;
  tipoCliente: string;
}

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

const API_URL = 'http://localhost:3001/api/email';

export async function enviarEmail(formData: any, tipoCliente: string): Promise<EmailResponse> {
  try {
    console.log('🌐 Fazendo requisição para:', API_URL);
    console.log('📦 Dados enviados:', { ...formData, tipoCliente });
    
    const response = await axios.post(API_URL, {
      ...formData,
      tipoCliente
    });
    
    console.log('✅ Resposta recebida:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Erro na requisição:', error);
    console.error('📄 Detalhes do erro:', error.response?.data);
    return { 
      success: false, 
      error: error.response?.data?.error || 'Erro ao enviar email'
    };
  }
}