import { MenuSection } from "../types/menu";

export const menuData: MenuSection[] = [
  {
    id: 'appetizers',
    title: 'Appetizers',
    items: [
      {
        id: 'bruschetta',
        name: 'Classic Bruschetta',
        description: 'Toasted bread topped with fresh tomatoes, garlic, basil, and olive oil',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f',
        category: 'appetizers',
        dietary: {
          vegetarian: true,
          vegan: true,
        },
      },
      {
        id: 'calamari',
        name: 'Crispy Calamari',
        description: 'Lightly breaded calamari served with marinara sauce',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0',
        category: 'appetizers',
      },
      {
        id: 'caprese',
        name: 'Caprese Salad',
        description: 'Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze',
        price: 10.99,
        image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a',
        category: 'appetizers',
        dietary: {
          vegetarian: true,
        },
      },
    ],
  },
  {
    id: 'main',
    title: 'Main Courses',
    items: [
      {
        id: 'salmon',
        name: 'Grilled Atlantic Salmon',
        description: 'Fresh salmon fillet with lemon herb butter sauce',
        price: 28.99,
        image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927',
        category: 'main',
        dietary: {
          glutenFree: true,
        },
      },
      {
        id: 'risotto',
        name: 'Wild Mushroom Risotto',
        description: 'Creamy Arborio rice with assorted wild mushrooms and parmesan',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371',
        category: 'main',
        dietary: {
          vegetarian: true,
        },
      },
      {
        id: 'steak',
        name: 'Grilled Ribeye Steak',
        description: 'Juicy ribeye steak served with garlic butter and roasted vegetables',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1603360946369-dc9bbd8147df',
        category: 'main',
      },
    ],
  },
  {
    id: 'desserts',
    title: 'Desserts',
    items: [
      {
        id: 'tiramisu',
        name: 'Classic Tiramisu',
        description: 'Coffee-soaked ladyfingers layered with mascarpone cream',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9',
        category: 'desserts',
        dietary: {
          vegetarian: true,
        },
      },
      {
        id: 'cheesecake',
        name: 'New York Cheesecake',
        description: 'Creamy cheesecake with a graham cracker crust',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1578775887804-699de7086ff9',
        category: 'desserts',
        dietary: {
          vegetarian: true,
        },
      },
    ],
  },
  {
    id: 'drinks',
    title: 'Drinks',
    items: [
      {
        id: 'wine',
        name: 'House Red Wine',
        description: 'Selected premium red wine',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3',
        category: 'drinks',
        dietary: {
          vegan: true,
          glutenFree: true,
        },
      },
      {
        id: 'mojito',
        name: 'Classic Mojito',
        description: 'Refreshing cocktail with rum, mint, lime, and soda',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a',
        category: 'drinks',
      },
    ],
  },
];