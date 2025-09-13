/** @format */

import { Routes, Route } from "react-router-dom";
import Painel from "../paginas/aluno/Painel";
import MeusCursos from "../paginas/aluno/MeusCursos";
import Aula from "../paginas/aluno/Aula";
import Certificados from "../paginas/aluno/Certificados";
import Configuracoes from "../paginas/aluno/Configuracoes";

export default function RotasAluno() {
  return (
    <Routes>
      <Route path="/" element={<Painel />} />
      <Route path="/meus-cursos" element={<MeusCursos />} />
      <Route path="/curso/:id/aula" element={<Aula />} />
      <Route path="/certificados" element={<Certificados />} />
      <Route path="/configuracoes" element={<Configuracoes />} />
    </Routes>
  );
}
