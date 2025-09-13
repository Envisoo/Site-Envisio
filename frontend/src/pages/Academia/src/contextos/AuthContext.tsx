/** @format */

import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { Usuario, TipoPapel } from "../tipos/Usuario";

// Tipagem do usuário
export interface Credenciais {
  email: string;
  senha: string;
}

// Tipagem do contexto
export interface AuthContextProps {
  usuario: Usuario | null;
  isAuthenticated: boolean;
  login: (credenciais: Credenciais, sistema?: string) => Promise<void>;
  cadastrar: (nome: string, email: string, senha: string) => Promise<void>;
  recuperarSenha: (email: string) => Promise<void>;
  logout: () => void;
}

// Criar o contexto
export const AuthContext = createContext<AuthContextProps>({
  usuario: null,
  isAuthenticated: false,
  login: async () => {},
  cadastrar: async () => {},
  recuperarSenha: async () => {},
  logout: () => {},
});

// Hook personalizado para usar o contexto
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const navigate = useNavigate();

  // Verificar se há usuário logado ao carregar a página
  useEffect(() => {
    const user = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");

    if (user && token) {
      setUsuario(JSON.parse(user));
      // Configurar token no axios
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const login = async (credenciais: Credenciais, sistema = "academia") => {
    try {
      console.log("Tentando fazer login...", credenciais);
      const response = await api.post("/login", credenciais);
      console.log("Resposta do login:", response.data);

      if (response.data.sucesso) {
        const { usuario: user, token } = response.data;
        console.log("Login bem-sucedido:", user);

        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(user));
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setUsuario(user);

        // SEMPRE redireciona para o painel correto após login
        if (sistema === "academia") {
          if (user.papel === "admin") {
            navigate("/academia/admin");
          } else if (user.papel === "instrutor") {
            navigate("/academia/instrutor");
          } else if (user.papel === "aluno") {
            navigate("/academia/aluno");
          } else {
            navigate("/academia");
          }
        }
      } else {
        throw new Error(response.data.erro || "Login falhou");
      }
    } catch (error: any) {
      console.error("Erro no login:", error);
      if (error.response?.data?.erro) {
        throw new Error(error.response.data.erro);
      }
      throw new Error("Email ou senha incorretos");
    }
  };

  const cadastrar = async (nome: string, email: string, senha: string) => {
    try {
      // Cadastro sempre como aluno
      const response = await api.post("/usuarios", {
        nome,
        email,
        senha,
        papel: "aluno", // Sempre cadastra como aluno
      });

      if (response.data.sucesso) {
        // Após cadastro bem-sucedido, fazer login automaticamente
        await login({ email, senha }, "academia");
      } else {
        throw new Error(response.data.erro || "Cadastro falhou");
      }
    } catch (error: any) {
      if (error.response?.data?.erro === "EMAIL_DUPLICADO") {
        throw new Error("Este email já está cadastrado");
      }
      if (error.response?.data?.erro) {
        throw new Error(error.response.data.erro);
      }
      throw new Error("Erro ao criar conta");
    }
  };

  const recuperarSenha = async (email: string) => {
    try {
      const response = await api.post("/recuperar-senha", { email });

      if (response.data.sucesso) {
        return response.data.mensagem;
      } else {
        throw new Error(response.data.erro || "Erro ao solicitar recuperação");
      }
    } catch (error: any) {
      if (error.response?.data?.erro) {
        throw new Error(error.response.data.erro);
      }
      throw new Error("Erro ao solicitar recuperação de senha");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    delete api.defaults.headers.common["Authorization"];
    setUsuario(null);
    navigate("/academia");
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isAuthenticated: !!usuario,
        login,
        cadastrar,
        recuperarSenha,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
