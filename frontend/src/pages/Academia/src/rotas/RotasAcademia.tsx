/** @format */

import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Usuario, TipoPapel } from "../tipos/Usuario";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import NavbarAcademia from "../componentes/NavbarAcademia";
import { useAuth } from "../contextos/AuthContext";
import LayoutAcademia from "../componentes/LayoutAcademia";
import LayoutAluno from "../componentes/LayoutAluno";
import LayoutInstrutor from "../componentes/LayoutInstrutor";
import AcademiaHome from "../paginas/academia";
import CursosAcademia from "../paginas/publicas/Cursos";
import CursoDetalhe from "../paginas/publicas/CursoDetalhe";
import LoginAcademia from "../paginas/autenticacao/Login";
import CadastroAcademia from "../paginas/autenticacao/Cadastro";
import RecuperarSenha from "../paginas/autenticacao/RecuperarSenha";
import SobreAcademia from "../paginas/publicas/Sobre";
import AdminPainel from "../paginas/admin/Painel";
import GerenciarUsuarios from "../paginas/admin/GerenciarUsuarios";
import Relatorios from "../paginas/admin/Relatorios";
import Configuracoes from "../paginas/admin/Configuracoes";
import InstrutorPainel from "../paginas/instrutor/Painel";
import { default as GerenciarCursos } from "../paginas/instrutor/GerenciarCursos";
import Estatisticas from "../paginas/instrutor/Estatisticas";
import GerenciarAulas from "../paginas/instrutor/GerenciarAulas";
import ConfiguracoesInstrutor from "../paginas/instrutor/Configuracoes";
import AlunoPainel from "../paginas/aluno/Painel";
import MeusCursos from "../paginas/aluno/MeusCursos";
import Certificados from "../paginas/aluno/Certificados";
import Favoritos from "../paginas/aluno/Favoritos";
import Avaliacoes from "../paginas/aluno/Avaliacoes";
import Aula from "../paginas/aluno/Aula";
import AlunoConfiguracoes from "../paginas/aluno/Configuracoes";

// Lazy loading dos componentes
const Login = React.lazy(() => import("../paginas/autenticacao/Login"));
const Cadastro = React.lazy(() => import("../paginas/autenticacao/Cadastro"));
const Home = React.lazy(() => import("../paginas/academia"));

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: TipoPapel[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { usuario, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/academia/login" replace />;
  }

  if (roles && usuario && !roles.includes(usuario.papel)) {
    return <Navigate to="/academia" replace />;
  }

  return <>{children}</>;
};

const RotasAcademia = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAcademia />
      <div className="pt-16">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Rotas públicas */}
            <Route
              path="/"
              element={
                <LayoutAcademia>
                  <AcademiaHome />
                </LayoutAcademia>
              }
            />
            <Route
              path="/login"
              element={
                <LayoutAcademia>
                  <LoginAcademia />
                </LayoutAcademia>
              }
            />
            <Route
              path="/cadastro"
              element={
                <LayoutAcademia>
                  <CadastroAcademia />
                </LayoutAcademia>
              }
            />
            <Route
              path="/recuperar-senha"
              element={
                <LayoutAcademia>
                  <RecuperarSenha />
                </LayoutAcademia>
              }
            />
            <Route
              path="/sobre"
              element={
                <LayoutAcademia>
                  <SobreAcademia />
                </LayoutAcademia>
              }
            />

            {/* Rotas Protegidas - Admin */}
            <Route
              path="/admin"
              element={
                <LayoutAcademia>
                  <AdminPainel />
                </LayoutAcademia>
              }
            />
            <Route
              path="/admin/usuarios"
              element={
                <LayoutAcademia>
                  <GerenciarUsuarios />
                </LayoutAcademia>
              }
            />
            <Route
              path="/admin/relatorios"
              element={
                <LayoutAcademia>
                  <Relatorios />
                </LayoutAcademia>
              }
            />
            <Route
              path="/admin/configuracoes"
              element={
                <LayoutAcademia>
                  <Configuracoes />
                </LayoutAcademia>
              }
            />

            {/* Rotas Protegidas - Instrutor */}
            <Route
              path="/instrutor"
              element={
                <LayoutAcademia>
                  <LayoutInstrutor>
                    <InstrutorPainel />
                  </LayoutInstrutor>
                </LayoutAcademia>
              }
            />
            <Route
              path="/instrutor/gerenciar-cursos"
              element={
                <LayoutAcademia>
                  <LayoutInstrutor>
                    <GerenciarCursos />
                  </LayoutInstrutor>
                </LayoutAcademia>
              }
            />
            <Route
              path="/instrutor/estatisticas"
              element={
                <LayoutAcademia>
                  <LayoutInstrutor>
                    <Estatisticas />
                  </LayoutInstrutor>
                </LayoutAcademia>
              }
            />
            <Route
              path="/instrutor/gerenciar-aulas"
              element={
                <LayoutAcademia>
                  <LayoutInstrutor>
                    <GerenciarAulas />
                  </LayoutInstrutor>
                </LayoutAcademia>
              }
            />
            <Route
              path="/instrutor/configuracoes"
              element={
                <LayoutAcademia>
                  <LayoutInstrutor>
                    <ConfiguracoesInstrutor />
                  </LayoutInstrutor>
                </LayoutAcademia>
              }
            />
            <Route
              path="/instrutor/configuracoes"
              element={
                <LayoutAcademia>
                  <LayoutInstrutor>
                    <ConfiguracoesInstrutor />
                  </LayoutInstrutor>
                </LayoutAcademia>
              }
            />

            {/* Rotas Protegidas - Aluno - COM LAYOUT ESPECÍFICO */}
            <Route
              path="/aluno"
              element={
                <LayoutAcademia>
                  <LayoutAluno>
                    <AlunoPainel />
                  </LayoutAluno>
                </LayoutAcademia>
              }
            />
            <Route
              path="/aluno/cursos"
              element={
                <LayoutAcademia>
                  <LayoutAluno>
                    <MeusCursos />
                  </LayoutAluno>
                </LayoutAcademia>
              }
            />
            <Route
              path="/aluno/certificados"
              element={
                <LayoutAcademia>
                  <LayoutAluno>
                    <Certificados />
                  </LayoutAluno>
                </LayoutAcademia>
              }
            />
            <Route
              path="/aluno/favoritos"
              element={
                <LayoutAcademia>
                  <LayoutAluno>
                    <Favoritos />
                  </LayoutAluno>
                </LayoutAcademia>
              }
            />
            <Route
              path="/aluno/avaliacoes"
              element={
                <LayoutAluno>
                  <Avaliacoes />
                </LayoutAluno>
              }
            />
            <Route
              path="/aluno/configuracoes"
              element={
                <LayoutAcademia>
                  <LayoutAluno>
                    <AlunoConfiguracoes />
                  </LayoutAluno>
                </LayoutAcademia>
              }
            />
            <Route
              path="/curso/:id/modulo/:moduloId/licao/:licaoId"
              element={
                <LayoutAcademia>
                  <LayoutAluno>
                    <Aula />
                  </LayoutAluno>
                </LayoutAcademia>
              }
            />

            {/* Rotas públicas */}
            <Route
              path="/cursos"
              element={
                <LayoutAcademia>
                  <CursosAcademia />
                </LayoutAcademia>
              }
            />
            <Route
              path="/curso/:id"
              element={
                <LayoutAcademia>
                  <CursoDetalhe />
                </LayoutAcademia>
              }
            />

            <Route path="*" element={<Navigate to="/academia" replace />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default RotasAcademia;
