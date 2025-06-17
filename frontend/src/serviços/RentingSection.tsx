/** @format */

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const RentingSection: React.FC = () => {
  const rentingServices = [
    {
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
      image: "/images/impressoras-renting.jpg",
    },
    {
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
      image: "/images/computadores-renting.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6">
            Soluções em <span className="text-blue-200">Renting</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto">
            Equipamentos profissionais com manutenção inclusa, sem investimento
            inicial. A solução ideal para sua empresa crescer sem preocupações.
          </motion.p>
        </div>
      </section>

      {/* Serviços Detalhados */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {rentingServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-12`}>
                {/* Imagem */}
                <div className="flex-1">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  />
                </div>

                {/* Conteúdo */}
                <div className="flex-1 space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <Link
                      to="/contact"
                      className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
                      Solicitar Orçamento
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vantagens do Renting */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher Renting?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubra as vantagens de ter equipamentos profissionais sem o
              investimento inicial
            </p>
          </div>

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
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{advantage.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {advantage.title}
                </h3>
                <p className="text-gray-600">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Entre em contato conosco e descubra como o renting pode transformar
            sua empresa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              <Mail className="w-5 h-5 mr-2" />
              Solicitar Contato
            </Link>
            <a
              href="tel:+351234567890"
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
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
