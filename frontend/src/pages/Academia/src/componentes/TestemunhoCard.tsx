/** @format */

import { Star } from "lucide-react";

interface Testemunho {
  nome: string;
  cargo: string;
  texto: string;
  avaliacao: number;
  avatar: string;
}

export default function TestemunhoCard({
  testemunho,
}: {
  testemunho: Testemunho;
}) {
  return (
    <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
      <div className="flex items-center mb-4">
        <img
          src={testemunho.avatar}
          alt={testemunho.nome}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold">{testemunho.nome}</h4>
          <p className="text-sm text-indigo-200">{testemunho.cargo}</p>
        </div>
      </div>
      <p className="mb-4 italic">"{testemunho.texto}"</p>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < testemunho.avaliacao
                ? "text-amber-400 fill-amber-400"
                : "text-gray-400"
            }
          />
        ))}
      </div>
    </div>
  );
}
