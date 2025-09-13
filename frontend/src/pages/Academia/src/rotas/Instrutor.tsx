/** @format */

import { Routes, Route } from "react-router-dom";
import Painel from "../paginas/instrutor/Painel";
import GerenciarCursos from "../paginas/instrutor/GerenciarCursos";
import Estatisticas from "../paginas/instrutor/Estatisticas";

export default function RotasInstrutor() {
  return (
    <Routes>
      <Route path="/" element={<Painel />} />
      <Route path="/cursos" element={<GerenciarCursos />} />
      <Route path="/estatisticas" element={<Estatisticas />} />
    </Routes>
  );
}
