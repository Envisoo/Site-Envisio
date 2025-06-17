import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { MenuItem } from '../types';
import { Clock, Check } from 'lucide-react';


export interface Order {
  id: string;
  item: MenuItem;
  quantity: number;
  total: number;
  timeRemaining: number;
  status: 'pending' | 'delivered';
  tableNumber: string; 
  notes: string;
}

const formatKwanza = (value: number): string => {
  return value.toLocaleString('pt-AO') + ' Kz';
};

const groupOrdersByTable = (orders: Order[]) => {
  const grouped = orders
    .filter(order => order.status === 'pending')
    .reduce((acc, order) => {
      const table = order.tableNumber;
      if (!acc[table]) {
        acc[table] = [];
      }
      acc[table].push(order);
      return acc;
    }, {} as Record<string, Order[]>);

  return Object.entries(grouped).sort((a, b) => 
    parseInt(a[0]) - parseInt(b[0])
  );
};

const calculateTableTotal = (orders: Order[]) => {
  return orders.reduce((acc, order) => acc + order.total, 0);
};

export const OrderSystem: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  
  const [tables] = React.useState([
    { id: '1', number: 1 },
    { id: '2', number: 2 },
    { id: '3', number: 3 },
    { id: '4', number: 4 },
    { id: '5', number: 5 },
    { id: '6', number: 6 }
  ]);
  
  const [selectedTable, setSelectedTable] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState<MenuItem | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [notes, setNotes] = React.useState('');
  const [orders, setOrders] = React.useState<Order[]>(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  React.useEffect(() => {
    if (location.state?.selectedItem) {
      setSelectedItem(location.state.selectedItem);
    }
  }, [location.state]);

  React.useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setOrders(prevOrders => 
        prevOrders.map(order => ({
          ...order,
          timeRemaining: order.status === 'pending' && order.timeRemaining > 0 
            ? order.timeRemaining - 1 
            : order.timeRemaining
        }))
      );
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleQuantityChange = (value: number) => {
    if (quantity + value > 0) {
      setQuantity(quantity + value);
    }
  };

  const handleSubmitOrder = () => {
    if (!selectedItem || !selectedTable || !user) return;

    const newOrder = {
      id: Date.now().toString(),
      item: selectedItem,
      quantity: quantity,
      total: selectedItem.price * quantity,
      timeRemaining: 20,
      status: 'pending' as const,
      tableNumber: selectedTable,
      notes: notes
    };

    setOrders(prev => [...prev, newOrder]);
    setQuantity(1);
    setNotes('');
    alert('Pedido adicionado com sucesso!');
  };

  const handleOrderDelivered = (orderId: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'delivered' as const } 
          : order
      )
    );
    alert('Pedido recebido com sucesso!');
  };

  if (!selectedItem && !orders.length) {
    return (
      <div className="text-center py-8">
        <p>Nenhum item selecionado. Por favor, escolha um item do menu.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700"
        >
          Voltar ao Menu
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {selectedItem && (
          <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
            <h2 className="text-2xl font-serif mb-6 text-amber-800 text-center">Novo Pedido</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <img
                  src={selectedItem.image_url}
                  alt={selectedItem.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-semibold">{selectedItem.name}</h3>
                  <p className="text-gray-600">{selectedItem.description}</p>
                  <p className="text-amber-600 font-medium">{formatKwanza(selectedItem.price)}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mesa</label>
                <select
                  value={selectedTable}
                  onChange={(e) => setSelectedTable(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200"
                >
                  <option value="">Selecione uma mesa</option>
                  {tables.map((table) => (
                    <option key={table.id} value={table.number}>Mesa {table.number}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantidade</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full hover:bg-amber-200"
                  >-</button>
                  <span className="text-xl font-bold">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full hover:bg-amber-200"
                  >+</button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200"
                  placeholder="Algum pedido especial?"
                />
              </div>

              <div className="border-t pt-4">
                <p className="text-xl font-semibold mb-4 text-center">
                  Total: {formatKwanza(selectedItem.price * quantity)}
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate('/')}
                    className="flex-1 py-3 px-6 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
                  >
                    Voltar ao Menu
                  </button>
                  <button
                    onClick={handleSubmitOrder}
                    disabled={!selectedTable}
                    className="flex-1 py-3 px-6 rounded-full bg-amber-600 text-white hover:bg-amber-700 transition-colors disabled:bg-gray-400"
                  >
                    Adicionar Pedido
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-serif mb-6 text-amber-800 text-center">Pedidos por Mesa</h2>
          
          {orders.length > 0 ? (
            <div className="space-y-8">
              {groupOrdersByTable(orders).map(([tableNumber, tableOrders]) => (
                <div key={tableNumber} className="border rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-amber-800 mb-4">
                    Mesa {tableNumber}
                  </h3>
                  
                  <div className="space-y-4">
                    {tableOrders.map((order) => (
                      <div key={order.id} className="border-b pb-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-lg">{order.item.name}</h4>
                              <p className="text-sm text-gray-600">Quantidade: {order.quantity}</p>
                              {order.notes && (
                                <p className="text-sm text-gray-600 italic">
                                  Observações: {order.notes}
                                </p>
                              )}
                              <p className="text-amber-600 font-medium">Total: {formatKwanza(order.total)}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <div className="flex items-center text-amber-600">
                                <Clock className="w-5 h-5 mr-1" />
                                <span>{order.timeRemaining} min</span>
                              </div>
                              <button
                                onClick={() => handleOrderDelivered(order.id)}
                                className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                              >
                                <Check className="w-4 h-4" />
                                Recebido
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-2 text-right font-semibold text-amber-800">
                      Total Mesa {tableNumber}: {formatKwanza(calculateTableTotal(tableOrders))}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="text-right text-lg font-semibold border-t pt-4">
                Total Geral: {formatKwanza(orders
                  .filter(order => order.status === 'pending')
                  .reduce((acc, order) => acc + order.total, 0))}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Nenhum pedido realizado ainda</p>
          )}
        </div>
      </div>
    </div>
  );
};