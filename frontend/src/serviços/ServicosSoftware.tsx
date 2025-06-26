/** @format */

import React from "react";
import { motion } from "framer-motion";
import { Cpu, BadgeCheck, Code2, Cloud, ShieldCheck } from "lucide-react";

// Dados dos serviços de software
const softwareServices = [
  {
    title: "Consultoria em TI",
    description:
      "Soluções personalizadas para digitalizar, automatizar e potencializar o seu negócio. Diagnóstico, planejamento e execução sob medida.",
    icon: <BadgeCheck className="w-8 h-8 text-red-600" />,
    items: [
      "Mapeamento de processos",
      "Transformação digital",
      "Treinamento de equipes",
    ],
  },
  {
    title: "ERP Eticadata / Primavera",
    description:
      "Implantação, customização e suporte de sistemas de gestão empresarial líderes de mercado. Controle total e integração de todos os setores.",
    icon: <Cpu className="w-8 h-8 text-red-500" />,
    items: [
      "Gestão Comercial",
      "Contabilidade",
      "Recursos Humanos",
      "AutoGest",
    ],
  },
  {
    title: "Desenvolvimento de Software",
    description:
      "Criação de sistemas web, aplicativos e integrações sob demanda, com foco em performance, segurança e experiência do usuário.",
    icon: <Code2 className="w-8 h-8 text-red-400" />,
    items: [
      "Sistemas Web",
      "APIs e Integrações",
      "Aplicativos Mobile",
      "UX/UI Design",
    ],
  },
  {
    title: "Cloud & Segurança",
    description:
      "Migração, gestão e monitoramento de ambientes em nuvem, com proteção avançada de dados e alta disponibilidade.",
    icon: <Cloud className="w-8 h-8 text-red-300" />,
    items: [
      "Infraestrutura em Nuvem",
      "Backup e Disaster Recovery",
      "Firewall e Proteção de Dados",
      "Monitoramento 24/7",
    ],
  },
];

// Card de serviço animado e elegante
const ServiceCard: React.FC<{
  service: (typeof softwareServices)[0];
  delay: number;
}> = ({ service, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.7, delay }}
    viewport={{ once: true }}
    className="group bg-white border border-red-100 rounded-3xl shadow-2xl p-8 flex flex-col justify-between min-h-[340px] hover:shadow-3xl hover:-translate-y-2 transition-all relative overflow-hidden"
    style={{
      boxShadow:
        "0 8px 32px 0 rgba(255,0,70,0.08), 0 1.5px 6px 0 rgba(0,0,0,0.04)",
    }}>
    {/* Ícone flutuante */}
    <div className="absolute -top-8 right-8 opacity-10 group-hover:opacity-20 transition-all duration-300 scale-150">
      {service.icon}
    </div>
    <div>
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-gradient-to-br from-red-100 via-white to-red-200 rounded-full p-2 shadow">
          {service.icon}
        </span>
        <h3 className="text-lg font-bold text-gray-900 tracking-tight">
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

const ServicosSoftware: React.FC = () => (
  <>
    {/* Banner Hero com imagem de fundo */}
    <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-white">
      <img
        src="/banner-software.jpg"
        alt="Banner Serviços de Software"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        style={{ filter: "brightness(0.7)" }}
      />
      <div className="absolute inset-0 bg-white/70 z-10" />
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full px-4 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-black text-gray-900 text-center tracking-tight mb-6 drop-shadow-lg">
          Serviços de Software
          <br />
          <span className="bg-gradient-to-r from-red-600 via-red-400 to-red-600 bg-clip-text text-transparent">
            Inovação, Gestão e Resultados
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg md:text-2xl text-gray-700 font-light text-center max-w-2xl mx-auto mb-8">
          Soluções digitais sob medida, consultoria estratégica e sistemas de
          gestão para empresas que buscam excelência, produtividade e
          transformação digital.
        </motion.p>
        <motion.a
          href="/pages/contato"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="inline-block px-8 py-3 rounded-full text-lg font-semibold shadow-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-r from-red-600 to-red-400 text-white hover:brightness-110">
          Solicite uma Demonstração
        </motion.a>
      </div>
    </section>

    {/* Destaques rápidos */}
    <section className="relative z-10 -mt-12 mb-20 flex flex-wrap justify-center gap-6 px-4">
      <div className="bg-white rounded-2xl shadow-lg px-8 py-6 flex flex-col items-center max-w-xs border-t-4 border-red-600">
        <Cpu className="w-8 h-8 text-red-600 mb-2" />
        <span className="font-bold text-lg text-gray-900">+10 anos</span>
        <span className="text-gray-500 text-sm">
          de experiência em software
        </span>
      </div>
      <div className="bg-white rounded-2xl shadow-lg px-8 py-6 flex flex-col items-center max-w-xs border-t-4 border-gray-900">
        <BadgeCheck className="w-8 h-8 text-gray-900 mb-2" />
        <span className="font-bold text-lg text-gray-900">
          Projetos Customizados
        </span>
        <span className="text-gray-500 text-sm">Soluções sob medida</span>
      </div>
      <div className="bg-white rounded-2xl shadow-lg px-8 py-6 flex flex-col items-center max-w-xs border-t-4 border-red-400">
        <ShieldCheck className="w-8 h-8 text-red-400 mb-2" />
        <span className="font-bold text-lg text-gray-900">
          Segurança & Cloud
        </span>
        <span className="text-gray-500 text-sm">
          Proteção e disponibilidade
        </span>
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
          <span className="bg-gradient-to-br from-red-600 via-white to-red-400 shadow-lg rounded-full p-4 border border-red-100">
            <Cpu className="w-10 h-10 text-red-600 drop-shadow-lg" />
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2">
          Nossos Serviços de Software
        </h2>
        <div className="w-24 h-1 rounded-full bg-gradient-to-r from-red-600 via-white to-red-600" />
        <p className="text-gray-500 mt-4 max-w-2xl text-center">
          Conheça as soluções digitais que impulsionam a gestão e o crescimento
          da sua empresa.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-4">
        {softwareServices.map((service, idx) => (
          <ServiceCard key={idx} service={service} delay={0.1 * idx} />
        ))}
      </div>
    </section>
  </>
);

export default ServicosSoftware;
