import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageWrapper from '../components/Layout/PageWrapper';
import SearchBar from '../components/UI/SearchBar';
import './Busca.css';

const ML_AFF_TAG = '9E98NU-BAUS';

function mlSearchUrl(q) {
  return `https://www.mercadolivre.com.br/busca?q=${encodeURIComponent(q)}&from=affiliates&affId=${ML_AFF_TAG}`;
}

export default function Busca() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const openedRef = useRef(false);

  // Abre o ML em nova aba automaticamente (uma vez por query)
  useEffect(() => {
    if (!query.trim()) {
      openedRef.current = false;
      return;
    }
    if (openedRef.current) return;
    openedRef.current = true;
    window.open(mlSearchUrl(query), '_blank', 'noopener,noreferrer');
  }, [query]);

  return (
    <PageWrapper
      title={query ? `${query} — Mix Cell Comparador` : 'Buscar produtos — Mix Cell'}
      description="Encontre e compare preços de celulares e acessórios nos maiores marketplaces."
    >
      <div className="busca-page">

        {/* Header com barra de busca */}
        <div className="busca-header">
          <div className="busca-header__inner">
            <SearchBar initialValue={query} />
            {query && (
              <p className="busca-header__meta">
                Mostrando resultados para <strong>"{query}"</strong> no Mercado Livre
              </p>
            )}
          </div>
        </div>

        {/* Layout: ML | Shopee */}
        <div className="busca-layout">

          {/* Coluna principal */}
          <section aria-label="Resultados Mercado Livre">
            <div className="busca-ml__title">
              <span className="busca-ml__badge">ML</span>
              Mercado Livre
            </div>

            {!query && (
              <div className="busca-empty">
                <div className="busca-empty__icon">🔍</div>
                <p className="busca-empty__title">Digite o que você procura</p>
                <p className="busca-empty__desc">Pesquise qualquer produto e veja os melhores preços.</p>
              </div>
            )}

            {query && (
              <div className="busca-redirect">
                <div className="busca-redirect__icon">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
                    <circle cx="28" cy="28" r="28" fill="rgba(43,166,255,0.1)" />
                    <path d="M22 28h12M28 22l6 6-6 6" stroke="#2BA6FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="busca-redirect__title">
                  Resultados abertos no Mercado Livre
                </p>
                <p className="busca-redirect__desc">
                  Uma nova aba foi aberta com os melhores resultados para{' '}
                  <strong>"{query}"</strong>.
                  Se o bloqueador de pop-ups impediu, clique abaixo.
                </p>
                <a
                  className="busca-redirect__btn"
                  href={mlSearchUrl(query)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir Mercado Livre →
                </a>
                <p className="busca-redirect__hint">
                  Em breve você verá os resultados aqui mesmo, com comparação de preços entre marketplaces.
                </p>
              </div>
            )}
          </section>

          {/* Shopee sidebar */}
          <aside aria-label="Shopee — Em breve" className="busca-shopee">
            <div className="busca-shopee__logo">🛍️</div>
            <h2 className="busca-shopee__title">Shopee</h2>
            <p className="busca-shopee__desc">
              Em breve você poderá comparar o Mercado Livre com a Shopee lado a lado e escolher a melhor oferta.
            </p>
            <span className="busca-shopee__badge">Em breve</span>
          </aside>

        </div>
      </div>
    </PageWrapper>
  );
}
