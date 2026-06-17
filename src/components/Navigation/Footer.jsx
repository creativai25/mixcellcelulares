import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

const categories = [
  { label: 'Celulares', slug: 'celulares' },
  { label: 'Celulares para Idosos', slug: '60-mais' },
  { label: 'Películas', slug: 'peliculas' },
  { label: 'Cabos', slug: 'cabos' },
  { label: 'Suportes Veiculares', slug: 'suportes' },
  { label: 'Acessórios em Geral', slug: 'acessorios' },
];

const services = [
  { label: 'Conserto de iPhone', slug: 'servicos/conserto-iphone-canoas' },
  { label: 'Troca de Tela', slug: 'servicos/troca-tela-canoas' },
  { label: 'Serviços', slug: 'servicos' },
];

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
              <span className="footer__logo-by">by Creativ AI</span>
            </div>
            <p className="footer__tagline">
              Tudo num lugar só. Você economiza tempo<br />
              e compra com confiança, indicado por quem conserta.
            </p>
            <div className="footer__rating">
              <span className="footer__stars">★★★★★</span>
              <span>4.9 · 88 avaliações · Canoas/RS</span>
            </div>
            <button
              className="btn btn--whatsapp btn--sm footer__wa"
              onClick={() => window.open('https://wa.me/5551983215850', '_blank')}
            >
              Falar no WhatsApp
            </button>
          </div>

          {/* Categorias */}
          <div className="footer__col">
            <h4 className="footer__col-title">Categorias</h4>
            <ul className="footer__links">
              {categories.map(c => (
                <li key={c.slug}>
                  <button onClick={() => navigate(`/loja/${c.slug}`)}>{c.label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Serviços */}
          <div className="footer__col">
            <h4 className="footer__col-title">Serviços</h4>
            <ul className="footer__links">
              {services.map(s => (
                <li key={s.slug}>
                  <button onClick={() => navigate(`/${s.slug}`)}>{s.label}</button>
                </li>
              ))}
            </ul>
            <h4 className="footer__col-title" style={{ marginTop: 20 }}>Institucional</h4>
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
              Rua Júlio de Castilhos, 634<br />
              Canoas / RS<br /><br />
              WhatsApp: (51) 98321-5850<br />
              mixassistencia@gmail.com<br />
              <a href="https://www.instagram.com/mixcellassistencia/" target="_blank" rel="noreferrer">@mixcellassistencia</a><br /><br />
              Seg a Sex: 9h–12h e 14h–17h<br />
              Sábado: 9h–12h
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
          <span>© {year} Mix Cell Celulares · Todos os direitos reservados</span>
          <span className="footer__affiliate">
            Alguns links geram comissão para a Mix Cell, sem custo extra para você.
          </span>
        </div>
      </div>
    </footer>
  );
}
