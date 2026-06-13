import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ScrollRow.css';

export default function ScrollRow({ children, title, subtitle }) {
  const rowRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = () => {
    const el = rowRef.current;
    if (!el) return;
    
    // Mostra seta esquerda se rolou mais de 10px
    setShowLeft(el.scrollLeft > 10);
    
    // Mostra seta direita se ainda há espaço para rolar
    const reachedEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
    setShowRight(!reachedEnd);
  };

  useEffect(() => {
    const el = rowRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      // Checa no início após render
      setTimeout(checkScroll, 100);
      
      // Checa ao redimensionar
      const resizeObserver = new ResizeObserver(checkScroll);
      resizeObserver.observe(el);
      
      return () => {
        el.removeEventListener('scroll', checkScroll);
        resizeObserver.disconnect();
      };
    }
  }, [children]);

  const handleScroll = (dir) => {
    const el = rowRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="scroll-row-container reveal">
      {/* Header do Carrossel */}
      {(title || subtitle) && (
        <div className="scroll-row-header">
          <div className="scroll-row-header__text">
            {title && <h2 className="scroll-row-header__title">{title}</h2>}
            {subtitle && <p className="scroll-row-header__subtitle">{subtitle}</p>}
          </div>
          <div className="scroll-row-header__nav hide-mobile">
            <button
              onClick={() => handleScroll('left')}
              className={`scroll-row-btn ${showLeft ? '' : 'scroll-row-btn--disabled'}`}
              disabled={!showLeft}
              aria-label="Voltar"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className={`scroll-row-btn ${showRight ? '' : 'scroll-row-btn--disabled'}`}
              disabled={!showRight}
              aria-label="Avançar"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Track do Carrossel */}
      <div className="scroll-row-wrapper">
        <div className="scroll-row" ref={rowRef}>
          <div className="scroll-row__track">
            {React.Children.map(children, (child, idx) => (
              <div key={idx} className="scroll-row__item">
                {child}
              </div>
            ))}
          </div>
        </div>
        
        {/* Fade visual nas bordas */}
        {showLeft && <div className="scroll-row-mask scroll-row-mask--left" />}
        {showRight && <div className="scroll-row-mask scroll-row-mask--right" />}
      </div>
    </div>
  );
}
