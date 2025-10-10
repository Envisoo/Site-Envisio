import axios from "axios";

// Cria a instância do Axios com base na URL do .env
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "REACT_APP_API_ACADEMIA=https://site-envisio-producao-1d15.up.railway.app",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Melhor tratamento de erros no interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Erro na requisição:", error);
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas da API
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na resposta:", {
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
