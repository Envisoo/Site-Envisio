/** @format */

import React, { useState, useEffect } from "react";
import { rentingFeatures, FeatureItem } from "../types/rentingFeatures";
import PrinterSelector from "./PrinterSelector";

interface Props {
  tipo: string;
}

export default function RentingFeaturesPanel({ tipo }: Props) {
  const [selectedPrinter, setSelectedPrinter] = useState<string>("bizhub301i");
  const effectiveTipo = tipo === "impressoras" ? selectedPrinter : tipo;

  const { abas, dados } = rentingFeatures[effectiveTipo] || {
    abas: [],
    dados: {},
  };
  const [abaAtiva, setAbaAtiva] = useState<string>(abas?.[0] || "");

  useEffect(() => {
    if (abas?.length > 0) {
      setAbaAtiva(abas[0]);
    }
  }, [effectiveTipo, abas]);

  if (!abas?.length || !dados) return null;

  const { lista } = dados[abaAtiva] || { lista: [] };

  return (
    <div className="bg-white py-10 mt-10 border-t border-gray-200">
      <div className="px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Funcionalidades
        </h2>
      </div>

      {tipo === "impressoras" && (
        <div className="-mt-2 border-b border-gray-200">
          <PrinterSelector
            selectedPrinter={selectedPrinter}
            onSelectPrinter={setSelectedPrinter}
          />
        </div>
      )}

      <div className="px-4 mt-6">
        <div className="flex flex-wrap -mb-px border-b border-gray-200">
          {abas.map((aba: string) => (
            <button
              key={aba}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                abaAtiva === aba
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setAbaAtiva(aba)}>
              {aba}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <ul className="space-y-4">
            {lista.map((item: FeatureItem, idx: number) => (
              <li key={idx} className="pb-3 last:pb-0">
                <strong className="block text-gray-800 mb-1">
                  {item.titulo}
                </strong>
                <p className="text-sm text-gray-600">{item.descricao}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
