/** @format */

import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Partner, partners } from "../types/partners";

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

const menuSections = [
  {
    id: "quem-somos",
    title: "Quem Somos",
    description:
      "Uma empresa com mais de 25 anos de experiência em contabilidade, tecnologia e educação profissional.",
    icon: "🏢",
    image: "/images/about-bg.jpg",
    highlights: [
      "25 anos de mercado",
      "Equipe especializada",
      "Atendimento personalizado",
      "Compromisso com excelência",
    ],
  },
  {
    id: "servicos",
    title: "Nossos Serviços",
    description:
      "Soluções completas em contabilidade e consultoria técnica para sua empresa.",
    icon: "⚡",
    image: "/images/services-bg.jpg",
    highlights: [
      "Consultoria fiscal",
      "Gestão contábil",
      "Suporte técnico 24/7",
      "Projetos personalizados",
    ],
  },
  {
    id: "academia",
    title: "Academia Profissional",
    description:
      "Centro de formação e desenvolvimento profissional com cursos reconhecidos.",
    icon: "🎓",
    image: "/images/academy-bg.jpg",
    highlights: [
      "Cursos certificados",
      "Professores especializados",
      "Metodologia moderna",
      "Formação continuada",
    ],
  },
  {
    id: "contato",
    title: "Contato",
    description:
      "Entre em contato conosco e descubra como podemos ajudar no seu sucesso.",
    icon: "📱",
    image: "/images/contact-bg.jpg",
    highlights: [
      "Atendimento rápido",
      "Consulta gratuita",
      "Suporte especializado",
      "Orçamento personalizado",
    ],
  },
];

// Primeiro, ajuste o array de frases para ter uma cópia extra para transição suave
const highlightPhrases = [
  "Contabilidade Digital",
  "Expertise Técnica",
  "Educação Profissional",
  "Contabilidade Digital", // Repetir o primeiro para transição suave
];

const heroSlides = [
  {
    src: "/images/hero-card1.jpg",
    link: "/servicos/contabilidade",
    label: "Contabilidade Digital",
  },
  {
    src: "/images/hero-card2.jpg",
    link: "/servicos/tecnicos",
    label: "Serviços Técnicos",
  },
  {
    src: "/images/hero-card3.jpg",
    link: "/academia",
    label: "Academia Profissional",
  },
];

export default function HeroSection() {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState<
    "contabilidade" | "tecnicos"
  >("contabilidade");
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // NOVO: controla pausa do carrossel

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
        text: "A parceria com a empresa revolucionou nossa gestão financeira",
        author: "Maria Silva",
        role: "CEO - Tech Solutions",
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
        text: "Eficiência e profissionalismo em cada projeto executado",
        author: "João Santos",
        role: "Diretor de TI - Global Corp",
      },
    },
    academia: {
      title: "Academia de Formação Profissional",
      subtitle: "Capacitação que transforma carreiras",
      description:
        "Cursos e programas de formação com certificação reconhecida",
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
        author: "Ana Oliveira",
        role: "Analista Sênior - Multinacional",
      },
    },
  };

  const services = [
    {
      area: "contabilidade",
      services: [
        {
          title: "Consultoria Fiscal",
          description:
            "Planejamento tributário estratégico e compliance fiscal",
          icon: "📑",
        },
        {
          title: "Gestão Contábil",
          description: "Contabilidade completa e demonstrações financeiras",
          icon: "💼",
        },
        {
          title: "Departamento Pessoal",
          description: "Gestão completa da folha e benefícios",
          icon: "👥",
        },
      ],
    },
    {
      area: "tecnicos",
      services: [
        {
          title: "Manutenção Preventiva",
          description: "Prevenção e diagnóstico antecipado",
          icon: "🔍",
        },
        {
          title: "Suporte Técnico",
          description: "Atendimento especializado 24/7",
          icon: "🛠️",
        },
        {
          title: "Instalações",
          description: "Projetos e instalações profissionais",
          icon: "⚡",
        },
      ],
    },
    {
      area: "academia",
      services: [
        {
          title: "Personal Training",
          description: "Treinos personalizados com profissionais certificados",
          icon: "🏋️‍♂️",
        },
        {
          title: "Nutrição Esportiva",
          description: "Acompanhamento nutricional especializado",
          icon: "🥗",
        },
        {
          title: "Musculação",
          description: "Equipamentos de última geração",
          icon: "💪",
        },
      ],
    },
    {
      area: "tecnologia",
      services: [
        {
          title: "Desenvolvimento Web",
          description: "Sites e sistemas web personalizados",
          icon: "🌐",
        },
        {
          title: "App Mobile",
          description: "Aplicativos iOS e Android",
          icon: "📱",
        },
        {
          title: "Cloud Computing",
          description: "Soluções em nuvem escaláveis",
          icon: "☁️",
        },
      ],
    },
    {
      area: "seguranca",
      services: [
        {
          title: "Cybersegurança",
          description: "Proteção contra ameaças digitais",
          icon: "🔒",
        },
        {
          title: "Backup em Nuvem",
          description: "Backup seguro e automatizado",
          icon: "💾",
        },
        {
          title: "Firewall",
          description: "Segurança de rede avançada",
          icon: "🛡️",
        },
      ],
    },
    {
      area: "consultoria",
      services: [
        {
          title: "Consultoria Digital",
          description: "Transformação digital para empresas",
          icon: "💡",
        },
        {
          title: "Business Intelligence",
          description: "Análise de dados e relatórios",
          icon: "📊",
        },
        {
          title: "Gestão de Projetos",
          description: "Metodologias ágeis e tradicionais",
          icon: "📋",
        },
      ],
    },
  ];

  // Efeito para alternar as frases
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % highlightPhrases.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Carrossel com pausa elegante
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // Transição mais lenta e elegante
    return () => clearInterval(timer);
  }, [isPaused, heroSlides.length]);

  // Carrossel de logos dos parceiros
  const carouselRef = useRef<HTMLDivElement>(null);
  const logosToShow = 5; // Quantas logos aparecem ao mesmo tempo
  const logoWidth = 180; // Largura máxima de cada logo (px)
  const gap = 64; // gap-16 em px

  // Efeito de carrossel automático
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

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Carrossel de Imagens de Fundo */}
      <section className="relative min-h-[93vh] mt-[-20px] w-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={carouselIndex}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full z-0">
            <img
              src={heroSlides[carouselIndex].src}
              alt=""
              className="w-full h-full object-cover object-center"
              style={{ filter: "brightness(1)" }}
            />

            {/* <div className="absolute inset-0 bg-black/5" /> */}
            <div className="absolute bottom-10 left-10 z-20">
              <Link to={heroSlides[carouselIndex].link}>
                <button
                  className="px-8 py-4 bg-red-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-red-700 transition-all"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}>
                  Saiba mais
                </button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Nossa História Redesenhada */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-50 to-transparent" />

        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto">
            {/* Cabeçalho da Seção */}
            <div className="text-center mb-20">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                style={{
                  fontFamily: "Segoe UI Regular",
                }}
                className="text-sm uppercase tracking-wider text-gray-500 mb-4 block">
                Nossa Trajetória
              </motion.span>
              <h2
                style={{ fontFamily: "Segoe UI Semibold" }}
                className="text-5xl font-bold mb-6">
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
                          className="font-semibold mb-1"
                          style={{ fontFamily: "Segoe UI Semibold" }}>
                          Fundação da Empresa
                        </h4>
                        <p
                          className="text-gray-600"
                          style={{ fontFamily: "Segoe UI Regular" }}>
                          Prestar serviços de consultoria e contabilidade
                        </p>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/quem-somos")}
                    className="mt-8 w-full bg-red-600 text-white py-4 px-8 rounded-lg flex items-center justify-center group hover:bg-red-700 transition-all"
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
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src="/images/about-team.jpg"
                      alt="Nossa Equipe"
                      className="w-full h-[600px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Destaques sobrepostos à imagem */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <div className="grid grid-cols-2 gap-8">
                        {menuSections[0].highlights.map((highlight, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3">
                            <span className="text-2xl">✓</span>
                            <span className="font-medium">{highlight}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Elemento decorativo */}
                <div className="absolute -right-4 -bottom-4 w-full h-full border-2 border-black rounded-2xl -z-10" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* Seção de Serviços Redesenhada */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Gradiente decorativo */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black via-gray-900 to-black" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1),_transparent_70%)]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Cabeçalho */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-20">
            <span
              className="text-sm uppercase tracking-wider text-gray-400"
              style={{
                fontFamily: "Segoe UI Regular",
              }}>
              Soluções Empresariais
            </span>
            <h2
              className="text-5xl font-bold text-white mt-4 mb-6"
              style={{ fontFamily: "Segoe UI Semibold" }}>
              Nossos Serviços Especializados
            </h2>
            <div
              className="w-24 h-1 bg-red-600 mx-auto mb-8"
              style={{
                fontFamily: "Segoe UI Regular",
              }}
            />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transformamos desafios em oportunidades com soluções tecnológicas
              integradas e consultoria especializada para impulsionar o
              crescimento do seu negócio.
            </p>
          </motion.div>

          {/* Grade de Serviços */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 0.8,
                }}
                whileHover={{
                  scale: 1,
                  y: -10,
                  transition: { duration: 0.2 },
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                }}
                onClick={() => navigate(`/servicos/${service.area}`)} // Adicionado onClick
                className="relative isolate transform-gpu group cursor-pointer">
                {" "}
                {/* Adicionado cursor-pointer */}
                <div className="relative bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 group-hover:border-red-500/50 group-hover:bg-red-800/20 transition-all duration-300 h-full">
                  <div className="w-16 h-16 rounded-full bg-red-600/30 flex items-center justify-center mb-6">
                    <span className="text-3xl">
                      {index === 0
                        ? "💻"
                        : index === 1
                        ? "🖨️"
                        : index === 2
                        ? "🎥"
                        : index === 3
                        ? "🌐"
                        : index === 4
                        ? "🔒"
                        : "💡"}
                    </span>
                  </div>

                  <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: "Segoe UI Semibold" }}>
                    {index === 0
                      ? "Consultoria em TI"
                      : index === 1
                      ? "Aluguel de Equipamentos"
                      : index === 2
                      ? "Sistemas de Segurança"
                      : index === 3
                      ? "Desenvolvimento Web"
                      : index === 4
                      ? "Cybersegurança"
                      : "Consultoria Digital"}
                  </h3>

                  <p
                    className="text-gray-400 mb-6"
                    style={{
                      fontFamily: "Segoe UI Regular",
                    }}>
                    {index === 0
                      ? "ERP Eticadata/Primavera"
                      : index === 1
                      ? "Soluções completas para empresas"
                      : index === 2
                      ? "CFTV e monitoramento"
                      : index === 3
                      ? "Sites e sistemas web personalizados"
                      : index === 4
                      ? "Proteção contra ameaças digitais"
                      : "Transformação digital para empresas"}
                  </p>

                  <div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      fontFamily: "Segoe UI Regular",
                    }}>
                    <ul className="space-y-3 text-gray-300 mb-6">
                      {[1, 2, 3].map((_, i) => (
                        <li key={i} className="flex items-center">
                          <span className="text-red-500 mr-2">✓</span>
                          {index === 0
                            ? [
                                "Integração completa de sistemas",
                                "Migração de dados segura",
                                "Suporte técnico especializado",
                              ][i]
                            : index === 1
                            ? [
                                "Impressoras e Multifuncionais",
                                "Manutenção incluída",
                                "Suporte técnico 24/7",
                              ][i]
                            : index === 2
                            ? [
                                "Câmeras de alta resolução",
                                "Monitoramento 24 horas",
                                "Controle de acesso",
                              ][i]
                            : index === 3
                            ? [
                                "Design responsivo",
                                "SEO otimizado",
                                "Painel administrativo",
                              ][i]
                            : index === 4
                            ? [
                                "Análise de vulnerabilidades",
                                "Monitoramento 24/7",
                                "Resposta a incidentes",
                              ][i]
                            : [
                                "Análise de processos",
                                "Implementação de melhorias",
                                "Treinamento de equipes",
                              ][i]}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center text-white group">
                      Saiba mais
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Final */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mt-20">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/servicos")}
              className="px-12 py-5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all inline-flex items-center group">
              Solicite uma consultoria
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Academia Profissional - Versão Clara e Elegante */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
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
            <span className="text-sm uppercase tracking-wider text-red-600 font-semibold mb-4 block">
              Formação Profissional de Elite
            </span>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Desenvolva Seu Potencial
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-8" />
            <p className="text-xl text-gray-600">
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
                duration: "3 meses",
                price: "49.700",
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
                duration: "4 meses",
                price: "69.700",
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
                duration: "5 meses",
                price: "89.700",
              },
            ].map((curso, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group relative h-full">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                  {/* Ícone e Título */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-3xl">{curso.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                        {curso.title}
                      </h3>
                      <p className="text-gray-600">{curso.subtitle}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {curso.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
                          <span className="text-red-600 text-sm">✓</span>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Preço e Duração */}
                  <div className="flex items-center justify-between py-4 border-t border-gray-100">
                    <div>
                      <span className="text-gray-500 text-sm">Duração</span>
                      <p className="text-gray-900 font-semibold">
                        {curso.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-500 text-sm">
                        Investimento
                      </span>
                      <p className="text-gray-900 font-semibold">A partir de</p>
                      <p className="text-red-600 font-bold text-xl">
                        {parseInt(curso.price).toLocaleString("pt-AO")} Kz/mês
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/academia")}
                    className="mt-auto w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-lg flex items-center justify-center group hover:from-red-700 hover:to-red-800 transition-all">
                    Inscreva-se Agora
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Botão Ver Mais Cursos */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mt-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/academia")}
              className="px-12 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition-all inline-flex items-center group">
              Ver Mais Cursos
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Seção 7: Depoimentos */}
      <section className="py-32 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-black/50" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Cabeçalho */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-sm uppercase tracking-wider text-red-400 font-semibold mb-4 block">
              Depoimentos
            </span>
            <h2 className="text-5xl font-bold text-white mb-6">
              O Que Nossos Clientes Dizem
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-8" />
            <p className="text-xl text-gray-300">
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
                  className="relative bg-gradient-to-br from-white/10 via-black/40 to-gray-900/30 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 px-8 py-12 flex flex-col items-center w-full">
                  {/* Aspas decorativas */}
                  <div className="absolute -top-8 left-8 text-7xl text-red-600/20 select-none pointer-events-none">
                    “
                  </div>
                  <div className="absolute -bottom-8 right-8 text-7xl text-red-600/20 select-none pointer-events-none">
                    ”
                  </div>

                  {/* Texto do Depoimento */}
                  <p className="text-gray-100 text-2xl md:text-2xl italic font-medium mb-8 text-center drop-shadow">
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
                    <h4 className="text-white font-bold text-lg">
                      {
                        Object.values(businessSegments)[currentSlide]
                          .testimonial.author
                      }
                    </h4>
                    <p className="text-red-400 text-sm">
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
                      ? "w-8 h-3 bg-gradient-to-r from-red-600 via-white to-red-600 rounded-full shadow-lg ring-2 ring-red-400/70"
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
      <section className="py-32 relative overflow-visible bg-gradient-to-b from-white to-gray-50 pt-32">
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
            <span className="text-xs uppercase tracking-[0.2em] text-red-600 font-semibold mb-3 block">
              Parcerias Estratégicas
            </span>
            <h2 className="text-5xl font-extrabold mb-4 text-gray-900 drop-shadow-sm">
              Nossos Parceiros
            </h2>
            <div className="flex justify-center mb-8">
              <span className="inline-block w-24 h-1 rounded-full bg-gradient-to-r from-red-600 via-black to-red-600 shadow-md" />
            </div>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
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
                  animation: "logo-marquee 18s linear infinite",
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
            className="relative z-30 max-w-3xl mx-auto"
            style={{ marginBottom: "-240px" }} // ajuste se necessário
          >
            <div className="bg-gradient-to-br from-gray-900 to-black text-white p-8 rounded-2xl shadow-2xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-center">
                Quer se Tornar um Parceiro?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-center text-base">
                Junte-se a nós e faça parte de uma rede de empresas
                comprometidas com a excelência e inovação
              </p>
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/parcerias")}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-medium inline-flex items-center group transition-all">
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

export function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
    </div>
  );
}
