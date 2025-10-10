/** @format */

import React, { useState, useEffect, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";

import { Curso } from "../tipos";

const Academia = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    empresa: "",
    mensagem: "",
    turno: "",
    nivelExperiencia: "",
  });
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [arquivos, setArquivos] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(null);

  useEffect(() => {
    const updateClock = () => setCurrentTime(new Date());
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-PT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-PT", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setArquivos(e.target.files);
      setFileNames(Array.from(e.target.files).map((file) => file.name));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (
      !formData.nome ||
      !formData.sobrenome ||
      !formData.email ||
      !formData.turno
    ) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      setLoading(false);
      return;
    }

    if (!arquivos || arquivos.length === 0) {
      setError("Por favor, anexe pelo menos um ficheiro PDF.");
      setLoading(false);
      return;
    }

    const invalidFiles = Array.from(arquivos).some(
      (file) => file.type !== "application/pdf"
    );
    if (invalidFiles) {
      setError("Apenas ficheiros PDF são permitidos.");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Append form data
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append files
      Array.from(arquivos).forEach((file) => {
        formDataToSend.append(`arquivos`, file);
      });

      await axios.post(
        "site-envisio-production-9820.up.railway.app/api/email",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccess(false);
        setFormData({
          nome: "",
          sobrenome: "",
          email: "",
          telefone: "",
          empresa: "",
          mensagem: "",
          turno: "",
          nivelExperiencia: "",
        });
        setFileNames([]);
        setArquivos(null);
      }, 3000);
    } catch (error) {
      console.error("Erro ao enviar inscrição:", error);
      setError(
        "Ocorreu um erro ao enviar sua inscrição. Por favor, tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fallback local para rota fixa (sem :id)
  const cursoLocal: Curso = {
    id: "cegid-primavera",
    titulo: "Cegid Primavera: Funcionalidades e Módulos",
    descricao:
      "O software de gestão mais robusto de Portugal não precisa ser um mistério. Aprenda na prática, do zero ao avançado, e torne-se o profissional que resolve problemas, não que os cria.",
    imagemUrl: "",
    requisitos: ["Nenhum requisito"],
  } as unknown as Curso;

  const cursoExibir = cursoLocal as Curso as Curso;

  return (
    <section className="bg-gray-50 w-full mt-[-80px]">
      <div className="relative">
        {/* Full-screen banner */}
        <div className="relative w-full h-[430px] sm:h-[400px] md:h-[500px] lg:h-[500px] xl:h-[600px]">
          <picture>
            <img
              src="/academia/banner.webp"
              alt="Banner Academia Envisio"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </picture>

          {/* Rotating element with date and time */}
          <div className="absolute bottom-0 left-0 right-0 py-6 ">
            <div className="container mx-auto px-2">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    rotate: 360,
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                    opacity: { duration: 0.5 },
                    scale: { duration: 0.5 },
                  }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                  className="w-12 h-12 md:w-12 md:h-12 lg:w-20 lg:h-20  p-1 md:p-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c53535"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-full h-full drop-shadow-glow">
                    <defs>
                      <linearGradient
                        id="gearGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#dbd1d1" />
                      </linearGradient>
                      <filter
                        id="glow"
                        x="-30%"
                        y="-30%"
                        width="160%"
                        height="160%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite
                          in="SourceGraphic"
                          in2="blur"
                          operator="over"
                        />
                      </filter>
                    </defs>
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.72l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.74l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.72V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.72l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.74l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.72V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-center">
                  <p className="text-red-700 text-sm md:text-base font-medium ">
                    {formatDate(currentTime)}
                  </p>
                  <p className="text-red-700 text-xl md:text-2xl font-bold mb-10">
                    {formatTime(currentTime)
                      .split(":")
                      .map((part, index, array) => (
                        <motion.span
                          key={index}
                          className="inline-block min-w-[1.5em] text-center relative"
                          initial={{ scale: 1 }}
                          whileHover={{
                            scale: 1.1,
                            textShadow: "0 0 15px rgba(255, 255, 255, 0.8)",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 10,
                          }}>
                          <span className="relative z-10">{part}</span>
                          {index < array.length - 1 && (
                            <span className="opacity-70">:</span>
                          )}
                          <span className="absolute inset-0 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                        </motion.span>
                      ))}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Segunda Seção - Flyer Promocional */}
      <section className="relative h-[550px]  text-white ">
        <div className=" max-w-6xl mx-auto px-4 absolute inset-0 z-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <h1 className=" md:text-5xl font-bold mt-[16%]">
                <span className="text-7xl text-gray-400 ml-[7px]">
                  Cegid Primavera
                </span>
                <h3 className="text-7xl mt-2 text-white md:text-3xl ml-[1%] font-normal">
                  Funcionalidades e Módulos
                </h3>
              </h1>
              <p className="text-lg mt-4 ml-[1%] text-white max-w-4xl mb-6">
                {cursoExibir.descricao}
              </p>
            </div>
          </div>
        </div>

        <img
          src="/academia/pagina home/detalhe.webp"
          alt="Banner Serviços de Hardware"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Terceira Seção - Conteúdo Programático */}
      <div className="relative py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Padrão de Bolinhas */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-4 h-4 bg-red-500 rounded-full top-10 left-10 animate-float"></div>
          <div className="absolute w-6 h-6 bg-blue-500 rounded-full top-20 right-20 animate-float-delayed"></div>
          <div className="absolute w-3 h-3 bg-yellow-500 rounded-full bottom-10 left-1/4 animate-float"></div>
          {/* Ícones Educacionais */}
          <div className="grid grid-cols-6 gap-20 p-10">
            {[...Array(24)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 opacity-20 transform rotate-45 transition-transform"
                style={{
                  animation: `float ${2 + (i % 3)}s infinite ease-in-out ${
                    i * 0.1
                  }s`,
                }}>
                {i % 4 === 0 && (
                  <svg
                    className="w-full h-full text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 005.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                )}
                {i % 4 === 1 && (
                  <svg
                    className="w-full h-full text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                )}
                {i % 4 === 2 && (
                  <svg
                    className="w-full h-full text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                )}
                {i % 4 === 3 && (
                  <svg
                    className="w-full h-full text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Conteúdo do Curso */}
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Conteúdo Programático
              </h2>

              <div className="space-y-4">
                {modules.map((module, index) => (
                  <ModuleCard
                    key={index}
                    module={module}
                    index={index}
                    isOpen={openModuleIndex === index}
                    onToggle={() =>
                      setOpenModuleIndex(
                        openModuleIndex === index ? null : index
                      )
                    }
                  />
                ))}
              </div>

              {/* Botão para ver conteúdo completo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8  text-center">
                <Link
                  to="/academia/curso1"
                  className="inline-flex justify-center items-center px-4 py-3  bg-gray-600  text-white font-semibold rounded-[5px] transition duration-300 transform hover:scale-105 shadow-lg">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  Mais detalhes do curso
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>

            {/* Card Fixo de Inscrição */}
            <div className="lg:w-1/4 md:ml-24">
              <div className="sticky top-6 bg-white rounded-[5px] shadow-lg overflow-hidden border border-gray-200">
                <div className="relative w-full">
                  <img
                    src="/academia/pagina home/inscricao.webp"
                    alt="Banner Academia Envisio"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 space-y- ">
                  <h3 className="font-semibold text-lg mb-4">
                    Informações do Curso
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-500">Duração</span>
                      <span className="font-medium">120h</span>
                    </li>

                    <li className="flex justify-between text-sm">
                      <span className="text-gray-500">Idioma</span>
                      <span className="font-medium">Português</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full md:w-full bg-gray-600 text-white  mt-8 md:mt-12 py-4 px-6 rounded-[5px]
     transition duration-300 transform hover:scale-105">
                    Inscrever-me no Curso
                  </button>

                  <a
                    href="https://wa.me/244947137676?text=Olá%20Envisio,%20gostaria%20de%20saber%20mais%20sobre%20os%20cursos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-4 border border-gray-300 bg-white text-gray-600 font-semibold py-3 px-6 rounded-[5px] transition duration-300 transform hover:scale-105 hover:bg-gray-50 block text-center">
                    Mais informações
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Inscrição */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  Inscreva-se no Curso
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              {success ? (
                <div className="text-center py-8">
                  <div className="text-green-500 text-5xl mb-4">✓</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Inscrição Enviada!
                  </h3>
                  <p className="text-gray-600">
                    Obrigado por se inscrever. Entraremos em contato em breve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="nome"
                        className="block text-sm font-semibold text-gray-700">
                        Primeiro Nome *
                      </label>
                      <input
                        type="text"
                        id="nome"
                        value={formData.nome}
                        onChange={(e) =>
                          setFormData({ ...formData, nome: e.target.value })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-[1px] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="sobrenome"
                        className="block text-sm font-semibold text-gray-700">
                        Último Nome *
                      </label>
                      <input
                        type="text"
                        id="sobrenome"
                        value={formData.sobrenome}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            sobrenome: e.target.value,
                          })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-[1px] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-[1px] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="telefone"
                      className="block text-sm font-semibold text-gray-700">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) =>
                        setFormData({ ...formData, telefone: e.target.value })
                      }
                      className="mt-1 block w-full border border-gray-400 rounded-[1px] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="empresa"
                      className="block text-sm font-semibold text-gray-700">
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="empresa"
                      value={formData.empresa}
                      onChange={(e) =>
                        setFormData({ ...formData, empresa: e.target.value })
                      }
                      className="mt-1 block w-full border border-gray-400 rounded-[1px] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-black mb-2">
                        Selecione o turno*
                      </label>

                      {/* Turno A */}
                      <div className="mb-4 border border-gray-200 border-b-gray-300 rounded-[1px] overflow-hidden">
                        <div className="p-4 bg-gray-100">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="turno"
                              value="Turno A"
                              checked={formData.turno === "Turno A"}
                              onChange={() =>
                                setFormData({ ...formData, turno: "Turno A" })
                              }
                              className="h-4 w-4 text-black ring-black border-b-gray-300 border-gray-300"
                              disabled={loading}
                            />
                            <span className="ml-3 text-sm font-semibold text-blue-700">
                              Turno A
                            </span>
                          </label>
                        </div>
                        {formData.turno === "Turno A" && (
                          <div className="bg-white p-4 mt-[-10px]">
                            <div className="space-y-1">
                              {["Segunda a Sexta - 8h às 17h (Presencial)"].map(
                                (option) => (
                                  <div
                                    key={option}
                                    className="py-2 px-3 hover:bg-gray-50 rounded transition-colors">
                                    <div className="flex items-center">
                                      <div className="flex-shrink-0 w-1.5 h-1.5 bg-gray-600 rounded-full mr-3"></div>
                                      <span className="text-sm text-gray-700">
                                        {option}
                                      </span>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Turno B */}
                      <div className="mb-4 border border-gray-200 border-b-gray-300 rounded-[1px] overflow-hidden">
                        <div className="p-4 bg-gray-100">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="turno"
                              value="Turno B"
                              checked={formData.turno === "Turno B"}
                              onChange={() =>
                                setFormData({ ...formData, turno: "Turno B" })
                              }
                              className="h-4 w-4 text-black ring-black border-b-gray-300 border-gray-300"
                              disabled={loading}
                            />
                            <span className="ml-3 text-sm font-semibold text-blue-700">
                              Turno B
                            </span>
                          </label>
                        </div>
                        {formData.turno === "Turno B" && (
                          <div className="bg-white p-4 mt-[-10px]">
                            <div className="space-y-1">
                              {[
                                "Terça - Feira - 19h às 21h (Online)",
                                "Quarta - Feira - 19h às 21h (Online)",
                                "Domingo - 9h às 17h (Presencial)",
                              ].map((option) => (
                                <div
                                  key={option}
                                  className="py-2 px-3 hover:bg-gray-50 rounded transition-colors">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 w-1.5 h-1.5 bg-gray-600 rounded-full mr-3"></div>
                                    <span className="text-sm text-gray-700">
                                      {option}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {!formData.turno && (
                      <p className="text-sm text-red-500">
                        Por favor, selecione um turno
                      </p>
                    )}
                  </div>

                  {/* Adicione este bloco após o campo de seleção de turno */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Nível de Experiência *
                    </label>
                    <select
                      required
                      value={formData.nivelExperiencia}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nivelExperiencia: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-[1px]"
                      disabled={loading}>
                      <option value="">Selecione seu nível</option>
                      <option value="Iniciante">Iniciante</option>
                      <option value="Intermediário">Intermediário</option>
                      <option value="Avançado">Avançado</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Anexar Ficheiros (PDF) *
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true">
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500">
                            <span>Carregar ficheiros</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              multiple
                              accept=".pdf"
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="pl-1">ou arraste e solte</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF até 10MB</p>
                      </div>
                    </div>
                    {fileNames.length > 0 && (
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Ficheiros selecionados:</p>
                        <ul className="list-disc pl-5">
                          {fileNames.map((name, index) => (
                            <li key={index}>{name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="mensagem"
                      className="block text-sm font-semibold text-gray-700">
                      Mensagem
                    </label>
                    <textarea
                      id="mensagem"
                      rows={3}
                      value={formData.mensagem}
                      onChange={(e) =>
                        setFormData({ ...formData, mensagem: e.target.value })
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-[1px] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"></textarea>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2 px-4 border border-transparent rounded-[5px] shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50">
                      {loading ? "Enviando..." : "Enviar Inscrição"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Academia;

/* Componentes auxiliares */
type ModuleCardProps = {
  module: {
    title: string;
    topics: string[];
  };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  index,
  isOpen,
  onToggle,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
      <button
        onClick={onToggle}
        className={`w-full px-5 py-3 flex items-center justify-between transition-colors duration-200 ${
          isOpen ? "bg-gray-100" : "hover:bg-gray-100"
        }`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-600 border border-gray-300">
            <span className="font-medium text-sm">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="text-left">
            <h3 className="text-base font-medium text-gray-700">
              {module.title}
            </h3>
            <p className="text-xs text-gray-500">
              {module.topics.length} tópicos
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className={`w-4 h-4 text-gray-500 transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white border-t border-gray-200">
            <div className="p-2 space-y-1">
              {module.topics.map((topic, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-gray-400">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">{topic}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Dados dos módulos
const modules = [
  {
    title: "Módulo 1: Conceitos Base de ERP",
    topics: [
      "O que é um ERP",
      "História e evolução do ERP",
      "Por que é importante",
      "Como funciona um sistema ERP",
      "Tipos de implementação de ERP",
      "Seis principais benefícios do ERP",
    ],
  },
  {
    title: "Módulo 2: Instalação e Administração do ERP Primavera",
    topics: [
      "Instalação do software",
      "Enquadramento e conceitos iniciais",
      "Criação e gestão de empresas",
      "Manutenção de dados fundamentais",
      "Gestão de utilizadores e segurança",
      "Configurações avançadas",
    ],
  },
  {
    title: "Módulo 3: Logística e Gestão de Inventário",
    topics: [
      "Documentos de compras e vendas",
      "Gestão de stock e inventário",
      "Movimentos e validações",
      "Relatórios e análises",
      "Processos de inventariação",
    ],
  },
  {
    title: "Módulo 4: Gestão Financeira e Contabilística",
    topics: [
      "Contabilidade básica",
      "Gestão de tesouraria",
      "Processos contabilísticos",
      "Relatórios financeiros",
      "Encerramento de contas",
    ],
  },
];
