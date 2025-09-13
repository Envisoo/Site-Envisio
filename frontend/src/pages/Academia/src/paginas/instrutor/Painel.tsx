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
  Calendar,
  Target,
  Award,
  Eye,
  Download,
  Settings,
  Plus,
  Search,
  Filter,
  Clock,
  Video,
  MessageSquare,
  FileText,
  BarChart3,
  Zap,
  Target as TargetIcon,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function InstrutorPainel() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [notificacoes, setNotificacoes] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    carregarDashboard();
    const interval = setInterval(() => {
      setNotificacoes((prev) =>
        Math.max(0, prev + Math.floor(Math.random() * 3) - 1)
      );
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const carregarDashboard = async () => {
    try {
      setCarregando(true);
      const response = await api.get("/instrutor/meus-cursos");
      setDashboardData({
        totalCursos: response.data.cursos?.length || 0,
        totalAlunos: 156,
        receitaTotal: 45000,
        mediaAvaliacao: 4.7,
        cursos: response.data.cursos || [],
      });
      toast.success("Dashboard carregado com sucesso!");
    } catch (error: any) {
      console.error("Erro ao carregar dashboard:", error);
      setDashboardData({
        totalCursos: 8,
        totalAlunos: 156,
        receitaTotal: 45000,
        mediaAvaliacao: 4.7,
        cursos: [],
      });
      toast.error("Erro ao carregar dados do dashboard");
    } finally {
      setCarregando(false);
    }
  };

  if (carregando) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-500">
      <Toaster
        position="top-right"
        toastOptions={{ className: "glass-toast" }}
      />

      <div className="container mx-auto p-6 space-y-8 max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl mb-7 mt-2 font-bold bg-clip-text text-transparent bg-black">
          Dashboard do Instrutor
        </motion.h1>
        {/* Cards de Estatísticas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={BookOpen}
            label="Total de Cursos"
            value={dashboardData?.totalCursos || 0}
            suffix=" cursos"
            color="blue"
            delay={0}
          />
          <StatCard
            icon={Users}
            label="Total de Alunos"
            value={dashboardData?.totalAlunos || 0}
            suffix=" alunos"
            color="green"
            delay={0.1}
          />
          <StatCard
            icon={DollarSign}
            label="Receita Total"
            value={dashboardData?.receitaTotal || 0}
            suffix=" Kz"
            color="purple"
            delay={0.2}
          />
          <StatCard
            icon={Star}
            label="Avaliação Média"
            value={dashboardData?.mediaAvaliacao || 0}
            suffix=" / 5"
            color="yellow"
            delay={0.3}
          />
        </div>

        {/* Métricas de Performance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Taxa de Conclusão"
            value="87%"
            change="+12%"
            trend="up"
            icon={Target}
          />
          <MetricCard
            title="Tempo Médio de Aula"
            value="45min"
            change="+5min"
            trend="up"
            icon={Clock}
          />
          <MetricCard
            title="Satisfação dos Alunos"
            value="94%"
            change="+3%"
            trend="up"
            icon={Award}
          />
        </div>

        {/* Gráficos e Análises */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Performance Mensal */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Performance Mensal
              </h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg">
                  Alunos
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg">
                  Receita
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { name: "Jan", alunos: 12 },
                { name: "Fev", alunos: 18 },
                { name: "Mar", alunos: 25 },
                { name: "Abr", alunos: 35 },
                { name: "Mai", alunos: 45 },
                { name: "Jun", alunos: 56 },
              ].map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 w-12">
                    {item.name}
                  </span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.alunos / 60) * 100}%` }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                      />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-900 w-16 text-right">
                    {item.alunos}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Distribuição por Categoria */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Categorias</h3>
            <div className="space-y-4">
              {[
                { name: "Programação", value: 60, color: "#3B82F6" },
                { name: "Design", value: 25, color: "#8B5CF6" },
                { name: "Marketing", value: 15, color: "#10B981" },
              ].map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        className="h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-8">
                      {item.value}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ações Avançadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdvancedActionCard
            color="blue"
            icon={Plus}
            label="Criar Curso"
            description="Adicione um novo curso à sua biblioteca"
            badge="Popular"
            onClick={() => navigate("/academia/instrutor/gerenciar-cursos")}
          />
          <AdvancedActionCard
            color="purple"
            icon={Video}
            label="Gerenciar Aulas"
            description="Organize e edite suas aulas"
            badge="Ativo"
            onClick={() => navigate("/academia/instrutor/gerenciar-aulas")}
          />
          <AdvancedActionCard
            color="green"
            icon={BarChart3}
            label="Ver Estatísticas"
            description="Analise o desempenho detalhado"
            badge="Novo"
            onClick={() => navigate("/academia/instrutor/estatisticas")}
          />
          <AdvancedActionCard
            color="orange"
            icon={MessageSquare}
            label="Suporte"
            description="Atenda dúvidas dos alunos"
            badge="3 novos"
            onClick={() => navigate("/academia/instrutor/suporte")}
          />
        </div>

        {/* Notificações e Alertas */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Notificações e Alertas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <NotificationItem
              type="success"
              title="Curso Publicado"
              message="React Avançado foi publicado com sucesso"
              time="2 horas atrás"
            />
            <NotificationItem
              type="info"
              title="Novo Aluno"
              message="João Silva se inscreveu no curso Node.js"
              time="4 horas atrás"
            />
            <NotificationItem
              type="warning"
              title="Avaliação Pendente"
              message="5 avaliações aguardam sua resposta"
              time="1 dia atrás"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Componentes auxiliares
function StatCard({
  icon: Icon,
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
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    yellow: "bg-yellow-500",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <div className="flex items-baseline space-x-1">
            {inView && (
              <CountUp
                start={0}
                end={value}
                duration={1.5}
                separator=","
                className="text-3xl font-bold text-gray-900"
              />
            )}
            <span className="text-lg font-medium text-gray-500">{suffix}</span>
          </div>
        </div>
        <div
          className={`p-3 rounded-lg ${
            colorClasses[color as keyof typeof colorClasses]
          }`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
}

function MetricCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
}: {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: any;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center space-x-1 mt-1">
            {trend === "up" ? (
              <TrendingUp size={16} className="text-green-500" />
            ) : (
              <TrendingDown size={16} className="text-red-500" />
            )}
            <span
              className={`text-sm font-medium ${
                trend === "up" ? "text-green-600" : "text-red-600"
              }`}>
              {change}
            </span>
          </div>
        </div>
        <div className="p-3 bg-blue-100 rounded-lg">
          <Icon size={24} className="text-blue-600" />
        </div>
      </div>
    </div>
  );
}

function AdvancedActionCard({
  color,
  icon: Icon,
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
  const colorClasses = {
    blue: "bg-blue-500 hover:bg-blue-600",
    purple: "bg-purple-500 hover:bg-purple-600",
    green: "bg-green-500 hover:bg-green-600",
    orange: "bg-orange-500 hover:bg-orange-600",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-3 rounded-lg ${
            colorClasses[color as keyof typeof colorClasses]
          }`}>
          <Icon size={24} className="text-white" />
        </div>
        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
          {badge}
        </span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{label}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
}

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
  const typeConfig = {
    success: {
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    warning: {
      icon: AlertCircle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    info: { icon: Info, color: "text-blue-600", bgColor: "bg-blue-50" },
    error: { icon: AlertCircle, color: "text-red-600", bgColor: "bg-red-50" },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className={`p-4 rounded-lg ${config.bgColor} border border-gray-200`}>
      <div className="flex items-start space-x-3">
        <Icon size={20} className={`mt-0.5 ${config.color}`} />
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600 mt-1">{message}</p>
          <p className="text-xs text-gray-500 mt-2">{time}</p>
        </div>
      </div>
    </div>
  );
}
