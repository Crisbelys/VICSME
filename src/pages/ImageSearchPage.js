import React, { useState } from 'react';
import { products } from '../mock/products';
import LoveProductCard from '../components/LoveProductCard';

const ImageSearchPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [results, setResults] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        // Simulación de resultados: mostrar productos aleatorios
        const shuffledProducts = products.sort(() => 0.5 - Math.random());
        setResults(shuffledProducts.slice(0, 4)); // Mostrar 4 resultados aleatorios
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-pink-800 mb-8 text-center">Buscar por Foto</h2>
      
      <div className="flex flex-col items-center mb-8">
        <label className="cursor-pointer bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors font-bold">
          Subir una imagen
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        </label>
        {selectedImage && (
          <img src={selectedImage} alt="Imagen seleccionada" className="mt-6 max-h-64 rounded-lg shadow-md" />
        )}
      </div>

      {selectedImage && results.length > 0 && (
        <>
          <h3 className="text-xl font-semibold text-pink-700 mb-6 text-center">Resultados (Simulados)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map(product => (
              <LoveProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}

      {selectedImage && results.length === 0 && (
         <div className="text-center py-12">
         <svg className="w-16 h-16 mx-auto text-pink-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
         </svg>
         <h3 className="text-xl font-semibold text-pink-700 mb-2">No se encontraron resultados similares</h3>
         <p className="text-gray-600 mb-4">Intenta con otra imagen o busca por palabras clave.</p>
       </div>
      )}
    </div>
  );
};

export default ImageSearchPage;