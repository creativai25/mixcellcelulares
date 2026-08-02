import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import './HeroSlider.css';

const slides = [
  {
    id: 1,
    num: '01',
    eyebrow: '🎁 Dia dos Pais — 10 de Agosto',
    title: 'O presente certo\npara quem você ama.',
    subtitle: 'Celulares, fones e acessórios com curadoria especial para a data.',
    cta: 'Ver Presentes',
    ctaLink: '/loja',
    bg: 'linear-gradient(135deg, #1C0800 0%, #3D1500 45%, #1A0600 100%)',
    accent: '#FF6B2B',
    icon: '🎁',
  },
  {
    id: 2,
    num: '02',
    eyebrow: '📱 Celulares 2026',
    title: 'Os melhores celulares\nno menor preço do mercado.',
    subtitle: 'Samsung, iPhone, Motorola e Xiaomi comparados em todos os marketplaces.',
    cta: 'Ver Celulares',
    ctaLink: '/loja/celulares',
    bg: 'linear-gradient(135deg, #020B20 0%, #0A1F55 45%, #020B20 100%)',
    accent: '#3B82F6',
    icon: '📱',
  },
  {
    id: 3,
    num: '03',
    eyebrow: '🎧 Fones & Áudio',
    title: 'Som que você sente.\nPreço que você gosta.',
    subtitle: 'AirPods, Galaxy Buds, JBL e mais com os melhores preços do Brasil.',
    cta: 'Ver Fones',
    ctaLink: '/loja/fones',
    bg: 'linear-gradient(135deg, #0D0520 0%, #220A42 45%, #0D0520 100%)',
    accent: '#A855F7',
    icon: '🎧',
  },
  {
    id: 4,
    num: '04',
    eyebrow: '🛡️ Proteção Total',
    title: 'Cuide do seu celular\ndesde o primeiro dia.',
    subtitle: 'Películas, capinhas e acessórios selecionados para cada modelo.',
    cta: 'Ver Acessórios',
    ctaLink: '/loja/peliculas',
    bg: 'linear-gradient(135deg, #001520 0%, #002E42 45%, #001520 100%)',
    accent: '#06B6D4',
    icon: '🛡️',
  },
  {
    id: 5,
    num: '05',
    eyebrow: '💰 Menor Preço Garantido',
    title: 'Compare, escolha\ne economize de verdade.',
    subtitle: 'Verificamos automaticamente onde cada produto está mais barato.',
    cta: 'Comparar Preços',
    ctaLink: '/loja',
    bg: 'linear-gradient(135deg, #021208 0%, #063320 45%, #021208 100%)',
    accent: '#10B981',
    icon: '💹',
  },
  {
    id: 6,
    num: '06',
    eyebrow: '⚡ Achadinhos da Semana',
    title: 'Promoções reais,\nselecionadas por quem entende.',
    subtitle: 'Sem enrolação — só os produtos com melhor custo-benefício.',
    cta: 'Ver Promoções',
    ctaLink: '/loja',
    bg: 'linear-gradient(135deg, #150A00 0%, #3D2500 45%, #150A00 100%)',
    accent: '#F59E0B',
    icon: '⚡',
  },
];

const DURATION = 4000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const transitioning = useRef(false);

  const goTo = useCallback((idx) => {
    if (transitioning.current) return;
    transitioning.current = true;
    setVisible(false);
    setTimeout(() => {
      setCurrent(idx);
      setProgress(0);
      setVisible(true);
      transitioning.current = false;
    }, 340);
  }, []);

  const handleNext = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const handlePrev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    if (!isPlaying) return;
    const step = (50 / DURATION) * 100;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { handleNext(); return 0; }
        return prev + step;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [isPlaying, handleNext]);

  const slide = slides[current];

  const handleCTA = (link) => {
    if (link.startsWith('http')) window.open(link, '_blank');
    else navigate(link);
  };

  return (
    <div
      className="hero-slider"
      style={{ '--slide-bg': slide.bg, '--slide-accent': slide.accent }}
    >
      {/* Background */}
      <div className="hero-slider__bg">
        <div className="hero-slider__gradient" />
        <div className="hero-blob hero-blob--1" />
        <div className="hero-blob hero-blob--2" />
        <div className="hero-blob hero-blob--3" />
        <div className="hero-dots" />
      </div>

      {/* Slide */}
      <div className={`hero-slide${visible ? ' hero-slide--in' : ' hero-slide--out'}`}>
        <div className="container">
          <div className="hero-slide__inner">

            {/* Copy */}
            <div className="hero-slide__copy">
              <span className="hero-slide__eyebrow">{slide.eyebrow}</span>
              <h1 className="hero-slide__title">
                {slide.title.split('\n').map((line, i) => (
                  <React.Fragment key={i}>{line}{i < slide.title.split('\n').length - 1 && <br />}</React.Fragment>
                ))}
              </h1>
              <p className="hero-slide__sub">{slide.subtitle}</p>
              <button className="hero-slide__cta" onClick={() => handleCTA(slide.ctaLink)}>
                {slide.cta} <ArrowRight size={17} />
              </button>
            </div>

            {/* Decorative orb */}
            <div className="hero-slide__decor">
              <div className="hero-slide__orb">
                <div className="hero-slide__orb-inner">
                  <span className="hero-slide__icon">{slide.icon}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Slide number */}
        <div className="hero-slide__num">
          <span className="hero-slide__num-current">{slide.num}</span>
          <span className="hero-slide__num-sep">/</span>
          <span className="hero-slide__num-total">0{slides.length}</span>
        </div>
      </div>

      {/* Arrows */}
      <button className="hero-slider__arrow hero-slider__arrow--left" onClick={handlePrev} aria-label="Anterior">
        <ChevronLeft size={22} />
      </button>
      <button className="hero-slider__arrow hero-slider__arrow--right" onClick={handleNext} aria-label="Próximo">
        <ChevronRight size={22} />
      </button>

      {/* Progress dots */}
      <div className="hero-slider__controls">
        {slides.map((s, i) => (
          <button
            key={s.id}
            className={`hero-slider__dot${i === current ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          >
            {i === current && (
              <span className="hero-slider__dot-progress" style={{ width: `${progress}%` }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
