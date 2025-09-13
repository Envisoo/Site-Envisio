/** @format */

import { useState, useContext, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contextos/AuthContext";
import {
  Menu,
  X,
  User,
  LogOut,
  BookOpen,
  Home,
  GraduationCap,
  Users,
  Settings,
  ArrowLeft,
} from "lucide-react";

export default function NavbarAcademia() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Fechar menu ao mudar de rota
  useEffect(() => {
    setMenuAberto(false);
  }, [location.pathname]);

  // Handler otimizado para cliques fora do menu
  const handleClickFora = useCallback((e: MouseEvent) => {
    const menu = document.getElementById("menu-mobile");
    const botaoMenu = document.getElementById("botao-menu");

    if (
      menuAberto &&
      menu &&
      !menu.contains(e.target as Node) &&
      botaoMenu &&
      !botaoMenu.contains(e.target as Node)
    ) {
      setMenuAberto(false);
    }
  }, [menuAberto]);

  useEffect(() => {
    if (menuAberto) {
      document.addEventListener("mousedown", handleClickFora);
    }
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, [menuAberto, handleClickFora]);

  // Logout com redirecionamento seguro
  const handleLogout = () => {
    logout();
    navigate("/academia", { replace: true });
  };

  // Itens do menu com verificação de autorização
  const menuItems = [
    { nome: "Início", rota: "/academia", icone: <Home size={20} />, roles: ["aluno", "admin", "instrutor"] },
    { nome: "Cursos", rota: "/academia/cursos", icone: <BookOpen size={20} />, roles: ["aluno", "admin", "instrutor"] },
    {
      nome: "Categorias",
      rota: "/academia/categorias",
      icone: <GraduationCap size={20} />,
      roles: ["aluno", "admin", "instrutor"],
    },
    {
      nome: "Instrutores",
      rota: "/academia/instrutores",
      icone: <Users size={20} />,
      roles: ["aluno", "admin"],
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo e Nome */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center text-gray-600 hover:text-red-600 transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              <span className="text-sm font-medium">Voltar ao Site</span>
            </Link>
            <div className="w-px h-6 bg-gray-300"></div>
            <Link to="/academia" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <GraduationCap className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-gray-900">Academia</span>
            </Link>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.nome}
                to={item.rota}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === item.rota
                    ? "bg-red-100 text-red-700"
                    : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                }`}>
                {item.icone}
                <span className="font-medium">{item.nome}</span>
              </Link>
            ))}
          </div>

          {/* Área do Usuário */}
          <div className="flex items-center space-x-4">
            {usuario ? (
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <User className="text-red-600" size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {usuario.nome}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    to="/academia/perfil"
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Settings size={20} />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/academia/login"
                  className="px-4 py-2 text-gray-700 hover:text-red-600 font-medium transition-colors">
                  Entrar
                </Link>
                <Link
                  to="/academia/cadastro"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                  Cadastrar
                </Link>
              </div>
            )}

            {/* Botão Menu Mobile - Adicionar id */}
            <button
              id="botao-menu"
              onClick={() => setMenuAberto(!menuAberto)}
              className="md:hidden p-2 text-gray-600 hover:text-red-600 transition-colors">
              {menuAberto ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu Mobile - Adicionar id e melhorar transição */}
        {menuAberto && (
          <div
            id="menu-mobile"
            className="md:hidden py-4 border-t border-gray-200 animate-fadeIn">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.nome}
                  to={item.rota}
                  onClick={() => setMenuAberto(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.rota
                      ? "bg-red-100 text-red-700"
                      : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                  }`}>
                  {item.icone}
                  <span className="font-medium">{item.nome}</span>
                </Link>
              ))}
            </div>
            {usuario && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-3 px-4 py-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <User className="text-red-600" size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {usuario.nome}
                  </span>
                </div>
                <div className="flex space-x-2 px-4">
                  <Link
                    to="/academia/perfil"
                    onClick={() => setMenuAberto(false)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Settings size={16} />
                    <span className="text-sm">Perfil</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuAberto(false);
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut size={16} />
                    <span className="text-sm">Sair</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
