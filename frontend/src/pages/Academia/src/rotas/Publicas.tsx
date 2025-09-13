import { Routes, Route } from 'react-router-dom';
import Inicio from '../paginas/publicas/Inicio';
import Cursos from '../paginas/publicas/Cursos';
import CursoDetalhe from '../paginas/publicas/CursoDetalhe';
import Blog from '../paginas/publicas/Blog';
import PostBlog from '../paginas/publicas/PostBlog';
import Sobre from '../paginas/publicas/Sobre';
import Contato from '../paginas/publicas/Contato';
import Login from '../paginas/autenticacao/Login';
import Cadastro from '../paginas/autenticacao/Cadastro';
import RecuperarSenha from '../paginas/autenticacao/RecuperarSenha';

export default function RotasPublicas() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/cursos" element={<Cursos />} />
      <Route path="/curso/:id" element={<CursoDetalhe />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<PostBlog />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/recuperar-senha" element={<RecuperarSenha />} />
    </Routes>
  );
}