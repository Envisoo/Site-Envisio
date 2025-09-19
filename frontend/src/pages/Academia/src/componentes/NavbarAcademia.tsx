/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  BookOpen,
  Home,
  GraduationCap,
  Users,
  ArrowLeft,
  Info,
} from "lucide-react";

const menuItems = [
  {
    nome: "Início",
    icone: <Home size={20} />,
  },
  {
    nome: "Cursos",
    icone: <BookOpen size={20} />,
  },
  {
    nome: "Quem Somos",
    icone: <Info size={20} />,
  },
  {
    nome: "Professores",
    icone: <Users size={20} />,
  },
];

export default function NavbarAcademia() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div>
      {/* Apenas uma navegação */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo e Botão Voltar */}
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="group flex items-center text-gray-600 hover:text-red-600 transition-all duration-300">
                <div className="relative">
                  <ArrowLeft
                    size={20}
                    className="mr-2 group-hover:-translate-x-1 transition-transform"
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
                </div>
                <span className="text-sm font-medium">Voltar ao Site</span>
              </Link>

              <div className="hidden sm:flex items-center space-x-3">
                <div className="flex flex-col">
                  <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                    Academia
                  </span>
                  <span className="text-xs text-gray-500">Training Center</span>
                </div>
              </div>
            </div>

            {/* Menu Desktop */}
            <div className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.nome}
                  disabled
                  className="group flex flex-col items-center px-3 py-2 rounded-lg text-gray-400 cursor-not-allowed opacity-50 hover:bg-gray-50/50 transition-all duration-300"
                  title="Em construção">
                  <div className="flex items-center space-x-2">
                    {item.icone}
                    <span className="font-medium">{item.nome}</span>
                  </div>
                  <span className="block w-0 group-hover:w-full h-0.5 bg-red-600/50 transition-all duration-300"></span>
                </button>
              ))}
            </div>

            {/* Botões de Ação */}
            <div className="flex items-center space-x-4">
              <button
                disabled
                className="hidden sm:block px-6 py-2.5 text-gray-400 cursor-not-allowed opacity-50 relative overflow-hidden group"
                title="Em construção">
                <span className="relative z-10">Entrar</span>
                <div className="absolute inset-0 bg-red-600/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </button>

              <button
                disabled
                className="hidden sm:block px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg cursor-not-allowed opacity-50 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl"
                title="Em construção">
                Cadastrar
              </button>

              {/* Botão Menu Mobile */}
              <button
                onClick={() => setMenuAberto(!menuAberto)}
                className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Menu">
                {menuAberto ? (
                  <X
                    size={24}
                    className="text-red-600 transform rotate-90 transition-transform duration-300"
                  />
                ) : (
                  <Menu
                    size={24}
                    className="text-gray-600 transition-transform duration-300"
                  />
                )}
              </button>
            </div>
          </div>

          {/* Menu Mobile Melhorado */}
          <div
            className={`lg:hidden transition-all duration-500 ease-in-out ${
              menuAberto
                ? "max-h-[400px] opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}>
            <div className="py-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.nome}
                  disabled
                  className="w-full flex items-center space-x-3 px-4 py-3 text-gray-400 cursor-not-allowed opacity-50 hover:bg-gray-50 rounded-xl transition-colors duration-300"
                  title="Em construção">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    {item.icone}
                  </div>
                  <span className="font-medium">{item.nome}</span>
                </button>
              ))}
              <div className="pt-4 pb-3 px-4 border-t border-gray-100">
                <button
                  disabled
                  className="w-full py-3 text-center text-gray-400 cursor-not-allowed opacity-50 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                  title="Em construção">
                  Entrar
                </button>
                <button
                  disabled
                  className="w-full mt-2 py-3 text-center bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg cursor-not-allowed opacity-50 transform hover:scale-[0.98] transition-all duration-300"
                  title="Em construção">
                  Cadastrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
