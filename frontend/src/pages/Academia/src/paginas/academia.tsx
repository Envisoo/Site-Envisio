/** @format */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";

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
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(null);

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

    // Validate required fields
    if (!formData.nome.trim() || !formData.email.trim()) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      setLoading(false);
      return;
    }

    try {
      // Format the email body to include all relevant information
      const emailBody = `
        Nova inscrição no curso Cegid Primavera:
        
        Nome: ${formData.nome}
        Email: ${formData.email}
        Telefone: ${formData.telefone || "Não informado"}
        Empresa: ${formData.empresa || "Não informada"}
        
        Mensagem:
        ${formData.mensagem || "Nenhuma mensagem adicional."}
      `;

      // Create a new object with only the necessary data
      const emailData = {
        name: formData.nome,
        email: formData.email,
        phone: formData.telefone,
        empresa: formData.empresa,
        message: formData.mensagem,
        subject: `Nova Inscrição Cegid Primavera - ${formData.nome}`,
        text: emailBody,
        area: "Inscrição Cegid Primavera",
        tipoCliente: "Aluno",
      };

      console.log("Enviando dados:", emailData); // Debug log

      await axios.post("http://localhost:8080/api/email", emailData);

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
      console.error("Erro ao enviar inscrição:", error);
      setError(
        "Ocorreu um erro ao enviar sua inscrição. Por favor, tente novamente."
      );
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
      <div className="py-16 h-[600px] bg-gradient-to-r from-red-800 via-red-700 to-red-700 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 text-center md:text-left">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold mb-6">
                Cegid Primavera
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl mb-8">
                Aprenda a dominar o ERP mais utilizado em Angola e Portugal para
                gestão empresarial completa
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4">
                <div className="flex flex-col md:flex-row justify-center md:justify-between gap-4">
                  <div className="flex items-center justify-center md:justify-start">
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <span>Solução ERP Completa</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <span>Módulos Práticos</span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-center md:justify-between gap-4">
                  <div className="flex items-center justify-center md:justify-start">
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    <span>Material de Apoio</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <span>Certificado Oficial</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

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
                className="mt-8 ml-[-80px] text-center">
                <Link
                  to="/academia/curso1"
                  className="inline-flex items-center px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-[5px] transition duration-300 transform hover:scale-105 shadow-lg">
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
                  Ver Curso
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
                <div className="bg-red-700 text-white p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2">Cegid Primavera</h3>
                  <p className="text-lg">Inscrições Abertas</p>
                </div>
                <div className="p-4 space-y- ">
                  <div className="flex flex-col  justify-center  gap-4">
                    <CourseFeature icon="clock" text="Duração: 2 Semanas" />
                    <CourseFeature icon="book" text="10 módulos completos" />

                    <CourseFeature icon="video" text="Material de apoio" />
                    <CourseFeature
                      icon="certificate"
                      text="Certificado oficial"
                    />
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full md:w-full bg-red-600 hover:bg-red-700 text-white font-bold mt-8 md:mt-12 py-4 px-6 rounded-[5px]
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
                className="w-full max-w-md mx-auto bg-white rounded-lg shadow-xl relative overflow-visible"
                onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                  e.stopPropagation()
                }>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">
                      Inscrição Cegid Primavera
                    </h3>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none">
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
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
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
                      className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.nome}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormData({ ...formData, nome: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Seu nome completo"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          E-mail *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="seu@email.com"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="(XX) XXXXX-XXXX"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Sua empresa (opcional)"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
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
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Alguma observação ou dúvida?"
                        />
                      </div>

                      {error && (
                        <div className="text-red-500 text-sm py-2 px-3 bg-red-50 rounded-md">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? (
                          <span className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24">
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Enviando...
                          </span>
                        ) : (
                          "Confirmar Inscrição"
                        )}
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
    title: "Módulo 2: Instalação e Administração do ERP Cegid Primavera",
    topics: [
      "Instalação",
      "Criação de Empresas",
      "Manutenção de Dados",
      "Gestão de Utilizadores e Segurança",
      "Licenciamento",
      "Outras Funcionalidades",
      "Caso Prático",
    ],
  },
  {
    title: "Módulo 3: Processo de Gestão - Compras",
    topics: [
      "Ficha de Fornecedores",
      "Registo de documentos de Compra",
      "Reprodução de conteúdos entre documentos",
      "Operações de estorno",
      "Obrigações Fiscais",
      "Reimpressão de documentos",
      "Mapas de Análises",
      "Caso Prático",
    ],
  },
  {
    title: "Módulo 4: Processo de Gestão - Inventário",
    topics: ["Conceitos e operações de Inventário"],
  },
];
