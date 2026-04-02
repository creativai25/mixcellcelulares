import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';
import { ArrowRight } from 'lucide-react';
import ErrorBoundary from '../components/ErrorBoundary';

// Sections
import AboutUs from '../components/Sections/AboutUs';
import Services from '../components/Sections/Services';
import StoreCategories from '../components/Sections/StoreCategories';
import RepairVideos from '../components/Sections/RepairVideos';
import GuaranteeFAQ from '../components/Sections/GuaranteeFAQ';
import Footer from '../components/Navigation/Footer';

import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* ── HERO SECTION ── */}
      <section className="hero-section">
        <div className="hero-content animate-fade-up">
          <div className="hero-badge">A mais bem avaliada de Niterói, Canoas</div>
          <h1 className="hero-title">
            Especialistas em <span className="text-gradient">Celulares</span> & Acessórios
          </h1>
          <p className="hero-subtitle">
            Mais de 15.000 aparelhos consertados em quase 11 anos de confiança. Buscamos e entregamos seu celular.
          </p>
          <div className="hero-product-tags">
            <span className="product-tag">📱 Capas</span>
            <span className="product-tag">🔌 Carregadores & Cabos</span>
            <span className="product-tag">🛡️ Películas</span>
            <span className="product-tag">🎧 Fones de Ouvido</span>
            <span className="product-tag">🎮 Acessórios Variados</span>
          </div>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => document.getElementById('servicos').scrollIntoView({ behavior: 'smooth' })}>
              Agendar Conserto <ArrowRight size={18} />
            </button>
            <button className="btn-secondary" onClick={() => document.getElementById('sobre').scrollIntoView({ behavior: 'smooth' })}>
              Ver Produtos
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">15k+</span>
              <span className="stat-text">Aparelhos Consertados</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">11</span>
              <span className="stat-text">Anos de Mercado</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">4.9★</span>
              <span className="stat-text">Avaliações Google</span>
            </div>
          </div>
        </div>

        {/* ── 3D SPLINE CANVAS ── */}
        <div className="hero-3d">
          <div className="spline-wrapper">
             <ErrorBoundary>
               <Suspense fallback={<div className="spline-loader">Carregando Experiência 3D...</div>}>
                 {/* Using a verified working Spline URL (Abstract/Tech Shape) as placeholder */}
                 <Spline scene="https://prod.spline.design/njJoJIbfuITTDMkl/scene.splinecode" />
               </Suspense>
             </ErrorBoundary>
          </div>
        </div>
      </section>

      {/* ── IMPORTED PAGE SECTIONS ── */}
      <StoreCategories />
      <AboutUs />
      <Services />
      <RepairVideos />
      <GuaranteeFAQ />
      <Footer />
      
    </div>
  );
};

export default Home;
