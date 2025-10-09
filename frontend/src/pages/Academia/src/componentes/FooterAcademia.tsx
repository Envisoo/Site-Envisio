/** @format */

import { Link } from "react-router-dom";

export default function FooterAcademia() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
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
