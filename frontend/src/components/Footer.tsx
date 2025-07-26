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
      { nome: "Sobre Nós", url: "/quem-somos" },
      { nome: "Nossa História", url: "/quem-somos" },
      { nome: "Equipe", url: "/quem-somos" },
    ],
    servicos: [
      { nome: "Hardware", url: "/servicos/hardware" },
      { nome: "Software", url: "/servicos/software" },
      { nome: "Aluguel", url: "/servicos/renting" },
      { nome: "Academia", url: "/page/Academia/academia" },
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
    <footer className="bg-black relative z-10 shadow-2xl ">
      {/* Gradiente decorativo no topo do rodapé */}
      {/* <div className="absolute -top-8 left-0 w-full h-8 bg-gradient-to-t from-gray-200 to-transparent pointer-events-none rounded-t-2xl" /> */}
      <div className="container mx-auto px-6 pt-10 pb-12 relative z-10">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Logo e Endereço */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/">
              <img
                src="/images/Logos/logo footer.svg"
                alt="Envisio"
                className="h-14"
              />
            </Link>
            <p className="text-white text-sm max-w-sm">
              Condomínio Jardins do Talatona, Torre 5 - Nº 003 Distrito Urbano
              do Talatona, Luanda - Angola
            </p>
          </div>

          {/* Links Rápidos */}
          {Object.entries(footerLinks)
            .slice(0, 3)
            .map(([categoria, links]) => (
              <div key={categoria} className="space-y-4">
                <h3 className="text-sm font-semibold text-white uppercase">
                  {categoria}
                </h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.nome}>
                      <a
                        href={link.url}
                        className="text-white hover:text-white text-sm flex items-center gap-2">
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
            <p className="text-white text-sm">
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
                  className="text-white hover:text-white">
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
