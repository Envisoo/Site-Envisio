import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OrderSystem } from "./OrderSystem";
import * as Tabs from "@radix-ui/react-tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Stock } from "./Stock";
import { toast } from "./ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Users,
  Utensils,
  Calendar,
  DollarSign,
  ShoppingBag,
  Trash2,
  Edit,
  Plus,
  Search,
  BarChart,
  Package,
  TrendingUp,
  Star,
  X,
  Grid2X2,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Switch } from "react-router-dom";

// Interfaces
interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  available: boolean;
  imageUrl: string;
  preparationTime: number;
  ingredients: string[];
  allergens: string[];
  calories: number;
  featured: boolean;
  ratings: number;
}
// O que o código espera
interface Order {
  id: string;
  customerName?: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "preparing" | "ready" | "delivered";
  tableNumber: string;
  waiter?: string;
  item?: MenuItem;
  quantity?: number;
  timeRemaining?: number;
  notes?: string;
}

// Nova interface para funcionários
interface Employee {
  id: string;
  name: string;
  role: "waiter" | "chef" | "manager" | "cashier";
  status: "active" | "inactive";
  hireDate: Date;
  phone: string;
  email: string;
  schedule: string;
  performance: number;
}

interface Reservation {
  id: string;
  customerName: string;
  date: Date;
  time: string;
  guests: number;
  status: "confirmed" | "cancelled" | "completed" | "pending";
  contactPhone?: string;
  notes?: string;
}

interface ReservationTableProps {
  date: string;
  period: string;
}

interface TableFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

interface FilterOptions {
  status: string;
  dateRange: string;
  sortBy: string;
  searchTerm: string;
  category?: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend: number;
  description: string;
}
interface AddMenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: MenuItem) => void;
}

// Componentes
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  description,
}) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center mt-2">
        <TrendingUp
          className={`h-4 w-4 mr-1 ${
            trend >= 0 ? "text-green-600 rotate-0" : "text-red-600 rotate-180"
          }`}
        />
        <span
          className={`text-sm ${
            trend >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {trend > 0 ? "+" : ""}
          {trend}%
        </span>
        <span className="text-sm text-gray-500 ml-2">{description}</span>
      </div>
    </CardContent>
  </Card>
);

const TableFilters: React.FC<TableFiltersProps> = ({
  filters,
  onFilterChange,
}) => (
  <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
    <div className="flex-1 min-w-[200px]">
      <input
        type="text"
        placeholder="Pesquisar..."
        className="w-full p-2 border rounded-md"
        value={filters.searchTerm}
        onChange={(e) =>
          onFilterChange({ ...filters, searchTerm: e.target.value })
        }
      />
    </div>
    <div className="flex-1 min-w-[200px]">
      <select
        className="w-full p-2 border rounded-md"
        value={filters.dateRange}
        onChange={(e) =>
          onFilterChange({ ...filters, dateRange: e.target.value })
        }
      >
        <option value="today">Hoje</option>
        <option value="week">Esta Semana</option>
        <option value="month">Este Mês</option>
        <option value="all">Todo Período</option>
      </select>
    </div>
    <div className="flex-1 min-w-[200px]">
      <select
        className="w-full p-2 border rounded-md"
        value={filters.status}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
      >
        <option value="all">Todos Status</option>
        <option value="active">Ativos</option>
        <option value="pending">Pendentes</option>
        <option value="completed">Concluídos</option>
      </select>
    </div>
  </div>
);

const AddMenuItemModal: React.FC<AddMenuItemModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [newItem, setNewItem] = useState<MenuItem>({
    id: "",
    name: "",
    price: 0,
    category: "",
    description: "",
    available: true,
    imageUrl: "",
    preparationTime: 0,
    ingredients: [],
    allergens: [],
    calories: 0,
    featured: false,
    ratings: 0,
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[600px]">
        <h2 className="text-xl font-bold mb-4">Adicionar Novo Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Imagem do Prato</label>
            <div className="flex items-center space-x-4">
              <img
                src={newItem.imageUrl || "/placeholder-food.jpg"}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-lg"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setNewItem({
                        ...newItem,
                        imageUrl: reader.result as string,
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full"
              />
            </div>
          </div>

          {/* Existing fields */}
          <div>
            <label className="block mb-1">Nome</label>
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Preço (Kz)</label>
            <input
              type="number"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: Number(e.target.value) })
              }
              className="w-full border rounded p-2"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block mb-1">Categoria</label>
            <select
              value={newItem.category}
              onChange={(e) =>
                setNewItem({ ...newItem, category: e.target.value })
              }
              className="w-full border rounded p-2"
              required
            >
              <option value="">Selecione uma categoria</option>
              <option value="Carnes">Carnes</option>
              <option value="Peixes">Peixes</option>
              <option value="Sobremesas">Sobremesas</option>
              <option value="Bebidas">Bebidas</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Descrição</label>
            <textarea
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
              className="w-full border rounded p-2 h-24"
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
            >
              {newItem.id ? "Salvar Alterações" : "Adicionar Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Componente Principal
export const AdminDashboard = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState<MenuItem | null>(null);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    // Inicializa com o mês atual
    return new Date().toISOString().split("T")[0].substring(0, 7) + "-01";
  });
  const [filters, setFilters] = useState<FilterOptions>({
    status: "all",
    dateRange: "today",
    sortBy: "newest",
    searchTerm: "",
    category: "all",
  });
  const [editedItem, setEditedItem] = useState<MenuItem>({
    id: "",
    name: "",
    price: 0,
    category: "",
    description: "",
    available: true,
    imageUrl: "",
    preparationTime: 0,
    ingredients: [],
    allergens: [],
    calories: 0,
    featured: false,
    ratings: 0,
  });

  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: "1",
      customerName: "Maria Santos",
      date: new Date(),
      time: "20:00",
      guests: 4,
      status: "confirmed",
    },
  ]);

  const formatCurrency = (value: number | undefined): string => {
    if (value === undefined || value === null) {
      return "0,00 Kz";
    }

    return value.toLocaleString("pt-AO", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 2,
    });
  };

  const renderDashboardHeader = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Receita Total"
        value={formatCurrency(250000)}
        icon={<DollarSign className="h-4 w-4 text-green-600" />}
        trend={15}
        description="vs. mês anterior"
      />
      <StatCard
        title="Pedidos Hoje"
        value={orders?.length || 0}
        icon={<ShoppingBag className="h-4 w-4 text-amber-600" />}
        trend={8}
        description="vs. ontem"
      />
      <StatCard
        title="Satisfação Cliente"
        value="4.8/5.0"
        icon={<Users className="h-4 w-4 text-blue-600" />}
        trend={4.2}
        description="últimos 30 dias"
      />
      <StatCard
        title="Total Funcionários"
        value={15}
        icon={<Users className="h-4 w-4 text-purple-600" />}
        trend={0}
        description="sem alteração"
      />
    </div>
  );

  const navigateMonth = (direction: "prev" | "next") => {
    const currentDate = new Date(calendarMonth);
    if (direction === "prev") {
      currentDate.setMonth(currentDate.getMonth() - 1);
    } else {
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    setCalendarMonth(
      currentDate.toISOString().split("T")[0].substring(0, 7) + "-01"
    );
  };
  function setIsAddEmployeeModal(arg0: boolean): void {
    throw new Error("Function not implemented.");
  }

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      name: "João Silva",
      role: "waiter",
      status: "active",
      hireDate: new Date("2023-01-15"),
      phone: "123-456-789",
      email: "joao@restaurante.com",
      schedule: "Segunda a Sexta",
      performance: 95,
    },
    {
      id: "2",
      name: "Maria Santos",
      role: "chef",
      status: "active",
      hireDate: new Date("2022-06-10"),
      phone: "987-654-321",
      email: "maria@restaurante.com",
      schedule: "Terça a Sábado",
      performance: 98,
    },
  ]);

  // Funções para gerenciar funcionários

  const handleEditEmployee = (
    id: string,
    updatedEmployee: Partial<Employee>
  ) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === id ? { ...emp, ...updatedEmployee } : emp
      )
    );
  };

  const handleEditMenuItem = (item: MenuItem) => {
    setCurrentEditItem(item);
    setIsAddModalOpen(true);
  };

  const handleDeleteMenuItem = (itemId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      setMenu(menu.filter((item) => item.id !== itemId));
    }
  };

  const handleItemAvailability = (itemId: string, available: boolean) => {
    setMenu(
      menu.map((item) => (item.id === itemId ? { ...item, available } : item))
    );
  };

  const [modalAberto, setModalAberto] = useState(false);
  const [novoItem, setNovoItem] = useState<MenuItem>({
    id: "",
    name: "",
    price: 0,
    category: "",
    description: "",
    available: true,
    imageUrl: "",
    preparationTime: 0,
    ingredients: [],
    allergens: [],
    calories: 0,
    featured: false,
    ratings: 0,
  });

  const adicionarNovoItem = () => {
    setNovoItem({
      id: "",
      name: "",
      price: 0,
      category: "",
      description: "",
      available: true,
      imageUrl: "",
      preparationTime: 0,
      ingredients: [],
      allergens: [],
      calories: 0,
      featured: false,
      ratings: 0,
    });
    setModalAberto(true);
  };

  const [menu, setMenu] = useState<MenuItem[]>(() => {
    const menuSalvo = localStorage.getItem("menuItems");
    return menuSalvo ? JSON.parse(menuSalvo) : [];
  });
  // Modifique a função de salvar para também atualizar o localStorage
  const salvarNovoItem = (e: React.FormEvent) => {
    e.preventDefault();
    const novoId = (menu.length + 1).toString();

    const itemParaAdicionar = {
      ...novoItem,
      id: novoId,
      available: true,
      ratings: 0,
    };

    const novoMenu = [...menu, itemParaAdicionar];
    setMenu(novoMenu);
    localStorage.setItem("menuItems", JSON.stringify(novoMenu));

    setModalAberto(false);
    setNovoItem({
      id: "",
      name: "",
      price: 0,
      category: "",
      description: "",
      available: true,
      imageUrl: "",
      preparationTime: 0,
      ingredients: [],
      allergens: [],
      calories: 0,
      featured: false,
      ratings: 0,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setMenu(
      menu.map((item) => (item.id === editedItem.id ? editedItem : item))
    );

    setIsAddModalOpen(false);
    setEditedItem({
      id: "",
      name: "",
      price: 0,
      category: "",
      description: "",
      available: true,
      imageUrl: "",
      preparationTime: 0,
      ingredients: [],
      allergens: [],
      calories: 0,
      featured: false,
      ratings: 0,
    });
  };

  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [itemEditando, setItemEditando] = useState<MenuItem | null>(null);

  const iniciarEdicao = (item: MenuItem) => {
    setItemEditando(item);
    setModalEditarAberto(true);
  };

  const orderUpdateTimeoutRef = React.useRef<number | null>(null);

  const refreshOrders = () => {
    if (orderUpdateTimeoutRef.current) {
      clearTimeout(orderUpdateTimeoutRef.current);
    }

    orderUpdateTimeoutRef.current = window.setTimeout(() => {
      const savedOrders = localStorage.getItem("orders");
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
      orderUpdateTimeoutRef.current = null;
    }, 500);
  };

  // Adicione este useEffect para limpar ao desmontar
  useEffect(() => {
    return () => {
      if (orderUpdateTimeoutRef.current) {
        clearTimeout(orderUpdateTimeoutRef.current);
      }
    };
  }, []);

  const handleCalendarDayClick = (day: number) => {
    // Cria uma nova data baseada no mês atualmente exibido
    const selectedDate = new Date(calendarMonth);
    // Define o dia para o dia clicado
    selectedDate.setDate(day);

    // Formata a data para o input
    const formattedDate = selectedDate.toISOString().split("T")[0];

    // Atualiza a data de visualização da mesa apenas se for diferente
    if (tableViewDate !== formattedDate) {
      setTableViewDate(formattedDate);
    }

    // Se estiver adicionando uma nova reserva, atualiza o estado newReservation
    if (isAddReservationModalOpen) {
      setNewReservation((prev) => {
        // Verifica se a data já é a mesma para evitar atualizações desnecessárias
        if (prev.date && prev.date.getTime() === selectedDate.getTime()) {
          return prev;
        }
        return {
          ...prev,
          date: selectedDate,
        };
      });
    }
  };

  // Adicione a função de salvar edição
  const salvarEdicaoItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemEditando) {
      setMenu((prevMenu) =>
        prevMenu.map((item) =>
          item.id === itemEditando.id ? itemEditando : item
        )
      );
      setModalEditarAberto(false);
      setItemEditando(null);
      alert("Item atualizado com sucesso!");
    }
  };

  // Add at the top of component
  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Add useEffect to keep orders in sync
  useEffect(() => {
    const loadOrders = () => {
      const savedOrders = localStorage.getItem("orders");
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    };

    loadOrders();
    window.addEventListener("storage", loadOrders);

    return () => window.removeEventListener("storage", loadOrders);
  }, []);

  // Replace getPedidosFiltrados with this
  const getPedidosFiltrados = () => {
    const hoje = new Date();
    return orders.filter((order) => {
      const dataPedido = new Date(Number(order.id));
      switch (periodoSelecionado) {
        case "dia":
          return dataPedido.toDateString() === hoje.toDateString();
        case "semana":
          const umaSemanaAtras = new Date(hoje.setDate(hoje.getDate() - 7));
          return dataPedido >= umaSemanaAtras;
        case "mes":
          return (
            dataPedido.getMonth() === hoje.getMonth() &&
            dataPedido.getFullYear() === hoje.getFullYear()
          );
        default:
          return true;
      }
    });
  };

  // Funções para filtrar pedidos por período
  const getPedidosDoDia = (pedidos: Order[]) => {
    const hoje = new Date().setHours(0, 0, 0, 0);
    return pedidos.filter(
      (pedido) => new Date(pedido.id).setHours(0, 0, 0, 0) === hoje
    );
  };

  const getPedidosDaSemana = (pedidos: Order[]) => {
    const hoje = new Date();
    const inicioSemana = new Date(hoje.setDate(hoje.getDate() - hoje.getDay()));
    return pedidos.filter((pedido) => new Date(pedido.id) >= inicioSemana);
  };

  const getPedidosDoMes = (pedidos: Order[]) => {
    const hoje = new Date();
    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    return pedidos.filter((pedido) => new Date(pedido.id) >= inicioMes);
  };

  // Adicione o estado para controlar o período
  const [periodoSelecionado, setPeriodoSelecionado] = useState<
    "dia" | "semana" | "mes"
  >("dia");

  const formatKwanza = (value: number): string => {
    return value.toLocaleString("pt-AO") + " Kz";
  };

  // Adicione estas funções na classe AdminDashboard
  const handleOrderStatusChange = (id: string, status: string) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? { ...order, status: status as Order["status"] }
          : order
      )
    );
  };

  const handleEditOrder = (order: Order) => {
    // Implementar lógica para editar pedido
    console.log("Editar pedido:", order);
    // Aqui você pode abrir um modal de edição ou navegar para uma página de edição
  };

  const handleDeleteOrder = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este pedido?")) {
      setOrders(orders.filter((order) => order.id !== id));
    }
  };

  const [ingredienteTemp, setIngredienteTemp] = useState<string>("");

  // Adicione apenas os novos estados que não existem ainda
  const [isAddReservationModalOpen, setIsAddReservationModalOpen] =
    useState(false);
  const [editingReservation, setEditingReservation] =
    useState<Reservation | null>(null);
  const [newReservation, setNewReservation] = useState<Partial<Reservation>>({
    customerName: "",
    date: new Date(),
    time: "",
    guests: 2,
    status: "pending",
    contactPhone: "",
    notes: "",
  });

  // Estados para visualização de mesas
  const [isTableViewOpen, setIsTableViewOpen] = useState(false);
  const [tableViewDate, setTableViewDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [tableViewPeriod, setTableViewPeriod] = useState("Todos Horários");

  // Função para resetar o formulário de nova reserva
  const resetNewReservation = () => {
    setNewReservation({
      customerName: "",
      date: new Date(),
      time: "",
      guests: 2,
      status: "pending",
      contactPhone: "",
      notes: "",
    });
  };

  // Função para lidar com mudança de status da reserva
  const handleReservationStatusChange = (
    id: string,
    status: Reservation["status"]
  ) => {
    setReservations(
      reservations.map((res) => (res.id === id ? { ...res, status } : res))
    );
  };

  // Função para editar uma reserva
  const handleEditReservation = (reservation: Reservation) => {
    setEditingReservation(reservation);
    setNewReservation({ ...reservation });
    setIsAddReservationModalOpen(true);
  };

  // Função para excluir uma reserva
  const handleDeleteReservation = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta reserva?")) {
      setReservations(reservations.filter((res) => res.id !== id));
    }
  };

  // Função para salvar uma nova reserva ou atualizar uma existente
  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingReservation) {
      // Atualizar reserva existente
      setReservations(
        reservations.map((res) =>
          res.id === editingReservation.id
            ? ({ ...res, ...newReservation, id: res.id } as Reservation)
            : res
        )
      );
    } else {
      // Adicionar nova reserva
      const id = (reservations.length + 1).toString();
      setReservations([
        ...reservations,
        {
          ...newReservation,
          id,
          status: newReservation.status || "pending",
        } as Reservation,
      ]);
    }

    setIsAddReservationModalOpen(false);
    setEditingReservation(null);
    resetNewReservation();
  };

  // Adicione este estado para controlar o mês exibido no calendári

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Painel Administrativo</h1>
      {renderDashboardHeader()}

      <Tabs.Root defaultValue="menu" className="space-y-4">
        <Tabs.List className="flex flex-wrap gap-6 p-2 rounded-lg bg-gray-200">
          <Tabs.Trigger
            value="menu"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
          >
            <Utensils size={16} />
            Cardápio
          </Tabs.Trigger>
          <Tabs.Trigger
            value="orders"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
          >
            <ShoppingBag size={16} />
            Pedidos
          </Tabs.Trigger>
          <Tabs.Trigger
            value="reservations"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
          >
            <Calendar size={16} />
            Reservas
          </Tabs.Trigger>
          <Tabs.Trigger
            value="stock"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
          >
            <Package size={16} />
            Estoque
          </Tabs.Trigger>
          <Tabs.Trigger
            value="employees"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
          >
            <Users size={16} />
            Funcionários
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="menu">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Gerenciar Cardápio</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Filtros específicos para o cardápio */}
              <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-[200px]">
                  <input
                    type="text"
                    placeholder="Pesquisar por nome ou categoria..."
                    className="w-full p-2 border rounded-md"
                    value={filters.searchTerm}
                    onChange={(e) =>
                      setFilters({ ...filters, searchTerm: e.target.value })
                    }
                  />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <select
                    className="w-full p-2 border rounded-md"
                    value={filters.category || "all"}
                    onChange={(e) =>
                      setFilters({ ...filters, category: e.target.value })
                    }
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="main">Pratos Principais</option>
                    <option value="side">Acompanhamentos</option>
                    <option value="dessert">Sobremesas</option>
                    <option value="drink">Bebidas</option>
                  </select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <select
                    className="w-full p-2 border rounded-md"
                    value={filters.status}
                    onChange={(e) =>
                      setFilters({ ...filters, status: e.target.value })
                    }
                  >
                    <option value="all">Todos Status</option>
                    <option value="available">Disponíveis</option>
                    <option value="unavailable">Indisponíveis</option>
                  </select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <button
                    onClick={adicionarNovoItem}
                    className="w-full flex items-center justify-center gap-2 bg-amber-600 text-white p-2 rounded-md hover:bg-amber-700"
                  >
                    <Plus size={16} />
                    Novo Item
                  </button>
                </div>
              </div>

              {/* Resumo do cardápio filtrado */}
              {(() => {
                // Aplicar filtros aos itens do menu
                const filteredMenu = menu.filter((item) => {
                  // Filtro por categoria
                  const matchesCategory =
                    !filters.category || filters.category === "all"
                      ? true
                      : item.category === filters.category;

                  // Filtro por status
                  const matchesStatus =
                    filters.status === "all"
                      ? true
                      : filters.status === "available"
                      ? item.available === true
                      : item.available === false;

                  // Filtro por termo de busca
                  const searchLower = filters.searchTerm.toLowerCase();
                  const matchesSearch =
                    filters.searchTerm === ""
                      ? true
                      : (item.name &&
                          item.name.toLowerCase().includes(searchLower)) ||
                        (item.category &&
                          item.category.toLowerCase().includes(searchLower)) ||
                        (item.description &&
                          item.description.toLowerCase().includes(searchLower));

                  return matchesCategory && matchesStatus && matchesSearch;
                });

                // Calcular estatísticas do cardápio filtrado
                const totalItems = filteredMenu.length;
                const availableItems = filteredMenu.filter(
                  (item) => item.available
                ).length;
                const totalValue = filteredMenu.reduce(
                  (sum, item) => sum + item.price,
                  0
                );

                // Encontrar o prato mais popular (baseado em ratings como exemplo)
                const mostPopularItem = [...filteredMenu].sort(
                  (a, b) => (b.ratings || 0) - (a.ratings || 0)
                )[0];

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500">
                              Total de Itens
                            </p>
                            <p className="text-2xl font-bold">{totalItems}</p>
                          </div>
                          <Utensils className="h-8 w-8 text-amber-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500">
                              Itens Disponíveis
                            </p>
                            <p className="text-2xl font-bold">
                              {availableItems}
                            </p>
                          </div>
                          <ShoppingBag className="h-8 w-8 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500">
                              Valor Total do Cardápio
                            </p>
                            <p className="text-2xl font-bold">
                              {formatCurrency(totalValue)}
                            </p>
                          </div>
                          <DollarSign className="h-8 w-8 text-blue-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500">
                              Prato Mais Popular
                            </p>
                            {mostPopularItem ? (
                              <div>
                                <p className="text-lg font-bold">
                                  {mostPopularItem.name}
                                </p>
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="ml-1 text-sm">
                                    {(mostPopularItem.ratings || 0).toFixed(1)}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <p className="text-lg font-bold">Nenhum item</p>
                            )}
                          </div>
                          <Star className="h-8 w-8 text-yellow-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })()}

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Imagem</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Tempo Preparo</TableHead>
                    <TableHead>Avaliação</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(() => {
                    // Aplicar os mesmos filtros para a tabela
                    const filteredMenu = menu.filter((item) => {
                      // Filtro por categoria
                      const matchesCategory =
                        !filters.category || filters.category === "all"
                          ? true
                          : item.category === filters.category;

                      // Filtro por status
                      const matchesStatus =
                        filters.status === "all"
                          ? true
                          : filters.status === "available"
                          ? item.available === true
                          : item.available === false;

                      // Filtro por termo de busca
                      const searchLower = filters.searchTerm.toLowerCase();
                      const matchesSearch =
                        filters.searchTerm === ""
                          ? true
                          : (item.name &&
                              item.name.toLowerCase().includes(searchLower)) ||
                            (item.category &&
                              item.category
                                .toLowerCase()
                                .includes(searchLower)) ||
                            (item.description &&
                              item.description
                                .toLowerCase()
                                .includes(searchLower));

                      return matchesCategory && matchesStatus && matchesSearch;
                    });

                    return filteredMenu.length > 0 ? (
                      filteredMenu.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <img
                              src={item.imageUrl || "/placeholder-food.jpg"}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-md"
                            />
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-gray-500">
                                {item.description}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{formatCurrency(item.price)}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                              {item.category}
                            </span>
                          </TableCell>
                          <TableCell>{item.preparationTime} min</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="ml-1">
                                {(item.ratings || 0).toFixed(1)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <select
                              className="border rounded-md p-1 bg-white"
                              value={
                                item.available ? "disponivel" : "indisponivel"
                              }
                              onChange={(e) =>
                                handleItemAvailability(
                                  item.id,
                                  e.target.value === "disponivel"
                                )
                              }
                            >
                              <option value="disponivel">Disponível</option>
                              <option value="indisponivel">Indisponível</option>
                            </select>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <button
                                onClick={() => iniciarEdicao(item)}
                                className="text-amber-600 hover:text-amber-800 transition-colors"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteMenuItem(item.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="text-center py-4 text-gray-500"
                        >
                          Nenhum item encontrado com os filtros selecionados
                        </TableCell>
                      </TableRow>
                    );
                  })()}
                </TableBody>
              </Table>

              {/* Modal de adicionar/editar item */}
              {modalAberto && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto py-4">
                <div className="bg-white p-6 rounded-lg w-[600px] max-h-[90vh] overflow-y-auto relative">
                  <div className="sticky top-0 bg-white pb-4 border-b mb-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Adicionar Novo Item</h2>
                  </div>
          
                  <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block mb-1">Imagem do Prato</label>
                        <div className="flex items-center space-x-4">
                          <img
                            src={novoItem.imageUrl || "/placeholder-food.jpg"}
                            alt="Preview"
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setNovoItem({
                                    ...novoItem,
                                    imageUrl: reader.result as string,
                                  });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block mb-1">Nome</label>
                        <input
                          type="text"
                          value={novoItem.name}
                          onChange={(e) =>
                            setNovoItem({ ...novoItem, name: e.target.value })
                          }
                          className="w-full border rounded p-2"
                          required
                        />
                      </div>

                      <div>
                        <label className="block mb-1">Preço (Kz)</label>
                        <input
                          type="text"
                          value={novoItem.price}
                          onChange={(e) => {
                            // Permitir apenas números e ponto decimal
                            const value = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            setNovoItem({
                              ...novoItem,
                              price: value === "" ? 0 : Number(value),
                            });
                          }}
                          className="w-full border rounded p-2"
                          required
                          placeholder="Ex: 5000"
                        />
                      </div>

                      <div>
                        <label className="block mb-1">Categoria</label>
                        <select
                          value={novoItem.category}
                          onChange={(e) =>
                            setNovoItem({
                              ...novoItem,
                              category: e.target.value,
                            })
                          }
                          className="w-full border rounded p-2"
                          required
                        >
                          <option value="">Selecione uma categoria</option>
                          <option value="main">Pratos Principais</option>
                          <option value="side">Acompanhamentos</option>
                          <option value="dessert">Sobremesas</option>
                          <option value="drink">Bebidas</option>
                        </select>
                      </div>

                      <div>
                        <label className="block mb-1">
                          Tempo de Preparo (min)
                        </label>
                        <input
                          type="text"
                          value={novoItem.preparationTime || ""}
                          onChange={(e) => {
                            // Permitir apenas números
                            const value = e.target.value.replace(/[^0-9]/g, "");
                            setNovoItem({
                              ...novoItem,
                              preparationTime: value === "" ? 0 : Number(value),
                            });
                          }}
                          className="w-full border rounded p-2"
                          placeholder="Ex: 30"
                        />
                      </div>

                      <div>
                        <label className="block mb-1">Descrição</label>
                        <textarea
                          value={novoItem.description}
                          onChange={(e) =>
                            setNovoItem({
                              ...novoItem,
                              description: e.target.value,
                            })
                          }
                          className="w-full border rounded p-2 h-24"
                          required
                        />
                      </div>

                      <div>
                        <label className="block mb-1">
                          Ingredientes (opcional)
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {(novoItem.ingredients || []).map((ing, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-100 px-2 py-1 rounded-full text-sm flex items-center"
                            >
                              {ing}
                              <button
                                type="button"
                                className="ml-2 text-red-500"
                                onClick={() => {
                                  const newIngredients = [
                                    ...novoItem.ingredients,
                                  ];
                                  newIngredients.splice(idx, 1);
                                  setNovoItem({
                                    ...novoItem,
                                    ingredients: newIngredients,
                                  });
                                }}
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={ingredienteTemp || ""}
                            onChange={(e) => setIngredienteTemp(e.target.value)}
                            className="flex-1 border rounded p-2"
                            placeholder="Adicionar ingrediente"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (
                                ingredienteTemp &&
                                ingredienteTemp.trim() !== ""
                              ) {
                                setNovoItem({
                                  ...novoItem,
                                  ingredients: [
                                    ...(novoItem.ingredients || []),
                                    ingredienteTemp.trim(),
                                  ],
                                });
                                setIngredienteTemp("");
                              }
                            }}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            Adicionar
                          </button>
                        </div>
                      </div>

                      <div className="sticky bottom-0 bg-white pt-4 border-t mt-6 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={onclose}
                          className="px-4 py-2 border rounded hover:bg-gray-100"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
                        >
                          {-.id ? "Salvar Alterações" : "Adicionar Item"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Modal de edição */}
              {modalEditarAberto && itemEditando && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg w-[600px]">
                    <h2 className="text-xl font-bold mb-4">
                      Editar Item do Cardápio
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block mb-1">Imagem do Prato</label>
                        <div className="flex items-center space-x-4">
                          <img
                            src={
                              itemEditando.imageUrl || "/placeholder-food.jpg"
                            }
                            alt="Preview"
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setItemEditando({
                                    ...itemEditando,
                                    imageUrl: reader.result as string,
                                  });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block mb-1">Nome</label>
                        <input
                          type="text"
                          value={itemEditando.name}
                          onChange={(e) =>
                            setItemEditando({
                              ...itemEditando,
                              name: e.target.value,
                            })
                          }
                          className="w-full border rounded p-2"
                          required
                        />
                      </div>

                      <div>
                        <label className="block mb-1">Preço (Kz)</label>
                        <input
                          type="text"
                          value={itemEditando.price}
                          onChange={(e) => {
                            // Permitir apenas números e ponto decimal
                            const value = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            setItemEditando({
                              ...itemEditando,
                              price: value === "" ? 0 : Number(value),
                            });
                          }}
                          className="w-full border rounded p-2"
                          required
                          placeholder="Ex: 5000"
                        />
                      </div>

                      <div>
                        <label className="block mb-1">Categoria</label>
                        <select
                          value={itemEditando.category}
                          onChange={(e) =>
                            setItemEditando({
                              ...itemEditando,
                              category: e.target.value,
                            })
                          }
                          className="w-full border rounded p-2"
                          required
                        >
                          <option value="">Selecione uma categoria</option>
                          <option value="Carnes">Carnes</option>
                          <option value="Peixes">Peixes</option>
                          <option value="Sobremesas">Sobremesas</option>
                          <option value="Bebidas">Bebidas</option>
                        </select>
                      </div>

                      <div>
                        <label className="block mb-1">
                          Tempo de Preparo (min)
                        </label>
                        <input
                          type="text"
                          value={itemEditando.preparationTime || ""}
                          onChange={(e) => {
                            // Permitir apenas números
                            const value = e.target.value.replace(/[^0-9]/g, "");
                            setItemEditando({
                              ...itemEditando,
                              preparationTime: value === "" ? 0 : Number(value),
                            });
                          }}
                          className="w-full border rounded p-2"
                          placeholder="Ex: 30"
                        />
                      </div>

                      <div>
                        <label className="block mb-1">Descrição</label>
                        <textarea
                          value={itemEditando.description}
                          onChange={(e) =>
                            setItemEditando({
                              ...itemEditando,
                              description: e.target.value,
                            })
                          }
                          className="w-full border rounded p-2 h-24"
                          required
                        />
                      </div>

                      <div>
                        <label className="block mb-1">
                          Ingredientes (opcional)
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {(itemEditando.ingredients || []).map((ing, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-100 px-2 py-1 rounded-full text-sm flex items-center"
                            >
                              {ing}
                              <button
                                type="button"
                                className="ml-2 text-red-500"
                                onClick={() => {
                                  const newIngredients = [
                                    ...itemEditando.ingredients,
                                  ];
                                  newIngredients.splice(idx, 1);
                                  setItemEditando({
                                    ...itemEditando,
                                    ingredients: newIngredients,
                                  });
                                }}
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={ingredienteTemp || ""}
                            onChange={(e) => setIngredienteTemp(e.target.value)}
                            className="flex-1 border rounded p-2"
                            placeholder="Adicionar ingrediente"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (
                                ingredienteTemp &&
                                ingredienteTemp.trim() !== ""
                              ) {
                                setItemEditando({
                                  ...itemEditando,
                                  ingredients: [
                                    ...(itemEditando.ingredients || []),
                                    ingredienteTemp.trim(),
                                  ],
                                });
                                setIngredienteTemp("");
                              }
                            }}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            Adicionar
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 mt-6">
                        <button
                          type="button"
                          onClick={() => setModalEditarAberto(false)}
                          className="px-4 py-2 border rounded hover:bg-gray-100"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          onClick={salvarEdicaoItem}
                          className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
                        >
                          Salvar Alterações
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="employees">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Gerenciar Funcionários</CardTitle>
              <button
                onClick={() => setIsAddEmployeeModal(true)}
                className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700"
              >
                <Plus size={16} />
                Novo Funcionário
              </button>
            </CardHeader>
            <CardContent>
              <TableFilters filters={filters} onFilterChange={setFilters} />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data Contratação</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.role}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            employee.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {employee.status === "active" ? "Ativo" : "Inativo"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {new Date(employee.hireDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-amber-600 h-2 rounded-full"
                              style={{ width: `${employee.performance}%` }}
                            />
                          </div>
                          <span className="ml-2">{employee.performance}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <button className="text-amber-600 hover:text-amber-800">
                            <Edit size={16} />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="orders">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Gerenciar Pedidos</CardTitle>
                {/* Botão de novo pedido removido conforme solicitado */}
              </div>
            </CardHeader>
            <CardContent>
              {/* Filtros específicos para pedidos */}
              <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-[200px]">
                  <input
                    type="text"
                    placeholder="Pesquisar por mesa ou item..."
                    className="w-full p-2 border rounded-md"
                    value={filters.searchTerm}
                    onChange={(e) =>
                      setFilters({ ...filters, searchTerm: e.target.value })
                    }
                  />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <select
                    className="w-full p-2 border rounded-md"
                    value={filters.dateRange}
                    onChange={(e) =>
                      setFilters({ ...filters, dateRange: e.target.value })
                    }
                  >
                    <option value="today">Hoje</option>
                    <option value="week">Esta Semana</option>
                    <option value="month">Este Mês</option>
                    <option value="all">Todo Período</option>
                  </select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <select
                    className="w-full p-2 border rounded-md"
                    value={filters.status}
                    onChange={(e) =>
                      setFilters({ ...filters, status: e.target.value })
                    }
                  >
                    <option value="all">Todos Status</option>
                    <option value="pending">Pendentes</option>
                    <option value="delivered">Entregues</option>
                  </select>
                </div>
              </div>

              {/* Resumo de pedidos filtrados */}
              {(() => {
                // Aplicar filtros aos pedidos
                const filteredOrders = orders.filter((order) => {
                  // Filtro por data
                  const orderDate = new Date(Number(order.id));
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);

                  const isInDateRange =
                    filters.dateRange === "all"
                      ? true
                      : filters.dateRange === "today"
                      ? orderDate.toDateString() === today.toDateString()
                      : filters.dateRange === "week"
                      ? orderDate >=
                        new Date(today.setDate(today.getDate() - 7))
                      : // month
                        orderDate >=
                        new Date(today.getFullYear(), today.getMonth(), 1);

                  // Filtro por status
                  const matchesStatus =
                    filters.status === "all"
                      ? true
                      : order.status === filters.status;

                  // Filtro por termo de busca - COM VERIFICAÇÕES PARA EVITAR ERROS
                  const searchLower = filters.searchTerm.toLowerCase();
                  const matchesSearch =
                    filters.searchTerm === ""
                      ? true
                      : (order.tableNumber &&
                          order.tableNumber
                            .toString()
                            .toLowerCase()
                            .includes(searchLower)) ||
                        (order.item &&
                          order.item.name &&
                          order.item.name.toLowerCase().includes(searchLower));

                  return isInDateRange && matchesStatus && matchesSearch;
                });

                // Calcular valor total dos pedidos filtrados
                const totalValue = filteredOrders.reduce(
                  (sum, order) => sum + (order.total || 0),
                  0
                );

                return (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500">
                              Pedidos{" "}
                              {filters.dateRange === "today"
                                ? "de Hoje"
                                : filters.dateRange === "week"
                                ? "da Semana"
                                : filters.dateRange === "month"
                                ? "do Mês"
                                : "Totais"}
                            </p>
                            <p className="text-2xl font-bold">
                              {filteredOrders.length}
                            </p>
                          </div>
                          <ShoppingBag className="h-8 w-8 text-amber-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500">
                              Valor{" "}
                              {filters.dateRange === "today"
                                ? "de Hoje"
                                : filters.dateRange === "week"
                                ? "da Semana"
                                : filters.dateRange === "month"
                                ? "do Mês"
                                : "Total"}
                            </p>
                            <p className="text-2xl font-bold">
                              {formatCurrency(totalValue)}
                            </p>
                          </div>
                          <DollarSign className="h-8 w-8 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })()}

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mesa</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(() => {
                    // Aplicar os mesmos filtros para a tabela
                    const filteredOrders = orders.filter((order) => {
                      // Filtro por data
                      const orderDate = new Date(Number(order.id));
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);

                      const isInDateRange =
                        filters.dateRange === "all"
                          ? true
                          : filters.dateRange === "today"
                          ? orderDate.toDateString() === today.toDateString()
                          : filters.dateRange === "week"
                          ? orderDate >=
                            new Date(today.setDate(today.getDate() - 7))
                          : // month
                            orderDate >=
                            new Date(today.getFullYear(), today.getMonth(), 1);

                      // Filtro por status
                      const matchesStatus =
                        filters.status === "all"
                          ? true
                          : order.status === filters.status;

                      // Filtro por termo de busca - COM VERIFICAÇÕES PARA EVITAR ERROS
                      const searchLower = filters.searchTerm.toLowerCase();
                      const matchesSearch =
                        filters.searchTerm === ""
                          ? true
                          : (order.tableNumber &&
                              order.tableNumber
                                .toString()
                                .toLowerCase()
                                .includes(searchLower)) ||
                            (order.item &&
                              order.item.name &&
                              order.item.name
                                .toLowerCase()
                                .includes(searchLower));

                      return isInDateRange && matchesStatus && matchesSearch;
                    });

                    return filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{order.tableNumber}</TableCell>
                          <TableCell>{order.item?.name || "N/A"}</TableCell>
                          <TableCell>{order.quantity}</TableCell>
                          <TableCell>{formatCurrency(order.total)}</TableCell>
                          <TableCell>
                            <select
                              className="border rounded p-1"
                              value={order.status}
                              onChange={(e) =>
                                handleOrderStatusChange(
                                  order.id,
                                  e.target.value
                                )
                              }
                            >
                              <option value="pending">Pendente</option>
                              <option value="delivered">Entregue</option>
                            </select>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditOrder(order)}
                                className="text-amber-600 hover:text-amber-800 transition-colors"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteOrder(order.id)}
                                className="text-red-600 hover:text-red-800 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-4 text-gray-500"
                        >
                          Nenhum pedido encontrado com os filtros selecionados
                        </TableCell>
                      </TableRow>
                    );
                  })()}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="reservations">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Gerenciar Reservas</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Filtros específicos para reservas */}
              <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-[200px]">
                  <input
                    type="text"
                    placeholder="Pesquisar por cliente..."
                    className="w-full p-2 border rounded-md"
                    value={filters.searchTerm}
                    onChange={(e) =>
                      setFilters({ ...filters, searchTerm: e.target.value })
                    }
                  />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <input
                    type="date"
                    className="w-full p-2 border rounded-md"
                    value={filters.date || ""}
                    onChange={(e) =>
                      setFilters({ ...filters, date: e.target.value })
                    }
                  />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <select
                    className="w-full p-2 border rounded-md"
                    value={filters.status}
                    onChange={(e) =>
                      setFilters({ ...filters, status: e.target.value })
                    }
                  >
                    <option value="all">Todos Status</option>
                    <option value="confirmed">Confirmadas</option>
                    <option value="pending">Pendentes</option>
                    <option value="cancelled">Canceladas</option>
                    <option value="completed">Concluídas</option>
                  </select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <button
                    onClick={() => setIsAddReservationModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 bg-amber-600 text-white p-2 rounded-md hover:bg-amber-700"
                  >
                    <Plus size={16} />
                    Nova Reserva
                  </button>
                </div>
              </div>
              {/* Visão geral das reservas */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">
                  Visão Geral das Reservas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Reservas Hoje</p>
                          <p className="text-2xl font-bold">
                            {
                              reservations.filter(
                                (r) =>
                                  new Date(r.date).toDateString() ===
                                  new Date().toDateString()
                              ).length
                            }
                          </p>
                        </div>
                        <Calendar className="h-8 w-8 text-amber-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">
                            Total de Convidados
                          </p>
                          <p className="text-2xl font-bold">
                            {reservations.reduce((sum, r) => sum + r.guests, 0)}
                          </p>
                        </div>
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">
                            Taxa de Ocupação
                          </p>
                          <p className="text-2xl font-bold">
                            {Math.min(
                              Math.round(
                                (reservations
                                  .filter(
                                    (r) =>
                                      new Date(r.date).toDateString() ===
                                        new Date().toDateString() &&
                                      r.status !== "cancelled"
                                  )
                                  .reduce((sum, r) => sum + r.guests, 0) /
                                  120) *
                                  100
                              ),
                              100
                            )}
                            %
                          </p>
                        </div>
                        <div className="h-8 w-8 flex items-center justify-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-amber-600 h-2.5 rounded-full"
                              style={{
                                width: `${Math.min(
                                  Math.round(
                                    (reservations
                                      .filter(
                                        (r) =>
                                          new Date(r.date).toDateString() ===
                                            new Date().toDateString() &&
                                          r.status !== "cancelled"
                                      )
                                      .reduce((sum, r) => sum + r.guests, 0) /
                                      120) *
                                      100
                                  ),
                                  100
                                )}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">
                            Horário Mais Popular
                          </p>
                          <p className="text-2xl font-bold">
                            {(() => {
                              const timeCount = {};
                              reservations.forEach((r) => {
                                timeCount[r.time] =
                                  (timeCount[r.time] || 0) + 1;
                              });
                              const mostPopularTime = Object.entries(
                                timeCount
                              ).sort((a, b) => b[1] - a[1])[0];
                              return mostPopularTime
                                ? mostPopularTime[0]
                                : "N/A";
                            })()}
                          </p>
                        </div>
                        <Clock className="h-8 w-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              {/* Calendário de reservas */}
              // ... código existente ...
              {/* Calendário de reservas */}
              <div className="mb-8 bg-white rounded-lg border p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    Calendário de Reservas
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        const currentDate = new Date(calendarMonth);
                        const newDate = new Date(
                          currentDate.setMonth(currentDate.getMonth() - 1)
                        );
                        setCalendarMonth(
                          newDate.toISOString().split("T")[0].substring(0, 7) +
                            "-01"
                        );
                      }}
                      className="p-1 rounded-full hover:bg-gray-100"
                      title="Mês anterior"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className="font-medium">
                      {new Date(calendarMonth).toLocaleDateString("pt-BR", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <button
                      onClick={() => {
                        const currentDate = new Date(calendarMonth);
                        const newDate = new Date(
                          currentDate.setMonth(currentDate.getMonth() + 1)
                        );
                        setCalendarMonth(
                          newDate.toISOString().split("T")[0].substring(0, 7) +
                            "-01"
                        );
                      }}
                      className="p-1 rounded-full hover:bg-gray-100"
                      title="Próximo mês"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(
                    (day) => (
                      <div key={day} className="text-center p-2 font-medium">
                        {day}
                      </div>
                    )
                  )}

                  {(() => {
                    // Usar a data do estado calendarMonth em vez de today
                    const calendarDate = new Date(calendarMonth);
                    const year = calendarDate.getFullYear();
                    const month = calendarDate.getMonth();

                    const firstDay = new Date(year, month, 1);
                    const lastDay = new Date(year, month + 1, 0);

                    // Calcular dias do mês anterior para preencher o início do calendário
                    const daysFromPrevMonth = firstDay.getDay();
                    const prevMonthDays = [];

                    if (daysFromPrevMonth > 0) {
                      const prevMonth = month === 0 ? 11 : month - 1;
                      const prevMonthYear = month === 0 ? year - 1 : year;
                      const prevMonthLastDay = new Date(
                        prevMonthYear,
                        prevMonth + 1,
                        0
                      ).getDate();

                      for (let i = 0; i < daysFromPrevMonth; i++) {
                        const dayNumber =
                          prevMonthLastDay - daysFromPrevMonth + i + 1;
                        const prevMonthDate = new Date(
                          prevMonthYear,
                          prevMonth,
                          dayNumber
                        );
                        const dateString = prevMonthDate
                          .toISOString()
                          .split("T")[0];

                        prevMonthDays.push(
                          <div
                            key={`prev-${i}`}
                            className="text-center p-2 text-gray-400 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              // Criar uma nova data com o dia exato selecionado
                              const selectedDate = new Date(
                                prevMonthYear,
                                prevMonth,
                                dayNumber
                              );
                              // Garantir que a data esteja no formato correto YYYY-MM-DD
                              const exactDate = selectedDate
                                .toISOString()
                                .split("T")[0];

                              setFilters({ ...filters, date: exactDate });
                              setTableViewDate(exactDate);

                              // Se estiver adicionando uma nova reserva, atualiza o estado newReservation
                              if (isAddReservationModalOpen) {
                                setNewReservation({
                                  ...newReservation,
                                  date: selectedDate,
                                });
                              }
                            }}
                          >
                            {dayNumber}
                          </div>
                        );
                      }
                    }

                    // Dias do mês atual
                    const currentMonthDays = [];
                    for (let i = 1; i <= lastDay.getDate(); i++) {
                      // Criar a data com hora zerada para evitar problemas de fuso horário
                      const date = new Date(year, month, i);
                      // Formatar como YYYY-MM-DD
                      const dateString = date.toISOString().split("T")[0];

                      // Contar reservas para este dia
                      const dayReservations = reservations.filter((r) => {
                        const reservationDate = new Date(r.date);
                        return (
                          reservationDate.getFullYear() ===
                            date.getFullYear() &&
                          reservationDate.getMonth() === date.getMonth() &&
                          reservationDate.getDate() === date.getDate() &&
                          r.status !== "cancelled"
                        );
                      });

                      const today = new Date();
                      const isToday =
                        date.getDate() === today.getDate() &&
                        date.getMonth() === today.getMonth() &&
                        date.getFullYear() === today.getFullYear();

                      const isSelected = dateString === filters.date;

                      currentMonthDays.push(
                        <div
                          key={`current-${i}`}
                          className={`text-center p-2 rounded-lg border ${
                            isSelected
                              ? "bg-amber-600 text-white"
                              : isToday
                              ? "bg-amber-100 border-amber-300"
                              : "hover:bg-gray-100"
                          } cursor-pointer transition-colors`}
                          onClick={() => {
                            // Criar uma nova data com o dia exato selecionado
                            const selectedDate = new Date(year, month, i);
                            // Garantir que a data esteja no formato correto YYYY-MM-DD
                            const exactDate = selectedDate
                              .toISOString()
                              .split("T")[0];

                            setFilters({ ...filters, date: exactDate });
                            setTableViewDate(exactDate);

                            // Se estiver adicionando uma nova reserva, atualiza o estado newReservation
                            if (isAddReservationModalOpen) {
                              setNewReservation({
                                ...newReservation,
                                date: selectedDate,
                              });
                            }
                          }}
                        >
                          <div className="font-medium">{i}</div>
                          {dayReservations.length > 0 && (
                            <div className="mt-1 text-xs">
                              <span
                                className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${
                                  isSelected
                                    ? "bg-white text-amber-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {dayReservations.length}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    }

                    // Dias do próximo mês para preencher o final do calendário
                    const totalDaysShown =
                      prevMonthDays.length + currentMonthDays.length;
                    const daysFromNextMonth =
                      totalDaysShown % 7 === 0 ? 0 : 7 - (totalDaysShown % 7);
                    const nextMonthDays = [];

                    if (daysFromNextMonth > 0) {
                      const nextMonth = month === 11 ? 0 : month + 1;
                      const nextMonthYear = month === 11 ? year + 1 : year;

                      for (let i = 1; i <= daysFromNextMonth; i++) {
                        const nextMonthDate = new Date(
                          nextMonthYear,
                          nextMonth,
                          i
                        );
                        const dateString = nextMonthDate
                          .toISOString()
                          .split("T")[0];

                        nextMonthDays.push(
                          <div
                            key={`next-${i}`}
                            className="text-center p-2 text-gray-400 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              // Criar uma nova data com o dia exato selecionado
                              const selectedDate = new Date(
                                nextMonthYear,
                                nextMonth,
                                i
                              );
                              // Garantir que a data esteja no formato correto YYYY-MM-DD
                              const exactDate = selectedDate
                                .toISOString()
                                .split("T")[0];

                              setFilters({ ...filters, date: exactDate });
                              setTableViewDate(exactDate);

                              // Se estiver adicionando uma nova reserva, atualiza o estado newReservation
                              if (isAddReservationModalOpen) {
                                setNewReservation({
                                  ...newReservation,
                                  date: selectedDate,
                                });
                              }
                            }}
                          >
                            {i}
                          </div>
                        );
                      }
                    }

                    return [
                      ...prevMonthDays,
                      ...currentMonthDays,
                      ...nextMonthDays,
                    ];
                  })()}
                </div>
              </div>
              {/* Tabela de reservas */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Pessoas</TableHead>
                    <TableHead>Mesa</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(() => {
                    // Aplicar filtros às reservas
                    const filteredReservations = reservations.filter(
                      (reservation) => {
                        // Filtro por data
                        const dateMatches =
                          !filters.date ||
                          new Date(reservation.date)
                            .toISOString()
                            .split("T")[0] === filters.date;

                        // Filtro por status
                        const statusMatches =
                          filters.status === "all"
                            ? true
                            : reservation.status === filters.status;

                        // Filtro por termo de busca
                        const searchLower = filters.searchTerm.toLowerCase();
                        const searchMatches =
                          filters.searchTerm === ""
                            ? true
                            : reservation.customerName &&
                              reservation.customerName
                                .toLowerCase()
                                .includes(searchLower);

                        return dateMatches && statusMatches && searchMatches;
                      }
                    );

                    return filteredReservations.length > 0 ? (
                      filteredReservations.map((reservation) => (
                        <TableRow key={reservation.id}>
                          <TableCell>
                            <div className="font-medium">
                              {reservation.customerName}
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(reservation.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{reservation.time}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1 text-gray-500" />
                              {reservation.guests}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                              {reservation.tableNumber || "A definir"}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {reservation.contactPhone || "N/A"}
                            </div>
                          </TableCell>
                          <TableCell>
                            <select
                              className={`border rounded p-1 text-sm ${
                                reservation.status === "confirmed"
                                  ? "bg-green-50 text-green-800"
                                  : reservation.status === "cancelled"
                                  ? "bg-red-50 text-red-800"
                                  : reservation.status === "completed"
                                  ? "bg-blue-50 text-blue-800"
                                  : "bg-amber-50 text-amber-800"
                              }`}
                              value={reservation.status}
                              onChange={(e) => {
                                handleReservationStatusChange(
                                  reservation.id,
                                  e.target.value as Reservation["status"]
                                );
                              }}
                            >
                              <option value="confirmed">Confirmada</option>
                              <option value="pending">Pendente</option>
                              <option value="cancelled">Cancelada</option>
                              <option value="completed">Concluída</option>
                            </select>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  handleEditReservation(reservation)
                                }
                                className="text-amber-600 hover:text-amber-800 transition-colors"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteReservation(reservation.id)
                                }
                                className="text-red-600 hover:text-red-800 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="text-center py-4 text-gray-500"
                        >
                          Nenhuma reserva encontrada com os filtros selecionados
                        </TableCell>
                      </TableRow>
                    );
                  })()}
                </TableBody>
              </Table>
              {/* Modal para adicionar nova reserva */}
              {isAddReservationModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg w-[600px]">
                    <h2 className="text-xl font-bold mb-4">
                      {editingReservation ? "Editar Reserva" : "Nova Reserva"}
                    </h2>
                    <form
                      onSubmit={handleReservationSubmit}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-1">Nome do Cliente</label>
                          <input
                            type="text"
                            value={newReservation.customerName}
                            onChange={(e) =>
                              setNewReservation({
                                ...newReservation,
                                customerName: e.target.value,
                              })
                            }
                            className="w-full border rounded p-2"
                            required
                          />
                        </div>
                        <div>
                          <label className="block mb-1">
                            Telefone de Contato
                          </label>
                          <input
                            type="tel"
                            value={newReservation.contactPhone || ""}
                            onChange={(e) =>
                              setNewReservation({
                                ...newReservation,
                                contactPhone: e.target.value,
                              })
                            }
                            className="w-full border rounded p-2"
                            placeholder="(00) 00000-0000"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-1">Data</label>
                          <input
                            type="date"
                            value={
                              newReservation.date instanceof Date
                                ? newReservation.date
                                    .toISOString()
                                    .split("T")[0]
                                : typeof newReservation.date === "string"
                                ? new Date(newReservation.date)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                            onChange={(e) => {
                              // Criar uma nova data a partir do valor do input
                              const selectedDate = new Date(e.target.value);
                              // Ajustar para o fuso horário local para evitar problemas de data
                              selectedDate.setMinutes(
                                selectedDate.getMinutes() +
                                  selectedDate.getTimezoneOffset()
                              );
                              setNewReservation({
                                ...newReservation,
                                date: selectedDate,
                              });
                            }}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full border rounded p-2"
                            required
                          />
                        </div>
                        <div>
                          <label className="block mb-1">Horário</label>
                          <select
                            value={newReservation.time}
                            onChange={(e) =>
                              setNewReservation({
                                ...newReservation,
                                time: e.target.value,
                              })
                            }
                            className="w-full border rounded p-2"
                            required
                          >
                            <option value="">Selecione um horário</option>
                            {[
                              "12:00",
                              "12:30",
                              "13:00",
                              "13:30",
                              "14:00",
                              "14:30",
                              "18:00",
                              "18:30",
                              "19:00",
                              "19:30",
                              "20:00",
                              "20:30",
                              "21:00",
                            ].map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-1">
                            Número de Pessoas
                          </label>
                          <input
                            type="number"
                            value={newReservation.guests}
                            onChange={(e) =>
                              setNewReservation({
                                ...newReservation,
                                guests: Number(e.target.value),
                              })
                            }
                            min="1"
                            max="20"
                            className="w-full border rounded p-2"
                            required
                          />
                        </div>
                        <div>
                          <label className="block mb-1">Mesa (opcional)</label>
                          <select
                            value={newReservation.tableNumber || ""}
                            onChange={(e) =>
                              setNewReservation({
                                ...newReservation,
                                tableNumber: e.target.value
                                  ? Number(e.target.value)
                                  : undefined,
                              })
                            }
                            className="w-full border rounded p-2"
                          >
                            <option value="">Atribuir automaticamente</option>
                            {Array.from({ length: 15 }, (_, i) => i + 1).map(
                              (num) => (
                                <option key={num} value={num}>
                                  Mesa {num}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block mb-1">Observações</label>
                        <textarea
                          value={newReservation.notes || ""}
                          onChange={(e) =>
                            setNewReservation({
                              ...newReservation,
                              notes: e.target.value,
                            })
                          }
                          className="w-full border rounded p-2 h-24"
                          placeholder="Preferências, ocasiões especiais, etc."
                        />
                      </div>

                      <div className="flex justify-between items-center mt-6">
                        <div>
                          {editingReservation && (
                            <button
                              type="button"
                              onClick={() =>
                                handleReservationStatusChange(
                                  editingReservation.id,
                                  editingReservation.status === "cancelled"
                                    ? "confirmed"
                                    : "cancelled"
                                )
                              }
                              className={`px-4 py-2 rounded mr-2 ${
                                editingReservation.status === "cancelled"
                                  ? "bg-green-600 text-white hover:bg-green-700"
                                  : "bg-red-600 text-white hover:bg-red-700"
                              }`}
                            >
                              {editingReservation.status === "cancelled"
                                ? "Reativar Reserva"
                                : "Cancelar Reserva"}
                            </button>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddReservationModalOpen(false);
                              setEditingReservation(null);
                              resetNewReservation();
                            }}
                            className="px-4 py-2 border rounded hover:bg-gray-100"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
                          >
                            {editingReservation
                              ? "Salvar Alterações"
                              : "Confirmar Reserva"}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {/* Visualização de disponibilidade de mesas */}
              {isTableViewOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg w-[800px] max-h-[80vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold">
                        Disponibilidade de Mesas
                      </h2>
                      <button
                        onClick={() => setIsTableViewOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    <div className="mb-4">
                      <label className="block mb-2">Data</label>
                      <input
                        type="date"
                        value={tableViewDate}
                        onChange={(e) => setTableViewDate(e.target.value)}
                        className="border rounded p-2"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {["Almoço", "Jantar", "Todos Horários"].map((period) => (
                        <button
                          key={period}
                          onClick={() => setTableViewPeriod(period)}
                          className={`p-2 rounded-md ${
                            tableViewPeriod === period
                              ? "bg-amber-600 text-white"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                      {Array.from({ length: 15 }, (_, i) => i + 1).map(
                        (tableNum) => {
                          // Filtrar reservas para esta mesa na data selecionada
                          const tableReservations = reservations.filter(
                            (r) =>
                              r.tableNumber === tableNum &&
                              new Date(r.date).toISOString().split("T")[0] ===
                                tableViewDate &&
                              r.status !== "cancelled"
                          );

                          // Determinar se a mesa está disponível com base no período selecionado
                          const lunchReservations = tableReservations.filter(
                            (r) =>
                              [
                                "12:00",
                                "12:30",
                                "13:00",
                                "13:30",
                                "14:00",
                                "14:30",
                              ].includes(r.time)
                          );

                          const dinnerReservations = tableReservations.filter(
                            (r) =>
                              [
                                "18:00",
                                "18:30",
                                "19:00",
                                "19:30",
                                "20:00",
                                "20:30",
                                "21:00",
                              ].includes(r.time)
                          );

                          const isLunchAvailable =
                            lunchReservations.length === 0;
                          const isDinnerAvailable =
                            dinnerReservations.length === 0;

                          let isAvailable = false;
                          if (tableViewPeriod === "Almoço") {
                            isAvailable = isLunchAvailable;
                          } else if (tableViewPeriod === "Jantar") {
                            isAvailable = isDinnerAvailable;
                          } else {
                            isAvailable = isLunchAvailable && isDinnerAvailable;
                          }

                          return (
                            <div
                              key={tableNum}
                              className={`p-4 rounded-lg border ${
                                isAvailable
                                  ? "bg-green-50 border-green-200"
                                  : "bg-red-50 border-red-200"
                              }`}
                            >
                              <div className="text-center">
                                <div className="font-bold text-lg">
                                  Mesa {tableNum}
                                </div>
                                <div
                                  className={`text-sm ${
                                    isAvailable
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {isAvailable ? "Disponível" : "Reservada"}
                                </div>

                                {!isAvailable &&
                                  tableReservations.length > 0 && (
                                    <div className="mt-2 text-xs text-gray-600">
                                      {tableReservations.map((r) => (
                                        <div key={r.id} className="mb-1">
                                          {r.time} - {r.customerName}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => {
                          setIsTableViewOpen(false);
                          setIsAddReservationModalOpen(true);
                          setNewReservation({
                            ...newReservation,
                            date: new Date(tableViewDate),
                          });
                        }}
                        className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
                      >
                        Fazer Nova Reserva
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* Botões de ação flutuantes */}
              <div className="fixed bottom-6 right-6 flex flex-col gap-2">
                <button
                  onClick={() => setIsTableViewOpen(true)}
                  className="bg-white text-amber-600 p-3 rounded-full shadow-lg hover:bg-amber-50 transition-colors"
                  title="Ver disponibilidade de mesas"
                >
                  <Grid2X2 size={24} />
                </button>
                <button
                  onClick={() => {
                    resetNewReservation();
                    setIsAddReservationModalOpen(true);
                  }}
                  className="bg-amber-600 text-white p-3 rounded-full shadow-lg hover:bg-amber-700 transition-colors"
                  title="Nova reserva"
                >
                  <Plus size={24} />
                </button>
              </div>
            </CardContent>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="stock">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Estoque</CardTitle>
            </CardHeader>
            <CardContent>
              <Stock />
            </CardContent>
          </Card>
        </Tabs.Content>
      </Tabs.Root>
      {isAddModalOpen && (
        <AddMenuItemModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleEditMenuItem}
        />
      )}
    </div>
  );
};
