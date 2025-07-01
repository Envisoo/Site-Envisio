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
];

const softwareImages = [
  "/images/software1.webp", // Altere para imagens reais de software se desejar
  "/images/software2.jpg",
  "/images/software3.jpg",
];

const ServicosSoftware: React.FC = () => (
  <>
    {/* Banner Hero com imagem de fundo */}
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">
      <img
        src="/images/banner1.png"
        alt="Banner Serviços de Software"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        style={{ opacity: 1 }}
      />
    </section>

    {/* Seção de serviços detalhados premium e avançada (fundo branco, sem quadrado/sombra extra) */}
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Soluções <span className="text-red-600">Digitais</span> de Alto
            Impacto
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Transforme sua empresa com tecnologia, automação e inovação sob
            medida.
          </p>
        </div>
        <div className="space-y-24">
          {softwareServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col-reverse lg:flex-row ${
                index % 2 === 0 ? "" : "lg:flex-row-reverse"
              } items-center gap-16 group`}
              whileHover={{ scale: 1.01 }}>
              {/* Imagem ilustrativa do serviço - nítida, sem overlay */}
              <div className="flex-1 relative rounded-3xl overflow-hidden border border-gray-100 group-hover:scale-105 transition-transform duration-500">
                <img
                  src={softwareImages[index % softwareImages.length]}
                  alt={service.title}
                  className="w-full h-96 object-cover object-center rounded-3xl group-hover:scale-105 transition-transform duration-500"
                  style={{ filter: "none" }}
                />
              </div>
              {/* Conteúdo do serviço com selo animado */}
              <div className="flex-1 space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <motion.span
                    initial={{ scale: 0.8, rotate: -10 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 * index }}
                    className="bg-gradient-to-br from-red-100 via-white to-red-200 rounded-full p-5 shadow-lg text-4xl animate-bounce">
                    {service.icon}
                  </motion.span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                    {service.title}
                  </h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                  {service.description}
                </p>
                {/* Lista de features com microinteração avançada */}
                <div className="space-y-3">
                  {service.items.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{
                        scale: 1.06,
                        x: 10,
                        backgroundColor: "#fee2e2",
                      }}
                      className="flex items-center gap-3 group/item cursor-pointer px-3 py-2 rounded-xl transition-all">
                      <span className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg group-hover/item:bg-red-600 group-hover/item:text-white transition-all shadow">
                        •
                      </span>
                      <span className="text-gray-800 group-hover:item:text-red-600 transition-colors font-semibold">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
                {/* Botão de contato com efeito de brilho */}
                <div className="pt-4">
                  <a
                    href="/pages/contato"
                    className="inline-block bg-gradient-to-r from-red-600 to-red-600 text-white px-10 py-4 rounded-xl font-bold shadow-xl hover:from-red-700 hover:to-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400/40 relative overflow-hidden group">
                    <span className="relative z-10">Solicitar Orçamento</span>
                    <span className="absolute left-0 top-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm animate-pulse" />
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

export default ServicosSoftware;
