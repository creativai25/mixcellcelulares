import React from 'react';
import { MessageCircle } from 'lucide-react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const phoneNumber = "5551983215850"; // Formatted with country code +55
  const message = encodeURIComponent("Olá! Gostaria de saber mais sobre os serviços da Mix Cell.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="whatsapp-float-btn"
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle size={32} />
      <span className="whatsapp-badge">1</span>
      <span className="whatsapp-tooltip">Fale Conosco!</span>
    </a>
  );
};

export default WhatsAppButton;
