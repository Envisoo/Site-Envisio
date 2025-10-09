/** @format */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  BarChart3,
  Video,
  Settings,
  LogOut,
  X,
  Home,
  Users,
  Star,
  FileText,
  Search,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contextos/AuthContext";

interface LayoutInstrutorProps {
  children: React.ReactNode;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/academia/instrutor",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Gerenciar Cursos",
    icon: BookOpen,
    path: "/academia/instrutor/gerenciar-cursos",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Gerenciar Aulas",
    icon: Video,
    path: "/academia/instrutor/gerenciar-aulas",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Estatísticas",
    icon: BarChart3,
    path: "/academia/instrutor/estatisticas",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Avaliações",
    icon: Star,
    path: "/academia/instrutor/avaliacoes",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    title: "Alunos",
    icon: Users,
    path: "/academia/instrutor/alunos",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    title: "Relatórios",
    icon: FileText,
    path: "/academia/instrutor/relatorios",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    title: "Configurações",
    icon: Settings,
    path: "/academia/instrutor/configuracoes",
    color: "text-gray-600",
    bgColor: "bg-gray-50",
  },
];

export default function LayoutInstrutor({ children }: LayoutInstrutorProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/academia/login");
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: sidebarOpen ? 0 : -100 }}
        className={`fixed top-0 left-0 right-0 z-50 ml-50 mt-40 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-y-0" : "-translate-y-full"
        } lg:translate-y-0 lg:static`}>
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="text-white" size={16} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Academia</h1>
                <p className="text-xs text-gray-500">Painel do Instrutor</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {usuario?.nome?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{usuario?.nome}</h3>
                <p className="text-sm text-gray-500">{usuario?.email}</p>
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mt-1">
                  Instrutor
                </span>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-x-auto">
            <div className="flex items-center space-x-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);

                return (
                  <motion.button
                    key={item.path}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigate(item.path);
                      setSidebarOpen(false);
                    }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? `${item.bgColor} ${item.color} shadow-md`
                        : "text-gray-600 hover:bg-gray-100"
                    }`}>
                    <Icon size={18} />
                    <span className="font-medium whitespace-nowrap">
                      {item.title}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut size={20} />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Page Content */}
        <main className="p-6 bg-gray-50 min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}>
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
