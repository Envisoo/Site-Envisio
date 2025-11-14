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

  // Fallback local para rota fixa (sem :id)
  const cursoLocal: Curso = {
    id: "cegid-primavera",
    titulo: "Cegid Primavera: Funcionalidades e Módulos",
    descricao:
      "Aprenda a dominar o ERP mais utilizado em Angola e Portugal para gestão empresarial completa.",
    categoria: "Gestão/ERP",
    duracao: "120h" as any,
    horas: "120" as any,
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
    duracao: "" as any,
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

  // Permissão de acesso às aulas

  // Função para renderizar estrelas

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
      titulo: "Módulo 1: Conceitos Base de ERP",
      duracaoTotal: "",
      ordem: 1,
      aulas: [
        { id: "m1-a1", titulo: "O que é um ERP", tipo: "texto", duracao: "" },
        {
          id: "m1-a2",
          titulo: "História e evolução do ERP",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m1-a3",
          titulo: "Por que é importante",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m1-a4",
          titulo: "Como funciona um sistema ERP",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m1-a5",
          titulo: "Tipos de implementação de ERP",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m1-a6",
          titulo: "Seis principais benefícios do ERP",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m2",
      titulo: "Módulo 2: Instalação e Administração do ERP Primavera",
      duracaoTotal: "",
      ordem: 2,
      aulas: [
        { id: "m2-a1", titulo: "Instalação", tipo: "texto", duracao: "" },
        { id: "m2-a2", titulo: "Enquadramento", tipo: "texto", duracao: "" },
        {
          id: "m2-a3",
          titulo: "Criação de Empresas",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m2-a4",
          titulo: "Manutenção de Dados",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m2-a5",
          titulo: "Gestão de Utilizadores e Segurança",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m2-a6",
          titulo: "Outras funcionalidades",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m3",
      titulo: "Módulo 3: Logística – Configuração",
      duracaoTotal: "",
      ordem: 3,
      aulas: [
        {
          id: "m3-a1",
          titulo: "Documentos de Compras",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m3-a2",
          titulo: "Documentos de Vendas",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m3-a3",
          titulo: "Documentos Internos",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m3-a4",
          titulo: "Documentos de Transferência",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m3-a5",
          titulo: "Configurações e Valorização de Stock",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m4",
      titulo: "Módulo 4: Gestão de Inventário – Utilização",
      duracaoTotal: "",
      ordem: 4,
      aulas: [
        { id: "m4-a1", titulo: "Enquadramento", tipo: "texto", duracao: "" },
        {
          id: "m4-a2",
          titulo: "Gestão de Inventário",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m4-a3",
          titulo: "Movimentos de Stock",
          tipo: "texto",
          duracao: "",
        },
        { id: "m4-a4", titulo: "Dados Mestre", tipo: "texto", duracao: "" },
        {
          id: "m4-a5",
          titulo: "Operações de Expedição e Receção",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m4-a6",
          titulo: "Valorização do Stock",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m4-a7",
          titulo: "Processo de Inventariação",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m5",
      titulo: "Módulo 5: Compras – Utilização",
      duracaoTotal: "",
      ordem: 5,
      aulas: [
        {
          id: "m5-a1",
          titulo: "Entidades e Artigos",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m5-a2",
          titulo: "Registo de Documentos de Compra",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m5-a3",
          titulo: "Circuito Documental",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m5-a4",
          titulo: "Operações de Estorno e Anulação",
          tipo: "texto",
          duracao: "",
        },
        { id: "m5-a5", titulo: "Mapas de Análise", tipo: "texto", duracao: "" },
      ],
    },
    {
      id: "m6",
      titulo: "Módulo 6: Vendas – Utilização",
      duracaoTotal: "",
      ordem: 6,
      aulas: [
        {
          id: "m6-a1",
          titulo: "Criar Entidades e Artigos",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m6-a2",
          titulo: "Documentos de Venda",
          tipo: "texto",
          duracao: "",
        },
        { id: "m6-a3", titulo: "Editor de Vendas", tipo: "texto", duracao: "" },
        {
          id: "m6-a4",
          titulo: "Operações de Anulação/Estorno",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m6-a5",
          titulo: "Obrigações Fiscais e Comunicação de Documentos",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m6-a6",
          titulo: "Mapas e Estatísticas de Vendas",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m7",
      titulo: "Módulo 7: POS (Point of Sales)",
      duracaoTotal: "",
      ordem: 7,
      aulas: [
        { id: "m7-a1", titulo: "Configuração POS", tipo: "texto", duracao: "" },
        {
          id: "m7-a2",
          titulo: "Operações (Abertura, Fecho, Vendas, Estornos, Exploração)",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m8",
      titulo: "Módulo 8: Tesouraria – Configuração",
      duracaoTotal: "",
      ordem: 8,
      aulas: [
        { id: "m8-a1", titulo: "Contas Correntes", tipo: "texto", duracao: "" },
        { id: "m8-a2", titulo: "Caixa e Bancos", tipo: "texto", duracao: "" },
      ],
    },
    {
      id: "m9",
      titulo: "Módulo 9: Tesouraria – Utilização",
      duracaoTotal: "",
      ordem: 9,
      aulas: [
        {
          id: "m9-a1",
          titulo: "Gestão de Contas Correntes",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m9-a2",
          titulo: "Operações sobre Pendentes",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m9-a3",
          titulo: "Planos de Pagamento e Retenção",
          tipo: "texto",
          duracao: "",
        },
        { id: "m9-a4", titulo: "Mapas de Análise", tipo: "texto", duracao: "" },
      ],
    },
    {
      id: "m10",
      titulo: "Módulo 10: Recursos Humanos – Configuração",
      duracaoTotal: "",
      ordem: 10,
      aulas: [
        {
          id: "m10-a1",
          titulo: "Dados Mestre – Ficha do Funcionário",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m10-a2",
          titulo: "Configurações no Administrador",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m10-a3",
          titulo: "Configurações de Processamentos e Alterações Mensais",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m11",
      titulo: "Módulo 11: Recursos Humanos – Utilização",
      duracaoTotal: "",
      ordem: 11,
      aulas: [
        {
          id: "m11-a1",
          titulo: "Ficha do Funcionário",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m11-a2",
          titulo: "Processamento de Vencimento",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m11-a3",
          titulo: "Alterações Mensais",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m11-a4",
          titulo: "Ausências, Férias e Remunerações",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m11-a5",
          titulo: "Obrigações Fiscais",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m11-a6",
          titulo: "Cadastro e Mapas de Análise",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m12",
      titulo: "Módulo 12: Gestão de Ativos",
      duracaoTotal: "",
      ordem: 12,
      aulas: [
        {
          id: "m12-a1",
          titulo: "Critérios e Planos de Depreciação",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m12-a2",
          titulo: "Criação de Fichas de Bens",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m12-a3",
          titulo: "Operações sobre os Bens",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m12-a4",
          titulo: "Exploração e Mapas Fiscais",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m12-a5",
          titulo: "Operações de Fim de Vida do Ativo",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m13",
      titulo: "Módulo 13: Financeira – Configuração",
      duracaoTotal: "",
      ordem: 13,
      aulas: [
        {
          id: "m13-a1",
          titulo: "Configurações de Movimentos Contabilísticos",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m13-a2",
          titulo: "Criação e Transferência de Contas",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m13-a3",
          titulo: "Configurações para Apuramentos",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m13-a4",
          titulo: "Integração com Contabilidade",
          tipo: "texto",
          duracao: "",
        },
      ],
    },
    {
      id: "m14",
      titulo: "Módulo 14: Contabilidade e Fiscalidade – Utilização",
      duracaoTotal: "",
      ordem: 14,
      aulas: [
        {
          id: "m14-a1",
          titulo: "Elementos Base da Contabilidade",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m14-a2",
          titulo: "Registo de Movimentos",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m14-a3",
          titulo: "Reports e Mapas Fiscais",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m14-a4",
          titulo: "Operações de Validação e Apuramento",
          tipo: "texto",
          duracao: "",
        },
        {
          id: "m14-a5",
          titulo: "Fecho e Abertura de Exercício",
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

              <div className="mt-[-20px] flex flex-wrap gap-4">
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
              <div className="bg-white rounded-[5px]shadow-sm p-6 border border-gray-100">
                <h3 className="font-semibold text-lg mb-4">Instrutor</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">I</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{"Lucas"}</h4>
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
        cursoNome={cursoExibir.titulo}
        cursoArea={cursoExibir.categoria || "Cursos"}
        onSuccess={() => {
          setModalInscricaoAberto(false);
        }}
      />
    </div>
  );
}
