import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Pause, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import './HeroSlider.css';

const slides = [
  {
    id: 1,
    badge: 'Curadoria de Confiança',
    title: 'O produto ideal pelo menor preço do dia.',
    subtitle: 'Reunimos celulares e acessórios com melhor custo-benefício num lugar só. Compare preços em todos os marketplaces e economize de verdade.',
    btnPrimary: 'Ver Ofertas da Loja',
    btnPrimaryLink: '/loja',
    btnSecondary: 'Guia de Linhas',
    btnSecondaryLink: '/linhas',
    productImage: 'https://http2.mlstatic.com/D_NQ_NP_702537-MLA100077733515_122025-O.webp',
    productAlt: 'Samsung Galaxy A17 5G',
  },
  {
    id: 2,
    badge: 'Achadinhos Exclusivos',
    title: 'Participe do nosso grupo de promoções.',
    subtitle: 'Receba alertas de preço baixo, cupons de desconto e achados diários diretamente no seu WhatsApp ou Telegram. Sem spam, apenas ofertas reais.',
    btnPrimary: 'Falar no WhatsApp',
    btnPrimaryLink: 'https://wa.me/5551983215850',
    btnSecondary: 'Ver Loja',
    btnSecondaryLink: '/loja',
    productImage: 'https://http2.mlstatic.com/D_NQ_NP_831434-MLA96401363339_102025-O.webp',
    productAlt: 'Apple iPhone 15',
  },
  {
    id: 3,
    badge: 'Menor Preço Garantido',
    title: 'Compare preços em todos os marketplaces.',
    subtitle: 'Verificamos automaticamente onde cada produto está mais barato — Shopee, Mercado Livre, Amazon, Magalu — e te mostramos a melhor oferta do momento.',
    btnPrimary: 'Ver Categorias',
    btnPrimaryLink: '/loja',
    btnSecondary: 'Sobre a Curadoria',
    btnSecondaryLink: '/sobre',
    productImage: 'https://http2.mlstatic.com/D_NQ_NP_673808-MLA99443133132_112025-O.webp',
    productAlt: 'Apple iPhone 16',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const navigate = useNavigate();
  const duration = 6000;

  useEffect(() => {
    if (!isPlaying) return;
    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrent((curr) => (curr + 1) % slides.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);
    return () => clearInterval(timer);
  }, [isPlaying, current]);

  const handleNext = () => { setCurrent((prev) => (prev + 1) % slides.length); setProgress(0); };
  const handlePrev = () => { setCurrent((prev) => (prev - 1 + slides.length) % slides.length); setProgress(0); };
  const handleDotClick = (index) => { setCurrent(index); setProgress(0); };

  const handleCTA = (link) => {
    if (link.startsWith('http')) window.open(link, '_blank');
    else navigate(link);
  };

  const currentSlide = slides[current];

  return (
    <div className="hero-slider">
      <div className="hero-slider__bg">
        <div className="hero-slider__gradient" />
      </div>

      <div className="hero-slider__container container">
        <div className="hero-slider__inner">
          <div className="hero-slider__content animate-fade-in">
            <span className="hero-slider__badge">
              <Sparkles size={13} />
              <span>{currentSlide.badge}</span>
            </span>

            <h1 className="hero-slider__title">{currentSlide.title}</h1>
            <p className="hero-slider__subtitle">{currentSlide.subtitle}</p>

            <div className="hero-slider__buttons">
              <button className="btn btn--primary" onClick={() => handleCTA(currentSlide.btnPrimaryLink)}>
                {currentSlide.btnPrimary} <ArrowRight size={17} />
              </button>
              <button className="btn btn--secondary" onClick={() => handleCTA(currentSlide.btnSecondaryLink)}>
                {currentSlide.btnSecondary}
              </button>
            </div>
          </div>

          {currentSlide.productImage && (
            <div className="hero-slider__product" aria-hidden="true">
              <img
                src={currentSlide.productImage}
                alt={currentSlide.productAlt}
                className="hero-slider__product-img"
              />
            </div>
          )}
        </div>
      </div>

      <button className="hero-slider__arrow hero-slider__arrow--left" onClick={handlePrev} aria-label="Anterior">
        <ChevronLeft size={24} />
      </button>
      <button className="hero-slider__arrow hero-slider__arrow--right" onClick={handleNext} aria-label="Próximo">
        <ChevronRight size={24} />
      </button>

      <div className="hero-slider__controls">
        <button className="hero-slider__play-pause" onClick={() => setIsPlaying(!isPlaying)} aria-label={isPlaying ? 'Pausar' : 'Iniciar'}>
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <div className="hero-slider__dots">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`hero-slider__dot${index === current ? ' active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Slide ${index + 1}`}
            >
              {index === current && (
                <span className="hero-slider__dot-progress" style={{ width: `${progress}%` }} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
