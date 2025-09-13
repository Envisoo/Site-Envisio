// src/types/types.ts
export interface Curso {
  id: number;
  titulo: string;
  descricao: string;
  imagem: string;
  nota?: number;
  alunos?: number;
  duracao?: string;
  categoria?: string;
}