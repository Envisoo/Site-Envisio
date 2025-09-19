/** @format */

import React, { useState } from "react";
import { motion } from "framer-motion";
import LinhaDoTempo from "../components/LinhaDoTempo";
import Avatar from "../components/Avatar";
import { TeamMember } from "../types/Team";

const About = () => {
  const [activeTab, setActiveTab] = useState("historia");
  const [showMoreValues, setShowMoreValues] = useState(false);

  const team: TeamMember[] = [
    {
      name: "Stézia da Conceição",
      role: "CEO e Fundador",
      bgColor: "bg-red-600",
      gender: "male",
      description:
        "Líder visionário com expertise em gestão empresarial e tecnologia, guiando a ENVISIO desde sua fundação com inovação e excelência.",
    },
    {
      name: "Teodoro Pedro",
      role: "Desenvolvedor",
      bgColor: "bg-blue-600",
      gender: "male",
      description:
        "Especialista em desenvolvimento de software, focado em criar soluções tecnológicas inovadoras e escaláveis para nossos clientes.",
    },
    {
      name: "Maria de Fátima",
      role: "Assistente administrativo",
      bgColor: "bg-green-600",
      gender: "female",
      description:
        "Profissional dedicada que coordena as operações administrativas, garantindo a eficiência e organização em todos os processos.",
    },
    {
      name: "Sansoni Benedito",
      role: "Consultor Funcional",
      bgColor: "bg-purple-600",
      gender: "male",
      description:
        "Consultor experiente especializado em análise e otimização de processos empresariais, com foco em resultados práticos.",
    },
  ];

  return (
    <section className="relative">
      {/* Banner responsivo */}
      <div
        className="relative w-full flex items-center justify-start overflow-hidden bg-white"
        style={{ height: "clamp(100px, 30vw, 500px)" }}>
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="text-white pl-8 md:pl-16 lg:pl-24 w-full max-w-7xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[30px] sm:text-3xl md:text-5xl lg:text-5xl font-bold mb-4 md:mb-6"
              style={{
                fontFamily: "Segoe UI semibold",
              }}>
              <span className="text-white">Quem somos</span>
            </motion.h1>
          </div>
        </div>
        <img
          src="/images/imagem quem somos/banner.webp"
          alt="Banner ENVISIO"
          className="absolute w-full h-full object-cover object-center"
        />
      </div>
      {/* Fim do banner */}

      {/* =====================
        Conteúdo principal da página Quem Somos
        ===================== */}
      <div
        id="sobre"
        className="text-gray-800 bg-gradient-to-b from-white to-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
          {/* Cabeçalho da seção */}
          <div className="mb-12 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-semibold text-gray-900 mb-4"
              style={{ fontFamily: "Segoe UI semibold" }}>
              Sobre Nós
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-gray-700 font-regular">
              Conheça nossa história, missão e equipa
            </motion.p>
          </div>

          {/* Abas de navegação */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {/* Aba: Nossa História */}
            <motion.button
              className={`px-6 py-2 rounded-[5px] font-semibold border transition-all duration-300 ${
                activeTab === "historia"
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-transparent text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
              }`}
              onClick={() => setActiveTab("historia")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              Nossa História
            </motion.button>
            {/* Aba: Missão & Visão */}
            <motion.button
              className={`px-6 py-2 rounded-[5px] font-semibold border transition-all duration-300 ${
                activeTab === "missao"
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-transparent text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
              }`}
              onClick={() => setActiveTab("missao")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              Missão & Visão
            </motion.button>
            {/* Aba: Nossa Equipe */}
            <motion.button
              className={`px-6 py-2 rounded-[5px] font-semibold border transition-all duration-300 ${
                activeTab === "equipe"
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-transparent text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
              }`}
              onClick={() => setActiveTab("equipe")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              Nossa Equipa
            </motion.button>
          </div>

          {/* Conteúdo das abas */}
          <div className="w-full">
            {/* Aba: Nossa História */}
            {activeTab === "historia" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}>
                {/* Grid ajustado para melhor responsividade */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-10">
                  {/* Texto da história */}
                  <div className="flex flex-col justify-center order-2 md:order-1">
                    <p className="text-gray-700 mb-4 font-regular text-base md:text-lg">
                      A ENVISIO, é uma empresa de direito Angolano, orientada
                      para os problemas e soluções locais, que atua no mercado
                      da Consultoria e provedor de serviços e soluções de
                      tecnologia de informações apostando numa prestação de
                      serviço eficaz e de qualidade desde 2018.
                    </p>
                  </div>

                  {/* Imagem com melhor responsividade */}
                  <div className="flex items-center justify-center order-1 md:order-2">
                    <motion.img
                      src="/images/imagem quem somos/História.webp"
                      alt="Equipe ENVISIO"
                      className="rounded-lg shadow-lg w-full max-w-md h-48 md:h-64 object-cover"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>

                {/* Timeline com melhor responsividade */}
                <div className="mt-8 px-4 md:px-0">
                  <LinhaDoTempo />
                </div>
              </motion.div>
            )}

            {/* Aba: Missão & Visão */}
            {activeTab === "missao" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-10">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Missão */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative group bg-gradient-to-br from-white to-gray-50 rounded-[5px] p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-red-50 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-[5px] bg-red-50 flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors duration-300">
                        <svg
                          className="w-6 h-6 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 mb-4">
                        Missão
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Prestar serviços de consultoria e contabilidade com
                        excelência, ajudando empresas a otimizar a sua gestão
                        financeira, cumprir obrigações fiscais e tomar decisões
                        estratégicas com base em dados sólidos.
                      </p>
                    </div>
                  </motion.div>

                  {/* Visão */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative group bg-gradient-to-br from-white to-gray-50 rounded-[5px] p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-[5px] bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                        <svg
                          className="w-6 h-6 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 mb-4">
                        Visão
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Ser uma referência no setor de consultoria e
                        contabilidade, reconhecida pela inovação, confiabilidade
                        e impacto positivo no crescimento dos nossos clientes.
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Valores */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-[5px] p-8 shadow-sm border border-gray-100 overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-[5px] bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors duration-300">
                        <svg
                          className="w-6 h-6 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                        Valores
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowMoreValues(!showMoreValues)}
                      className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200">
                      {showMoreValues
                        ? "Mostrar menos"
                        : "Ver todos os valores"}
                      <svg
                        className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                          showMoreValues ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Ética e Transparência",
                        description:
                          "Atuamos com integridade, garantindo total conformidade com normas e regulamentos.",
                        icon: (
                          <svg
                            className="w-5 h-5 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ),
                      },
                      {
                        title: "Compromisso com o Cliente",
                        description:
                          "Entendemos as necessidades do cliente e oferecemos soluções personalizadas.",
                        icon: (
                          <svg
                            className="w-5 h-5 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          </svg>
                        ),
                      },
                      {
                        title: "Excelência Profissional",
                        description:
                          "Investimos na capacitação contínua da nossa equipa.",
                        icon: (
                          <svg
                            className="w-5 h-5 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        ),
                      },
                      {
                        title: "Inovação e Tecnologia",
                        description:
                          "Utilizamos ferramentas modernas para otimizar processos.",
                        icon: (
                          <svg
                            className="w-5 h-5 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        ),
                      },
                      {
                        title: "Sustentabilidade",
                        description:
                          "Atuamos com responsabilidade social e ambiental.",
                        icon: (
                          <svg
                            className="w-5 h-5 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        ),
                      },
                    ]
                      .slice(0, showMoreValues ? 5 : 4)
                      .map((valor, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * index }}
                          className="flex items-start gap-4 p-4 rounded-[5px] hover:bg-white hover:shadow-sm transition-all duration-200">
                          <div className="flex-shrink-0 mt-0.5">
                            {valor.icon}
                          </div>
                          <div>
                            <h4 className="text-base font-semibold text-gray-800">
                              {valor.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                              {valor.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Aba: Nossa Equipe */}
            {activeTab === "equipe" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-red-600 mb-2">
                    Conheça Nossa Equipa
                  </h3>
                  <p className="text-gray-700 font-regular px-4">
                    Profissionais apaixonados por tecnologia e inovação, prontos
                    para transformar sua empresa
                  </p>
                </div>
                <div className="flex flex-col space-y-8 md:space-y-16">
                  {team.map((member, index) => (
                    <div key={index} className="relative px-4 md:px-0">
                      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
                        {/* Avatar card */}
                        <motion.div
                          initial={{ opacity: 0, y: 50, scale: 0.8 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            duration: 0.7,
                            delay: index * 0.3,
                          }}
                          className="w-full md:w-1/3 h-full flex flex-col">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white rounded-[5px] p-8 md:p-[69px] shadow-sm hover:shadow-md transition-all duration-300 h-full flex items-center justify-center">
                            <div className="w-full">
                              <Avatar
                                name={member.name}
                                role={member.role}
                                bgColor={member.bgColor}
                                gender={member.gender}
                              />
                            </div>
                          </motion.div>
                        </motion.div>

                        {/* Informações ajustadas para mobile */}
                        <motion.div
                          initial={{ opacity: 0, x: 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.8,
                            delay: index * 0.3 + 0.2,
                          }}
                          className="w-full md:w-2/3">
                          <div className="bg-white rounded-[5px] p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="space-y-4 md:space-y-6">
                              <div>
                                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">
                                  {member.name}
                                </h3>
                                <p className="text-red-600 font-medium mb-3 md:mb-4">
                                  {member.role}
                                </p>
                              </div>

                              <div>
                                <h4 className="text-base md:text-lg font-semibold text-gray-700 mb-2">
                                  Sobre
                                </h4>
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                  {member.description}
                                </p>
                              </div>

                              <div className="pt-3 md:pt-4">
                                <span
                                  className={`px-3 md:px-4 py-2 rounded-[5px] ${
                                    member.bgColor
                                  } bg-opacity-10 text-xs md:text-sm font-medium ${member.bgColor.replace(
                                    "bg-",
                                    "text-"
                                  )}`}>
                                  {member.role === "CEO e Fundador"
                                    ? "Liderança"
                                    : member.role === "Desenvolvedor"
                                    ? "Tecnologia"
                                    : member.role ===
                                      "Assistente administrativo"
                                    ? "Administração"
                                    : "Consultoria"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
