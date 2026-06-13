import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import './CookieBanner.css';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('mixcell_cookie_consent');
    if (!consent) {
      // Pequeno atraso para aparecer de forma elegante
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (accepted) => {
    localStorage.setItem('mixcell_cookie_consent', accepted ? 'accepted' : 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner reveal visible">
      <div className="cookie-banner__inner container">
        <div className="cookie-banner__content">
          <div className="cookie-banner__icon-wrapper hide-mobile">
            <Shield size={24} className="text-sky" />
          </div>
          <p className="cookie-banner__text">
            Nós utilizamos cookies para melhorar sua experiência e direcionar links de afiliados corretos. 
            Ao continuar navegando, você concorda com a nossa{' '}
            <a href="/privacidade" className="cookie-banner__link">Política de Privacidade</a> e nossos{' '}
            <a href="/termos" className="cookie-banner__link">Termos de Uso</a>.
          </p>
        </div>
        <div className="cookie-banner__actions">
          <button 
            className="btn btn--outline btn--sm cookie-banner__btn"
            onClick={() => handleConsent(false)}
          >
            Recusar
          </button>
          <button 
            className="btn btn--primary btn--sm cookie-banner__btn"
            onClick={() => handleConsent(true)}
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
