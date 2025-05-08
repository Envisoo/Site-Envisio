import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import useToast from "./ui/use-toast";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRightLeft,
  ArrowRight,
  ArrowUpCircle,
  ArrowDownCircle,
  BarChart3,
  ArrowUpDown,
  BarChart,
  Bell,
  Calendar,
  Check,
  CheckCheck,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  DollarSign,
  Download,
  Edit,
  Eye,
  FileDown,
  FileText,
  FileUp,
  Filter,
  History,
  Loader2,
  Mail,
  MapPin,
  Minus,
  MoreHorizontal,
  Package,
  PackageCheck,
  Phone,
  PieChart,
  Plus,
  Printer,
  QrCode,
  RefreshCw,
  Scan,
  Search,
  Send,
  ShoppingCart,
  Trash,
  Trash2,
  TrendingUp,
  Truck,
  UserCircle,
  Users,
  X,
  XCircle,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@radix-ui/react-select";

// Importar os componentes modais
import AddItemModal from "./modals/AddItemModal";
import AddTransactionModal from "./modals/AddTransactionModal";
import { AddSupplierModal } from "./modals/AddSupplierModall";
import { CreatePurchaseOrderModal } from "./modals/CreatePurchaseOrderModal";
import { ItemDetailModal } from "./modals/ItemDetailModal";
import { EditItemModal } from "./modals/EditItemModal";
import { TransactionDetailModal } from "./modals/TransactionDetailModal";
import { EditTransactionModal } from "./modals/EditTransactionModal";
import { PurchaseOrderDetailModal } from "./modals/PurchaseOrderDetailModal";
import { EditPurchaseOrderModal } from "./modals/EditPurchaseOrderModal";
import { EditSupplierModal } from "./modals/EditSupplierModal";
import { BatchAdjustmentModal } from "./modals/BatchAdjustmentModal";
import { BatchTransferModal } from "./modals/BatchTransferModal";
import { ReceivePOModal } from "./modals/ReceivePOModal";
import { QRCodeModal } from "./modals/QRCodeModal";
import { POItemsModal } from "./modals/POItemsModal";

import { formatDateTime } from "./lib/utils";

// Interfaces
interface StockItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalValue: number;
  supplier: string;
  location: string;
  minimumStock: number;
  optimumStock: number;
  expiryDate?: Date;
  lastRestocked: Date;
  status: "in-stock" | "low-stock" | "out-of-stock" | "expired" | "ordered";
  batchNumber?: string;
  tags: string[];
  usageRate: number; // Unidades consumidas por dia
  imageUrl?: string;
  notes?: string;
  isPerishable: boolean;
  alertThreshold: number; // Percentual do estoque mínimo para alertas
  qrCode?: string;
  barcode?: string;
}

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  paymentTerms: string;
  deliveryTime: number;
  reliability: number;
  preferredForCategories: string[];
  lastOrderDate?: Date;
  notes?: string;
  status: "active" | "inactive";
  cnpj?: string;
  nome?: string;
}

interface StockTransaction {
  id: string;
  type: "in" | "out" | "adjustment" | "transfer" | "waste";
  itemId: string;
  quantity: number;
  date: Date;
  userId: string;
  userName: string;
  reason?: string;
  documentNumber?: string;
  cost?: number;
  destination?: string; // Para transferências
  source?: string; // Para transferências
  wasteReason?: "expired" | "damaged" | "quality" | "other";
}

interface PurchaseOrder {
  id: string;
  supplierId: string;
  supplierName: string;
  status: "draft" | "sent" | "confirmed" | "received" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
  expectedDelivery?: Date;
  actualDelivery?: Date;
  items: {
    itemId: string;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  totalValue: number;
  notes?: string;
  paymentStatus: "pending" | "partial" | "paid";
  paymentDue?: Date;
  documentNumber: string;
  date?: Date | string;
  total?: number;
}

interface StockAlert {
  id: string;
  type: "low-stock" | "expiring" | "expired" | "price-change" | "usage-spike";
  itemId: string;
  itemName: string;
  message: string;
  severity: "info" | "warning" | "critical";
  date: Date;
  isRead: boolean;
  actionTaken?: boolean;
}

interface StockLocation {
  id: string;
  name: string;
  type: "storage" | "kitchen" | "bar" | "service";
  capacity: number;
  currentOccupancy: number;
  temperature?: number; // Para locais refrigerados
  humidity?: number; // Para locais com controle de umidade
  items: string[]; // IDs dos itens neste local
}

interface StockAnalytics {
  totalValue: number;
  itemCount: number;
  lowStockCount: number;
  expiringCount: number;
  turnoverRate: number;
  mostUsedItems: { name: string; usage: number }[];
  leastUsedItems: { name: string; usage: number }[];
  categoryBreakdown: { category: string; count: number; value: number }[];
  monthlySpending: { month: string; amount: number }[];
  wasteAnalysis: { reason: string; count: number; value: number }[];
  supplierPerformance: {
    name: string;
    reliability: number;
    deliveryTime: number;
  }[];
}

interface StockFilter {
  searchTerm: string;
  categories: string[];
  status: string[];
  suppliers: string[];
  locations: string[];
  sortBy: string;
  sortOrder: "asc" | "desc";
  showPerishableOnly: boolean;
  showNonPerishableOnly: boolean;
  dateRange: {
    start?: Date;
    end?: Date;
  };
  priceRange: {
    min?: number;
    max?: number;
  };
  tags: string[];
}

interface TransactionFilters {
  startDate: Date | null;
  endDate: Date | null;
  type: "all" | "entrada" | "saida" | "transferencia" | "ajuste";
  location: string;
  status: "all" | "pendente" | "concluido" | "cancelado";
}

interface Alert {
  id: string;
  type: string;
  message: string;
  status: "read" | "unread";
  priority: "high" | "medium" | "low";
  date: Date;
}

// Componente principal
export const Stock: React.FC = () => {
  const handleReceivePOItems = async (poId: string) => {
    try {
      // Implement your PO receiving logic here
      // For example:
      const response = await fetch(`/api/purchase-orders/${poId}/receive`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to receive PO items');
      }

      // Refresh your data or update state as needed
      // For example:
      // refreshPurchaseOrders();
      toast({
        title: "Success",
        description: "Purchase order items received successfully",
      });
    } catch (error) {
      console.error('Error receiving PO items:', error);
      toast({
        title: "Error",
        description: "Failed to receive purchase order items",
        variant: "destructive",
      });
    }
  };

  const handleUpdatePO = async (purchaseOrder: PurchaseOrder) => {
    try {
      const response = await fetch(`/api/purchase-orders/${purchaseOrder.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseOrder),
      });
  
      if (!response.ok) {
        throw new Error('Falha ao atualizar o pedido de compra');
      }
  
      const updatedPO = await response.json();
      // Atualiza o estado local com o pedido atualizado
      setPurchaseOrders(prevPOs =>
        prevPOs.map(po => po.id === updatedPO.id ? updatedPO : po)
      );
      
      toast({
        title: "Sucesso",
        description: "Pedido de compra atualizado com sucesso",
      });
    } catch (error) {
      console.error('Erro ao atualizar pedido de compra:', error);
      toast({
        title: "Erro",
        description: "Falha ao atualizar o pedido de compra",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTransaction = async (transaction: Transaction) => {
    try {
      // Make API call to update the transaction
      const response = await fetch(`/api/transactions/${transaction.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        throw new Error('Failed to update transaction');
      }

      // Update local state
      setTransactions(prevTransactions =>
        prevTransactions.map(t => 
          t.id === transaction.id ? transaction : t
        )
      );

      toast({
        title: "Success",
        description: "Transaction updated successfully",
        variant: "default",
      });
    } catch (error) {
      console.error('Error updating transaction:', error);
      toast({
        title: "Error",
        description: "Failed to update transaction",
        variant: "destructive",
      });
    }
  };
  // Estados
  const [stockItems, setStockItems] = useState<StockItem[]>(() => {
    // Dados de exemplo
    return generateSampleStockData();
  });
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [suppliers, setSuppliers] = useState<Supplier[]>(() => {
    return generateSampleSuppliers();
  });

  const [transactions, setTransactions] = useState<StockTransaction[]>(() => {
    return generateSampleTransactions();
  });

  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(() => {
    return generateSamplePurchaseOrders();
  });

  const [alerts, setAlerts] = useState<StockAlert[]>(() => {
    return generateSampleAlerts();
  });

  const [locations, setLocations] = useState<StockLocation[]>(() => {
    return generateSampleLocations();
  });

  const [filters, setFilters] = useState<StockFilter>({
    searchTerm: "",
    categories: [],
    status: [],
    suppliers: [],
    locations: [],
    sortBy: "name",
    sortOrder: "asc",
    showPerishableOnly: false,
    showNonPerishableOnly: false,
    dateRange: {},
    priceRange: {},
    tags: [],
  });

  const [activeTab, setActiveTab] = useState("overview");
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [isAddSupplierModalOpen, setIsAddSupplierModalOpen] = useState(false);
  const [isCreatePOModalOpen, setIsCreatePOModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [newStockItem, setNewStockItem] = useState<Partial<StockItem>>({
    name: "",
    category: "",
    quantity: 0,
    unit: "unidade",
    unitPrice: 0,
    totalValue: 0,
    supplier: "",
    location: "",
    minimumStock: 0,
    optimumStock: 0,
    status: "in-stock",
    tags: [],
    usageRate: 0,
    isPerishable: false,
    alertThreshold: 20,
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "grid" | "kanban">(
    "table"
  );
  const [timeframe, setTimeframe] = useState<
    "daily" | "weekly" | "monthly" | "yearly"
  >("monthly");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedBatchItems, setSelectedBatchItems] = useState<string[]>([]);
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);
  const [isAIAnalysisActive, setIsAIAnalysisActive] = useState(false);
  const [showPredictiveInsights, setShowPredictiveInsights] = useState(false);

  const [transactionFilters, setTransactionFilters] = useState<{
    startDate: Date | null;
    endDate: Date | null;
    type: "all" | "in" | "out" | "transfer" | "adjustment";
    location: string;
    status: "all" | "pending" | "completed" | "cancelled";
  }>({
    startDate: null,
    endDate: null,
    type: "all",
    location: "all",
    status: "all",
  });

  // Função para atualizar os filtros
  const handleTransactionFilterChange = useCallback((field: string, value: any) => {
    setTransactionFilters(prev => ({ ...prev, [field]: value }));
  }, []);

  // Adicione esta função de filtragem
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesDate =
        (!transactionFilters.startDate ||
          new Date(transaction.date) >= transactionFilters.startDate) &&
        (!transactionFilters.endDate ||
          new Date(transaction.date) <= transactionFilters.endDate);

      const matchesType =
        transactionFilters.type === "all" ||
        transaction.type === transactionFilters.type;

      const matchesLocation =
        transactionFilters.location === "all" ||
        transaction.location === transactionFilters.location ||
        transaction.destinationLocation === transactionFilters.location;

      const matchesStatus =
        transactionFilters.status === "all" ||
        transaction.status === transactionFilters.status;

      return matchesDate && matchesType && matchesLocation && matchesStatus;
    });
  }, [transactions, transactionFilters]);

  // Efeitos


  const formatDate = (date: Date | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("pt-AO");
  };

  const getStatusColor = (status: StockItem["status"]) => {
    switch (status) {
      case "in-stock":
        return "bg-green-100 text-green-800";
      case "low-stock":
        return "bg-yellow-100 text-yellow-800";
      case "out-of-stock":
        return "bg-red-100 text-red-800";
      case "expired":
        return "bg-purple-100 text-purple-800";
      case "ordered":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStockLevel = (item: StockItem) => {
    const percentage = (item.quantity / item.optimumStock) * 100;
    if (percentage >= 100) return "Ótimo";
    if (percentage >= 70) return "Bom";
    if (percentage >= 30) return "Médio";
    if (percentage > 0) return "Baixo";
    return "Esgotado";
  };

  const getStockLevelColor = (item: StockItem) => {
    const percentage = (item.quantity / item.optimumStock) * 100;
    if (percentage >= 100) return "bg-green-500";
    if (percentage >= 70) return "bg-green-400";
    if (percentage >= 30) return "bg-yellow-400";
    if (percentage > 0) return "bg-orange-400";
    return "bg-red-500";
  };

  // Adicione este estado no início do componente
  const [supplierFilters, setSupplierFilters] = useState({
    search: "",
    status: "all",
  });

  // Adicione esta função para atualizar os filtros
  const handleSupplierFilterChange = (
    field: keyof typeof supplierFilters, 
    value: string
  ) => {
    setSupplierFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };  

  const handleSelectAllItems = (checked: boolean) => {
    setSelectedItems(checked ? filteredItems.map(item => item.id) : []);
  };

  const handleItemSelection = (itemId: string, checked: boolean) => {
    setSelectedItems(prev =>
      checked
        ? [...prev, itemId]
        : prev.filter(id => id !== itemId)
    );
  };


  const filteredItems = useMemo(() => {
    return stockItems.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());

      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(item.category);

      const matchesStatus =
        filters.status.length === 0 || filters.status.includes(item.status);

      const matchesSupplier =
        filters.suppliers.length === 0 ||
        filters.suppliers.includes(item.supplier);

      const matchesLocation =
        filters.locations.length === 0 ||
        filters.locations.includes(item.location);

      const matchesPerishable =
        (!filters.showPerishableOnly && !filters.showNonPerishableOnly) ||
        (filters.showPerishableOnly && item.isPerishable) ||
        (filters.showNonPerishableOnly && !item.isPerishable);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesSupplier &&
        matchesLocation &&
        matchesPerishable
      );
    }).sort((a, b) => {
      const direction = filters.sortOrder === "asc" ? 1 : -1;
      switch (filters.sortBy) {
        case "name":
          return direction * a.name.localeCompare(b.name);
        case "quantity":
          return direction * (a.quantity - b.quantity);
        case "value":
          return direction * (a.totalValue - b.totalValue);
        default:
          return 0;
      }
    });
  }, [stockItems, filters]);

  // Implemente o filteredSuppliers com validação
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((supplier) => {
      const searchTerm = supplierFilters.search.toLowerCase();
      const matchesSearch =
        (supplier.nome?.toLowerCase() || "").includes(searchTerm) ||
        (supplier.cnpj || "").includes(searchTerm);

      const matchesStatus =
        supplierFilters.status === "all" ||
        supplier.status === supplierFilters.status;

      return matchesSearch && matchesStatus;
    });
  }, [suppliers, supplierFilters]);

  const [poFilters, setPoFilters] = useState<{
    startDate: Date | null;
    endDate: Date | null;
    status: "all" | "draft" | "sent" | "confirmed" | "received" | "cancelled";
    supplier: string;
    search: string;
  }>({
    startDate: null,
    endDate: null,
    status: "all",
    supplier: "all",
    search: "",
  });

  // Adicione esta função para gerenciar as mudanças nos filtros
  const handlePOFilterChange = (field: string, value: any) => {
    setPoFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Adicione o filteredPurchaseOrders usando useMemo
  const filteredPurchaseOrders = useMemo(() => {
    return purchaseOrders.filter((po) => {
      const matchesDate =
        (!poFilters.startDate || new Date(po.date) >= poFilters.startDate) &&
        (!poFilters.endDate || new Date(po.date) <= poFilters.endDate);

      const matchesSupplier =
        poFilters.supplier === "all" || po.supplier === poFilters.supplier;

      const matchesStatus =
        poFilters.status === "all" || po.status === poFilters.status;

      const matchesSearch =
        poFilters.search === "" ||
        po.id.toLowerCase().includes(poFilters.search.toLowerCase());

      return matchesDate && matchesSupplier && matchesStatus && matchesSearch;
    });
  }, [purchaseOrders, poFilters]);

  // Adicione este estado
  const [alertFilters, setAlertFilters] = useState({
    type: "all",
    status: "all",
    priority: "all",
    search: "",
  });

  // Estados necessários
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const { toast } = useToast();

  // Funções de manipulação
  const handleMarkAllAlertsAsRead = () => {
    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) => ({
        ...alert,
        status: "read",
      }))
    );
  };

  const handleClearAllAlerts = () => {
    setAlerts([]);
    toast({
      title: "Alertas limpos",
      description: "Todos os alertas foram removidos com sucesso.",
      variant: "default",
    });
  };

  const handleDeleteAlert = (alertId: string) => {
    setAlerts((currentAlerts) =>
      currentAlerts.filter((alert) => alert.id !== alertId)
    );
  };

  const handleAlertAction = (alertId: string, action: string) => {
    // Implementar lógica específica para cada ação
    console.log(`Executando ação ${action} no alerta ${alertId}`);
  };

  // Add these handler functions
  const handleOpenAddTransactionModal = () => {
    setIsAddTransactionModalOpen(true);
  };


  const [selectedItemToEdit, setSelectedItemToEdit] = useState<StockItem | null>(
    null
  );

  // Add these handler functions
  const handleOpenEditItemModal = (item: StockItem) => {
    setSelectedItemToEdit(item);
    setIsEditItemModalOpen(true);
  };

  const handleCloseEditItemModal = () => {
    setIsEditItemModalOpen(false);
    setSelectedItemToEdit(null);
  };

  // Add these states
  const [isViewTransactionModalOpen, setIsViewTransactionModalOpen] =
    useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  // Add these handler functions
  const handleOpenViewTransactionModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsViewTransactionModalOpen(true);
  };
  const [selectedTransactionType, setSelectedTransactionType] = useState<TransactionType>("in");

  const handleCloseViewTransactionModal = () => {
    setIsViewTransactionModalOpen(false);
    setSelectedTransaction(null);
  };

  // Add these states
  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] =
    useState(false);
  const [selectedTransactionToEdit, setSelectedTransactionToEdit] =
    useState<Transaction | null>(null);

  // Add these handler functions
  const handleOpenEditTransactionModal = (transaction: Transaction) => {
    setSelectedTransactionToEdit(transaction);
    setIsEditTransactionModalOpen(true);
  };

  const handleCloseEditTransactionModal = () => {
    setIsEditTransactionModalOpen(false);
    setSelectedTransactionToEdit(null);
  };

  // Adicione estes estados
  const [isViewPOModalOpen, setIsViewPOModalOpen] = useState(false);

  // Adicione estas funções manipuladoras
  const handleOpenViewPOModal = (purchaseOrder: PurchaseOrder) => {
    setSelectedPO(purchaseOrder);
    setIsViewPOModalOpen(true);
  };

  const handleCloseViewPOModal = () => {
    setIsViewPOModalOpen(false);
    setSelectedPO(null);
  };

  const [isEditPOModalOpen, setIsEditPOModalOpen] = useState(false);
  const [selectedPOToEdit, setSelectedPOToEdit] =
    useState<PurchaseOrder | null>(null);

  // Adicione estas funções manipuladoras
  const handleOpenEditPOModal = (purchaseOrder: PurchaseOrder) => {
    setSelectedPOToEdit(purchaseOrder);
    setIsEditPOModalOpen(true);
  };

  const handleCloseEditPOModal = () => {
    setIsEditPOModalOpen(false);
    setSelectedPOToEdit(null);
  };

  // Adicione estes estados
  const [isEditSupplierModalOpen, setIsEditSupplierModalOpen] = useState(false);
  const [selectedSupplierToEdit, setSelectedSupplierToEdit] =
    useState<Supplier | null>(null);

  // Adicione estas funções manipuladoras
  const handleOpenEditSupplierModal = (supplier: Supplier) => {
    setSelectedSupplierToEdit(supplier);
    setIsEditSupplierModalOpen(true);
  };

  const handleCloseEditSupplierModal = () => {
    setIsEditSupplierModalOpen(false);
    setSelectedSupplierToEdit(null);
  };

  // Adicione estes estados
  const [isBatchAdjustmentModalOpen, setIsBatchAdjustmentModalOpen] =
    useState(false);
  const [selectedItemsForBatch, setSelectedItemsForBatch] = useState<Item[]>(
    []
  );

  const handleCloseAddTransactionModal = useCallback(() => {
    console.log("handleCloseAddTransactionModal chamado");
    setIsAddTransactionModalOpen(false);
  }, []);

  // And add this before the return statement
  console.log("Stock rendering", { isAddTransactionModalOpen });

  // Adicione estas funções manipuladoras
  const handleOpenBatchAdjustmentModal = (items: Item[]) => {
    setSelectedItemsForBatch(items);
    setIsBatchAdjustmentModalOpen(true);
  };

  const handleCloseBatchAdjustmentModal = () => {
    setIsBatchAdjustmentModalOpen(false);
    setSelectedItemsForBatch([]);
  };

  // Adicione estes estados
  const [isBatchTransferModalOpen, setIsBatchTransferModalOpen] =
    useState(false);
  const [selectedItemsForTransfer, setSelectedItemsForTransfer] = useState<
    Item[]
  >([]);

  // Adicione estas funções manipuladoras
  const handleOpenBatchTransferModal = (items: Item[]) => {
    setSelectedItemsForTransfer(items);
    setIsBatchTransferModalOpen(true);
  };

  const handleCloseBatchTransferModal = () => {
    setIsBatchTransferModalOpen(false);
    setSelectedItemsForTransfer([]);
  };

  const [transactionPage, setTransactionPage] = useState(1);
  const [transactionsPerPage, setTransactionsPerPage] = useState(10);

  // Add these states
  const [isReceivePOModalOpen, setIsReceivePOModalOpen] = useState(false);
  const [selectedPOToReceive, setSelectedPOToReceive] =
    useState<PurchaseOrder | null>(null);

  // Add these handler functions
  const handleOpenReceivePOModal = (purchaseOrder: PurchaseOrder) => {
    setSelectedPOToReceive(purchaseOrder);
    setIsReceivePOModalOpen(true);
  };

  const handleCloseReceivePOModal = () => {
    setIsReceivePOModalOpen(false);
    setSelectedPOToReceive(null);
  };

  // Add these states
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedItemForQR, setSelectedItemForQR] = useState<Item | null>(null);

  // Add these handler functions
  const handleOpenQRModal = (item: Item) => {
    setSelectedItemForQR(item);
    setIsQRModalOpen(true);
  };

  const handleCloseQRModal = () => {
    setIsQRModalOpen(false);
    setSelectedItemForQR(null);
  };

  // Add these states
  const [isViewPOItemsModalOpen, setIsViewPOItemsModalOpen] = useState(false);
  const [selectedPOItems, setSelectedPOItems] = useState<POItem[]>([]);

  // Add these handler functions
  const handleOpenViewPOItemsModal = (items: POItem[]) => {
    setSelectedPOItems(items);
    setIsViewPOItemsModalOpen(true);
  };

  const handleCloseViewPOItemsModal = () => {
    setIsViewPOItemsModalOpen(false);
    setSelectedPOItems([]);
  };



  const handleEditItemSubmit = async (updatedItem: StockItem) => {
    try {
      // Update the item in the stockItems array
      const updatedItems = stockItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      setStockItems(updatedItems);

      setIsEditItemModalOpen(false);
      setSelectedItemToEdit(null);

      toast({
        title: "Item atualizado",
        description: "O item foi atualizado com sucesso.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível atualizar o item.",
        variant: "destructive",
      });
    }
  };

  const handleViewPO = (purchaseOrder: PurchaseOrder) => {
    setSelectedPO(purchaseOrder);
    setIsViewPOModalOpen(true);
  };

  // Optional: Add a function to handle additional PO details
  const handleLoadPODetails = async (poId: string) => {
    try {
      // Add your API call or data fetching logic here
      const details = await fetchPODetails(poId);
      setSelectedPO((prevPO) => ({
        ...prevPO!,
        details,
      }));
    } catch (error) {
      toast({
        title: "Erro ao carregar detalhes",
        description: "Não foi possível carregar os detalhes do pedido.",
        variant: "destructive",
      });
    }
  };

  const handlePOStatusChange = async (
    purchaseOrder: PurchaseOrder,
    newStatus: string
  ) => {
    try {
      // Add your API call here
      const updatedPO = {
        ...purchaseOrder,
        status: newStatus,
        updatedAt: new Date(),
      };

      const updatedPOs = purchaseOrders.map((po) =>
        po.id === purchaseOrder.id ? updatedPO : po
      );
      setPurchaseOrders(updatedPOs);

      toast({
        title: "Status atualizado",
        description: "O status do pedido foi atualizado com sucesso.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Erro na atualização",
        description: "Não foi possível atualizar o status do pedido.",
        variant: "destructive",
      });
    }
  };

  // Filtro de alertas usando useMemo
  const filteredAlertsData = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesType =
        alertFilters.type === "all" || alert.type === alertFilters.type;
      const matchesStatus =
        alertFilters.status === "all" || alert.status === alertFilters.status;
      const matchesPriority =
        alertFilters.priority === "all" ||
        alert.priority === alertFilters.priority;
      const matchesSearch = alert.message
        .toLowerCase()
        .includes(alertFilters.search.toLowerCase());

      return matchesType && matchesStatus && matchesPriority && matchesSearch;
    });
  }, [alerts, alertFilters]);

  // Funções de negócio
  const updateAnalytics = () => {
    // Simulação de atualização de análises
    console.log("Atualizando análises de estoque...");
  };

  const checkForAlerts = () => {
    // Verificar itens com estoque baixo
    const lowStockItems = stockItems.filter(
      (item) => item.quantity <= item.minimumStock * (item.alertThreshold / 100)
    );

    // Verificar itens próximos da data de validade (7 dias)
    const now = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(now.getDate() + 7);

    const expiringItems = stockItems.filter(
      (item) =>
        item.expiryDate &&
        new Date(item.expiryDate) > now &&
        new Date(item.expiryDate) <= sevenDaysLater
    );

    // Verificar itens expirados
    const expiredItems = stockItems.filter(
      (item) => item.expiryDate && new Date(item.expiryDate) < now
    );

    // Gerar novos alertas
    const newAlerts: StockAlert[] = [
      ...lowStockItems.map((item) => ({
        id: `low-${item.id}-${Date.now()}`,
        type: "low-stock",
        itemId: item.id,
        itemName: item.name,
        message: `Estoque baixo: ${item.quantity} ${item.unit}(s) (abaixo do mínimo de ${item.minimumStock})`,
        severity: "warning",
        date: new Date(),
        isRead: false,
      })),
      ...expiringItems.map((item) => ({
        id: `expiring-${item.id}-${Date.now()}`,
        type: "expiring",
        itemId: item.id,
        itemName: item.name,
        message: `Produto próximo da validade: expira em ${formatDate(
          item.expiryDate
        )}`,
        severity: "warning",
        date: new Date(),
        isRead: false,
      })),
      ...expiredItems.map((item) => ({
        id: `expired-${item.id}-${Date.now()}`,
        type: "expired",
        itemId: item.id,
        itemName: item.name,
        message: `Produto expirado desde ${formatDate(item.expiryDate)}`,
        severity: "critical",
        date: new Date(),
        isRead: false,
      })),
    ];

    // Adicionar apenas alertas que não existem ainda
    const existingAlertIds = alerts.map((alert) => alert.id);
    const filteredNewAlerts = newAlerts.filter(
      (alert) => !existingAlertIds.includes(alert.id)
    );

    if (filteredNewAlerts.length > 0) {
      setAlerts([...alerts, ...filteredNewAlerts]);
    }
  };

  const updateUsageRates = () => {
    // Calcular taxas de uso com base nas transações recentes
    const updatedItems = stockItems.map((item) => {
      const itemTransactions = transactions
        .filter((t) => t.itemId === item.id && t.type === "out")
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

      if (itemTransactions.length >= 2) {
        const last30DaysTransactions = itemTransactions.filter(
          (t) =>
            new Date(t.date).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000
        );

        if (last30DaysTransactions.length > 0) {
          const totalUsed = last30DaysTransactions.reduce(
            (sum, t) => sum + t.quantity,
            0
          );
          const usageRate = totalUsed / 30; // Média diária

          return { ...item, usageRate };
        }
      }

      return item;
    });

    setStockItems(updatedItems);
  };

  const handleAddStockItem = (newItem: Partial<StockItem>) => {
    const id = `item-${Date.now()}`;
    const totalValue = (newItem.quantity || 0) * (newItem.unitPrice || 0);

    const item: StockItem = {
      id,
      name: newItem.name || "",
      category: newItem.category || "",
      quantity: newItem.quantity || 0,
      unit: newItem.unit || "unidade",
      unitPrice: newItem.unitPrice || 0,
      totalValue,
      supplier: newItem.supplier || "",
      location: newItem.location || "",
      minimumStock: newItem.minimumStock || 0,
      optimumStock: newItem.optimumStock || 0,
      expiryDate: newItem.expiryDate,
      lastRestocked: new Date(),
      status: determineStatus(newItem),
      tags: newItem.tags || [],
      usageRate: 0,
      isPerishable: newItem.isPerishable || false,
      alertThreshold: newItem.alertThreshold || 20,
      notes: newItem.notes,
      barcode: newItem.barcode,
      qrCode: generateQRCode(id),
    };

    setStockItems([...stockItems, item]);

    // Registrar transação de entrada
    const transaction: StockTransaction = {
      id: `trans-${Date.now()}`,
      type: "in",
      itemId: id,
      quantity: newItem.quantity || 0,
      date: new Date(),
      userId: "current-user-id", // Simulado
      userName: "Usuário Atual", // Simulado
      reason: "Estoque inicial",
      cost: totalValue,
    };

    setTransactions([...transactions, transaction]);

    // Atualizar ocupação do local
    updateLocationOccupancy(newItem.location || "", id, true);

    setIsAddItemModalOpen(false);
    resetNewItemForm();
  };

  const handleUpdateStockItem = (updatedItem: StockItem) => {
    const oldItem = stockItems.find((item) => item.id === updatedItem.id);

    if (!oldItem) return;

    // Calcular o novo valor total
    updatedItem.totalValue = updatedItem.quantity * updatedItem.unitPrice;

    // Atualizar status com base na quantidade
    updatedItem.status = determineStatus(updatedItem);

    // Atualizar o item no estado
    setStockItems(
      stockItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );

    // Registrar transação de ajuste se a quantidade mudou
    if (oldItem.quantity !== updatedItem.quantity) {
      const quantityDiff = updatedItem.quantity - oldItem.quantity;

      const transaction: StockTransaction = {
        id: `trans-${Date.now()}`,
        type: "adjustment",
        itemId: updatedItem.id,
        quantity: Math.abs(quantityDiff),
        date: new Date(),
        userId: "current-user-id", // Simulado
        userName: "Usuário Atual", // Simulado
        reason: `Ajuste manual: ${quantityDiff > 0 ? "adição" : "redução"}`,
        cost: Math.abs(quantityDiff) * updatedItem.unitPrice,
      };

      setTransactions([...transactions, transaction]);
    }

    // Atualizar ocupação do local se o local mudou
    if (oldItem.location !== updatedItem.location) {
      updateLocationOccupancy(oldItem.location, updatedItem.id, false);
      updateLocationOccupancy(updatedItem.location, updatedItem.id, true);
    }

    setSelectedItem(null);
  };

  const handleDeleteStockItem = (id: string) => {
    const item = stockItems.find((item) => item.id === id);

    if (!item) return;

    // Remover o item do local
    updateLocationOccupancy(item.location, id, false);

    // Remover o item
    setStockItems(stockItems.filter((item) => item.id !== id));

    // Registrar transação
    const transaction: StockTransaction = {
      id: `trans-${Date.now()}`,
      type: "adjustment",
      itemId: id,
      quantity: item.quantity,
      date: new Date(),
      userId: "current-user-id", // Simulado
      userName: "Usuário Atual", // Simulado
      reason: "Item removido do inventário",
      cost: item.totalValue,
    };

    setTransactions([...transactions, transaction]);
  };

  const handleStockTransaction = (
    itemId: string,
    type: StockTransaction["type"],
    quantity: number,
    reason?: string,
    destination?: string
  ) => {
    const item = stockItems.find((item) => item.id === itemId);

    if (!item) return;

    let updatedQuantity = item.quantity;

    switch (type) {
      case "in":
        updatedQuantity += quantity;
        break;
      case "out":
        if (quantity > item.quantity) {
          alert("Quantidade insuficiente em estoque!");
          return;
        }
        updatedQuantity -= quantity;
        break;
      case "transfer":
        if (quantity > item.quantity) {
          alert("Quantidade insuficiente em estoque!");
          return;
        }
        updatedQuantity -= quantity;
        break;
      case "waste":
        if (quantity > item.quantity) {
          alert("Quantidade insuficiente em estoque!");
          return;
        }
        updatedQuantity -= quantity;
        break;
    }

    // Atualizar o item
    const updatedItem = {
      ...item,
      quantity: updatedQuantity,
      totalValue: updatedQuantity * item.unitPrice,
      lastRestocked: type === "in" ? new Date() : item.lastRestocked,
      status: determineStatus({ ...item, quantity: updatedQuantity }),
    };

    setStockItems(stockItems.map((i) => (i.id === itemId ? updatedItem : i)));

    // Registrar transação
    const transaction: StockTransaction = {
      id: `trans-${Date.now()}`,
      type,
      itemId,
      quantity,
      date: new Date(),
      userId: "current-user-id", // Simulado
      userName: "Usuário Atual", // Simulado
      reason,
      cost: quantity * item.unitPrice,
      destination,
      source: type === "transfer" ? item.location : undefined,
      wasteReason: type === "waste" ? (reason as any) : undefined,
    };

    setTransactions([...transactions, transaction]);

    // Atualizar ocupação do local para transferências
    if (type === "transfer" && destination) {
      updateLocationOccupancy(item.location, itemId, false);
      updateLocationOccupancy(destination, itemId, true);

      // Atualizar localização do item
      setStockItems(
        stockItems.map((i) =>
          i.id === itemId ? { ...i, location: destination } : i
        )
      );
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Você pode ajustar este valor conforme necessário


  const handleCreatePurchaseOrder = (po: Partial<PurchaseOrder>) => {
    const id = `po-${Date.now()}`;
    const documentNumber = `PO-${Math.floor(Math.random() * 10000)}`;

    const newPO: PurchaseOrder = {
      id,
      supplierId: po.supplierId || "",
      supplierName: po.supplierName || "",
      status: "draft",
      createdAt: new Date(),
      updatedAt: new Date(),
      expectedDelivery: po.expectedDelivery,
      items: po.items || [],
      totalValue:
        po.items?.reduce((sum, item) => sum + item.totalPrice, 0) || 0,
      notes: po.notes,
      paymentStatus: "pending",
      paymentDue: po.paymentDue,
      documentNumber,
    };

    setPurchaseOrders([...purchaseOrders, newPO]);
    setIsCreatePOModalOpen(false);
  };

  const handleUpdatePurchaseOrder = (updatedPO: PurchaseOrder) => {
    setPurchaseOrders(
      purchaseOrders.map((po) => (po.id === updatedPO.id ? updatedPO : po))
    );

    // Se o status mudou para "received", atualizar o estoque
    if (updatedPO.status === "received") {
      updatedPO.items.forEach((poItem) => {
        const stockItem = stockItems.find((item) => item.id === poItem.itemId);

        if (stockItem) {
          handleStockTransaction(
            poItem.itemId,
            "in",
            poItem.quantity,
            `Recebido de pedido ${updatedPO.documentNumber}`
          );
        }
      });
    }

    setSelectedPO(null);
  };

  const handleMarkAlertAsRead = (alertId: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === alertId ? { ...alert, isRead: true } : alert
      )
    );
  };

  const handleBatchOperation = (operation: string) => {
    if (selectedBatchItems.length === 0) {
      alert("Selecione pelo menos um item para operação em lote");
      return;
    }

    setIsProcessingBatch(true);

    // Simular processamento
    setTimeout(() => {
      switch (operation) {
        case "delete":
          selectedBatchItems.forEach((id) => handleDeleteStockItem(id));
          break;
        case "transfer":
          // Lógica para transferência em lote
          break;
        case "export":
          // Lógica para exportação em lote
          break;
        case "print-labels":
          // Lógica para impressão de etiquetas
          break;
      }

      setSelectedBatchItems([]);
      setIsProcessingBatch(false);
    }, 1500);
  };

  const handleGenerateReport = (reportType: string) => {
    setIsGeneratingReport(true);

    // Simular geração de relatório
    setTimeout(() => {
      console.log(`Relatório ${reportType} gerado`);
      setIsGeneratingReport(false);

      // Simulação de download
      const element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
        encodeURIComponent(
          `Relatório de Estoque - ${new Date().toLocaleString()}`
        )
      );
      element.setAttribute("download", `relatorio-${reportType}.txt`);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 2000);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);

    // Simular importação
    setTimeout(() => {
      console.log("Dados importados com sucesso");
      setIsImporting(false);

      // Resetar input
      event.target.value = "";
    }, 2000);
  };

  const handleScanBarcode = () => {
    setIsScanning(true);

    // Simular escaneamento
    setTimeout(() => {
      const randomItem =
        stockItems[Math.floor(Math.random() * stockItems.length)];
      setSelectedItem(randomItem);
      setIsScanning(false);
    }, 1500);
  };

  const handleToggleAIAnalysis = () => {
    setIsAIAnalysisActive(!isAIAnalysisActive);

    if (!isAIAnalysisActive) {
      // Simular análise de IA
      setTimeout(() => {
        setShowPredictiveInsights(true);
      }, 2000);
    } else {
      setShowPredictiveInsights(false);
    }
  };

  const updateLocationOccupancy = (
    locationId: string,
    itemId: string,
    add: boolean
  ) => {
    if (!locationId) return;

    setLocations(
      locations.map((loc) => {
        if (loc.id === locationId) {
          const updatedItems = add
            ? [...loc.items, itemId]
            : loc.items.filter((id) => id !== itemId);

          return {
            ...loc,
            items: updatedItems,
            currentOccupancy: updatedItems.length,
          };
        }
        return loc;
      })
    );
  };

  const generateQRCode = (id: string) => {
    // Simulação de geração de QR code
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${id}`;
  };

  const resetNewItemForm = () => {
    setNewStockItem({
      name: "",
      category: "",
      quantity: 0,
      unit: "unidade",
      unitPrice: 0,
      totalValue: 0,
      supplier: "",
      location: "",
      minimumStock: 0,
      optimumStock: 0,
      status: "in-stock",
      tags: [],
      usageRate: 0,
      isPerishable: false,
      alertThreshold: 20,
    });
  };

  // Funções de geração de dados de exemplo
  function generateSampleStockData(): StockItem[] {
    const categories = [
      "Carnes",
      "Peixes",
      "Vegetais",
      "Frutas",
      "Laticínios",
      "Bebidas",
      "Grãos",
      "Condimentos",
      "Descartáveis",
      "Limpeza",
    ];

    const units = [
      "kg",
      "g",
      "l",
      "ml",
      "unidade",
      "pacote",
      "caixa",
      "garrafa",
    ];

    const suppliers = [
      "Fornecedor A",
      "Fornecedor B",
      "Fornecedor C",
      "Fornecedor D",
      "Fornecedor E",
    ];

    const locations = [
      "Despensa Principal",
      "Refrigerador 1",
      "Freezer 1",
      "Adega",
      "Almoxarifado",
    ];

    const items: StockItem[] = [];

    // Carnes
    items.push({
      id: "item-1",
      name: "Picanha",
      category: "Carnes",
      quantity: 25,
      unit: "kg",
      unitPrice: 8500,
      totalValue: 25 * 8500,
      supplier: "Fornecedor A",
      location: "Freezer 1",
      minimumStock: 10,
      optimumStock: 30,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      lastRestocked: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: "in-stock",
      tags: ["premium", "churrasco"],
      usageRate: 2.5,
      isPerishable: true,
      alertThreshold: 20,
      notes: "Corte premium para churrascos",
    });

    items.push({
      id: "item-2",
      name: "Frango inteiro",
      category: "Carnes",
      quantity: 8,
      unit: "kg",
      unitPrice: 1200,
      totalValue: 8 * 1200,
      supplier: "Fornecedor B",
      location: "Refrigerador 1",
      minimumStock: 5,
      optimumStock: 15,
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      lastRestocked: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: "in-stock",
      tags: ["aves"],
      usageRate: 1.2,
      isPerishable: true,
      alertThreshold: 25,
    });

    // Vegetais
    items.push({
      id: "item-3",
      name: "Tomate",
      category: "Vegetais",
      quantity: 4,
      unit: "kg",
      unitPrice: 800,
      totalValue: 4 * 800,
      supplier: "Fornecedor C",
      location: "Refrigerador 1",
      minimumStock: 5,
      optimumStock: 10,
      expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      lastRestocked: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: "low-stock",
      tags: ["salada", "fresco"],
      usageRate: 1.5,
      isPerishable: true,
      alertThreshold: 30,
    });

    // Bebidas
    items.push({
      id: "item-4",
      name: "Vinho Tinto",
      category: "Bebidas",
      quantity: 24,
      unit: "garrafa",
      unitPrice: 3500,
      totalValue: 24 * 3500,
      supplier: "Fornecedor D",
      location: "Adega",
      minimumStock: 10,
      optimumStock: 30,
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      lastRestocked: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      status: "in-stock",
      tags: ["alcoólico", "premium"],
      usageRate: 0.5,
      isPerishable: false,
      alertThreshold: 20,
    });

    // Condimentos
    items.push({
      id: "item-5",
      name: "Azeite Extra Virgem",
      category: "Condimentos",
      quantity: 2,
      unit: "l",
      unitPrice: 4500,
      totalValue: 2 * 4500,
      supplier: "Fornecedor E",
      location: "Despensa Principal",
      minimumStock: 3,
      optimumStock: 8,
      expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
      lastRestocked: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
      status: "low-stock",
      tags: ["importado", "premium"],
      usageRate: 0.2,
      isPerishable: false,
      alertThreshold: 25,
    });

    // Descartáveis
    items.push({
      id: "item-6",
      name: "Guardanapos",
      category: "Descartáveis",
      quantity: 50,
      unit: "pacote",
      unitPrice: 350,
      totalValue: 50 * 350,
      supplier: "Fornecedor B",
      location: "Almoxarifado",
      minimumStock: 20,
      optimumStock: 60,
      lastRestocked: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      status: "in-stock",
      tags: ["essencial"],
      usageRate: 1.8,
      isPerishable: false,
      alertThreshold: 20,
    });

    // Adicionar mais 14 itens para ter um total de 20
    for (let i = 7; i <= 20; i++) {
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      const unit = units[Math.floor(Math.random() * units.length)];
      const supplier = suppliers[Math.floor(Math.random() * suppliers.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];

      const quantity = Math.floor(Math.random() * 50) + 1;
      const unitPrice = Math.floor(Math.random() * 5000) + 200;
      const minimumStock = Math.floor(Math.random() * 10) + 5;
      const optimumStock = minimumStock + Math.floor(Math.random() * 20) + 10;

      const isPerishable = Math.random() > 0.5;
      let expiryDate;

      if (isPerishable) {
        // Data de validade entre 1 e 90 dias no futuro
        const daysToExpiry = Math.floor(Math.random() * 90) + 1;
        expiryDate = new Date(Date.now() + daysToExpiry * 24 * 60 * 60 * 1000);
      }

      const daysAgoRestocked = Math.floor(Math.random() * 30) + 1;
      const lastRestocked = new Date(
        Date.now() - daysAgoRestocked * 24 * 60 * 60 * 1000
      );

      let status: StockItem["status"];
      if (quantity === 0) {
        status = "out-of-stock";
      } else if (quantity <= minimumStock) {
        status = "low-stock";
      } else if (isPerishable && expiryDate && expiryDate < new Date()) {
        status = "expired";
      } else {
        status = "in-stock";
      }

      items.push({
        id: `item-${i}`,
        name: `Item ${i}`,
        category,
        quantity,
        unit,
        unitPrice,
        totalValue: quantity * unitPrice,
        supplier,
        location,
        minimumStock,
        optimumStock,
        expiryDate,
        lastRestocked,
        status,
        tags: [],
        usageRate: Math.random() * 2,
        isPerishable,
        alertThreshold: Math.floor(Math.random() * 10) + 15,
      });
    }

    return items;
  }

  function generateSampleSuppliers(): Supplier[] {
    return [
      {
        id: "supplier-1",
        name: "Fornecedor A",
        contactPerson: "João Silva",
        email: "joao@fornecedora.com",
        phone: "123-456-789",
        address: "Rua A, 123",
        paymentTerms: "30 dias",
        deliveryTime: 3,
        reliability: 95,
        preferredForCategories: ["Carnes", "Peixes"],
        lastOrderDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        notes: "Fornecedor principal de carnes",
        status: "active",
      },
      {
        id: "supplier-2",
        name: "Fornecedor B",
        contactPerson: "Maria Santos",
        email: "maria@fornecedorb.com",
        phone: "987-654-321",
        address: "Rua B, 456",
        paymentTerms: "15 dias",
        deliveryTime: 2,
        reliability: 88,
        preferredForCategories: ["Vegetais", "Frutas", "Descartáveis"],
        lastOrderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        status: "active",
      },
      {
        id: "supplier-3",
        name: "Fornecedor C",
        contactPerson: "Pedro Oliveira",
        email: "pedro@fornecedorc.com",
        phone: "555-123-456",
        address: "Rua C, 789",
        paymentTerms: "à vista",
        deliveryTime: 1,
        reliability: 92,
        preferredForCategories: ["Vegetais", "Frutas"],
        lastOrderDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        notes: "Entrega produtos orgânicos",
        status: "active",
      },
      {
        id: "supplier-4",
        name: "Fornecedor D",
        contactPerson: "Ana Costa",
        email: "ana@fornecedord.com",
        phone: "222-333-444",
        address: "Rua D, 101",
        paymentTerms: "45 dias",
        deliveryTime: 5,
        reliability: 85,
        preferredForCategories: ["Bebidas", "Laticínios"],
        lastOrderDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        status: "active",
      },
      {
        id: "supplier-5",
        name: "Fornecedor E",
        contactPerson: "Carlos Mendes",
        email: "carlos@fornecedore.com",
        phone: "777-888-999",
        address: "Rua E, 202",
        paymentTerms: "30 dias",
        deliveryTime: 4,
        reliability: 90,
        preferredForCategories: ["Condimentos", "Grãos"],
        lastOrderDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
        notes: "Especializado em produtos importados",
        status: "active",
      },
    ];
  }

  function generateSampleTransactions(): StockTransaction[] {
    const transactions: StockTransaction[] = [];

    // Gerar algumas transações para cada item
    for (let i = 1; i <= 20; i++) {
      const itemId = `item-${i}`;

      // Entrada inicial
      transactions.push({
        id: `trans-in-${i}-1`,
        type: "in",
        itemId,
        quantity: Math.floor(Math.random() * 20) + 10,
        date: new Date(
          Date.now() -
          (Math.floor(Math.random() * 30) + 1) * 24 * 60 * 60 * 1000
        ),
        userId: "user-1",
        userName: "Administrador",
        reason: "Estoque inicial",
        cost: Math.floor(Math.random() * 10000) + 1000,
      });

      // Algumas saídas
      for (let j = 1; j <= 3; j++) {
        transactions.push({
          id: `trans-out-${i}-${j}`,
          type: "out",
          itemId,
          quantity: Math.floor(Math.random() * 5) + 1,
          date: new Date(
            Date.now() -
            (Math.floor(Math.random() * 15) + 1) * 24 * 60 * 60 * 1000
          ),
          userId: "user-2",
          userName: "Chef",
          reason: "Uso na cozinha",
        });
      }

      // Algumas transferências
      if (Math.random() > 0.7) {
        transactions.push({
          id: `trans-transfer-${i}`,
          type: "transfer",
          itemId,
          quantity: Math.floor(Math.random() * 3) + 1,
          date: new Date(
            Date.now() -
            (Math.floor(Math.random() * 10) + 1) * 24 * 60 * 60 * 1000
          ),
          userId: "user-3",
          userName: "Gerente",
          reason: "Reorganização de estoque",
          source: "Despensa Principal",
          destination: "Refrigerador 1",
        });
      }

      // Alguns ajustes
      if (Math.random() > 0.8) {
        transactions.push({
          id: `trans-adj-${i}`,
          type: "adjustment",
          itemId,
          quantity: Math.floor(Math.random() * 2) + 1,
          date: new Date(
            Date.now() -
            (Math.floor(Math.random() * 5) + 1) * 24 * 60 * 60 * 1000
          ),
          userId: "user-1",
          userName: "Administrador",
          reason: "Correção de inventário",
        });
      }

      // Alguns desperdícios
      if (Math.random() > 0.9) {
        transactions.push({
          id: `trans-waste-${i}`,
          type: "waste",
          itemId,
          quantity: 1,
          date: new Date(
            Date.now() -
            (Math.floor(Math.random() * 3) + 1) * 24 * 60 * 60 * 1000
          ),
          userId: "user-2",
          userName: "Chef",
          reason: "Produto danificado",
          wasteReason: "damaged",
        });
      }
    }

    // Ordenar por data (mais recente primeiro)
    return transactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  function generateSamplePurchaseOrders(): PurchaseOrder[] {
    const orders: PurchaseOrder[] = [];

    const statuses: PurchaseOrder["status"][] = [
      "draft",
      "sent",
      "confirmed",
      "received",
      "cancelled",
    ];

    const paymentStatuses: PurchaseOrder["paymentStatus"][] = [
      "pending",
      "partial",
      "paid",
    ];

    for (let i = 1; i <= 10; i++) {
      const supplierId = `supplier-${Math.floor(Math.random() * 5) + 1}`;
      const supplierName = `Fornecedor ${String.fromCharCode(
        64 + parseInt(supplierId.split("-")[1])
      )}`;

      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const paymentStatus =
        paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];

      const createdAt = new Date(
        Date.now() - (Math.floor(Math.random() * 30) + 1) * 24 * 60 * 60 * 1000
      );
      const updatedAt = new Date(
        createdAt.getTime() +
        Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000
      );

      let expectedDelivery;
      let actualDelivery;

      if (status !== "draft" && status !== "cancelled") {
        expectedDelivery = new Date(
          createdAt.getTime() + 7 * 24 * 60 * 60 * 1000
        );

        if (status === "received") {
          actualDelivery = new Date(
            expectedDelivery.getTime() +
            (Math.floor(Math.random() * 3) - 1) * 24 * 60 * 60 * 1000
          );
        }
      }

      const items = [];
      const itemCount = Math.floor(Math.random() * 5) + 1;

      for (let j = 1; j <= itemCount; j++) {
        const itemId = `item-${Math.floor(Math.random() * 20) + 1}`;
        const quantity = Math.floor(Math.random() * 10) + 1;
        const unitPrice = Math.floor(Math.random() * 5000) + 500;

        items.push({
          itemId,
          name: `Item ${itemId.split("-")[1]}`,
          quantity,
          unitPrice,
          totalPrice: quantity * unitPrice,
        });
      }

      const totalValue = items.reduce((sum, item) => sum + item.totalPrice, 0);

      orders.push({
        id: `po-${i}`,
        supplierId,
        supplierName,
        status,
        createdAt,
        updatedAt,
        expectedDelivery,
        actualDelivery,
        items,
        totalValue,
        notes: Math.random() > 0.7 ? "Observações sobre o pedido" : undefined,
        paymentStatus,
        paymentDue: new Date(createdAt.getTime() + 30 * 24 * 60 * 60 * 1000),
        documentNumber: `PO-${1000 + i}`,
      });
    }

    return orders;
  }

  function generateSampleAlerts(): StockAlert[] {
    const alerts: StockAlert[] = [];

    // Alertas de estoque baixo
    alerts.push({
      id: "alert-1",
      type: "low-stock",
      itemId: "item-3",
      itemName: "Tomate",
      message: "Estoque baixo: 4 kg (abaixo do mínimo de 5)",
      severity: "warning",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      isRead: false,
    });

    alerts.push({
      id: "alert-2",
      type: "low-stock",
      itemId: "item-5",
      itemName: "Azeite Extra Virgem",
      message: "Estoque baixo: 2 l (abaixo do mínimo de 3)",
      severity: "warning",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      isRead: false,
    });

    // Alerta de produto expirando
    alerts.push({
      id: "alert-3",
      type: "expiring",
      itemId: "item-2",
      itemName: "Frango inteiro",
      message: "Produto próximo da validade: expira em 7 dias",
      severity: "warning",
      date: new Date(),
      isRead: false,
    });

    // Alerta de mudança de preço
    alerts.push({
      id: "alert-4",
      type: "price-change",
      itemId: "item-1",
      itemName: "Picanha",
      message: "Aumento de preço detectado: +15% no último pedido",
      severity: "info",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      isRead: true,
    });

    // Alerta de pico de uso
    alerts.push({
      id: "alert-5",
      type: "usage-spike",
      itemId: "item-4",
      itemName: "Vinho Tinto",
      message: "Aumento significativo no consumo: +200% na última semana",
      severity: "info",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      isRead: true,
    });

    return alerts;
  }

  function generateSampleLocations(): StockLocation[] {
    return [
      {
        id: "location-1",
        name: "Despensa Principal",
        type: "storage",
        capacity: 100,
        currentOccupancy: 45,
        items: ["item-5", "item-6"],
      },
      {
        id: "location-2",
        name: "Refrigerador 1",
        type: "storage",
        capacity: 50,
        currentOccupancy: 20,
        temperature: 4,
        humidity: 85,
        items: ["item-2", "item-3"],
      },
      {
        id: "location-3",
        name: "Freezer 1",
        type: "storage",
        capacity: 30,
        currentOccupancy: 15,
        temperature: -18,
        items: ["item-1"],
      },
      {
        id: "location-4",
        name: "Adega",
        type: "storage",
        capacity: 200,
        currentOccupancy: 24,
        temperature: 16,
        humidity: 70,
        items: ["item-4"],
      },
      {
        id: "location-5",
        name: "Almoxarifado",
        type: "storage",
        capacity: 150,
        currentOccupancy: 50,
        items: [],
      },
      {
        id: "location-6",
        name: "Cozinha",
        type: "kitchen",
        capacity: 30,
        currentOccupancy: 0,
        items: [],
      },
      {
        id: "location-7",
        name: "Bar",
        type: "bar",
        capacity: 40,
        currentOccupancy: 0,
        items: [],
      },
    ];
  }

  // Filtrar e ordenar itens de estoque
  const filteredStockItems = useMemo(() => {
    let filtered = [...stockItems];

    // Aplicar filtro de pesquisa
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchLower) ||
          item.category.toLowerCase().includes(searchLower) ||
          item.supplier.toLowerCase().includes(searchLower) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Aplicar filtros de categoria
    if (filters.categories.length > 0) {
      filtered = filtered.filter((item) =>
        filters.categories.includes(item.category)
      );
    }

    // Aplicar filtros de status
    if (filters.status.length > 0) {
      filtered = filtered.filter((item) =>
        filters.status.includes(item.status)
      );
    }

    // Aplicar filtros de fornecedor
    if (filters.suppliers.length > 0) {
      filtered = filtered.filter((item) =>
        filters.suppliers.includes(item.supplier)
      );
    }

    // Aplicar filtros de localização
    if (filters.locations.length > 0) {
      filtered = filtered.filter((item) =>
        filters.locations.includes(item.location)
      );
    }

    // Aplicar filtro de perecíveis
    if (filters.showPerishableOnly) {
      filtered = filtered.filter((item) => item.isPerishable);
    }

    // Aplicar filtro de não perecíveis
    if (filters.showNonPerishableOnly) {
      filtered = filtered.filter((item) => !item.isPerishable);
    }

    // Aplicar filtro de faixa de preço
    if (filters.priceRange.min !== undefined) {
      filtered = filtered.filter(
        (item) => item.unitPrice >= (filters.priceRange.min || 0)
      );
    }

    if (filters.priceRange.max !== undefined) {
      filtered = filtered.filter(
        (item) => item.unitPrice <= (filters.priceRange.max || Infinity)
      );
    }

    // Aplicar filtro de tags
    if (filters.tags.length > 0) {
      filtered = filtered.filter((item) =>
        filters.tags.some((tag) => item.tags.includes(tag))
      );
    }

    // Ordenar itens
    filtered.sort((a, b) => {
      const aValue = a[filters.sortBy as keyof StockItem];
      const bValue = b[filters.sortBy as keyof StockItem];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return filters.sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return filters.sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return filters.sortOrder === "asc"
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      return 0;
    });

    return filtered;
  }, [stockItems, filters]);

  // Calcular estatísticas para o painel
  const stockAnalytics: StockAnalytics = useMemo(() => {
    // Calcula o valor total apenas quando stockItems mudar
    const totalValue = stockItems.reduce(
      (sum, item) => sum + (item.totalValue || 0),
      0
    );
    const itemCount = stockItems.length;
    const lowStockCount = stockItems.filter(
      (item) => item.status === "low-stock" || item.status === "out-of-stock"
    ).length;

    const expiringItems = stockItems.filter(
      (item) =>
        item.expiryDate &&
        new Date(item.expiryDate) > new Date() &&
        new Date(item.expiryDate) <
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    );

    const expiringCount = expiringItems.length;

    // Calcular taxa de rotatividade (consumo mensal / estoque médio)
    const monthlyUsage = transactions
      .filter(
        (t) =>
          t.type === "out" &&
          new Date(t.date).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000
      )
      .reduce((sum, t) => sum + t.quantity, 0);

    const averageStock =
      stockItems.reduce((sum, item) => sum + item.quantity, 0) / itemCount;

    const turnoverRate = averageStock > 0 ? monthlyUsage / averageStock : 0;

    // Itens mais usados
    const itemUsage = new Map<string, number>();

    transactions
      .filter(
        (t) =>
          t.type === "out" &&
          new Date(t.date).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000
      )
      .forEach((t) => {
        const current = itemUsage.get(t.itemId) || 0;
        itemUsage.set(t.itemId, current + t.quantity);
      });

    const usageArray = Array.from(itemUsage.entries()).map(
      ([itemId, usage]) => {
        const item = stockItems.find((i) => i.id === itemId);
        return { name: item?.name || "Desconhecido", usage };
      }
    );

    const mostUsedItems = [...usageArray]
      .sort((a, b) => b.usage - a.usage)
      .slice(0, 5);

    const leastUsedItems = [...usageArray]
      .sort((a, b) => a.usage - b.usage)
      .slice(0, 5);

    // Análise por categoria
    const categoryMap = new Map<string, { count: number; value: number }>();

    stockItems.forEach((item) => {
      const current = categoryMap.get(item.category) || { count: 0, value: 0 };
      categoryMap.set(item.category, {
        count: current.count + 1,
        value: current.value + item.totalValue,
      });
    });

    const categoryBreakdown = Array.from(categoryMap.entries()).map(
      ([category, { count, value }]) => ({ category, count, value })
    );

    // Gastos mensais
    const monthlySpending: { month: string; amount: number }[] = [];
    const now = new Date();

    for (let i = 0; i < 6; i++) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = month.toLocaleDateString("pt-BR", { month: "short" });

      const amount = transactions
        .filter(
          (t) =>
            t.type === "in" &&
            t.cost &&
            new Date(t.date).getMonth() === month.getMonth() &&
            new Date(t.date).getFullYear() === month.getFullYear()
        )
        .reduce((sum, t) => sum + (t.cost || 0), 0);

      monthlySpending.unshift({ month: monthName, amount });
    }

    // Análise de desperdício
    const wasteTransactions = transactions.filter((t) => t.type === "waste");

    const wasteByReason = new Map<string, { count: number; value: number }>();

    wasteTransactions.forEach((t) => {
      const reason = t.wasteReason || "other";
      const current = wasteByReason.get(reason) || { count: 0, value: 0 };

      wasteByReason.set(reason, {
        count: current.count + 1,
        value: current.value + (t.cost || 0),
      });
    });

    const wasteAnalysis = Array.from(wasteByReason.entries()).map(
      ([reason, { count, value }]) => ({ reason, count, value })
    );

    // Desempenho de fornecedores
    const supplierPerformance = suppliers.map((supplier) => ({
      name: supplier.name,
      reliability: supplier.reliability,
      deliveryTime: supplier.deliveryTime,
    }));

    return {
      totalValue,
      itemCount,
      lowStockCount,
      expiringCount,
      turnoverRate,
      mostUsedItems,
      leastUsedItems,
      categoryBreakdown,
      monthlySpending,
      wasteAnalysis,
      supplierPerformance,
    };
  }, [stockItems, transactions, suppliers]);

  const handleAddTransaction = useCallback((transaction: Omit<StockTransaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: `trans-${Date.now()}`,
    };
    setTransactions(prev => [...prev, newTransaction]);
    
    // Atualizar o estoque se necessário
    if (transaction.type === 'in') {
      setStockItems(prev => 
        prev.map(item => 
          item.id === transaction.itemId 
            ? {...item, quantity: item.quantity + transaction.quantity} 
            : item
        )
      );
    } else if (transaction.type === 'out') {
      setStockItems(prev => 
        prev.map(item => 
          item.id === transaction.itemId 
            ? {...item, quantity: Math.max(0, item.quantity - transaction.quantity)} 
            : item
        )
      );
    }
    
    // Fechar o modal após adicionar a transação
    setIsAddTransactionModalOpen(false);
  }, [stockItems, transactions]); // Adicionei transactions como dependência

  // Certifique-se de ter uma função para lidar com a edição de itens
  const handleDeleteItem = (itemId: string) => {
    try {
      // Verificar se o usuário realmente quer excluir o item
      if (window.confirm("Tem certeza que deseja excluir este item?")) {
        // Remover o item da lista de itens de estoque
        setStockItems(stockItems.filter(item => item.id !== itemId));

        // Opcional: Mostrar uma mensagem de sucesso
        toast({
          title: "Item excluído",
          description: "O item foi removido com sucesso do estoque.",
          variant: "success"
        });
      }
    } catch (error) {
      console.error("Erro ao excluir item:", error);

      // Mostrar mensagem de erro
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao excluir o item.",
        variant: "destructive"
      });
    }
  };

  const handleEditItem = (item: StockItem) => {
    setEditingItem(item);
    setIsEditItemModalOpen(true);
  };

  // Mantenha apenas a função handleCloseEditModal
  const handleCloseEditModal = () => {
    setIsEditItemModalOpen(false);
    setEditingItem(null);
  };

  const handleUpdateItem = (updatedItem: StockItem) => {
    // Update the item in the stockItems array
    setStockItems(
      stockItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );

    // Close the edit modal
    setIsEditItemModalOpen(false);
    setEditingItem(null);

    // Show success message
    toast({
      title: "Item atualizado",
      description: "O item foi atualizado com sucesso.",
      variant: "success"
    });
  };

  // Adicione esta função no início do seu componente ou em um arquivo de utilidades
  const formatCurrency = (value: number | undefined): string => {
    if (value === undefined || value === null) {
      return 'Kz 0,00';
    }

    return value.toLocaleString('pt-AO', {
      style: 'currency',
      currency: 'AOA',
    });
  };
  const handleSort = (key: string) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'name',
    direction: 'asc'
  });


  const handleExportData = () => {
    const csvData = filteredItems.map(item => ({
      Nome: item.name,
      Categoria: item.category,
      Quantidade: item.quantity,
      Unidade: item.unit,
      'Valor Unitário': item.unitPrice,
      Total: item.quantity * item.unitPrice,
      Status: getStatusLabel(item.status)
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `inventario_${format(new Date(), 'dd-MM-yyyy')}.csv`);
  };

  const paginatedItems = useMemo(() => {
    const sortedItems = [...filteredItems].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];
      return sortConfig.direction === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

    const start = (currentPage - 1) * itemsPerPage;
    return sortedItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage, sortConfig]);

  // Primeiro, adicione esta função auxiliar fora do componente
  const determineStatus = (item: Partial<StockItem>): StockItem['status'] => {
    if (!item.quantity) return "out-of-stock";

    if (item.expiryDate && new Date(item.expiryDate) < new Date()) {
      return "expired";
    }

    if (item.quantity <= (item.minimumStock || 0)) {
      return "low-stock";
    }

    return "in-stock";
  };

  // Dentro do componente Stock, modifique a função handleAddItem
  const handleAddItem = (newItem: Omit<StockItem, "id">) => {
    const id = `item-${Date.now()}`;

    // Crie o novo item
    const item: StockItem = {
      ...newItem,
      id,
      totalValue: newItem.quantity * newItem.unitPrice,
      lastRestocked: new Date(),
      status: determineStatus(newItem),
      tags: newItem.tags || [],
      usageRate: 0,
      isPerishable: newItem.isPerishable || false,
      alertThreshold: newItem.alertThreshold || 20,
    };

    // Crie a transação inicial
    const transaction: StockTransaction = {
      id: `trans-${Date.now()}`,
      type: "in",
      itemId: id,
      quantity: newItem.quantity,
      date: new Date(),
      userId: "current-user",
      userName: "Usuário Atual",
      reason: "Entrada inicial no estoque",
    };

    // Atualize os estados em batch
    Promise.resolve().then(() => {
      setStockItems(prevItems => [...prevItems, item]);
      setTransactions(prevTransactions => [...prevTransactions, transaction]);

      toast({
        title: "Sucesso",
        description: "Item cadastrado com sucesso no estoque.",
      });

      setIsAddItemModalOpen(false);
    });
  };

  // Certifique-se de que o modal que usa handleAddItem está sendo fechado após a adição
  const handleCloseAddItemModal = useCallback(() => {
    setIsAddItemModalOpen(false);
  }, []);

  const handleTransactionAdd = useCallback((transaction: Omit<StockTransaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: `trans-${Date.now()}`,
    };
    setTransactions(prev => [...prev, newTransaction]);

    // Update stock quantity based on transaction type
    if (transaction.type === "in" || transaction.type === "out") {
      setStockItems(prev => prev.map(item => {
        if (item.id === transaction.itemId) {
          const newQuantity = transaction.type === "in"
            ? item.quantity + transaction.quantity
            : item.quantity - transaction.quantity;

          return {
            ...item,
            quantity: newQuantity,
            totalValue: newQuantity * item.unitPrice,
            status: determineStatus({ ...item, quantity: newQuantity })
          };
        }
        return item;
      }));
    }
  }, []);

  const handleItemAdd = useCallback((item: Omit<StockItem, "id">) => {
    const newItem: StockItem = {
      ...item,
      id: `item-${Date.now()}`,
      totalValue: (item.quantity || 0) * (item.unitPrice || 0),
      lastRestocked: new Date(),
      status: determineStatus(item),
    };

    setStockItems(prev => [...prev, newItem]);

    // Create initial stock transaction
    handleTransactionAdd({
      type: "in",
      itemId: newItem.id,
      quantity: newItem.quantity,
      date: new Date(),
      userId: "current-user",
      userName: "Current User",
      reason: "Initial stock",
    });
  }, [handleTransactionAdd]);

  // Otimize os useEffects
  useEffect(() => {
    // Combine efeitos relacionados
    const updateStockData = () => {
      checkForAlerts();
      updateAnalytics();
      updateUsageRates();
    };

    updateStockData();
  }, [stockItems]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
  
    // Atualizações que dependem de múltiplos estados
  }, [stockItems, suppliers, transactions]);
  
  const isMounted = useRef(false);
  
  // Adicione isso próximo ao início do componente Stock, junto com outras declarações de estado
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      status: "pending",
      createdAt: new Date(),
      clientName: "Cliente Exemplo",
      items: [
        {
          itemId: "item-1",
          quantity: 2,
          name: "Item Exemplo",
          price: 25.99
        }
      ],
      total: 51.98,
      paymentStatus: "pending",
      notes: "Pedido de exemplo",
      tableNumber: "Mesa 1",
      waiter: "Garçom 1"
    }
  ]);

  // Definição do tipo Order
  type Order = {
    id: string;
    status: "pending" | "processing" | "completed" | "cancelled";
    createdAt: Date;
    clientName: string;
    items: Array<{
      itemId: string;
      quantity: number;
      name: string;
      price: number;
    }>;
    total: number;
    paymentStatus: "pending" | "paid" | "cancelled";
    notes?: string;
    tableNumber: string;
    waiter: string;
  };

  const handleAddSupplier = useCallback((newSupplier: Supplier) => {
    setSuppliers(prevSuppliers => {
      // Verifica se o fornecedor já existe
      const exists = prevSuppliers.some(s => 
        s.id === newSupplier.id || 
        (s.cnpj && s.cnpj === newSupplier.cnpj)
      );
      
      if (exists) {
        toast({
          title: "Erro",
          description: "Fornecedor já existe",
          variant: "destructive"
        });
        return prevSuppliers;
      }
  
      return [...prevSuppliers, {
        ...newSupplier,
        id: newSupplier.id || `supplier-${Date.now()}`,
        status: "active"
      }];
    });
  }, [toast]);

  // Adicione estas funções de callback para os modais
const handleItemAdded = (newItem: StockItem) => {
  setStockItems(prev => [...prev, newItem]);
  setIsAddItemModalOpen(false);
};

const handleItemUpdated = (updatedItem: StockItem) => {
  setStockItems(prev => 
    prev.map(item => item.id === updatedItem.id ? updatedItem : item)
  );
  setIsEditItemModalOpen(false);
  setSelectedItemToEdit(null);
};

const handleTransactionAdded = (newTransaction: StockTransaction) => {
  setTransactions(prev => [...prev, newTransaction]);
  
  // Atualizar o estoque com base na transação
  if (newTransaction.type === 'in') {
    setStockItems(prev => 
      prev.map(item => 
        item.id === newTransaction.itemId 
          ? {...item, quantity: item.quantity + newTransaction.quantity} 
          : item
      )
    );
  } else if (newTransaction.type === 'out') {
    setStockItems(prev => 
      prev.map(item => 
        item.id === newTransaction.itemId 
          ? {...item, quantity: Math.max(0, item.quantity - newTransaction.quantity)} 
          : item
      )
    );
  }
  
  setIsAddTransactionModalOpen(false);
};

  // Adicione também um useEffect para carregar os pedidos
  useEffect(() => {
    // Aqui você pode adicionar a lógica para carregar os pedidos do backend
    const loadOrders = async () => {
      try {
        // Substitua isso pela sua chamada real à API
        const response = await fetch('/api/orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os pedidos.",
          variant: "destructive"
        });
      }
    };

    loadOrders();
  }, []);

  // Componentes de UI
  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Painel de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group relative">
          {/* Fundo decorativo */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-white opacity-80 z-0"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-200 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl"></div>

          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <div className="bg-amber-100 p-1.5 rounded-full mr-2 shadow-sm group-hover:scale-110 transition-transform">
                <DollarSign className="w-4 h-4 text-amber-600" />
              </div>
              <span>Valor Total do Estoque</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="relative z-10">
            <div className="text-2xl font-bold text-amber-700 group-hover:scale-105 origin-left transition-transform">
              {formatCurrency(stockAnalytics.totalValue)}
            </div>

            <div className="flex items-center mt-2 text-sm">
              <div className="flex items-center bg-green-50 px-2 py-1 rounded-full">
                <TrendingUp className="w-3.5 h-3.5 mr-1 text-green-500" />
                <span className="text-green-600 font-medium">+5.2%</span>
              </div>
              <span className="text-gray-500 ml-2">vs. mês anterior</span>
            </div>

            <div className="mt-3 pt-3 border-t border-dashed border-amber-200">
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Média por item</span>
                <span className="font-medium text-amber-700">
                  {formatCurrency(stockAnalytics.totalValue / stockAnalytics.itemCount)}
                </span>
              </div>
            </div>
          </CardContent>

          {/* Botão de ação */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full bg-amber-100 hover:bg-amber-200">
              <ArrowRight className="h-4 w-4 text-amber-700" />
            </Button>
          </div>
        </Card>

        <Card
          className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group relative cursor-pointer"
          onClick={() => setActiveTab("inventory")}
        >
          {/* Fundo decorativo */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-80 z-0"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-200 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl"></div>

          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <div className="bg-blue-100 p-1.5 rounded-full mr-2 shadow-sm group-hover:scale-110 transition-transform">
                <Package className="w-4 h-4 text-blue-600" />
              </div>
              <span>Itens em Estoque</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="relative z-10">
            <div className="text-2xl font-bold text-blue-700 group-hover:scale-105 origin-left transition-transform">
              {stockAnalytics.itemCount}
            </div>

            <div className="flex items-center mt-2 text-sm">
              <div className="flex items-center bg-amber-50 px-2 py-1 rounded-full">
                <AlertCircle className="w-3.5 h-3.5 mr-1 text-amber-500" />
                <span className="text-amber-600 font-medium">
                  {stockAnalytics.lowStockCount}
                </span>
              </div>
              <span className="text-gray-500 ml-2">com estoque baixo</span>
            </div>

            <div className="mt-3 pt-3 border-t border-dashed border-blue-200">
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Categorias</span>
                <span className="font-medium text-blue-700">
                  {new Set(stockItems.map(item => item.category)).size}
                </span>
              </div>
            </div>
          </CardContent>

          {/* Botão de ação */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full bg-blue-100 hover:bg-blue-200">
              <ArrowRight className="h-4 w-4 text-blue-700" />
            </Button>
          </div>
        </Card>

        <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group relative">
          {/* Fundo decorativo */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white opacity-80 z-0"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-green-200 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl"></div>

          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <div className="bg-green-100 p-1.5 rounded-full mr-2 shadow-sm group-hover:scale-110 transition-transform">
                <BarChart3 className="w-4 h-4 text-green-600" />
              </div>
              <span>Eficiência de Consumo</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="relative z-10">
            <div className="text-2xl font-bold text-green-700 group-hover:scale-105 origin-left transition-transform">
              {stockAnalytics.turnoverRate.toFixed(2)}x
            </div>

            <div className="flex items-center mt-2 text-sm">
              <div className="flex items-center bg-green-50 px-2 py-1 rounded-full">
                <TrendingUp className="w-3.5 h-3.5 mr-1 text-green-500" />
                <span className="text-green-600 font-medium">+0.8x</span>
              </div>
              <span className="text-gray-500 ml-2">vs. mês anterior</span>
            </div>

            <div className="mt-3 pt-3 border-t border-dashed border-green-200">
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Consumo mensal</span>
                <span className="font-medium text-green-700">
                  {transactions
                    .filter(t => t.type === "out" && new Date(t.date).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000)
                    .reduce((sum, t) => sum + t.quantity, 0)
                    .toFixed(0)} unidades
                </span>
              </div>
            </div>
          </CardContent>

          {/* Botão de ação */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full bg-green-100 hover:bg-green-200">
              <ArrowRight className="h-4 w-4 text-green-700" />
            </Button>
          </div>
        </Card>

        <Card
          className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group relative cursor-pointer"
          onClick={() => setActiveTab("orders")}
        >
          {/* Fundo decorativo */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white opacity-80 z-0"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-200 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl"></div>

          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <div className="bg-indigo-100 p-1.5 rounded-full mr-2 shadow-sm group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-4 h-4 text-indigo-600" />
              </div>
              <span>Pedidos Ativos</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="relative z-10">
            <div className="text-2xl font-bold text-indigo-700 group-hover:scale-105 origin-left transition-transform">
              {orders.filter(o => o.status === "pending").length}
            </div>

            <div className="flex items-center mt-2 text-sm">
              <div className="flex items-center bg-green-50 px-2 py-1 rounded-full">
                <CheckCircle className="w-3.5 h-3.5 mr-1 text-green-500" />
                <span className="text-green-600 font-medium">
                  {orders.filter(o => o.status === "completed").length}
                </span>
              </div>
              <span className="text-gray-500 ml-2">concluídos hoje</span>
            </div>

            <div className="mt-3 pt-3 border-t border-dashed border-indigo-200">
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Em preparação</span>
                <span className="font-medium text-indigo-700">
                  {orders.filter(o => o.status === "processing").length}
                </span>
              </div>
            </div>
          </CardContent>

          {/* Botão de ação */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full bg-indigo-100 hover:bg-indigo-200">
              <ArrowRight className="h-4 w-4 text-indigo-700" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Gráficos e análises */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative">
          {/* Background decorativo */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-amber-200 to-amber-50 rounded-full opacity-30 blur-md"></div>
          <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-gradient-to-tr from-amber-300 to-amber-100 rounded-full opacity-20 blur-md"></div>

          <CardHeader className="pb-2 border-b bg-gradient-to-r from-amber-50 to-white relative z-10">
            <CardTitle className="text-md font-medium flex items-center">
              <div className="bg-amber-100 p-1.5 rounded-full mr-2 shadow-sm">
                <PieChart className="w-5 h-5 text-amber-600" />
              </div>
              <span className="bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent font-semibold">
                Consumo por Categoria
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-4 relative z-10">
            <div className="space-y-4">
              {Object.entries(
                transactions
                  .filter((t) => t.type === "out")
                  .reduce((acc, transaction) => {
                    const item = stockItems.find(
                      (i) => i.id === transaction.itemId
                    );
                    if (item) {
                      const category = item.category;
                      acc[category] =
                        (acc[category] || 0) +
                        transaction.quantity * item.unitPrice;
                    }
                    return acc;
                  }, {} as Record<string, number>)
              )
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([category, value], index) => (
                  <div
                    key={index}
                    className="flex items-center group hover:scale-102 transition-all duration-300 p-2 rounded-lg hover:bg-amber-50"
                  >
                    <div className="w-full">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium group-hover:text-amber-700 transition-colors flex items-center">
                          <span className={`inline-block w-3 h-3 rounded-full mr-2 bg-amber-${500 - index * 100}`}></span>
                          {category}
                        </span>
                        <span className="text-sm font-medium text-gray-500 group-hover:text-amber-600 transition-colors">
                          {formatCurrency(value)}
                        </span>
                      </div>
                      <div className="relative">
                        <Progress
                          value={
                            (value /
                              transactions
                                .filter((t) => t.type === "out")
                                .reduce((total, t) => {
                                  const item = stockItems.find(
                                    (i) => i.id === t.itemId
                                  );
                                  return (
                                    total +
                                    (item ? t.quantity * item.unitPrice : 0)
                                  );
                                }, 0)) *
                            100
                          }
                          className="h-2 bg-gray-100 group-hover:bg-amber-100 transition-colors"
                          indicatorClassName={`bg-amber-${500 - index * 100} group-hover:bg-amber-${600 - index * 100} transition-colors animate-pulse-slow`}
                        />
                        <div className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-amber-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-dashed border-amber-200">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Consumo total</span>
                <span className="text-sm font-bold text-amber-700">
                  {formatCurrency(
                    transactions
                      .filter((t) => t.type === "out")
                      .reduce((total, t) => {
                        const item = stockItems.find((i) => i.id === t.itemId);
                        return total + (item ? t.quantity * item.unitPrice : 0);
                      }, 0)
                  )}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative">
          {/* Background decorativo */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-blue-200 to-blue-50 rounded-full opacity-30 blur-md"></div>
          <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-gradient-to-tr from-blue-300 to-blue-100 rounded-full opacity-20 blur-md"></div>

          <CardHeader className="pb-2 border-b bg-gradient-to-r from-blue-50 to-white relative z-10">
            <CardTitle className="text-md font-medium flex items-center">
              <div className="bg-blue-100 p-1.5 rounded-full mr-2 shadow-sm">
                <BarChart className="w-5 h-5 text-blue-600" />
              </div>
              <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent font-semibold">
                Gastos Mensais
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-4 relative z-10">
            <div className="h-[200px]">
              {(() => {
                // Agrupar transações por mês
                const monthlySpending = transactions
                  .filter((t) => t.type === "in")
                  .reduce((acc, transaction) => {
                    const date = new Date(transaction.date);
                    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
                    acc[monthYear] = (acc[monthYear] || 0) + (transaction.cost || 0);
                    return acc;
                  }, {} as Record<string, number>);

                // Converter para array e ordenar por data
                const monthlyData = Object.entries(monthlySpending)
                  .map(([monthYear, value]) => {
                    const [month, year] = monthYear.split("/");
                    return {
                      month: monthYear,
                      value,
                      date: new Date(parseInt(year), parseInt(month) - 1, 1),
                    };
                  })
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .slice(-6); // Últimos 6 meses

                const maxValue = Math.max(...monthlyData.map((d) => d.value));

                return (
                  <div className="space-y-4">
                    {monthlyData.map((data, index) => (
                      <div
                        key={index}
                        className="flex items-center group hover:scale-102 transition-all duration-300 p-2 rounded-lg hover:bg-blue-50"
                      >
                        <div className="w-full">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium group-hover:text-blue-700 transition-colors flex items-center">
                              <span className={`inline-block w-3 h-3 rounded-full mr-2 bg-blue-${500 - index * 50}`}></span>
                              {data.month}
                            </span>
                            <span className="text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors">
                              {formatCurrency(data.value)}
                            </span>
                          </div>
                          <div className="relative">
                            <Progress
                              value={(data.value / maxValue) * 100}
                              className="h-2 bg-gray-100 group-hover:bg-blue-100 transition-colors"
                              indicatorClassName={`bg-blue-${500 - index * 50} group-hover:bg-blue-${600 - index * 50} transition-colors animate-pulse-slow`}
                            />
                            <div className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            <div className="mt-6 pt-4 border-t border-dashed border-blue-200">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Total de gastos</span>
                <span className="text-sm font-bold text-blue-700">
                  {formatCurrency(
                    transactions
                      .filter((t) => t.type === "in")
                      .reduce((total, t) => total + (t.cost || 0), 0)
                  )}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Itens com Estoque Baixo */}
      <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="border-b bg-gradient-to-r from-amber-50 to-white">
          <CardTitle className="text-lg flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-amber-600" />
            Itens com Estoque Baixo
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 bg-white rounded-b-lg">
          <Table className="border-collapse">
            <TableHeader className="bg-amber-50">
              <TableRow className="border-b border-amber-100">
                <TableHead className="text-amber-800 font-semibold">Item</TableHead>
                <TableHead className="text-amber-800 font-semibold">Categoria</TableHead>
                <TableHead className="text-amber-800 font-semibold">Quantidade</TableHead>
                <TableHead className="text-amber-800 font-semibold">Mínimo</TableHead>
                <TableHead className="text-amber-800 font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockItems
                .filter((item) => item.quantity <= item.minimumStock)
                .map((item, index) => (
                  <TableRow
                    key={item.id}
                    className={`
                      ${index % 2 === 0 ? "bg-white" : "bg-amber-50/30"} 
                      hover:bg-amber-100 transition-colors
                      border-b border-amber-100/50
                    `}
                  >
                    <TableCell className="font-medium text-gray-800">{item.name}</TableCell>
                    <TableCell className="text-gray-700">{item.category}</TableCell>
                    <TableCell className="text-gray-700">
                      {item.quantity} {item.unit}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {item.minimumStock} {item.unit}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusColor(item.status)}
                      >
                        {item.status === "in-stock"
                          ? "Em estoque"
                          : item.status === "low-stock"
                            ? "Estoque baixo"
                            : item.status === "out-of-stock"
                              ? "Esgotado"
                              : item.status === "expired"
                                ? "Expirado"
                                : "Encomendado"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              {stockItems.filter((item) => item.quantity <= item.minimumStock)
                .length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-500 bg-amber-50/20">
                      <div className="flex flex-col items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                        <p>Não há itens com estoque baixo no momento.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Itens próximos da validade */}
      <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="border-b bg-gradient-to-r from-red-50 to-white">
          <CardTitle className="text-lg flex items-center">
            <Clock className="w-5 h-5 mr-2 text-red-600" />
            Itens Próximos da Validade
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 bg-white rounded-b-lg">
          <Table className="border-collapse">
            <TableHeader className="bg-red-50">
              <TableRow className="border-b border-red-100">
                <TableHead className="text-red-800 font-semibold">Item</TableHead>
                <TableHead className="text-red-800 font-semibold">Categoria</TableHead>
                <TableHead className="text-red-800 font-semibold">Quantidade</TableHead>
                <TableHead className="text-red-800 font-semibold">Validade</TableHead>
                <TableHead className="text-red-800 font-semibold">Dias Restantes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockItems
                .filter(
                  (item) =>
                    item.expiryDate &&
                    new Date(item.expiryDate) > new Date() &&
                    new Date(item.expiryDate) <
                    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                )
                .sort(
                  (a, b) =>
                    new Date(a.expiryDate!).getTime() -
                    new Date(b.expiryDate!).getTime()
                )
                .slice(0, 5)
                .map((item, index) => {
                  const daysRemaining = Math.ceil(
                    (new Date(item.expiryDate!).getTime() - Date.now()) /
                    (1000 * 60 * 60 * 24)
                  );

                  return (
                    <TableRow
                      key={item.id}
                      className={`
                        ${index % 2 === 0 ? "bg-white" : "bg-red-50/30"} 
                        hover:bg-red-100 transition-colors
                        border-b border-red-100/50
                      `}
                    >
                      <TableCell className="font-medium text-gray-800">{item.name}</TableCell>
                      <TableCell className="text-gray-700">{item.category}</TableCell>
                      <TableCell className="text-gray-700">
                        {item.quantity} {item.unit}
                      </TableCell>
                      <TableCell className="text-gray-700">{formatDate(item.expiryDate)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            daysRemaining <= 2
                              ? "bg-red-200 text-red-800 border-red-300 font-medium"
                              : "bg-yellow-200 text-yellow-800 border-yellow-300 font-medium"
                          }
                        >
                          {daysRemaining} {daysRemaining === 1 ? "dia" : "dias"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {stockItems.filter(
                (item) =>
                  item.expiryDate &&
                  new Date(item.expiryDate) > new Date() &&
                  new Date(item.expiryDate) <
                  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
              ).length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-500 bg-red-50/20">
                      <div className="flex flex-col items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                        <p>Não há itens próximos da validade no momento.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderInventoryTab = () => (
    <div className="space-y-6">
      {/* Filtros e ações */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Buscar itens..."
              className="pl-8"
              value={filters.searchTerm}
              onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
            />
          </div>

          <Button variant="outline" onClick={() => setIsFilterModalOpen(true)}>
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Ordenar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleSort("name")}>Nome</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("quantity")}>Quantidade</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("category")}>Categoria</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("value")}>Valor</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleExportData}
          >
            <Download className="h-4 w-4" />
            Exportar
          </Button>

          <Button onClick={() => setIsAddItemModalOpen(true)} className="bg-amber-500 hover:bg-amber-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Novo Item
          </Button>
        </div>
      </div>

      {/* Cards de Estatísticas Animados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Card - Total de Itens */}
        <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                Últimas 24h +{stockItems.filter(item =>
                  new Date(item.createdAt).getTime() > Date.now() - 24 * 60 * 60 * 1000
                ).length}
              </Badge>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-purple-700 group-hover:scale-105 transition-transform">
                {stockItems.length}
              </h3>
              <p className="text-sm text-gray-500">Total de Itens</p>
            </div>
          </CardContent>
        </Card>

        {/* Card - Valor Total */}
        <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white opacity-80"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-200 rounded-full opacity-20 group-hover:opacity-30 transition-all duration-500 blur-xl"></div>

          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-emerald-100 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="flex items-center text-sm text-emerald-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+5.2%</span>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-emerald-700 group-hover:scale-105 transition-transform">
                {formatCurrency(stockAnalytics.totalValue)}
              </h3>
              <p className="text-sm text-gray-500">Valor em Estoque</p>
            </div>

            <div className="mt-4 pt-4 border-t border-dashed border-emerald-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Média por item</span>
                <span className="font-medium text-emerald-600">
                  {formatCurrency(stockAnalytics.averageItemValue)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card - Itens Críticos */}
        <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-white opacity-80"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-200 rounded-full opacity-20 group-hover:opacity-30 transition-all duration-500 blur-xl"></div>

          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-amber-100 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <Badge variant="outline" className="bg-amber-50 text-amber-700">
                Atenção necessária
              </Badge>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-amber-700 group-hover:scale-105 transition-transform">
                {stockAnalytics.lowStockCount}
              </h3>
              <p className="text-sm text-gray-500">Itens Críticos</p>
            </div>

            <div className="mt-4 pt-4 border-t border-dashed border-amber-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Próximos da validade</span>
                <span className="font-medium text-amber-600">{stockAnalytics.expiringCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card - Movimentações */}
        <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-80"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-200 rounded-full opacity-20 group-hover:opacity-30 transition-all duration-500 blur-xl"></div>

          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <ArrowUpDown className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex items-center text-sm text-blue-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>Hoje</span>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-blue-700 group-hover:scale-105 transition-transform">
                {stockAnalytics.todayTransactions}
              </h3>
              <p className="text-sm text-gray-500">Movimentações</p>
            </div>

            <div className="mt-4 pt-4 border-t border-dashed border-blue-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Entradas/Saídas</span>
                <span className="font-medium text-blue-600">
                  {stockAnalytics.incomingCount}/{stockAnalytics.outgoingCount}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Inventário */}
      <Card>
        <CardContent className="p-0">
          <Table className="w-full bg-white rounded-lg shadow">
            <TableHeader className="bg-gray-50">
              <TableRow className="hover:bg-gray-100">
                <TableHead className="w-12 bg-gray-50">
                  <Checkbox
                    checked={selectedItems.length === filteredItems.length}
                    onCheckedChange={handleSelectAllItems}
                  />
                </TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Valor Un.</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedItems.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={(checked) => handleItemSelection(item.id, checked)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{item.quantity} {item.unit}</span>
                      {item.quantity <= item.minimumStock && (
                        <Badge variant="outline" className="bg-red-100 text-red-800">
                          Baixo
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                  <TableCell>{formatCurrency(item.quantity * item.unitPrice)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(item.status)}>
                      {getStatusLabel(item.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewItem(item)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditItem(item)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteItem(item.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>


      {/* Paginação */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Mostrando {filteredItems.length} de {stockItems.length} itens
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= filteredItems.length}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
  
  const [currentTransactionPage, setCurrentTransactionPage] = useState(1);
  const renderTransactionsTab = (transactionPage: number,
  transactionsPerPage: number,
  setTransactionPage: React.Dispatch<React.SetStateAction<number>>,
  setTransactionsPerPage: React.Dispatch<React.SetStateAction<number>>) => {
  
  // Calculate pagination
  const indexOfLastTransaction = currentTransactionPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  
  return (
    <div className="space-y-6">
      {/* Transaction Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-violet-50 to-white hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="bg-violet-100 p-3 rounded-lg">
                <ArrowDownCircle className="h-6 w-6 text-violet-600" />
              </div>
              <Badge className="bg-violet-100 text-violet-700">Hoje</Badge>
            </div>
            <h3 className="text-2xl font-bold text-violet-700 mt-4">
              {transactions.filter(t => t.type === "in").length}
            </h3>
            <p className="text-sm text-gray-600">Entradas Totais</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-rose-50 to-white hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="bg-rose-100 p-3 rounded-lg">
                <ArrowUpCircle className="h-6 w-6 text-rose-600" />
              </div>
              <Badge className="bg-rose-100 text-rose-700">Hoje</Badge>
            </div>
            <h3 className="text-2xl font-bold text-rose-700 mt-4">
              {transactions.filter(t => t.type === "out").length}
            </h3>
            <p className="text-sm text-gray-600">Saídas Totais</p>
          </CardContent>
        </Card>

        {/* ... Similar cards for other metrics ... */}
      </div>

      {/* Enhanced Table */}
      <Card className="overflow-hidden border-none shadow-lg">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-white">
          <CardTitle className="text-lg flex items-center gap-2">
            <History className="h-5 w-5 text-amber-600" />
            Histórico de Transações
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-amber-50/50">
              <TableRow>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTransactions.map((transaction, index) => {
                const item = stockItems.find(i => i.id === transaction.itemId);
                return (
                  <TableRow 
                    key={transaction.id}
                    className={`
                      ${index % 2 === 0 ? "bg-white" : "bg-amber-50/20"}
                      hover:bg-amber-100/30 transition-colors
                      group cursor-pointer
                    `}
                  >
                    {/* ... Table cell contents ... */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-gray-600">
          Mostrando {indexOfFirstTransaction + 1} até{" "}
          {Math.min(indexOfLastTransaction, filteredTransactions.length)} de{" "}
          {filteredTransactions.length} transações
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentTransactionPage(prev => Math.max(1, prev - 1))}
            disabled={currentTransactionPage === 1}
            className="hover:bg-amber-100"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentTransactionPage(prev => prev + 1)}
            disabled={indexOfLastTransaction >= filteredTransactions.length}
            className="hover:bg-amber-100"
          >
            Próxima
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

  const renderSuppliersTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Buscar fornecedores..."
              className="pl-8"
              value={supplierFilters.searchTerm}
              onChange={(e) =>
                setSupplierFilters({
                  ...supplierFilters,
                  searchTerm: e.target.value,
                })
              }
            />
          </div>

          <Select
            value={supplierFilters.status}
            onValueChange={(value) =>
              setSupplierFilters({
                ...supplierFilters,
                status: value as "all" | "active" | "inactive",
              })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos Status</SelectItem>
              <SelectItem value="active">Ativos</SelectItem>
              <SelectItem value="inactive">Inativos</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={supplierFilters.sortBy}
            onValueChange={(value) =>
              setSupplierFilters({
                ...supplierFilters,
                sortBy: value,
              })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nome</SelectItem>
              <SelectItem value="reliability">Confiabilidade</SelectItem>
              <SelectItem value="deliveryTime">Tempo de Entrega</SelectItem>
              <SelectItem value="lastOrder">Último Pedido</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700"
            onClick={() => setIsAddSupplierModalOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Novo Fornecedor
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSuppliers.map((supplier) => (
          <Card key={supplier.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{supplier.name}</CardTitle>
                  <p className="text-sm text-gray-500">{supplier.category}</p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    supplier.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {supplier.status === "active" ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  <a
                    href={`mailto:${supplier.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {supplier.email}
                  </a>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  <a href={`tel:${supplier.phone}`} className="hover:underline">
                    {supplier.phone}
                  </a>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{supplier.address}</span>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Confiabilidade</span>
                    <span className="text-sm font-medium">
                      {supplier.reliability}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${supplier.reliability >= 80
                        ? "bg-green-500"
                        : supplier.reliability >= 60
                          ? "bg-amber-500"
                          : "bg-red-500"
                        }`}
                      style={{ width: `${supplier.reliability}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Tempo de Entrega</span>
                    <span className="text-sm font-medium">
                      {supplier.deliveryTime} dias
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${supplier.deliveryTime <= 3
                        ? "bg-green-500"
                        : supplier.deliveryTime <= 7
                          ? "bg-amber-500"
                          : "bg-red-500"
                        }`}
                      style={{
                        width: `${Math.max(
                          0,
                          100 - (supplier.deliveryTime / 14) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <span className="text-sm text-gray-500">
                    Último pedido:{" "}
                    {supplier.lastOrder
                      ? formatDate(supplier.lastOrder)
                      : "Nunca"}
                  </span>
                </div>
              </div>
            </CardContent>
            <div className="px-6 py-2 bg-gray-50 flex justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-amber-600"
                onClick={() => handleEditSupplier(supplier)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8"
                onClick={() => handleCreatePurchaseOrder(supplier)}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Fazer Pedido
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-red-600"
                onClick={() => handleDeleteSupplier(supplier.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Excluir
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <Card className="p-8">
          <div className="flex flex-col items-center justify-center text-center">
            <Users className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">
              Nenhum fornecedor encontrado
            </h3>
            <p className="text-gray-500 mb-4">
              Não encontramos fornecedores que correspondam aos seus filtros.
            </p>
            <Button
              onClick={() => setIsAddSupplierModalOpen(true)}
              className="bg-amber-600 hover:bg-amber-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Fornecedor
            </Button>
          </div>
        </Card>
      )}
    </div>
  );

  const renderPurchaseOrdersTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Buscar pedidos..."
              className="pl-8"
              value={poFilters.searchTerm}
              onChange={(e) =>
                setPoFilters({
                  ...poFilters,
                  searchTerm: e.target.value,
                })
              }
            />
          </div>

          <Select
            value={poFilters.status}
            onValueChange={(value) =>
              setPoFilters({
                ...poFilters,
                status: value as PurchaseOrder["status"] | "all",
              })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos Status</SelectItem>
              <SelectItem value="draft">Rascunho</SelectItem>
              <SelectItem value="sent">Enviado</SelectItem>
              <SelectItem value="confirmed">Confirmado</SelectItem>
              <SelectItem value="received">Recebido</SelectItem>
              <SelectItem value="cancelled">Cancelado</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={poFilters.dateRange}
            onValueChange={(value) =>
              setPoFilters({
                ...poFilters,
                dateRange: value,
              })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todo Período</SelectItem>
              <SelectItem value="week">Esta Semana</SelectItem>
              <SelectItem value="month">Este Mês</SelectItem>
              <SelectItem value="quarter">Este Trimestre</SelectItem>
              <SelectItem value="year">Este Ano</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700"
            onClick={() => setIsCreatePOModalOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Novo Pedido
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nº Pedido</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Itens</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Previsão</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPurchaseOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <ShoppingCart className="h-12 w-12 mb-2" />
                        <h3 className="text-lg font-medium">
                          Nenhum pedido encontrado
                        </h3>
                        <p className="text-sm">
                          Tente ajustar os filtros ou crie um novo pedido.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPurchaseOrders.map((po) => {
                    const supplier = suppliers.find(
                      (s) => s.id === po.supplierId
                    );

                    return (
                      <TableRow key={po.id}>
                        <TableCell className="font-medium">
                          #{po.orderNumber}
                        </TableCell>
                        <TableCell>
                          {supplier?.name || "Desconhecido"}
                        </TableCell>
                        <TableCell>{formatDate(po.date)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span>{po.items.length} itens</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 ml-1"
                              onClick={() => handleViewPOItems(po)}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{formatCurrency(po.totalValue)}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getPOStatusColor(po.status)}
                          >
                            {getPOStatusLabel(po.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {po.expectedDelivery
                            ? formatDate(po.expectedDelivery)
                            : "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => handleViewPO(po)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Ver Detalhes
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEditPO(po)}
                                disabled={po.status !== "draft"}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDuplicatePO(po)}
                              >
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleSendPO(po)}
                                disabled={po.status !== "draft"}
                              >
                                <Send className="mr-2 h-4 w-4" />
                                Enviar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleConfirmPO(po)}
                                disabled={po.status !== "sent"}
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Confirmar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleReceivePO(po)}
                                disabled={
                                  po.status !== "confirmed" &&
                                  po.status !== "sent"
                                }
                              >
                                <PackageCheck className="mr-2 h-4 w-4" />
                                Receber
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handlePrintPO(po)}
                              >
                                <Printer className="mr-2 h-4 w-4" />
                                Imprimir
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleExportPO(po)}
                              >
                                <FileDown className="mr-2 h-4 w-4" />
                                Exportar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleCancelPO(po)}
                                disabled={
                                  po.status === "received" ||
                                  po.status === "cancelled"
                                }
                                className="text-red-600"
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancelar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeletePO(po.id)}
                                disabled={po.status !== "draft"}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAlertsTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Buscar alertas..."
              className="pl-8"
              value={alertFilters.searchTerm}
              onChange={(e) =>
                setAlertFilters({
                  ...alertFilters,
                  searchTerm: e.target.value,
                })
              }
            />
          </div>

          <Select
            value={alertFilters.type}
            onValueChange={(value) =>
              setAlertFilters({
                ...alertFilters,
                type: value as AlertType | "all",
              })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de Alerta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos Tipos</SelectItem>
              <SelectItem value="low-stock">Estoque Baixo</SelectItem>
              <SelectItem value="expiring">Próximo da Validade</SelectItem>
              <SelectItem value="expired">Expirado</SelectItem>
              <SelectItem value="price-change">Alteração de Preço</SelectItem>
              <SelectItem value="delivery-delay">Atraso na Entrega</SelectItem>
              <SelectItem value="quality-issue">
                Problema de Qualidade
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={alertFilters.status}
            onValueChange={(value) =>
              setAlertFilters({
                ...alertFilters,
                status: value as "all" | "read" | "unread",
              })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos Status</SelectItem>
              <SelectItem value="read">Lidos</SelectItem>
              <SelectItem value="unread">Não Lidos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleMarkAllAlertsAsRead}
          >
            <CheckCheck className="h-4 w-4" />
            Marcar Todos como Lidos
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2 text-red-600"
            onClick={handleClearAllAlerts}
          >
            <Trash2 className="h-4 w-4" />
            Limpar Todos
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <Card className="p-8">
            <div className="flex flex-col items-center justify-center text-center">
              <Bell className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">
                Nenhum alerta encontrado
              </h3>
              <p className="text-gray-500">
                Não há alertas que correspondam aos seus filtros.
              </p>
            </div>
          </Card>
        ) : (
          filteredAlerts.map((alert) => {
            const item = stockItems.find((i) => i.id === alert.itemId);

            return (
              <Card
                key={alert.id}
                className={`overflow-hidden ${!alert.isRead ? "border-l-4 border-l-amber-500" : ""
                  }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-full ${getAlertTypeColor(
                          alert.type
                        )}`}
                      >
                        {alert.type === "low-stock" ? (
                          <AlertTriangle className="h-5 w-5" />
                        ) : alert.type === "expiring" ||
                          alert.type === "expired" ? (
                          <Clock className="h-5 w-5" />
                        ) : alert.type === "price-change" ? (
                          <DollarSign className="h-5 w-5" />
                        ) : alert.type === "delivery-delay" ? (
                          <Truck className="h-5 w-5" />
                        ) : (
                          <AlertCircle className="h-5 w-5" />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">
                            {getAlertTypeLabel(alert.type)}
                          </h4>
                          {!alert.isRead && (
                            <Badge
                              variant="outline"
                              className="bg-amber-100 text-amber-800 text-xs"
                            >
                              Novo
                            </Badge>
                          )}
                        </div>

                        <p className="text-gray-600 mt-1">{alert.message}</p>

                        {item && (
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Package className="h-4 w-4 mr-1" />
                            <span>{item.name}</span>
                          </div>
                        )}

                        <div className="text-xs text-gray-400 mt-2">
                          {formatDateTime(alert.date)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {alert.type === "low-stock" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs hover:bg-amber-100 hover:text-amber-800 transition-colors"
                          onClick={() => {
                            setSelectedItem(item);
                            setIsAddTransactionModalOpen(true);
                          }}
                        >
                          <RefreshCw className="w-3 h-3 mr-1" /> Repor
                        </Button>
                      )}

                      {!alert.isRead ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8"
                          onClick={() => handleMarkAlertAsRead(alert.id)}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Marcar como Lido
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8"
                          onClick={() => handleMarkAlertAsUnread(alert.id)}
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Marcar como Não Lido
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-red-600"
                        onClick={() => handleDeleteAlert(alert.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gestão de Estoque</h1>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="flex border-b mb-4">
          <TabsTrigger
            value="overview"
            className="px-4 py-2 font-medium transition-colors hover:bg-amber-100 hover:text-amber-800 data-[state=active]:border-b-2 data-[state=active]:border-amber-600"
          >
            Visão Geral
          </TabsTrigger>
          <TabsTrigger
            value="inventory"
            className="px-4 py-2 font-medium transition-colors hover:bg-amber-100 hover:text-amber-800 data-[state=active]:border-b-2 data-[state=active]:border-amber-600"
          >
            Inventário
          </TabsTrigger>
          <TabsTrigger
            value="transactions"
            className="px-4 py-2 font-medium transition-colors hover:bg-amber-100 hover:text-amber-800 data-[state=active]:border-b-2 data-[state=active]:border-amber-600"
          >
            Transações
          </TabsTrigger>
          <TabsTrigger
            value="suppliers"
            className="px-4 py-2 font-medium transition-colors hover:bg-amber-100 hover:text-amber-800 data-[state=active]:border-b-2 data-[state=active]:border-amber-600"
          >
            Fornecedores
          </TabsTrigger>
          <TabsTrigger
            value="purchase-orders"
            className="px-4 py-2 font-medium transition-colors hover:bg-amber-100 hover:text-amber-800 data-[state=active]:border-b-2 data-[state=active]:border-amber-600"
          >
            Pedidos
          </TabsTrigger>
          <TabsTrigger
            value="alerts"
            className="px-4 py-2 font-medium transition-colors hover:bg-amber-100 hover:text-amber-800 data-[state=active]:border-b-2 data-[state=active]:border-amber-600"
          >
            Alertas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {renderOverviewTab()}
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          {renderInventoryTab()}
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          {renderTransactionsTab(  
            transactionPage,
            transactionsPerPage,
            setTransactionPage,
            setTransactionsPerPage)}
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          {renderSuppliersTab()}
        </TabsContent>

        <TabsContent value="purchase-orders" className="space-y-4">
          {renderPurchaseOrdersTab()}
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          {renderAlertsTab()}
        </TabsContent>
      </Tabs>

      {/* Modais */}
      <AddItemModal
       isOpen={isAddItemModalOpen}
       onClose={() => setIsAddItemModalOpen(false)}
       onItemAdded={handleItemAdded}
      />

      <AddTransactionModal
        isOpen={isAddTransactionModalOpen}
        onClose={setIsAddTransactionModalOpen}
        onTransactionAdded={handleTransactionAdded}
      />

      <AddSupplierModal
        isOpen={isAddSupplierModalOpen}
        onClose={() => setIsAddSupplierModalOpen(false)}
        onAdd={handleAddSupplier}
      />

      <ItemDetailModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
        transactions={selectedItem ? transactions.filter(
          (t) => t.itemId === selectedItem.id
        ) : []}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
        onAddTransaction={handleAddTransaction }
      />

      <EditItemModal
       open={isEditItemModalOpen}
       onOpenChange={setIsEditItemModalOpen}
       item={selectedItemToEdit}
       onItemUpdated={handleItemUpdated}
      />

      <TransactionDetailModal
        isOpen={isViewTransactionModalOpen}
        onClose={() => {
          setIsViewTransactionModalOpen(false);
          setSelectedTransaction(null);
        }}
        transaction={selectedTransaction}
        item={selectedTransaction ? stockItems.find(
          (item) => item.id === selectedTransaction.itemId
        ) : null}
      />

      <EditTransactionModal
        isOpen={isEditTransactionModalOpen}
        onClose={() => {
          setIsEditTransactionModalOpen(false);
          setSelectedTransaction(null);
        }}
        onSave={handleUpdateTransaction}
        transaction={selectedTransaction}
        items={stockItems}
        locations={Array.from(
          new Set(stockItems.map((item) => item.location))
        )}
      />

      <PurchaseOrderDetailModal
        isOpen={isViewPOModalOpen}
        onClose={() => {
          setIsViewPOModalOpen(false);
          setSelectedPO(null);
        }}
        purchaseOrder={selectedPO}
        supplier={selectedPO ? suppliers.find((s) => s.id === selectedPO.supplierId) : null}
        onStatusChange={handlePOStatusChange}
        onReceive={handleReceivePOItems}
      />

      <EditPurchaseOrderModal
        isOpen={isEditPOModalOpen}
        onClose={() => {
          setIsEditPOModalOpen(false);
          setSelectedPO(null);
        }}
        onSave={handleUpdatePO}
        purchaseOrder={selectedPO}
        suppliers={suppliers}
        items={stockItems}
      />

      <EditSupplierModal
        isOpen={isEditSupplierModalOpen}
        onClose={() => {
          setIsEditSupplierModalOpen(false);
          setSelectedSupplier(null);
        }}
        onSave={handleUpdateSupplier}
        supplier={selectedSupplier}
      />

      <BatchAdjustmentModal
        isOpen={isBatchAdjustmentModalOpen}
        onClose={() => setIsBatchAdjustmentModalOpen(false)}
        onSave={handleBatchAdjustmentSubmit}
        selectedItems={stockItems.filter((item) =>
          selectedBatchItems.includes(item.id)
        )}
      />

      <BatchTransferModal
        isOpen={isBatchTransferModalOpen}
        onClose={() => setIsBatchTransferModalOpen(false)}
        onSave={handleBatchTransferSubmit}
        selectedItems={stockItems.filter((item) =>
          selectedBatchItems.includes(item.id)
        )}
        locations={Array.from(
          new Set(stockItems.map((item) => item.location))
        )}
      />

      <ReceivePOModal
        isOpen={isReceivePOModalOpen}
        onClose={() => {
          setIsReceivePOModalOpen(false);
          setSelectedPO(null);
        }}
        onSave={handleReceivePOSubmit}
        purchaseOrder={selectedPO}
        supplier={selectedPO ? suppliers.find((s) => s.id === selectedPO.supplierId) : null}
      />

      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => {
          setIsQRModalOpen(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
      />

      <POItemsModal
        isOpen={isViewPOItemsModalOpen}
        onClose={() => {
          setIsViewPOItemsModalOpen(false);
          setSelectedPO(null);
        }}
        purchaseOrder={selectedPO}
        items={stockItems}
      />
    </div>
  );
};

// Componentes auxiliares
const getStatusColor = (status: StockItemStatus) => {
  switch (status) {
    case "in-stock":
      return "bg-green-100 text-green-800";
    case "low-stock":
      return "bg-amber-100 text-amber-800";
    case "out-of-stock":
      return "bg-red-100 text-red-800";
    case "expired":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusLabel = (status: StockItemStatus) => {
  switch (status) {
    case "in-stock":
      return "Em Estoque";
    case "low-stock":
      return "Estoque Baixo";
    case "out-of-stock":
      return "Esgotado";
    case "expired":
      return "Expirado";
    default:
      return status;
  }
};

const getTransactionTypeColor = (type: TransactionType) => {
  switch (type) {
    case "in":
      return "bg-green-100 text-green-800";
    case "out":
      return "bg-blue-100 text-blue-800";
    case "transfer":
      return "bg-purple-100 text-purple-800";
    case "adjustment":
      return "bg-amber-100 text-amber-800";
    case "waste":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getTransactionTypeLabel = (type: TransactionType) => {
  switch (type) {
    case "in":
      return "Entrada";
    case "out":
      return "Saída";
    case "transfer":
      return "Transferência";
    case "adjustment":
      return "Ajuste";
    case "waste":
      return "Desperdício";
    default:
      return type;
  }
};

const getPOStatusColor = (status: PurchaseOrder["status"]) => {
  switch (status) {
    case "draft":
      return "bg-gray-100 text-gray-800";
    case "sent":
      return "bg-blue-100 text-blue-800";
    case "confirmed":
      return "bg-amber-100 text-amber-800";
    case "received":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPOStatusLabel = (status: PurchaseOrder["status"]) => {
  switch (status) {
    case "draft":
      return "Rascunho";
    case "sent":
      return "Enviado";
    case "confirmed":
      return "Confirmado";
    case "received":
      return "Recebido";
    case "cancelled":
      return "Cancelado";
    default:
      return status;
  }
};

const getAlertTypeColor = (type: AlertType) => {
  switch (type) {
    case "low-stock":
      return "bg-amber-100 text-amber-800";
    case "expiring":
      return "bg-orange-100 text-orange-800";
    case "expired":
      return "bg-red-100 text-red-800";
    case "price-change":
      return "bg-blue-100 text-blue-800";
    case "delivery-delay":
      return "bg-purple-100 text-purple-800";
    case "quality-issue":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getAlertTypeLabel = (type: AlertType) => {
  switch (type) {
    case "low-stock":
      return "Estoque Baixo";
    case "expiring":
      return "Próximo da Validade";
    case "expired":
      return "Item Expirado";
    case "price-change":
      return "Alteração de Preço";
    case "delivery-delay":
      return "Atraso na Entrega";
    case "quality-issue":
      return "Problema de Qualidade";
    default:
      return type;
  }
};

export default Stock;

