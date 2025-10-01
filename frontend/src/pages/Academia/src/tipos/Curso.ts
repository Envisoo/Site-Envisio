export interface Instrutor {
  id: string;
  nome: string;
  avaliacao: number;
  alunos: number;
  aulas: number;
  foto?: string;
  bio?: string;
}

export interface Aula {
  id: string;
  titulo: string;
  tipo: 'video' | 'texto' | 'material' | 'quiz';
  duracao: string;
  formato?: string;
  livre?: boolean;
}

export interface Modulo {
  id: string;
  titulo: string;
  descricao?: string;
  ordem: number;
  aulas: Aula[];
  duracaoTotal: string;
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
  instrutor: Instrutor | string;
  imagemUrl?: string;
  modulos?: Modulo[];
  objetivos?: string[];
  requisitos?: string[];
  conteudoDetalhado?: string;
  avaliacoes?: number;
  alunos?: number;
  criado_em?: string;
  aulas?: number;
  horas?: number;
  
}