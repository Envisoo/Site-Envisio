export interface Instrutor {
  nome: string;
  avaliacao: number;
  alunos: number;
  aulas: number;
}

export interface Curso {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  duracao: number;
  nivel: 'iniciante' | 'intermediario' | 'avancado';
  preco: number;
  status: string;
  acessoVitalicio: boolean;
  suporte: boolean;
  certificado: boolean;
  visualizacoes: number;
  avaliacao: number;
  instrutor: Instrutor;
}