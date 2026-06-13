import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/Layout/PageWrapper';
import HeroParticles from '../components/Sections/HeroParticles';
import ScrollRow from '../components/UI/ScrollRow';
import ProductCard from '../components/UI/ProductCard';
import ProductCardWide from '../components/UI/ProductCardWide';
import TrustSection from '../components/Sections/TrustSection';
import VideoSection from '../components/Sections/VideoSection';
import ServicesSection from '../components/Sections/Services';
import GuaranteeFAQ from '../components/Sections/GuaranteeFAQ';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { useCounter } from '../hooks/useCounter';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowRight, Smartphone, ShieldAlert, BadgeCheck } from 'lucide-react';
import * as Icons from 'lucide-react';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  useScrollReveal();


  // Filtra produtos em destaque para exibir no carrossel da Home
  const featuredProducts = products.filter((p) => p.featured && p.active);

  // Encontra o principal produto em destaque (o primeiro com badge "Mix Cell indica") para exibir na Hero
  const heroProduct = products.find((p) => p.featured && p.badge?.toLowerCase().includes('indica')) || products[0];

  // Animação de contadores reais na Hero
  const counterConsertos = useCounter(15234, 2000, true);
  const counterAnos = useCounter(11, 1500, true);
  const counterGoogle = useCounter(49, 1200, true); // dividiremos por 10 para virar 4.9

  return (
    <PageWrapper
      title="Início"
      description="Mix Cell Celulares Canoas/RS. Loja de afiliados com comparador de preços de celulares e acessórios nos maiores marketplaces, além de serviços de conserto de celular."
    >
      <div className="home-container">
        
        {/* ── HERO SECTION (Canvas Partículas + Contadores) ── */}
        <section className="hero-section">
          {/* Partículas flutuantes interconectadas de fundo */}
          <HeroParticles />

          <div className="hero-section__inner container">
            {/* Coluna Esquerda: Mensagem Principal */}
            <div className="hero-content animate-fade-up">
              <span className="hero-badge">
                <BadgeCheck size={14} className="text-sky" />
                <span>Indicação técnica de quem conserta no dia a dia</span>
              </span>
              
              <h1 className="hero-title">
                Quem conserta sabe <span className="text-gradient">o que quebra.</span><br />
                Quem usa sabe <span className="text-gradient">o que dura.</span>
              </h1>
              
              <p className="hero-subtitle">
                Compare preços de celulares, tablets e acessórios nos 5 maiores marketplaces do país. Acesse apenas produtos avaliados de verdade por quem entende de eletrônicos há 11 anos.
              </p>

              <div className="hero-buttons">
                <button className="btn btn--primary" onClick={() => navigate('/loja')}>
                  Ver Loja e Ofertas <ArrowRight size={18} />
                </button>
                <button 
                  className="btn btn--secondary" 
                  onClick={() => document.getElementById('servicos').scrollIntoView({ behavior: 'smooth' })}
                >
                  Solicitar Conserto
                </button>
              </div>

              {/* Estatísticas Animadas */}
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">
                    {counterConsertos.toLocaleString('pt-BR')}+
                  </span>
                  <span className="stat-text">Celulares Consertados</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number">{counterAnos}</span>
                  <span className="stat-text">Anos de Mercado</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number">{(counterGoogle / 10).toFixed(1)}★</span>
                  <span className="stat-text">Avaliação Google</span>
                </div>
              </div>
            </div>

            {/* Coluna Direita: Produto Destaque do Momento */}
            <div className="hero-featured-product animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="hero-featured-card">
                <div className="hero-featured-card__header">
                  <span className="hero-featured-card__badge">Mix Cell Indica</span>
                  <span className="hero-featured-card__label">Melhor Preço do Dia</span>
                </div>
                <ProductCard product={heroProduct} />
              </div>
            </div>
          </div>
        </section>

        {/* ── CATEGORY GRID NAVIGATION ── */}
        <section className="categories-grid-section container reveal">
          <div className="section-header center">
            <span className="badge badge--mix-cell">Navegue por Categoria</span>
            <h2>O que você está procurando?</h2>
            <p className="section-subtitle">Acessórios selecionados e eletrônicos analisados tecnicamente</p>
          </div>

          <div className="categories-grid-container">
            {categories.slice(0, 8).map((cat) => {
              const IconComp = Icons[cat.icon] || Icons.HelpCircle;
              return (
                <div 
                  key={cat.slug} 
                  className="category-card-home card"
                  onClick={() => navigate(`/loja/${cat.slug}`)}
                  style={{ '--cat-color': cat.color }}
                >
                  <div className="category-card-home__icon-wrapper">
                    <IconComp size={28} />
                  </div>
                  <h3 className="category-card-home__title">{cat.label}</h3>
                  <span className="category-card-home__link">Ver ofertas →</span>
                </div>
              );
            })}
          </div>
          <div className="categories-grid-section__footer">
            <button className="btn btn--outline" onClick={() => navigate('/loja')}>
              Ver Todas as {categories.length} Categorias
            </button>
          </div>
        </section>

        {/* ── SCROLL ROW: PRODUTOS EM DESTAQUE ── */}
        <section className="featured-carousel-section container reveal">
          <ScrollRow 
            title="Destaques Recomendados" 
            subtitle="Dispositivos e acessórios indicados de forma independente por nossos técnicos"
          >
            {featuredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </ScrollRow>
        </section>

        {/* ── TRUST SECTION ── */}
        <TrustSection />

        {/* ── ASSISTÊNCIA TÉCNICA (Services Section) ── */}
        <ServicesSection />

        {/* ── VÍDEOS DE REPARO ── */}
        <VideoSection />

        {/* ── FAQ & GARANTIA ── */}
        <GuaranteeFAQ />

      </div>
    </PageWrapper>
  );
}
