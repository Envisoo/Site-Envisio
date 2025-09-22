import { useEffect, useState, useCallback, useRef } from "react";
import api from "../utils/api";
import { Curso } from "../tipos/Curso";
import { toast } from "react-hot-toast";
import { cursosMock } from "../data/CursosMock";

const SOFT_TIMEOUT_MS = 2000; // após 2s, exibir dados locais para não travar a UI

export function useCursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false; // Limpeza ao desmontar
    };
  }, []);

  const carregarCursos = useCallback(async () => {
    let softTimeout: ReturnType<typeof setTimeout> | null = null;

    try {
      if (mountedRef.current) setCarregando(true);

      // Soft-timeout: se a API demorar, mostramos mock e seguimos
      softTimeout = setTimeout(() => {
        if (!mountedRef.current) return;
        // Apenas aplica fallback se ainda está carregando e sem dados
        setCursos((prev) => (prev.length > 0 ? prev : cursosMock));
        setErro((prev) => prev ?? "Falha ao carregar cursos (usando dados locais)");
        setCarregando(false);
      }, SOFT_TIMEOUT_MS);

      const response = await api.get("/cursos");

      if (!mountedRef.current) return;
      if (softTimeout) clearTimeout(softTimeout);

      const data = Array.isArray(response.data) ? response.data : [];
      setCursos(data.length > 0 ? data : cursosMock);
      setErro(null);
    } catch (error) {
      console.error("Erro ao carregar cursos:", error);
      if (!mountedRef.current) return;
      if (softTimeout) clearTimeout(softTimeout);

      // Fallback imediato para mock, para não travar a UI
      setCursos(cursosMock);
      setErro("Falha ao carregar cursos (usando dados locais)");
      toast.error("Erro ao carregar cursos. Exibindo dados locais.");
    } finally {
      if (mountedRef.current) setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarCursos();
  }, [carregarCursos]);

  return { cursos, carregando, erro, recarregar: carregarCursos };
}