/** @format */

import { Link } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";

export default function FooterAcademia() {
  const linksRapidos = [
    { nome: "Sobre Nós", rota: "/academia/sobre" },
    { nome: "Nossos Cursos", rota: "/academia/cursos" },
    { nome: "Instrutores", rota: "/academia/instrutores" },
    { nome: "Certificados", rota: "/academia/certificados" },
    { nome: "Política de Privacidade", rota: "/academia/privacidade" },
    { nome: "Termos de Uso", rota: "/academia/termos" },
  ];

  const categorias = [
    "Programação",
    "Design",
    "Marketing",
    "Negócios",
    "Finanças",
    "Idiomas",
    "TI & Redes",
  ];

  const redesSociais = [
    { nome: "Facebook", icone: <Facebook size={20} />, url: "#" },
    { nome: "Instagram", icone: <Instagram size={20} />, url: "#" },
    { nome: "Twitter", icone: <Twitter size={20} />, url: "#" },
    { nome: "LinkedIn", icone: <Linkedin size={20} />, url: "#" },
    { nome: "YouTube", icone: <Youtube size={20} />, url: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <GraduationCap className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold">Academia</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transforme sua carreira com nossos cursos online de alta
              qualidade. Aprenda com especialistas e obtenha certificados
              reconhecidos pelo mercado.
            </p>
            <div className="flex space-x-4">
              {redesSociais.map((rede) => (
                <a
                  key={rede.nome}
                  href={rede.url}
                  className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
                  {rede.icone}
                </a>
              ))}
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              {linksRapidos.map((link) => (
                <li key={link.nome}>
                  <Link
                    to={link.rota}
                    className="text-gray-300 hover:text-red-400 transition-colors">
                    {link.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Categorias</h3>
            <ul className="space-y-3">
              {categorias.map((categoria) => (
                <li key={categoria}>
                  <Link
                    to={`/academia/cursos?categoria=${categoria.toLowerCase()}`}
                    className="text-gray-300 hover:text-red-400 transition-colors">
                    {categoria}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="text-red-400" size={20} />
                <span className="text-gray-300">contato@academia.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-red-400" size={20} />
                <span className="text-gray-300">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-red-400" size={20} />
                <span className="text-gray-300">São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div>
        </div>

        {/* Linha de Separação */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Academia. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors text-sm">
                <span>Voltar ao Site Principal</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
