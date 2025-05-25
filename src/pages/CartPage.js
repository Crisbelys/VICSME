import React, { useState } from 'react';
import { useCart } from '../utils/cartContext';
import { products } from '../mock/products';

const CartPage = ({ setCurrentView }) => {
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '' // Nuevo campo para notas
  });

  const total = cartItems.reduce((sum, item) => sum + ((item.offerPrice || item.price) * item.quantity), 0); // Calcular total con precio de oferta

  const recommendedProducts = products
    .filter(p => !cartItems.some(ci => ci.id === p.id))
    .slice(0, 3);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleCheckout = () => {
    const phoneNumber = '523781453913'; // Número de WhatsApp actualizado
    
    let message = '¡Hola! Me gustaría hacer un pedido:\n\n';
    cartItems.forEach(item => {
      const priceToUse = item.offerPrice || item.price;
      message += `- ${item.name} x${item.quantity} ($${priceToUse * item.quantity})\n`;
    });
    message += `\nTotal: $${total}`;
    
    message += '\n\nDetalles de Envío:';
    if (shippingDetails.name) message += `\nNombre: ${shippingDetails.name}`;
    if (shippingDetails.phone) message += `\nTeléfono: ${shippingDetails.phone}`;
    if (shippingDetails.address) message += `\nDirección: ${shippingDetails.address}`;
    if (shippingDetails.notes) message += `\nNotas: ${shippingDetails.notes}`; // Incluir notas

    message += '\n\nPor favor, confírmame la disponibilidad y los detalles de pago.';

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-pink-800 mb-8 text-center">Tu Carrito de Compras</h2>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-pink-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-pink-700 mb-2">Tu carrito está vacío</h3>
          <p className="text-gray-600 mb-4">Agrega algunos productos para comenzar</p>
          <button 
            onClick={() => setCurrentView('products')}
            className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors"
          >
            Ver productos
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {cartItems.map(item => (
                <div key={item.id} className="border-b border-gray-200 last:border-0">
                  <div className="p-4 flex flex-col md:flex-row gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full md:w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-grow">
                      <h3 className="font-bold text-pink-800">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-3">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <div className="font-bold text-pink-600">${(item.offerPrice || item.price) * item.quantity}</div> {/* Mostrar precio de oferta o normal */}
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 self-start md:self-center"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-bold text-pink-800 mb-4">Detalles de Envío</h3>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    name="name"
                    value={shippingDetails.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingDetails.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                  <textarea
                    name="address"
                    value={shippingDetails.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                    required
                  ></textarea>
                </div>
                 <div> {/* Nuevo campo de descripción */}
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notas Adicionales</label>
                  <textarea
                    name="notes"
                    value={shippingDetails.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>
              </div>

              <h3 className="text-xl font-bold text-pink-800 mb-4">Resumen de compra</h3>
              <div className="space-y-3 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-gray-600">{item.name} x{item.quantity}</span>
                    <span className="font-medium">${(item.offerPrice || item.price) * item.quantity}</span> {/* Mostrar precio de oferta o normal */}
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-pink-600">${total}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors font-bold"
              >
                Proceder al pago por WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {cartItems.length > 0 && recommendedProducts.length > 0 && (
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-pink-700 mb-6">También te puede interesar</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-pink-800 mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-pink-600">${product.offerPrice || product.price}</span> {/* Mostrar precio de oferta o normal */}
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-pink-600 text-white px-3 py-1 rounded-lg hover:bg-pink-700 transition-colors text-sm"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

// DONE