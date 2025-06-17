import { Order } from '../types';

export const groupOrdersByTable = (orders: Order[]) => {
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

export const calculateTableTotal = (orders: Order[]) => {
  return orders.reduce((acc, order) => acc + order.total, 0);
};