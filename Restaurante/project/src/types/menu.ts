
import { MenuSection as ImportedMenuSection } from "../types/menu";
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'appetizers' | 'main' | 'desserts' | 'drinks';
  dietary?: {
    vegetarian?: boolean;
    vegan?: boolean;
    glutenFree?: boolean;
  };
}

export interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
}