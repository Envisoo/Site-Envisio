/** @format */
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Users,
  Sparkles,
  Target,
  Award,
  ArrowRight,
} from "lucide-react";

const SobreAcademia = () => {
  const features = [
    {
      title: "Aprendizado Prático",
      description:
        "Cursos focados em projetos reais para aplicar o conhecimento imediatamente.",
      icon: <GraduationCap className="w-6 h-6 text-red-500" />,
      color: "from-red-100 to-red-50",
    },
    {
      title: "Instrutores Especialistas",
      description:
        "Aprenda com profissionais atuantes no mercado e com vasta experiência.",
      icon: <Users className="w-6 h-6 text-blue-500" />,
      color: "from-blue-100 to-blue-50",
    },
    {
      title: "Metodologia Inovadora",
      description:
        "Abordagem pedagógica que acelera seu aprendizado e retenção de conteúdo.",
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      color: "from-amber-100 to-amber-50",
    },
    {
      title: "Foco no Mercado",
      description:
        "Conteúdos atualizados com as demandas atuais do mercado de trabalho.",
      icon: <Target className="w-6 h-6 text-emerald-500" />,
      color: "from-emerald-100 to-emerald-50",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Shapes animados de fundo */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-10 right-10 w-32 h-32 bg-red-200 rounded-full blur-3xl opacity-40"
      />
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute bottom-10 left-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-40"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16">
          <span className="inline-block px-5 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-full mb-4 animate-pulse">
            Nossa Jornada
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Mais que uma <span className="text-red-600">Academia</span>, uma{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-500 to-red-700">
              Jornada de Transformação
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Conectamos pessoas, tecnologia e conhecimento em uma experiência que
            vai além das salas de aula. Aqui, cada curso é uma porta para novas
            oportunidades.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Coluna da esquerda - Imagem com destaque */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1471&q=80"
                alt="Estudantes aprendendo"
                className="w-full h-auto object-cover aspect-video group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

              {/* Badge de Destaque */}
              <div className="absolute top-6 right-6 bg-white rounded-full px-5 py-2 flex items-center shadow-lg animate-bounce">
                <Award className="w-5 h-5 text-amber-500 mr-2" />
                <span className="font-medium text-gray-900">
                  Excelência em Educação
                </span>
              </div>
            </div>

            {/* Moldura decorativa */}
            <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-red-200 rounded-2xl -z-10"></div>
          </motion.div>

          {/* Coluna da direita - Conteúdo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8">
            {/* Destaque */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-50 to-amber-50 rounded-full border border-red-100 shadow-sm">
              <Sparkles className="w-5 h-5 text-amber-500 mr-2" />
              <span className="text-sm font-medium text-amber-700">
                Inovando na Educação Digital
              </span>
            </div>

            <h3 className="text-3xl font-bold text-gray-900 leading-tight">
              Por que escolher nossa{" "}
              <span className="text-red-600">Academia Digital</span>?
            </h3>

            <p className="text-lg text-gray-600">
              Somos mais que uma escola: somos uma comunidade que inspira,
              conecta e transforma. Nossa abordagem única une teoria e prática
              para garantir que você esteja preparado para os desafios do mundo
              real.
            </p>

            {/* Grid de Recursos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="p-5 bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                to="/cursos"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                Inicie Sua Jornada Agora
                <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link
                to="/sobre"
                className="inline-flex items-center justify-center px-6 py-3.5 text-gray-700 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-300">
                Conheça Mais Sobre Nós
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SobreAcademia;
