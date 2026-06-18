import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { categories } from '../../data/categories';
import './Navbar.css';

const navLinks = [
  { label: 'Guia de Linhas', href: '/linhas' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Sobre', href: '/sobre' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false); // dropdown mobile
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setCatOpen(false); }, [location]);

  const go = (path) => { navigate(path); setMenuOpen(false); setCatOpen(false); };

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">

        {/* Logo */}
        <button className="navbar__logo" onClick={() => navigate('/')}>
          <span className="navbar__logo-mix">MIXCELL</span>
          <span className="navbar__logo-by">by Creativ AI</span>
        </button>

        {/* Desktop links */}
        <div className="navbar__links hide-mobile">
          {/* Dropdown Categorias */}
          <div className="navbar__dropdown">
            <button className={`navbar__link navbar__link--drop${location.pathname.startsWith('/loja') ? ' active' : ''}`}>
              Categorias <ChevronDown size={15} className="navbar__chevron" />
            </button>
            <div className="navbar__dropdown-panel">
              <div className="navbar__dropdown-grid">
                {categories.map((c) => (
                  <button key={c.slug} className="navbar__dropdown-item" onClick={() => navigate(`/loja/${c.slug}`)}>
                    {c.label}
                  </button>
                ))}
              </div>
              <button className="navbar__dropdown-all" onClick={() => navigate('/loja')}>
                Ver loja completa →
              </button>
            </div>
          </div>

          {navLinks.map(link => (
            <button
              key={link.href}
              className={`navbar__link${location.pathname.startsWith(link.href) ? ' active' : ''}`}
              onClick={() => navigate(link.href)}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="navbar__actions hide-mobile">
          <button className="btn btn--outline btn--sm" onClick={() => navigate('/loja')}>
            Ver loja
          </button>
          <button
            className="btn btn--whatsapp btn--sm"
            onClick={() => window.open('https://wa.me/5551983215850', '_blank')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="navbar__hamburger hide-desktop"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`hamburger-line${menuOpen ? ' open' : ''}`} />
          <span className={`hamburger-line${menuOpen ? ' open' : ''}`} />
          <span className={`hamburger-line${menuOpen ? ' open' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          {/* Categorias expansível */}
          <button
            className="navbar__mobile-link navbar__mobile-cat-toggle"
            onClick={() => setCatOpen(!catOpen)}
          >
            Categorias <ChevronDown size={16} style={{ transform: catOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
          </button>
          {catOpen && (
            <div className="navbar__mobile-cats">
              {categories.map((c) => (
                <button key={c.slug} className="navbar__mobile-sublink" onClick={() => go(`/loja/${c.slug}`)}>
                  {c.label}
                </button>
              ))}
            </div>
          )}

          {navLinks.map(link => (
            <button key={link.href} className="navbar__mobile-link" onClick={() => go(link.href)}>
              {link.label}
            </button>
          ))}
          <div className="navbar__mobile-actions">
            <button className="btn btn--primary" onClick={() => go('/loja')}>Ver loja completa</button>
            <button className="btn btn--whatsapp" onClick={() => window.open('https://wa.me/5551983215850','_blank')}>
              Falar no WhatsApp
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
