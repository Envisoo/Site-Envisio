/** @format */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Video,
  FileText,
  Clock,
  Play,
  Search,
  BookOpen,
} from "lucide-react";
import api from "../../utils/api";

interface Modulo {
  id: string;
  titulo: string;
  descricao: string;
  ordem: number;
  total_aulas: number;
  duracao_total: number;
  status: string;
}

interface Aula {
  id: string;
  titulo: string;
  descricao: string;
  duracao: number;
  tipo: string;
  url_video?: string;
  url_arquivo?: string;
  ordem: number;
  status: string;
  visualizacoes: number;
  modulo_id: string;
}

interface ModalAulaProps {
  isOpen: boolean;
  onClose: () => void;
  aula?: Aula | null;
  moduloId: string;
  onSave: (aula: any) => void;
}

const ModalAula = ({
  isOpen,
  onClose,
  aula,
  moduloId,
  onSave,
}: ModalAulaProps) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    duracao: 0,
    tipo: "video",
    url_video: "",
    url_arquivo: "",
    ordem: 1,
    status: "rascunho",
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (aula) {
      setFormData({
        titulo: aula.titulo,
        descricao: aula.descricao,
        duracao: aula.duracao,
        tipo: aula.tipo,
        url_video: aula.url_video || "",
        url_arquivo: aula.url_arquivo || "",
        ordem: aula.ordem,
        status: aula.status,
      });
    } else {
      setFormData({
        titulo: "",
        descricao: "",
        duracao: 0,
        tipo: "video",
        url_video: "",
        url_arquivo: "",
        ordem: 1,
        status: "rascunho",
      });
    }
  }, [aula]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const aulaData = {
        ...formData,
        modulo_id: moduloId,
      };

      onSave(aulaData);
    } catch (error) {
      console.error("Erro ao salvar aula:", error);
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {aula ? "Editar Aula" : "Criar Nova Aula"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título *
              </label>
              <input
                type="text"
                required
                value={formData.titulo}
                onChange={(e) =>
                  setFormData({ ...formData, titulo: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite o título da aula"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Conteúdo
              </label>
              <select
                value={formData.tipo}
                onChange={(e) =>
                  setFormData({ ...formData, tipo: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="video">Vídeo</option>
                <option value="documento">Documento</option>
                <option value="audio">Áudio</option>
                <option value="quiz">Quiz</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duração (minutos)
              </label>
              <input
                type="number"
                min="0"
                value={formData.duracao}
                onChange={(e) =>
                  setFormData({ ...formData, duracao: Number(e.target.value) })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ordem
              </label>
              <input
                type="number"
                min="1"
                value={formData.ordem}
                onChange={(e) =>
                  setFormData({ ...formData, ordem: Number(e.target.value) })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição
            </label>
            <textarea
              rows={3}
              value={formData.descricao}
              onChange={(e) =>
                setFormData({ ...formData, descricao: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Descreva o conteúdo da aula..."
            />
          </div>

          {formData.tipo === "video" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL do Vídeo
              </label>
              <input
                type="url"
                value={formData.url_video}
                onChange={(e) =>
                  setFormData({ ...formData, url_video: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          )}

          {formData.tipo === "documento" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL do Arquivo
              </label>
              <input
                type="url"
                value={formData.url_arquivo}
                onChange={(e) =>
                  setFormData({ ...formData, url_arquivo: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://drive.google.com/..."
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="rascunho">Rascunho</option>
              <option value="publicado">Publicado</option>
              <option value="arquivado">Arquivado</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2">
              {uploading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              <span>{aula ? "Atualizar" : "Criar"} Aula</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default function GerenciarAulas() {
  const [cursos, setCursos] = useState<any[]>([]);
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [cursoSelecionado, setCursoSelecionado] = useState<string | null>(null);
  const [moduloSelecionado, setModuloSelecionado] = useState<string | null>(
    null
  );
  const [carregando, setCarregando] = useState(true);
  const [modalAulaAberto, setModalAulaAberto] = useState(false);
  const [aulaEditando, setAulaEditando] = useState<Aula | null>(null);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    carregarCursos();
  }, []);

  useEffect(() => {
    if (cursoSelecionado) {
      carregarModulos(cursoSelecionado);
    }
  }, [cursoSelecionado]);

  useEffect(() => {
    if (moduloSelecionado) {
      carregarAulas(moduloSelecionado);
    }
  });

  const carregarCursos = async () => {
    try {
      setCarregando(true);
      const response = await api.get("/instrutor/meus-cursos");
      setCursos(response.data.cursos || []);
      if (response.data.cursos?.length > 0) {
        setCursoSelecionado(response.data.cursos[0].id);
      }
    } catch (error) {
      console.error("Erro ao carregar cursos:", error);
    } finally {
      setCarregando(false);
    }
  };

  const carregarModulos = async (cursoId: string) => {
    try {
      const response = await api.get(`/instrutor/cursos/${cursoId}/modulos`);
      setModulos(response.data.modulos || []);
      if (response.data.modulos?.length > 0) {
        setModuloSelecionado(response.data.modulos[0].id);
      }
    } catch (error) {
      console.error("Erro ao carregar módulos:", error);
    }
  };

  const carregarAulas = async (moduloId: string) => {
    try {
      const response = await api.get(
        `/instrutor/cursos/${cursoSelecionado}/aulas?modulo_id=${moduloId}`
      );
      setAulas(response.data.aulas || []);
    } catch (error) {
      console.error("Erro ao carregar aulas:", error);
    }
  };

  const handleCriarAula = async (dados: any) => {
    try {
      await api.post(`/instrutor/cursos/${cursoSelecionado}/aulas`, dados);
      setModalAulaAberto(false);
      if (moduloSelecionado) {
        carregarAulas(moduloSelecionado);
      }
    } catch (error) {
      console.error("Erro ao criar aula:", error);
    }
  };

  const handleEditarAula = async (dados: any) => {
    if (!aulaEditando) return;

    try {
      await api.put(`/instrutor/aulas/${aulaEditando.id}`, dados);
      setModalAulaAberto(false);
      setAulaEditando(null);
      if (moduloSelecionado) {
        carregarAulas(moduloSelecionado);
      }
    } catch (error) {
      console.error("Erro ao editar aula:", error);
    }
  };

  const handleExcluirAula = async (aulaId: string) => {
    if (!window.confirm("Tem certeza que deseja excluir esta aula?")) return;

    try {
      await api.delete(`/instrutor/aulas/${aulaId}`);
      if (moduloSelecionado) {
        carregarAulas(moduloSelecionado);
      }
    } catch (error) {
      console.error("Erro ao excluir aula:", error);
    }
  };

  const abrirModalEditar = (aula: Aula) => {
    setAulaEditando(aula);
    setModalAulaAberto(true);
  };

  const abrirModalCriar = () => {
    setAulaEditando(null);
    setModalAulaAberto(true);
  };

  const fecharModal = () => {
    setModalAulaAberto(false);
    setAulaEditando(null);
  };

  const aulasFiltradas = aulas.filter((aula) =>
    aula.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "video":
        return <Video size={16} />;
      case "documento":
        return <FileText size={16} />;
      case "audio":
        return <Play size={16} />;
      case "quiz":
        return <BookOpen size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "video":
        return "text-red-600 bg-red-100";
      case "documento":
        return "text-blue-600 bg-blue-100";
      case "audio":
        return "text-green-600 bg-green-100";
      case "quiz":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (carregando) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Aulas</h1>
          <p className="text-gray-600 mt-2">
            Organize e gerencie as aulas dos seus cursos
          </p>
        </div>
        <button
          onClick={abrirModalCriar}
          disabled={!moduloSelecionado}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
          <Plus size={20} className="mr-2" />
          Nova Aula
        </button>
      </div>

      {/* Seletores */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecionar Curso
            </label>
            <select
              value={cursoSelecionado || ""}
              onChange={(e) => setCursoSelecionado(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Selecione um curso</option>
              {cursos.map((curso) => (
                <option key={curso.id} value={curso.id}>
                  {curso.titulo}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecionar Módulo
            </label>
            <select
              value={moduloSelecionado || ""}
              onChange={(e) => setModuloSelecionado(e.target.value)}
              disabled={!cursoSelecionado}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50">
              <option value="">Selecione um módulo</option>
              {modulos.map((modulo) => (
                <option key={modulo.id} value={modulo.id}>
                  {modulo.titulo}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Filtros */}
      {moduloSelecionado && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Buscar aulas..."
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lista de Aulas */}
      {moduloSelecionado && (
        <div className="space-y-4">
          {aulasFiltradas.map((aula, index) => (
            <motion.div
              key={aula.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${getTipoColor(aula.tipo)}`}>
                    {getTipoIcon(aula.tipo)}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {aula.titulo}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {aula.descricao}
                    </p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{aula.duracao} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye size={14} />
                        <span>{aula.visualizacoes} visualizações</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="capitalize">{aula.tipo}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      aula.status === "publicado"
                        ? "bg-green-100 text-green-800"
                        : aula.status === "rascunho"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                    {aula.status}
                  </span>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => abrirModalEditar(aula)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar aula">
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleExcluirAula(aula.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Excluir aula">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {aulasFiltradas.length === 0 && (
            <div className="text-center py-12">
              <Video size={64} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Nenhuma aula encontrada
              </h3>
              <p className="text-gray-600 mb-6">
                {filtro
                  ? "Tente ajustar os filtros de busca"
                  : "Comece criando sua primeira aula"}
              </p>
              {!filtro && (
                <button
                  onClick={abrirModalCriar}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Criar Primeira Aula
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mensagem quando não há módulo selecionado */}
      {!moduloSelecionado && (
        <div className="text-center py-12">
          <BookOpen size={64} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Selecione um módulo
          </h3>
          <p className="text-gray-600">
            Escolha um curso e módulo para gerenciar as aulas
          </p>
        </div>
      )}

      {/* Modal */}
      <ModalAula
        isOpen={modalAulaAberto}
        onClose={fecharModal}
        aula={aulaEditando}
        moduloId={moduloSelecionado || ""}
        onSave={aulaEditando ? handleEditarAula : handleCriarAula}
      />
    </div>
  );
}
