import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import './SearchBar.css';

export default function SearchBar({ initialValue = '', compact = false }) {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/busca?q=${encodeURIComponent(q)}`);
  }

  return (
    <form
      className={`searchbar${compact ? ' searchbar--compact' : ''}`}
      onSubmit={handleSubmit}
      role="search"
    >
      <div className="searchbar__inner">
        <Search className="searchbar__icon" size={compact ? 18 : 22} aria-hidden="true" />
        <input
          className="searchbar__input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={compact ? 'Buscar produto…' : 'Busque qualquer produto — ex: iPhone 15, cabo USB-C, fone…'}
          aria-label="Buscar produto"
          autoComplete="off"
          spellCheck={false}
        />
        <button className="searchbar__btn btn btn--primary" type="submit" aria-label="Pesquisar">
          {compact ? <Search size={16} /> : 'Buscar'}
        </button>
      </div>
    </form>
  );
}
