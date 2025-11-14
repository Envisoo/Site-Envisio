/** @format */

import React, { useState, useEffect } from "react";
import { rentingFeatures, FeatureItem } from "../types/rentingFeatures";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  tipo: string;
}

export default function RentingFeaturesPanel({ tipo }: Props) {
  // Normalize the printer name by removing spaces for the lookup
  const getNormalizedPrinterName = (name: string) => {
    const printerMap: Record<string, string> = {
      "bizhub-c250i": "bizhubC250i",
      "bizhub-c3350i": "bizhubC3350i",
      "bizhub-c3351i": "bizhubC3351i",
      "bizhub-c4050i": "bizhubC4050i",
    };

    // Se o nome já estiver no formato correto, retorna ele mesmo
    if (printerMap[name]) {
      return printerMap[name];
    }

    // Caso contrário, tenta normalizar o nome
    return name.replace(/\s+/g, "");
  };

  // Determina o tipo efetivo baseado no prop 'tipo' recebido
  const effectiveTipo = getNormalizedPrinterName(tipo);

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

  if (!abas?.length || !dados) {
    return <div></div>;
  }

  const { lista } = dados[abaAtiva] || { lista: [] };

  // Efeito para atualizar a aba ativa quando o tipo da impressora mudar
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (abas && abas.length > 0) {
      setAbaAtiva(abas[0]);
    }
  }, [tipo, abas]);

  return (
    <div className="bg-white py-10 mt-10 border-t border-gray-200">
      <div className="px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Funcionalidades da{" "}
          {tipo.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
        </h2>
      </div>

      <div className="px-4 mt-6">
        {/* Abas de navegação */}
        <div className="flex flex-wrap -mb-px border-b border-gray-200 overflow-x-auto">
          {abas.map((aba: string) => (
            <button
              key={aba}
              className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                abaAtiva === aba
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setAbaAtiva(aba)}>
              {aba}
            </button>
          ))}
        </div>

        {/* Conteúdo das abas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={abaAtiva}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-6">
            <ul className="space-y-4">
              {lista.map((item: FeatureItem, idx: number) => (
                <motion.li
                  key={idx}
                  className="pb-3 last:pb-0 border-b border-gray-100 last:border-0"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}>
                  <strong className="block text-gray-800 mb-1 text-lg">
                    {item.titulo}
                  </strong>
                  <p className="text-gray-600">{item.descricao}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
