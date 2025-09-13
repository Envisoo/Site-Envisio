import { useEffect, useState } from "react";
import api from "../utils/api";

export interface CursoDetalhe {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  duracao: number;
  nivel: string;
  instrutor: string | {
    nome: string;
    avaliacao: number;
    alunos: number;
    aulas: number;
  };
  imagem?: string;
  preco?: number;
  avaliacao?: number;
  avaliacoes?: number;
  alunos?: number;
  status?: string;
  acessoVitalicio?: boolean;
  suporte?: boolean;
  certificado?: boolean;
  visualizacoes?: number;
  criado_em?: string;
}

export function useCurso(id: string) {
  const [curso, setCurso] = useState<CursoDetalhe | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    
    setCarregando(true);
    api.get(`/cursos/${id}`)
      .then((res) => setCurso(res.data))
      .catch((err) => setErro(err.response?.data?.mensagem || "Erro ao carregar curso"))
      .finally(() => setCarregando(false));
  }, [id]);

  return { curso, carregando, erro };
} 