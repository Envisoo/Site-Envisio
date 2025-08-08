/** @format */

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import {
  Printer,
  Shield,
  Zap,
  Settings,
  Calculator,
  Quote,
  Check,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  RefreshCw,
  FileText,
  Image,
  MonitorSmartphone,
  Smartphone,
  Headphones,
} from "lucide-react";
import RentingFeaturesPanel from "../components/RentingFeaturesPanel";

// Dados dos serviços de renting
const rentingServices = [
  {
    id: 1,
    title: "Computadores",
    slug: "computadores",
    description:
      "Desktops de alta performance para escritório com configurações otimizadas e suporte completo.",
    icon: <MonitorSmartphone className="w-8 h-8 text-red-600" />,
    items: [
      "Processadores Intel Core i5/i7 última geração",
      "16GB/32GB RAM DDR4",
      "SSD NVMe de alta velocidade",
      "Monitor Full HD/4K",
      "Windows 11 Pro licenciado",
    ],
    features: [
      { icon: <Zap />, text: "Alto Desempenho" },
      { icon: <Shield />, text: "Segurança Pro" },
      { icon: <Settings />, text: "Suporte Técnico" },
      { icon: <RefreshCw />, text: "Atualização Garantida" },
    ],
    image: "/images/pc1.webp",
    testimonial: {
      text: "Os computadores alugados mantêm nossa equipe sempre produtiva, com equipamentos atualizados e suporte rápido.",
      author: "Paulo Silva - Gerente de TI",
    },
  },
  {
    id: 2,
    title: "bizhub 301i",
    slug: "impressoras",
    description:
      "Multifuncional monocromática ideal para grupos de trabalho médios com necessidade de alta produtividade.",
    icon: <Printer className="w-8 h-8 text-gray-600" />,
    items: [
      "Velocidade A4: 22 ppm em preto e branco",
      "Formatos de papel: A6-A3",
      "Painel touch intuitivo de 7 polegadas",
      "Digitalização em alta velocidade",
      "Excelente qualidade de impressão",
    ],
    features: [
      { icon: <Zap />, text: "22 PPM" },
      { icon: <FileText />, text: "A3" },
      { icon: <MonitorSmartphone />, text: "Scanner Duplex" },
      { icon: <MonitorSmartphone />, text: "Touch 7'" },
    ],
    image: "/images/bizhub.webp",
    testimonial: {
      text: "A Bizhub 227 atende perfeitamente nossas necessidades de impressão em preto e branco com qualidade profissional.",
      author: "Maria Santos - Coordenadora Administrativa",
    },
  },

  {
    id: 5,
    title: "Bizhub 758",
    slug: "impressoras",
    description:
      "Multifuncional monocromática de produção para altos volumes de impressão.",
    icon: <Printer className="w-8 h-8 text-purple-600" />,
    items: [
      "Velocidade A4: 75 ppm em P&B",
      "Formatos de papel: A6-SRA3",
      "Painel touch de 10.1 polegadas",
      "Scanner dual-scan de alta velocidade",
      "Múltiplas opções de acabamento",
    ],
    features: [
      { icon: <Zap />, text: "75 PPM" },
      { icon: <FileText />, text: "SRA3" },
      { icon: <MonitorSmartphone />, text: "Dual Scan" },
      { icon: <Settings />, text: "Acabamento Pro" },
    ],
    image: "/images/bizhub-758.jpg",
    testimonial: {
      text: "A Bizhub 758 transformou nossa capacidade de produção com sua incrível velocidade e confiabilidade.",
      author: "Roberto Souza - Diretor de Operações",
    },
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
  testimonial: {
    text: string;
    author: string;
  };
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
        <div className="p-3 rounded-full bg-gradient-to-br from-blue-50 to-white shadow">
          {service.icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
      </div>
      <p className="text-gray-600 mb-4">
        {service.description.substring(0, 100)}...
      </p>
      <div className="flex justify-between items-center mb-4">
        <div className="flex -space-x-2">
          {service.features.slice(0, 3).map((feature, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full bg-white border-2 border-white flex items-center justify-center shadow">
              {React.cloneElement(feature.icon as React.ReactElement<any>, {
                className: "w-4 h-4 text-blue-600",
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
              <span className="text-sm font-semibold">Serviço Premium</span>
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
            {service.items.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            Diferenciais
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {service.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/80 p-2 rounded-lg shadow-sm">
                {React.cloneElement(feature.icon as React.ReactElement<any>, {
                  className: "w-5 h-5 text-blue-500",
                })}
                <span className="text-gray-700 text-sm">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-start gap-3">
            <Quote className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-600 italic mb-2">
                {service.testimonial.text}
              </p>
              <p className="text-sm text-gray-500 font-medium">
                {service.testimonial.author}
              </p>
            </div>
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
      {/* Banner estático apenas imagem */}
      <section
        className="w-full flex items-center justify-center overflow-hidden bg-white"
        style={{ height: "clamp(100px, 35vw, 700px)" }}>
        <img
          src="/images/renting.jpg"
          alt="Banner Serviços de Renting"
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
            className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 flex items-center gap-6">
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
            className="bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-lg p-8 flex items-center gap-6">
            <Headphones className="w-10 h-10 text-red-600 flex-shrink-0" />
            <div>
              <h4 className="text-xl font-semibold mb-2">
                Suporte Especializado
              </h4>
              <p className="text-gray-600">
                Equipe técnica dedicada e pronta para atender suas necessidades
                24/7
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
                fontFamily: "Segoe UI Regular",
              }}>
              {rentingServices.map((service) => (
                <div
                  key={service.id}
                  className="min-w-[300px] sm:min-w-[350px] snap-start">
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
              <RentingFeaturesPanel slug={activeService.slug} />
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
              className="text-3xl md:text-4xl font-bold mb-4"
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
              className="bg-gray-800 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
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
              className="bg-gray-800 p-6 rounded-xl">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sempre Atualizado</h3>
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
              className="bg-gray-800 p-6 rounded-xl">
              <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Suporte Completo</h3>
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
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/pages/contato"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-all">
              Solicitar Proposta
            </a>
            <a
              href="/pages/sobre"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all">
              Conhecer Mais
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RentingSection;
