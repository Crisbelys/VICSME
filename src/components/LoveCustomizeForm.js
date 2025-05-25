import React, { useState } from 'react';

const LoveCustomizeForm = () => {
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('pink');

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-pink-800 mb-4">Personaliza tu regalo</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje personalizado</label>
          <textarea 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            rows="3"
            placeholder="Escribe un mensaje especial..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Color del empaque</label>
          <div className="flex space-x-2">
            {['pink', 'red', 'gold', 'silver'].map((c) => (
              <button
                key={c}
                className={`w-8 h-8 rounded-full ${color === c ? 'ring-2 ring-offset-2 ring-pink-500' : ''}`}
                style={{ backgroundColor: getColorValue(c) }}
                onClick={() => setColor(c)}
              ></button>
            ))}
          </div>
        </div>
        
        <button className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors mt-4">
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

function getColorValue(color) {
  const colors = {
    pink: '#ec4899',
    red: '#ef4444',
    gold: '#f59e0b',
    silver: '#9ca3af'
  };
  return colors[color];
}

export default LoveCustomizeForm;