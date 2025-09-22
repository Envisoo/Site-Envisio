import { useState, useEffect } from 'react';
import { Modulo } from '../tipos/Curso';
import { modulosPorCurso, modulosDataFallback } from '../data/Modulo';

export const useModulos = (cursoId: string | undefined) => {
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const carregarModulos = async () => {
      if (!cursoId) {
        setCarregando(false);
        return;
      }
      
      try {
        setCarregando(true);
        
        // Usa o dicionário modulosPorCurso para obter os módulos específicos do curso
        const idFormatado = String(cursoId).trim().toLowerCase();
        const modulosDoCurso = modulosPorCurso[idFormatado] || modulosDataFallback;
        
        console.log('useModulos - ID do curso:', idFormatado);
        console.log('useModulos - Módulos encontrados:', modulosDoCurso);
        
        setModulos(modulosDoCurso);
      } catch (error) {
        console.error('Erro ao carregar módulos:', error);
        setErro('Não foi possível carregar o conteúdo programático');
        setModulos(modulosDataFallback); // Usa o fallback em caso de erro
      } finally {
        setCarregando(false);
      }
    };

    carregarModulos();
  }, [cursoId]);

  return { modulos, carregando, erro };
};