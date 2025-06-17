import React from 'react';
import {
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface PropsGrafico {
  dados: any[];
  campoX: string;
  campoY: string;
  formatador?: (valor: number) => string;
}

const CORES = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const GraficoBarra: React.FC<PropsGrafico> = ({ dados, campoX, campoY, formatador }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={dados}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={campoX} />
        <YAxis tickFormatter={formatador} />
        <Tooltip formatter={formatador} />
        <Legend />
        <Bar dataKey={campoY} fill="#8884d8" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export const GraficoLinha: React.FC<PropsGrafico> = ({ dados, campoX, campoY, formatador }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={dados}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={campoX} />
        <YAxis tickFormatter={formatador} />
        <Tooltip formatter={formatador} />
        <Legend />
        <Line type="monotone" dataKey={campoY} stroke="#8884d8" />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

interface PropsGraficoPizza {
  dados: any[];
  campoValor: string;
  campoCategoria: string;
  formatador?: (valor: number) => string;
}

export const GraficoPizza: React.FC<PropsGraficoPizza> = ({ dados, campoValor, campoCategoria, formatador }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={dados}
          dataKey={campoValor}
          nameKey={campoCategoria}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label={formatador ? (entrada) => formatador(entrada.value) : undefined}
        >
          {dados.map((entrada, indice) => (
            <Cell key={`celula-${indice}`} fill={CORES[indice % CORES.length]} />
          ))}
        </Pie>
        <Tooltip formatter={formatador} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};