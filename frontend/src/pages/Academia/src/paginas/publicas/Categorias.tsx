/** @format */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Code,
  Palette,
  TrendingUp,
  Briefcase,
  DollarSign,
  Globe,
  Wifi,
  BookOpen,
} from "lucide-react";

export default function Categorias() {
  const categorias = [
    {
      nome: "Programação",
      descricao:
        "Aprenda linguagens de programação, desenvolvimento web, mobile e muito mais",
      icone: <Code className="text-blue-600" size={32} />,
      cor: "from-blue-500 to-purple-600",
      cursos: 128,
      nivel: "Iniciante ao Avançado",
    },
    {
      nome: "Design",
      descricao: "UX/UI, design gráfico, web design e ferramentas criativas",
      icone: <Palette className="text-pink-600" size={32} />,
      cor: "from-pink-500 to-red-500",
      cursos: 76,
      nivel: "Iniciante ao Avançado",
    },
    {
      nome: "Marketing",
      descricao:
        "Marketing digital, SEO, redes sociais e estratégias de crescimento",
      icone: <TrendingUp className="text-green-600" size={32} />,
      cor: "from-green-500 to-teal-500",
      cursos: 92,
      nivel: "Iniciante ao Avançado",
    },
    {
      nome: "Negócios",
      descricao: "Empreendedorismo, gestão, liderança e estratégia empresarial",
      icone: <Briefcase className="text-yellow-600" size={32} />,
      cor: "from-yellow-500 to-orange-500",
      cursos: 64,
      nivel: "Iniciante ao Avançado",
    },
    {
      nome: "Finanças",
      descricao:
        "Investimentos, contabilidade, análise financeira e planejamento",
      icone: <DollarSign className="text-emerald-600" size={32} />,
      cor: "from-emerald-500 to-green-600",
      cursos: 58,
      nivel: "Iniciante ao Avançado",
    },
    {
      nome: "Idiomas",
      descricao:
        "Inglês, espanhol, francês e outros idiomas para o mercado global",
      icone: <Globe className="text-indigo-600" size={32} />,
      cor: "from-indigo-500 to-blue-600",
      cursos: 45,
      nivel: "Básico ao Fluente",
    },
    {
      nome: "TI & Redes",
      descricao:
        "Infraestrutura, segurança, cloud computing e administração de sistemas",
      icone: <Wifi className="text-gray-600" size={32} />,
      cor: "from-gray-500 to-gray-700",
      cursos: 83,
      nivel: "Iniciante ao Avançado",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Categorias de Cursos
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore nossas categorias e encontre o curso perfeito para sua
              jornada de aprendizado
            </p>
          </motion.div>
        </div>
      </div>

      {/* Grid de Categorias */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categorias.map((categoria, index) => (
            <motion.div
              key={categoria.nome}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group">
              <Link
                to={`/academia/cursos?categoria=${categoria.nome.toLowerCase()}`}
                className="block">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-red-200 transition-all duration-300">
                  <div
                    className={`h-32 bg-gradient-to-r ${categoria.cor} flex items-center justify-center`}>
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      {categoria.icone}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                      {categoria.nome}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {categoria.descricao}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{categoria.cursos} cursos</span>
                      <span>{categoria.nivel}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <BookOpen className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Não encontrou o que procura?
            </h3>
            <p className="text-gray-600 mb-6">
              Nossa equipe está sempre trabalhando para adicionar novos cursos e
              categorias. Entre em contato conosco e sugira uma nova área de
              conhecimento!
            </p>
            <Link
              to="/academia/contato"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
              Fale Conosco
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
