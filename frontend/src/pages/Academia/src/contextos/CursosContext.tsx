import { createContext, useContext, ReactNode, useState } from 'react';

interface Curso {
  id: string;
  titulo: string;
  descricao: string;
}

interface CursosContextType {
  cursos: Curso[];
  carregarCursos: () => Promise<void>;
}

const CursosContext = createContext<CursosContextType | null>(null);

export function CursosProvider({ children }: { children: ReactNode }) {
  const [cursos, setCursos] = useState<Curso[]>([]);

  const carregarCursos = async () => {
    // Implementação real virá aqui
    setCursos([
      { id: '1', titulo: 'Curso 1', descricao: 'Descrição 1' },
      { id: '2', titulo: 'Curso 2', descricao: 'Descrição 2' }
    ]);
  };

  return (
    <CursosContext.Provider value={{ cursos, carregarCursos }}>
      {children}
    </CursosContext.Provider>
  );
}

export function useCursos() {
  const context = useContext(CursosContext);
  if (!context) {
    throw new Error('useCursos deve ser usado dentro de um CursosProvider');
  }
  return context;
}