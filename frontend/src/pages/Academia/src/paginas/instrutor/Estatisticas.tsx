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
  TrendingUp,
  Target,
  Award,
  Clock,
  TrendingDown,
  CheckCircle,
  Users as UsersIcon,
} from "lucide-react";
import api from "../../utils/api";

export default function Estatisticas() {
  const [estatisticas, setEstatisticas] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [periodoSelecionado, setPeriodoSelecionado] = useState("30dias");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("todas");

  useEffect(() => {
    carregarEstatisticas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [periodoSelecionado, categoriaSelecionada]);

  const carregarEstatisticas = async () => {
    try {
      setCarregando(true);
      const response = await api.get(
        `/instrutor/estatisticas?periodo=${periodoSelecionado}&categoria=${categoriaSelecionada}`
      );
      if (response.data.sucesso) {
        setEstatisticas(response.data.dados);
        toast.success("Estatísticas carregadas com sucesso!");
      }
    } catch (error: any) {
      console.error("Erro ao carregar estatísticas:", error);
      setEstatisticas(getMockData());
      toast.error("Erro ao carregar estatísticas");
    } finally {
      setCarregando(false);
    }
  };

  const getMockData = () => ({
    resumo: {
      totalCursos: 8,
      totalAlunos: 156,
      receitaTotal: 45000,
      mediaAvaliacao: 4.7,
      totalAulas: 124,
      totalModulos: 32,
      taxaConclusao: 87,
      tempoMedioAula: 45,
      satisfacaoAlunos: 94,
    },
    performanceMensal: [
      { mes: "Jan", alunos: 12, receita: 8000, cursos: 1, avaliacoes: 8 },
      { mes: "Fev", alunos: 18, receita: 12000, cursos: 2, avaliacoes: 15 },
      { mes: "Mar", alunos: 25, receita: 15000, cursos: 2, avaliacoes: 22 },
      { mes: "Abr", alunos: 35, receita: 22000, cursos: 3, avaliacoes: 28 },
      { mes: "Mai", alunos: 45, receita: 28000, cursos: 4, avaliacoes: 35 },
      { mes: "Jun", alunos: 56, receita: 35000, cursos: 5, avaliacoes: 42 },
    ],
    categorias: [
      {
        nome: "Programação",
        cursos: 4,
        alunos: 89,
        receita: 28000,
        avaliacao: 4.8,
      },
      { nome: "Design", cursos: 2, alunos: 45, receita: 12000, avaliacao: 4.6 },
      {
        nome: "Marketing",
        cursos: 1,
        alunos: 22,
        receita: 5000,
        avaliacao: 4.5,
      },
    ],
    cursosPopulares: [
      {
        id: 1,
        titulo: "React Avançado",
        inscritos: 45,
        avaliacao: 4.8,
        receita: 13500,
        visualizacoes: 1200,
      },
      {
        id: 2,
        titulo: "Node.js Backend",
        inscritos: 32,
        avaliacao: 4.6,
        receita: 9600,
        visualizacoes: 890,
      },
      {
        id: 3,
        titulo: "TypeScript",
        inscritos: 28,
        avaliacao: 4.9,
        receita: 8400,
        visualizacoes: 750,
      },
    ],
    atividadeRecente: [
      {
        tipo: "novo_aluno",
        descricao: "João Silva se inscreveu no curso React Avançado",
        tempo: "2h atrás",
      },
      {
        tipo: "avaliacao",
        descricao: "Ana Oliveira avaliou o curso Node.js com 5 estrelas",
        tempo: "4h atrás",
      },
      {
        tipo: "conclusao",
        descricao: "Carlos Lima concluiu o curso TypeScript",
        tempo: "6h atrás",
      },
    ],
  });

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Estatísticas Detalhadas
              </h1>
              <p className="text-gray-600 mt-1">
                Análise completa do desempenho dos seus cursos
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={periodoSelecionado}
                onChange={(e) => setPeriodoSelecionado(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="7dias">Últimos 7 dias</option>
                <option value="30dias">Últimos 30 dias</option>
                <option value="90dias">Últimos 90 dias</option>
                <option value="1ano">Último ano</option>
              </select>

              <select
                value={categoriaSelecionada}
                onChange={(e) => setCategoriaSelecionada(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="todas">Todas as categorias</option>
                <option value="programacao">Programação</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={BookOpen}
            label="Total de Cursos"
            value={estatisticas?.resumo.totalCursos || 0}
            suffix=" cursos"
            color="blue"
            delay={0}
            change="+2 este mês"
            trend="up"
          />
          <StatCard
            icon={Users}
            label="Total de Alunos"
            value={estatisticas?.resumo.totalAlunos || 0}
            suffix=" alunos"
            color="green"
            delay={0.1}
            change="+12 este mês"
            trend="up"
          />
          <StatCard
            icon={DollarSign}
            label="Receita Total"
            value={estatisticas?.resumo.receitaTotal || 0}
            suffix=" Kz"
            color="purple"
            delay={0.2}
            change="+15% este mês"
            trend="up"
          />
          <StatCard
            icon={Star}
            label="Avaliação Média"
            value={estatisticas?.resumo.mediaAvaliacao || 0}
            suffix=" / 5"
            color="yellow"
            delay={0.3}
            change="+0.2 este mês"
            trend="up"
          />
        </div>

        {/* Métricas de Performance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Taxa de Conclusão"
            value={`${estatisticas?.resumo.taxaConclusao || 0}%`}
            change="+12%"
            trend="up"
            icon={Target}
            description="Alunos que completaram os cursos"
          />
          <MetricCard
            title="Tempo Médio de Aula"
            value={`${estatisticas?.resumo.tempoMedioAula || 0}min`}
            change="+5min"
            trend="up"
            icon={Clock}
            description="Duração média das aulas"
          />
          <MetricCard
            title="Satisfação dos Alunos"
            value={`${estatisticas?.resumo.satisfacaoAlunos || 0}%`}
            change="+3%"
            trend="up"
            icon={Award}
            description="Alunos satisfeitos com os cursos"
          />
        </div>

        {/* Gráficos */}
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
              {estatisticas?.performanceMensal.map(
                (item: any, index: number) => (
                  <div
                    key={item.mes}
                    className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 w-12">
                      {item.mes}
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
                )
              )}
            </div>
          </div>

          {/* Distribuição por Categoria */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Performance por Categoria
            </h3>
            <div className="space-y-4">
              {estatisticas?.categorias.map((categoria: any, index: number) => (
                <div key={categoria.nome} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {categoria.nome}
                    </h4>
                    <div className="flex items-center space-x-1">
                      <Star
                        size={16}
                        className="text-yellow-500 fill-current"
                      />
                      <span className="text-sm font-bold">
                        {categoria.avaliacao}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Cursos</p>
                      <p className="font-semibold text-gray-900">
                        {categoria.cursos}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Alunos</p>
                      <p className="font-semibold text-gray-900">
                        {categoria.alunos}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Receita</p>
                      <p className="font-semibold text-green-600">
                        {categoria.receita.toLocaleString()} Kz
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cursos Mais Populares */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Cursos Mais Populares
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {estatisticas?.cursosPopulares.map((curso: any, index: number) => (
              <motion.div
                key={curso.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <BookOpen size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {curso.titulo}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {curso.inscritos} inscritos
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Avaliação</p>
                    <div className="flex items-center space-x-1">
                      <Star
                        size={14}
                        className="text-yellow-500 fill-current"
                      />
                      <span className="font-semibold">{curso.avaliacao}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600">Receita</p>
                    <p className="font-semibold text-green-600">
                      {curso.receita.toLocaleString()} Kz
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Visualizações</p>
                    <p className="font-semibold text-gray-900">
                      {curso.visualizacoes}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Taxa de Conclusão</p>
                    <p className="font-semibold text-blue-600">87%</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Atividade Recente */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Atividade Recente
          </h3>
          <div className="space-y-4">
            {estatisticas?.atividadeRecente.map(
              (atividade: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    {atividade.tipo === "novo_aluno" && (
                      <UsersIcon size={16} className="text-white" />
                    )}
                    {atividade.tipo === "avaliacao" && (
                      <Star size={16} className="text-white" />
                    )}
                    {atividade.tipo === "conclusao" && (
                      <CheckCircle size={16} className="text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {atividade.descricao}
                    </p>
                    <p className="text-sm text-gray-500">{atividade.tempo}</p>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>

        {/* Insights e Recomendações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Insights</h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp size={20} className="text-green-600" />
                  <span className="font-semibold text-green-800">
                    Crescimento Positivo
                  </span>
                </div>
                <p className="text-green-700 text-sm">
                  Sua receita cresceu 15% este mês. Continue criando conteúdo de
                  qualidade!
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Target size={20} className="text-blue-600" />
                  <span className="font-semibold text-blue-800">
                    Oportunidade
                  </span>
                </div>
                <p className="text-blue-700 text-sm">
                  Cursos de programação têm maior demanda. Considere criar mais
                  conteúdo nesta área.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Recomendações
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-blue-600 text-xs font-bold">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Criar mais cursos de programação
                  </p>
                  <p className="text-sm text-gray-600">
                    Baseado na alta demanda observada
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-green-600 text-xs font-bold">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Melhorar o suporte aos alunos
                  </p>
                  <p className="text-sm text-gray-600">
                    Pode aumentar a taxa de conclusão
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-purple-600 text-xs font-bold">3</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Adicionar mais exercícios práticos
                  </p>
                  <p className="text-sm text-gray-600">
                    Alunos preferem conteúdo interativo
                  </p>
                </div>
              </div>
            </div>
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
  change,
  trend,
}: {
  icon: any;
  label: string;
  value: number;
  suffix?: string;
  color: string;
  delay: number;
  change: string;
  trend: "up" | "down";
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
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 rounded-lg ${
            colorClasses[color as keyof typeof colorClasses]
          }`}>
          <Icon size={24} className="text-white" />
        </div>
        <div className="flex items-center space-x-1">
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
    </motion.div>
  );
}

function MetricCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  description,
}: {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: any;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Icon size={24} className="text-blue-600" />
        </div>
        <div className="flex items-center space-x-1">
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
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );
}
