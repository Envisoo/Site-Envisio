/** @format */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  ChevronRight,
  ChevronLeft,
  BadgeCheck,
  Clock,
  Headphones,
  Shield,
  HardDrive,
  Settings,
  Video,
  Key,
} from "lucide-react";

// Dados dos serviços de hardware
const hardwareServices = [
  {
    id: 1,
    title: "Redes Estruturadas (Cisco)",
    description:
      "Projetamos e implementamos redes robustas, seguras e escaláveis para empresas de todos os portes, utilizando equipamentos Cisco de última geração com garantia de desempenho e segurança.",
    icon: <Server className="w-8 h-8 text-blue-600" />,
    items: [
      "🔒 Segurança contra ataques e acessos não autorizados",
      "⚡ Desempenho com maior velocidade e menos falhas",
      "📈 Escalabilidade com fácil expansão da rede",
      "🛠 Gestão centralizada com monitorização simples e eficaz",
      "💡 Fiabilidade com infraestrutura estável e disponível",
    ],
    image: "/images/imagem hard/Rede.webp",
  },
  {
    id: 2,
    title: "Videovigilância (CCTV Inteligente)",
    description:
      "Soluções completas de segurança eletrónica com câmaras de alta definição, gravação em nuvem e análise de vídeo inteligente para proteção 24/7.",
    icon: <Video className="w-8 h-8 text-purple-600" />,
    items: [
      "👁️ Monitorização 24/7",
      "🤖 Análise inteligente de imagens",
      "📱 Acesso remoto em tempo real",
      "🔒 Maior segurança e prevenção",
    ],
    image: "/images/imagem hard/VideoV.webp",
  },
  {
    id: 3,
    title: "Sistemas de Acesso Inteligente",
    description:
      "Soluções avançadas de controlo de acessos para gestão segura e eficiente de entradas e saídas na sua empresa.",
    icon: <Key className="w-8 h-8 text-blue-600" />,
    items: [
      "🚪 Controlo de entradas e saídas",
      "🧾 Registo detalhado de acessos",
      "📲 Integração com cartões/aplicação móvel",
      "🔒 Maior segurança e comodidade",
    ],
    image: "/images/imagem hard/SistemaInt.webp",
  },
  {
    id: 4,
    title: "Serviços de Manutenção e Apoio Técnico",
    description:
      "Manutenção preventiva e corretiva para garantir o funcionamento contínuo e estável dos seus sistemas de TI.",
    icon: <Settings className="w-8 h-8 text-green-600" />,
    items: [
      "⚡ Resposta rápida a incidentes",
      "🔧 Manutenção preventiva e corretiva",
      "📊 Monitorização contínua",
      "✅ Garantia de operação estável",
    ],
    image: "/images/imagem hard/Suporte.webp",
  },
];

type Service = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactElement;
  items: string[];
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
      whileHover={{ scale: 1.03 }}
      className={`cursor-pointer rounded-[5px] p-6 border-2 transition-all flex flex-col justify-between h-full min-h-[320px] ${
        active
          ? "border-red-500 bg-white shadow-2xl"
          : "border-transparent bg-white/50 shadow-lg"
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
    <div className="grid lg:grid-cols-2 gap-4 lg:gap-8">
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-full">
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-4 sm:mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            Principais Benefícios
          </h4>
          <ul className="space-y-2 sm:space-y-3">
            {service.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 sm:gap-3">
                <div className="mt-1 w-5 h-5 rounded-[5px] bg-red-100 flex items-center justify-center flex-shrink-0">
                  <ChevronRight className="w-3 h-3 text-red-600" />
                </div>
                <span className="text-sm sm:text-base text-gray-700">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </motion.div>
);

const ServicosHardware = () => {
  const [activeService, setActiveService] = useState(hardwareServices[0]);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Verificar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Função para navegação do carrossel (circular)
  const scrollToCard = (index: number) => {
    let newIndex = index;
    if (index < 0) newIndex = hardwareServices.length - 1;
    if (index >= hardwareServices.length) newIndex = 0;

    setActiveService(hardwareServices[newIndex]);

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
  };

  // Auto-rotate carrossel apenas em desktop
  useEffect(() => {
    if (isMobile) return;

    const timer = setInterval(() => {
      const currentIndex = hardwareServices.findIndex(
        (s) => s.id === activeService.id
      );
      scrollToCard(currentIndex + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeService.id, isMobile]);

  return (
    <div className="bg-white">
      {/* Banner com texto sobreposto */}
      <section
        className="relative w-full flex items-center justify-start overflow-hidden bg-white"
        style={{ height: "clamp(100px, 60vw, 500px)" }}>
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="text-white pl-8 md:pl-16 lg:pl-24 w-full max-w-7xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[23px] sm:text-3xl md:text-5xl lg:text-5xl font-bold mb-4 md:mb-6"
              style={{
                fontFamily: "Segoe UI semibold",
              }}>
              <span className="text-white">Hardware</span>
            </motion.h1>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          {/* Imagem para mobile */}
          <img
            src="/images/Imagem hard/banner2.webp"
            alt="Banner Mobile Serviços de Hardware"
          />
        </div>
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
            Soluções Integradas de <span className="text-black">Hardware</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: "Segoe UI Regular" }}>
            Segurança, conectividade e controlo inteligente para empresas
            modernas. Da infraestrutura de redes Cisco à videovigilância
            inteligente e controlo de acessos biométrico, fornecemos tecnologia
            de ponta para a sua organização operar com máxima eficiência e
            tranquilidade.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-white rounded-[5px] shadow-lg p-8 flex items-center gap-6">
            <HardDrive className="w-10 h-10 text-orange-500 flex-shrink-0" />
            <div>
              <h5 className="text-lg font-semibold text-gray-800 mb-1">
                Reparação & Manutenção
              </h5>
              <p
                className="text-gray-600 text-sm"
                style={{ fontFamily: "Segoe UI Regular" }}>
                Diagnóstico e reparação de fontes, motherboards, discos rígidos
                e componentes críticos, com garantia e peças originais.
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
                Consultoria Técnica Especializada
              </h5>
              <p
                className="text-gray-600 text-sm"
                style={{ fontFamily: "Segoe UI Regular" }}>
                Orientação na escolha de equipamentos, projetos personalizados e
                apoio à expansão tecnológica do seu negócio.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seção de Serviços em Destaque - Carrossel */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4 sm:mb-5 tracking-tight"
              style={{ fontFamily: "Segoe UI semibold" }}>
              Os Nossos <span className="text-red-600">Serviços</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto"
              style={{ fontFamily: "Segoe UI Regular" }}>
              Soluções inovadoras, fiáveis e à medida para elevar a
              infraestrutura da sua empresa ao próximo nível.
            </motion.p>
          </div>

          {/* Carrossel de cards */}
          <div className="relative mb-12 sm:mb-16 lg:mb-20">
            {/* Setas de navegação */}
            <button
              onClick={() => {
                const currentIndex = hardwareServices.findIndex(
                  (s) => s.id === activeService.id
                );
                scrollToCard(currentIndex - 1);
              }}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-blue-50 shadow-xl rounded-[5px] p-2 sm:p-3 border border-gray-200 transition-all"
              aria-label="Anterior">
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
            </button>

            <div
              ref={carouselRef}
              className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto no-scrollbar py-4 px-2 sm:px-4 lg:px-12 snap-x snap-mandatory scroll-smooth"
              style={{
                scrollBehavior: "smooth",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
              }}>
              {hardwareServices.map((service, idx) => (
                <div
                  key={service.id}
                  className={`snap-center flex-shrink-0 w-[85%] sm:w-[45%] md:w-[40%] lg:w-[30%] xl:w-[25%] transition-all duration-200 ${
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
              onClick={() => {
                const currentIndex = hardwareServices.findIndex(
                  (s) => s.id === activeService.id
                );
                scrollToCard(currentIndex + 1);
              }}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-blue-50 shadow-xl rounded-[5px] p-2 sm:p-3 border border-gray-200 transition-all"
              aria-label="Próximo">
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
            </button>

            {/* Indicadores para mobile */}
            <div className="flex justify-center gap-2 mt-4 sm:hidden">
              {hardwareServices.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => scrollToCard(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeService.id === service.id
                      ? "bg-red-600 w-6"
                      : "bg-gray-300 w-2"
                  }`}
                  aria-label={`Ir para o serviço ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Destaque do serviço selecionado */}
          <div className="px-2 sm:px-0">
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
              className="text-3xl md:text-4xl text-red-400 font-bold mb-4"
              style={{ fontFamily: "Segoe UI semibold" }}>
              Por que escolher nossos{" "}
              <span className="text-red-400">serviços de hardware</span>?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              style={{ fontFamily: "Segoe UI Regular" }}>
              Excelência técnica combinada com suporte especializado para sua
              tranquilidade.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8 text-red-400" />,
                title: "Segurança Garantida",
                description:
                  "Todos os equipamentos possuem certificações internacionais de segurança e privacidade de dados.",
              },
              {
                icon: <Clock className="w-8 h-8 text-red-400" />,
                title: "Disponibilidade",
                description:
                  "Monitoramento contínuo e suporte técnico especializado a qualquer hora.",
              },
              {
                icon: <BadgeCheck className="w-8 h-8 text-red-400" />,
                title: "Garantia Estendida",
                description:
                  "Todos os equipamentos possuem garantia de 3 anos e manutenção preventiva inclusa.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-[5px] p-8 hover:bg-gray-700 transition-all">
                <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3
                  className="text-xl text-white font-bold mb-3"
                  style={{ fontFamily: "Segoe UI semibold" }}>
                  {item.title}
                </h3>
                <p
                  className="text-gray-300"
                  style={{ fontFamily: "Segoe UI Regular" }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
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
            Pronto para transformar sua infraestrutura física?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: "Segoe UI Regular" }}>
            Nossos especialistas estão prontos para projetar a solução perfeita
            para suas necessidades.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contato"
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-[5px] shadow-lg transition-all inline-flex items-center justify-center"
              style={{ fontFamily: "Segoe UI semibold" }}>
              Agendar Consultoria
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicosHardware;
