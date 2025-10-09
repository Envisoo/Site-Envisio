/** @format */

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import {
  Printer,
  Shield,
  Calculator,
  Check,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  RefreshCw,
  Headphones,
  Laptop,
  Server,
} from "lucide-react";
import RentingFeaturesPanel from "../components/RentingFeaturesPanel";

// Dados dos serviços de renting
const rentingServices = [
  {
    id: 1,
    title: "Computadores",
    slug: "computadores",
    description:
      "Equipamentos de alto desempenho para atender às demandas do seu negócio, com manutenção e suporte inclusos.",
    icon: <Laptop className="w-8 h-8 text-red-600" />,
    items: [
      "Equipamentos de última geração",
      "Alto desempenho para todas as tarefas",
      "Suporte e manutenção incluídos",
      "Segurança de dados avançada",
      "Soluções personalizadas",
    ],
    features: [],
    image: "/images/renting/Computador.webp",
  },
  {
    id: 2,
    title: "Impressoras",
    slug: "impressoras",
    description:
      "Soluções completas de impressão com manutenção preventiva e suporte técnico especializado.",
    icon: <Printer className="w-8 h-8 text-red-600" />,
    items: [
      "Impressão rápida e de qualidade",
      "Manutenção preventiva incluída",
      "Redução de custos operacionais",
      "Conectividade em rede",
      "Controle de impressão",
    ],
    features: [],
    image: "/images/renting/Impressora.webp",
  },
  {
    id: 3,
    title: "Infraestrutura e Servidores",
    slug: "servidores",
    description:
      "Instalação, configuração e gerenciamento de servidores físicos e virtuais, oferecendo robustez e escalabilidade para o seu negócio.",
    icon: <Server className="w-8 h-8 text-red-600" />,
    items: [
      "Processamento robusto",
      "Armazenamento seguro e escalável",
      "Acesso centralizado",
      "Alta disponibilidade",
      "Backup e recuperação",
    ],
    features: [],
    image: "/images/renting/Servidor.webp",
  },
];

// Componente de Card de Serviço Premium
type Feature = {
  icon: React.ReactElement;
  text: string;
};

type Service = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactElement;
  items: string[];
  features: Feature[];
  image: string;
};

type ServiceCardProps = {
  service: Service;
  active: boolean;
  onClick: () => void;
};

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
      whileHover={{ scale: active ? 1.03 : 1 }}
      className={`cursor-pointer rounded-[5px] p-6 border-2 transition-all flex flex-col justify-between h-full min-h-[320px] ${
        active
          ? "border-red-500 bg-white shadow-2xl"
          : "border-transparent bg-white/50 shadow-lg hover:opacity-75"
      }`}>
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-[5px] bg-gradient-to-br from-blue-50 to-white shadow">
            {service.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
        </div>
        <div className="mb-4">
          <p className="text-gray-600">{displayText}</p>
          {shouldTruncate && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="text-red-600 hover:text-red-800 text-sm font-medium mt-1 focus:outline-none">
              {isExpanded ? "Mostrar menos" : "Ler mais"}
            </button>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex -space-x-2">
            {service.features.slice(0, 3).map((feature, i) => (
              <div
                key={i}
                className="w-7 h-8 rounded-[5px] bg-white border-2 border-white flex items-center justify-center shadow">
                {React.cloneElement(feature.icon as React.ReactElement<any>, {
                  className: "w-4 h-4 text-red-600",
                })}
              </div>
            ))}
          </div>
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
    className="bg-gradient-to-br from-white to-red-50 rounded-[5px] shadow-2xl overflow-hidden">
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
            {service.items.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  {React.cloneElement(feature.icon as React.ReactElement<any>, {
                    className: "w-5 h-5",
                  })}
                </div>
                <span className="text-gray-700 font-medium">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const RentingSection = () => {
  const [activeService, setActiveService] = useState(rentingServices[0]);

  const carouselRef = useRef<HTMLDivElement>(null);

  // Função para navegação do carrossel (circular)
  const scrollToCard = (index: number) => {
    let newIndex = index;
    if (index < 0) newIndex = rentingServices.length - 1;
    if (index >= rentingServices.length) newIndex = 0;
    if (carouselRef.current) {
      const card = carouselRef.current.children[newIndex] as HTMLElement;
      if (card) {
        card.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
    setActiveService(rentingServices[newIndex]);
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
              className="text-[30px] sm:text-3xl md:text-5xl lg:text-5xl font-bold mb-4 md:mb-6"
              style={{
                fontFamily: "Segoe UI semibold",
              }}>
              <span className="text-white">Aluguel de produtos </span>
            </motion.h1>
          </div>
        </div>
        <img
          src="/images/renting/Banner2.webp"
          alt="Banner Serviços de Renting"
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
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-red-600 mb-6"
            style={{ fontFamily: "Segoe UI semibold" }}>
            Soluções de <span className="text-black">Renting</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: "Segoe UI Regular" }}>
            Transforme sua infraestrutura de TI com nossas soluções de aluguel
            flexíveis. Equipamentos de última geração com suporte técnico
            especializado e manutenção inclusa.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-white rounded-[5px] shadow-lg p-8 flex items-center gap-6">
            <Calculator className="w-10 h-10 text-orange-500 flex-shrink-0" />
            <div>
              <h4 className="text-xl font-semibold mb-2">Custo-Benefício</h4>
              <p className="text-gray-600">
                Reduza custos de investimento inicial e mantenha seu parque
                tecnológico sempre atualizado
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
              <h4 className="text-xl font-semibold mb-2">
                Suporte Especializado
              </h4>
              <p className="text-gray-600">
                Equipe técnica dedicada e pronta para atender suas necessidades
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
              className="text-4xl md:text-5xl text-gray-900 mb-5 tracking-tight"
              style={{ fontFamily: "Segoe UI semibold" }}>
              Nossos Serviços de Renting
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg md:text-2xl text-gray-600 max-w-2xl mx-auto"
              style={{ fontFamily: "Segoe UI Regular" }}>
              Equipamentos de última geração com flexibilidade e economia para
              sua empresa
            </motion.p>
          </div>

          {/* Carrossel de cards */}
          <div className="relative mb-16">
            <button
              onClick={() =>
                scrollToCard(
                  rentingServices.findIndex((s) => s.id === activeService.id) -
                    1
                )
              }
              className="absolute -left-8 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-blue-50 shadow-xl rounded-full p-3 border border-gray-200 transition-all"
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
                fontFamily: "Segoe UI Regular",
              }}>
              {rentingServices.map((service) => (
                <div
                  key={service.id}
                  className={`min-w-[300px] sm:min-w-[350px] snap-start transition-all duration-300 ${
                    activeService.id !== service.id
                      ? "opacity-50 blur-[0.5px] scale-95"
                      : ""
                  }`}>
                  <ServiceCard
                    service={service}
                    active={activeService.id === service.id}
                    onClick={() => setActiveService(service)}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() =>
                scrollToCard(
                  rentingServices.findIndex((s) => s.id === activeService.id) +
                    1
                )
              }
              className="absolute -right-8 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-blue-50 shadow-xl rounded-full p-3 border border-gray-200 transition-all"
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
              <RentingFeaturesPanel tipo={activeService.slug} />
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
              className="text-3xl text-white md:text-4xl font-bold mb-4"
              style={{ fontFamily: "Segoe UI semibold" }}>
              Por que escolher nosso Renting?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              style={{ fontFamily: "Segoe UI Regular" }}>
              Flexibilidade e tecnologia de ponta para impulsionar seu negócio
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-6 rounded-[5px]">
              <div className="w-12 h-12 bg-blue-500/10 rounded-[5px] flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl text-white font-semibold mb-2">
                Economia Inteligente
              </h3>
              <p className="text-gray-400">
                Sem grandes investimentos iniciais. Pague apenas pelo que usar,
                com custos previsíveis e dedutíveis.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-6 rounded-[5px]">
              <div className="w-12 h-12 bg-green-500/10 rounded-[5px] flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl text-white font-semibold mb-2">
                Sempre Atualizado
              </h3>
              <p className="text-gray-400">
                Mantenha seu parque tecnológico sempre atual com as últimas
                inovações do mercado.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-6 rounded-[5px]">
              <div className="w-12 h-12 bg-red-500/10 flex rounded-[5px] items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl text-white font-semibold mb-2">
                Suporte Completo
              </h3>
              <p className="text-gray-400">
                Manutenção preventiva e corretiva inclusa, com atendimento
                prioritário e equipe especializada.
              </p>
            </motion.div>
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
            Modernize sua infraestrutura sem compromisso
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: "Segoe UI Regular" }}>
            Converse com nossos especialistas e descubra a melhor solução para
            sua empresa
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center">
            <a
              href="/contato"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 font-semibold rounded-[5px] hover:bg-gray-100 transition-all shadow-lg">
              Solicitar Proposta
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RentingSection;
