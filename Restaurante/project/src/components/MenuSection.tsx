import React from 'react';
import { MenuSection as MenuSectionType } from '../types/menu';
import { Leaf, Wheat, Sprout } from 'lucide-react';

interface MenuSectionProps {
  section: MenuSectionType;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ section }) => {
  return (
    <section id={section.id} className="mb-12">
      <h2 className="text-3xl font-serif mb-6 text-amber-800 border-b border-amber-200 pb-2">
        {section.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {section.items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                <span className="text-lg font-medium text-amber-600">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <p className="text-gray-600 mb-3">{item.description}</p>
              {item.dietary && (
                <div className="flex gap-2">
                  {item.dietary.vegetarian && (
                    <span title="Vegetarian" className="text-green-600">
                      <Leaf size={20} />
                    </span>
                  )}
                  {item.dietary.vegan && (
                    <span title="Vegan" className="text-green-700">
                      <Sprout size={20} />
                    </span>
                  )}
                  {item.dietary.glutenFree && (
                    <span title="Gluten Free" className="text-amber-700">
                      <Wheat size={20} />
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};