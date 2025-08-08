/** @format */

// components/TabbedFeaturesPanel.tsx

import { useState } from "react";
import { rentingFeatures } from "../types/rentingFeatures.ts";

type Props = {
  slug: string;
};

export default function TabbedFeaturesPanel({ slug }: Props) {
  const recurso = rentingFeatures[slug];
  const abas = recurso.abas;
  const dados = recurso.dados;

  const [abaAtiva, setAbaAtiva] = useState(abas[0]);

  if (!abas?.length || !dados) return null;

  const { lista, imagem } = dados[abaAtiva] || { lista: [], imagem: "" };

  return (
    <div className="bg-white py-10 mt-10 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 px-4">
        Funcionalidades
      </h2>

      <div className="flex flex-col lg:flex-row gap-6 px-4">
        {/* Menu lateral ou superior */}
        <div className="w-full lg:w-1/2">
          {/* Abas */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-300">
            {abas.map((aba) => (
              <button
                key={aba}
                className={`px-4 py-2 text-sm font-semibold border-b-2 transition ${
                  abaAtiva === aba
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-600 border-transparent hover:border-gray-300"
                }`}
                onClick={() => setAbaAtiva(aba)}>
                {aba}
              </button>
            ))}
          </div>

          {/* Conteúdo da aba */}
          <ul className="space-y-4">
            {lista.map((item, idx) => (
              <li key={idx}>
                <strong className="block text-gray-800">{item.titulo}</strong>
                <p className="text-sm text-gray-600">{item.descricao}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Imagem à direita */}
        <div className="w-full lg:w-1/2">
          {imagem && (
            <img
              src={imagem}
              alt="Imagem da funcionalidade"
              className="rounded-md w-full h-auto object-cover border border-gray-200"
            />
          )}
        </div>
      </div>
    </div>
  );
}
