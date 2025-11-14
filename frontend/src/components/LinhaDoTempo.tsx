/** @format */

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  Calendar,
  ArrowRight,
  Clock,
  Award,
  Users,
  Code,
  Briefcase,
} from "lucide-react";

interface Evento {
  id: string;
  ano: string;
  titulo: string;
  descricao: string;
  icon: React.ReactNode;
  color: string;
}

const eventos: Evento[] = [
  {
    ano: "2018",
    titulo: "Fundação da Empresa",
    descricao:
      "Iniciámos a nossa jornada com o objetivo de transformar ideias em soluções reais.",
    id: "1",
    icon: <Calendar className="w-5 h-5 ml-4 mt-4" />,
    color: "from-red-500 to-red-500",
  },
  {
    ano: "2022",
    titulo: "Expansão de Serviços",
    descricao:
      "Ampliamos nossa atuação para outras áreas de sectores tecnológicos, incluindo Soluções ERP, Renting e Controles Inteligentes.",
    icon: <Code className="w-5 h-5 ml-4 mt-4" />,
    color: "from-red-500 to-red-400",
    id: "2",
  },
  {
    id: "3",
    ano: "11/2023",
    titulo: "Novo Cliente: 4 STAR",
    descricao:
      "Assinatura de contrato com a <strong>4 STAR - PARTICIPAÇÕES, SA</strong>, marcando um marco importante em nosso portfólio de clientes.",
    icon: <Briefcase className="w-5 h-5 ml-4 mt-4" />,
    color: "from-red-500 to-red-400",
  },
  {
    id: "4",
    ano: "01/2024",
    titulo: "Parceria Estratégica",
    descricao:
      "Estabelecemos parceria para soluções ERP com a <strong>4 Mentes</strong>, ampliando nossas capacidades em sistemas de gestão empresarial.",
    icon: <Users className="w-5 h-5 ml-4 mt-4" />,
    color: "from-red-500 to-red-400",
  },
  {
    id: "5",
    ano: "03/2024",
    titulo: "Novo Cliente: Camarufi",
    descricao:
      "Início da parceria com a <strong>Camarufi</strong>, fornecendo soluções tecnológicas personalizadas para suas necessidades.",
    icon: <Briefcase className="w-5 h-5 ml-4 mt-4" />,
    color: "from-red-500 to-red-400",
  },
  {
    id: "6",
    ano: "07/2024",
    titulo: "Novo Cliente: Manubito",
    descricao:
      "Assinatura de contrato com a <strong>Manubito</strong>, expandindo nossa carteira de clientes no setor.",
    icon: <Briefcase className="w-5 h-5 ml-4 mt-4" />,
    color: "from-red-500 to-red-400",
  },
  {
    id: "7",
    ano: "11/2024",
    titulo: "Parceria com SHOPRITE",
    descricao:
      "Fechamos parceria estratégica com a <strong>SHOPRITE SUPERMERCADOS, LDA</strong>, um marco importante para nossa atuação no mercado.",
    icon: <Award className="w-5 h-5 ml-4 mt-4" />,
    color: "from-red-500 to-red-400",
  },
  {
    id: "8",
    ano: "01/2025",
    titulo: "Novo Escritório e Academia",
    descricao:
      "Inauguração do nosso novo escritório e academia, proporcionando melhores instalações para nossa equipe e clientes.",
    icon: <Clock className="w-5 h-5 ml-4 mt-4" />,
    color: "from-red-500 to-red-400",
  },
  {
    id: "9",
    ano: "09/2025",
    titulo: "Lançamento do Site",
    descricao:
      "Lançamento oficial do nosso novo site, marcando nossa presença digital renovada e moderna.",
    icon: <Calendar className="w-5 h-5 ml-4 mt-4" />,
    color: "from-red-500 to-red-400",
  },
];

const TimelineItem = ({
  evento,
  index,
  activeId,
  setActiveId,
}: {
  evento: Evento;
  index: number;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
}) => {
  const isEven = index % 2 === 0;
  const isActive = activeId === evento.id;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
      className={`flex w-full mb-8 ${
        isEven ? "justify-start" : "justify-end"
      }`}>
      <div className="w-full md:w-5/12 px-4">
        <motion.div
          onClick={() => setActiveId(isActive ? null : evento.id)}
          whileHover={{
            y: -5,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          }}
          className={`relative p-6 rounded-[5px] bg-white shadow-lg border border-gray-100 transition-all duration-300 cursor-pointer overflow-hidden group ${
            isEven ? "md:ml-6" : "md:mr-6"
          }`}>
          {/* Animated background */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${evento.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 0.1 : 0 }}
          />

          {/* Icon with gradient background */}
          <motion.div
            className={`absolute -top-4 -left-4 w-10 h-10 rounded-[5px] bg-gradient-to-br ${evento.color} flex items-center justify-center text-white shadow-lg z-10`}
            whileHover={{
              scale: 1.1,
              rotate: [0, 5, -5, 0],
              transition: { duration: 0.5 },
            }}>
            {evento.icon}
          </motion.div>

          <div className="relative z-0">
            <div className="flex items-center mb-3">
              <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-[5px]">
                {evento.ano}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {evento.titulo}
            </h3>
            <AnimatePresence>
              {isActive && (
                <motion.p
                  className="text-gray-600"
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    marginTop: "0.75rem",
                    transition: {
                      duration: 0.3,
                      ease: "easeInOut",
                    },
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    marginTop: 0,
                    transition: {
                      duration: 0.2,
                      ease: "easeInOut",
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: evento.descricao }}
                />
              )}
            </AnimatePresence>
            <div className="mt-4 flex items-center text-sm font-medium text-gray-500">
              <span>Ver detalhes</span>
              <motion.span
                animate={{ x: isActive ? 5 : 0 }}
                transition={{
                  duration: 0.3,
                  repeat: isActive ? Infinity : 0,
                  repeatType: "reverse",
                }}>
                <ArrowRight className="w-4 h-4 ml-1" />
              </motion.span>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-gray-100 opacity-30 -z-10"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const LinhaDoTempo = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-[5px] bg-gray-100"
            style={{
              width: Math.random() * 400 + 100 + "px",
              height: Math.random() * 400 + 100 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              opacity: 0.05,
            }}
            animate={{
              y: [0, 30, 0],
              x: [0, Math.random() * 40 - 20, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nossa Jornada
          </h2>

          <div className="w-32 h-1 bg-gradient-to-r from-red-600 to-red-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative" ref={timelineRef}>
          {/* Animated timeline line */}
          <motion.div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-600 via-red-700 to-red-800 transform -translate-x-1/2"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <div className="relative z-10 space-y-12">
            {eventos.map((evento, index) => (
              <TimelineItem
                key={evento.id}
                evento={evento}
                index={index}
                activeId={activeId}
                setActiveId={setActiveId}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LinhaDoTempo;
