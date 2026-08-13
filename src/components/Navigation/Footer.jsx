import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">

          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-mix">MIXCELL</span>
              <span className="footer__logo-shop notranslate" translate="no">SHOP</span>
            </div>
            <p className="footer__tagline">
              Tudo num lugar só. Você economiza tempo e compra com confiança — produtos selecionados por quem realmente entende.
            </p>
            <div className="footer__rating">
              <span className="footer__stars">★★★★★</span>
              <span>4.9 no Google · Curadoria de Confiança</span>
            </div>
            <button
              className="btn btn--whatsapp btn--sm footer__wa"
              onClick={() => window.open('https://wa.me/5551983215850', '_blank')}
            >
              Falar no WhatsApp
            </button>
          </div>

          {/* Institucional */}
          <div className="footer__col">
            <h4 className="footer__col-title">Institucional</h4>
            <ul className="footer__links">
              <li><button onClick={() => navigate('/sobre')}>Sobre nós</button></li>
              <li><button onClick={() => navigate('/contato')}>Contato</button></li>
              <li><button onClick={() => navigate('/privacidade')}>Privacidade</button></li>
              <li><button onClick={() => navigate('/termos')}>Termos de uso</button></li>
            </ul>
          </div>

          {/* Contato */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contato</h4>
            <p className="footer__address">
              WhatsApp: (51) 98321-5850<br />
              mixassistencia@gmail.com<br />
              <a href="https://www.instagram.com/mixcellassistencia/" target="_blank" rel="noreferrer">@mixcellassistencia</a>
            </p>
            <div className="footer__badges">
              <span className="footer__badge">✓ Loja verificada</span>
              <span className="footer__badge">✓ Afiliado oficial</span>
              <span className="footer__badge">✓ LGPD</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <span>© {year} Mix Cell Shop · Todos os direitos reservados</span>
          <span className="footer__affiliate">
            Alguns links geram comissão para a Mix Cell, sem custo extra para você.
          </span>
        </div>
      </div>
    </footer>
  );
}
