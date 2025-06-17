import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  TrendingUp,
  Users,
  ShoppingCart,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const RevenueChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Receita Mensal",
        data: [30000, 35000, 32000, 40000, 45000, 42000],
        borderColor: "#f59e0b",
        fill: false,
      },
    ],
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Receita ao Longo do Tempo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Line data={data} options={{ responsive: true }} />
      </CardContent>
    </Card>
  );
};

const CustomerMetrics = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Métricas de Clientes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <MetricItem
            label="Novos Clientes"
            value="124"
            trend="up"
            percentage="12%"
          />
          <MetricItem
            label="Taxa de Retenção"
            value="85%"
            trend="up"
            percentage="5%"
          />
          <MetricItem
            label="Clientes Ativos"
            value="1,234"
            trend="down"
            percentage="2%"
          />
        </div>
      </CardContent>
    </Card>
  );
};

const SalesBreakdown = () => {
  const data = {
    labels: ["Carnes", "Peixes", "Sobremesas", "Bebidas"],
    datasets: [
      {
        data: [40, 25, 20, 15],
        backgroundColor: ["#f59e0b", "#3b82f6", "#10b981", "#8b5cf6"],
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Vendas por Categoria
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Doughnut data={data} options={{ responsive: true }} />
      </CardContent>
    </Card>
  );
};

const InventoryAlerts = () => {
  const lowStockItems = [
    { name: "Carne Bovina", quantity: 5, threshold: 10 },
    { name: "Vinho Tinto", quantity: 3, threshold: 8 },
    { name: "Salmão", quantity: 2, threshold: 5 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Alertas de Estoque
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {lowStockItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 bg-amber-50 rounded"
            >
              <span>{item.name}</span>
              <span className="text-amber-600 font-medium">
                {item.quantity}/{item.threshold}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const MetricItem = ({ label, value, trend, percentage }) => {
  const isUp = trend === "up";

  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div
        className={`flex items-center ${
          isUp ? "text-green-500" : "text-red-500"
        }`}
      >
        {isUp ? (
          <ArrowUpRight className="h-4 w-4" />
        ) : (
          <ArrowDownRight className="h-4 w-4" />
        )}
        <span className="ml-1">{percentage}</span>
      </div>
    </div>
  );
};

export const AnalyticsTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RevenueChart />
        <CustomerMetrics />
        <SalesBreakdown />
        <InventoryAlerts />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Insights do Negócio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium">Melhor Dia</h3>
              <p className="text-2xl font-bold">Sábado</p>
              <p className="text-sm text-gray-600">45% das vendas semanais</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium">Horário de Pico</h3>
              <p className="text-2xl font-bold">19:00 - 21:00</p>
              <p className="text-sm text-gray-600">32 reservas em média</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg">
              <h3 className="font-medium">Prato Mais Vendido</h3>
              <p className="text-2xl font-bold">Picanha na Brasa</p>
              <p className="text-sm text-gray-600">15 pedidos este mês</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
