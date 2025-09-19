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
  DollarSign,
  TrendingUp,
  GitBranch,
} from "lucide-react";

// Dados dos serviços de software
const softwareServices = [
  {
    id: 1,
    title: "Consultoria em TI",
    description:
      "Planeamento estratégico, auditoria de sistemas e orientação para modernização tecnológica, sempre de acordo com a necessidade de cada cliente.",
    icon: <BadgeCheck className="w-8 h-8 text-red-600" />,
    items: [
      "Redução de custos através da eliminação de desperdícios",
      "Acesso a conhecimento técnico especializado sob pedido",
      "Proteção de dados e conformidade regulamentar",
      "Soluções dimensionáveis que crescem com o seu negócio",
      "Foco no negócio principal com equipas mais produtivas",
    ],
    image: "/images/imagem soft/Consultoria.webp",
  },
  {
    id: 2,
    title: "Soluções de ERP",
    description:
      "Sistemas de gestão empresarial completos que integram todos os departamentos numa única plataforma, proporcionando eficiência operacional e visão estratégica do negócio.",
    icon: <Cpu className="w-8 h-8 text-red-500" />,
    items: [
      "Integração total de dados entre departamentos",
      "Automação de processos manuais e repetitivos",
      "Visão em tempo real do negócio com painéis de controlo",
      "Otimização de custos operacionais",
      "Controlo e segurança de dados avançados",
    ],
    image: "/images/imagem soft/Primavera.webp",
  },
  {
    id: 3,
    title: "Desenvolvimento de Software",
    description:
      "Soluções de software personalizadas que impulsionam a inovação e a eficiência do seu negócio, com foco em desempenho, segurança e experiência do utilizador.",
    icon: <Code2 className="w-8 h-8 text-red-400" />,
    items: [
      "Aceleração do tempo de colocação no mercado com metodologias ágeis",
      "Alto desempenho e escalabilidade para crescimento",
      "Qualidade garantida com testes automatizados",
      "Experiência do utilizador intuitiva e acessível",
      "Manutenção e apoio contínuos",
    ],
    image: "/images/imagem soft/Desenvol.webp",
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
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;
  const shouldTruncate = service.description.length > maxLength;
  const displayText = isExpanded
    ? service.description
    : `${service.description.substring(0, maxLength)}${
        shouldTruncate ? "..." : ""
      }`;

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      className={`cursor-pointer rounded-[5px] p-6 border-2 transition-all flex flex-col justify-between h-full min-h-[320px] ${
        active
          ? "border-red-500 bg-white shadow-2xl"
          : "border-transparent bg-white/50 shadow-lg"
      }`}>
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-[5px] bg-gradient-to-br from-red-50 to-white shadow">
            {service.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
        </div>
        <div className="mb-4">
          <p
            className="text-gray-600"
            style={{ fontFamily: "Segoe UI Regular" }}>
            {displayText}
          </p>
          {shouldTruncate && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="text-red-600 hover:text-red-800 text-sm font-medium mt-1 focus:outline-none"
              style={{ fontFamily: "Segoe UI Regular" }}>
              {isExpanded ? "Mostrar menos" : "Ler mais"}
            </button>
          )}
        </div>
      </div>
      <a
        href="/contato"
        className="mt-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-[5px] font-semibold shadow transition-all w-full flex items-center justify-center">
        Solicitar Orçamento
      </a>
    </motion.div>
  );
};

// Componente de Destaque de Serviço
const ServiceHighlight: React.FC<{ service: Service }> = ({ service }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-gradient-to-br from-white to-blue-50 rounded-[5px] shadow-2xl overflow-hidden">
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="relative h-96 lg:h-full">
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-8">
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            Principais Benefícios
          </h4>
          <ul className="space-y-3">
            {service.items.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-[5px] bg-red-100 flex items-center justify-center flex-shrink-0">
                  <ChevronRight className="w-3 h-3 text-red-600" />
                </div>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-3"></h4>
          <div className="grid grid-cols-2 gap-3 p-3"></div>
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
      {/* Banner com texto sobreposto */}
      <section
        className="relative w-full flex items-center justify-start overflow-hidden bg-white"
        style={{ height: "clamp(100px, 30vw, 500px)" }}>
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="text-white pl-8 md:pl-16 lg:pl-24 w-full max-w-7xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[30px] sm:text-3xl md:text-5xl lg:text-5xl  mb-4 md:mb-6"
              style={{
                fontFamily: "Segoe UI semibold",
              }}>
              <span className="text-white">Software</span>
            </motion.h1>
          </div>
        </div>
        <img
          src="/images/imagem soft/Banner2.webp"
          alt="Banner Serviços de Software"
          className="w-full h-full object-cover object-center"
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
            className="text-4xl md:text-5xl text-red-600 mb-6"
            style={{ fontFamily: "Segoe UI semibold" }}>
            Soluções Integradas de <span className="text-black">Software</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-lg md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: "Segoe UI Regular" }}>
            Digitalização, automação e inovação para empresas modernas. Da
            consultoria estratégica ao desenvolvimento à medida, entregamos
            tecnologia de ponta para transformar o seu negócio.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-white rounded-[5px] shadow-lg p-8 flex items-center gap-6">
            <Cloud className="w-10 h-10 text-red-500 flex-shrink-0" />
            <div>
              <h5 className="text-lg font-semibold text-gray-800 mb-1">
                Cloud, ERP & Integrações
              </h5>
              <p
                className="text-gray-600 text-sm"
                style={{ fontFamily: "Segoe UI Regular" }}>
                Implementação, integração e automação de sistemas de gestão,
                cloud e APIs para eficiência total.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-red-50 to-white rounded-[5px] shadow-lg p-8 flex items-center gap-6">
            <Headphones className="w-10 h-10 text-red-600 flex-shrink-0" />
            <div>
              <h5 className="text-lg font-semibold text-gray-800 mb-1">
                Consultoria & Apoio Especializado
              </h5>
              <p
                className="text-gray-600 text-sm"
                style={{ fontFamily: "Segoe UI Regular" }}>
                Diagnóstico, planeamento, formação e apoio para digitalização e
                inovação do seu negócio.
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
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 tracking-tight"
              style={{ fontFamily: "Segoe UI semibold" }}>
              Nossas <span className="text-red-600">Soluções</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg md:text-2xl text-gray-600 max-w-2xl mx-auto"
              style={{ fontFamily: "Segoe UI Regular" }}>
              Soluções inovadoras, confiáveis e sob medida para digitalizar e
              automatizar a sua empresa.
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
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-blue-50 shadow-xl rounded-[5px] p-3 border border-gray-200 transition-all"
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
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-blue-50 shadow-xl rounded-[5px] p-3 border border-gray-200 transition-all"
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
              className="text-3xl text-red-400 md:text-4xl  mb-4"
              style={{ fontFamily: "Segoe UI semibold" }}>
              Por que escolher as nossas{" "}
              <span className="text-red-400">soluções de software</span>?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-white/90 mb-8 max-w-3xl mx-auto"
              style={{ fontFamily: "Segoe UI Regular" }}>
              Inovação, segurança e apoio especializado para o crescimento do
              seu negócio.
            </motion.p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8 text-red-400" />,
                title: "Segurança Avançada",
                description:
                  "Soluções desenvolvidas com foco em proteção de dados e conformidade.",
              },
              {
                icon: <Clock className="w-8 h-8 text-red-400" />,
                title: "Apoio Ágil",
                description:
                  "Equipa técnica disponível para garantir a continuidade do seu negócio.",
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
                  className="bg-gray-800 rounded-[5px] p-8 hover:bg-gray-700 transition-all">
                  <div className="w-14 h-14 rounded-[5px] bg-gray-700 flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3
                    className="text-xl text-white mb-3"
                    style={{ fontFamily: "Segoe UI semibold" }}>
                    {item.title}
                  </h3>
                  <p
                    className="text-gray-300"
                    style={{ fontFamily: "Segoe UI Regular" }}>
                    {item.description}
                  </p>
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
            className="text-3xl md:text-4xl text-white mb-6"
            style={{ fontFamily: "Segoe UI semibold" }}>
            Pronto para transformar a sua operação digital?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: "Segoe UI Regular" }}>
            Os nossos especialistas estão prontos para criar a solução perfeita
            para o seu negócio.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}>
            <a
              href="/contato"
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-[5px] font-semibold shadow-lg transition-all inline-flex items-center justify-center">
              Agendar Consultoria
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicosSoftware;
