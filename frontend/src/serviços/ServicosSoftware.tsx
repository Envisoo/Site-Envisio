/** @format */

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  BadgeCheck,
  Code2,
  Cloud,
  ChevronRight,
  ChevronLeft,
  Quote,
  Zap,
  Clock,
  Headphones,
  Shield,
  Database,
  Network,
} from "lucide-react";

// Dados dos serviços de software
const softwareServices = [
  {
    id: 1,
    title: "Consultoria em TI",
    description:
      "Soluções personalizadas para digitalizar, automatizar e potencializar o seu negócio. Diagnóstico, planejamento e execução sob medida.",
    icon: <BadgeCheck className="w-8 h-8 text-red-600" />,
    items: [
      "Mapeamento de processos",
      "Transformação digital",
      "Treinamento de equipes",
    ],
    features: [
      { icon: <Cloud />, text: "Cloud & DevOps" },
      { icon: <Shield />, text: "Segurança" },
      { icon: <Cpu />, text: "Infraestrutura" },
      { icon: <Headphones />, text: "Suporte 24/7" },
    ],
    image: "/images/software1.webp",
    testimonial: {
      text: "A consultoria de TI da Envisio acelerou nossa transformação digital e aumentou a produtividade.",
      author: "Paulo Silva, CEO - TechAngola",
    },
  },
  {
    id: 2,
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
    features: [
      { icon: <Database />, text: "Banco de Dados" },
      { icon: <Shield />, text: "Compliance Fiscal" },
      { icon: <Network />, text: "Integração Total" },
      { icon: <Clock />, text: "Suporte dedicado" },
    ],
    image: "/images/software2.jpg",
    testimonial: {
      text: "O ERP implantado pela Envisio trouxe controle e automação para todos os setores da empresa.",
      author: "Maria João, Diretora Financeira - Grupo Beta",
    },
  },
  {
    id: 3,
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
    features: [
      { icon: <Zap />, text: "Performance" },
      { icon: <Shield />, text: "Segurança" },
      { icon: <BadgeCheck />, text: "Qualidade" },
      { icon: <Cloud />, text: "Escalabilidade" },
    ],
    image: "/images/software3.jpg",
    testimonial: {
      text: "O sistema desenvolvido superou nossas expectativas em usabilidade e integração.",
      author: "Helena Cruz, COO - FinTech Luanda",
    },
  },
];

// Tipos auxiliares
type Feature = {
  icon: React.ReactElement<any>;
  text: string;
};
type Service = (typeof softwareServices)[number];
type ServiceCardProps = {
  service: Service;
  active: boolean;
  onClick: () => void;
};
// Componente de Card de Serviço Premium
const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  active,
  onClick,
}) => (
  <motion.div
    onClick={onClick}
    whileHover={{ scale: 1.03 }}
    className={`cursor-pointer rounded-2xl p-6 border-2 transition-all flex flex-col justify-between h-full min-h-[320px] ${
      active
        ? "border-red-500 bg-white shadow-2xl"
        : "border-transparent bg-white/50 shadow-lg"
    }`}>
    <div>
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-full bg-gradient-to-br from-red-50 to-white shadow">
          {service.icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
      </div>
      <p className="text-gray-600 mb-4">
        {service.description.substring(0, 100)}...
      </p>
      <div className="flex justify-between items-center mb-4">
        <div className="flex -space-x-2">
          {service.features.slice(0, 3).map((feature: Feature, i: number) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full bg-white border-2 border-white flex items-center justify-center shadow">
              {React.cloneElement(feature.icon as React.ReactElement<any>, {
                className: "w-4 h-4 text-red-600",
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
    <a
      href="/pages/contato"
      className="mt-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition-all w-full flex items-center justify-center">
      Solicitar Orçamento
    </a>
  </motion.div>
);

// Componente de Destaque de Serviço
const ServiceHighlight: React.FC<{ service: Service }> = ({ service }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl overflow-hidden">
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="relative h-96 lg:h-full">
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
          <div className="text-white">
            <div className="flex items-center gap-2 mb-2">
              <BadgeCheck className="text-yellow-400" />
              <span className="font-semibold">Solução Certificada</span>
            </div>
            <h3 className="text-2xl font-bold">{service.title}</h3>
          </div>
        </div>
      </div>
      <div className="p-8">
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            Principais Benefícios
          </h4>
          <ul className="space-y-3">
            {service.items.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <ChevronRight className="w-3 h-3 text-red-600" />
                </div>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            Tecnologias Incluídas
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {service.features.map((feature: Feature, i: number) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                {React.cloneElement(feature.icon as React.ReactElement<any>, {
                  className: "w-5 h-5 text-red-600",
                })}
                <span className="text-sm font-medium text-gray-700">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-start gap-3">
            <Quote className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-700 italic mb-2">
                "{service.testimonial.text}"
              </p>
              <p className="text-sm font-medium text-gray-600">
                — {service.testimonial.author}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const ServicosSoftware = () => {
  const [activeService, setActiveService] = useState<Service>(
    softwareServices[0]
  );
  const carouselRef = useRef<HTMLDivElement>(null);

  // Função para navegação do carrossel (circular)
  const scrollToCard = (index: number) => {
    let newIndex = index;
    if (index < 0) newIndex = softwareServices.length - 1;
    if (index >= softwareServices.length) newIndex = 0;
    if (carouselRef.current) {
      const children = carouselRef.current
        .children as HTMLCollectionOf<HTMLElement>;
      const card = children[newIndex];
      if (card) {
        card.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
    setActiveService(softwareServices[newIndex]);
  };

  return (
    <div className="bg-white">
      {/* Banner estático apenas imagem */}
      <section
        className="w-full flex items-center justify-center overflow-hidden bg-white"
        style={{ height: "clamp(100px, 35vw, 400px)" }}>
        <img
          src="/images/softwar.jpg"
          alt="Banner Serviços de Software"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 1 }}
        />
      </section>

      {/* Espaço entre o banner e o conteúdo */}
      <div className="h-10 md:h-16 lg:h-10" />

      {/* Seção institucional descritiva antes do carrossel */}
      <section className="relative bg-gradient-to-b from-white via-blue-50 to-white py-20 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-red-600 mb-6">
            Soluções Integradas de <span className="text-black">Software</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-lg md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Digitalização, automação e inovação para empresas modernas. Da
            consultoria estratégica ao desenvolvimento sob medida, entregamos
            tecnologia de ponta para transformar seu negócio.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 flex items-center gap-6">
            <Cloud className="w-10 h-10 text-blue-500 flex-shrink-0" />
            <div>
              <h5 className="text-lg font-semibold text-gray-800 mb-1">
                Cloud, ERP & Integrações
              </h5>
              <p className="text-gray-600 text-sm">
                Implantação, integração e automação de sistemas de gestão, cloud
                e APIs para eficiência total.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-lg p-8 flex items-center gap-6">
            <Headphones className="w-10 h-10 text-red-600 flex-shrink-0" />
            <div>
              <h5 className="text-lg font-semibold text-gray-800 mb-1">
                Consultoria & Suporte Especializado
              </h5>
              <p className="text-gray-600 text-sm">
                Diagnóstico, planejamento, treinamento e suporte para
                digitalização e inovação do seu negócio.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seção de Serviços em Destaque - agora carrossel */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 tracking-tight">
              Nossas <span className="text-red-600">Soluções</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg md:text-2xl text-gray-600 max-w-2xl mx-auto">
              Soluções inovadoras, confiáveis e sob medida para digitalizar e
              automatizar sua empresa.
            </motion.p>
          </div>

          {/* Carrossel de cards */}
          <div className="relative mb-16">
            {/* Setas de navegação */}
            <button
              onClick={() =>
                scrollToCard(
                  softwareServices.findIndex((s) => s.id === activeService.id) -
                    1
                )
              }
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-blue-50 shadow-xl rounded-full p-3 border border-gray-200 transition-all"
              aria-label="Anterior">
              <ChevronLeft className="w-7 h-7 text-red-600" />
            </button>
            <div
              ref={carouselRef}
              className="flex gap-8 overflow-x-auto no-scrollbar py-4 px-12 snap-x snap-mandatory scroll-smooth justify-start"
              style={{
                scrollBehavior: "smooth",
                scrollbarWidth: "none",
                scrollPaddingLeft: "3rem",
                scrollPaddingRight: "3rem",
              }}>
              {softwareServices.map((service, idx) => (
                <div
                  key={service.id}
                  className={`snap-center min-w-[340px] max-w-[320px] flex-shrink-0 transition-all duration-200 ${
                    activeService.id === service.id
                      ? "border-red-500 shadow-2xl z-10 scale-105"
                      : "opacity-70"
                  }`}
                  onClick={() => scrollToCard(idx)}>
                  <ServiceCard
                    service={service}
                    active={activeService.id === service.id}
                    onClick={() => scrollToCard(idx)}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() =>
                scrollToCard(
                  softwareServices.findIndex((s) => s.id === activeService.id) +
                    1
                )
              }
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-blue-50 shadow-xl rounded-full p-3 border border-gray-200 transition-all"
              aria-label="Próximo">
              <ChevronRight className="w-7 h-7 text-red-600" />
            </button>
          </div>

          {/* Destaque do serviço selecionado */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35 }}>
              <ServiceHighlight service={activeService} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      {/* Seção de Diferenciais */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4">
              Por que escolher nossas{" "}
              <span className="text-red-400">soluções de software</span>?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 max-w-3xl mx-auto">
              Inovação, segurança e suporte especializado para o crescimento do
              seu negócio.
            </motion.p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8 text-red-400" />,
                title: "Segurança Avançada",
                description:
                  "Soluções desenvolvidas com foco em proteção de dados e compliance.",
              },
              {
                icon: <Clock className="w-8 h-8 text-red-400" />,
                title: "Suporte Ágil",
                description:
                  "Equipe técnica disponível para garantir a continuidade do seu negócio.",
              },
              {
                icon: <BadgeCheck className="w-8 h-8 text-red-400" />,
                title: "Qualidade Garantida",
                description:
                  "Projetos entregues com excelência e validação de mercado.",
              },
            ].map(
              (
                item: {
                  icon: React.ReactNode;
                  title: string;
                  description: string;
                },
                index: number
              ) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-700 transition-all">
                  <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>
      {/* CTA Final */}
      <section className="py-20 bg-red-700">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para transformar sua operação digital?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Nossos especialistas estão prontos para criar a solução perfeita
            para o seu negócio.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/pages/contato"
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold shadow-lg transition-all flex items-center justify-center">
              Agendar Consultoria
            </a>
            <a
              href="/pages/contato"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold shadow-lg transition-all flex items-center justify-center">
              Falar com Especialista
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicosSoftware;
