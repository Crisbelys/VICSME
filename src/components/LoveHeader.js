import React, { useState, useEffect } from 'react';
import { useCart } from '../utils/cartContext';
import { useAuth } from '../utils/authContext';
import { products } from '../mock/products';

const LoveHeader = ({ setCurrentView, setSearchTerm }) => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [searchInputValue, setSearchInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleLogout = () => {
    logout();
    setCurrentView('home');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInputValue.trim()) {
      setSearchTerm(searchInputValue.trim());
      setCurrentView('search');
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInputValue(value);
    if (value.trim()) {
      const filteredSuggestions = products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.description.toLowerCase().includes(value.toLowerCase()) ||
        product.category.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5); // Limitar a 5 sugerencias
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (productName) => {
    setSearchInputValue(productName);
    setSearchTerm(productName);
    setCurrentView('search');
    setShowSuggestions(false);
  };

  const handleSearchByImageClick = () => {
    setCurrentView('imageSearch');
  };

  return (
    <header className="bg-pink-50 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => setCurrentView('home')}
        >
          <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h1 className="text-2xl font-bold text-pink-700">LoveGifts</h1>
        </div>
        <nav className="flex items-center space-x-6">
          <button 
            className="text-pink-600 hover:text-pink-800"
            onClick={() => setCurrentView('home')}
          >
            Inicio
          </button>
          <button 
            className="text-pink-600 hover:text-pink-800"
            onClick={() => setCurrentView('products')}
          >
            Productos
          </button>
          <button 
            className="text-pink-600 hover:text-pink-800"
            onClick={() => setCurrentView('contact')}
          >
            Contacto
          </button>
          
          <div className="relative">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <input
                type="text"
                placeholder="Buscar regalos..."
                value={searchInputValue}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // Retraso para permitir clic
                className="px-3 py-1 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-pink-500 text-sm"
              />
              <button type="submit" className="bg-pink-600 text-white px-3 py-1 rounded-r-lg hover:bg-pink-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-1">
                {suggestions.map(product => (
                  <li 
                    key={product.id} 
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                    onMouseDown={() => handleSuggestionClick(product.name)} // Usar onMouseDown para evitar que onBlur cierre antes
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button 
            onClick={handleSearchByImageClick}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition-colors text-sm flex items-center space-x-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Foto
          </button>

          <button 
            className="relative" 
            onClick={() => setCurrentView('cart')}
          >
            <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-pink-700">{user.email}</span>
              <button 
                onClick={handleLogout}
                className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setCurrentView('login')}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
            >
              Iniciar sesión
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default LoveHeader;