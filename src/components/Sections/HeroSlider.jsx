import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import './HeroSlider.css';

const slides = [
  {
    id: 1,
    num: '01',
    eyebrow: '💰 Menor Preço',
    title: 'Buscamos onde\nestá mais barato.',
    subtitle: 'Comparamos ML, Shopee, Amazon e AliExpress em tempo real para você economizar de verdade.',
    cta: 'Ver Ofertas',
    ctaLink: '/loja',
    bg: 'linear-gradient(135deg, #021208 0%, #063320 45%, #021208 100%)',
    accent: '#10B981',
    icon: '💹',
    imageDesktop: null,
    imageMobile: null,
  },
  {
    id: 2,
    num: '02',
    eyebrow: '📱 Celulares 2026',
    title: 'Os lançamentos\nno menor preço do mercado.',
    subtitle: 'Samsung, iPhone, Motorola e Xiaomi com curadoria técnica real — sem achismo.',
    cta: 'Ver Celulares',
    ctaLink: '/loja/celulares',
    bg: 'linear-gradient(135deg, #020B20 0%, #0A1F55 45%, #020B20 100%)',
    accent: '#3B82F6',
    icon: '📱',
    imageDesktop: null,
    imageMobile: null,
  },
  {
    id: 3,
    num: '03',
    eyebrow: '🎧 Fones e Áudio',
    title: 'Som que você sente.\nPreço que você gosta.',
    subtitle: 'AirPods, Galaxy Buds, JBL e mais — só o que vale o seu dinheiro.',
    cta: 'Ver Fones',
    ctaLink: '/loja/fones',
    bg: 'linear-gradient(135deg, #0D0520 0%, #220A42 45%, #0D0520 100%)',
    accent: '#A855F7',
    icon: '🎧',
    imageDesktop: null,
    imageMobile: null,
  },
  {
    id: 4,
    num: '04',
    eyebrow: '⚡ Achadinhos da Semana',
    title: 'Promoções reais,\nna hora certa.',
    subtitle: 'Sem enrolação — os produtos com melhor custo-benefício desta semana.',
    cta: 'Ver Achadinhos',
    ctaLink: '/loja',
    bg: 'linear-gradient(135deg, #150A00 0%, #3D2500 45%, #150A00 100%)',
    accent: '#F59E0B',
    icon: '⚡',
    imageDesktop: null,
    imageMobile: null,
  },
  {
    id: 5,
    num: '05',
    eyebrow: '📺 TVs',
    title: 'Smart TVs com o\nmelhor custo-benefício.',
    subtitle: '4K, QLED, OLED — as melhores marcas com os menores preços do Brasil.',
    cta: 'Ver TVs',
    ctaLink: '/loja/tvs',
    bg: 'linear-gradient(135deg, #1A0020 0%, #420050 45%, #1A0020 100%)',
    accent: '#E879F9',
    icon: '📺',
    imageDesktop: null,
    imageMobile: null,
  },
  {
    id: 6,
    num: '06',
    eyebrow: '💻 Notebooks e PC Gamer',
    title: 'Performance máxima.\nPreço que cabe.',
    subtitle: 'Do trabalho ao jogo — notebooks e PCs selecionados por performance real.',
    cta: 'Ver Notebooks',
    ctaLink: '/loja/notebooks',
    bg: 'linear-gradient(135deg, #080820 0%, #181845 45%, #080820 100%)',
    accent: '#818CF8',
    icon: '💻',
    imageDesktop: null,
    imageMobile: null,
  },
];

const DURATION = 5000;

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

            {/* Mockup image or decorative orb */}
            <div className="hero-slide__decor">
              {slide.imageDesktop ? (
                <picture className="hero-slide__mockup">
                  <source media="(max-width: 767px)" srcSet={slide.imageMobile || slide.imageDesktop} />
                  <img src={slide.imageDesktop} alt={slide.eyebrow} className="hero-slide__img" />
                </picture>
              ) : (
                <div className="hero-slide__orb">
                  <div className="hero-slide__orb-inner">
                    <span className="hero-slide__icon">{slide.icon}</span>
                  </div>
                </div>
              )}
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
