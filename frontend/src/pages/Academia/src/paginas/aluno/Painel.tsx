/** @format */

import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle,
  Award,
  Heart,
  Eye,
  Download,
  Star,
  User,
  Settings,
  Calendar,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  Clock,
  Target,
  BarChart3,
} from "lucide-react";
import { AuthContext } from "../../contextos/AuthContext";
import api from "../../utils/api";

interface PerfilAluno {
  aluno: {
    id: number;
    nome: string;
    email: string;
    criado_em: string;
  };
  cursosInscritos: Array<{
    id: string;
    titulo: string;
    descricao: string;
    imagem?: string;
    status: string;
    data_conclusao?: string;
    data_inscricao: string;
  }>;
  cursosConcluidos: Array<any>;
  avaliacoes: Array<{
    id: number;
    nota: number;
    comentario: string;
    curso: string;
    criado_em: string;
  }>;
  favoritos: Array<{
    id: string;
    titulo: string;
    descricao: string;
    imagem?: string;
  }>;
  certificados: Array<{
    id: string;
    titulo: string;
    data_conclusao: string;
  }>;
}

// Dados mockados como fallback
const dadosMockados: PerfilAluno = {
  aluno: {
    id: 1,
    nome: "Aluno Exemplo",
    email: "aluno@exemplo.com",
    criado_em: new Date().toISOString(),
  },
  cursosInscritos: [
    {
      id: "1",
      titulo: "JavaScript Básico",
      descricao: "Aprenda os fundamentos do JavaScript",
      status: "em_andamento",
      data_inscricao: new Date().toISOString(),
    },
    {
      id: "2",
      titulo: "React.js Avançado",
      descricao: "Desenvolva aplicações modernas com React",
      status: "concluido",
      data_conclusao: new Date().toISOString(),
      data_inscricao: new Date().toISOString(),
    },
  ],
  cursosConcluidos: [
    {
      id: "2",
      titulo: "React.js Avançado",
      descricao: "Desenvolva aplicações modernas com React",
      status: "concluido",
      data_conclusao: new Date().toISOString(),
      data_inscricao: new Date().toISOString(),
    },
  ],
  avaliacoes: [
    {
      id: 1,
      nota: 9,
      comentario: "Excelente curso!",
      curso: "React.js Avançado",
      criado_em: new Date().toISOString(),
    },
  ],
  favoritos: [
    {
      id: "3",
      titulo: "Node.js Backend",
      descricao: "Desenvolva APIs robustas com Node.js",
    },
  ],
  certificados: [
    {
      id: "2",
      titulo: "React.js Avançado",
      data_conclusao: new Date().toISOString(),
    },
  ],
};

export default function AlunoPainel() {
  const [perfil, setPerfil] = useState<PerfilAluno | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [usandoDadosMockados, setUsandoDadosMockados] = useState(false);
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    try {
      setCarregando(true);
      setErro(null);

      console.log("Tentando carregar perfil do aluno...");
      const response = await api.get("/perfil-aluno");

      console.log("Resposta do perfil:", response.data);

      if (response.data.sucesso) {
        setPerfil(response.data.dados);
        setUsandoDadosMockados(false);
      } else {
        throw new Error(response.data.erro || "Erro ao carregar perfil");
      }
    } catch (error: any) {
      console.error("Erro ao carregar perfil:", error);

      // Se o erro for de autenticação ou autorização, mostrar erro específico
      if (error.response?.status === 401) {
        setErro("Sessão expirada. Faça login novamente.");
      } else if (error.response?.status === 403) {
        setErro(
          "Acesso negado. Você não tem permissão para acessar esta área."
        );
      } else if (error.response?.status === 500) {
        setErro("Erro no servidor. Usando dados de exemplo.");
        setPerfil(dadosMockados);
        setUsandoDadosMockados(true);
      } else {
        setErro("Erro ao carregar perfil. Usando dados de exemplo.");
        setPerfil(dadosMockados);
        setUsandoDadosMockados(true);
      }
    } finally {
      setCarregando(false);
    }
  };

  const baixarCertificado = async (cursoId: string) => {
    try {
      const response = await api.get(`/certificados/${cursoId}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `certificado-${cursoId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Erro ao baixar certificado");
    }
  };

  if (carregando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando seu perfil...</p>
        </div>
      </div>
    );
  }

  if (erro && !perfil) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Erro ao carregar perfil
          </h2>
          <p className="text-gray-600 mb-4">{erro}</p>
          <button
            onClick={carregarPerfil}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (!perfil) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Nenhum dado encontrado</p>
        </div>
      </div>
    );
  }

  // Calcular estatísticas
  const totalCursos = perfil.cursosInscritos.length;
  const cursosConcluidos = perfil.cursosConcluidos.length;
  const progresso =
    totalCursos > 0 ? (cursosConcluidos / totalCursos) * 100 : 0;
  const mediaAvaliacoes =
    perfil.avaliacoes.length > 0
      ? perfil.avaliacoes.reduce((acc, av) => acc + av.nota, 0) /
        perfil.avaliacoes.length
      : 0;

  return (
    <div className="space-y-6">
      {/* Header com Status */}
      {usandoDadosMockados && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="text-yellow-600" size={20} />
            <span className="text-yellow-800 font-medium">
              Dados de exemplo - Backend não disponível
            </span>
          </div>
        </motion.div>
      )}

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Cursos Inscritos
              </p>
              <p className="text-2xl font-bold text-gray-900">{totalCursos}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="text-green-500" size={16} />
              <span className="text-sm text-green-600">+2 este mês</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Cursos Concluídos
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {cursosConcluidos}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <Target className="text-blue-500" size={16} />
              <span className="text-sm text-blue-600">
                {progresso.toFixed(0)}% de progresso
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Certificados</p>
              <p className="text-2xl font-bold text-gray-900">
                {perfil.certificados.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Award className="text-yellow-600" size={24} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <Star className="text-yellow-500" size={16} />
              <span className="text-sm text-yellow-600">
                Conquistas obtidas
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Média Avaliações
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {mediaAvaliacoes.toFixed(1)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Star className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="text-purple-500" size={16} />
              <span className="text-sm text-purple-600">
                Baseado em {perfil.avaliacoes.length} avaliações
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Seções Principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cursos em Andamento */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Cursos em Andamento
            </h3>
            <Clock className="text-gray-400" size={20} />
          </div>
          <div className="space-y-4">
            {perfil.cursosInscritos
              .filter((curso) => curso.status === "em_andamento")
              .slice(0, 3)
              .map((curso) => (
                <div
                  key={curso.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="text-blue-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {curso.titulo}
                    </h4>
                    <p className="text-sm text-gray-600">Em andamento</p>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                    Continuar
                  </button>
                </div>
              ))}
            {perfil.cursosInscritos.filter(
              (curso) => curso.status === "em_andamento"
            ).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="mx-auto mb-2" size={32} />
                <p>Nenhum curso em andamento</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Certificados Recentes */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Certificados Recentes
            </h3>
            <Award className="text-gray-400" size={20} />
          </div>
          <div className="space-y-4">
            {perfil.certificados.slice(0, 3).map((certificado) => (
              <div
                key={certificado.id}
                className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Award className="text-yellow-600" size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {certificado.titulo}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Concluído em{" "}
                    {new Date(certificado.data_conclusao).toLocaleDateString(
                      "pt-BR"
                    )}
                  </p>
                </div>
                <button
                  onClick={() => baixarCertificado(certificado.id)}
                  className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-colors">
                  Baixar
                </button>
              </div>
            ))}
            {perfil.certificados.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Award className="mx-auto mb-2" size={32} />
                <p>Nenhum certificado ainda</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Atividade Recente */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Atividade Recente
          </h3>
          <Calendar className="text-gray-400" size={20} />
        </div>
        <div className="space-y-4">
          {perfil.avaliacoes.slice(0, 3).map((avaliacao) => (
            <div
              key={avaliacao.id}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="text-purple-600" size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">
                  Avaliação: {avaliacao.curso}
                </h4>
                <p className="text-sm text-gray-600">{avaliacao.comentario}</p>
                <p className="text-xs text-gray-500">
                  {new Date(avaliacao.criado_em).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="text-yellow-400 fill-yellow-400" size={16} />
                <span className="font-medium">{avaliacao.nota}</span>
              </div>
            </div>
          ))}
          {perfil.avaliacoes.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Star className="mx-auto mb-2" size={32} />
              <p>Nenhuma atividade recente</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
