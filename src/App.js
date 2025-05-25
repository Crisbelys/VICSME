import React, { useState } from 'react';
import { CartProvider } from './utils/cartContext';
import { AuthProvider } from './utils/authContext';
import LoveHeader from './components/LoveHeader';
import LoveChatButton from './components/LoveChatButton';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SearchResultsPage from './pages/SearchResultsPage';
import ImageSearchPage from './pages/ImageSearchPage';
import ContactPage from './pages/ContactPage';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');

  const renderView = () => {
    switch(currentView) {
      case 'products':
        return <ProductsPage />;
      case 'cart':
        return <CartPage setCurrentView={setCurrentView} />;
      case 'login':
        return <LoginPage setCurrentView={setCurrentView} />;
      case 'register':
        return <RegisterPage setCurrentView={setCurrentView} />;
      case 'reset':
        return <ResetPasswordPage setCurrentView={setCurrentView} />;
      case 'search':
        return <SearchResultsPage searchTerm={searchTerm} />;
      case 'imageSearch':
        return <ImageSearchPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return <HomePage setCurrentView={setCurrentView} />; // Pasar setCurrentView
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-pink-50">
          <LoveHeader setCurrentView={setCurrentView} setSearchTerm={setSearchTerm} />
          <div className="transition-all duration-300 ease-in-out">
            {renderView()}
          </div>
          <LoveChatButton />
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;

// DONE