export type TipoPapel = 'admin' | 'instrutor' | 'aluno';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  papel: TipoPapel;
  dataCadastro: Date;
}