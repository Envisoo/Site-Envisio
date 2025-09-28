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
  Share2,
  ArrowRight,
  Bookmark,
  User,
  BarChart,
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
  const shouldShowVerMais = (curso?.descricao?.length ?? 0) > 120;

  // Destino customizado para cursos específicos
  const getDestinoCurso = (c: Curso) => {
    const id = String((c as any)?.id ?? "")
      .toLowerCase()
      .trim();
    const titulo = String((c as any)?.titulo ?? "").toLowerCase();

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

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/academia/curso/${curso.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: curso.titulo,
          text: curso.descricao || "Confira este curso incrível!",
          url: shareUrl,
        });
      } catch (err) {
        console.error("Erro ao compartilhar:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copiado para a área de transferência!");
      } catch (err) {
        console.error("Erro ao copiar link:", err);
        toast.error("Não foi possível copiar o link");
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative bg-white rounded-[5px] overflow-hidden group cursor-pointer flex flex-col h-full border border-gray-300/80 hover:border-gray-300 transition-all duration-500 backdrop-blur-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {/* Imagem do curso com overlay gradiente */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <motion.img
          src={
            curso.imagemUrl ||
            "https://source.unsplash.com/random/400x300/?course,technology"
          }
          alt={curso.titulo}
          className="w-full h-full  object-cover transform transition-transform duration-700"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
        />
        {/* Categoria */}
        {curso.categoria && (
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1.5 rounded-[5px] text-xs font-semibold bg-gray-200 backdrop-blur-sm text-gray-800 border border-white/20 shadow-lg">
              {curso.categoria}
            </span>
          </div>
        )}
        {/* Botões de ação na imagem */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="p-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 group/share"
            aria-label="Compartilhar curso">
            <Share2
              size={16}
              className="text-gray-700 group-hover/share:text-blue-600 transition-colors"
            />
          </motion.button>
        </div>
        {/* Badge de status */}

        <div className="absolute bottom-4 left-4 z-20">
          <span
            className={`px-2 py-1 rounded-[5px] text-xs font-medium text-white backdrop-blur-sm ${
              curso.status === "disponivel"
                ? "bg-green-500/90"
                : curso.status === "breve"
                ? "bg-amber-500/90"
                : "bg-red-500/90"
            }`}>
            {curso.status === "disponivel"
              ? "Disponível"
              : curso.status === "breve"
              ? "Em Breve"
              : "Indisponível"}
          </span>
        </div>
      </div>

      {/* Conteúdo do card */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Título */}
        <h3
          onClick={() => navigate(destino ?? getDestinoCurso(curso))}
          className="text-xl font-bold text-gray-900 line-clamp-2 transition-colors mb-3 group-hover:text-gray-700 leading-tight">
          {curso.titulo}
        </h3>

        {/* Descrição */}
        <div className="flex-grow">
          <p
            className={`text-gray-600 text-sm mb-3 transition-all duration-300 leading-relaxed ${
              isExpanded ? "" : "line-clamp-3"
            }`}>
            {curso.descricao || "Sem descrição disponível"}
          </p>
          {shouldShowVerMais && (
            <button
              className="text-gray-600 hover:text-gray-700 text-sm font-medium flex items-center transition-colors group/vermais"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded((v) => !v);
              }}>
              {isExpanded ? "Ver menos" : "Ver mais"}
              <ChevronDown
                size={16}
                className={`ml-1 transition-transform duration-200 group-hover/vermais:translate-y-0.5 ${
                  isExpanded ? "transform rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>

        {/* Metadados */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4"></div>
        </div>

        {/* Botão de ação principal */}
        <div className="mt-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(destino ?? getDestinoCurso(curso))}
            className="w-full py-3 px-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-[5px] font-semibold text-sm hover:shadow-2xl hover:shadow-gray-900/25 transition-all duration-300 flex items-center justify-center space-x-2 group/btn border border-gray-800">
            <span>Explorar Curso</span>
            <motion.span
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
              className="group-hover/btn:translate-x-1 transition-transform">
              <ArrowRight size={16} />
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
          titulo: "Cegid Primavera: Funcionalidades e Módulos",
          descricao:
            "Domine o Cegid Primavera: conceitos, parametrização e boas práticas no ERP. Aprenda desde os fundamentos até técnicas avançadas de gestão empresarial.",
          categoria: "Gestão/ERP",
          status: "disponivel",
          imagemUrl: "/academia/Primavera.jpg",
        } as Partial<Curso>;
      case 1:
        return {
          id: "programacao-web-frontend",
          titulo: "Programação Web Frontend",
          descricao:
            "HTML, CSS e JavaScript modernos. Crie interfaces responsivas com boas práticas e as melhores ferramentas do mercado atual.",
          categoria: "Programação",
          status: "breve",
          imagemUrl: "/academia/frontend.jpg",
        } as Partial<Curso>;
      case 2:
        return {
          id: "logica-de-programacao",
          titulo: "Lógica de Programação",
          descricao:
            "Fundamentos essenciais: variáveis, decisões, loops e resolução de problemas. Prepare-se para qualquer linguagem de programação.",
          categoria: "Programação",
          status: "breve",
          imagemUrl: "/academia/logica.png",
        } as Partial<Curso>;
      case 3:
        return {
          id: "sql-server",
          titulo: "SQL Server",
          descricao:
            "Consultas SQL, modelagem, procedures, views e administração básica. Domine um dos bancos de dados mais utilizados no mercado.",
          categoria: "Banco de Dados",
          status: "breve",
          imagemUrl: "/academia/sql.png",
        } as Partial<Curso>;
      default:
        return null;
    }
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="rounded-full h-16 w-16 border-4 border-gray-600 border-t-transparent mx-auto mb-4"
          />
          <p className="text-gray-600 font-medium">Carregando cursos...</p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-red-500 mb-6">
            <BookOpen size={64} className="mx-auto opacity-80" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Erro ao carregar cursos
          </h2>
          <p className="text-gray-600 mb-6">
            Não foi possível carregar os cursos neste momento. Por favor, tente
            novamente mais tarde.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gray-800 text-white rounded-[5px] font-medium hover:bg-gray-900 transition-colors">
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br mt-[-100px] from-gray-50 via-blue-50/30 to-gray-100  overflow-hidden">
      <div className="relative">
        {/* Cabeçalho Hero */}
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/academia/pagina home/detalhe.webp"
              alt="Banner Cursos"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Conteúdo sobreposto */}
          <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-24 text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-semibold mb-4 leading-tight max-w-3xl">
              Transforme sua carreira com nossos cursos
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 max-w-2xl">
              Aprenda com especialistas e domine as habilidades mais demandadas
              do mercado atual.
            </p>
            <div className="flex flex-col sm:flex-row gap-4"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-20 pb-20 sm:px-6 lg:px-8">
          {/* Lista de Cursos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
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
                    transition={{ duration: 0.5, delay: 0.1 * index }}>
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
          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-16"></motion.div>
        </div>
      </div>

      {/* Modal Quick View */}
      <AnimatePresence>
        {modalAberto && cursoSelecionado && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            {/* Backdrop com blur */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setModalAberto(false)}
            />

            {/* Card do Modal */}
            <motion.div
              className="relative z-10 w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}>
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {cursoSelecionado.titulo}
                    </h3>
                    <p className="text-gray-500 mt-2">
                      Conteúdo Programático Detalhado
                    </p>
                  </div>
                  <button
                    onClick={() => setModalAberto(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {carregandoModulos ? (
                    <div className="py-12 text-center text-gray-500">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-4"></div>
                      Carregando conteúdo...
                    </div>
                  ) : modulos.length === 0 ? (
                    <div className="py-12 text-center text-gray-500">
                      <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                      Nenhum conteúdo programático disponível no momento.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {modulos.map((modulo, index) => (
                        <motion.div
                          key={modulo.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors">
                          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                <BookOpen className="text-blue-600" size={18} />
                              </div>
                              <div>
                                <span className="font-semibold text-gray-900">
                                  {modulo.titulo}
                                </span>
                                {modulo.duracaoTotal && (
                                  <span className="text-sm text-gray-500 ml-3">
                                    • {modulo.duracaoTotal}
                                  </span>
                                )}
                              </div>
                            </div>
                            <ChevronDown size={18} className="text-gray-400" />
                          </div>

                          {modulo.aulas && modulo.aulas.length > 0 && (
                            <div className="px-6 py-4 bg-white">
                              <ul className="space-y-3">
                                {modulo.aulas.map((aula) => (
                                  <li
                                    key={aula.id}
                                    className="flex items-center gap-3 text-sm text-gray-700">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                    <span>{aula.titulo}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-8 flex items-center justify-end gap-4">
                  <button
                    onClick={() => setModalAberto(false)}
                    className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                    Fechar
                  </button>
                  <button
                    onClick={() => {
                      setModalAberto(false);
                      navigate(`/academia/curso/${cursoSelecionado.id}`);
                    }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold hover:shadow-lg transition-all duration-300">
                    Acessar Curso
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
