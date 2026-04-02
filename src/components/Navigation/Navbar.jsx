import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Connect to global search context
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-text">
            <span className="logo-mix">MIX</span>
            <span className="logo-cell">CELL</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-links desktop-only">
          <a href="#loja" className="nav-link">Loja</a>
          <a href="#servicos" className="nav-link">Serviços</a>
          <a href="#sobre" className="nav-link">Sobre</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </nav>

        {/* Global Search Bar */}
        <form className="navbar-search desktop-only" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar capas, películas, serviços..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <Search size={18} />
          </button>
        </form>

        {/* Actions (Cart & Auth) */}
        <div className="navbar-actions">
          <button className="icon-btn" aria-label="Minha Conta">
            <User size={22} />
          </button>
          <button className="icon-btn cart-btn" aria-label="Carrinho">
            <ShoppingCart size={22} />
            <span className="cart-badge">0</span>
          </button>
          
          {/* Mobile Menu Toggle */}
          <button className="icon-btn mobile-only menu-toggle" onClick={toggleMenu} aria-label="Menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <form className="mobile-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit"><Search size={18} /></button>
        </form>
        <a href="#loja" className="mobile-link" onClick={toggleMenu}>Loja</a>
        <a href="#servicos" className="mobile-link" onClick={toggleMenu}>Serviços de Conserto</a>
        <a href="#sobre" className="mobile-link" onClick={toggleMenu}>Sobre nós</a>
        <a href="#faq" className="mobile-link" onClick={toggleMenu}>FAQ & Garantias</a>
      </div>
    </header>
  );
};

export default Navbar;
