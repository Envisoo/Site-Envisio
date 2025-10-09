/** @format */

import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useCurso } from "../../../hooks/useCurso";
import { useModulos } from "../../../hooks/useModulos";

import {
  Award,
  ArrowLeft,
  BookOpen,
  Play,
  Headphones,
  ChevronDown,
  FileText,
} from "lucide-react";
import Spinner from "../../../componentes/Spinner";
import ModalVideo from "../../../componentes/ModalVideo";
import FormularioInscricao from "../../../componentes/FormularioInscricao"; // Import the FormularioInscricao component
import api from "../../../utils/api";
import { Curso, Modulo, Aula } from "../../../tipos/Curso";
import {
  modulosDataFallback,
  modulosPorCurso as modulosDict,
} from "../../../data/Modulo";
import { motion } from "framer-motion";

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
  const navigate = useNavigate();
  const [modalAberto, setModalAberto] = useState(false);
  const [videoUrl] = useState("");

  const [, setAulas] = useState<any[]>([]);
  const [, setCarregandoAulas] = useState(true);
  const [, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [, setMediaAvaliacoes] = useState(0);
  const [, setCarregandoAvaliacoes] = useState(true);
  const [moduloAberto, setModuloAberto] = useState<number | null>(null);
  const [modalInscricaoAberto, setModalInscricaoAberto] = useState(false); // Add the state for the FormularioInscricao modal
  const { modulos, carregando: carregandoModulos } = useModulos(id);

  // Fallback local para quando esta página é acessada sem :id na rota
  const cursoLocal: Curso = {
    id: "programacao-web-frontend",
    titulo: "Programação Web Frontend",
    descricao:
      "HTML, CSS e JavaScript modernos. Crie interfaces responsivas com boas práticas.",
    categoria: "Programação",
    duracao: 2,
    nivel: "iniciante",
    imagemUrl: "",
    requisitos: ["Lógica de programação"],
  } as Curso;

  // Seleciona a fonte de dados do curso: API (quando há id) ou local (sem id)
  const curso = id ? dadosCurso.curso : (cursoLocal as Curso);
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
      id: "m2-1",
      titulo: "Módulo 1: Introdução ao Curso",
      duracaoTotal: "",
      aulas: [
        {
          id: "m2-1-a1",
          titulo: "Definição da Programação Web",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-1-a2",
          titulo:
            "O mercado em Angola e no mundo (oportunidades e remunerações)",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-1-a3",
          titulo: "O mito da IA capaz de substituir os programadores",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-1-a4",
          titulo: "Apresentação do conteúdo programático do curso",
          duracao: "",
          tipo: "texto",
        },
      ],
      ordem: 0,
    },
    {
      id: "m2-2",
      titulo: "Módulo 2: O Projecto de Fim de Curso",
      duracaoTotal: "",
      aulas: [
        {
          id: "m2-2-a1",
          titulo: "Apresentação do projecto de fim de curso",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-2-a2",
          titulo: "Instalação e configuração das ferramentas de trabalho",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-2-a3",
          titulo: "Introdução ao Git & Github",
          duracao: "",
          tipo: "texto",
        },
      ],
      ordem: 1,
    },
    {
      id: "m2-3",
      titulo: "Módulo 3: HiperText Markup Language (HTML)",
      duracaoTotal: "",
      aulas: [
        {
          id: "m2-3-a1",
          titulo: "Tags e a estrutura de um documento HTML",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-3-a2",
          titulo: "Elementos de texto e formatação",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-3-a3",
          titulo: "Links e navegação",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-3-a4",
          titulo: "Imagens e mídia",
          duracao: "",
          tipo: "texto",
        },
        { id: "m2-3-a5", titulo: "Tabelas", duracao: "", tipo: "texto" },
        {
          id: "m2-3-a6",
          titulo: "Formulários e interactividade",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-3-a7",
          titulo: "Estruturação da página web",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-3-a8",
          titulo: "Comentários no código HTML",
          duracao: "",
          tipo: "texto",
        },
      ],
      ordem: 2,
    },
    {
      id: "m2-4",
      titulo: "Módulo 4: Cascading Style Sheets (CSS)",
      duracaoTotal: "",
      aulas: [
        {
          id: "m2-4-a1",
          titulo: "Introdução ao CSS",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-4-a2",
          titulo:
            "Formas de aplicação do CSS e vantagens no uso do CSS externo",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-4-a3",
          titulo: "Seletores e especificidade",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-4-a4",
          titulo: "Seletores: tag, classe e id",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-4-a5",
          titulo: "Seletores combinados e descendentes",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-4-a6",
          titulo: "Propriedades de texto e cores",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-4-a7",
          titulo: "Layouts com Box Model",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-4-a8",
          titulo: "Posicionamento e display",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-4-a9",
          titulo: "Flexbox layout e suas propriedades",
          duracao: "",
          tipo: "texto",
        },
        { id: "m2-4-a10", titulo: "Grid layout", duracao: "", tipo: "texto" },
        {
          id: "m2-4-a11",
          titulo: "Responsividade com Media Queries",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-4-a12",
          titulo: "Animações e transições",
          duracao: "",
          tipo: "texto",
        },
      ],
      ordem: 3,
    },
    {
      id: "m2-5",
      titulo: "Módulo 5: JQuery",
      duracaoTotal: "",
      aulas: [
        {
          id: "m2-5-a1",
          titulo: "Introdução ao JQuery",
          duracao: "",
          tipo: "texto",
        },
        { id: "m2-5-a2", titulo: "Seletores", duracao: "", tipo: "texto" },
        {
          id: "m2-5-a3",
          titulo: "Manipulação de elementos",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-5-a4",
          titulo: "Manipulação de eventos",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-5-a5",
          titulo: "Criação e inserção de elementos",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-5-a6",
          titulo: "Captura de dados",
          duracao: "",
          tipo: "texto",
        },
      ],
      ordem: 4,
    },
    {
      id: "m2-6",
      titulo: "Módulo 6: Conclusão e Apresentação do Projecto de Fim de Curso",
      duracaoTotal: "",
      aulas: [
        {
          id: "m2-6-a1",
          titulo:
            "Apresentação do projecto de fim de curso e esclarecimento de dúvidas",
          duracao: "",
          tipo: "texto",
        },
      ],
      ordem: 5,
    },
    {
      id: "m2-7",
      titulo: "Módulo 7: Ética Profissional",
      duracaoTotal: "",
      aulas: [
        {
          id: "m2-7-a1",
          titulo:
            "A colaboração dentro de uma equipa de desenvolvimento de software",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-7-a2",
          titulo:
            "A comunicação como chave para o sucesso de qualquer projecto",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-7-a3",
          titulo: "Canais de comunicação e ferramentas de colaboração",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-7-a4",
          titulo: "Pontualidade, organização e responsabilidade",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-7-a5",
          titulo:
            "Resolução de conflitos e respeito às diferentes ideologias, crenças e opiniões",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-7-a6",
          titulo: "Lei 22/11 de 17 de Junho – Proteção de Dados Pessoais",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-7-a7",
          titulo: "Acordos de Confidencialidade",
          duracao: "",
          tipo: "texto",
        },
      ],
      ordem: 6,
    },
    {
      id: "m2-8",
      titulo: "Módulo 8: Perfil Profissional",
      duracaoTotal: "",
      aulas: [
        {
          id: "m2-8-a1",
          titulo:
            "Como adquirir experiência profissional sem trabalhar por conta de outrem",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-8-a2",
          titulo: "O Currículo Vitae de um programador",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-8-a3",
          titulo: "Criação de um portfólio de sucesso",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-8-a4",
          titulo: "O perfil no LinkedIn",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-8-a5",
          titulo: "Identificação da oportunidade ideal de trabalho",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m2-8-a6",
          titulo: "Progressão de carreira e o empreendedorismo Tech",
          duracao: "",
          tipo: "texto",
        },
      ],
      ordem: 7,
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

  if (carregando) return <Spinner />;
  if (erro || !curso) {
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
                {curso.categoria || "Desenvolvimento"}
              </span>
              <h1 className="text-3xl mt-6 md:text-5xl text-white font-bold mb-4">
                {curso.titulo}
              </h1>
              <p className="text-lg mt-4 text-white max-w-3xl mb-6">
                {curso.descricao}
              </p>

              <div className="mt-12 flex flex-wrap gap-4">
                <div className="relative">
                  <motion.button
                    disabled
                    whileHover={{}}
                    whileTap={{}}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 10,
                    }}
                    className="bg-gray-400 text-white px-8 py-3 rounded-[5px] font-medium transition-colors flex items-center cursor-not-allowed opacity-70">
                    Inscreva-se Agora
                  </motion.button>
                </div>

                <motion.a
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 10,
                  }}
                  href="https://wa.me/244947137676?text=Olá%20Envisio,%20gostaria%20de%20saber%20mais%20sobre%20os%20cursos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" w-[200px] border text-white border-gray-300 bg-transparent  font-semibold py-3 px-8 rounded-[5px] transition-all duration-300 flex items-center justify-center">
                  Mais informações
                </motion.a>
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
                  {curso.requisitos?.map(
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

            <div className="space-y-6">
              {/* Instrutor */}
              <div className="bg-whiterounded-[5px] shadow-sm p-6 border border-gray-100">
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
                      {curso.duracao || "N/A"} Semanas
                    </span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Nível</span>
                    <span className="font-medium">
                      {curso.nivel || "Todos"}
                    </span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Idioma</span>
                    <span className="font-medium">Português</span>
                  </li>
                </ul>
              </div>

              {/* O que este curso inclui */}
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

              {/* Benefícios do Curso */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
                <h3 className="font-medium text-base mb-4 text-gray-900">
                  O que você vai conquistar:
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start text-sm">
                    <span className="text-gray-500 mr-2">✅</span>
                    <div>
                      <span className="font-medium">Competência Sólida</span>
                    </div>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-gray-500 mr-2">✅</span>
                    <div>
                      <span className="font-medium">
                        Reconhecimento Profissional
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-gray-500 mr-2">✅</span>
                    <div>
                      <span className="font-medium">Confiança Total</span>
                    </div>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-gray-500 mr-2">✅</span>
                    <div>
                      <span className="font-medium">Networking</span>
                    </div>
                  </li>
                </ul>
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
        cursoNome={curso.titulo}
        cursoArea={curso.categoria || "Cursos"}
        onSuccess={() => {
          setModalInscricaoAberto(false);
        }}
      />
    </div>
  );
}
