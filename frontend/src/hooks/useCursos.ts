import { useEffect, useState } from "react";
import api from "../services/api";
import { Curso } from "../types/types";


  export function useCursos() {
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    api.get("/cursos")
      .then((res) => setCursos(res.data))
      .catch((err) => setErro(err))
      .finally(() => setCarregando(false));
  }, []);

  return { cursos, carregando, erro};
};
