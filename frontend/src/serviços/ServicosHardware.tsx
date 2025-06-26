/** @format */

import React from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Server,
  ShieldCheck,
  Camera,
  KeyRound,
} from "lucide-react";

// Dados dos serviços de hardware
const hardwareServices = [
  {
    title: "Redes Estruturadas (Cisco)",
    description:
      "Projetamos e implementamos redes robustas, seguras e escaláveis para empresas de todos os portes, utilizando equipamentos Cisco de última geração.",
    icon: <Server className="w-8 h-8 text-blue-600" />,
    items: ["Patch Panels", "Switches", "Roteadores", "Cabeamento estruturado"],
  },
  {
    title: "Vídeo Vigilância (CCTV)",
    description:
      "Soluções completas de monitoramento com câmeras inteligentes, gravação em nuvem e acesso remoto para máxima segurança do seu patrimônio.",
    icon: <Camera className="w-8 h-8 text-red-500" />,
    items: [
      "Câmeras HD/4K",
      "Gravadores DVR/NVR",
      "Sensores inteligentes",
      "Monitoramento remoto",
    ],
  },
  {
    title: "Cerca e Fechadura Eléctrica",
    description:
      "Automatize o controle de acesso com sistemas de segurança integrados, fechaduras digitais e cercas elétricas de alta confiabilidade.",
    icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
    items: [
      "Fechadura digital",
      "Integração com alarmes e câmeras",
      "Controle remoto de acesso",
      "Cercas energizadas",
    ],
  },
  {
    title: "Vídeo Porteiro e Ponto Biométrico",
    description:
      "Controle de acesso moderno com reconhecimento biométrico e vídeo porteiro integrado, garantindo segurança e praticidade.",
    icon: <KeyRound className="w-8 h-8 text-purple-600" />,
    items: [
      "Câmera integrada",
      "Áudio bidirecional",
      "Abertura remota de portas",
      "Registro biométrico",
    ],
  },
];

// Card de serviço com animação
const ServiceCard: React.FC<{
  service: (typeof hardwareServices)[0];
  delay: number;
}> = ({ service, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.7, delay }}
    viewport={{ once: true }}
    className="group bg-gradient-to-br from-white/70 via-white/40 to-blue-50/60 border border-white/60 rounded-3xl shadow-2xl p-8 flex flex-col justify-between min-h-[340px] hover:shadow-3xl hover:-translate-y-2 transition-all relative overflow-hidden"
    style={{
      boxShadow:
        "0 8px 32px 0 rgba(31, 38, 135, 0.10), 0 1.5px 6px 0 rgba(0,0,0,0.03)",
    }}>
    {/* Ícone flutuante */}
    <div className="absolute -top-8 right-8 opacity-10 group-hover:opacity-20 transition-all duration-300 scale-150">
      {service.icon}
    </div>
    <div>
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-gradient-to-br from-blue-100 via-white to-blue-200 rounded-full p-2 shadow">
          {service.icon}
        </span>
        <h3 className="text-lg font-bold text-gray-800 tracking-tight">
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
        href="/pages/contato"
        className="inline-block px-6 py-2 rounded-full text-sm font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-r from-blue-600 to-pink-500 text-white hover:brightness-110">
        Fale Conosco
      </a>
    </div>
  </motion.div>
);

const ServicosHardware: React.FC = () => (
  <>
    {/* Banner Hero */}
    <section className="relative w-full min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-900 overflow-hidden">
      {/* Efeito de partículas ou formas */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%">
          <circle cx="15%" cy="30%" r="120" fill="#fff" fillOpacity="0.04" />
          <circle cx="85%" cy="70%" r="180" fill="#fff" fillOpacity="0.06" />
          <circle cx="50%" cy="90%" r="80" fill="#fff" fillOpacity="0.03" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-900/90" />
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-black text-white text-center tracking-tight mb-6 drop-shadow-lg">
          Soluções de Hardware
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-pink-400 to-green-400 bg-clip-text text-transparent">
            Inovação, Segurança e Performance
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg md:text-2xl text-white/90 font-light text-center max-w-2xl mx-auto mb-8">
          Nossa equipe entrega projetos de infraestrutura, segurança eletrônica
          e automação com tecnologia de ponta, garantindo eficiência, proteção e
          tranquilidade para o seu negócio.
        </motion.p>
        <motion.a
          href="/pages/contato"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="inline-block px-8 py-3 rounded-full text-lg font-semibold shadow-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-r from-blue-600 to-pink-500 text-white hover:brightness-110">
          Solicite uma Consultoria Gratuita
        </motion.a>
      </div>
    </section>

    {/* Destaques rápidos */}
    <section className="relative z-10 -mt-12 mb-20 flex flex-wrap justify-center gap-6 px-4">
      <div className="bg-white/90 rounded-2xl shadow-lg px-8 py-6 flex flex-col items-center max-w-xs border-t-4 border-blue-600">
        <Server className="w-8 h-8 text-blue-600 mb-2" />
        <span className="font-bold text-lg text-gray-800">+15 anos</span>
        <span className="text-gray-500 text-sm">de experiência em TI</span>
      </div>
      <div className="bg-white/90 rounded-2xl shadow-lg px-8 py-6 flex flex-col items-center max-w-xs border-t-4 border-pink-500">
        <ShieldCheck className="w-8 h-8 text-pink-500 mb-2" />
        <span className="font-bold text-lg text-gray-800">Segurança Total</span>
        <span className="text-gray-500 text-sm">Projetos certificados</span>
      </div>
      <div className="bg-white/90 rounded-2xl shadow-lg px-8 py-6 flex flex-col items-center max-w-xs border-t-4 border-green-500">
        <Camera className="w-8 h-8 text-green-500 mb-2" />
        <span className="font-bold text-lg text-gray-800">
          Monitoramento 24/7
        </span>
        <span className="text-gray-500 text-sm">Suporte e manutenção</span>
      </div>
    </section>

    {/* Lista de serviços */}
    <section className="mb-24 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex flex-col items-center mb-10">
        <div className="flex items-center justify-center mb-3">
          <span className="bg-white/80 shadow-lg rounded-full p-4 border border-gray-200">
            <Server className="w-10 h-10 text-blue-500 drop-shadow-lg" />
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight mb-2">
          Nossos Serviços de Hardware
        </h2>
        <div className="w-24 h-1 rounded-full bg-gradient-to-r from-blue-500 via-pink-400 to-green-400" />
        <p className="text-gray-500 mt-4 max-w-2xl text-center">
          Conheça as soluções que fazem a diferença na infraestrutura e
          segurança da sua empresa.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10 px-4">
        {hardwareServices.map((service, idx) => (
          <ServiceCard key={idx} service={service} delay={0.1 * idx} />
        ))}
      </div>
    </section>
  </>
);

export default ServicosHardware;
