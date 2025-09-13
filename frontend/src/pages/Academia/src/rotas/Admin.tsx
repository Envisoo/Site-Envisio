import { Routes, Route } from 'react-router-dom';
import Painel from '../paginas/admin/Painel';
import GerenciarUsuarios from '../paginas/admin/GerenciarUsuarios';
import Relatorios from '../paginas/admin/Relatorios';
import Configuracoes from '../paginas/admin/Configuracoes';

export default function RotasAdmin() {
  return (
    <Routes>
      <Route path="/" element={<Painel />} />
      <Route path="/usuarios" element={<GerenciarUsuarios />} />
      <Route path="/relatorios" element={<Relatorios />} />
      <Route path="/configuracoes" element={<Configuracoes />} />
    </Routes>
  );
}