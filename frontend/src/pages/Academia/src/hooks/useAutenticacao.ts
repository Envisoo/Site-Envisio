import { useState } from 'react';
import { Usuario } from '../tipos/Usuario';

export function useAutenticacao() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(false);

  const login = async (email: string, senha: string) => {
    setCarregando(true);
    try {
      // Simulação de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsuario({
        id: '1',
        nome: 'Usuário Teste',
        email,
        papel: 'aluno',
        dataCadastro: new Date()
      });
    } finally {
      setCarregando(false);
    }
  };

  const logout = () => setUsuario(null);

  return { usuario, login, logout, carregando };
}