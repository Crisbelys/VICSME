import React from 'react';

const LoveHero = ({ setCurrentView }) => {
  return (
    <section className="bg-gradient-to-r from-pink-100 to-rose-100 py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold text-pink-800 mb-4">Regalos con amor</h2>
          <p className="text-lg text-pink-600 mb-6">Encuentra el regalo perfecto para celebrar tu amor</p>
          <button 
            onClick={() => setCurrentView('products')}
            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors shadow-lg"
          >
            Descubre nuestros productos
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 bg-pink-300 rounded-full opacity-20 absolute -top-10 -left-10"></div>
            <div className="w-64 h-64 bg-rose-300 rounded-full opacity-20 absolute -bottom-10 -right-10"></div>
            <img 
              src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0dORo8kxGmOcYyX10bjsZMu7Wi9At5EN3G4gT" 
              alt="Pareja feliz" 
              className="relative z-10 rounded-lg shadow-xl w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveHero;