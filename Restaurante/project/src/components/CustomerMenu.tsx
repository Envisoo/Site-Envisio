import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { MenuItem } from '../types';

// Função para formatar preços em Kwanza
const formatPrice = (price: number) => {
  return price.toLocaleString('pt-AO') + ' Kz';
};

// Títulos e ordem das categorias
const categoryConfig = [
  { id: 'main', title: 'Pratos Principais' },
  { id: 'side', title: 'Acompanhamentos' },
  { id: 'dessert', title: 'Sobremesas' },
  { id: 'drink', title: 'Bebidas' }
];

// Função para obter itens do menu do localStorage
const getMenuItemsFromStorage = (): MenuItem[] => {
  const stored = localStorage.getItem("menuItems");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
};

// Função para organizar itens por categoria
const organizeItemsByCategory = (items: MenuItem[]) => {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);
};

export const CustomerMenu: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory] = useState('all');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(getMenuItemsFromStorage());
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Atualiza o menu quando o localStorage mudar (em tempo real)
  useEffect(() => {
    const handleStorage = () => {
      setMenuItems(getMenuItemsFromStorage());
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Atualiza o menu ao montar o componente
  useEffect(() => {
    setMenuItems(getMenuItemsFromStorage());
  }, []);

  // Função para alternar a expansão das categorias
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Filtragem de itens baseada na busca e categoria selecionada
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Função para lidar com cliques no botão de pedido
  const handleOrderClick = (item: MenuItem) => {
    navigate('/order', { state: { selectedItem: item } });
  };

  // Organiza os itens por categoria
  const organizedItems = organizeItemsByCategory(filteredItems);

  return (
    <div>
      {/* Cabeçalho e Busca */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-amber-800 text-center mb-6">
          Nosso Menu
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Buscar pratos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-amber-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* Lista de Categorias */}
      <div className="space-y-12">
        {categoryConfig.map((category) => {
          const items = organizedItems[category.id] || [];
          const isExpanded = expandedCategories[category.id];
          const displayItems = isExpanded ? items : items.slice(0, 3);
          
          return (
            <div key={category.id} className="space-y-4">
              <h2 className="text-2xl font-serif text-amber-800 border-b border-amber-200 pb-2">
                {category.title}
              </h2>
              
              {/* Grid de Itens do Menu */}
              {items.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayItems.map((item) => (
                      <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <span className="text-amber-600 font-medium whitespace-nowrap">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4 min-h-[3rem]">{item.description}</p>
                          <button
                            onClick={() => handleOrderClick(item)}
                            className="w-full bg-amber-600 text-white py-2 rounded-full hover:bg-amber-700 transition-colors"
                          >
                            Fazer Pedido
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Botão Ver Mais/Menos */}
                  {items.length > 3 && (
                    <div className="text-center">
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="px-6 py-2 bg-amber-100 text-amber-800 rounded-full hover:bg-amber-200 transition-colors"
                      >
                        {isExpanded ? 'Ver menos' : 'Ver mais'}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Nenhum item disponível nesta categoria
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};