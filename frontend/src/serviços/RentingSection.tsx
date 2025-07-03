/** @format */

// ===============================
// IMPORTS E TIPAGEM
// ===============================
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Tipagem para os serviços de renting
type RentingService = {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
};

// ===============================
// COMPONENTE PRINCIPAL
// ===============================
// Seção principal da página de Renting
const RentingSection: React.FC = () => {
  // Lista de serviços disponíveis para o carrossel
  const rentingServices: RentingService[] = [
    {
      id: "0",
      title: "Impressoras Profissionais",
      description:
        "Soluções completas em renting de impressoras coloridas e multifuncionais para empresas de todos os portes.",
      features: [
        "bizhub C3351i - Impressora multifuncional colorida",
        "bizhub C301i - Compacta e eficiente",
        "bizhub C251i - Ideal para pequenos escritórios",
        "Manutenção preventiva inclusa",
        "Suporte técnico 24/7",
        "Substituição imediata em caso de defeito",
      ],
      image: "/images/renting/pc2.jpg",
    },
    {
      id: "1",
      title: "Computadores Profissionais",
      description:
        "Aluguel de computadores de alto desempenho para escritórios e projetos específicos com configurações personalizadas.",
      features: [
        "Intel i7 de última geração",
        "16GB RAM DDR4",
        "SSD 512GB para máxima velocidade",
        "Windows 11 Pro licenciado",
        "Assistência técnica inclusa",
        "Upgrade de hardware quando necessário",
      ],
      image: "/images/renting/pc1.jpg",
    },
  ];

  // ===============================
  // RENDERIZAÇÃO DA PÁGINA
  // ===============================
  return (
    <div className="min-h-screen bg-white">
      {/* ===============================
          Banner principal
        =============================== */}
      <section
        className="w-full flex items-center justify-center overflow-hidden bg-white"
        style={{ height: "clamp(100px, 35vw, 400px)" }}>
        <img
          src="/images/renting/pc2.jpg"
          alt="Banner Renting"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 1 }}
        />
      </section>

      {/* Espaço entre o banner e o conteúdo */}
      <div className="h-10 md:h-16 lg:h-10" />

      {/* ===============================
          Seção institucional premium
        =============================== */}
      <section className="relative bg-gradient-to-b from-white via-blue-50 to-white py-20 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-red-600 mb-6">
            Soluções Integradas de <span className="text-black">Renting</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Flexibilidade, economia e tecnologia de ponta para sua empresa.
            Alugue impressoras e computadores profissionais com manutenção,
            suporte e atualização inclusos.
          </motion.p>
        </div>

        {/* Cards institucionais */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Card Impressoras */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 flex items-center gap-6">
            <img
              src="/images/renting/pc2.jpg"
              alt="Impressoras"
              className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
            />
            <div>
              <h5 className="text-lg font-semibold text-gray-800 mb-1">
                Impressoras Profissionais
              </h5>
              <p className="text-gray-600 text-sm">
                Renting de impressoras coloridas e multifuncionais com
                manutenção e suporte total.
              </p>
            </div>
          </motion.div>
          {/* Card Computadores */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-lg p-8 flex items-center gap-6">
            <img
              src="/images/renting/pc1.jpg"
              alt="Computadores"
              className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
            />
            <div>
              <h5 className="text-lg font-semibold text-gray-800 mb-1">
                Computadores Profissionais
              </h5>
              <p className="text-gray-600 text-sm">
                Aluguel de computadores de alto desempenho com assistência
                técnica e upgrades inclusos.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===============================
          Carrossel de Serviços
        =============================== */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 tracking-tight">
              Nossos <span className="text-red-600">Serviços</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg md:text-2xl text-gray-600 max-w-2xl mx-auto">
              Soluções inovadoras, confiáveis e sob medida para elevar a
              infraestrutura da sua empresa ao próximo nível.
            </motion.p>
          </div>

          {/* Carrossel de cards de serviços */}
          <RentingCarousel services={rentingServices} />
        </div>
      </section>

      {/* ===============================
          Vantagens do Renting
        =============================== */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Por que escolher Renting?
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Descubra as vantagens de ter equipamentos profissionais sem o
              investimento inicial
            </p>
          </div>

          {/* Lista de vantagens em cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Sem Investimento Inicial",
                description:
                  "Tenha acesso aos melhores equipamentos sem desembolso inicial",
                icon: "💰",
              },
              {
                title: "Manutenção Inclusa",
                description:
                  "Manutenção preventiva e corretiva incluída no contrato",
                icon: "🔧",
              },
              {
                title: "Suporte 24/7",
                description:
                  "Assistência técnica disponível sempre que precisar",
                icon: "📞",
              },
              {
                title: "Equipamentos Atualizados",
                description: "Sempre com a tecnologia mais recente do mercado",
                icon: "⚡",
              },
              {
                title: "Flexibilidade",
                description:
                  "Contratos flexíveis que se adaptam às suas necessidades",
                icon: "🔄",
              },
              {
                title: "Economia Garantida",
                description:
                  "Reduza custos operacionais e tenha previsibilidade financeira",
                icon: "📊",
              },
            ].map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{advantage.icon}</div>
                <h3 className="text-xl font-bold text-black mb-3">
                  {advantage.title}
                </h3>
                <p className="text-gray-700">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================
          CTA Final
        =============================== */}
      <section className="py-20 bg-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Entre em contato conosco e descubra como o renting pode transformar
            sua empresa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pages/contato"
              className="inline-flex items-center justify-center bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-100 hover:text-red-700 transition-colors border-2 border-white">
              <Mail className="w-5 h-5 mr-2" />
              Solicitar Contato
            </Link>
            <a
              href="tel:+244947137676"
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-700 transition-colors">
              <Phone className="w-5 h-5 mr-2" />
              Ligar Agora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RentingSection;

// Tipagem para o carrossel
// (Removido tipo duplicado RentingService)

const RentingCarousel: React.FC<{ services: RentingService[] }> = ({
  services,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToCard = (idx: number) => {
    let newIdx = idx;
    if (newIdx < 0) newIdx = services.length - 1;
    if (newIdx >= services.length) newIdx = 0;
    setActiveIdx(newIdx);
    const carousel = carouselRef.current;
    if (carousel) {
      const card = carousel.children[newIdx] as HTMLElement;
      if (card)
        card.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
    }
  };

  const activeService = services[activeIdx];

  return (
    <>
      <div className="relative mb-16">
        {/* Setas de navegação */}
        <button
          onClick={() => scrollToCard(activeIdx - 1)}
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
          {services.map((service, idx) => (
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
          onClick={() => scrollToCard(activeIdx + 1)}
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
    </>
  );
};

// Card individual do carrossel
const ServiceCard: React.FC<{
  service: RentingService;
  active: boolean;
  onClick: () => void;
}> = ({ service, active, onClick }) => (
  <div
    className={`bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center border-2 ${
      active ? "border-red-500" : "border-transparent"
    } cursor-pointer transition-all`}
    onClick={onClick}>
    <img
      src={service.image}
      alt={service.title}
      className="w-32 h-32 object-cover rounded-xl mb-4"
    />
    <h4 className="text-lg font-bold text-gray-900 mb-2 text-center">
      {service.title}
    </h4>
    <p className="text-gray-600 text-sm text-center line-clamp-3">
      {service.description}
    </p>
  </div>
);

// Destaque detalhado do serviço selecionado (modelo premium consultoria TI)
const ServiceHighlight: React.FC<{ service: RentingService }> = ({
  service,
}) => (
  <div className="bg-white rounded-2xl shadow-xl p-0 flex flex-col md:flex-row overflow-hidden border border-blue-100 max-w-5xl mx-auto">
    {/* Imagem à esquerda - maior */}
    <div className="md:w-[48%] w-full flex items-end justify-start bg-gradient-to-br from-blue-50 to-white p-0 relative min-h-[340px] md:min-h-[420px]">
      <div className="absolute left-0 bottom-0 w-full h-full rounded-2xl overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover rounded-2xl"
          style={{ objectPosition: "left center" }}
        />
      </div>
      {/* Selo e título sobrepostos na imagem, igual ao exemplo */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col items-start">
        <span className="inline-flex items-center text-xs font-semibold text-white bg-yellow-500/90 rounded px-2 py-1 mb-2 shadow">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 17l-5 3 1.9-5.6L4 9.5l5.7-.5L12 4l2.3 5 5.7.5-4.9 4.9L17 20z"
            />
          </svg>
          Solução Certificada
        </span>
        <span className="text-xl md:text-2xl font-bold text-white drop-shadow mt-1">
          {service.title}
        </span>
      </div>
    </div>
    {/* Conteúdo à direita - menor */}
    <div className="md:w-[52%] w-full flex flex-col gap-5 p-6 md:p-10">
      {/* Selo */}
      <div className="flex items-center gap-2 mb-1">
        <span className="inline-flex items-center text-xs font-semibold text-blue-700">
          <svg
            className="w-5 h-5 text-yellow-500 mr-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 17l-5 3 1.9-5.6L4 9.5l5.7-.5L12 4l2.3 5 5.7.5-4.9 4.9L17 20z"
            />
          </svg>
          Solução Certificada
        </span>
      </div>
      {/* Título */}
      <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
        {service.title}
      </h3>
      {/* Benefícios */}
      <div>
        <h4 className="text-lg font-bold text-gray-800 mb-2">
          Principais Benefícios
        </h4>
        <ul className="space-y-1">
          {service.features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="flex items-center text-gray-700 text-base">
              <span className="inline-block w-2 h-2 bg-red-400 rounded-full mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      {/* Tecnologias Incluídas */}
      <div>
        <h4 className="text-lg font-bold text-gray-800 mb-2 mt-4">
          Tecnologias Incluídas
        </h4>
        <div className="grid grid-cols-2 gap-4 items-stretch">
          <div className="flex items-center gap-2 bg-white border rounded-lg px-4 py-2 shadow-sm min-w-0 h-full">
            <span className="inline-block w-5 h-5 text-red-500 flex-shrink-0">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 18v-1a4 4 0 00-8 0v1"
                />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Nuvem e DevOps
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white border rounded-lg px-4 py-2 shadow-sm min-w-0 h-full">
            <span className="inline-block w-5 h-5 text-red-500 flex-shrink-0">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm-6 8v-1a4 4 0 018 0v1"
                />
              </svg>
            </span>
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Segurança
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white border rounded-lg px-4 py-2 shadow-sm min-w-0 h-full">
            <span className="inline-block w-5 h-7 text-red-500 flex-shrink-0">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 17v-2a4 4 0 014-4h10a4 4 0 014 4v2"
                />
              </svg>
            </span>
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Infraestrutura
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white border rounded-lg px-4 py-2 shadow-sm min-w-0 h-full">
            <span className="inline-block w-5 h-5 text-red-500 flex-shrink-0">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 8a6 6 0 00-12 0v4a6 6 0 0012 0V8z"
                />
              </svg>
            </span>
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Suporte 24/7
            </span>
          </div>
        </div>
      </div>
      {/* Depoimento */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-4">
        <div className="flex items-start gap-2 mb-1">
          <span className="text-blue-400 text-2xl font-bold">“</span>
          <span className="text-gray-700 italic text-base">
            A solução de renting da Envisio elevou nossa produtividade e
            eliminou preocupações com manutenção e atualização de equipamentos.
          </span>
        </div>
        <span className="block text-sm text-gray-500 mt-1 ml-6">
          — Paulo Silva, CEO - TechAngola
        </span>
      </div>
      {/* CTA */}
      <div className="flex justify-end mt-4">
        <Link
          to="/pages/contato"
          className="inline-flex items-center px-7 py-3 bg-red-600 text-white rounded-lg font-semibold shadow hover:bg-red-700 transition-colors">
          Solicitar Orçamento
        </Link>
      </div>
    </div>
  </div>
);
