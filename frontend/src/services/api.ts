import axios from "axios";

// Cria a instância do Axios com base na URL do .env
const api = axios.create({
baseURL: process.env.REACT_APP_API_ACADEMIA || "REACT_APP_API_ACADEMIA=https://site-envisio-producao-1d15.up.railway.app", 
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
