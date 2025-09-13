/** @format */

import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Star, BookOpen, Calendar, Edit, Trash2, Plus } from "lucide-react";
import { AuthContext } from "../../contextos/AuthContext";
import api from "../../utils/api";

interface Avaliacao {
  id: number;
  nota: number;
  comentario: string;
  curso: string;
  criado_em: string;
}

export default function Avaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const { usuario } = useContext(AuthContext);

  // Dados mockados como fallback
  const avaliacoesMock: Avaliacao[] = [
    {
      id: 1,
      nota: 5,
      comentario: "Excelente curso! Conteúdo muito bem explicado e prático.",
      curso: "JavaScript Completo",
      criado_em: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      nota: 4,
      comentario: "Bom curso, mas poderia ter mais exercícios práticos.",
      curso: "React.js Avançado",
      criado_em: "2024-01-10T14:20:00Z",
    },
    {
      id: 3,
      nota: 5,
      comentario: "Incrível! Aprendi muito com este curso.",
      curso: "Node.js Backend",
      criado_em: "2024-01-05T09:15:00Z",
    },
  ];

  useEffect(() => {
    carregarAvaliacoes();
  }, []);

  const carregarAvaliacoes = async () => {
    try {
      setCarregando(true);
      const response = await api.get("/avaliacoes");

      if (response.data.sucesso) {
        setAvaliacoes(response.data.avaliacoes);
      } else {
        throw new Error("Erro ao carregar avaliações");
      }
    } catch (error: any) {
      console.error("Erro ao carregar avaliações:", error);
      setAvaliacoes(avaliacoesMock);
      setErro("Usando dados de exemplo");
    } finally {
      setCarregando(false);
    }
  };

  const renderStars = (nota: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < nota ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  if (carregando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando avaliações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Minhas Avaliações
        </h1>
        <p className="text-gray-600">
          Suas avaliações e comentários sobre os cursos
        </p>
      </div>

      {erro && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">{erro}</p>
        </div>
      )}

      {avaliacoes.length === 0 ? (
        <div className="text-center py-12">
          <Star className="mx-auto mb-4 text-gray-400" size={64} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Nenhuma avaliação ainda
          </h3>
          <p className="text-gray-600 mb-6">
            Complete um curso e deixe sua avaliação!
          </p>
          <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Ver Meus Cursos
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {avaliacoes.map((avaliacao, index) => (
            <motion.div
              key={avaliacao.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <BookOpen className="text-red-600" size={20} />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {avaliacao.curso}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      {renderStars(avaliacao.nota)}
                      <span className="ml-2 font-medium text-gray-900">
                        {avaliacao.nota}/5
                      </span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>
                        {new Date(avaliacao.criado_em).toLocaleDateString(
                          "pt-BR"
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  "{avaliacao.comentario}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
