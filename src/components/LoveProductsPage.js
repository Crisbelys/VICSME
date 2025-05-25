import React, { useState } from 'react';
import { products } from '../mock/products';
import LoveProductCard from './LoveProductCard';

const LoveProductsPage = ({ isHomePage = false }) => {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const categories = ['todos', ...new Set(products.map(p => p.category))];

  const filteredProducts = selectedCategory === 'todos' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-12">
      {!isHomePage && (
        <h2 className="text-3xl font-bold text-pink-800 mb-8 text-center">Nuestro Catálogo Completo</h2>
      )}

      {!isHomePage && (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full capitalize ${selectedCategory === category 
                ? 'bg-pink-600 text-white' 
                : 'bg-pink-100 text-pink-800 hover:bg-pink-200'}`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {isHomePage && (
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-pink-700 mb-4">Los más vendidos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map(product => (
              <LoveProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      <div className="mb-8">
        {!isHomePage && <h3 className="text-xl font-semibold text-pink-700 mb-4">Nuestros Productos</h3>}
        <div className={`grid gap-6 ${isHomePage ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
          {(isHomePage ? products.slice(0, 4) : filteredProducts).map(product => (
            <LoveProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoveProductsPage;

// DONE