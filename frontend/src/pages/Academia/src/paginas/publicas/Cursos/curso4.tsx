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
import { motion } from "framer-motion";

interface Avaliacao {
  id: string;
  nota: number;
  comentario: string;
  autor: string;
  criado_em: string;
}

export default function Curso4() {
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
  const [modalInscricaoAberto, setModalInscricaoAberto] = useState(false); // Add the state for the modal
  const {
    modulos,
    carregando: carregandoModulos,
    erro: erroModulos,
  } = useModulos(id);

  useEffect(() => {
    if (!id) return;
    setCarregandoAulas(true);
    api
      .get(`/cursos/${id}/aulas`)
      .then((res) => setAulas(res.data))
      .catch(() => setAulas([]))
      .finally(() => setCarregandoAulas(false));
  }, [id]);

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
    id: "sql-server",
    titulo: "SQL Server",
    categoria: "Banco de Dados",
    descricao:
      "Consultas SQL, modelagem, procedures, views e administração básica no SQL Server.",
    duracao: 3,
    nivel: "Intermediário" as any,
    requisitos: ["Lógica de programação"],
    imagemUrl: undefined,
  };

  const cursoExibir = (id ? curso : (localCurso as Curso)) as Curso;

  const instrutor =
    typeof cursoExibir?.instrutor === "object"
      ? cursoExibir?.instrutor
      : {
          nome: (cursoExibir as any)?.instrutor || "Instrutor",
          avaliacao: 0,
          alunos: 0,
          aulas: 0,
        };

  const podeAcessarAula = (aula: Aula): boolean => {
    if (!usuario) return false;
    if (usuario.papel === "admin" || usuario.papel === "instrutor") return true;
    return aula.livre || false;
  };

  const abrirVideoDemonstrativo = (url: string) => {
    setVideoUrl(url);
    setModalAberto(true);
  };

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

    console.log("[Curso4] id da rota:", raw);
    console.log("[Curso4] candidatos normalizados:", candidates);
    console.log(
      "[Curso4] chave encontrada no dicionário:",
      key ?? "nenhuma (fallback)"
    );

    return key ? modulosDict[key] : undefined;
  })();

  // CONTEÚDO LOCAL ESPECÍFICO DO CURSO 4
  const modulosDefinidosAqui: Modulo[] = [
    {
      id: "m4-1",
      titulo: "Módulo 1: Introdução ao SQL Server",
      duracaoTotal: "",
      aulas: [
        {
          id: "m4-1-a1",
          titulo: "Conceitos Básicos de Banco de Dados",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-1-a2",
          titulo: "O que é um banco de dados relacional",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-1-a3",
          titulo: "Conceito de Tabelas, Colunas, Registros, Chaves",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-1-a4",
          titulo: "Instalação do SQL Server e SSMS",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-1-a5",
          titulo:
            "Baixando o SQL Server Express e SQL Server Management Studio (SSMS)",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-1-a6",
          titulo: "Configuração inicial",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-1-a7",
          titulo: "Primeiros Comandos",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-1-a8",
          titulo: "CREATE DATABASE",
          duracao: "",
          tipo: "texto",
        },
        { id: "m4-1-a9", titulo: "CREATE TABLE", duracao: "", tipo: "texto" },
        {
          id: "m4-1-a10",
          titulo: "SELECT simples",
          duracao: "",
          tipo: "texto",
        },
      ],
      ordem: 0,
    },
    {
      id: "m4-2",
      titulo: "Módulo 2: Manipulação de Dados (DML)",
      duracaoTotal: "",
      aulas: [
        {
          id: "m4-2-a1",
          titulo: "Inserindo Dados",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-2-a2",
          titulo: "Comando INSERT INTO",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-2-a3",
          titulo: "Inserção de múltiplos registros",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-2-a4",
          titulo: "Atualizando e Removendo Dados",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-2-a5",
          titulo: "UPDATE com WHERE",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-2-a6",
          titulo: "DELETE com WHERE",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-2-a7",
          titulo: "Consultas Simples",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-2-a8",
          titulo: "SELECT, DISTINCT",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-2-a9",
          titulo: "Filtros com WHERE",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-2-a10",
          titulo: "Ordenação com ORDER BY",
          duracao: "",
          tipo: "texto",
        },
      ],
      ordem: 1,
    },
    {
      id: "m4-3",
      titulo: "Módulo 3: Consultas Avançadas",
      duracaoTotal: "",
      aulas: [
        {
          id: "m4-3-a1",
          titulo: "Funções de Agregação",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-3-a2",
          titulo: "COUNT, SUM, AVG, MAX, MIN",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-3-a3",
          titulo: "Agrupamentos com GROUP BY e HAVING",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-3-a4",
          titulo: "Joins (Junções)",
          duracao: "",
          tipo: "texto",
        },
        { id: "m4-3-a5", titulo: "INNER JOIN", duracao: "", tipo: "texto" },
        {
          id: "m4-3-a6",
          titulo: "LEFT JOIN, RIGHT JOIN",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-3-a7",
          titulo: "FULL OUTER JOIN",
          duracao: "",
          tipo: "texto",
        },
      ],
      ordem: 2,
    },
    {
      id: "m4-4",
      titulo: "Módulo 4: Estrutura de Banco de Dados (DDL)",
      duracaoTotal: "",
      aulas: [
        {
          id: "m4-4-a1",
          titulo: "Criação e Modificação de Estruturas",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-4-a2",
          titulo: "CREATE TABLE, ALTER TABLE, DROP TABLE",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-4-a3",
          titulo: "Tipos de dados no SQL Server",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-4-a4",
          titulo: "Chaves e Restrições",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-4-a5",
          titulo: "PRIMARY KEY, FOREIGN KEY",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-4-a6",
          titulo: "UNIQUE, CHECK, DEFAULT, NOT NULL",
          duracao: "",
          tipo: "texto",
        },
      ],
      ordem: 3,
    },
    {
      id: "m4-5",
      titulo: "Módulo 5: Programação SQL (T-SQL)",
      duracaoTotal: "",
      aulas: [
        {
          id: "m4-5-a1",
          titulo: "Variáveis, IF, WHILE",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-5-a2",
          titulo: "Declaração e uso de variáveis",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-5-a3",
          titulo: "Controle de fluxo",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-5-a4",
          titulo: "Stored Procedures e Functions",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-5-a5",
          titulo: "CREATE PROCEDURE, CREATE FUNCTION",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-5-a6",
          titulo: "Parâmetros, retorno",
          duracao: "",
          tipo: "texto",
        },
      ],
      ordem: 4,
    },
    {
      id: "m4-6",
      titulo: "Módulo 6: Administração e Segurança",
      duracaoTotal: "",
      aulas: [
        {
          id: "m4-6-a1",
          titulo: "Backup e Restauração",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-6-a2",
          titulo: "BACKUP DATABASE, RESTORE DATABASE",
          duracao: "",
          tipo: "texto",
        },
        {
          id: "m4-6-a3",
          titulo: "Estratégias de backup",
          duracao: "",
          tipo: "texto",
        },
        { id: "m4-6-a4", titulo: "Views", duracao: "", tipo: "texto" },
        {
          id: "m4-6-a5",
          titulo: "Criação de VIEWs",
          duracao: "",
          tipo: "texto",
        },
      ],
      ordem: 5,
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
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#4B5563", // Cor ligeiramente mais clara no hover
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  }}
                  whileTap={{
                    scale: 0.98,
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 10,
                  }}
                  onClick={() => setModalInscricaoAberto(true)}
                  className="bg-gray-700 text-white px-8 py-3 rounded-[5px] font-medium transition-colors flex items-center">
                  Inscreva-se Agora
                </motion.button>

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
              <div className="bg-white rounded-[5px] shadow-sm p-6 border border-gray-100">
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
                      {cursoExibir.duracao || "N/A"} Semanas
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
        cursoNome={cursoExibir?.titulo || "Curso"}
        cursoArea={cursoExibir?.categoria || "Cursos"}
        onSuccess={() => {
          setModalInscricaoAberto(false);
        }}
      />
    </div>
  );
}
