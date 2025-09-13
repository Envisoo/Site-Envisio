/** @format */

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  Users,
  Star,
  Video,
  FileText,
  Settings,
  Search,
  Lock,
  Unlock,
} from "lucide-react";
import api from "../../utils/api";
import ImageUpload from "../../componentes/ImageUpload";
import { toast } from "react-toastify";

interface Curso {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  duracao: number;
  nivel: string;
  preco: number;
  status: string;
  acesso_vitalicio: boolean;
  suporte: boolean;
  certificado: boolean;
  visualizacoes: number;
  avaliacao: number;
  instrutor: {
    nome: string;
    avaliacao: number;
    alunos: number;
    aulas: number;
  };
  criado_em: string;
  imagem?: string;
}

interface ModalCursoProps {
  isOpen: boolean;
  onClose: () => void;
  curso?: Curso | null;
  onSave: (curso: any) => void;
}

const ModalCurso = ({ isOpen, onClose, curso, onSave }: ModalCursoProps) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    categoria: "",
    duracao: 0,
    nivel: "iniciante",
    preco: 0,
    status: "rascunho",
    acesso_vitalicio: false,
    suporte: false,
    certificado: false,
    imagem: null as File | null,
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (curso) {
      setFormData({
        titulo: curso.titulo,
        descricao: curso.descricao,
        categoria: curso.categoria,
        duracao: curso.duracao,
        nivel: curso.nivel,
        preco: curso.preco,
        status: curso.status,
        acesso_vitalicio: curso.acesso_vitalicio,
        suporte: curso.suporte,
        certificado: curso.certificado,
        imagem: null,
      });
    } else {
      setFormData({
        titulo: "",
        descricao: "",
        categoria: "",
        duracao: 0,
        nivel: "iniciante",
        preco: 0,
        status: "rascunho",
        acesso_vitalicio: false,
        suporte: false,
        certificado: false,
        imagem: null,
      });
    }
  }, [curso]);

  const handleImageSelect = (file: File) => {
    setFormData({ ...formData, imagem: file });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = "";
      if (formData.imagem) {
        const formDataUpload = new FormData();
        formDataUpload.append("imagem", formData.imagem);

        const uploadResponse = await api.post("/upload/imagem", formDataUpload);
        imageUrl = uploadResponse.data.url;
      }

      const cursoData = {
        ...formData,
        imagem: imageUrl || curso?.imagem || "",
      };

      onSave(cursoData);
    } catch (error) {
      console.error("Erro ao salvar curso:", error);
      toast.error("Erro ao salvar curso");
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
        className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {curso ? "Editar Curso" : "Criar Novo Curso"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Coluna Esquerda - Informações Básicas */}
            <div className="space-y-6">
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
                  placeholder="Digite o título do curso"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria *
                </label>
                <select
                  required
                  value={formData.categoria}
                  onChange={(e) =>
                    setFormData({ ...formData, categoria: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Selecione uma categoria</option>
                  <option value="programacao">Programação</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="negocios">Negócios</option>
                  <option value="tecnologia">Tecnologia</option>
                  <option value="outros">Outros</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nível
                  </label>
                  <select
                    value={formData.nivel}
                    onChange={(e) =>
                      setFormData({ ...formData, nivel: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="iniciante">Iniciante</option>
                    <option value="intermediario">Intermediário</option>
                    <option value="avancado">Avançado</option>
                  </select>
                </div>

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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duração (horas)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.duracao}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duracao: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preço (Kz)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.preco}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preco: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.descricao}
                  onChange={(e) =>
                    setFormData({ ...formData, descricao: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Descreva o conteúdo do curso..."
                />
              </div>
            </div>

            {/* Coluna Direita - Imagem e Benefícios */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagem do Curso
                </label>
                <ImageUpload
                  onImageSelect={handleImageSelect}
                  currentImage={curso?.imagem}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Benefícios Inclusos
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.acesso_vitalicio}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          acesso_vitalicio: e.target.checked,
                        })
                      }
                      className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div>
                      <span className="font-medium text-gray-900">
                        Acesso vitalício
                      </span>
                      <p className="text-sm text-gray-500">
                        Acesso ilimitado ao conteúdo
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.suporte}
                      onChange={(e) =>
                        setFormData({ ...formData, suporte: e.target.checked })
                      }
                      className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div>
                      <span className="font-medium text-gray-900">
                        Suporte ao aluno
                      </span>
                      <p className="text-sm text-gray-500">
                        Suporte direto com o instrutor
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.certificado}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          certificado: e.target.checked,
                        })
                      }
                      className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div>
                      <span className="font-medium text-gray-900">
                        Certificado de conclusão
                      </span>
                      <p className="text-sm text-gray-500">
                        Certificado oficial ao finalizar
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
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
              <span>{curso ? "Atualizar" : "Criar"} Curso</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default function GerenciarCursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [cursoEditando, setCursoEditando] = useState<Curso | null>(null);
  const [filtro, setFiltro] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");

  const carregarCursos = useCallback(async () => {
    try {
      setCarregando(true);
      const response = await api.get("/cursos/buscar", {
        params: {
          instrutor: localStorage.getItem("usuario_nome"),
          status: filtroStatus === "todos" ? undefined : filtroStatus,
        },
      });
      if (response.data.sucesso) {
        setCursos(response.data.cursos);
        setErro(null);
      } else {
        throw new Error("Falha ao carregar cursos");
      }
    } catch (error) {
      setErro("Erro ao carregar cursos. Por favor, tente novamente.");
      toast.error("Falha ao carregar lista de cursos");
      console.error("Erro detalhado:", error);
    } finally {
      setCarregando(false);
    }
  }, [filtroStatus]);

  useEffect(() => {
    carregarCursos();
  }, [carregarCursos]);

  const handleCriarCurso = async (dados: any) => {
    try {
      const dadosFormatados = {
        ...dados,
        instrutor: localStorage.getItem("usuario_nome"),
        criado_em: new Date().toISOString(),
      };

      const response = await api.post("/cursos", dadosFormatados);

      if (response.data) {
        toast.success("Curso criado com sucesso!");
        setModalAberto(false);
        carregarCursos();
      } else {
        throw new Error("Falha ao criar curso");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.mensagem || "Erro ao criar curso");
      console.error("Erro detalhado:", error);
    }
  };

  const handleEditarCurso = async (dados: any) => {
    if (!cursoEditando) return;

    try {
      const dadosFormatados = {
        ...dados,
        instrutor: localStorage.getItem("usuario_nome"),
      };

      const response = await api.put(
        `/cursos/${cursoEditando.id}`,
        dadosFormatados
      );

      if (response.data.sucesso) {
        toast.success("Curso atualizado com sucesso!");
        setModalAberto(false);
        setCursoEditando(null);
        carregarCursos();
      } else {
        throw new Error("Falha ao atualizar curso");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.mensagem || "Erro ao atualizar curso");
      console.error("Erro detalhado:", error);
    }
  };

  const handleExcluirCurso = async (cursoId: string) => {
    if (
      typeof window !== "undefined" &&
      !window.confirm("Tem certeza que deseja excluir este curso?")
    )
      return;

    try {
      const response = await api.delete(`/instrutor/cursos/${cursoId}`);
      if (response.data.sucesso) {
        toast.success("Curso excluído com sucesso!");
        carregarCursos();
      } else {
        throw new Error("Falha ao excluir curso");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.mensagem || "Erro ao excluir curso");
      console.error("Erro detalhado:", error);
    }
  };

  const abrirModalEditar = (curso: Curso) => {
    setCursoEditando(curso);
    setModalAberto(true);
  };

  const abrirModalCriar = () => {
    setCursoEditando(null);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setCursoEditando(null);
  };

  const cursosFiltrados = cursos.filter((curso: Curso) => {
    const matchFiltro =
      curso.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
      curso.categoria.toLowerCase().includes(filtro.toLowerCase());

    const matchStatus =
      filtroStatus === "todos" || curso.status === filtroStatus;

    return matchFiltro && matchStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "publicado":
        return "bg-green-100 text-green-800";
      case "rascunho":
        return "bg-yellow-100 text-yellow-800";
      case "arquivado":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "publicado":
        return <Unlock size={16} />;
      case "rascunho":
        return <Lock size={16} />;
      case "arquivado":
        return <FileText size={16} />;
      default:
        return <Settings size={16} />;
    }
  };

  if (carregando) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Erro</h2>
        <p className="text-gray-600">{erro}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Cursos</h1>
          <p className="text-gray-600 mt-2">
            Crie, edite e gerencie seus cursos
          </p>
        </div>
        <button
          onClick={abrirModalCriar}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
          <Plus size={20} className="mr-2" />
          Novo Curso
        </button>
      </div>

      {/* Filtros */}
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
                placeholder="Buscar cursos..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="md:w-48">
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="todos">Todos os status</option>
              <option value="publicado">Publicado</option>
              <option value="rascunho">Rascunho</option>
              <option value="arquivado">Arquivado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Cursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cursosFiltrados.map((curso, index) => (
          <motion.div
            key={curso.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            {/* Imagem do curso */}
            <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
              {curso.imagem ? (
                <img
                  src={curso.imagem}
                  alt={curso.titulo}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen size={48} className="text-white opacity-50" />
                </div>
              )}
              <div className="absolute top-3 right-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(
                    curso.status
                  )}`}>
                  {getStatusIcon(curso.status)}
                  {curso.status}
                </span>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                {curso.titulo}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {curso.descricao}
              </p>

              {/* Estatísticas */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Users size={16} className="mr-1" />
                  {curso.instrutor.alunos || 0} alunos
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Star size={16} className="mr-1" />
                  {curso.avaliacao.toFixed(1)} / 5
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Video size={16} className="mr-1" />
                  {curso.duracao}h duração
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Eye size={16} className="mr-1" />
                  {curso.visualizacoes} visualizações
                </div>
              </div>

              {/* Preço */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-blue-600">
                  {curso.preco.toLocaleString("pt-BR")} Kz
                </span>
                <span className="text-sm text-gray-500">{curso.categoria}</span>
              </div>

              {/* Ações */}
              <div className="flex space-x-2">
                <button
                  onClick={() => abrirModalEditar(curso)}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                  <Edit size={16} className="mr-1" />
                  Editar
                </button>
                <button
                  onClick={() => handleExcluirCurso(curso.id)}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mensagem quando não há cursos */}
      {cursosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={64} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Nenhum curso encontrado
          </h3>
          <p className="text-gray-600 mb-6">
            {filtro || filtroStatus !== "todos"
              ? "Tente ajustar os filtros de busca"
              : "Comece criando seu primeiro curso"}
          </p>
          {!filtro && filtroStatus === "todos" && (
            <button
              onClick={abrirModalCriar}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Criar Primeiro Curso
            </button>
          )}
        </div>
      )}

      {/* Modal */}
      <ModalCurso
        isOpen={modalAberto}
        onClose={fecharModal}
        curso={cursoEditando}
        onSave={cursoEditando ? handleEditarCurso : handleCriarCurso}
      />
    </div>
  );
}
