import React, { useState } from 'react';

const LoveChatButton = () => {
  const phoneNumber = '523781453913'; // Número de WhatsApp
  const initialMessage = '¡Hola! Tengo una pregunta sobre un regalo...'; // Mensaje inicial opcional

  const handleChatClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(initialMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button 
        onClick={handleChatClick}
        className="bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 1.803c-5.509 0-9.978 4.469-9.978 9.978 0 1.71.436 3.35 1.26 4.78l-1.347 4.924 5.053-1.322c1.392.764 2.985 1.196 4.612 1.196 5.509 0 9.978-4.469 9.978-9.978s-4.469-9.978-9.978-9.978zm0 17.915c-1.493 0-2.92-.405-4.168-1.17l-.3-.179-3.114.815.83-3.038-.196-.312c-.837-1.334-1.287-2.877-1.287-4.495 0-4.617 3.75-8.368 8.368-8.368 2.23 0 4.33.868 5.908 2.446 1.578 1.578 2.446 3.678 2.446 5.908 0 4.618-3.75 8.368-8.368 8.368zm3.54-4.653c-.196-.098-.72-.356-1.003-.444-.283-.087-.49-.131-.7-.131-.21 0-.49.087-.7.131-.21.044-.79.262-.968.444-.179.182-.385.196-.592.098-.207-.098-.49-.175-.697-.262-.207-.087-.395-.207-.553-.35-.159-.142-.319-.35-.478-.557-.159-.207-.319-.395-.444-.602-.124-.207-.013-.319.098-.526.098-.196.21-.49.319-.7.109-.207.142-.35.196-.444.054-.098.027-.175-.013-.262-.044-.087-.395-.956-.54-1.29-.142-.334-.283-.405-.49-.419-.207-.013-.444-.013-.651-.013-.207 0-.525.098-.79.356-.262.262-1.003.989-1.003 2.415 0 1.426 1.03 2.8 1.17 2.985.142.182 2.016 3.088 4.893 4.318 2.04 1.03 2.428.922 2.855.814.427-.109.72-.444.83-1.003.109-.56.109-.989.07-1.003-.044-.013-.13-.057-.283-.131z"/>
        </svg>
      </button>
    </div>
  );
};

export default LoveChatButton;

// DONE