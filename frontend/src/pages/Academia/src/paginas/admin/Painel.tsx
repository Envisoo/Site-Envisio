/** @format */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import toast, { Toaster } from "react-hot-toast";
import {
  DollarSign,
  Users,
  BookOpen,
  Star,
  Bell,
  TrendingUp,
  Activity,
  Target,
  Award,
  Eye,
  Download,
  Settings,
  Plus,
  Search,
  Filter,
  Clock,
} from "lucide-react";
import api from "../../utils/api";

interface DashboardData {
  estatisticasFinanceiras: {
    receitaTotal: number;
  };
  atividadeRecente: {
    ultimosCursos: any[];
    ultimosAlunos: any[];
    ultimasAvaliacoes: any[];
  };
  estatisticasPorCategoria: any[];
  visaoPorInstrutor: any[];
}

export default function AdminPainel() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [notificacoes, setNotificacoes] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");

  useEffect(() => {
    carregarDashboard();
    // Simular notificações em tempo real
    const interval = setInterval(() => {
      setNotificacoes((prev) =>
        Math.max(0, prev + Math.floor(Math.random() * 3) - 1)
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const carregarDashboard = async () => {
    try {
      const response = await api.get("/admin/dashboard-completo");
      if (response.data.sucesso) {
        setDashboardData(response.data.dados);
        toast.success("Dashboard carregado com sucesso!");
      }
    } catch (error: any) {
      setErro(error.response?.data?.erro || "Erro ao carregar dashboard");
      toast.error("Erro ao carregar dados do dashboard");
    } finally {
      setCarregando(false);
    }
  };

  // Dados para gráficos
  const chartData = [
    { name: "Jan", usuarios: 30, cursos: 12, receita: 15000 },
    { name: "Fev", usuarios: 45, cursos: 18, receita: 22000 },
    { name: "Mar", usuarios: 60, cursos: 25, receita: 28000 },
    { name: "Abr", usuarios: 80, cursos: 30, receita: 35000 },
    { name: "Mai", usuarios: 100, cursos: 40, receita: 42000 },
    { name: "Jun", usuarios: 120, cursos: 50, receita: 48000 },
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
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl font-extrabold text-white tracking-tight">
                Painel Administrativo
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-300 mt-2 text-lg">
                Visão geral da plataforma, estatísticas e ações rápidas
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center space-x-4 mt-6 lg:mt-0">
              {/* Barra de Pesquisa */}
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Filtro */}
              <div className="relative">
                <Filter
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl pl-10 pr-8 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                  <option value="todos">Todos</option>
                  <option value="usuarios">Usuários</option>
                  <option value="cursos">Cursos</option>
                  <option value="receita">Receita</option>
                </select>
              </div>

              {/* Notificações */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200">
                <Bell className="inline mr-2" size={20} />
                Notificações
                {notificacoes > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {notificacoes}
                  </motion.span>
                )}
              </motion.button>

              {/* Botão de Ação Principal */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  toast.success("Funcionalidade em desenvolvimento!")
                }
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 flex items-center">
                <Plus className="mr-2" size={20} />
                Nova Ação
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Cards de Estatísticas com Animação de Contagem */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8 mb-10">
        <StatCard
          icon={<DollarSign size={32} className="text-green-400" />}
          label="Receita Total"
          value={dashboardData?.estatisticasFinanceiras.receitaTotal || 0}
          suffix=" R$"
          color="from-green-400 to-blue-500"
          delay={0.1}
        />
        <StatCard
          icon={<Users size={32} className="text-blue-400" />}
          label="Total de Usuários"
          value={dashboardData?.atividadeRecente.ultimosAlunos.length || 0}
          color="from-blue-400 to-purple-500"
          delay={0.2}
        />
        <StatCard
          icon={<BookOpen size={32} className="text-purple-400" />}
          label="Cursos Ativos"
          value={dashboardData?.atividadeRecente.ultimosCursos.length || 0}
          color="from-purple-400 to-pink-500"
          delay={0.3}
        />
        <StatCard
          icon={<Star size={32} className="text-yellow-400" />}
          label="Avaliações"
          value={dashboardData?.atividadeRecente.ultimasAvaliacoes.length || 0}
          color="from-yellow-400 to-red-500"
          delay={0.4}
        />
      </div>

      {/* Gráficos Simulados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 mb-10">
        {/* Gráfico de Barras Simulado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/20">
          <h2 className="text-xl font-bold text-white mb-6">
            Crescimento da Plataforma
          </h2>
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
              <span key={index}>{data.name}</span>
            ))}
          </div>
        </motion.div>

        {/* Gráfico de Pizza Simulado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
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

      {/* Atividade Recente Melhorada */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="px-8 mb-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Atividade Recente</h2>
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
              Ver Todas →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ActivitySection
              title="Últimos Cursos"
              items={dashboardData?.atividadeRecente.ultimosCursos || []}
              icon={<BookOpen size={20} />}
              color="text-blue-400"
              bgColor="bg-blue-500/10"
            />
            <ActivitySection
              title="Novos Alunos"
              items={dashboardData?.atividadeRecente.ultimosAlunos || []}
              icon={<Users size={20} />}
              color="text-green-400"
              bgColor="bg-green-500/10"
            />
            <ActivitySection
              title="Avaliações"
              items={dashboardData?.atividadeRecente.ultimasAvaliacoes || []}
              icon={<Star size={20} />}
              color="text-yellow-400"
              bgColor="bg-yellow-500/10"
            />
          </div>
        </div>
      </motion.div>

      {/* Seção de Métricas Avançadas */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="px-8 mb-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/20">
          <h2 className="text-xl font-bold text-white mb-6">
            Métricas de Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Taxa de Conversão"
              value="68.5%"
              change="+12.3%"
              trend="up"
              icon={<TrendingUp size={24} />}
            />
            <MetricCard
              title="Tempo Médio de Sessão"
              value="24m 32s"
              change="+5.2%"
              trend="up"
              icon={<Clock size={24} />}
            />
            <MetricCard
              title="Taxa de Abandono"
              value="12.8%"
              change="-3.1%"
              trend="down"
              icon={<Target size={24} />}
            />
            <MetricCard
              title="Satisfação Geral"
              value="4.8/5"
              change="+0.2"
              trend="up"
              icon={<Award size={24} />}
            />
          </div>
        </div>
      </motion.div>

      {/* Seção de Ações Rápidas Avançadas */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="px-8 mb-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/20">
          <h2 className="text-xl font-bold text-white mb-6">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AdvancedActionCard
              color="bg-gradient-to-r from-red-500 to-pink-500"
              icon={<Users size={28} />}
              label="Gerenciar Usuários"
              description="Adicionar, editar e remover usuários"
              badge="12 novos"
              onClick={() => {
                toast.success("Redirecionando para Gerenciar Usuários...");
                setTimeout(() => {
                  window.location.href = "/academia/admin/usuarios";
                }, 1000);
              }}
            />
            <AdvancedActionCard
              color="bg-gradient-to-r from-blue-500 to-purple-500"
              icon={<BookOpen size={28} />}
              label="Ver Relatórios"
              description="Relatórios detalhados e análises"
              badge="3 atualizações"
              onClick={() => {
                toast.success("Redirecionando para Relatórios...");
                setTimeout(() => {
                  window.location.href = "/academia/admin/relatorios";
                }, 1000);
              }}
            />
            <AdvancedActionCard
              color="bg-gradient-to-r from-green-500 to-blue-500"
              icon={<Settings size={28} />}
              label="Configurações"
              description="Configurar sistema e preferências"
              badge=""
              onClick={() => {
                toast.success("Redirecionando para Configurações...");
                setTimeout(() => {
                  window.location.href = "/academia/admin/configuracoes";
                }, 1000);
              }}
            />
            <AdvancedActionCard
              color="bg-gradient-to-r from-yellow-500 to-orange-500"
              icon={<Download size={28} />}
              label="Exportar Dados"
              description="Exportar relatórios e dados"
              badge="PDF/Excel"
              onClick={async () => {
                try {
                  toast.loading("Preparando exportação...");
                  await new Promise((resolve) => setTimeout(resolve, 2000));
                  toast.dismiss();
                  toast.success("Dados exportados com sucesso!");

                  // Simular download
                  const link = document.createElement("a");
                  link.href = "data:application/zip;base64,UEsDBBQAAAAIAA...";
                  link.download = `dados-academia-${
                    new Date().toISOString().split("T")[0]
                  }.zip`;
                  link.click();
                } catch (error) {
                  toast.error("Erro ao exportar dados");
                }
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Seção de Notificações e Alertas */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="px-8 mb-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/20">
          <h2 className="text-xl font-bold text-white mb-6">
            Notificações e Alertas
          </h2>
          <div className="space-y-4">
            <NotificationItem
              type="success"
              title="Backup Concluído"
              message="Backup automático realizado com sucesso às 02:00"
              time="2 horas atrás"
            />
            <NotificationItem
              type="warning"
              title="Espaço em Disco"
              message="Espaço em disco está em 85% de uso"
              time="4 horas atrás"
            />
            <NotificationItem
              type="info"
              title="Atualização Disponível"
              message="Nova versão do sistema está disponível"
              time="1 dia atrás"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Card de estatística com animação de contagem
function StatCard({
  icon,
  label,
  value,
  suffix = "",
  color,
  delay,
}: {
  icon: any;
  label: string;
  value: number;
  suffix?: string;
  color: string;
  delay: number;
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className={`rounded-3xl p-6 shadow-lg bg-gradient-to-br ${color} flex flex-col items-start justify-between min-h-[160px] hover:scale-105 transition-transform duration-300`}>
      <div className="mb-4">{icon}</div>
      <div className="text-3xl font-extrabold text-white">
        {inView && (
          <CountUp
            start={0}
            end={value}
            duration={2}
            separator="."
            decimal=","
          />
        )}
        {suffix}
      </div>
      <div className="text-white/80 text-sm font-medium">{label}</div>
    </motion.div>
  );
}

// Seção de atividade recente melhorada
function ActivitySection({
  title,
  items,
  icon,
  color,
  bgColor,
}: {
  title: string;
  items: any[];
  icon: any;
  color: string;
  bgColor: string;
}) {
  return (
    <div>
      <h3 className={`text-lg font-semibold mb-4 flex items-center ${color}`}>
        <div className={`p-2 rounded-lg mr-3 ${bgColor}`}>{icon}</div>
        <span>{title}</span>
      </h3>
      <div className="space-y-3">
        {items.slice(0, 3).map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium text-sm">
                  {item.titulo || item.nome || "Item"}
                </div>
                <div className="text-gray-400 text-xs">
                  {new Date(item.criado_em).toLocaleDateString()}
                </div>
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                <Eye size={14} className="text-gray-400" />
              </div>
            </div>
          </motion.div>
        ))}
        {items.length === 0 && (
          <div className="text-gray-400 text-sm text-center py-4">
            Nenhum item encontrado
          </div>
        )}
      </div>
    </div>
  );
}

// Card de métrica avançada
function MetricCard({
  title,
  value,
  change,
  trend,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: any;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-white/10 rounded-xl">{icon}</div>
        <div
          className={`flex items-center text-sm ${
            trend === "up" ? "text-green-400" : "text-red-400"
          }`}>
          {trend === "up" ? "↗" : "↘"}
          <span className="ml-1">{change}</span>
        </div>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-gray-400 text-sm">{title}</div>
    </motion.div>
  );
}

// Card de ação avançada
function AdvancedActionCard({
  color,
  icon,
  label,
  description,
  badge,
  onClick,
}: {
  color: string;
  icon: any;
  label: string;
  description: string;
  badge: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`rounded-2xl p-6 shadow-lg text-white font-bold flex flex-col items-center justify-center space-y-4 text-center transition-all duration-300 ${color} hover:shadow-2xl relative overflow-hidden group`}>
      {badge && (
        <div className="absolute top-3 right-3 bg-white/20 text-white text-xs px-2 py-1 rounded-full">
          {badge}
        </div>
      )}
      <div className="p-4 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
        {icon}
      </div>
      <div>
        <div className="text-lg font-bold mb-2">{label}</div>
        <div className="text-sm opacity-80 font-normal">{description}</div>
      </div>
      <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "60%" }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-full bg-white/40"
        />
      </div>
    </motion.button>
  );
}

// Item de notificação
function NotificationItem({
  type,
  title,
  message,
  time,
}: {
  type: "success" | "warning" | "info" | "error";
  title: string;
  message: string;
  time: string;
}) {
  const colors = {
    success: "border-green-500/30 bg-green-500/10",
    warning: "border-yellow-500/30 bg-yellow-500/10",
    info: "border-blue-500/30 bg-blue-500/10",
    error: "border-red-500/30 bg-red-500/10",
  };

  const icons = {
    success: "✓",
    warning: "⚠",
    info: "ℹ",
    error: "✕",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`p-4 rounded-xl border ${colors[type]} hover:bg-white/5 transition-colors`}>
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
          {icons[type]}
        </div>
        <div className="flex-1">
          <div className="text-white font-medium">{title}</div>
          <div className="text-gray-300 text-sm mt-1">{message}</div>
          <div className="text-gray-400 text-xs mt-2">{time}</div>
        </div>
      </div>
    </motion.div>
  );
}
