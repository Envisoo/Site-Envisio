import axios from "axios";

// Cria a instância do Axios com base na URL do .env
const api = axios.create({
baseURL: process.env.REACT_APP_API_ACADEMIA || "http://localhost:3001", // usa a variável de ambiente ou um valor padrão
  // fallback se variável não estiver definida
});

// Interceptor para anexar o token JWT em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (erro) => Promise.reject(erro)
);

export default api;
