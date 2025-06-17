/** @format */

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaLaptopCode,
  FaCheckCircle,
  FaAward,
  FaCheck,
} from "react-icons/fa";

const About = () => {
  const [activeTab, setActiveTab] = useState("historia");

  const stats = [
    { icon: <FaUsers />, value: "150+", label: "Clientes Satisfeitos" },
    { icon: <FaLaptopCode />, value: "200+", label: "Projetos Entregues" },
    { icon: <FaCheckCircle />, value: "99%", label: "Taxa de Satisfação" },
    { icon: <FaAward />, value: "15+", label: "Anos de Experiência" },
  ];

  const team = [
    {
      name: "Ana Silva",
      role: "CEO & Fundadora",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Carlos Mendes",
      role: "CTO",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Juliana Costa",
      role: "Desenvolvedora Sênior",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Rafael Santos",
      role: "Especialista em Infraestrutura",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  ];

  return (
    <section
      id="sobre"
      className="text-gray-800 bg-gradient-to-b from-white to-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-semibold text-gray-900 mb-4 font-semibold">
            Sobre Nós
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 font-regular">
            Conheça nossa história, missão e equipe
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <motion.button
            className={`px-6 py-2 rounded-full font-semibold border transition-all duration-300 ${
              activeTab === "historia"
                ? "bg-red-600 text-white border-red-600"
                : "bg-transparent text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
            }`}
            onClick={() => setActiveTab("historia")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            Nossa História
          </motion.button>
          <motion.button
            className={`px-6 py-2 rounded-full font-semibold border transition-all duration-300 ${
              activeTab === "missao"
                ? "bg-red-600 text-white border-red-600"
                : "bg-transparent text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
            }`}
            onClick={() => setActiveTab("missao")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            Missão & Visão
          </motion.button>
          <motion.button
            className={`px-6 py-2 rounded-full font-semibold border transition-all duration-300 ${
              activeTab === "equipe"
                ? "bg-red-600 text-white border-red-600"
                : "bg-transparent text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
            }`}
            onClick={() => setActiveTab("equipe")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            Nossa Equipe
          </motion.button>
        </div>

        <div className="w-full">
          {activeTab === "historia" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}>
              <div className="grid md:grid-cols-2 gap-10 mb-10">
                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl font-semibold text-red-600 mb-4">
                    Nossa Trajetória
                  </h3>
                  <p className="text-gray-700 mb-4 font-regular">
                    A ENVISIO, é uma empresa de direito Angolano, orientada para
                    os problemas e soluções locais, que atua no mercado da
                    Consultoria e provedor de serviços e soluções de tecnologia
                    de informações apostando numa prestação de serviço eficaz e
                    de qualidade desde 2018.
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <motion.img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Equipe ENVISIO"
                    className="rounded-lg shadow-lg max-w-full h-64 object-cover"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}>
                    <div className="bg-white rounded-lg p-6 flex flex-col items-center shadow-md hover:-translate-y-2 transition-transform">
                      <div className="text-3xl text-red-600 mb-2">
                        {stat.icon}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </h4>
                      <p className="text-gray-600 text-sm">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "missao" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg p-8 shadow-md mb-6 md:mb-0">
                  <h3 className="text-xl font-bold text-red-600 mb-3">
                    Missão
                  </h3>
                  <p className="text-gray-700">
                    Prestar serviços de consultoria e contabilidade com
                    excelência, ajudando empresas a otimizar a sua gestão
                    financeira, cumprir obrigações fiscais e tomar decisões
                    estratégicas com base em dados sólidos.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-8 shadow-md">
                  <h3 className="text-xl font-bold text-red-600 mb-3">Visão</h3>
                  <p className="text-gray-700">
                    Ser uma referência no setor de consultoria e contabilidade,
                    reconhecida pela inovação, confiabilidade e impacto positivo
                    no crescimento dos nossos clientes.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md mt-8 border-l-4 border-red-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Valores
                </h3>
                <ul className="text-gray-700 space-y-3 pl-2">
                  <li className="flex items-start gap-2">
                    <FaCheck color="#22c55e" size={20} />
                    <span>
                      Ética e Transparência – Atuamos com integridade,
                      garantindo total conformidade com normas e regulamentos.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheck color="#22c55e" size={20} />
                    <span>
                      Compromisso com o Cliente – Entendemos as necessidades do
                      cliente e oferecemos soluções personalizadas.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheck color="#22c55e" size={20} />
                    <span>
                      Excelência Profissional – Investimos na capacitação
                      contínua da nossa equipa para oferecer o melhor serviço.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheck color="#22c55e" size={20} />
                    <span>
                      Inovação e Tecnologia – Utilizamos ferramentas modernas
                      para otimizar processos e agregar valor aos negócios.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheck color="#22c55e" size={20} />
                    <span>
                      Sustentabilidade e Responsabilidade Social – Atuamos com
                      responsabilidade, contribuindo para um mercado mais justo
                      e sustentável.
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === "equipe" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}>
              <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-red-600 mb-2">
                    Conheça Nossa Equipe
                  </h3>
                  <p className="text-gray-700 font-regular">
                    Profissionais apaixonados por tecnologia e inovação, prontos
                    para transformar sua empresa
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {team.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}>
                      <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col items-center hover:-translate-y-2 transition-transform">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4 text-center">
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">
                            {member.name}
                          </h4>
                          <p className="text-red-600 text-sm">{member.role}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
  );
};

export default About;
