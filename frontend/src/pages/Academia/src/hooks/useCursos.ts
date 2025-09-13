import { useEffect, useState, useCallback } from "react";
import api from "../utils/api";
import { Curso } from "../tipos/Curso";
import { toast } from "react-hot-toast";

export function useCursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    return () => {
      setMounted(false); // Limpeza ao desmontar
    };
  }, []);

  const carregarCursos = useCallback(async () => {
    if (!mounted) return;
    
    try {
      setCarregando(true);
      const response = await api.get("/cursos");
      
      if (mounted) {
        setCursos(response.data);
        setErro(null);
      }
    } catch (error) {
      if (mounted) {
        console.error("Erro ao carregar cursos:", error);
        setErro("Falha ao carregar cursos");
        toast.error("Erro ao carregar cursos");
      }
    } finally {
      if (mounted) {
        setCarregando(false);
      }
    }
  }, [mounted]);

  useEffect(() => {
    carregarCursos();
  }, [carregarCursos]);

  return { cursos, carregando, erro, recarregar: carregarCursos };
}