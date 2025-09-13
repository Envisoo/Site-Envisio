/** @format */

import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contextos/AuthContext";
import { useCurso } from "../../hooks/useCurso";
import { Helmet } from "react-helmet-async";
import {
  Clock,
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
} from "lucide-react";
import Spinner from "../../componentes/Spinner";
import ModalVideo from "../../componentes/ModalVideo";
import api from "../../utils/api";

// Tabs para navegação
const TABS = [
  { key: "sobre", label: "Sobre o Curso" },
  { key: "aulas", label: "Conteúdo/Aulas" },
  { key: "instrutor", label: "Instrutor" },
  { key: "avaliacoes", label: "Avaliações" },
];

interface Avaliacao {
  id: string;
  nota: number;
  comentario: string;
  autor: string;
  criado_em: string;
}

interface Aula {
  id: string;
  titulo: string;
  livre: boolean;
  // ... outras propriedades da aula
}

export default function CursoDetalhe() {
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
    typeof curso?.instrutor === "object"
      ? curso?.instrutor
      : {
          nome: curso?.instrutor || "Instrutor",
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
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>{curso.titulo} | Academia</title>
        <meta name="description" content={curso.descricao} />
      </Helmet>

      {/* Banner */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-600 text-white py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-10 items-center">
          {/* Info */}
          <div className="flex-1">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-white hover:text-blue-200 mb-6">
              <ArrowLeft className="mr-2" size={20} />
              Voltar
            </button>
            <span className="inline-block px-3 py-1 bg-white text-blue-700 rounded-full text-xs font-medium mb-4">
              {curso.categoria}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {curso.titulo}
            </h1>
            <p className="text-lg text-blue-100 mb-6">{curso.descricao}</p>
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center">
                <Star className="text-yellow-400 fill-yellow-400 mr-2" />
                <span>
                  {mediaAvaliacoes || curso.avaliacao || 0}{" "}
                  <span className="text-blue-100">/ 5</span>
                </span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2" />
                <span>{instrutor.alunos || 0} alunos</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2" />
                <span>{curso.duracao} horas</span>
              </div>
              <div className="flex items-center">
                <Eye className="mr-2" />
                <span>{curso.visualizacoes || 0} visualizações</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-white">
                {curso.preco?.toLocaleString()} Kz
              </span>
              {curso.preco && (
                <span className="text-lg text-blue-200 line-through">
                  {(curso.preco * 1.2).toLocaleString()} Kz
                </span>
              )}
            </div>
            <button className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-lg shadow-lg transition mb-4">
              Matricular-se Agora
            </button>
            <button
              onClick={() =>
                abrirVideoDemonstrativo(
                  "https://www.youtube.com/embed/VIDEO_ID"
                )
              }
              className="flex items-center text-white hover:text-blue-200">
              <Play className="mr-2" /> Assistir demonstração
            </button>
          </div>
          {/* Imagem */}
          <div className="w-full md:w-96 flex-shrink-0">
            <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={curso.imagem || "/placeholder-curso.jpg"}
                alt={curso.titulo}
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 mt-10 py-10">
        <div className="flex border-b border-gray-200 mb-8">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`py-3 px-6 font-semibold border-b-2 transition ${
                tab === t.key
                  ? "border-blue-600 text-blue-700"
                  : "border-transparent text-gray-500 hover:text-blue-600"
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Conteúdo das tabs */}
        {tab === "sobre" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Sobre o Curso</h2>
            <p className="text-gray-700 text-lg mb-6">{curso.descricao}</p>

            {/* Informações detalhadas do curso */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold text-lg mb-4">
                  Informações do Curso
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Nível:</span>
                    <span className="font-medium capitalize">
                      {curso.nivel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duração:</span>
                    <span className="font-medium">{curso.duracao} horas</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium capitalize">
                      {curso.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Categoria:</span>
                    <span className="font-medium">{curso.categoria}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold text-lg mb-4">
                  Benefícios Inclusos
                </h3>
                <div className="space-y-3">
                  {curso.acessoVitalicio && (
                    <div className="flex items-center gap-3">
                      <Infinity className="text-green-600" size={20} />
                      <span>Acesso vitalício</span>
                    </div>
                  )}
                  {curso.suporte && (
                    <div className="flex items-center gap-3">
                      <Headphones className="text-blue-600" size={20} />
                      <span>Suporte ao aluno</span>
                    </div>
                  )}
                  {curso.certificado && (
                    <div className="flex items-center gap-3">
                      <Award className="text-yellow-600" size={20} />
                      <span>Certificado de conclusão</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "aulas" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Conteúdo do Curso</h2>
            {carregandoAulas ? (
              <div className="py-8 text-center text-gray-500">
                Carregando aulas...
              </div>
            ) : aulas.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                Nenhuma aula cadastrada.
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {aulas.map((aula) => (
                  <li
                    key={aula.id}
                    className={`flex items-center justify-between py-4 px-2 ${
                      podeAcessarAula(aula)
                        ? "text-gray-900"
                        : "text-gray-400 line-through"
                    }`}>
                    <div className="flex items-center gap-3">
                      <Video size={20} />
                      <span>{aula.titulo}</span>
                    </div>
                    <span className="text-sm">{aula.duracao || "--:--"}</span>
                    {podeAcessarAula(aula) ? (
                      <button className="ml-4 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                        Acessar
                      </button>
                    ) : (
                      <span className="ml-4 flex items-center gap-1 text-xs">
                        <Lock size={14} /> Restrita
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {tab === "instrutor" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Instrutor</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <Award size={40} className="text-blue-600" />
                </div>
                <div>
                  <div className="font-bold text-xl mb-2">
                    {instrutor.nome || "Instrutor"}
                  </div>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star
                        className="text-yellow-400 fill-yellow-400"
                        size={16}
                      />
                      <span>{instrutor.avaliacao || 0} / 5</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{instrutor.alunos || 0} alunos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Video size={16} />
                      <span>{instrutor.aulas || 0} aulas</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Adicione mais detalhes do instrutor se desejar */}
              <div className="border-t pt-4">
                <p className="text-gray-600">
                  Instrutor especializado em {curso.categoria} com vasta
                  experiência no mercado e comprometido com o sucesso dos
                  alunos.
                </p>
              </div>
            </div>
          </div>
        )}

        {tab === "avaliacoes" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Avaliações</h2>

            {/* Resumo das avaliações */}
            <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl font-bold text-blue-600">
                  {mediaAvaliacoes || 0}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {renderizarEstrelas(mediaAvaliacoes)}
                  </div>
                  <div className="text-gray-600">
                    {avaliacoes.length} avaliações
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de avaliações */}
            {carregandoAvaliacoes ? (
              <div className="py-8 text-center text-gray-500">
                Carregando avaliações...
              </div>
            ) : avaliacoes.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                Nenhuma avaliação ainda. Seja o primeiro a avaliar este curso!
              </div>
            ) : (
              <div className="space-y-4">
                {avaliacoes.map((avaliacao) => (
                  <div
                    key={avaliacao.id}
                    className="bg-white p-4 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {avaliacao.autor.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-medium">{avaliacao.autor}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {renderizarEstrelas(avaliacao.nota)}
                      </div>
                    </div>
                    <p className="text-gray-700">{avaliacao.comentario}</p>
                    <div className="text-xs text-gray-500 mt-2">
                      {new Date(avaliacao.criado_em).toLocaleDateString(
                        "pt-BR"
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal de Vídeo */}
      <ModalVideo
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        videoUrl={videoUrl}
      />
    </div>
  );
}
