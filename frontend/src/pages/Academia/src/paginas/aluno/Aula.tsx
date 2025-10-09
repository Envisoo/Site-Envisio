/** @format */

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Play,
  SkipBack,
  SkipForward,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Heart,
  Share2,
  Download,
  Eye,
} from "lucide-react";
import api from "../../utils/api";

interface Licao {
  id: number;
  titulo: string;
  conteudo: string;
  ordem: number;
  modulo_id: number;
}

interface Modulo {
  id: number;
  titulo: string;
  descricao: string;
  curso_id: number;
}

interface Curso {
  id: string;
  titulo: string;
  descricao: string;
  instrutor: string;
}

export default function Aula() {
  const { id, moduloId, licaoId } = useParams();
  const navigate = useNavigate();
  const [licao, setLicao] = useState<Licao | null>(null);
  const [modulo] = useState<Modulo | null>(null);
  const [curso] = useState<Curso | null>(null);
  const [licoes, setLicoes] = useState<Licao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [, setProgresso] = useState(0);
  const [tempoAssistido, setTempoAssistido] = useState(0);

  useEffect(() => {
    if (moduloId) {
      carregarLicoes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduloId]);

  useEffect(() => {
    if (licaoId) {
      carregarLicao();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [licaoId]);

  const carregarLicoes = async () => {
    try {
      const response = await api.get(`/licoes/${moduloId}`);
      if (response.data.sucesso) {
        setLicoes(response.data.licoes);
        if (response.data.licoes.length > 0 && !licaoId) {
          // Se não há lição específica, carrega a primeira
          setLicao(response.data.licoes[0]);
        }
      }
    } catch (error: any) {
      setErro(error.response?.data?.erro || "Erro ao carregar lições");
    } finally {
      setCarregando(false);
    }
  };

  const carregarLicao = async () => {
    try {
      const licaoAtual = licoes.find((l) => l.id.toString() === licaoId);
      if (licaoAtual) {
        setLicao(licaoAtual);
        setProgresso(0);
        setTempoAssistido(0);
      }
    } catch (error: any) {
      setErro("Erro ao carregar lição");
    }
  };

  const proximaLicao = () => {
    if (!licao) return;
    const indexAtual = licoes.findIndex((l) => l.id === licao.id);
    if (indexAtual < licoes.length - 1) {
      const proxima = licoes[indexAtual + 1];
      navigate(`/academia/curso/${id}/modulo/${moduloId}/licao/${proxima.id}`);
    }
  };

  const licaoAnterior = () => {
    if (!licao) return;
    const indexAtual = licoes.findIndex((l) => l.id === licao.id);
    if (indexAtual > 0) {
      const anterior = licoes[indexAtual - 1];
      navigate(`/academia/curso/${id}/modulo/${moduloId}/licao/${anterior.id}`);
    }
  };

  const marcarComoConcluida = async () => {
    try {
      await api.patch(`/certificados/concluir/${id}`);
      alert("Lição marcada como concluída!");
    } catch (error) {
      alert("Erro ao marcar lição como concluída");
    }
  };

  if (carregando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Erro</h2>
          <p className="text-gray-600">{erro}</p>
        </div>
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
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  to={`/academia/curso/${id}`}
                  className="text-gray-600 hover:text-gray-900">
                  <ArrowLeft size={20} />
                </Link>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {licao?.titulo}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {modulo?.titulo} • {curso?.titulo}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-gray-900">
                  <Heart size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900">
                  <Share2 size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900">
                  <Download size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Conteúdo Principal */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Player de Vídeo (simulado) */}
                <div className="relative h-64 bg-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Play className="mx-auto h-16 w-16 mb-4" />
                      <p className="text-lg font-medium">Player de Vídeo</p>
                      <p className="text-sm text-gray-300">{licao?.titulo}</p>
                    </div>
                  </div>

                  {/* Controles */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button className="text-white hover:text-gray-300">
                          <SkipBack size={20} />
                        </button>
                        <button className="text-white hover:text-gray-300">
                          <Play size={20} />
                        </button>
                        <button className="text-white hover:text-gray-300">
                          <SkipForward size={20} />
                        </button>
                      </div>
                      <div className="text-white text-sm">
                        {tempoAssistido}s / 15:30
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conteúdo da Lição */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {licao?.titulo}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={marcarComoConcluida}
                        className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200">
                        <CheckCircle className="mr-1" size={16} />
                        Marcar como Concluída
                      </button>
                    </div>
                  </div>

                  <div className="prose max-w-none">
                    <div
                      className="text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: licao?.conteudo || "",
                      }}
                    />
                  </div>

                  {/* Navegação */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                    <button
                      onClick={licaoAnterior}
                      disabled={
                        licoes.findIndex((l) => l.id === licao?.id) === 0
                      }
                      className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed">
                      <ArrowLeft className="mr-2" size={16} />
                      Lição Anterior
                    </button>

                    <div className="text-sm text-gray-500">
                      {licoes.findIndex((l) => l.id === licao?.id) + 1} de{" "}
                      {licoes.length}
                    </div>

                    <button
                      onClick={proximaLicao}
                      disabled={
                        licoes.findIndex((l) => l.id === licao?.id) ===
                        licoes.length - 1
                      }
                      className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed">
                      Próxima Lição
                      <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900 mb-4">
                  Lições do Módulo
                </h3>
                <div className="space-y-2">
                  {licoes.map((licaoItem, index) => (
                    <button
                      key={licaoItem.id}
                      onClick={() =>
                        navigate(
                          `/academia/curso/${id}/modulo/${moduloId}/licao/${licaoItem.id}`
                        )
                      }
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        licaoItem.id === licao?.id
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : "hover:bg-gray-50"
                      }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium mr-3">
                            {index + 1}
                          </div>
                          <span className="text-sm font-medium">
                            {licaoItem.titulo}
                          </span>
                        </div>
                        {licaoItem.id === licao?.id && (
                          <Eye className="text-red-600" size={16} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
