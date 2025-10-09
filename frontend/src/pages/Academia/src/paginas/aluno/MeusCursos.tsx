/** @format */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../utils/api";

interface CursoInscrito {
  id: string;
  titulo: string;
  descricao: string;
  imagem?: string;
  status: string;
  data_conclusao?: string;
  data_inscricao: string;
  progresso?: number;
}

export default function MeusCursos() {
  const [cursos, setCursos] = useState<CursoInscrito[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    carregarCursos();
  }, []);

  const carregarCursos = async () => {
    try {
      const response = await api.get("/inscricoes/meus");
      if (response.data.sucesso) {
        setCursos(response.data.cursos);
      }
    } catch (error: any) {
      setErro(error.response?.data?.erro || "Erro ao carregar cursos");
    } finally {
      setCarregando(false);
    }
  };

  const marcarComoConcluido = async (cursoId: string) => {
    try {
      await api.patch(`/certificados/concluir/${cursoId}`);
      carregarCursos(); // Recarrega a lista
    } catch (error) {
      alert("Erro ao marcar curso como concluído");
    }
  };

  const cursosFiltrados = cursos.filter((curso) => {
    if (filtro === "todos") return true;
    if (filtro === "em_andamento") return curso.status !== "concluido";
    if (filtro === "concluidos") return curso.status === "concluido";
    return true;
  });

  if (carregando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Meus Cursos
                </h1>
                <p className="text-gray-600 mt-2">
                  Continue aprendendo onde parou
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500">
                  <option value="todos">Todos os Cursos</option>
                  <option value="em_andamento">Em Andamento</option>
                  <option value="concluidos">Concluídos</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Cursos */}
        <div className="container mx-auto px-4 py-6">
          {erro ? (
            <div className="text-center py-8">
              <p className="text-red-600">{erro}</p>
            </div>
          ) : cursosFiltrados.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum curso encontrado
              </h3>
              <p className="text-gray-600 mb-4">
                {filtro === "todos"
                  ? "Você ainda não se inscreveu em nenhum curso."
                  : filtro === "em_andamento"
                  ? "Você não tem cursos em andamento."
                  : "Você ainda não concluiu nenhum curso."}
              </p>
              <Link
                to="/academia/cursos"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Explorar Cursos
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cursosFiltrados.map((curso, index) => (
                <motion.div
                  key={curso.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Imagem do Curso */}
                  <div className="relative h-48 bg-gradient-to-br from-red-50 to-red-100">
                    {curso.imagem ? (
                      <img
                        src={curso.imagem}
                        alt={curso.titulo}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-red-400" />
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          curso.status === "concluido"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}>
                        {curso.status === "concluido"
                          ? "Concluído"
                          : "Em Andamento"}
                      </span>
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {curso.titulo}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {curso.descricao}
                    </p>

                    {/* Progresso */}
                    {curso.status !== "concluido" && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                          <span>Progresso</span>
                          <span>{curso.progresso || 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${curso.progresso || 0}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Informações */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="mr-1" size={14} />
                        <span>
                          Inscrito em{" "}
                          {new Date(curso.data_inscricao).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/academia/curso/${curso.id}`}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-center text-sm">
                        {curso.status === "concluido" ? "Revisar" : "Continuar"}
                      </Link>

                      {curso.status !== "concluido" && (
                        <button
                          onClick={() => marcarComoConcluido(curso.id)}
                          className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                          <CheckCircle size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
