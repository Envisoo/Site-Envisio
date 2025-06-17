/** @format */

import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Server, Cpu, ShieldCheck } from "lucide-react";

interface Service {
  title: string;
  description: string;
  items?: string[];
}

interface ServiceCategory {
  category: "Hardware" | "Software" | "Renting";
  services: Service[];
}

const services: ServiceCategory[] = [
  {
    category: "Software",
    services: [
      {
        title: "Consultoria em TI",
        description: "Soluções personalizadas em software para empresas.",
        items: [
          "Centralização de informação",
          "Análise e gestão digital de negócios",
        ],
      },
      {
        title: "ERP Eticadata / Primavera",
        description: "Sistemas integrados de gestão empresarial.",
        items: [
          "Gestão Comercial",
          "Contabilidade",
          "Recursos Humanos",
          "AutoGest",
        ],
      },
    ],
  },
  {
    category: "Hardware",
    services: [
      {
        title: "Redes Estruturadas (Cisco)",
        description: "Instalação de redes com equipamentos profissionais.",
        items: ["Patch Panels", "Switches", "Roteadores"],
      },
      {
        title: "Vídeo Vigilância (CCTV)",
        description: "Monitoramento com câmeras, DVR/NVR e acesso remoto.",
        items: ["Câmeras", "Gravadores", "Sensores", "Monitoramento remoto"],
      },
      {
        title: "Cerca e Fechadura Eléctrica",
        description: "Sistemas de segurança com controle de acesso integrado.",
        items: [
          "Fechadura digital",
          "Integração com alarmes e câmeras",
          "Controle remoto de acesso",
        ],
      },
      {
        title: "Vídeo Porteiro e Ponto Biométrico",
        description:
          "Acesso seguro e inteligente com registro biométrico e vídeo.",
        items: [
          "Câmera integrada",
          "Áudio bidirecional",
          "Abertura remota de portas",
        ],
      },
    ],
  },
  {
    category: "Renting",
    services: [
      {
        title: "Impressoras Profissionais",
        description:
          "Soluções em renting de impressoras coloridas e multifuncionais para empresas.",
        items: ["bizhub C3351i", "bizhub C301i", "bizhub C251i"],
      },
      {
        title: "Computador Profissional",
        description:
          "Aluguel de computadores de alto desempenho para escritórios e projetos específicos.",
        items: [
          "Intel i7, 16GB RAM, SSD 512GB",
          "Windows 11 Pro",
          "Assistência técnica inclusa",
        ],
      },
    ],
  },
];

const ServiceCard: React.FC<{ service: Service; category: string }> = ({
  service,
  category,
}) => {
  // Função para determinar o texto do botão
  const getButtonText = (category: string) => {
    return category === "Renting" ? "Saiba Mais" : "Fale Conosco";
  };

  // Função para determinar o link do botão
  const getButtonLink = (category: string) => {
    return category === "Renting" ? "/servicos/renting" : "/contact";
  };

  // Função para determinar as classes CSS do botão
  const getButtonClasses = (category: string) => {
    const baseClasses =
      "inline-block px-5 py-2 rounded-full text-sm font-medium shadow-md transition";

    if (category === "Renting") {
      return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700`;
    } else {
      return `${baseClasses} bg-red-600 text-white hover:bg-red-700`;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="rounded-3xl border border-gray-200 p-6 shadow-xl bg-white transition-all hover:shadow-2xl hover:border-red-400 group">
      <div className="flex items-center gap-2 mb-4 text-primary">
        <BadgeCheck className="w-5 h-5 text-green-600" />
        <h3 className="text-xl font-bold">{service.title}</h3>
      </div>
      <p className="text-gray-600 mb-3 leading-relaxed">
        {service.description}
      </p>
      {service.items && (
        <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
          {service.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      <div className="mt-6 text-center">
        <a
          href={getButtonLink(category)}
          className={getButtonClasses(category)}>
          {getButtonText(category)}
        </a>
      </div>
    </motion.div>
  );
};

const Servicos: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Software":
        return <Cpu className="text-red-600 w-6 h-6" />;
      case "Hardware":
        return <Server className="text-red-600 w-6 h-6" />;
      default:
        return <ShieldCheck className="text-red-600 w-6 h-6" />;
    }
  };

  return (
    <>
      <section className="relative w-full h-64 md:h-96 mb-12">
        <img
          src="/banner-servicos.jpg"
          alt="Banner de Serviços"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold">
            Nossos Serviços
          </h1>
        </div>
      </section>

      <div className="px-6 py-12 md:px-20 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-4">
          Nossos <span className="text-red-600">Serviços</span>
        </motion.h1>
        <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto text-lg">
          Explore nossas soluções personalizadas em software e infraestrutura
          para potencializar o seu negócio.
        </p>

        {services.map((category, index) => (
          <section key={index} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              {getCategoryIcon(category.category)}
              <h2 className="text-2xl font-semibold text-red-600">
                {category.category}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.services.map((service, idx) => (
                <ServiceCard
                  key={idx}
                  service={service}
                  category={category.category}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default Servicos;
