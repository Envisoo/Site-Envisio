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
        className="inline-block px-6 py-2 rounded-full text-sm font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-r from-red-600 to-red-400 text-white hover:brightness-110">
        Fale Conosco
      </a>
    </div>
  </motion.div>
);

const ServicosHardware: React.FC = () => (
  <>
    {/* Banner Hero com imagem de fundo */}
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
      <img
        src="/images/hardware.png"
        alt="Banner Serviços de Hardware"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />
    </section>

    {/* Seção de serviços detalhados estilo Renting */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Soluções Profissionais em{" "}
            <span className="text-blue-600">Hardware</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Infraestrutura, segurança e tecnologia de ponta para sua empresa
            crescer com confiança.
          </p>
        </div>
        <div className="space-y-20">
          {hardwareServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-12`}>
              {/* Imagem ilustrativa do serviço */}
              <div className="flex-1">
                <img
                  src={
                    index === 0
                      ? "/images/hardware.png"
                      : index === 1
                      ? "/images/cctv.jpg"
                      : index === 2
                      ? "/images/fechadura.jpg"
                      : "/images/biometrico.jpg"
                  }
                  alt={service.title}
                  className="w-full h-96 object-cover rounded-2xl border border-gray-200 shadow-lg"
                />
              </div>
              {/* Conteúdo do serviço */}
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {service.title}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {service.description}
                </p>
                {/* Lista de features */}
                <div className="space-y-3">
                  {service.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="inline-block w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                        •
                      </span>
                      <span className="text-gray-800">{item}</span>
                    </div>
                  ))}
                </div>
                {/* Botão de contato */}
                <div className="pt-4">
                  <a
                    href="/pages/contato"
                    className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow">
                    Solicitar Orçamento
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default ServicosHardware;
