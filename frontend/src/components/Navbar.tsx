/** @format */

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [servicosDropdownOpen, setServicosDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Quem Somos", path: "/quem-somos" },
    { name: "Serviços", path: "/servicos" },
    { name: "Contato", path: "/contact" },
  ];

  // Função para verificar se está em uma página de serviços
  const isServicosActive = () => {
    return location.pathname.startsWith("/servicos");
  };

  // Função para verificar se está em uma página de apoio
  const isApoioActive = () => {
    return location.pathname.startsWith("/apoio");
  };

  // Detectar scroll e cor da página
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Função para scroll suave até rentingsection
  const handleRentingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setServicosDropdownOpen(false);
    if (location.pathname === "/servicos") {
      const section = document.getElementById("rentingsection");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/servicos#rentingsection");
      setTimeout(() => {
        const section = document.getElementById("rentingsection");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 400);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        fontFamily: "Segoe UI Regular",
        "--dropdown-offset": "46px",
        "--menu-height": "48px",
      }}
      className="fixed top-0 w-full z-50 transition-all duration-300 bg-white shadow-lg">
      {/* Container principal do menu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-12">
          <Link to="/" className="flex items-center">
            {/* Logo e nome da empresa */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center">
              <img
                src="/images/Logo.jpg"
                alt="Envisio"
                className="h-7 w-auto"
              />
              <span className="text-xl font-bold ml-2 text-gray-900"></span>
            </motion.div>
          </Link>
          {/* Menu de navegação para desktop */}
          <div className="hidden md:flex items-center h-full">
            {/* Mapeamento dos itens do menu */}
            {navItems.map((item, index) =>
              item.name === "Serviços" ? (
                // Dropdown do menu Serviços (igual ao de Apoio)
                <div
                  key="servicos"
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setServicosDropdownOpen(true)}
                  onMouseLeave={() => setServicosDropdownOpen(false)}>
                  <span
                    className={`h-full px-4 text-base font-normal bg-transparent flex items-center transition-all relative cursor-pointer ${
                      isServicosActive() || servicosDropdownOpen
                        ? "text-red-600"
                        : "text-black hover:text-red-600"
                    }`}
                    style={{
                      fontFamily: "Segoe UI Regular",
                    }}>
                    Serviços
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    {/* Barra indicadora */}
                    {(servicosDropdownOpen || isServicosActive()) && (
                      <div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                        style={{ bottom: "-1px" }}
                      />
                    )}
                  </span>
                  {/* Dropdown igual ao de Apoio */}
                  {servicosDropdownOpen && (
                    <div
                      className="absolute min-w-[240px] max-w-[300px] bg-white border border-gray-200 shadow-lg z-50"
                      style={{
                        fontFamily: "Segoe UI Regular",
                        top: "var(--dropdown-offset)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        marginTop: "2px",
                      }}>
                      <div className="px-2 pt-2 pb-2">
                        <div className="text-xs font-semibold text-gray-500 px-4 pb-1 pt-1">
                          Menu de Serviços
                        </div>
                        <hr className="mb-2 border-gray-200" />
                        <Link
                          to="/servicos/hardware"
                          className="block px-6 py-3 text-base hover:bg-red-50 hover:text-red-600 text-black"
                          onClick={() => setServicosDropdownOpen(false)}>
                          Hardware
                        </Link>
                        <hr className="my-1 border-gray-200" />
                        <Link
                          to="/servicos/software"
                          className="block px-6 py-3 text-base hover:bg-red-50 hover:text-red-600 text-black"
                          onClick={() => setServicosDropdownOpen(false)}>
                          Software
                        </Link>
                        <hr className="my-1 border-gray-200" />
                        <Link
                          to="/servicos/renting"
                          className="block px-6 py-3 text-base hover:bg-red-50 hover:text-red-600 text-black"
                          onClick={() => setServicosDropdownOpen(false)}>
                          Aluguel de produtos
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : item.name === "Contato" ? (
                // Dropdown do menu Apoio
                <div
                  key="apoio"
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}>
                  <span
                    className={`h-full px-4 text-base font-normal bg-transparent flex items-center transition-all relative cursor-pointer ${
                      isApoioActive() || dropdownOpen
                        ? "text-red-600"
                        : "text-black hover:text-red-600"
                    }`}
                    style={{
                      fontFamily: "Segoe UI Regular",
                    }}>
                    Apoio
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    {/* Barra indicadora */}
                    {(dropdownOpen || isApoioActive()) && (
                      <div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                        style={{ bottom: "-1px" }}
                      />
                    )}
                  </span>
                  {/* Menu dropdown Apoio */}
                  {dropdownOpen && (
                    <div
                      className="absolute min-w-[240px] max-w-[300px] bg-white border border-gray-200 shadow-lg z-50"
                      style={{
                        fontFamily: "Segoe UI Regular",
                        top: "var(--dropdown-offset)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        marginTop: "2px",
                      }}>
                      <div className="px-2 pt-2 pb-2">
                        <div className="text-xs font-semibold text-gray-500 px-4 pb-1 pt-1">
                          Menu de Apoio
                        </div>
                        <hr className="mb-2 border-gray-200" />
                        <Link
                          to="/pages/contato"
                          className="block px-6 py-3 text-base hover:bg-red-50 hover:text-red-600 text-black"
                          onClick={() => setDropdownOpen(false)}>
                          Contato
                        </Link>
                        <hr className="my-1 border-gray-200" />
                        <Link
                          to="/pages/suporte-tecnico"
                          className="block px-6 py-3 text-base hover:bg-red-50 hover:text-red-600 text-black"
                          onClick={() => setDropdownOpen(false)}>
                          Suporte Técnico
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Links normais (Home, Quem Somos)
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative h-full flex items-center">
                  <Link
                    to={item.path}
                    className={`h-full px-4 text-base font-normal transition-all flex items-center relative ${
                      location.pathname === item.path
                        ? "text-red-600"
                        : "text-black hover:text-red-600"
                    }`}
                    style={{
                      fontFamily: "Segoe UI Regular",
                    }}>
                    {item.name}
                    {/* Barra indicadora */}
                    {location.pathname === item.path && (
                      <div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                        style={{ bottom: "-1px" }}
                      />
                    )}
                  </Link>
                </motion.div>
              )
            )}

            {/* Botão Academia */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}>
              <Link
                to="/academy"
                className="ml-8 px-6 bg-white text-black border border-red-600 font-normal hover:bg-red-50 hover:text-red-700 transition-all duration-300 uppercase flex items-center"
                style={{
                  fontFamily: "Segoe UI Regular",
                  borderRadius: "3px",
                  height: "40px",
                }}>
                Academia
              </Link>
            </motion.div>
          </div>
          {/* Botão Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-black">
              <div className="w-6 h-6 relative">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="absolute w-full h-0.5 bg-current transform transition-all"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="absolute w-full h-0.5 bg-current top-2.5"
                />
                <motion.span
                  animate={
                    isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
                  }
                  className="absolute w-full h-0.5 bg-current top-5"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item, index) =>
                item.name === "Serviços" ? (
                  // Serviços com dropdown no mobile (ajustado para os mesmos links do desktop)
                  <div key="servicos-mobile" className="relative">
                    <button
                      type="button"
                      onClick={() => setServicosDropdownOpen((v) => !v)}
                      className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium hover:bg-red-50 hover:text-red-600 focus:outline-none focus:bg-red-50 focus:text-red-600 ${
                        isServicosActive()
                          ? "bg-red-50 text-red-600"
                          : "text-gray-600"
                      } flex items-center justify-between`}
                      aria-expanded={servicosDropdownOpen ? "true" : "false"}
                      aria-controls="servicos-mobile-dropdown">
                      Serviços
                      <svg
                        className={`w-4 h-4 ml-2 transition-transform ${
                          servicosDropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {servicosDropdownOpen && (
                        <motion.div
                          id="servicos-mobile-dropdown"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden mt-1 ml-0 min-w-[240px] max-w-[300px] bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                          style={{ fontFamily: "Segoe UI Regular" }}>
                          <div className="px-2 pt-2 pb-2">
                            <div className="text-xs font-semibold text-gray-500 px-4 pb-1 pt-1">
                              Menu de Serviços
                            </div>
                            <hr className="mb-2 border-gray-200" />
                            <Link
                              to="/servicos/hardware"
                              className="block px-6 py-3 text-base hover:bg-red-50 hover:text-red-600 text-black"
                              onClick={() => {
                                setIsOpen(false);
                                setServicosDropdownOpen(false);
                              }}>
                              Hardware
                            </Link>
                            <hr className="my-1 border-gray-200" />
                            <Link
                              to="/servicos/software"
                              className="block px-6 py-3 text-base hover:bg-red-50 hover:text-red-600 text-black"
                              onClick={() => {
                                setIsOpen(false);
                                setServicosDropdownOpen(false);
                              }}>
                              Software
                            </Link>
                            <hr className="my-1 border-gray-200" />
                            <Link
                              to="/servicos/renting"
                              className="block px-6 py-3 text-base hover:bg-red-50 hover:text-red-600 text-black"
                              onClick={() => {
                                setIsOpen(false);
                                setServicosDropdownOpen(false);
                              }}>
                              Aluguel de produtos
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : item.name === "Contato" ? (
                  // Apoio com dropdown no mobile (ajustado para os mesmos links do desktop)
                  <div key="apoio-mobile" className="relative">
                    <button
                      type="button"
                      onClick={() => setDropdownOpen((v) => !v)}
                      className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium hover:bg-red-50 hover:text-red-600 focus:outline-none focus:bg-red-50 focus:text-red-600 ${
                        isApoioActive()
                          ? "bg-red-50 text-red-600"
                          : "text-gray-600"
                      } flex items-center justify-between`}
                      aria-expanded={dropdownOpen}
                      aria-controls="apoio-mobile-dropdown">
                      Apoio
                      <svg
                        className={`w-4 h-4 ml-2 transition-transform ${
                          dropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          id="apoio-mobile-dropdown"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden mt-1 ml-0 min-w-[240px] max-w-[300px] bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                          style={{ fontFamily: "Segoe UI Regular" }}>
                          <div className="px-2 pt-2 pb-2">
                            <div className="text-xs font-semibold text-gray-500 px-4 pb-1 pt-1">
                              Menu de Apoio
                            </div>
                            <hr className="mb-2 border-gray-200" />
                            <Link
                              to="/pages/contato"
                              className="block px-6 py-3 text-base hover:bg-red-50 hover:text-red-600 text-black"
                              onClick={() => {
                                setIsOpen(false);
                                setDropdownOpen(false);
                              }}>
                              Contato
                            </Link>
                            <hr className="my-1 border-gray-200" />
                            <Link
                              to="/pages/suporte-tecnico"
                              className="block px-6 py-3 text-base hover:bg-red-50 hover:text-red-600 text-black"
                              onClick={() => {
                                setIsOpen(false);
                                setDropdownOpen(false);
                              }}>
                              Suporte Técnico
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}>
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                        location.pathname === item.path
                          ? "bg-gray-50 text-black"
                          : "text-gray-600 hover:bg-red-50 hover:text-red-600"
                      }`}>
                      {item.name}
                    </Link>
                  </motion.div>
                )
              )}
              {/* Botão Academia no mobile */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-4">
                <Link
                  to="/academy"
                  className="w-full block text-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all uppercase"
                  onClick={() => setIsOpen(false)}>
                  Academia
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
