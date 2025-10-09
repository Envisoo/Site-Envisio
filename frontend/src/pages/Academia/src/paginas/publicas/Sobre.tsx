/** @format */

import { motion } from "framer-motion";
import { GraduationCap, Users, Award, Globe, Target } from "lucide-react";

export default function Sobre() {
  const valores = [
    {
      titulo: "Excelência",
      descricao:
        "Comprometimento com a qualidade máxima em todos os nossos cursos",
      icone: <Award className="text-red-600" size={24} />,
    },
    {
      titulo: "Inovação",
      descricao: "Sempre buscando as melhores práticas e tecnologias",
      icone: <Target className="text-red-600" size={24} />,
    },
    {
      titulo: "Comunidade",
      descricao: "Fomentando conexões e colaboração entre alunos",
      icone: <Users className="text-red-600" size={24} />,
    },
  ];

  const estatisticas = [
    { valor: "25.000+", label: "Alunos formados" },
    { valor: "800+", label: "Cursos disponíveis" },
    { valor: "98.7%", label: "Satisfação dos alunos" },
    { valor: "150+", label: "Instrutores especialistas" },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-800 to-red-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sobre a Academia
            </h1>
            <p className="text-xl text-red-100 leading-relaxed">
              Transformando vidas através da educação online de qualidade
            </p>
          </motion.div>
        </div>
      </section>

      {/* Missão e Visão */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nossa Missão
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Democratizar o acesso à educação de qualidade, proporcionando
                oportunidades de crescimento profissional para pessoas de todo o
                mundo através de cursos online inovadores e práticos.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Acreditamos que o conhecimento deve ser acessível a todos, e
                trabalhamos incansavelmente para criar uma plataforma que
                transforme sonhos em realidade.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Nossa Visão
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Ser a principal referência em educação online, reconhecida
                  pela excelência, inovação e impacto positivo na vida de
                  milhões de pessoas.
                </p>
                <div className="flex items-center text-red-600 font-semibold">
                  <Globe className="mr-2" size={20} />
                  <span>Educação para todos, em qualquer lugar</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Nossos Valores
            </h2>
            <p className="text-lg text-gray-600">
              Princípios que guiam nossa jornada e definem nossa identidade
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valores.map((valor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {valor.icone}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {valor.titulo}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {valor.descricao}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Números que Inspiram</h2>
            <p className="text-xl text-red-100">
              Resultados que comprovam nosso compromisso com a excelência
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {estatisticas.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.valor}
                </div>
                <div className="text-red-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* História */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nossa História
              </h2>
              <p className="text-lg text-gray-600">
                Uma jornada de crescimento e inovação
              </p>
            </motion.div>

            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      2020 - O Início
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Fundada com a missão de democratizar a educação, nossa
                      plataforma nasceu da paixão por ensinar e da crença no
                      poder transformador do conhecimento.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 text-center">
                  <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <GraduationCap className="text-red-600" size={32} />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col md:flex-row-reverse items-center gap-8">
                <div className="md:w-1/2">
                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      2022 - Crescimento
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Com milhares de alunos satisfeitos, expandimos nossa
                      oferta de cursos e melhoramos continuamente nossa
                      plataforma.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 text-center">
                  <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <Users className="text-red-600" size={32} />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      2024 - Inovação
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Hoje somos referência em educação online, com tecnologia
                      de ponta e metodologias inovadoras que continuam
                      transformando vidas.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 text-center">
                  <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <Award className="text-red-600" size={32} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-red-800 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Junte-se à Nossa Comunidade
            </h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Faça parte de uma comunidade de aprendizes apaixonados e
              transforme sua carreira conosco
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/academia/cursos"
                className="px-8 py-4 bg-white text-red-700 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                Explorar Cursos
              </a>
              <a
                href="/academia/cadastro"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300">
                Criar Conta Gratuita
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
