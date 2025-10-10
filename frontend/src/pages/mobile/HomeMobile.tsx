/** @format */

import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { partners } from "../../types/partners";
import { MobileCarousel } from "../../components/Carousel";

// Importando os mesmos dados da Home principal
const heroSlides = [
  {
    srcMobile: "/images/mobile/banner_mobile0.webp",
    link: "/servicos/software",
    label: "Consultoria",
  },

  {
    srcMobile: "/images/mobile/banner_mobile2.webp",
    link: "/servicos/hardware",
    label: "Serviços Técnicos",
  },
  {
    srcMobile: "/images/mobile/renting_mobile.webp",
    link: "/servicos/renting",
    label: "Serviços Técnicos",
  },
];

// Serviços (mesmo array da Home principal)
const services = [
  {
    title: "Renting de Equipamentos",
    description:
      "Renting de impressoras multifuncionais, computadores e servidores.",
    tipo: "aluguel",
    image: "/images/imagem cads/Destaque3.webp",
  },
  {
    title: "Sistemas de Segurança",
    description: "CCTV, controle de acesso, biometria e monitoramento 24h.",
    tipo: "hardware",
    image: "/images/imagem cads/Destaque4.webp",
  },
  // ... outros serviços
];

// Depoimentos - exemplo de dados
const testimonials = [
  {
    text: "A ENVISIO nos ajudou a transformar nosso negócio com soluções inovadoras.",
    author: "",
    role: "Empresa X",
  },
  {
    text: "Equipe altamente qualificada e atendimento excelente.",
    author: "",
    role: "Empresa Y",
  },
  {
    text: "Serviços de qualidade e suporte sempre disponível.",
    author: "",
    role: "Empresa Z",
  },
];

// Adicione este array de cursos antes da função HomeMobile
const cursosAcademia = [
  {
    titulo: "Certificação Profissional",
    subtitulo: "Certificação Internacional",

    beneficios: [
      "Certificado Reconhecido",
      "Professores Especializados",
      "Material Exclusivo",
    ],
    info: "Inclui acesso à plataforma online",
  },
  {
    titulo: "Mentoria Executiva",
    subtitulo: "Mentoria Personalizada",

    beneficios: [
      "Mentoria Individual",
      "Projetos Práticos",
      "Networking Estratégico",
    ],
    info: "Networking com profissionais da indústria",
  },
  {
    titulo: "Programa Avançado",
    subtitulo: "Carreira Acelerada",

    beneficios: ["Vagas Garantidas", "Suporte Contínuo", "Casos Reais"],
    info: "Networking com profissionais da indústria",
  },
];

export function HomeMobile() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="min-h-screen">
      {/* Carrossel Principal */}
      <section className="relative w-full md:hidden pt-14 ">
        {" "}
        {/* Adicionado mt-16 para dar espaço do header */}
        <MobileCarousel slides={heroSlides} />
      </section>
      {/* Seção Quem Somos - Mobile */}
      <section className="py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-8">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "Segoe UI Semibold" }}>
            Transformando negócios desde 2018
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-6" />
        </motion.div>

        {/* Grid Quem Somos - Texto Primeiro */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h3
              className="text-2xl font-bold"
              style={{ fontFamily: "Segoe UI Semibold" }}>
              Quem Somos
            </h3>
            <p
              className="text-gray-600 text-sm leading-relaxed"
              style={{ fontFamily: "Segoe UI Regular" }}>
              A ENVISIO, é uma empresa de direito Angolano, orientada para os
              problemas e soluções locais, que atua no mercado da Consultoria e
              provedor de serviços e soluções de tecnologia de informações
              apostando numa prestação de serviço eficaz e de qualidade desde
              2018.
            </p>
          </div>

          {/* Números */}
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

          {/* Marco Histórico */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0">
              2018
            </div>
            <div>
              <h4
                className="font-semibold mt-3"
                style={{ fontFamily: "Segoe UI Semibold" }}>
                Fundação da Empresa
              </h4>
            </div>
          </div>

          {/* Imagem movida para o final */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="rounded-lg overflow-hidden shadow-lg mt-8">
            <img
              src="/images/imagem home/banner_quem.webp"
              alt="Nossa História"
              className="w-full h-[250px] object-cover rounded-lg"
            />
          </motion.div>

          {/* Botão */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/quem-somos")}
            className="w-full bg-red-600 text-white py-3 rounded-lg flex items-center justify-center mt-6">
            Conheça Nossa História Completa
            <span className="ml-2">→</span>
          </motion.button>
        </div>
      </section>
      {/* Seção Serviços - Mobile */}
      <section className="py-12 px-4 bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-8">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "Segoe UI Semibold" }}>
            Nossos Serviços
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-6" />
        </motion.div>

        {/* Lista de Serviços */}
        <div className="space-y-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <button
                  onClick={() => navigate(`/servicos/${service.tipo}`)}
                  className="bg-red-600 text-white px-4 py-2 rounded text-sm w-full">
                  Saiba mais
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Academia - Mobile */}
      <section className="py-12 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-8">
          <span className="text-sm text-red-600 mb-2 block">
            Formação Profissional
          </span>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "Segoe UI Semibold" }}>
            Desenvolva Seu Potencial
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-6" />
        </motion.div>

        {/* Cards Academia - Substitua o código existente dos cards por este */}
        <div className="space-y-6">
          {cursosAcademia.map((curso, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{curso.titulo}</h3>
                  <p className="text-red-600 text-sm">{curso.subtitulo}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {curso.beneficios.map((beneficio, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-red-600 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">{beneficio}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-4 h-4 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm text-black">{curso.info}</span>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/academia")}
                className="w-full bg-red-600 text-white py-3 rounded-lg flex items-center justify-center">
                Visite-nos
                <span className="ml-2">→</span>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Depoimentos - Mobile */}
      <section className="py-12 px-4 bg-black text-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-8">
          <h2
            className="text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "Segoe UI Semibold" }}>
            O Que Nossos Clientes Dizem
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-6" />
        </motion.div>

        {/* Carrossel de Depoimentos */}
        <div className="relative">
          {/* Botão Anterior */}
          <button
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === 0 ? testimonials.length - 1 : prev - 1
              )
            }
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-red-600/80 rounded-full">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2" />
            </svg>
          </button>

          {/* Depoimento */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-gray-900 p-6 rounded-lg mx-8">
              <p className="text-lg mb-4 italic">
                {testimonials[currentSlide].text}
              </p>
              <div className="text-sm">
                <p className="font-semibold">
                  {testimonials[currentSlide].author}
                </p>
                <p className="text-red-400">
                  {testimonials[currentSlide].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Botão Próximo */}
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % testimonials.length)
            }
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-red-600/80 rounded-full">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" stroke="white" strokeWidth="2" />
            </svg>
          </button>

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentSlide ? "bg-red-600 w-4" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Parceiros - Mobile */}
      <section className="py-12 px-4 bg-gradient-to-b from-white to-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-8">
          <span className="text-sm text-red-600 mb-2 block">
            Parcerias Estratégicas
          </span>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "Segoe UI Semibold" }}>
            Nossos Parceiros
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-6" />
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

        {/* CTA Parceiros */}
        <div className="mt-12 bg-gradient-to-br from-gray-900 to-black text-white p-6 rounded-lg shadow-xl">
          <h3 className="text-xl font-bold mb-3 text-white text-center">
            Quer se Tornar um Parceiro?
          </h3>
          <p className="text-gray-300 mb-4 text-center text-sm">
            Junte-se a nós e faça parte de uma rede de empresas comprometidas
            com a excelência e inovação
          </p>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/contato")}
            className="w-full bg-red-600 text-white py-3 rounded-lg flex items-center justify-center">
            Entre em Contato
            <span className="ml-2">→</span>
          </motion.button>
        </div>
      </section>
    </div>
  );
}
