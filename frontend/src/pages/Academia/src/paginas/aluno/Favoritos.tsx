/**
 * eslint-disable react-hooks/exhaustive-deps
 *
 * @format
 */

/** @format */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, BookOpen, Star, Clock, User, Eye, Trash2 } from "lucide-react";
import api from "../../utils/api";

interface CursoFavorito {
  id: string;
  titulo: string;
  descricao: string;
  imagem?: string;
  instrutor: string;
  duracao: number;
  avaliacao: number;
  alunos: number;
}

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState<CursoFavorito[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // Dados mockados como fallback
  const favoritosMock: CursoFavorito[] = [
    {
      id: "1",
      titulo: "JavaScript Completo",
      descricao: "Aprenda JavaScript do básico ao avançado",
      instrutor: "João Silva",
      duracao: 12,
      avaliacao: 4.8,
      alunos: 1250,
    },
    {
      id: "2",
      titulo: "React.js Avançado",
      descricao: "Desenvolva aplicações modernas com React",
      instrutor: "Maria Santos",
      duracao: 8,
      avaliacao: 4.9,
      alunos: 890,
    },
    {
      id: "3",
      titulo: "Node.js Backend",
      descricao: "Crie APIs robustas com Node.js",
      instrutor: "Pedro Costa",
      duracao: 10,
      avaliacao: 4.7,
      alunos: 650,
    },
  ];

  useEffect(() => {
    carregarFavoritos();
  });

  const carregarFavoritos = async () => {
    try {
      setCarregando(true);
      const response = await api.get("/favoritos");

      if (response.data.sucesso) {
        setFavoritos(response.data.favoritos);
      } else {
        throw new Error("Erro ao carregar favoritos");
      }
    } catch (error: any) {
      console.error("Erro ao carregar favoritos:", error);
      setFavoritos(favoritosMock);
      setErro("Usando dados de exemplo");
    } finally {
      setCarregando(false);
    }
  };

  const removerFavorito = async (cursoId: string) => {
    try {
      await api.delete(`/favoritos/${cursoId}`);
      setFavoritos(favoritos.filter((fav) => fav.id !== cursoId));
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
    }
  };

  if (carregando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando favoritos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Meus Favoritos
        </h1>
        <p className="text-gray-600">
          Cursos que você salvou para assistir depois
        </p>
      </div>

      {erro && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">{erro}</p>
        </div>
      )}

      {favoritos.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="mx-auto mb-4 text-gray-400" size={64} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Nenhum favorito ainda
          </h3>
          <p className="text-gray-600 mb-6">
            Explore nossos cursos e salve os que mais te interessam!
          </p>
          <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Explorar Cursos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritos.map((curso, index) => (
            <motion.div
              key={curso.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                <BookOpen className="text-white" size={48} />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {curso.titulo}
                  </h3>
                  <button
                    onClick={() => removerFavorito(curso.id)}
                    className="text-red-500 hover:text-red-700 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {curso.descricao}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <User size={16} className="mr-2" />
                    {curso.instrutor}
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={16} className="mr-2" />
                    {curso.duracao} horas
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <Star
                      size={16}
                      className="mr-2 text-yellow-400 fill-yellow-400"
                    />
                    {curso.avaliacao} ({curso.alunos} alunos)
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                    Assistir Agora
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
