/** @format */

import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Server, Cpu, Printer, Laptop } from "lucide-react";

interface Service {
  title: string;
  description: string;
  items?: string[];
}

interface ServiceCategory {
  category: "Hardware" | "Software" | "Renting";
  services: Service[];
}

const services: ServiceCategory[] = [
  {
    category: "Software",
    services: [
      {
        title: "Consultoria em TI",
        description: "Soluções personalizadas em software para empresas.",
        items: [
          "Centralização de informação",
          "Análise e gestão digital de negócios",
        ],
      },
      {
        title: "ERP Eticadata / Primavera",
        description: "Sistemas integrados de gestão empresarial.",
        items: [
          "Gestão Comercial",
          "Contabilidade",
          "Recursos Humanos",
          "AutoGest",
        ],
      },
    ],
  },
  {
    category: "Hardware",
    services: [
      {
        title: "Redes Estruturadas (Cisco)",
        description: "Instalação de redes com equipamentos profissionais.",
        items: ["Patch Panels", "Switches", "Roteadores"],
      },
      {
        title: "Vídeo Vigilância (CCTV)",
        description: "Monitoramento com câmeras, DVR/NVR e acesso remoto.",
        items: ["Câmeras", "Gravadores", "Sensores", "Monitoramento remoto"],
      },
      {
        title: "Cerca e Fechadura Eléctrica",
        description: "Sistemas de segurança com controle de acesso integrado.",
        items: [
          "Fechadura digital",
          "Integração com alarmes e câmeras",
          "Controle remoto de acesso",
        ],
      },
      {
        title: "Vídeo Porteiro e Ponto Biométrico",
        description:
          "Acesso seguro e inteligente com registro biométrico e vídeo.",
        items: [
          "Câmera integrada",
          "Áudio bidirecional",
          "Abertura remota de portas",
        ],
      },
    ],
  },
];

// Ícones para cada categoria
const categoryIcons: Record<string, React.ReactNode> = {
  Software: <Cpu className="w-10 h-10 text-pink-500 drop-shadow-lg" />,
  Hardware: <Server className="w-10 h-10 text-blue-500 drop-shadow-lg" />,
  Renting: (
    <span className="flex gap-2">
      <Printer className="w-8 h-8 text-green-500 drop-shadow-lg" />
      <Laptop className="w-8 h-8 text-lime-500 drop-shadow-lg" />
    </span>
  ),
};

const ServiceCard: React.FC<{
  service: Service;
  category: string;
  delay: number;
}> = ({ service, category, delay }) => {
  const getButtonText = (category: string) =>
    category === "Renting" ? "Saiba Mais" : "Fale Conosco";
  const getButtonLink = (category: string) =>
    category === "Renting" ? "/servicos/renting" : "/contact";
  const getButtonClasses = (category: string) => {
    const base =
      "inline-block px-6 py-2 rounded-full text-sm font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";
    if (category === "Renting") {
      return `${base} bg-gradient-to-r from-blue-600 to-cyan-400 text-white hover:brightness-110`;
    }
    return `${base} bg-gradient-to-r from-pink-600 to-red-400 text-white hover:brightness-110`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      viewport={{ once: true }}
      className="backdrop-blur-lg bg-white/60 border border-white/40 rounded-2xl shadow-2xl p-8 flex flex-col justify-between min-h-[320px] hover:shadow-3xl transition-all"
      style={{
        boxShadow:
          "0 8px 32px 0 rgba(31, 38, 135, 0.10), 0 1.5px 6px 0 rgba(0,0,0,0.03)",
      }}>
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BadgeCheck className="w-6 h-6 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-800 tracking-tight">
            {service.title}
          </h3>
        </div>
        <p className="text-gray-700 mb-4 leading-relaxed font-medium">
          {service.description}
        </p>
        {service.items && (
          <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm pl-2">
            {service.items.map((item, index) => (
              <li key={index} className="pl-1">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-8 text-center">
        <a
          href={getButtonLink(category)}
          className={getButtonClasses(category)}>
          {getButtonText(category)}
        </a>
      </div>
    </motion.div>
  );
};

const Servicos: React.FC = () => {
  return (
    <>
      <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center mb-16">
        <img
          src="/banner-servicos.jpg"
          alt="Banner de Serviços"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />
        <div
          className="absolute inset-0 w-full h-full bg-white/30 backdrop-blur-md"
          style={{ zIndex: 1 }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl mx-auto px-8 py-12"
            style={{
              borderRadius: 0,
              boxShadow: "none",
              background: "transparent",
            }}>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 text-center tracking-tight mb-4">
              Serviços Corporativos
            </h1>
            <div className="w-24 h-1 mx-auto rounded bg-gray-300 mb-6" />
            <p className="text-lg md:text-2xl text-gray-800 font-light text-center max-w-2xl mx-auto">
              Soluções inovadoras, consultoria estratégica e infraestrutura de
              alto padrão para empresas que buscam excelência.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="px-6 py-12 md:px-32 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-4">
          Soluções{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-500">
            Profissionais
          </span>
        </motion.h1>
        <p className="text-center text-gray-500 mb-16 max-w-2xl mx-auto text-lg font-light">
          Tecnologia, consultoria e infraestrutura de alto padrão para empresas
          que buscam excelência e inovação. Descubra como podemos impulsionar o
          seu negócio.
        </p>

        {services.map((category, index) => (
          <section
            key={index}
            className="mb-24"
            id={category.category === "Renting" ? "rentingsection" : undefined}>
            <div className="flex flex-col items-center mb-10">
              <div className="flex items-center justify-center mb-3">
                <span className="bg-white/80 shadow-lg rounded-full p-4 border border-gray-200">
                  {categoryIcons[category.category]}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight mb-2">
                {category.category}
              </h2>
              <div className="w-24 h-1 rounded-full bg-gradient-to-r from-pink-500 via-blue-400 to-green-400" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {category.services.map((service, idx) => (
                <ServiceCard
                  key={idx}
                  service={service}
                  category={category.category}
                  delay={0.1 * idx}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default Servicos;
