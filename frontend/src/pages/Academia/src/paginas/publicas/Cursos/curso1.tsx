/** @format */

import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useContext,
  useEffect,
  useState,
} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contextos/AuthContext";
import { useCurso } from "../../../hooks/useCurso";
import { useModulos } from "../../../hooks/useModulos";
import { Helmet } from "react-helmet-async";
import {
  Star,
  Users,
  Award,
  CheckCircle,
  ArrowLeft,
  BookOpen,
  Play,
  Lock,
  Video,
  Eye,
  Headphones,
  Infinity,
  MessageCircle,
  CheckCircle2,
  PlayCircle,
  Bookmark,
  ChevronDown,
  FileText,
  Smartphone,
  Clock,
  BookCheck,
} from "lucide-react";
import Spinner from "../../../componentes/Spinner";
import ModalVideo from "../../../componentes/ModalVideo";
import FormularioInscricao from "../../../componentes/FormularioInscricao"; // Import the FormularioInscricao component
import api from "../../../utils/api";
import { Curso, Instrutor, Modulo, Aula } from "../../../tipos/Curso";
import {
  modulosDataFallback,
  modulosPorCurso as modulosDict,
} from "../../../data/Modulo";
import { motion, AnimatePresence } from "framer-motion";

interface Avaliacao {
  id: string;
  nota: number;
  comentario: string;
  autor: string;
  criado_em: string;
}

export default function CursoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const dadosCurso = useCurso(id || "");
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const [modalAberto, setModalAberto] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [tab, setTab] = useState("sobre");
  const [aulas, setAulas] = useState<any[]>([]);
  const [carregandoAulas, setCarregandoAulas] = useState(true);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [mediaAvaliacoes, setMediaAvaliacoes] = useState(0);
  const [carregandoAvaliacoes, setCarregandoAvaliacoes] = useState(true);
  const [moduloAberto, setModuloAberto] = useState<number | null>(null);
  const [modalInscricaoAberto, setModalInscricaoAberto] = useState(false); // Add the state for the FormularioInscricao modal
  const {
    modulos,
    carregando: carregandoModulos,
    erro: erroModulos,
  } = useModulos(id);

  // Fallback local para rota fixa (sem :id)
  const cursoLocal: Curso = {
    id: "cegid-primavera",
    titulo: "Cegid Primavera: Funcionalidades e Módulos",
    descricao:
      "Aprenda a dominar o ERP mais utilizado em Angola e Portugal para gestão empresarial completa.",
    categoria: "Gestão/ERP",
    duracao: 2 as any,
    horas: "130" as any,
    imagemUrl: "",
    requisitos: ["Nenhum requisito"],
  } as unknown as Curso;

  const cursoExibir = (id ? dadosCurso.curso : (cursoLocal as Curso)) as Curso;

  // Fallback local para quando esta página é acessada sem :id na rotas
  const cursoLocalFallback: Curso = {
    id: "javascript-basico-ao-avancado",
    titulo: "JavaScript Básico ao Avançado",
    descricao:
      "Aprenda JavaScript do zero até conceitos avançados com conteúdo prático e direto ao ponto.",
    categoria: "Programação",
    duracao: 2,
    nivel: "iniciante",
    imagemUrl: "",
    requisitos: ["Computador e internet"],
  } as Curso;

  // Seleciona a fonte de dados do curso: API (quando há id) ou local (sem id)
  const curso = id ? dadosCurso.curso : (cursoLocalFallback as Curso);
  const carregando: boolean = id ? dadosCurso.carregando : false;
  const erro: string | null = id ? (dadosCurso as any).erro : null;
  // Busca as aulas do backend
  useEffect(() => {
    if (!id) return;
    setCarregandoAulas(true);
    api
      .get(`/cursos/${id}/aulas`)
      .then((res) => setAulas(res.data))
      .catch(() => setAulas([]))
      .finally(() => setCarregandoAulas(false));
  }, [id]);

  // Busca as avaliações do curso
  useEffect(() => {
    if (!id) return;
    setCarregandoAvaliacoes(true);
    api
      .get(`/avaliacoes/${id}`)
      .then((res) => {
        setAvaliacoes(res.data.avaliacoes || []);
        setMediaAvaliacoes(res.data.media || 0);
      })
      .catch(() => {
        setAvaliacoes([]);
        setMediaAvaliacoes(0);
      })
      .finally(() => setCarregandoAvaliacoes(false));
  }, [id]);

  // Corrige o tipo do instrutor
  const instrutor =
    typeof cursoExibir?.instrutor === "object"
      ? cursoExibir?.instrutor
      : {
          nome: (cursoExibir as any)?.instrutor || "Instrutor",
          avaliacao: 0,
          alunos: 0,
          aulas: 0,
        };

  // Permissão de acesso às aulas
  const podeAcessarAula = (aula: Aula): boolean => {
    if (!usuario) return false;
    if (usuario.papel === "admin" || usuario.papel === "instrutor") return true;
    return aula.livre || false;
  };

  const abrirVideoDemonstrativo = (url: string) => {
    setVideoUrl(url);
    setModalAberto(true);
  };

  // Função para renderizar estrelas
  const renderizarEstrelas = (nota: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < nota ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  // normaliza ID para bater com dicionário
  const slugify = (valor: string) =>
    valor
      .normalize("NFD")
      .replace(/{Diacritic}/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const dictById = (() => {
    if (!id && !curso) return undefined;
    const raw = id ? String(id) : "";
    const courseId = cursoExibir?.id ? String(cursoExibir.id) : "";
    const titleSlug = cursoExibir?.titulo ? slugify(cursoExibir.titulo) : "";

    const candidates = [
      raw,
      raw.trim(),
      raw.trim().toLowerCase(),
      slugify(raw),
      courseId,
      courseId.trim().toLowerCase(),
      slugify(courseId),
      titleSlug,
    ].filter(Boolean);

    const key = candidates.find(
      (k) => modulosDict[k] && modulosDict[k].length > 0
    );

    // Logs úteis de diagnóstico
    console.log("[CursoDetalhe] id da rota:", raw);
    console.log("[CursoDetalhe] candidatos normalizados:", candidates);
    console.log(
      "[CursoDetalhe] chave encontrada no dicionário:",
      key ?? "nenhuma (fallback)"
    );

    return key ? modulosDict[key] : undefined;
  })();

  const modulosDefinidosAqui: Modulo[] = [
    {
      id: "m1",
      titulo: "Módulo 1: Instalação e Administração do ERP Primavera",
      duracaoTotal: "",
      ordem: 1,
      aulas: [
        { id: "m1-t1", titulo: "Instalação", tipo: "texto", duracao: "" },
        { id: "m1-t2", titulo: "Enquadramento", tipo: "texto", duracao: "" },
        {
          id: "m1-t3",
          titulo: "Criação de Empresas",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m1-t4",
          titulo: "Manutenção de Dados",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m1-t5",
          titulo: "Gestão de Utilizadores e Segurança",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m1-t6",
          titulo: "Outras funcionalidades",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m2",
      titulo: "Módulo 2: Laboratório de Instalação ERP",
      duracaoTotal: "",
      ordem: 2,
      aulas: [{ id: "m2-t1", titulo: "Prática", tipo: "texto", duracao: "" }],
    },
    {
      id: "m3",
      titulo: "Módulo 3: Using – Gestão de Inventário",
      duracaoTotal: "",
      ordem: 3,
      aulas: [
        { id: "m3-t1", titulo: "Enquadramento", tipo: "texto", duracao: "" },
        { id: "m3-t2", titulo: "Dados Mestre", tipo: "texto", duracao: "" },
        {
          id: "m3-t3",
          titulo: "Operações de Expedição e Receção",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m3-t4",
          titulo: "Valorização do stock",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m3-t5",
          titulo: "Atributos dos Artigos",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m3-t6",
          titulo: "O processo de Inventariação",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m4",
      titulo: "Módulo 4: Laboratório de Inventário",
      duracaoTotal: "",
      ordem: 4,
      aulas: [{ id: "m4-t1", titulo: "Prática", tipo: "texto", duracao: "" }],
    },
    {
      id: "m5",
      titulo: "Módulo 5: Using – Compras",
      duracaoTotal: "",
      ordem: 5,
      aulas: [
        { id: "m5-t1", titulo: "Entidades", tipo: "texto", duracao: "" },
        {
          id: "m5-t2",
          titulo: "Circuito Documental",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m5-t3",
          titulo: "Operações de estorno",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m5-t4",
          titulo: "Obrigações Fiscais",
          tipo: "texto",
          duracao: "",
        },
        { id: "m5-t5", titulo: "Mapas de Análise", tipo: "texto", duracao: "" },
      ],
    },
    {
      id: "m6",
      titulo: "Módulo 6: Using – Vendas",
      duracaoTotal: "",
      ordem: 6,
      aulas: [
        { id: "m6-t1", titulo: "Entidades", tipo: "texto", duracao: "" },
        {
          id: "m6-t2",
          titulo: "Documentos de Venda - Circuito Documental",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m6-t3",
          titulo: "Gestão de Documentos",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m6-t4",
          titulo: "Operações de anulação/estorno",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m6-t5",
          titulo: "Obrigações Fiscais",
          tipo: "texto",
          duracao: "",
        },
        { id: "m6-t6", titulo: "Mapas de Análise", tipo: "texto", duracao: "" },
      ],
    },
    {
      id: "m7",
      titulo: "Módulo 7: Laboratório de Compras e Vendas",
      duracaoTotal: "",
      ordem: 7,
      aulas: [{ id: "m7-t1", titulo: "Prática", tipo: "texto", duracao: "" }],
    },
    {
      id: "m8",
      titulo: "Módulo 8: Laboratório de Administração do ERP",
      duracaoTotal: "",
      ordem: 8,
      aulas: [{ id: "m8-t1", titulo: "Prática", tipo: "texto", duracao: "" }],
    },
    {
      id: "m9",
      titulo: "Módulo 9: Configuring – Logística",
      duracaoTotal: "",
      ordem: 9,
      aulas: [
        {
          id: "m9-t1",
          titulo: "Documentos de Compras",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m9-t2",
          titulo: "Documentos de Vendas",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m9-t3",
          titulo: "Documentos Internos",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m9-t4",
          titulo: "Documentos de Transferência",
          tipo: "texto",
          duracao: "",
        },
        { id: "m9-t5", titulo: "Configurações", tipo: "texto", duracao: "" },
      ],
    },
    {
      id: "m10",
      titulo: "Módulo 10: Laboratório de Logística",
      duracaoTotal: "",
      ordem: 10,
      aulas: [
        {
          id: "m10-t1",
          titulo: "Esclarecimento de dúvidas",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m10-t2",
          titulo: "Exercícios adicionais",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m11",
      titulo: "Módulo 11: Using – Tesouraria",
      duracaoTotal: "",
      ordem: 11,
      aulas: [
        {
          id: "m11-t1",
          titulo: "Gestão de Contas Correntes",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m11-t2",
          titulo: "Gestão de Bancos",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m12",
      titulo: "Módulo 12: Laboratório de Tesouraria I",
      duracaoTotal: "",
      ordem: 12,
      aulas: [{ id: "m12-t1", titulo: "Prática", tipo: "texto", duracao: "" }],
    },
    {
      id: "m13",
      titulo: "Módulo 13: Configuring – Tesouraria",
      duracaoTotal: "",
      ordem: 13,
      aulas: [
        {
          id: "m13-t1",
          titulo: "Contas Correntes",
          tipo: "texto",
          duracao: "",
        },
        { id: "m13-t2", titulo: "Caixa e Bancos", tipo: "texto", duracao: "" },
        {
          id: "m13-t3",
          titulo: "Operações de Estorno",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m14",
      titulo: "Módulo 14: Laboratório de Tesouraria II",
      duracaoTotal: "",
      ordem: 14,
      aulas: [
        {
          id: "m14-t1",
          titulo: "Esclarecimento de dúvidas",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m14-t2",
          titulo: "Exercícios adicionais",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m15",
      titulo: "Módulo 15: Conceitos Básicos de Contabilidade",
      duracaoTotal: "",
      ordem: 15,
      aulas: [],
    },
    {
      id: "m16",
      titulo: "Módulo 16: Using – Contabilidade e Fiscalidade",
      duracaoTotal: "",
      ordem: 16,
      aulas: [
        {
          id: "m16-t1",
          titulo: "Elementos base da Contabilidade",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m16-t2",
          titulo: "Registo de Movimentos Contabilísticos",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m16-t3",
          titulo: "Report Financeiro",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m16-t4",
          titulo: "Operações de Validação e Diagnóstico",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m16-t5",
          titulo: "Apuramentos Periódicos",
          tipo: "texto",
          duracao: "",
        },
        { id: "m16-t6", titulo: "Mapas Fiscais", tipo: "texto", duracao: "" },
        {
          id: "m16-t7",
          titulo: "Operações de Fecho e Abertura",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m17",
      titulo: "Módulo 17: Laboratório de Contabilidade I",
      duracaoTotal: "",
      ordem: 17,
      aulas: [{ id: "m17-t1", titulo: "Prática", tipo: "texto", duracao: "" }],
    },
    {
      id: "m18",
      titulo: "Módulo 18: Configuring – Financeira",
      duracaoTotal: "",
      ordem: 18,
      aulas: [
        {
          id: "m18-t1",
          titulo: "Configurações para o registo de Movimentos Contabilísticos",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m18-t2",
          titulo: "Entidades e Utilitários",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m18-t3",
          titulo: "Configurações para Apuramentos",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m18-t4",
          titulo: "Integração de Vendas com Contabilidade",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m19",
      titulo: "Módulo 19: Laboratório de Contabilidade II",
      duracaoTotal: "",
      ordem: 19,
      aulas: [
        {
          id: "m19-t1",
          titulo: "Esclarecimento de dúvidas",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m19-t2",
          titulo: "Exercícios adicionais",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m20",
      titulo:
        "Módulo 20: Gestão de Ativos – Perspetiva Fiscal e Contabilística",
      duracaoTotal: "",
      ordem: 20,
      aulas: [],
    },
    {
      id: "m21",
      titulo: "Módulo 21: Using – Gestão de Ativos",
      duracaoTotal: "",
      ordem: 21,
      aulas: [
        {
          id: "m21-t1",
          titulo: "Critérios de depreciação",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m21-t2",
          titulo: "Criação da Ficha do bem",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m21-t3",
          titulo: "Operações sobre os bens",
          tipo: "texto",
          duracao: "",
        },
        { id: "m21-t4", titulo: "Exploração", tipo: "texto", duracao: "" },
        {
          id: "m21-t5",
          titulo: "Operações de fim de vida do ativo",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m22",
      titulo: "Módulo 22: Laboratório de Ativos",
      duracaoTotal: "",
      ordem: 22,
      aulas: [{ id: "m22-t1", titulo: "Prática", tipo: "texto", duracao: "" }],
    },
    {
      id: "m23",
      titulo: "Módulo 23: Using – Processamento de Salários",
      duracaoTotal: "",
      ordem: 23,
      aulas: [
        {
          id: "m23-t1",
          titulo: "Ficha do funcionário",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m23-t2",
          titulo: "Processamento de Vencimento",
          tipo: "texto",
          duracao: "",
        },
        { id: "m23-t3", titulo: "Subsídios", tipo: "texto", duracao: "" },
        {
          id: "m23-t4",
          titulo: "Recibos e Pagamento",
          tipo: "texto",
          duracao: "",
        },
        { id: "m23-t5", titulo: "Retroativos", tipo: "texto", duracao: "" },
        {
          id: "m23-t6",
          titulo: "Obrigações Fiscais",
          tipo: "texto",
          duracao: "",
        },
        { id: "m23-t7", titulo: "Cadastro", tipo: "texto", duracao: "" },
        {
          id: "m23-t8",
          titulo: "Mapas de Análise",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m24",
      titulo: "Módulo 24: Laboratório de Recursos Humanos I",
      duracaoTotal: "",
      ordem: 24,
      aulas: [{ id: "m24-t1", titulo: "Prática", tipo: "texto", duracao: "" }],
    },
    {
      id: "m25",
      titulo: "Módulo 25: Configuring – Recursos Humanos",
      duracaoTotal: "",
      ordem: 25,
      aulas: [
        { id: "m25-t1", titulo: "Dados mestre", tipo: "texto", duracao: "" },
        {
          id: "m25-t2",
          titulo: "Instrumento de Regulamentação do Trabalho",
          tipo: "texto",
          duracao: "",
        },
        { id: "m25-t3", titulo: "Configurações", tipo: "texto", duracao: "" },
      ],
    },
    {
      id: "m26",
      titulo: "Módulo 26: Laboratório de Recursos Humanos II",
      duracaoTotal: "",
      ordem: 26,
      aulas: [
        {
          id: "m26-t1",
          titulo: "Esclarecimento de dúvidas",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m26-t2",
          titulo: "Exercícios adicionais",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
  ];

  const modulosFonte: Modulo[] =
    (modulosDefinidosAqui &&
      modulosDefinidosAqui.length > 0 &&
      modulosDefinidosAqui) ||
    (dictById && dictById.length > 0 && dictById) ||
    (modulos && modulos.length > 0 && modulos) ||
    (curso?.modulos &&
      curso.modulos.length > 0 &&
      (curso.modulos as Modulo[])) ||
    modulosDataFallback;

  if (id && carregando) return <Spinner />;
  if (id && (erro || !cursoExibir)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Curso não encontrado
          </h2>
          <p className="mb-4 text-gray-700">
            {erro || "O curso solicitado não está disponível."}
          </p>
          <Link
            to="/cursos"
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            Voltar para Cursos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 ">
      {/* Banner */}

      <section className="relative h-[500px]  text-white mt-[-80px]">
        <div className=" max-w-6xl mx-auto px-4 absolute inset-0 z-10">
          <button
            onClick={() => navigate("/academia/cursos")}
            className="flex items-center text-white hover:text-blue-200 mb-8 mt-12 transition-colors">
            <ArrowLeft className="mr-2" size={20} />
            Voltar para Cursos
          </button>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-[5px] text-sm font-medium mb-4">
                {cursoExibir.categoria || "Desenvolvimento"}
              </span>
              <h1 className="text-3xl mt-6 md:text-5xl text-white font-bold mb-4">
                {cursoExibir.titulo}
              </h1>
              <p className="text-lg mt-4 text-white max-w-3xl mb-6">
                {cursoExibir.descricao}
              </p>

              <div className="mt-12 flex flex-wrap gap-4">
                <button
                  onClick={() => setModalInscricaoAberto(true)} // Open the FormularioInscricao modal
                  className="bg-gray-600  text-white px-8 py-3 rounded-[5px] font-medium transition-colors flex items-center">
                  Inscreva-se Agora
                </button>
              </div>
            </div>
          </div>
        </div>

        <img
          src="/academia/pagina home/detalhe.webp"
          alt="Banner Serviços de Hardware"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Conteúdo Principal */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Conteúdo Principal */}
            <div className="lg:col-span-2">
              {/* Conteúdo Programático */}
              <div className="bg-white rounded-[5px] shadow-sm p-6 border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  Conteúdo Programático
                </h2>

                {carregandoModulos ? (
                  <div className="flex justify-center py-8">
                    <Spinner />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {modulosFonte.length === 0 && (
                      <div className="text-center py-4 text-gray-500">
                        Nenhum conteúdo programático disponível.
                      </div>
                    )}
                    {modulosFonte.map((modulo: Modulo, index: number) => (
                      <div
                        key={modulo.id}
                        className="border rounded-[5px] overflow-hidden">
                        <button
                          onClick={() =>
                            setModuloAberto(
                              moduloAberto === index ? null : index
                            )
                          }
                          className="w-full px-5 py-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              <BookOpen className="text-blue-600" size={16} />
                            </div>
                            <h3 className="font-medium text-gray-900">
                              {modulo.titulo}
                            </h3>
                          </div>
                          <div className="flex items-center">
                            <ChevronDown
                              className={`transition-transform duration-200 ${
                                moduloAberto === index
                                  ? "transform rotate-180"
                                  : ""
                              }`}
                              size={20}
                            />
                          </div>
                        </button>

                        {moduloAberto === index &&
                          modulo.aulas &&
                          modulo.aulas.length > 0 && (
                            <div className="divide-y divide-gray-100">
                              {modulo.aulas.map((aula: Aula) => (
                                <div
                                  key={aula.id}
                                  className="px-5 py-3 flex items-center hover:bg-gray-50">
                                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                    <FileText
                                      className="text-gray-600"
                                      size={16}
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium text-gray-800">
                                      {aula.titulo}
                                    </h4>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Requisitos */}
              <div className="bg-white rounded-[5px] shadow-sm p-6 mt-8 border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  Requisitos
                </h2>
                <ul className="space-y-2 text-gray-600">
                  {cursoExibir.requisitos?.map(
                    (
                      requisito:
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactElement<
                            unknown,
                            string | JSXElementConstructor<any>
                          >
                        | Iterable<ReactNode>
                        | ReactPortal
                        | Promise<
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactPortal
                            | ReactElement<
                                unknown,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | null
                            | undefined
                          >
                        | null
                        | undefined,
                      index: Key | null | undefined
                    ) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{requisito}</span>
                      </li>
                    )
                  ) || <li>Nenhum pré-requisito necessário.</li>}
                </ul>
              </div>
            </div>

            {/* Barra Lateral */}
            <div className="space-y-6">
              {/* Instrutor */}
              <div className="bg-white rounded-[5px]shadow-sm p-6 border border-gray-100">
                <h3 className="font-semibold text-lg mb-4">Instrutor</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">I</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{"Instrutor"}</h4>
                    <p className="text-sm text-gray-500">{"Especialista"}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  {
                    "Profissional experiente e apaixonado por compartilhar conhecimento."
                  }
                </p>
              </div>

              {/* Informações do Curso */}
              <div className="bg-white rounded-[5px] shadow-sm p-6 border border-gray-100">
                <h3 className="font-semibold text-lg mb-4">
                  Informações do Curso
                </h3>
                <ul className="space-y-3">
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Duração</span>
                    <span className="font-medium">
                      {curso?.duracao || "N/A"} Semanas
                    </span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Horas</span>
                    <span className="font-medium">130h</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Idioma</span>
                    <span className="font-medium">Português</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-medium text-base mb-4 text-gray-900">
                  O que este curso inclui
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3 text-sm">
                    <Award className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">
                      Certificado de conclusão
                    </span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Material complementar</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm">
                    <Headphones className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Suporte ao aluno</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm">
                    <Play className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Exercícios práticos</span>
                  </li>
                </ul>
              </div>
              {/* Módulos e Aulas */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
                <h3 className="font-medium text-base mb-4 text-gray-900">
                  Conteúdo do Curso
                </h3>
                <div className="flex items-start space-x-4 p-3 rounded-lg bg-gradient-to-r   mt-6">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-base">
                      {modulosFonte.length} módulos completos
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {modulosFonte.reduce(
                        (total, modulo) => total + (modulo.aulas?.length || 0),
                        0
                      )}{" "}
                      aulas em total
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Vídeo */}
      <ModalVideo
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        videoUrl={videoUrl}
      />

      {/* Modal de Inscrição */}
      <FormularioInscricao
        isOpen={modalInscricaoAberto}
        onClose={() => setModalInscricaoAberto(false)}
        cursoNome={cursoExibir.titulo}
        cursoArea={cursoExibir.categoria || "Cursos"}
        onSuccess={() => {
          setModalInscricaoAberto(false);
        }}
      />
    </div>
  );
}
