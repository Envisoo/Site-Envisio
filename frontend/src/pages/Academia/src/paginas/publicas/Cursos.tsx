/** @format */
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Heart,
  Eye,
  Star,
  Clock,
  Users,
  BookOpen,
  Download,
  Play,
  Calendar,
  MapPin,
  Bell,
  TrendingUp,
  Award,
  CheckCircle,
  X,
  ChevronDown,
  ChevronUp,
  Sliders,
  BarChart3,
} from "lucide-react";
import { useCursos } from "../../hooks/useCursos";
import { Curso } from "../../tipos/Curso";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Interface para os filtros
interface Filtros {
  precoMin?: string;
  precoMax?: string;
  duracaoMin?: string;
  duracaoMax?: string;
  nivel?: string;
  status?: string;
  certificado?: boolean;
  acessoVitalicio?: boolean;
  suporte?: boolean;
}

// Componente de estatísticas em tempo real
const EstatisticasTempoReal = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  const estatisticas = [
    {
      titulo: "Cursos Disponíveis",
      valor: 156,
      icone: BookOpen,
      cor: "bg-blue-500",
      descricao: "Cursos ativos no momento",
    },
    {
      titulo: "Estudantes Ativos",
      valor: 2847,
      icone: Users,
      cor: "bg-green-500",
      descricao: "Estudantes aprendendo",
    },
    {
      titulo: "Instrutores",
      valor: 23,
      icone: Award,
      cor: "bg-purple-500",
      descricao: "Especialistas certificados",
    },
    {
      titulo: "Certificados Emitidos",
      valor: 1893,
      icone: CheckCircle,
      cor: "bg-orange-500",
      descricao: "Certificados válidos",
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {estatisticas.map((stat, index) => (
        <motion.div
          key={stat.titulo}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {stat.titulo}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stat.valor.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">{stat.descricao}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.cor} text-white`}>
              <stat.icone size={24} />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Componente de filtros avançados
const FiltrosAvancados = ({
  filtros,
  setFiltros,
  mostrarFiltros,
  setMostrarFiltros,
}: {
  filtros: Filtros;
  setFiltros: (filtros: Filtros) => void;
  mostrarFiltros: boolean;
  setMostrarFiltros: (mostrar: boolean) => void;
}) => {
  return (
    <AnimatePresence>
      {mostrarFiltros && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Preço */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Faixa de Preço (Kz)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filtros.precoMin || ""}
                  onChange={(e) =>
                    setFiltros({ ...filtros, precoMin: e.target.value })
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filtros.precoMax || ""}
                  onChange={(e) =>
                    setFiltros({ ...filtros, precoMax: e.target.value })
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Duração */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duração (horas)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filtros.duracaoMin || ""}
                  onChange={(e) =>
                    setFiltros({ ...filtros, duracaoMin: e.target.value })
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filtros.duracaoMax || ""}
                  onChange={(e) =>
                    setFiltros({ ...filtros, duracaoMax: e.target.value })
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Nível */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nível
              </label>
              <select
                value={filtros.nivel || ""}
                onChange={(e) =>
                  setFiltros({ ...filtros, nivel: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Todos os níveis</option>
                <option value="iniciante">Iniciante</option>
                <option value="intermediario">Intermediário</option>
                <option value="avancado">Avançado</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filtros.status || ""}
                onChange={(e) =>
                  setFiltros({ ...filtros, status: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Todos os status</option>
                <option value="disponivel">Disponível</option>
                <option value="brevemente">Brevemente</option>
                <option value="desenvolvimento">Em Desenvolvimento</option>
              </select>
            </div>
          </div>

          {/* Filtros adicionais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="certificado"
                checked={filtros.certificado || false}
                onChange={(e) =>
                  setFiltros({ ...filtros, certificado: e.target.checked })
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="certificado" className="text-sm text-gray-700">
                Com certificado
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="acessoVitalicio"
                checked={filtros.acessoVitalicio || false}
                onChange={(e) =>
                  setFiltros({ ...filtros, acessoVitalicio: e.target.checked })
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="acessoVitalicio"
                className="text-sm text-gray-700">
                Acesso vitalício
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="suporte"
                checked={filtros.suporte || false}
                onChange={(e) =>
                  setFiltros({ ...filtros, suporte: e.target.checked })
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="suporte" className="text-sm text-gray-700">
                Com suporte
              </label>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={() => setFiltros({})}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
              Limpar filtros
            </button>
            <button
              onClick={() => setMostrarFiltros(false)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Aplicar filtros
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Componente de card de curso
const CursoCard = ({
  curso,
  onFavoritar,
  onQuickView,
  favoritos,
}: {
  curso: Curso;
  onFavoritar: (id: string) => void;
  onQuickView: (curso: Curso) => void;
  favoritos: string[];
}) => {
  const [ref, inView] = useInView({ triggerOnce: true });
  const isFavorito = favoritos.includes(curso.id);
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "disponivel":
        return "bg-green-100 text-green-800";
      case "brevemente":
        return "bg-yellow-100 text-yellow-800";
      case "desenvolvimento":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "disponivel":
        return "Disponível";
      case "brevemente":
        return "Brevemente";
      case "desenvolvimento":
        return "Em Desenvolvimento";
      default:
        return "Indisponível";
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Imagem do curso */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              curso.status
            )}`}>
            {getStatusText(curso.status)}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={() => onFavoritar(curso.id)}
            className={`p-2 rounded-full transition-all duration-200 ${
              isFavorito
                ? "bg-red-500 text-white"
                : "bg-white bg-opacity-80 text-gray-700 hover:bg-red-500 hover:text-white"
            }`}>
            <Heart size={16} fill={isFavorito ? "currentColor" : "none"} />
          </button>
          <button
            onClick={() => onQuickView(curso)}
            className="p-2 rounded-full bg-white bg-opacity-80 text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-200">
            <Eye size={16} />
          </button>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center space-x-2 text-white">
            <Star size={16} fill="currentColor" />
            <span className="text-sm font-medium">{curso.avaliacao}</span>
          </div>
        </div>
      </div>

      {/* Conteúdo do card */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3
            onClick={() => navigate(`/academia/curso/${curso.id}`)}
            className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer">
            {curso.titulo}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {curso.descricao}
        </p>

        {/* Métricas do curso */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock size={14} />
            <span>{curso.duracao}h</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users size={14} />
            <span>{curso.instrutor?.alunos || 0} alunos</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <BookOpen size={14} />
            <span>{curso.instrutor?.aulas || 0} aulas</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Eye size={14} />
            <span>{curso.visualizacoes || 0} visualizações</span>
          </div>
        </div>

        {/* Recursos do curso */}
        <div className="flex flex-wrap gap-2 mb-4">
          {curso.certificado && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Certificado
            </span>
          )}
          {curso.acessoVitalicio && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              Acesso vitalício
            </span>
          )}
          {curso.suporte && (
            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
              Suporte
            </span>
          )}
        </div>

        {/* Preço e ação */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              {curso.preco?.toLocaleString()} Kz
            </span>
            {curso.preco && curso.preco > 0 && (
              <span className="text-sm text-gray-500 line-through ml-2">
                {(curso.preco * 1.2).toLocaleString()} Kz
              </span>
            )}
          </div>
          <button
            onClick={() => navigate(`/academia/curso/${curso.id}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Detalhes
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Componente de modal de visualização rápida
const QuickViewModal = ({
  curso,
  isOpen,
  onClose,
}: {
  curso: Curso | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen || !curso) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h2
                // Removido o onClick que usava 'navigate' não definido
                className="text-2xl font-bold text-gray-900">
                {curso.titulo}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4" />
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock size={16} />
                    <span>Duração: {curso.duracao} horas</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Star size={16} />
                    <span>Avaliação: {curso.avaliacao}/5</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users size={16} />
                    <span>{curso.instrutor?.alunos || 0} alunos inscritos</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Descrição
                </h3>
                <p className="text-gray-600 text-sm mb-4">{curso.descricao}</p>

                <div className="space-y-2 mb-4">
                  {curso.certificado && (
                    <div className="flex items-center space-x-2 text-sm text-green-600">
                      <CheckCircle size={16} />
                      <span>Certificado incluído</span>
                    </div>
                  )}
                  {curso.acessoVitalicio && (
                    <div className="flex items-center space-x-2 text-sm text-blue-600">
                      <CheckCircle size={16} />
                      <span>Acesso vitalício</span>
                    </div>
                  )}
                  {curso.suporte && (
                    <div className="flex items-center space-x-2 text-sm text-purple-600">
                      <CheckCircle size={16} />
                      <span>Suporte incluído</span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      {curso.preco?.toLocaleString()} Kz
                    </span>
                    {curso.preco && curso.preco > 0 && (
                      <span className="text-sm text-gray-500 line-through">
                        {(curso.preco * 1.2).toLocaleString()} Kz
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      (window.location.href = `/academia/curso/${curso.id}`)
                    }
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    {curso.status === "disponivel"
                      ? "Inscrever-se agora"
                      : "Lista de espera"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Componente de newsletter para cursos brevemente
const NewsletterCursosBrevemente = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success(
        "Inscrito com sucesso! Será notificado quando novos cursos estiverem disponíveis."
      );
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
      <div className="text-center">
        <Bell size={48} className="mx-auto mb-4 text-blue-200" />
        <h3 className="text-2xl font-bold mb-2">Fique por dentro!</h3>
        <p className="text-blue-100 mb-6">
          Inscreva-se para ser notificado quando novos cursos estiverem
          disponíveis
        </p>

        {!isSubscribed ? (
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu email"
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-blue-600 rounded-r-lg font-medium hover:bg-gray-100 transition-colors">
                Inscrever
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-center justify-center space-x-2 text-green-200">
            <CheckCircle size={20} />
            <span>Inscrito com sucesso!</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Componente principal
export default function Cursos() {
  const { cursos, carregando, erro } = useCursos();
  const [filtros, setFiltros] = useState<Filtros>({});
  const [ordenacao, setOrdenacao] = useState("relevancia");
  const [visualizacao, setVisualizacao] = useState("grid");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [cursoSelecionado, setCursoSelecionado] = useState<Curso | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [busca, setBusca] = useState("");

  // Filtrar e ordenar cursos
  const cursosFiltrados = useMemo(() => {
    let filtrados = cursos.filter((curso: Curso) => {
      // Filtro de busca
      if (
        busca &&
        !curso.titulo.toLowerCase().includes(busca.toLowerCase()) &&
        !curso.descricao.toLowerCase().includes(busca.toLowerCase())
      ) {
        return false;
      }

      // Filtros avançados
      if (filtros.precoMin && curso.preco < Number(filtros.precoMin))
        return false;
      if (filtros.precoMax && curso.preco > Number(filtros.precoMax))
        return false;
      if (filtros.duracaoMin && curso.duracao < Number(filtros.duracaoMin))
        return false;
      if (filtros.duracaoMax && curso.duracao > Number(filtros.duracaoMax))
        return false;
      if (filtros.nivel && curso.nivel !== filtros.nivel) return false;
      if (filtros.status && curso.status !== filtros.status) return false;
      if (filtros.certificado && !curso.certificado) return false;
      if (filtros.acessoVitalicio && !curso.acessoVitalicio) return false;
      if (filtros.suporte && !curso.suporte) return false;

      return true;
    });

    // Ordenação
    switch (ordenacao) {
      case "avaliacao":
        filtrados.sort((a, b) => b.avaliacao - a.avaliacao);
        break;
      case "preco":
        filtrados.sort((a, b) => a.preco - b.preco);
        break;
      case "duracao":
        filtrados.sort((a, b) => a.duracao - b.duracao);
        break;
      case "popularidade":
        filtrados.sort(
          (a, b) => (b.visualizacoes || 0) - (a.visualizacoes || 0)
        );
        break;
      default:
        // Relevância (mantém ordem original)
        break;
    }

    return filtrados;
  }, [cursos, filtros, ordenacao, busca]);

  // Separar cursos por status
  const cursosDisponiveis = cursosFiltrados.filter(
    (curso: Curso) => curso.status === "disponivel"
  );
  const cursosBrevemente = cursosFiltrados.filter(
    (curso: Curso) => curso.status === "brevemente"
  );
  const cursosDesenvolvimento = cursosFiltrados.filter(
    (curso: Curso) => curso.status === "desenvolvimento"
  );

  const handleFavoritar = (cursoId: string) => {
    setFavoritos((prev) =>
      prev.includes(cursoId)
        ? prev.filter((id) => id !== cursoId)
        : [...prev, cursoId]
    );
    toast.success("Lista de favoritos atualizada!");
  };

  const handleQuickView = (curso: Curso) => {
    setCursoSelecionado(curso);
    setModalAberto(true);
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando cursos...</p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <BookOpen size={48} className="mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Erro ao carregar cursos
          </h2>
          <p className="text-gray-600">Tente novamente mais tarde.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-4">
            Explore Nossos Cursos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra cursos de alta qualidade ministrados por especialistas
            certificados. Aprenda no seu ritmo e desenvolva habilidades valiosas
            para o mercado angolano.
          </motion.p>
        </div>

        {/* Estatísticas em tempo real */}
        <EstatisticasTempoReal />

        {/* Barra de ferramentas */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Busca */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Buscar cursos..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Controles */}
            <div className="flex items-center space-x-4">
              {/* Filtros */}
              <button
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Sliders size={16} />
                <span>Filtros</span>
                {mostrarFiltros ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              {/* Ordenação */}
              <select
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="relevancia">Mais relevantes</option>
                <option value="avaliacao">Melhor avaliados</option>
                <option value="preco">Menor preço</option>
                <option value="duracao">Menor duração</option>
                <option value="popularidade">Mais populares</option>
              </select>

              {/* Visualização */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setVisualizacao("grid")}
                  className={`p-2 ${
                    visualizacao === "grid"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}>
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setVisualizacao("list")}
                  className={`p-2 ${
                    visualizacao === "list"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}>
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros avançados */}
        <FiltrosAvancados
          filtros={filtros}
          setFiltros={setFiltros}
          mostrarFiltros={mostrarFiltros}
          setMostrarFiltros={setMostrarFiltros}
        />

        {/* Resultados */}
        <div className="space-y-8">
          {/* Cursos Disponíveis */}
          {cursosDisponiveis.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Cursos Disponíveis
                </h2>
                <span className="text-sm text-gray-600">
                  {cursosDisponiveis.length} cursos
                </span>
              </div>
              <div
                className={`grid gap-6 ${
                  visualizacao === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}>
                {cursosDisponiveis.map((curso: Curso) => (
                  <CursoCard
                    key={curso.id}
                    curso={curso}
                    onFavoritar={handleFavoritar}
                    onQuickView={handleQuickView}
                    favoritos={favoritos}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Cursos Brevemente */}
          {cursosBrevemente.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Cursos Brevemente
                </h2>
                <span className="text-sm text-gray-600">
                  {cursosBrevemente.length} cursos
                </span>
              </div>
              <div
                className={`grid gap-6 ${
                  visualizacao === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}>
                {cursosBrevemente.map((curso: Curso) => (
                  <CursoCard
                    key={curso.id}
                    curso={curso}
                    onFavoritar={handleFavoritar}
                    onQuickView={handleQuickView}
                    favoritos={favoritos}
                  />
                ))}
              </div>
              <div className="mt-8">
                <NewsletterCursosBrevemente />
              </div>
            </section>
          )}

          {/* Cursos em Desenvolvimento */}
          {cursosDesenvolvimento.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Cursos em Desenvolvimento
                </h2>
                <span className="text-sm text-gray-600">
                  {cursosDesenvolvimento.length} cursos
                </span>
              </div>
              <div
                className={`grid gap-6 ${
                  visualizacao === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}>
                {cursosDesenvolvimento.map((curso: Curso) => (
                  <CursoCard
                    key={curso.id}
                    curso={curso}
                    onFavoritar={handleFavoritar}
                    onQuickView={handleQuickView}
                    favoritos={favoritos}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Nenhum resultado */}
          {cursosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhum curso encontrado
              </h3>
              <p className="text-gray-600 mb-4">
                Tente ajustar os filtros ou termos de busca.
              </p>
              <button
                onClick={() => {
                  setFiltros({});
                  setBusca("");
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de visualização rápida */}
      <QuickViewModal
        curso={cursoSelecionado}
        isOpen={modalAberto}
        onClose={() => {
          setModalAberto(false);
          setCursoSelecionado(null);
        }}
      />
    </div>
  );
}
