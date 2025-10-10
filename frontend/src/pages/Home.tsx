/** @format */

// Importações de bibliotecas e hooks
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { partners } from "../types/partners";
import { DesktopCarousel, MobileCarousel } from "../components/Carousel";
import { useWindowSize } from "../hooks/useWindowSize";
import { HomeMobile } from "./mobile/HomeMobile"; // Certifique-se que o caminho está correto

// ======================
// TIPOS E INTERFACES
// ======================
// Tipos para os segmentos de negócio e depoimentos
// Usados apenas no carrossel de depoimentos

type SegmentKey = "contabilidade" | "tecnicos" | "academia";

interface Segment {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  icon: string;
  testimonial: {
    text: string;
    author: string;
    role: string;
  };
}

// ======================
// SLIDES DO HERO (carrossel principal do topo)
// ======================
const heroSlides = [
  {
    src: "/images/imagem home/banner_hero1.webp",
    srcMobile: "/images/mobile/banner_mobile0.webp", // Adicione a versão mobile
    link: "/servicos/software",
    label: "Consultoria",
  },
  {
    src: "/images/imagem home/cabeamento.webp",
    srcMobile: "/images/mobile/banner_mobile2.webp", // Adicione a versão mobile
    link: "/servicos/hardware",
    label: "Serviços Técnicos",
  },
  {
    src: "/images/imagem home/renting.webp",
    srcMobile: "/images/mobile/renting_mobile.webp", // Adicione a versão mobile
    link: "/servicos/renting",
    label: "Serviços Técnicos",
  },
];
// ======================
// SEGMENTOS DE NEGÓCIO (usado no carrossel de depoimentos)
// ======================
const businessSegments: Record<SegmentKey, Segment> = {
  contabilidade: {
    title: "Excelência em Contabilidade",
    subtitle: "Transformando números em estratégias",
    description:
      "Soluções contábeis inovadoras para impulsionar seu negócio ao próximo nível",
    features: [
      "Consultoria Fiscal Especializada",
      "Planejamento Tributário Estratégico",
      "Gestão Financeira Integrada",
      "Compliance e Governança",
    ],
    image: "/images/contabilidade-bg.jpg",
    icon: "📊",
    testimonial: {
      text: "Trabalhamos há anos com a Envisio e nunca tivemos reclamações. Serviço dinâmico, responsável e de total confiança.",
      role: " ReiBoque",
      author: "",
    },
  },
  tecnicos: {
    title: "Serviços Técnicos Especializados",
    subtitle: "Tecnologia e inovação ao seu alcance",
    description:
      "Suporte técnico avançado e soluções personalizadas para sua empresa",
    features: [
      "Infraestrutura de TI",
      "Segurança Digital",
      "Automação de Processos",
      "Consultoria Tecnológica",
    ],
    image: "/images/tecnicos-bg.jpg",
    icon: "🔧",
    testimonial: {
      text: "A Envisio demonstra comprometimento, responsabilidade e total disponibilidade. Sempre disposta a resolver problemas com seriedade e sem desistir.",
      author: "",
      role: "Global Corp",
    },
  },
  academia: {
    title: "Academia de Formação Profissional",
    subtitle: "Capacitação que transforma carreiras",
    description: "Cursos e programas de formação com certificação reconhecida",
    features: [
      "Cursos Corporativos",
      "Certificações Internacionais",
      "Mentoria Especializada",
      "Workshops Avançados",
    ],
    image: "/images/academia-bg.jpg",
    icon: "🎓",
    testimonial: {
      text: "Os cursos abriram portas para oportunidades internacionais",
      author: "",
      role: "Multinacional",
    },
  },
};

// ======================
// COMPONENTE PRINCIPAL DA HOME
// ======================

// Serviços oferecidos (mock para exibição na seção de serviços)
const services = [
  {
    title: "Renting de Equipamentos",
    description:
      "Renting de impressoras multifuncionais, computadores e servidores para empresas.",
    tipo: "aluguel",
    image: "/images/imagem cads/Destaque3.webp",
  },
  {
    title: "Sistemas de Segurança",
    description:
      "Implementação de políticas de segurança, proteção contra ameaças digitais, soluções de backup e monitoramento de acessos.",
    tipo: "hardware",
    image: "/images/imagem cads/Destaque4.webp",
  },
  {
    title: "Desenvolvimento Web",
    description: "Criação de sites, sistemas web e aplicativos sob demanda.",
    tipo: "software",
    image: "/images/imagem cads/Destaque5.webp",
  },
  {
    title: "Consultoria em TI",
    description: "Planejamento, diagnóstico e transformação digital.",
    tipo: "software",
    image: "/images/imagem cads/Destaque6.webp",
  },
  {
    title: "Consultoria Digital",
    description: "Soluções digitais para automação e crescimento.",
    tipo: "software",
    image: "/images/imagem cads/Destaque7.webp",
  },
];

export function HeroSection() {
  // Navegação do React Router
  const navigate = useNavigate();

  // Estado do carrossel de slides do topo
  const [, setCarouselIndex] = useState(0);
  const [isPaused] = useState(false);

  // Estado do carrossel de depoimentos
  const [currentSlide, setCurrentSlide] = useState(0);

  // Efeito para alternar slides do topo automaticamente
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Carrossel de logos dos parceiros (automático)
  const carouselRef = useRef<HTMLDivElement>(null);
  const logosToShow = 5; // Quantas logos aparecem ao mesmo tempo
  const logoWidth = 180; // Largura máxima de cada logo (px)
  const gap = 64; // gap-16 em px

  useEffect(() => {
    const interval = setInterval(() => {
      if (!carouselRef.current) return;
      const totalWidth = partners.length * (logoWidth + gap) - gap;
      const visibleWidth = logosToShow * (logoWidth + gap) - gap;
      const maxScroll = totalWidth - visibleWidth;
      if (carouselRef.current.scrollLeft >= maxScroll - 10) {
        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carouselRef.current.scrollBy({
          left: logoWidth + gap,
          behavior: "smooth",
        });
      }
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // ======================
  // RENDERIZAÇÃO DA HOME
  // ======================
  return (
    <div className="min-h-screen pb-10 bg-white pt-16">
      {/* Carrossel Desktop */}
      <div className="hidden md:block">
        <DesktopCarousel slides={heroSlides} />
      </div>

      {/* Carrossel Mobile */}

      <MobileCarousel slides={heroSlides} />

      {/* Nossa História Redesenhada */}
      <section className="py-20 bg-white  relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 to-transparent" />

        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto">
            {/* Cabeçalho da Seção */}
            <div className="text-center mb-20">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 2 }}
                style={{
                  fontFamily: "Segoe UI Regular",
                }}
                className="text-sm uppercase tracking-wider text-gray-900 mb-4 block"></motion.span>
              <h2
                style={{ fontFamily: "Segoe UI Semibold" }}
                className="text-5xl mb-6">
                Transformando negócios desde 2018
              </h2>
              <div className="w-24 h-1 bg-black mx-auto" />
            </div>

            {/* Grid Principal */}
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Coluna da Esquerda - Texto e Destaques */}
              <div className="lg:col-span-5 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="space-y-6">
                  <h3
                    style={{ fontFamily: "Segoe UI Semibold" }}
                    className="text-3xl font-bold">
                    Quem Somos
                  </h3>
                  <p
                    style={{
                      fontFamily: "Segoe UI Regular",
                      fontSize: "16px",
                      marginTop: "20px", // ou "24px" se preferir maior
                    }}
                    className="text-gray-600 leading-relaxed">
                    A ENVISIO, é uma empresa de direito Angolano, orientada para
                    os problemas e soluções locais, que atua no mercado da
                    Consultoria e provedor de serviços e soluções de tecnologia
                    de informações apostando numa prestação de serviço eficaz e
                    de qualidade desde 2018.
                  </p>

                  {/* Números Importantes */}
                  <div className="grid grid-cols-2 gap-6 py-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">+ 2.500</div>
                      <div className="text-gray-500">Clientes Atendidos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">+ 5</div>
                      <div className="text-gray-500">anos no mercado</div>
                    </div>
                  </div>

                  {/* Marco Históricos */}
                  <div className="space-y-4 mb-12">
                    {" "}
                    {/* Adicionado mb-12 para espaçamento */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-red bg-red-600 text-white flex items-center justify-center shrink-0">
                        2018
                      </div>
                      <div>
                        <h4
                          className="font-semibold mb-1 mt-3"
                          style={{ fontFamily: "Segoe UI Semibold" }}>
                          Fundação da Empresa
                        </h4>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/quem-somos")}
                    className="mt-8 w-full bg-red-600 text-white py-4 px-8 rounded-[5px] flex items-center justify-center group hover:bg-red-700 transition-all"
                    style={{
                      fontFamily: "Segoe UI Regular",
                    }}>
                    Conheça Nossa História Completa
                    <motion.span className="ml-2 group-hover:translate-x-1 transition-transform">
                      →
                    </motion.span>
                  </motion.button>
                </motion.div>
              </div>

              {/* Coluna da Direita - Imagem e Destaques */}
              <div className="lg:col-span-7 relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="relative z-10">
                  <div className="relative rounded-[8px] overflow-hidden shadow-2xl">
                    <img
                      src="/images/imagem home/banner_quem.webp"
                      alt="Nossa Equipe"
                      className="w-full h-[600px] object-cover"
                    />
                    <div className="absolute inset-0" />
                  </div>
                </motion.div>
                {/* Elemento decorativo */}
                <div className="absolute -right-4 -bottom-4 w-full h-full border-2 border-black rounded-2xl -z-10" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seção de Serviços Redesenhada */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-15 px-4 bg-white mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-20">
          <h2
            className="text-4xl font-bold text-black mt-4 mb-6"
            style={{ fontFamily: "Segoe UI Semibold" }}>
            Nossos Serviços Especializados
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-8" />
          <p className="text-xl text-black max-w-3xl mx-auto">
            Transformamos desafios em oportunidades com soluções tecnológicas
            integradas e consultoria especializada para impulsionar o
            crescimento do seu negócio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-[5px] shadow-lg overflow-hidden border border-gray-300 w-[390px] h-[450px] mx-auto flex flex-col bg-white">
              {/* Imagem no topo */}
              <div className="w-full h-60 bg-gray-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Conteúdo */}
              <div className="p-6 flex flex-col flex-1 relative text-gray-800">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-base opacity-90 mb-14">
                  {service.description}
                </p>

                {/* Botão maior no canto inferior direito */}
                <button
                  className="absolute bottom-6 right-6 bg-red-600 hover:bg-red-700 transition text-white font-semibold px-6 py-2 rounded-[5px] text-sm"
                  onClick={() => {
                    if (service.tipo === "software") {
                      navigate("/servicos/software");
                    } else if (service.tipo === "hardware") {
                      navigate("/servicos/hardware");
                    } else if (service.tipo === "aluguel") {
                      navigate("/servicos/renting");
                    }
                  }}>
                  Saiba mais
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Academia Profissional - Versão Clara e Elegante */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Background com padrão sutil */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#00000005_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-50/50 via-transparent to-gray-50/50" />
        </div>

        <div className="container mx-auto px-6 relative">
          {/* Cabeçalho */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20">
            <span
              className="text-sm uppercase tracking-wider text-red-600  mb-4 block"
              style={{ fontFamily: "Segoe UI Regular" }}>
              Formação Profissional de Elite
            </span>
            <h2
              className="text-5xl text-gray-900 mb-6"
              style={{ fontFamily: "Segoe UI semibold" }}>
              Desenvolva Seu Potencial
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-8" />
            <p
              className="text-xl text-gray-600"
              style={{ fontFamily: "Segoe UI Regular" }}>
              Programas exclusivos desenvolvidos por especialistas para
              impulsionar sua carreira ao próximo nível
            </p>
          </motion.div>

          {/* Grid de Cursos */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Certificação Profissional",
                subtitle: "Certificação Internacional",
                icon: "🎓",
                features: [
                  "Certificado Reconhecido",
                  "Professores Especializados",
                  "Material Exclusivo",
                ],
              },
              {
                title: "Mentoria Executiva",
                subtitle: "Mentoria Personalizada",
                icon: "💡",
                features: [
                  "Mentoria Individual",
                  "Projetos Práticos",
                  "Networking Estratégico",
                ],
              },
              {
                title: "Programa Avançado",
                subtitle: "Carreira Acelerada",
                icon: "🚀",
                features: [
                  "Vagas Garantidas",
                  "Suporte Contínuo",
                  "Cases Reais",
                ],
              },
            ].map((curso, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group relative h-full"
                style={{ fontFamily: "Segoe UI Regular" }}>
                <div className="bg-white rounded-[5px] p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                  {/* Ícone e Título */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-3xl">{curso.icon}</span>
                    </div>
                    <div>
                      <h3
                        className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors"
                        style={{ fontFamily: "Segoe UI semibold" }}>
                        {curso.title}
                      </h3>
                      <p
                        className="text-gray-600"
                        style={{ fontFamily: "Segoe UI Regular" }}>
                        {curso.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {curso.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
                          <span className="text-red-600 text-sm">✓</span>
                        </div>
                        <span
                          className="text-gray-700"
                          style={{ fontFamily: "Segoe UI Regular" }}>
                          {feature}
                        </span>
                      </div>
                    ))}

                    {/* Adicionado ícone de informação */}
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                        <span className="text-blue-600 text-sm">ℹ️</span>
                      </div>
                      <span
                        className="text-gray-700"
                        style={{ fontFamily: "Segoe UI Regular" }}>
                        {curso.title === "Certificação Profissional"
                          ? "Inclui acesso a plataforma online"
                          : curso.title === "Mentoria Executiva"
                          ? "Networking com profissionais da indústria"
                          : "Apoio na construção de portfólio"}
                      </span>
                    </div>
                  </div>

                  {/* Preço e Duração */}
                  <div className="flex items-center justify-between py-4 border-t border-gray-100"></div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/academia")}
                    className="mt-auto w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-[5px] flex items-center justify-center group hover:from-red-700 hover:to-red-800 transition-all"
                    style={{ fontFamily: "Segoe UI Regular" }}>
                    Visita-nos
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção 7: Depoimentos */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-black/50" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Cabeçalho */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20">
            <span
              className="text-sm uppercase tracking-wider text-red-400 mb-4 block"
              style={{ fontFamily: "Segoe UI regular" }}>
              Depoimentos
            </span>
            <h2
              className="text-5xl text-white mb-6"
              style={{ fontFamily: "Segoe UI semibold" }}>
              O Que Nossos Clientes Dizem
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-8" />
            <p
              className="text-xl text-gray-300"
              style={{ fontFamily: "Segoe UI Regular" }}>
              Histórias de sucesso e transformação
            </p>
          </motion.div>

          {/* Carrossel de Depoimentos */}
          <div className="flex flex-col items-center justify-center relative z-10">
            {/* Card centralizado */}
            <div className="relative w-full max-w-xl mx-auto flex items-center justify-center min-h-[370px]">
              {/* Botão Anterior */}
              <button
                onClick={() =>
                  setCurrentSlide((prev) =>
                    prev === 0
                      ? Object.values(businessSegments).length - 1
                      : prev - 1
                  )
                }
                className="absolute left-[-80px] top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-gray-800 via-gray-900 to-black border-2 border-white/10 shadow-2xl hover:from-red-700 hover:to-red-900 hover:border-red-500 hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-400/40"
                aria-label="Anterior"
                style={{ marginRight: "24px" }}>
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="none" />
                  <path
                    d="M15 19l-7-7 7-7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Depoimento ÚNICO centralizado */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.96, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -30 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="relative bg-gradient-to-br from-white/10 via-black/40 to-gray-900/30 backdrop-blur-lg rounded-[5px] shadow-2xl border border-white/10 px-8 py-12 flex flex-col items-center w-full">
                  {/* Aspas decorativas */}
                  <div className="absolute -top-8 left-8 text-7xl text-red-600/20 select-none pointer-events-none">
                    “
                  </div>
                  <div className="absolute -bottom-8 right-8 text-7xl text-red-600/20 select-none pointer-events-none">
                    ”
                  </div>

                  {/* Texto do Depoimento */}
                  <p
                    className="text-gray-100 text-2xl md:text-2xl italic mb-8 text-center drop-shadow"
                    style={{ fontFamily: "Segoe UI Regular" }}>
                    {
                      Object.values(businessSegments)[currentSlide].testimonial
                        .text
                    }
                  </p>

                  {/* Linha divisória */}
                  <div className="w-24 h-[2px] bg-gradient-to-r from-red-600 via-white/60 to-red-600 rounded-full mb-6 opacity-70" />

                  {/* Autor */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-red-600/30 flex items-center justify-center shadow-lg ring-2 ring-red-600/30 mb-2">
                      <span className="text-3xl">
                        {Object.values(businessSegments)[currentSlide].icon}
                      </span>
                    </div>
                    <h4
                      className="text-white text-lg"
                      style={{ fontFamily: "Segoe UI semibold" }}>
                      {
                        Object.values(businessSegments)[currentSlide]
                          .testimonial.author
                      }
                    </h4>
                    <p
                      className="text-red-400 text-sm"
                      style={{ fontFamily: "Segoe UI Regular" }}>
                      {
                        Object.values(businessSegments)[currentSlide]
                          .testimonial.role
                      }
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Botão Próximo */}
              <button
                onClick={() =>
                  setCurrentSlide((prev) =>
                    prev === Object.values(businessSegments).length - 1
                      ? 0
                      : prev + 1
                  )
                }
                className="absolute right-[-80px] top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-red-600 via-red-700 to-red-800 border-2 border-white/10 shadow-2xl hover:from-red-700 hover:to-black hover:border-red-500 hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-400/40"
                aria-label="Próximo"
                style={{ marginLeft: "24px" }}>
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="none" />
                  <path
                    d="M9 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Indicadores minimalistas */}
            <div className="flex justify-center gap-2 mt-10 z-10">
              {Object.values(businessSegments).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 focus:outline-none ${
                    currentSlide === index
                      ? "w-8 h-3 bg-gradient-to-r from-red-600 to-red-600 rounded-full shadow-lg ring-2 ring-red-400/70"
                      : "w-3 h-3 bg-white/20 rounded-full hover:bg-red-600/40"
                  }`}
                  aria-label={`Ir para o depoimento ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Parceiros Redesenhada */}
      <section className="py-20 relative overflow-visible bg-gradient-to-b from-white to-gray-50 pt-32">
        {/* Elementos decorativos */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50 to-transparent" />
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gray-50 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative">
          {/* Cabeçalho */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20">
            <span
              className="text-xs uppercase tracking-[0.2em] text-red-600 mb-3 block"
              style={{ fontFamily: "Segoe UI Regular" }}>
              Parcerias Estratégicas
            </span>
            <h2
              className="text-5xl font-extrabold mb-4 text-gray-900 drop-shadow-sm"
              style={{ fontFamily: "Segoe UI semibold" }}>
              Nossos Clientes e Parceiros
            </h2>
            <div className="flex justify-center mb-8">
              <span className="inline-block w-24 h-1 rounded-full bg-gradient-to-r from-red-600 via-black to-red-600 shadow-md" />
            </div>
            <p
              className="text-lg text-gray-500 leading-relaxed"
              style={{ fontFamily: "Segoe UI Regular" }}>
              Colaboramos com as principais empresas do mercado
              <br />
              para oferecer as melhores soluções
            </p>
          </motion.div>

          {/* Carrossel de Parceiros */}
          <div className="max-w-5xl mx-auto mb-20 overflow-hidden">
            <div
              className="relative w-full"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              }}>
              <div
                className="flex items-center gap-16 py-8 animate-logo-marquee"
                style={{
                  width: `${
                    partners.length * 2 * 180 + partners.length * 2 * 64
                  }px`, // largura total para loop
                  animation: "logo-marquee 22s linear infinite",
                }}>
                {[...partners, ...partners].map((partner, idx) => (
                  <div
                    key={partner.id + "-" + idx}
                    className="flex items-center flex-shrink-0"
                    style={{ width: 180 }}>
                    <img
                      src={partner.imageUrl}
                      alt={partner.name}
                      className="h-20 w-auto object-contain mx-auto transition"
                      style={{ maxWidth: 180 }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bloco sobreposto */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="relative z-30 max-w-3xl mx-auto" // Adicionado mx-auto para centralizar
            style={{ marginBottom: "-100px" }}>
            <div
              className="bg-gradient-to-br from-gray-900 to-black text-white p-8 rounded-[5px] shadow-2xl border border-gray-200 mx-auto" // Adicionado mx-auto aqui também
            >
              <h3
                className="text-2xl mb-4 text-white text-center"
                style={{ fontFamily: "Segoe UI semibold" }}>
                Quer se Tornar um Parceiro?
              </h3>
              <p
                className="text-gray-300 mb-6 max-w-2xl mx-auto text-center text-base"
                style={{ fontFamily: "Segoe UI Regular" }}>
                Junte-se a nós e faça parte de uma rede de empresas
                comprometidas com a excelência e inovação
              </p>
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/contato")}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-[5px] inline-flex items-center group transition-all"
                  style={{ fontFamily: "Segoe UI Regular" }}>
                  Entre em Contato
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ======================
// COMPONENTE WRAPPER DA HOME
// ======================
// Este componente é exportado e usado na rota principal do site
export function Home() {
  const { width } = useWindowSize(); // Pegamos diretamente a largura
  const isMobile = width < 768; // Define quando é mobile

  console.log("Width:", width, "Is Mobile:", isMobile); // Para debug

  return <>{isMobile ? <HomeMobile /> : <HeroSection />}</>;
}
