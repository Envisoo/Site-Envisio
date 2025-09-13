/** @format */

import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contextos/AuthContext";
import { useCursos } from "../hooks/useCursos";
import { motion, AnimatePresence, useInView } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  GraduationCap,
  Clock,
  Star,
  Users,
  BookOpen,
  Award,
  ArrowRight,
  Zap,
  TrendingUp,
  Eye,
  Search,
  Heart,
  Share2,
  Code,
  Palette,
  Briefcase,
  AlertCircle,
  Play,
  Download,
  CheckCircle,
  Globe,
  Target,
  Rocket,
  Lightbulb,
  BarChart3,
  ChevronRight,
  ChevronLeft,
  Filter,
  Trophy,
  Medal,
  Sparkles,
  Quote,
  ArrowUp,
  MessageCircle,
  Send,
  X,
  ShieldCheck,
  Video,
  Calendar,
  Pause,
  ChevronDown,
} from "lucide-react";
import ModalVideo from "../componentes/ModalVideo";
import SobreAcademia from "../componentes/SobreAcademia";

// Elegant Loading Spinner Component
const ElegantSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
    <div className="relative">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-400 rounded-full"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <GraduationCap className="w-6 h-6 text-indigo-600" />
      </div>
    </div>
    <motion.p
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="ml-4 text-lg font-medium text-gray-700">
      Carregando cursos...
    </motion.p>
  </div>
);

// Animated Counter Component
const AnimatedCounter = ({
  end,
  duration = 2,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min(
          (currentTime - startTime) / (duration * 1000),
          1
        );
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-bold text-2xl md:text-3xl">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

// Course Card Component
const CourseCard = ({ curso, index }: { curso: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-gray-900 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-500 overflow-hidden border border-red-500/20 hover:border-red-500/40">
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src="/api/placeholder/400/200"
          alt={curso.titulo}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-red-900/20 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-lg">
            {curso.categoria}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
              isFavorite
                ? "bg-red-500 text-white shadow-lg shadow-red-500/50"
                : "bg-black/60 text-white hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/50"
            }`}>
            <Heart size={16} className={isFavorite ? "fill-current" : ""} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-black/60 text-white rounded-full backdrop-blur-sm hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300">
            <Share2 size={16} />
          </motion.button>
        </div>

        {/* Play Button Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-4 bg-red-500/80 backdrop-blur-md rounded-full border border-red-400/50 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300">
                <Play size={24} className="text-white ml-1" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-2">4.8 (234)</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Eye size={14} className="mr-1" />
            <span>2.1k</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-xl mb-3 text-white group-hover:text-red-400 transition-colors line-clamp-2">
          {curso.titulo}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
          {curso.descricao}
        </p>

        {/* Course Info */}
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{curso.duracao || "8"}h</span>
          </div>
          <div className="flex items-center">
            <Users size={14} className="mr-1" />
            <span>1.2k alunos</span>
          </div>
          <div className="flex items-center">
            <Video size={14} className="mr-1" />
            <span>24 aulas</span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-red-500/20">
          <Link
            to={`/academia/curso/${curso.id}`}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300">
            Ver Curso
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: any;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    className="bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:shadow-red-500/20 transition-all duration-300 border border-red-500/20 hover:border-red-500/40">
    <div className="flex items-center mb-6">
      <img
        src="/api/placeholder/60/60"
        alt={testimonial.nome}
        className="w-12 h-12 rounded-full object-cover mr-4"
      />
      <div>
        <h4 className="font-semibold text-white">{testimonial.nome}</h4>
        <p className="text-sm text-gray-300">{testimonial.cargo}</p>
      </div>
      <Quote className="ml-auto text-red-400" size={24} />
    </div>

    <p className="text-gray-300 mb-6 leading-relaxed italic">
      "{testimonial.texto}"
    </p>

    <div className="flex items-center justify-between">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <span className="text-sm font-medium text-red-400">
        {testimonial.curso}
      </span>
    </div>
  </motion.div>
);

// Banner Section with Video Hero
const Banner = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const openVideoModal = () => {
    setShowVideoModal(true);
    setIsPlaying(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay não permitido:", error);
      });
    }
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden mt-[-65px] "
      style={{ height: "calc(100vh)" }}>
      {/* Vídeo de fundo */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop">
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-students-studying-in-a-library-2371-large.mp4"
            type="video/mp4"
          />
          Seu navegador não suporta o elemento de vídeo.
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-800/60"></div>
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center py px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Transforme seu futuro com a nossa
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              plataforma de ensino
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/academia/cursos"
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-600/30">
              Explorar Cursos
            </Link>

            <button
              onClick={openVideoModal}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 group">
              <Play className="w-5 h-5" />
              Assistir Demonstração
            </button>
          </div>
        </motion.div>

        {/* Botão de rolagem suave */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown className="w-8 h-8 text-white" />
        </motion.div>
      </div>

      {/* Modal de Vídeo */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeVideoModal}>
          <div
            className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeVideoModal}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors z-10">
              <X className="w-8 h-8" />
            </button>
            <video
              ref={videoRef}
              className="w-full aspect-video"
              controls
              autoPlay
              loop
              playsInline
              onClick={togglePlay}>
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-students-studying-in-a-library-2371-large.mp4"
                type="video/mp4"
              />
              Seu navegador não suporta o elemento de vídeo.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default function HomeAcademia() {
  const { cursos, carregando, erro } = useCursos();
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const [modalAberto, setModalAberto] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");

  // Sample data
  const categorias = [
    { id: "todos", nome: "Todos os Cursos", icone: <BookOpen size={20} /> },
    { id: "programacao", nome: "Programação", icone: <Code size={20} /> },
    { id: "design", nome: "Design", icone: <Palette size={20} /> },
    { id: "marketing", nome: "Marketing", icone: <TrendingUp size={20} /> },
    { id: "negocios", nome: "Negócios", icone: <Briefcase size={20} /> },
  ];

  const testimonials = [
    {
      nome: "Maria Silva",
      cargo: "Desenvolvedora Frontend",
      empresa: "TechCorp Angola",
      texto:
        "A plataforma revolucionou minha carreira. Em 6 meses consegui minha primeira vaga como desenvolvedora em Luanda!",
      curso: "React Avançado",
    },
    {
      nome: "João Santos",
      cargo: "UX Designer",
      empresa: "DesignStudio Angola",
      texto:
        "Os cursos são incríveis e os instrutores são muito experientes. Recomendo para todos!",
      curso: "UX/UI Design",
    },
    {
      nome: "Ana Costa",
      cargo: "Marketing Digital",
      empresa: "DigitalAgency Angola",
      texto:
        "Consegui triplicar minha renda após os cursos de marketing digital. Valeu cada kwanza investido!",
      curso: "Marketing Digital",
    },
  ];

  const irParaPainel = () => {
    if (usuario) {
      if (usuario.papel === "admin") navigate("/academia/admin");
      else if (usuario.papel === "instrutor") navigate("/academia/instrutor");
      else if (usuario.papel === "aluno") navigate("/academia/aluno");
    }
  };

  const filtrarCursos = () => {
    let cursosFiltrados = cursos || [];
    if (searchTerm) {
      cursosFiltrados = cursosFiltrados.filter(
        (curso) =>
          curso.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          curso.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== "todos") {
      cursosFiltrados = cursosFiltrados.filter(
        (curso) => curso.categoria.toLowerCase() === selectedCategory
      );
    }
    return cursosFiltrados;
  };

  // Loading State
  if (carregando) return <ElegantSpinner />;

  // Error State
  if (erro) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md p-8 bg-white rounded-3xl shadow-xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="text-red-600" size={40} />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ops! Algo deu errado
          </h2>
          <p className="text-gray-600 mb-6">
            Não foi possível carregar os cursos. Tente novamente.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300">
            Tentar Novamente
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      <Toaster position="top-right" />

      <Banner />
      <SobreAcademia />

      {/* Advanced Course Categories */}
      <section className="relative py-32 bg-gradient-to-br from-red-50 via-white to-red-100 overflow-hidden">
        {/* Advanced Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-red-200/20 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1.2, 0.8, 1.2],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-br from-red-300/15 to-red-400/10 rounded-full blur-3xl"
          />
          {/* Floating geometric shapes */}
          <motion.div
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 right-1/4 w-8 h-8 bg-red-400/30 transform rotate-45"
          />
          <motion.div
            animate={{
              y: [15, -15, 15],
              x: [20, -20, 20],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-1/3 left-1/3 w-6 h-6 border border-red-300/40 rounded-full"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center max-w-6xl mx-auto mb-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-8">
              <div className="inline-flex items-center px-6 py-3 bg-red-600/10 backdrop-blur-xl border border-red-500/30 rounded-full text-red-300 text-sm font-bold mb-8 shadow-lg">
                <Sparkles className="mr-2" size={18} />
                CATEGORIAS ESPECIALIZADAS
              </div>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                DOMINE QUALQUER
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                ÁREA TECH
              </span>
            </motion.h2>
            <motion.div
              className="w-48 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-8 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 192 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.6 }}
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light max-w-4xl mx-auto">
              Explore nossa coleção exclusiva de cursos organizados por
              <span className="text-red-400 font-semibold">
                especializações premium
              </span>{" "}
              para
              <span className="text-white font-medium">
                acelerar sua carreira
              </span>
              .
            </motion.p>
          </motion.div>

          {/* Advanced Interactive Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {categorias.map((categoria, index) => (
              <motion.div
                key={categoria.id}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  rotateY: 5,
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(categoria.id)}
                className="group relative cursor-pointer">
                <div
                  className={`relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700 border overflow-hidden ${
                    selectedCategory === categoria.id
                      ? "border-red-500/50 shadow-red-500/20"
                      : "border-red-500/20 hover:border-red-400/50"
                  }`}>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Animated corner accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/20 to-transparent rounded-bl-3xl"
                    animate={{
                      scale:
                        selectedCategory === categoria.id ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                      duration: 2,
                      repeat: selectedCategory === categoria.id ? Infinity : 0,
                    }}
                  />

                  <div className="relative z-10">
                    {/* Icon with advanced styling */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transition-all duration-500 ${
                        selectedCategory === categoria.id
                          ? "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-red-500/40"
                          : "bg-gray-800 text-gray-400 group-hover:from-red-500 group-hover:to-red-600 group-hover:text-white group-hover:shadow-red-500/40"
                      }`}>
                      <div className="text-2xl">{categoria.icone}</div>
                    </motion.div>

                    {/* Category name */}
                    <h3
                      className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                        selectedCategory === categoria.id
                          ? "text-red-400"
                          : "text-white group-hover:text-red-400"
                      }`}>
                      {categoria.nome}
                    </h3>

                    {/* Course count with animation */}
                    <motion.div
                      className="flex items-center justify-center space-x-2 text-sm text-gray-400 group-hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}>
                      <BookOpen size={16} />
                      <span>{Math.floor(Math.random() * 20) + 5} cursos</span>
                    </motion.div>

                    {/* Selection indicator */}
                    <AnimatePresence>
                      {selectedCategory === categoria.id && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                          <CheckCircle size={16} className="text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Elite Featured Courses */}
      <section className="relative py-32 bg-gradient-to-br from-gray-50 to-indigo-50">
        {/* Advanced Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(239,68,68,0.05),transparent_50%)]" />
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(239,68,68,0.02)_50%,transparent_75%)] bg-[length:60px_60px]"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center max-w-6xl mx-auto mb-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-8">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500/10 to-red-600/10 backdrop-blur-xl border border-red-400/20 rounded-full text-red-600 text-sm font-bold mb-8 shadow-lg">
                <Award className="mr-2" size={18} />
                CURSOS PREMIUM EM DESTAQUE
              </div>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                TRANSFORMAÇÃO
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                GARANTIDA
              </span>
            </motion.h2>
            <motion.div
              className="w-56 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-8 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 224 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.6 }}
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light max-w-4xl mx-auto">
              Cursos cuidadosamente selecionados por especialistas para
              <span className="text-red-600 font-semibold">
                maximizar seu potencial
              </span>{" "}
              e
              <span className="text-gray-800 font-medium">
                acelerar resultados
              </span>
              .
            </motion.p>
          </motion.div>

          {/* Advanced Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filtrarCursos()
              .slice(0, 6)
              .map((curso, index) => (
                <motion.div
                  key={curso.id}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{
                    y: -15,
                    rotateX: 5,
                    scale: 1.02,
                    transition: { duration: 0.4 },
                  }}
                  className="group relative">
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 border border-red-200/30 hover:border-red-400/50 overflow-hidden">
                    {/* Premium badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full shadow-lg">
                        PREMIUM
                      </motion.div>
                    </div>

                    {/* Course Image with advanced overlay */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src="/api/placeholder/400/200"
                        alt={curso.titulo}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-red-900/20 to-transparent" />

                      {/* Interactive play button */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}>
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                          <Play className="text-white ml-1" size={24} />
                        </div>
                      </motion.div>

                      {/* Floating action buttons */}
                      <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-red-500 hover:border-red-500 transition-all duration-300">
                          <Heart size={16} className="text-white" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: -10 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-red-500 hover:border-red-500 transition-all duration-300">
                          <Share2 size={16} className="text-white" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-6">
                      {/* Rating and stats */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${
                                i < 4
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-2">
                            4.8
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users size={14} className="mr-1" />
                          <span>{Math.floor(Math.random() * 2000) + 500}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2">
                        {curso.titulo}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {curso.descricao}
                      </p>

                      {/* Course Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          <span>{curso.duracao || "8"}h</span>
                        </div>
                        <div className="flex items-center">
                          <Video size={14} className="mr-1" />
                          <span>
                            {Math.floor(Math.random() * 50) + 20} aulas
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Award size={14} className="mr-1" />
                          <span>Certificado</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Link
                        to={`/academia/curso/${curso.id}`}
                        className="block w-full">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg shadow-red-500/30 group-hover:shadow-red-500/50">
                          <span className="flex items-center justify-center">
                            ACESSAR CURSO
                            <ArrowRight
                              className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                              size={16}
                            />
                          </span>
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Elite CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-16">
            <div className="relative inline-block">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl blur opacity-30"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <Link to="/academia/cursos" className="relative">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 bg-gradient-to-r from-red-500 to-red-600 text-white font-black rounded-2xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-2xl shadow-red-500/40 text-xl">
                  <span className="flex items-center">
                    EXPLORAR TODOS OS CURSOS
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="ml-3">
                      <ArrowRight size={24} />
                    </motion.div>
                  </span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              O que Nossos Alunos Dizem
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Histórias reais de transformação e sucesso profissional
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Por que Escolher Nossa Plataforma?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Recursos e benefícios que fazem a diferença na sua jornada de
              aprendizado
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl hover:shadow-red-500/20 transition-all duration-500 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Aprendizado Acelerado
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Metodologia comprovada que acelera seu aprendizado em 3x através
                de técnicas avançadas.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl hover:shadow-red-500/20 transition-all duration-500 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Comunidade Ativa
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Conecte-se com milhares de alunos e instrutores em uma
                comunidade engajada.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl hover:shadow-red-500/20 transition-all duration-500 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Certificados Reconhecidos
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Certificados válidos e reconhecidos pelo mercado, validando suas
                competências.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl hover:shadow-red-500/20 transition-all duration-500 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Garantia Vitalícia
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Acesso vitalício a todos os cursos com atualizações constantes
                incluídas.
              </p>
            </motion.div>

            {/* Feature 5 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl hover:shadow-red-500/20 transition-all duration-500 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Projetos Práticos
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Aprenda fazendo com projetos reais que você pode adicionar ao
                seu portfólio.
              </p>
            </motion.div>

            {/* Feature 6 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl hover:shadow-red-500/20 transition-all duration-500 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Acesso Global
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Estude de qualquer lugar, a qualquer hora, em qualquer
                dispositivo.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8">
              <Rocket className="text-white" size={40} />
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Pronto para Transformar
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Sua Carreira?
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed">
              Junte-se a milhares de alunos que já transformaram suas vidas
              profissionais. Comece sua jornada hoje mesmo!
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <Link
                  to="/academia/cadastro"
                  className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-2xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 text-lg shadow-2xl flex items-center">
                  <Sparkles className="mr-3" size={24} />
                  Começar Agora Grátis
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <button
                  onClick={() => setModalAberto(true)}
                  className="px-10 py-5 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300 text-lg backdrop-blur-sm flex items-center">
                  <Play className="mr-3" size={24} />
                  Ver Demonstração
                </button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/70">
              <div className="flex items-center">
                <CheckCircle className="mr-2" size={20} />
                <span>Sem compromisso</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2" size={20} />
                <span>Cancele quando quiser</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2" size={20} />
                <span>Suporte 24/7</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Floating Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 flex items-center justify-center"
        onClick={() => toast.success("Chat em breve!")}>
        <MessageCircle size={24} />
      </motion.button>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 left-6 w-12 h-12 bg-white text-gray-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center">
        <ArrowUp size={20} />
      </motion.button>

      {/* Video Modal */}
      <ModalVideo
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
      />
    </div>
  );
}
