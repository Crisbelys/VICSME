import React, { useState } from 'react';
import { useCart } from '../utils/cartContext';

const LoveProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [showHearts, setShowHearts] = useState(false);

  const handleBuyNow = () => {
    const phoneNumber = '523781453913'; // Reemplaza con tu número de WhatsApp
    const message = `¡Hola! Me gustaría comprar el siguiente producto:\n\n- ${product.name} ($${product.offerPrice || product.price})\n\nPor favor, confírmame la disponibilidad y los detalles de pago.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const discountPercentage = product.offerPrice 
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
        {product.offerPrice && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discountPercentage}% {/* Mostrar porcentaje de descuento */}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-pink-800 mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            {product.offerPrice && (
              <span className="font-bold text-gray-500 line-through text-sm">${product.price}</span>
            )}
            <span className="font-bold text-pink-600">${product.offerPrice || product.price}</span>
          </div>
          <button 
            onClick={() => addToCart(product)}
            onMouseEnter={() => setShowHearts(true)}
            onMouseLeave={() => setShowHearts(false)}
            className="w-full bg-pink-100 text-pink-800 px-3 py-1 rounded-lg hover:bg-pink-200 transition-colors text-sm relative overflow-hidden"
          >
            Agregar al carrito
            {showHearts && (
              <>
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-red-500 text-xs animate-heart-pop-left">❤️</span>
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-pink-500 text-xs animate-heart-pop-right animation-delay-100">💖</span>
              </>
            )}
          </button>
          <button 
            onClick={handleBuyNow}
            onMouseEnter={() => setShowHearts(true)}
            onMouseLeave={() => setShowHearts(false)}
            className="w-full bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors text-sm flex items-center justify-center space-x-1 relative overflow-hidden"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.031 1.803c-5.509 0-9.978 4.469-9.978 9.978 0 1.71.436 3.35 1.26 4.78l-1.347 4.924 5.053-1.322c1.392.764 2.985 1.196 4.612 1.196 5.509 0 9.978-4.469 9.978-9.978s-4.469-9.978-9.978-9.978zm0 17.915c-1.493 0-2.92-.405-4.168-1.17l-.3-.179-3.114.815.83-3.038-.196-.312c-.837-1.334-1.287-2.877-1.287-4.495 0-4.617 3.75-8.368 8.368-8.368 2.23 0 4.33.868 5.908 2.446 1.578 1.578 2.446 3.678 2.446 5.908 0 4.618-3.75 8.368-8.368 8.368zm3.54-4.653c-.196-.098-.72-.356-1.003-.444-.283-.087-.49-.131-.7-.131-.21 0-.49.087-.7.131-.21.044-.79.262-.968.444-.179.182-.385.196-.592.098-.207-.098-.49-.175-.697-.262-.207-.087-.395-.207-.553-.35-.159-.142-.319-.35-.478-.557-.159-.207-.319-.395-.444-.602-.124-.207-.013-.319.098-.526.098-.196.21-.49.319-.7.109-.207.142-.35.196-.444.054-.098.027-.175-.013-.262-.044-.087-.395-.956-.54-1.29-.142-.334-.283-.405-.49-.419-.207-.013-.444-.013-.651-.013-.207 0-.525.098-.79.356-.262.262-1.003.989-1.003 2.415 0 1.426 1.03 2.8 1.17 2.985.142.182 2.016 3.088 4.893 4.318 2.04 1.03 2.428.922 2.855.814.427-.109.72-.444.83-1.003.109-.56.109-.989.07-1.003-.044-.013-.13-.057-.283-.131z"/>
            </svg>
            Comprar ahora
            {showHearts && (
              <>
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-red-500 text-xs animate-heart-pop-left">❤️</span>
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-pink-500 text-xs animate-heart-pop-right animation-delay-100">💖</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoveProductCard;

// DONE