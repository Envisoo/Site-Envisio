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
import { useModulos } from "../../hooks/useModulos";

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

// Componente de card de curso
const CursoCard = ({
  curso,
  onFavoritar,
  onQuickView,
  favoritos,
  navigate,
  destino,
}: {
  curso: Curso;
  onFavoritar: (id: string) => void;
  onQuickView: (curso: Curso) => void;
  favoritos: string[];
  navigate: any;
  destino?: string;
}) => {
  const [ref, inView] = useInView({ triggerOnce: true });
  const isFavorito = favoritos.includes(curso.id);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  // Show the "Ver mais" button only if the description is long enough
  const shouldShowVerMais = (curso?.descricao?.length ?? 0) > 140;

  // Destino customizado para cursos específicos
  const getDestinoCurso = (c: Curso) => {
    const id = String((c as any)?.id ?? "")
      .toLowerCase()
      .trim();
    const titulo = String((c as any)?.titulo ?? "").toLowerCase();
    // Ajuste as condições conforme o seu dado real
    if (
      id === "react-completo" ||
      titulo.includes("react completo") ||
      titulo.includes("react completo")
    ) {
      return "/academia/curso2";
    }

    if (
      id === "javascript-basico-ao-avancado" ||
      titulo.includes("javascript-basico-ao-avancado") ||
      titulo.includes("javascript-basico-ao-avancado")
    ) {
      return "/academia/curso1";
    }
    return `/academia/curso/${c.id}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "disponivel":
        return "bg-red-100 text-red-800";
      case "brevemente":
        return "bg-amber-100 text-amber-800";
      case "desenvolvimento":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "disponivel":
        return "Disponível";
      case "brevemente":
        return "Em Breve";
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
      whileHover={{
        y: -5,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative bg-white rounded-[5px] overflow-hidden group cursor-pointer flex flex-col h-full border border-gray-100 hover:shadow-md transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {/* Imagem do curso sem overlay */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <motion.img
          src={
            curso.imagemUrl ||
            "https://source.unsplash.com/random/400x300/?course"
          }
          alt={curso.titulo}
          className="w-full h-full object-cover transform transition-transform duration-500"
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
        />

        {/* Badge de status */}
        <div className="absolute top-4 left-4 z-20">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              curso.status
            )}`}>
            {getStatusText(curso.status)}
          </span>
        </div>
      </div>

      {/* Conteúdo do card */}
      <div className="p-6 flex flex-col flex-grow">
        <h3
          onClick={() => navigate(destino ?? getDestinoCurso(curso))}
          className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors mb-2">
          {curso.titulo}
        </h3>

        <div className="relative">
          <p
            className={`text-gray-600 text-sm mb-1 transition-all duration-300 ${
              isExpanded ? "" : "line-clamp-3"
            }`}>
            {curso.descricao || "Sem descrição disponível"}
          </p>
          {shouldShowVerMais && (
            <button
              className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center mt-2"
              onClick={() => setIsExpanded((v) => !v)}>
              {isExpanded ? "Ver menos" : "Ver mais"}
              <ChevronDown
                size={16}
                className={`ml-1 transition-transform duration-200 ${
                  isExpanded ? "transform rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>

        {/* Botão de ação principal */}
        <div className="mt-auto pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(destino ?? getDestinoCurso(curso))}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-[5px] font-medium text-sm hover:shadow-lg hover:shadow-red-100 transition-all duration-300 flex items-center justify-center space-x-2 border border-red-600">
            <span>Ver Detalhes</span>
            <motion.span
              animate={{ x: isHovered ? 3 : 0 }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatType: "reverse",
              }}>
              →
            </motion.span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Componente principal
export default function Cursos() {
  const { cursos, carregando, erro } = useCursos();
  const [filtros, setFiltros] = useState<Filtros>({});
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [cursoSelecionado, setCursoSelecionado] = useState<Curso | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [busca, setBusca] = useState("");
  const { modulos, carregando: carregandoModulos } = useModulos(
    cursoSelecionado?.id
  );
  const navigate = useNavigate();

  // Filtrar e ordenar cursos
  const cursosFiltrados = useMemo(() => {
    return cursos.filter((curso: Curso) => {
      // Filtro de busca
      if (
        busca &&
        !curso.titulo.toLowerCase().includes(busca.toLowerCase()) &&
        !curso.descricao.toLowerCase().includes(busca.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [cursos, busca]);

  // Separar cursos por status
  const cursosDisponiveis = cursosFiltrados.filter(
    (curso: Curso) => curso.status === "disponivel"
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

  // Overrides fixos para os 4 cards exibidos
  const getCardOverride = (index: number) => {
    switch (index) {
      case 0:
        return {
          id: "cegid-primavera",
          titulo: "Cegid Primavera",
          descricao:
            "Domine o Cegid Primavera: conceitos, parametrização e boas práticas no ERP.",
          categoria: "Gestão/ERP",
          imagemUrl: "/academia/Primavera.jpg",
        } as Partial<Curso>;
      case 1:
        return {
          id: "programacao-web-frontend",
          titulo: "Programação Web Frontend",
          descricao:
            "HTML, CSS e JavaScript modernos. Crie interfaces responsivas com boas práticas.",
          categoria: "Programação",
          imagemUrl: "/academia/frontend.jpg",
        } as Partial<Curso>;
      case 2:
        return {
          id: "logica-de-programacao",
          titulo: "Lógica de Programação",
          descricao:
            "Fundamentos: variáveis, decisões, loops e resolução de problemas.",
          categoria: "Programação",
          imagemUrl: "/academia/logica.png",
        } as Partial<Curso>;
      case 3:
        return {
          id: "sql-server",
          titulo: "SQL Server",
          descricao:
            "Consultas SQL, modelagem, procedures, views e administração básica.",
          categoria: "Banco de Dados",
          imagemUrl: "/academia/sql.png",
        } as Partial<Curso>;
      default:
        return null;
    }
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
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
    <div className="min-h-screen bg-gradient-to-br mt-[-70px] from-gray-50 to-gray-100 relative overflow-hidden">
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-20 sm:px-6 lg:px-8">
          {/* Cabeçalho */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Cursos disponíveis
            </motion.h1>
          </div>

          {/* Lista de Cursos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {cursosDisponiveis.slice(0, 4).map((curso: Curso, index) => {
                const override = getCardOverride(index);
                const cursoCard = override
                  ? ({ ...curso, ...override } as Curso)
                  : curso;
                return (
                  <motion.div
                    key={cursoCard.id}
                    className="h-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}>
                    <CursoCard
                      curso={cursoCard}
                      onFavoritar={handleFavoritar}
                      onQuickView={handleQuickView}
                      favoritos={favoritos}
                      navigate={navigate}
                      destino={
                        index === 0
                          ? "/academia/curso1"
                          : index === 1
                          ? "/academia/curso2"
                          : index === 2
                          ? "/academia/curso3"
                          : index === 3
                          ? "/academia/curso4"
                          : `/academia/curso/${cursoCard.id}`
                      }
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
          {/* Modal Quick View - Conteúdo Programático */}
          <AnimatePresence>
            {modalAberto && cursoSelecionado && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                {/* Backdrop com blur */}
                <div
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={() => setModalAberto(false)}
                />
                {/* Card */}
                <motion.div
                  className="relative z-10 w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
                  initial={{ scale: 0.95, y: 10, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.95, y: 10, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}>
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {cursoSelecionado.titulo}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Conteúdo Programático
                        </p>
                      </div>
                      <button
                        onClick={() => setModalAberto(false)}
                        className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
                        <X size={20} />
                      </button>
                    </div>
                    <div className="mt-4 max-h-96 overflow-y-auto">
                      {carregandoModulos ? (
                        <div className="py-10 text-center text-gray-500">
                          Carregando conteúdo...
                        </div>
                      ) : modulos.length === 0 ? (
                        <div className="py-10 text-center text-gray-500">
                          Nenhum conteúdo programático disponível.
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {modulos.map((modulo, index) => (
                            <div key={modulo.id} className="border rounded-lg">
                              <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                    <BookOpen
                                      className="text-blue-600"
                                      size={16}
                                    />
                                  </div>
                                  <span className="font-medium text-gray-800">
                                    {modulo.titulo}
                                  </span>
                                </div>
                                {modulo.duracaoTotal && (
                                  <span className="text-sm text-gray-500">
                                    {modulo.duracaoTotal}
                                  </span>
                                )}
                              </div>
                              {modulo.aulas && modulo.aulas.length > 0 && (
                                <div className="px-4 py-2 text-sm text-gray-700">
                                  <ul className="list-disc pl-5 space-y-1">
                                    {modulo.aulas.map((aula) => (
                                      <li key={aula.id}>{aula.titulo}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-3">
                      <button
                        onClick={() => setModalAberto(false)}
                        className="px-4 py-2 rounded-[5px] border border-gray-300 text-gray-700 hover:bg-gray-50">
                        Fechar
                      </button>
                      <button
                        onClick={() => {
                          setModalAberto(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="px-4 py-2 rounded-[5px] bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:shadow-lg border border-red-600">
                        Inscrever-se
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
