/** @format */

import { useState } from "react";
import { BookOpen, Menu, X, LogIn, UserPlus, House } from "lucide-react";
import { Link } from "react-router-dom";

// Itens do menu
const menuItems = [
  {
    nome: "Home",
    icone: <House size={18} className="mr-2" />,
    ativo: true,
  },
  {
    nome: "Cursos",
    icone: <BookOpen size={18} className="mr-2" />,
    ativo: true,
  },
];

export default function NavbarAcademia() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14">
          {/* Logo */}
          <Link to="/academia" className="flex-shrink-0 flex items-center">
            <img className="h-14 w-auto" src="/academia/logo.svg" alt="Logo" />
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.nome}
                to={
                  item.ativo
                    ? item.nome === "Cursos"
                      ? "/academia/cursos"
                      : "/academia"
                    : "#"
                }
                className={`${
                  item.ativo
                    ? `text-red-600 hover:bg-red-50 ${
                        item.nome === "Cursos" ? "animate-pulse-slow" : ""
                      }`
                    : "text-gray-500 hover:bg-gray-50 cursor-not-allowed"
                } px-4 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-300`}>
                {item.icone}
                {item.nome}
              </Link>
            ))}

            {/* Botões de Ação */}
            <div className="flex items-center space-x-3 ml-4">
              <button
                disabled
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-400 bg-white rounded-md cursor-not-allowed"
                title="Em breve">
                <LogIn size={16} className="mr-2" />
                Entrar
              </button>
              <button
                disabled
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-300 rounded-[5px] cursor-not-allowed"
                title="Em breve">
                <UserPlus size={16} className="mr-2" />
                Cadastrar
              </button>
            </div>
          </div>

          {/* Botão Mobile */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMenuAberto(!menuAberto)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
              {menuAberto ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {menuAberto && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.nome}
                to={
                  item.ativo
                    ? item.nome === "Cursos"
                      ? "/academia/cursos"
                      : "/academia"
                    : "#"
                }
                className={`${
                  item.ativo
                    ? "text-red-600 hover:bg-red-50"
                    : "text-gray-500 hover:bg-gray-50 cursor-not-allowed"
                } group flex items-center px-3 py-2 text-base font-medium rounded-md`}
                onClick={() => setMenuAberto(false)}>
                {item.icone}
                <span className="ml-3">{item.nome}</span>
              </Link>
            ))}

            <div className="pt-2 border-t border-gray-100 mt-2">
              <button
                disabled
                className="w-full text-left px-4 py-2 text-base font-medium text-gray-400 bg-white rounded-md cursor-not-allowed"
                title="Em breve">
                <div className="flex items-center">
                  <LogIn size={16} className="mr-2" />
                  Entrar
                </div>
              </button>
              <button
                disabled
                className="w-full text-left px-4 py-2 text-base font-medium text-white bg-gray-300 rounded-[5px] mt-1 cursor-not-allowed"
                title="Em breve">
                <div className="flex items-center">
                  <UserPlus size={16} className="mr-2" />
                  Cadastrar
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
