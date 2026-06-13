// src/hooks/useScrollReveal.js
import { useEffect, useRef } from 'react';

/**
 * Adiciona a classe 'visible' em elementos com classe 'reveal'
 * quando eles entram na viewport.
 */
export function useScrollReveal(rootMargin = '0px 0px -60px 0px') {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observerRef.current.unobserve(entry.target); // anima só 1x
          }
        });
      },
      { rootMargin }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => observerRef.current.disconnect();
  }, [rootMargin]);
}
