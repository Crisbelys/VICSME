import React, { useState } from 'react';

const ResetPasswordPage = ({ setCurrentView }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Aquí iría la lógica para enviar el correo de recuperación.
    // Como estamos usando localStorage, esto es solo una simulación.
    // En una aplicación real, se enviaría un email con un enlace único.

    const users = JSON.parse(localStorage.getItem('loveGiftsUsers') || '[]');
    const userExists = users.some(u => u.email === email);

    if (userExists) {
      setMessage('Si tu correo está registrado, recibirás un enlace para restablecer tu contraseña.');
    } else {
      // Para no dar pistas a posibles atacantes, el mensaje es el mismo
      // incluso si el correo no existe.
      setMessage('Si tu correo está registrado, recibirás un enlace para restablecer tu contraseña.');
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-pink-800 mb-6 text-center">Recuperar Contraseña</h2>
        
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {message}
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors"
          >
            Enviar enlace de recuperación
          </button>
        </form>

        <div className="mt-4 text-center">
          <button 
            onClick={() => setCurrentView('login')}
            className="text-pink-600 hover:text-pink-800 text-sm"
          >
            Volver a Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;