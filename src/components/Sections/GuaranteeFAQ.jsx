import React, { useState } from 'react';
import { Shield, Clock, AlertTriangle, ChevronDown } from 'lucide-react';
import './GuaranteeFAQ.css';

const GuaranteeFAQ = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'Quanto tempo leva um conserto em média?',
      a: 'Os serviços variam de 1hs até o final do mesmo dia , salvo casos por falta de peça .'
    },
    {
      q: 'Vocês usam peças originais?',
      a: 'As peças são paralelas e de boa qualidade, nacionais e originais*( Verificar disponibilidade ).'
    },
    {
      q: 'Como funciona o serviço de Busca e Entrega?',
      a: 'Para clientes de Canoas e região metropolitana, nosso mensageiro retira o seu aparelho na sua casa ou trabalho, traz para nossa bancada e devolvemos consertado no mesmo dia (para serviços rápidos). Consulte a taxa para o seu CEP.'
    },
    {
      q: 'Posso parcelar o conserto?',
      a: 'Sim! Aceitamos todos os cartões de crédito e parcelamos o seu serviço. No momento do orçamento, mostraremos as opções.'
    }
  ];

  return (
    <section id="faq" className="guarantee-faq-section">
      <div className="gf-container">
        
        {/* ── Guarantee Terms ── */}
        <div className="guarantee-area glass-panel">
          <div className="guarantee-header">
            <Shield size={36} className="text-brand-blue" />
            <h3>Nossa Garantia e Termos</h3>
          </div>
          <p className="guarantee-desc">
            Trabalhamos com transparência. Entenda seus direitos como consumidor na Mix Cell.
          </p>
          
          <div className="guarantee-cards">
            <div className="g-card">
              <Clock size={24} className="g-icon" />
              <h4>90 Dias de Garantia Legal</h4>
              <p>Todo serviço de hardware realizado em nossa bancada possui garantia de 90 dias contra defeitos na peça (excluindo mau uso, queda ou contato com líquidos).</p>
            </div>
            <div className="g-card alert">
              <AlertTriangle size={24} className="g-icon alert-icon" />
              <h4>Aparelhos Abandonados</h4>
              <p>Por questões logísticas e de segurança, aparelhos não retirados ou sem contato do cliente após <strong>90 dias</strong> da finalização do serviço serão descartados ou destinados a reciclagem técnica.</p>
            </div>
          </div>
        </div>

        {/* ── FAQ Accordion ── */}
        <div className="faq-area">
          <h2 className="faq-title">Dúvidas Frequentes</h2>
          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`faq-item ${openFaq === idx ? 'active' : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="faq-question">
                  <h4>{faq.q}</h4>
                  <ChevronDown size={20} className="faq-chevron" />
                </div>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default GuaranteeFAQ;
