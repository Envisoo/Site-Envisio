/** @format */

import { ReactNode, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contextos/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  User,
  Settings,
  Award,
  Heart,
  Menu,
  X,
  LogOut,
  Home,
  GraduationCap,
  FileText,
  Star,
  Bell,
  ChevronDown,
} from "lucide-react";

interface LayoutAlunoProps {
  children: ReactNode;
}

const menuItems = [
  {
    nome: "Dashboard",
    rota: "/academia/aluno",
    icone: <Home size={16} />,
    descricao: "Visão geral do seu progresso",
  },
  {
    nome: "Meus Cursos",
    rota: "/academia/aluno/cursos",
    icone: <BookOpen size={16} />,
    descricao: "Cursos em que você está inscrito",
  },
  {
    nome: "Certificados",
    rota: "/academia/aluno/certificados",
    icone: <Award size={16} />,
    descricao: "Seus certificados conquistados",
  },
  {
    nome: "Favoritos",
    rota: "/academia/aluno/favoritos",
    icone: <Heart size={16} />,
    descricao: "Cursos que você favoritou",
  },
  {
    nome: "Avaliações",
    rota: "/academia/aluno/avaliacoes",
    icone: <Star size={16} />,
    descricao: "Suas avaliações e comentários",
  },
  {
    nome: "Configurações",
    rota: "/academia/aluno/configuracoes",
    icone: <Settings size={16} />,
    descricao: "Gerencie sua conta",
  },
];

export default function LayoutAluno({ children }: LayoutAlunoProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/academia");
  };

  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Espaçamento do topo */}
      <div className="h-20"></div>

      {/* Header Horizontal - Menor e Centralizado */}
      <header className="bg-white shadow-sm border border-gray-200 rounded-lg mx-64 mb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Menu Desktop - Centralizado */}
            <nav className="hidden md:flex items-center space-x-1 mx-auto">
              {menuItems.map((item) => (
                <Link
                  key={item.nome}
                  to={item.rota}
                  className={`group flex items-center space-x-1 px-2 py-1 rounded-md transition-all duration-200 text-sm ${
                    isActiveRoute(item.rota)
                      ? "bg-red-50 text-red-700 border-b border-red-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}>
                  <div
                    className={`${
                      isActiveRoute(item.rota)
                        ? "text-red-600"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}>
                    {item.icone}
                  </div>
                  <span className="font-medium">{item.nome}</span>
                </Link>
              ))}
            </nav>

            {/* User Menu - Lado Direito */}
            <div className="flex items-center space-x-2">
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="text-white" size={10} />
                </div>
                <div className="text-left">
                  <p className="text-xs font-medium text-gray-900">
                    {usuario?.nome || "Aluno"}
                  </p>
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-1 p-1 rounded-md hover:bg-gray-50 transition-colors">
                  <div className="md:hidden w-5 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="text-white" size={10} />
                  </div>
                  <ChevronDown
                    className={`w-3 h-3 text-gray-400 transition-transform ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link
                        to="/academia/aluno/configuracoes"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-50 text-sm">
                        <Settings size={14} />
                        <span>Configurações</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-50 text-sm">
                        <LogOut size={14} />
                        <span>Sair</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1 text-gray-400 hover:text-gray-600">
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-gray-200 py-2">
                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <Link
                      key={item.nome}
                      to={item.rota}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                        isActiveRoute(item.rota)
                          ? "bg-red-50 text-red-700 border-l-4 border-red-600"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}>
                      <div
                        className={`${
                          isActiveRoute(item.rota)
                            ? "text-red-600"
                            : "text-gray-400"
                        }`}>
                        {item.icone}
                      </div>
                      <div>
                        <p className="font-medium">{item.nome}</p>
                        <p className="text-xs text-gray-500">
                          {item.descricao}
                        </p>
                      </div>
                    </Link>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
