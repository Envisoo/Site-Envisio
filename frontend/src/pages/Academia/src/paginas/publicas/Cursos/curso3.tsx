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

interface Avaliacao {
  id: string;
  nota: number;
  comentario: string;
  autor: string;
  criado_em: string;
}

export default function Curso3() {
  const { id } = useParams<{ id: string }>();
  const { curso, carregando, erro } = useCurso(id || "");
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

  // Curso local para rotas fixas (sem :id)
  const localCurso: Partial<Curso> = {
    id: "logica-de-programacao",
    titulo: "Lógica de Programação",
    categoria: "Programação",
    descricao:
      "Aprenda fundamentos: variáveis, estruturas de decisão, loops e decomposição de problemas.",
    duracao: 16 as any,
    nivel: "iniciante" as any,
    requisitos: ["Vontade de aprender"],
    imagemUrl: undefined,
  };

  const cursoExibir = (id ? curso : (localCurso as Curso)) as Curso;

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
    const courseId = curso?.id ? String(curso.id) : "";
    const titleSlug = curso?.titulo ? slugify(curso.titulo) : "";

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

    console.log("[Curso3] id da rota:", raw);
    console.log("[Curso3] candidatos normalizados:", candidates);
    console.log(
      "[Curso3] chave encontrada no dicionário:",
      key ?? "nenhuma (fallback)"
    );

    return key ? modulosDict[key] : undefined;
  })();

  // CONTEÚDO LOCAL ESPECÍFICO DO CURSO 3
  const modulosDefinidosAqui: Modulo[] = [
    {
      id: "m3-1",
      titulo: "Módulo 1: Fundamentos da Lógica",
      duracaoTotal: "",
      aulas: [
        {
          id: "m3-1-a1",
          titulo: "O que é lógica de programação?",
          duracao: "15m",
          tipo: "texto",
        },
        {
          id: "m3-1-a2",
          titulo: "Algoritmo e pseudocódigo",
          duracao: "20m",
          tipo: "texto",
        },
        { id: "m3-1-a3", titulo: "Fluxogramas", duracao: "20m", tipo: "texto" },
        {
          id: "m3-1-a4",
          titulo: "Entrada, processamento e saída",
          duracao: "15m",
          tipo: "texto",
        },
      ],
      ordem: 0,
    },
    {
      id: "m3-2",
      titulo: "Módulo 2: Tipos de Dados e Variáveis",
      duracaoTotal: "55m",
      aulas: [
        {
          id: "m3-2-a1",
          titulo: "Constantes e variáveis",
          duracao: "15m",
          tipo: "texto",
        },
        {
          id: "m3-2-a2",
          titulo: "Tipos primitivos (inteiro, real, caractere, lógico)",
          duracao: "20m",
          tipo: "texto",
        },
        {
          id: "m3-2-a3",
          titulo: "Atribuição e entrada de dados",
          duracao: "20m",
          tipo: "texto",
        },
      ],
      ordem: 1,
    },
    {
      id: "m3-3",
      titulo: "Módulo 3: Operadores e Expressões",
      duracaoTotal: "1h 00m",
      aulas: [
        {
          id: "m3-3-a1",
          titulo: "Operadores aritméticos (+, -, *, /, %)",
          duracao: "20m",
          tipo: "texto",
        },
        {
          id: "m3-3-a2",
          titulo: "Operadores relacionais (>, <, ==, !=, etc.)",
          duracao: "20m",
          tipo: "texto",
        },
        {
          id: "m3-3-a3",
          titulo: "Operadores lógicos (E, OU, NÃO)",
          duracao: "20m",
          tipo: "texto",
        },
      ],
      ordem: 2,
    },
    {
      id: "m3-4",
      titulo: "Módulo 4: Estruturas Condicionais",
      duracaoTotal: "55m",
      aulas: [
        {
          id: "m3-4-a1",
          titulo: "Comando SE, SENÃO",
          duracao: "20m",
          tipo: "texto",
        },
        {
          id: "m3-4-a2",
          titulo: "Condições aninhadas",
          duracao: "20m",
          tipo: "texto",
        },
        {
          id: "m3-4-a3",
          titulo: "SE com operadores lógicos",
          duracao: "15m",
          tipo: "texto",
        },
      ],
      ordem: 3,
    },
    {
      id: "m3-5",
      titulo: "Módulo 5: Estruturas de Repetição",
      duracaoTotal: "55m",
      aulas: [
        {
          id: "m3-5-a1",
          titulo: "Laços com ENQUANTO (while)",
          duracao: "20m",
          tipo: "texto",
        },
        {
          id: "m3-5-a2",
          titulo: "Laços com PARA (for)",
          duracao: "20m",
          tipo: "texto",
        },
        {
          id: "m3-5-a3",
          titulo: "Laços com REPITA (do-while)",
          duracao: "10m",
          tipo: "texto",
        },
        {
          id: "m3-5-a4",
          titulo: "Contadores e acumuladores",
          duracao: "5m",
          tipo: "texto",
        },
      ],
      ordem: 4,
    },
    {
      id: "m3-6",
      titulo: "Módulo 6: Vetores e Matrizes",
      duracaoTotal: "1h 05m",
      aulas: [
        {
          id: "m3-6-a1",
          titulo: "Introdução a vetores (arrays unidimensionais)",
          duracao: "25m",
          tipo: "texto",
        },
        {
          id: "m3-6-a2",
          titulo: "Matrizes (bidimensionais)",
          duracao: "20m",
          tipo: "texto",
        },
        {
          id: "m3-6-a3",
          titulo: "Percorrendo com laços",
          duracao: "20m",
          tipo: "texto",
        },
      ],
      ordem: 5,
    },
    {
      id: "m3-7",
      titulo: "Módulo 7: Projeto Final e Revisão",
      duracaoTotal: "1h 20m",
      aulas: [
        {
          id: "m3-7-a1",
          titulo: "Planeamento de um algoritmo completo",
          duracao: "25m",
          tipo: "texto",
        },
        {
          id: "m3-7-a2",
          titulo: "Aplicação prática do conhecimento",
          duracao: "25m",
          tipo: "texto",
        },
        {
          id: "m3-7-a3",
          titulo: "Correção de exercícios e desafios",
          duracao: "15m",
          tipo: "texto",
        },
        {
          id: "m3-7-a4",
          titulo:
            "Projeto final: Sistema de caixa (produtos, total, desconto, pagamento)",
          duracao: "15m",
          tipo: "texto",
        },
      ],
      ordem: 6,
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
      <section className="relative bg-gradient-to-r h-[500px] from-gray-800 to-gray-500 text-white mt-[-75px]  pt-10">
        <div className="max-w-6xl mx-auto px-4">
          <button
            onClick={() => navigate("/academia/cursos")}
            className="flex items-center text-white hover:text-blue-200 mb-8 transition-colors">
            <ArrowLeft className="mr-2" size={20} />
            Voltar para Cursos
          </button>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
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
                  className="bg-red-500 hover:bg-red-700 text-white px-8 py-3 rounded-[5px] font-medium transition-colors flex items-center">
                  Inscreva-se Agora
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Conteúdo Principal */}
            <div className="lg:col-span-2">
              {/* Conteúdo Programático */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
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
                        className="border rounded-lg overflow-hidden">
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
              <div className="bg-white rounded-xl shadow-sm p-6 mt-8 border border-gray-100">
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
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
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
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="font-semibold text-lg mb-4">
                  Informações do Curso
                </h3>
                <ul className="space-y-3">
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Duração</span>
                    <span className="font-medium">
                      {cursoExibir.duracao || "N/A"} horas
                    </span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Nível</span>
                    <span className="font-medium">
                      {cursoExibir.nivel || "Todos"}
                    </span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Idioma</span>
                    <span className="font-medium">Português</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Certificado</span>
                    <span className="font-medium text-green-600">Incluso</span>
                  </li>
                </ul>
              </div>

              {/* Botão de Contato Fixo em Mobile */}
              <div className="lg:hidden bg-white p-4 shadow-lg fixed bottom-0 left-0 right-0 z-10 border-t border-gray-200">
                <button
                  onClick={() => navigate(-1)}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-6 rounded-lg font-medium text-lg transition-all duration-300 flex items-center justify-center space-x-2">
                  <MessageCircle size={20} />
                  <span>Entrar em Contato</span>
                </button>
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
