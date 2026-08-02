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

        {/* ── CATEGORIES (Shopee-style circles) ── */}
        <section className="cat-section container reveal">
          <div className="cat-section__header">
            <h2 className="cat-section__title">Categorias</h2>
            <button className="cat-section__more" onClick={() => navigate('/loja')}>
              Ver todas →
            </button>
          </div>
          <div className="cat-row">
            {categories.map((cat) => {
              const IconComp = Icons[cat.icon] || Icons.HelpCircle;
              return (
                <div
                  key={cat.slug}
                  className="cat-circle"
                  onClick={() => navigate(`/loja/${cat.slug}`)}
                  style={{ '--cat-color': cat.color }}
                >
                  <div className="cat-circle__icon">
                    <IconComp size={22} />
                  </div>
                  <span className="cat-circle__label">{cat.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── PRODUCTS EDITORIAL GRID ── */}
        <section className="products-section container reveal">
          <div className="products-section__header">
            <div>
              <h2 className="products-section__title">Ofertas do Dia</h2>
              <p className="products-section__sub">Curadoria nos maiores marketplaces — sem custo extra para você</p>
            </div>
            <button className="btn btn--outline btn--sm" onClick={() => navigate('/loja')}>
              Ver loja →
            </button>
          </div>

          <div className="editorial-grid">
            {displayProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                variant="default"
              />
            ))}
          </div>
        </section>

        {/* ── TRUST ── */}
        <TrustSection />

      </div>
    </PageWrapper>
  );
}
