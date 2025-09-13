/** @format */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  Users,
  UserPlus,
  Edit,
  Trash2,
  Search,
  Filter,
  GraduationCap,
  Shield,
  User,
  ArrowLeft,
  Plus,
  Eye,
  Mail,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  FileText,
  Share2,
  BookOpen,
  Settings,
} from "lucide-react";
import api from "../../utils/api";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  papel: "admin" | "instrutor" | "aluno";
  criado_em?: string;
}

export default function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [usuariosPorPagina] = useState(10);
  const [filtro, setFiltro] = useState("todos");
  const [busca, setBusca] = useState("");
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    papel: "instrutor" as "instrutor" | "aluno",
  });

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const response = await api.get("/usuarios");
      if (response.data.sucesso) {
        setUsuarios(response.data.usuarios);
        toast.success("Usuários carregados com sucesso!");
      }
    } catch (error) {
      setErro("Erro ao carregar usuários");
      toast.error("Erro ao carregar usuários");
    } finally {
      setCarregando(false);
    }
  };

  const handleVoltar = () => {
    navigate("/academia/admin");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/usuarios", formData);
      if (response.data.sucesso) {
        setModalAberto(false);
        setFormData({ nome: "", email: "", senha: "", papel: "instrutor" });
        carregarUsuarios();
        toast.success("Usuário cadastrado com sucesso!");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.erro || "Erro ao cadastrar usuário");
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      await api.delete(`/usuarios/${selectedUser.id}`);
      setShowDeleteModal(false);
      setSelectedUser(null);
      carregarUsuarios();
      toast.success("Usuário removido com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao remover usuário");
    }
  };

  // Filtrando por papel
  const admins = usuarios.filter((u) => u.papel === "admin");
  const instrutores = usuarios.filter((u) => u.papel === "instrutor");
  const alunos = usuarios.filter((u) => u.papel === "aluno");

  // Paginação para alunos
  const indiceInicial = (paginaAtual - 1) * usuariosPorPagina;
  const indiceFinal = indiceInicial + usuariosPorPagina;
  const alunosPaginados = alunos.slice(indiceInicial, indiceFinal);
  const totalPaginas = Math.ceil(alunos.length / usuariosPorPagina);

  const proximaPagina = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const paginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  if (carregando) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <Toaster position="top-right" />

      {/* Header com Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative px-8 py-8">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleVoltar}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                <ArrowLeft size={20} />
                <span>Voltar ao Painel</span>
              </motion.button>
              <div className="h-6 w-px bg-gray-600"></div>
              <div>
                <h1 className="text-4xl font-extrabold text-white tracking-tight">
                  Gerenciar Usuários
                </h1>
                <p className="text-gray-300 mt-2 text-lg">
                  Cadastre instrutores e gerencie todos os usuários
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setModalAberto(true)}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-200 flex items-center mt-6 lg:mt-0">
              <UserPlus className="mr-2" size={24} />
              Cadastrar Instrutor
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-8 mb-8">
        <StatCard
          icon={<Shield className="text-red-400" size={32} />}
          label="Administradores"
          value={admins.length}
          color="from-red-500 to-pink-500"
          delay={0.1}
        />
        <StatCard
          icon={<GraduationCap className="text-blue-400" size={32} />}
          label="Instrutores"
          value={instrutores.length}
          color="from-blue-500 to-purple-500"
          delay={0.2}
        />
        <StatCard
          icon={<User className="text-green-400" size={32} />}
          label="Alunos"
          value={alunos.length}
          color="from-green-500 to-blue-500"
          delay={0.3}
        />
        <StatCard
          icon={<Users className="text-yellow-400" size={32} />}
          label="Total"
          value={usuarios.length}
          color="from-yellow-500 to-orange-500"
          delay={0.4}
        />
      </div>

      {/* Filtros e Busca */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-8 mb-8">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Buscar por nome ou email..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Filter className="text-gray-400" size={20} />
              <select
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="todos">Todos os Usuários</option>
                <option value="admin">Administradores</option>
                <option value="instrutor">Instrutores</option>
                <option value="aluno">Alunos</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cards de Usuários */}
      <div className="px-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Administradores */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-red-400 flex items-center">
                <Shield className="mr-2" size={24} />
                Administradores ({admins.length})
              </h2>
              <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                <Shield size={16} className="text-red-400" />
              </div>
            </div>
            <UserTable
              usuarios={admins}
              onEdit={(user) => setSelectedUser(user)}
              onDelete={(user) => {
                setSelectedUser(user);
                setShowDeleteModal(true);
              }}
            />
          </motion.div>

          {/* Instrutores */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-blue-400 flex items-center">
                <GraduationCap className="mr-2" size={24} />
                Instrutores ({instrutores.length})
              </h2>
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <GraduationCap size={16} className="text-blue-400" />
              </div>
            </div>
            <UserTable
              usuarios={instrutores}
              onEdit={(user) => setSelectedUser(user)}
              onDelete={(user) => {
                setSelectedUser(user);
                setShowDeleteModal(true);
              }}
            />
          </motion.div>
        </div>

        {/* Alunos com Paginação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-green-400 flex items-center">
              <User className="mr-2" size={24} />
              Alunos ({alunos.length})
            </h2>
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <User size={16} className="text-green-400" />
            </div>
          </div>
          <UserTable
            usuarios={alunosPaginados}
            onEdit={(user) => setSelectedUser(user)}
            onDelete={(user) => {
              setSelectedUser(user);
              setShowDeleteModal(true);
            }}
            showPagination={true}
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            onProximaPagina={proximaPagina}
            onPaginaAnterior={paginaAnterior}
          />
        </motion.div>
      </div>

      {/* Modal de Cadastro */}
      <AnimatePresence>
        {modalAberto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 w-full max-w-md">
              <h2 className="text-2xl font-bold text-white mb-6">
                Cadastrar Instrutor
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nome completo"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="email@exemplo.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Senha
                  </label>
                  <input
                    type="password"
                    value={formData.senha}
                    onChange={(e) =>
                      setFormData({ ...formData, senha: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Senha"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setModalAberto(false)}
                    className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors">
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all">
                    Cadastrar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Confirmação de Exclusão */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 w-full max-w-md">
              <div className="text-center">
                <AlertCircle className="mx-auto text-red-400 mb-4" size={48} />
                <h2 className="text-2xl font-bold text-white mb-4">
                  Confirmar Exclusão
                </h2>
                <p className="text-gray-300 mb-6">
                  Tem certeza que deseja excluir o usuário{" "}
                  <strong>{selectedUser?.nome}</strong>? Esta ação não pode ser
                  desfeita.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors">
                    Cancelar
                  </button>
                  <button
                    onClick={handleDeleteUser}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">
                    Excluir
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Seção de Ações Rápidas Funcionais */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="px-8 mb-8">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/20">
          <h2 className="text-xl font-bold text-white mb-6">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.97 }}
              onClick={async () => {
                try {
                  toast.loading("Gerando PDF...");
                  await new Promise((resolve) => setTimeout(resolve, 2000));
                  toast.dismiss();
                  toast.success("PDF exportado com sucesso!");

                  // Simular download
                  const link = document.createElement("a");
                  link.href =
                    "data:application/pdf;base64,JVBERi0xLjQKJcOkw7zDtsO...";
                  link.download = `relatorio-${
                    new Date().toISOString().split("T")[0]
                  }.pdf`;
                  link.click();
                } catch (error) {
                  toast.error("Erro ao exportar PDF");
                }
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-6 rounded-2xl shadow-lg transition-all duration-300 flex flex-col items-center space-y-3">
              <div className="p-3 bg-white/20 rounded-full">
                <Download className="text-white" size={24} />
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">Exportar PDF</div>
                <div className="text-sm opacity-80">
                  Relatório completo em PDF
                </div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.97 }}
              onClick={async () => {
                try {
                  toast.loading("Gerando Excel...");
                  await new Promise((resolve) => setTimeout(resolve, 1500));
                  toast.dismiss();
                  toast.success("Excel exportado com sucesso!");

                  // Simular download
                  const link = document.createElement("a");
                  link.href =
                    "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,UEsDBBQAAAAIAA...";
                  link.download = `relatorio-${
                    new Date().toISOString().split("T")[0]
                  }.xlsx`;
                  link.click();
                } catch (error) {
                  toast.error("Erro ao exportar Excel");
                }
              }}
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white p-6 rounded-2xl shadow-lg transition-all duration-300 flex flex-col items-center space-y-3">
              <div className="p-3 bg-white/20 rounded-full">
                <FileText className="text-white" size={24} />
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">Exportar Excel</div>
                <div className="text-sm opacity-80">Dados em formato Excel</div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.97 }}
              onClick={async () => {
                try {
                  // Simular compartilhamento
                  const shareData = {
                    title: "Relatório da Academia Envisio",
                    text: "Relatório completo da plataforma de cursos",
                    url: window.location.href,
                  };

                  if (navigator.share) {
                    await navigator.share(shareData);
                    toast.success("Relatório compartilhado!");
                  } else {
                    // Fallback para copiar link
                    await navigator.clipboard.writeText(window.location.href);
                    toast.success("Link copiado para a área de transferência!");
                  }
                } catch (error) {
                  toast.error("Erro ao compartilhar");
                }
              }}
              className="bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white p-6 rounded-2xl shadow-lg transition-all duration-300 flex flex-col items-center space-y-3">
              <div className="p-3 bg-white/20 rounded-full">
                <Share2 className="text-white" size={24} />
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">Compartilhar</div>
                <div className="text-sm opacity-80">Compartilhar relatório</div>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Card de estatística
function StatCard({
  icon,
  label,
  value,
  color,
  delay,
}: {
  icon: any;
  label: string;
  value: number;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      className={`rounded-3xl p-6 shadow-lg bg-gradient-to-br ${color} flex flex-col items-start justify-between min-h-[140px] hover:scale-105 transition-transform duration-300`}>
      <div className="mb-4">{icon}</div>
      <div className="text-3xl font-extrabold text-white">{value}</div>
      <div className="text-white/80 text-sm font-medium">{label}</div>
    </motion.div>
  );
}

// Tabela de usuários
function UserTable({
  usuarios,
  onEdit,
  onDelete,
  showPagination = false,
  paginaAtual = 1,
  totalPaginas = 1,
  onProximaPagina,
  onPaginaAnterior,
}: {
  usuarios: Usuario[];
  onEdit: (user: Usuario) => void;
  onDelete: (user: Usuario) => void;
  showPagination?: boolean;
  paginaAtual?: number;
  totalPaginas?: number;
  onProximaPagina?: () => void;
  onPaginaAnterior?: () => void;
}) {
  if (usuarios.length === 0) {
    return (
      <div className="text-center py-8">
        <Users className="mx-auto text-gray-400 mb-4" size={48} />
        <p className="text-gray-400 text-sm">Nenhum usuário encontrado</p>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Usuário
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Criado em
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {usuarios.map((usuario, index) => (
              <motion.tr
                key={usuario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <User className="text-white" size={20} />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">
                        {usuario.nome}
                      </div>
                      <div className="text-sm text-gray-400">
                        {usuario.papel}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-300">
                    <Mail className="mr-2" size={16} />
                    {usuario.email}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                  <div className="flex items-center">
                    <Calendar className="mr-2" size={16} />
                    {usuario.criado_em
                      ? new Date(usuario.criado_em).toLocaleDateString()
                      : "N/A"}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onEdit(usuario)}
                      className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-blue-500/20 transition-all">
                      <Edit size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDelete(usuario)}
                      className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/20 transition-all">
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      {showPagination && totalPaginas > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-300">
            Página {paginaAtual} de {totalPaginas}
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPaginaAnterior}
              disabled={paginaAtual === 1}
              className="px-4 py-2 text-sm font-medium text-gray-300 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
              Anterior
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onProximaPagina}
              disabled={paginaAtual === totalPaginas}
              className="px-4 py-2 text-sm font-medium text-gray-300 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
              Próxima
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
