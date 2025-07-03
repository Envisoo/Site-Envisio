/** @format */

// src/components/Footer.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface BaseLink {
  nome: string;
  url: string;
}

interface LinkWithIcon extends BaseLink {
  icon?: string;
}

export default function Footer() {
  const footerLinks: Record<string, LinkWithIcon[]> = {
    empresa: [
      { nome: "Sobre Nós", url: "/sobre" },
      { nome: "Nossa História", url: "/historia" },
      { nome: "Equipe", url: "/equipe" },
    ],
    servicos: [
      { nome: "Contabilidade", url: "/servicos/contabilidade" },
      { nome: "Consultoria", url: "/servicos/consultoria" },
      { nome: "Tecnologia", url: "/servicos/tecnologia" },
      { nome: "Academia", url: "/academia" },
    ],
    contato: [
      { nome: "+244 947 137 676", url: "tel:+244947137676", icon: "📞" },
      {
        nome: "geral@envisio.co.ao",
        url: "mailto:geral@envisio.co.ao",
        icon: "📧",
      },
    ],
    social: [
      { nome: "LinkedIn", url: "#", icon: "linkedin" },
      { nome: "Instagram", url: "#", icon: "instagram" },
      { nome: "Facebook", url: "#", icon: "facebook" },
    ],
  };

  return (
    <footer className="bg-white relative z-10 shadow-2xl border-t border-gray-200">
      {/* Gradiente decorativo no topo do rodapé */}
      {/* <div className="absolute -top-8 left-0 w-full h-8 bg-gradient-to-t from-gray-200 to-transparent pointer-events-none rounded-t-2xl" /> */}
      <div className="container mx-auto px-6 pt-40 pb-12 relative z-10">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Logo e Endereço */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/">
              <img src="/images/logo.jpg" alt="Envisio" className="h-8" />
            </Link>
            <p className="text-gray-600 text-sm max-w-sm">
              Condomínio Jardins do Talatona, Torre 5 - Nº 003 Distrito Urbano
              do Talatona, Luanda - Angola
            </p>
          </div>

          {/* Links Rápidos */}
          {Object.entries(footerLinks)
            .slice(0, 3)
            .map(([categoria, links]) => (
              <div key={categoria} className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase">
                  {categoria}
                </h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.nome}>
                      <a
                        href={link.url}
                        className="text-gray-600 hover:text-gray-900 text-sm flex items-center gap-2">
                        {link.icon && <span>{link.icon}</span>}
                        {link.nome}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>

        {/* Linha Separadora e Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Envisio. Todos os direitos
              reservados.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((rede) => (
                <a
                  key={rede.nome}
                  href={rede.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600">
                  <span className="text-xl">{rede.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
