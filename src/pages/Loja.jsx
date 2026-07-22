import React, { useState, useMemo, useEffect } from 'react';
import PageWrapper from '../components/Layout/PageWrapper';
import ProductCard from '../components/UI/ProductCard';
import CategoryPill from '../components/UI/CategoryPill';
import { products as staticProducts } from '../data/products';
import { categories } from '../data/categories';
import { Search, SlidersHorizontal, Trash2 } from 'lucide-react';
import './Loja.css';

export default function Loja() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dynamicProducts, setDynamicProducts] = useState([]);

  useEffect(() => {
    fetch('/api/catalog')
      .then((r) => r.ok ? r.json() : { products: [] })
      .then((data) => setDynamicProducts(data.products || []))
      .catch(() => {});
  }, []);

  const products = useMemo(() => {
    const staticIds = new Set(staticProducts.map((p) => p.slug));
    const merged = [...staticProducts];
    for (const p of dynamicProducts) {
      if (!staticIds.has(p.slug)) merged.push(p);
    }
    return merged;
  }, [dynamicProducts]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.model.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
      
      return matchesSearch && matchesCategory && p.active;
    });
  }, [searchTerm, selectedCategory]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
  };

  return (
    <PageWrapper
      title="Loja de Afiliados"
      description="Compare preços de celulares, tablets, smartwatches e acessórios nos principais marketplaces do Brasil. Recomendações sinceras de quem realmente conserta."
    >
      <div className="loja-page container">
        {/* Cabeçalho da Página */}
        <div className="loja-page__header">
          <span className="badge badge--mix-cell">Curadoria Técnica</span>
          <h1 className="loja-page__title">Nossa Loja de Afiliados</h1>
          <p className="loja-page__subtitle">
            Todos os produtos listados aqui foram selecionados ou testados em nossa bancada de reparo.
          </p>
        </div>

        {/* Barra de Filtros e Busca */}
        <div className="loja-page__filters">
          <div className="loja-page__search-wrapper">
            <Search className="loja-page__search-icon" size={20} />
            <input
              type="text"
              placeholder="Buscar por marca, modelo ou acessório..."
              className="loja-page__search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Scroll horizontal de pílulas de categorias */}
          <div className="loja-page__category-row">
            <CategoryPill
              category={{ slug: '', label: 'Todos', icon: 'SlidersHorizontal', color: '#3ABEFF' }}
              active={selectedCategory === null}
              onClick={() => setSelectedCategory(null)}
            />
            {categories.map((cat) => (
              <CategoryPill
                key={cat.slug}
                category={cat}
                active={selectedCategory === cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
              />
            ))}
          </div>
        </div>

        {/* Status da listagem */}
        <div className="loja-page__status">
          <span className="loja-page__count">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
          </span>
          {(searchTerm || selectedCategory) && (
            <button className="loja-page__clear-btn" onClick={handleClearFilters}>
              <Trash2 size={14} /> Limpar Filtros
            </button>
          )}
        </div>

        {/* Grid de Produtos */}
        {filteredProducts.length > 0 ? (
          <div className="loja-page__grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="loja-page__empty">
            <div className="loja-page__empty-icon">🔍</div>
            <h3>Nenhum produto encontrado</h3>
            <p>Tente ajustar sua busca ou limpar as seleções de filtros para explorar toda a loja.</p>
            <button className="btn btn--primary" onClick={handleClearFilters}>
              Limpar Filtros e Ver Todos
            </button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
