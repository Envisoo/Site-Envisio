/** @format */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Academia = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    mensagem: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const updateClock = () => setCurrentTime(new Date());
    updateClock(); // Update immediately
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Format the email body to include all relevant information
      const emailBody = `
        Nova inscrição no curso CCNA 200-301:
        
        Nome: ${formData.nome}
        Email: ${formData.email}
        Telefone: ${formData.telefone || "Não informado"}
        Empresa: ${formData.empresa || "Não informada"}
        
        Mensagem:
        ${formData.mensagem || "Nenhuma mensagem adicional."}
        
        ---
        Este é um e-mail automático, por favor não responda diretamente.
      `;

      await axios.post("http://localhost:3001/api/email", {
        ...formData,
        area: "Inscrição CCNA",
        tipoCliente: "Aluno",
      });

      setSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccess(false);
        setFormData({
          nome: "",
          email: "",
          telefone: "",
          empresa: "",
          mensagem: "",
        });
      }, 3000);
    } catch (error) {
      setError("Erro ao enviar inscrição. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 mt-[-80px]">
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
      <div className="py-16 h-[600px] bg-gradient-to-r from-red-900 to-red-700 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 text-center md:text-left">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold mb-6">
                Certificação CCNA 200-301
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl mb-8">
                Prepare-se para o exame oficial Cisco CCNA com os melhores
                especialistas de Portugal
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4">
                <div className="flex items-center justify-center md:justify-start">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span>Certificado Oficial Reconhecido</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <span>Turmas Limitadas</span>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="md:w-1/2">
              <img
                src="/academia/ccna-promo.webp"
                alt="CCNA Certification"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Terceira Seção - Conteúdo Programático */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Conteúdo do Curso */}
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Conteúdo Programático
              </h2>

              <div className="space-y-4">
                {modules.map((module, index) => (
                  <ModuleCard key={index} module={module} index={index} />
                ))}
              </div>
            </div>

            {/* Card Fixo de Inscrição */}
            <div className="lg:w-1/3">
              <div className="sticky top-6 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="bg-red-600 text-white p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2">CCNA 200-301</h3>
                  <p className="text-lg">Inscrições Abertas</p>
                </div>
                <div className="p-6 space-y-6">
                  <CourseFeature icon="clock" text="Duração: 6 meses" />
                  <CourseFeature icon="book" text="40 módulos completos" />
                  <CourseFeature icon="video" text="180 horas de conteúdo" />
                  <CourseFeature
                    icon="certificate"
                    text="Certificado oficial"
                  />

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg 
    transition duration-300 transform hover:scale-105">
                    Inscrever-me no Curso
                  </button>

                  <p className="text-center text-sm text-gray-500">
                    Vagas limitadas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Inscrição */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto py-4"
              onClick={() => setIsModalOpen(false)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-full max-w-md mx-auto bg-white rounded-lg shadow-xl relative"
                onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                  e.stopPropagation()
                }>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      Inscrição CCNA
                    </h3>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-500 hover:text-gray-700">
                      <svg
                        className="w-5 h-5"
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

                  {success ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8">
                      <svg
                        className="w-16 h-16 text-green-500 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">
                        Inscrição Realizada!
                      </h4>
                      <p className="text-gray-600">
                        Em breve entraremos em contato.
                      </p>
                    </motion.div>
                  ) : (
                    <form
                      onSubmit={
                        handleSubmit as React.FormEventHandler<HTMLFormElement>
                      }
                      className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.nome}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormData({ ...formData, nome: e.target.value })
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-red-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          E-mail *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-red-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Telefone
                          </label>
                          <input
                            type="tel"
                            value={formData.telefone}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFormData({
                                ...formData,
                                telefone: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-red-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Empresa
                          </label>
                          <input
                            type="text"
                            value={formData.empresa}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFormData({
                                ...formData,
                                empresa: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-red-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Mensagem
                        </label>
                        <textarea
                          value={formData.mensagem}
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) =>
                            setFormData({
                              ...formData,
                              mensagem: e.target.value,
                            })
                          }
                          rows={2}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-red-500"
                        />
                      </div>

                      {error && <p className="text-red-500 text-xs">{error}</p>}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
                        {loading ? "Enviando..." : "Confirmar Inscrição"}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
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
};

const ModuleCard: React.FC<ModuleCardProps> = ({ module, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between p-4 hover:bg-gray-50">
        <div className="flex items-center gap-4">
          {/* Ícone de Bloqueio/Status */}
          <div className="text-gray-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Título do Módulo */}
          <div>
            <h3 className="text-base font-medium text-gray-900">
              Módulo {String(index).padStart(2, "0")}
            </h3>
            <p className="text-sm text-gray-500">{module.title}</p>
          </div>
        </div>

        {/* Contador de Tópicos e Status */}
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            {module.topics.length} Tópicos
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <span className="text-sm text-gray-500">0% Concluído</span>
          </div>
        </div>
      </div>

      {/* Conteúdo do Módulo */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="border-t border-gray-200 overflow-hidden">
            <div className="p-4 space-y-3">
              {module.topics.map((topic, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg group">
                  {/* Ícone do Tópico */}
                  <div className="mt-1">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>

                  {/* Título do Tópico */}
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 group-hover:text-gray-900">
                      {topic}
                    </p>
                  </div>

                  {/* Status do Tópico */}
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Barra de Progresso */}
            <div className="px-4 pb-4">
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="w-0 h-full bg-red-500 transition-all duration-300"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão Expandir */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 border-t border-gray-200 text-sm text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2">
        <span>{isOpen ? "Recolher" : "Expandir"}</span>
        <svg
          className={`w-4 h-4 transform transition-transform ${
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
      </button>
    </motion.div>
  );
};

type CourseFeatureProps = {
  icon: string;
  text: string;
};

const CourseFeature = ({ icon, text }: CourseFeatureProps) => (
  <div className="flex items-center space-x-3">
    <span className="text-red-600">
      <i className={`fas fa-${icon} text-xl`}></i>
    </span>
    <span className="text-gray-700">{text}</span>
  </div>
);

// Dados dos módulos
const modules = [
  {
    title: "Fundamentos de Rede",
    topics: [
      "Arquitetura TCP/IP e OSI",
      "Endereçamento IPv4 e IPv6",
      "Fundamentos de Switching",
      "Operações básicas de roteamento",
    ],
  },
  {
    title: "Switching",
    topics: [
      "VLANs e Trunking",
      "Spanning Tree Protocol",
      "EtherChannel",
      "Inter-VLAN Routing",
    ],
  },
  // Adicione mais módulos conforme necessário
];
