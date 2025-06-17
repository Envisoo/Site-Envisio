export type UserRole = 'customer' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface MenuItem {
  category: string;
  image_url: string | undefined;
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  dietaryInfo?: {
    vegetarian?: boolean;
    vegan?: boolean;
    glutenFree?: boolean;
  };
}

export interface MenuCategory {
  id: string;
  name: string;
  displayOrder: number;
}

export interface Table {
  id: string;
  number: number;
  capacity: number;
  isActive: boolean;
}

export interface Order {
  timeRemaining: number;
  id: string;
  tableId: string;
  userId: string;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  totalAmount: number;
  notes?: string;
  items: OrderItem[]; // Corrigido para usar a interface OrderItem
  createdAt: string;
}

export interface OrderItem {
  menu_item: unknown;
  id: string;
  menuItemId: string;
  quantity: number;
  unitPrice: number;
  notes?: string;
  menuItem?: MenuItem; // Esta é a propriedade correta para usar
}

export interface Review {
  id: string;
  userId: string;
  content: string;
  rating: number;
  createdAt: string;
  user?: {
    fullName: string;
  };
}

export interface Reservation {
  id: string;
  userId: string;
  tableId: string;
  reservationDate: string;
  reservationTime: string;
  partySize: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  profile?: User; // Substituído "profile: any" por "profile?: User"
}