import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/Layout/PageWrapper';
import HeroSlider from '../components/Sections/HeroSlider';
import ProductCard from '../components/UI/ProductCard';
import TrustSection from '../components/Sections/TrustSection';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { useScrollReveal } from '../hooks/useScrollReveal';
import * as Icons from 'lucide-react';
import './Home.css';

const promoItems = [
  '🔥 Curadoria semanal de ofertas',
  '📦 Frete grátis nos maiores marketplaces',
  '✅ Afiliados certificados ML, Shopee, Amazon',
  '💰 Menor preço comparado automaticamente',
  '⚡ Novos produtos toda semana',
];

export default function Home() {
  const navigate = useNavigate();
  useScrollReveal();

  const displayProducts = [
    ...products.filter((p) => p.featured && p.active),
    ...products.filter((p) => !p.featured && p.active),
  ];

  return (
    <PageWrapper
      title="Início"
      description="Mix Cell Shop. Loja de afiliados com comparador de preços de celulares e acessórios nos maiores marketplaces do Brasil."
    >
      <div className="home-container">

        {/* ── HERO SLIDER ── */}
        <HeroSlider />

        {/* ── PROMO STRIP ── */}
        <div className="promo-strip" aria-hidden="true">
          <div className="promo-strip__track">
            {[...promoItems, ...promoItems].map((item, i) => (
              <span key={i} className="promo-strip__item">{item}</span>
            ))}
          </div>
        </div>

        {/* ── CATEGORIES ── */}
        <section className="categories-section container reveal">
          <div className="section-header center">
            <span className="badge badge--mix-cell">Navegue por Categoria</span>
            <h2>O que você está procurando?</h2>
            <p className="section-subtitle">Celulares, acessórios e eletrônicos selecionados pelos melhores preços</p>
          </div>

          <div className="categories-grid">
            {categories.slice(0, 8).map((cat) => {
              const IconComp = Icons[cat.icon] || Icons.HelpCircle;
              return (
                <div
                  key={cat.slug}
                  className="category-card"
                  onClick={() => navigate(`/loja/${cat.slug}`)}
                  style={{ '--cat-color': cat.color }}
                >
                  <div className="category-card__icon">
                    <IconComp size={20} />
                  </div>
                  <span className="category-card__label">{cat.label}</span>
                </div>
              );
            })}
          </div>

          <div className="categories-section__footer">
            <button className="btn btn--outline" onClick={() => navigate('/loja')}>
              Ver todas as {categories.length} categorias
            </button>
          </div>
        </section>

        {/* ── PRODUCTS EDITORIAL GRID ── */}
        <section className="products-section container reveal">
          <div className="section-header">
            <div>
              <span className="badge badge--mix-cell">Ofertas em Destaque</span>
              <h2 className="products-section__title">Melhores preços do dia</h2>
              <p className="section-subtitle">Curadoria nos maiores marketplaces do Brasil — sem custo extra para você</p>
            </div>
          </div>

          <div className="editorial-grid">
            {displayProducts.map((prod, idx) => (
              <ProductCard
                key={prod.id}
                product={prod}
                variant={idx === 0 ? 'hero' : 'default'}
              />
            ))}
          </div>

          <div className="products-section__footer">
            <button className="btn btn--outline" onClick={() => navigate('/loja')}>
              Ver loja completa →
            </button>
          </div>
        </section>

        {/* ── TRUST ── */}
        <TrustSection />

      </div>
    </PageWrapper>
  );
}
