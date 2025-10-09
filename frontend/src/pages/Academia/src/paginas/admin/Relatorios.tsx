/** @format */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  TrendingUp,
  Users,
  BookOpen,
  DollarSign,
  Download,
  Eye,
  FileText,
  Activity,
  ArrowLeft,
  Download as DownloadIcon,
  Share2,
  RefreshCw,
  Target,
  TrendingDown,
} from "lucide-react";
import api from "../../utils/api";

interface RelatorioData {
  alunosPorCurso: Array<{
    id: string;
    titulo: string;
    total_alunos: number;
  }>;
  resumo: {
    totalUsuarios: number;
    totalCursos: number;
    totalCategorias: number;
    totalInscricoes: number;
  };
}

export default function Relatorios() {
  const [relatorioData, setRelatorioData] = useState<RelatorioData | null>(
    null
  );
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [filtro, setFiltro] = useState("30dias");
  const [tipoRelatorio, setTipoRelatorio] = useState("geral");
  const [exportando, setExportando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    carregarRelatorios();
  }, [filtro]);

  const carregarRelatorios = async () => {
    try {
      const [resumoResponse, alunosPorCursoResponse] = await Promise.all([
        api.get("/admin/resumo"),
        api.get("/admin/alunos-por-curso"),
      ]);

      if (resumoResponse.data.sucesso && alunosPorCursoResponse.data.sucesso) {
        setRelatorioData({
          resumo: resumoResponse.data.resumo,
          alunosPorCurso: alunosPorCursoResponse.data.dados,
        });
        toast.success("Relatórios carregados com sucesso!");
      }
    } catch (error: any) {
      setErro(error.response?.data?.erro || "Erro ao carregar relatórios");
      toast.error("Erro ao carregar relatórios");
    } finally {
      setCarregando(false);
    }
  };

  const handleVoltar = () => {
    navigate("/academia/admin");
  };

  const exportarRelatorio = async (tipo: string) => {
    setExportando(true);
    try {
      // Simular exportação
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success(`Relatório ${tipo} exportado com sucesso!`);
    } catch (error) {
      toast.error("Erro ao exportar relatório");
    } finally {
      setExportando(false);
    }
  };

  // Dados simulados para gráficos
  const chartData = [
    { mes: "Jan", usuarios: 30, cursos: 12, receita: 15000 },
    { mes: "Fev", usuarios: 45, cursos: 18, receita: 22000 },
    { mes: "Mar", usuarios: 60, cursos: 25, receita: 28000 },
    { mes: "Abr", usuarios: 80, cursos: 30, receita: 35000 },
    { mes: "Mai", usuarios: 100, cursos: 40, receita: 42000 },
    { mes: "Jun", usuarios: 120, cursos: 50, receita: 48000 },
  ];

  const pieData = [
    { name: "Programação", value: 35, color: "#3B82F6" },
    { name: "Design", value: 25, color: "#8B5CF6" },
    { name: "Marketing", value: 20, color: "#10B981" },
    { name: "Negócios", value: 20, color: "#F59E0B" },
  ];

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

  if (erro) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="text-white" size={40} />
          </motion.div>
          <h2 className="text-3xl font-bold text-red-500 mb-4">Erro</h2>
          <p className="text-gray-300">{erro}</p>
        </div>
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
                  Relatórios
                </h1>
                <p className="text-gray-300 mt-2 text-lg">
                  Visualize estatísticas e relatórios da plataforma
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-6 lg:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => carregarRelatorios()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 flex items-center">
                <RefreshCw className="mr-2" size={20} />
                Atualizar
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => exportarRelatorio("completo")}
                disabled={exportando}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 flex items-center">
                <DownloadIcon className="mr-2" size={20} />
                {exportando ? "Exportando..." : "Exportar"}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filtros e Controles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-8 mb-8">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-white text-sm font-medium mb-2">
                Período
              </label>
              <select
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="7dias">Últimos 7 dias</option>
                <option value="30dias">Últimos 30 dias</option>
                <option value="90dias">Últimos 90 dias</option>
                <option value="1ano">Último ano</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-white text-sm font-medium mb-2">
                Tipo de Relatório
              </label>
              <select
                value={tipoRelatorio}
                onChange={(e) => setTipoRelatorio(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="geral">Relatório Geral</option>
                <option value="usuarios">Relatório de Usuários</option>
                <option value="cursos">Relatório de Cursos</option>
                <option value="financeiro">Relatório Financeiro</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8 mb-8">
        <StatCard
          icon={<Users className="text-blue-400" size={32} />}
          label="Total de Usuários"
          value={relatorioData?.resumo.totalUsuarios || 0}
          change="+12.5%"
          trend="up"
          color="from-blue-500 to-purple-500"
          delay={0.3}
        />
        <StatCard
          icon={<BookOpen className="text-green-400" size={32} />}
          label="Total de Cursos"
          value={relatorioData?.resumo.totalCursos || 0}
          change="+8.3%"
          trend="up"
          color="from-green-500 to-blue-500"
          delay={0.4}
        />
        <StatCard
          icon={<DollarSign className="text-yellow-400" size={32} />}
          label="Receita Total"
          value={`R$ ${(relatorioData?.resumo.totalInscricoes || 0) * 99.9}`}
          change="+15.2%"
          trend="up"
          color="from-yellow-500 to-orange-500"
          delay={0.5}
        />
        <StatCard
          icon={<Target className="text-red-400" size={32} />}
          label="Taxa de Conversão"
          value="68.5%"
          change="-2.1%"
          trend="down"
          color="from-red-500 to-pink-500"
          delay={0.6}
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 mb-8">
        {/* Gráfico de Barras - Crescimento */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              Crescimento da Plataforma
            </h2>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                Usuários
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                Cursos
              </span>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4 h-64 items-end">
            {chartData.map((data, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${(data.usuarios / 120) * 100}%` }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg relative group">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {data.usuarios} usuários
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-gray-300 text-sm">
            {chartData.map((data, index) => (
              <span key={index}>{data.mes}</span>
            ))}
          </div>
        </motion.div>

        {/* Gráfico de Pizza - Categorias */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/20">
          <h2 className="text-xl font-bold text-white mb-6">
            Cursos por Categoria
          </h2>
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              {pieData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="absolute inset-0 rounded-full border-8"
                  style={{
                    borderColor: item.color,
                    transform: `rotate(${index * 90}deg)`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-white text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tabela de Alunos por Curso */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="px-8 mb-8">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Alunos por Curso</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => exportarRelatorio("alunos-por-curso")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
              <Download className="mr-2" size={16} />
              Exportar
            </motion.button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Curso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Alunos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Progresso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {relatorioData?.alunosPorCurso.map((curso, index) => (
                  <motion.tr
                    key={curso.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        {curso.titulo}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">
                        {curso.total_alunos} alunos
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(curso.total_alunos / 100) * 100}%`,
                          }}
                          transition={{ delay: index * 0.1, duration: 1 }}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-blue-500/20 transition-all">
                          <Eye size={16} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-green-400 hover:text-green-300 p-2 rounded-lg hover:bg-green-500/20 transition-all">
                          <Download size={16} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Seção de Ações Rápidas com Funcionalidades */}
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

// Card de estatística com tendência
function StatCard({
  icon,
  label,
  value,
  change,
  trend,
  color,
  delay,
}: {
  icon: any;
  label: string;
  value: string | number;
  change: string;
  trend: "up" | "down";
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      className={`rounded-3xl p-6 shadow-lg bg-gradient-to-br ${color} flex flex-col items-start justify-between min-h-[160px] hover:scale-105 transition-transform duration-300`}>
      <div className="flex items-center justify-between w-full mb-4">
        {icon}
        <div
          className={`flex items-center text-xs ${
            trend === "up" ? "text-green-200" : "text-red-200"
          }`}>
          {trend === "up" ? (
            <TrendingUp size={12} />
          ) : (
            <TrendingDown size={12} />
          )}
          <span className="ml-1">{change}</span>
        </div>
      </div>
      <div className="text-3xl font-extrabold text-white">{value}</div>
      <div className="text-white/80 text-sm font-medium">{label}</div>
    </motion.div>
  );
}
