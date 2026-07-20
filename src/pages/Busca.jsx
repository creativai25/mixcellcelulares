import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageWrapper from '../components/Layout/PageWrapper';
import SearchBar from '../components/UI/SearchBar';
import './Busca.css';

const ML_AFF_TAG = '9E98NU-BAUS';

function makeAffLink(permalink) {
  if (!permalink) return '#';
  try {
    const u = new URL(permalink);
    u.searchParams.set('from', 'affiliates');
    u.searchParams.set('affId', ML_AFF_TAG);
    return u.toString();
  } catch {
    return `${permalink}?from=affiliates&affId=${ML_AFF_TAG}`;
  }
}

function deliveryLabel(shipping) {
  if (!shipping) return null;
  const tags = shipping?.tags || [];
  if (tags.includes('same_day')) return '⚡ Chegada hoje';
  if (tags.includes('next_day')) return '🚀 Chegada amanhã';
  if (tags.includes('fulfillment')) return '📦 Envio rápido';
  return null;
}

// ── Formata R$ ──────────────────────────────────────────────────────────────
function brl(value) {
  return value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ?? '';
}

// ── Skeleton de carregamento ─────────────────────────────────────────────────
function Skeletons() {
  return (
    <div className="busca-skeletons">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="busca-skeleton">
          <div className="busca-skeleton__img" />
          <div className="busca-skeleton__body">
            <div className="busca-skeleton__line" />
            <div className="busca-skeleton__line busca-skeleton__line--short" />
            <div className="busca-skeleton__line busca-skeleton__line--price" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Card individual ML ────────────────────────────────────────────────────────
function MlCard({ item }) {
  const discounted = item.originalPrice && item.originalPrice > item.price;

  return (
    <article className="ml-card">
      <div className="ml-card__img-wrap">
        <img
          className="ml-card__img"
          src={item.thumbnail}
          alt={item.title}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="ml-card__body">
        {/* Badges de frete / entrega / condição */}
        <div className="ml-card__badges">
          {item.freeShipping && (
            <span className="ml-badge ml-badge--frete">Frete grátis</span>
          )}
          {item.delivery && (
            <span className="ml-badge ml-badge--delivery">{item.delivery}</span>
          )}
          {item.condition && (
            <span className="ml-badge ml-badge--condition">{item.condition}</span>
          )}
        </div>

        <p className="ml-card__title" title={item.title}>{item.title}</p>

        {/* Preço */}
        <div className="ml-card__price-wrap">
          {discounted && (
            <div className="ml-card__original-price">{brl(item.originalPrice)}</div>
          )}
          <div className="ml-card__price">{brl(item.price)}</div>
          {item.installments && item.installments.quantity > 1 && (
            <div className="ml-card__installments">
              em até {item.installments.quantity}x de {brl(item.installments.amount)}
            </div>
          )}
        </div>

        {item.seller && (
          <div className="ml-card__seller">Vendido por {item.seller}</div>
        )}
      </div>

      <a
        className="ml-card__cta"
        href={item.permalink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Comprar ${item.title} no Mercado Livre`}
      >
        Ver no Mercado Livre →
      </a>
    </article>
  );
}

// ── Página principal ──────────────────────────────────────────────────────────
export default function Busca() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [state, setState] = useState('idle'); // idle | loading | done | error
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchResults = useCallback(async (q) => {
    if (!q.trim()) return;
    setState('loading');
    setItems([]);

    try {
      const res = await fetch(`/api/search-ml?q=${encodeURIComponent(q)}&limit=12`);
      if (!res.ok) throw new Error(`Erro ${res.status}`);
      const data = await res.json();
      setItems(data.items || []);
      setTotal(data.total || 0);
      setState('done');
    } catch (err) {
      setErrorMsg(err.message || 'Erro ao buscar.');
      setState('error');
    }
  }, []);

  useEffect(() => {
    if (query) fetchResults(query);
    else setState('idle');
  }, [query, fetchResults]);

  return (
    <PageWrapper
      title={query ? `${query} — Mix Cell Comparador` : 'Buscar produtos — Mix Cell'}
      description="Encontre e compare preços de celulares e acessórios nos maiores marketplaces."
    >
      <div className="busca-page">

        {/* ── Header com barra de busca ── */}
        <div className="busca-header">
          <div className="busca-header__inner">
            <SearchBar initialValue={query} />
            {query && state === 'done' && (
              <p className="busca-header__meta">
                {total.toLocaleString('pt-BR')} resultados para{' '}
                <strong>"{query}"</strong> no Mercado Livre
              </p>
            )}
          </div>
        </div>

        {/* ── Layout: ML | Shopee ── */}
        <div className="busca-layout">

          {/* Coluna principal: resultados ML */}
          <section aria-label="Resultados Mercado Livre">
            <div className="busca-ml__title">
              <span className="busca-ml__badge">ML</span>
              Mercado Livre
            </div>

            {state === 'idle' && (
              <div className="busca-empty">
                <div className="busca-empty__icon">🔍</div>
                <p className="busca-empty__title">Digite o que você procura</p>
                <p className="busca-empty__desc">Pesquise qualquer produto e veja os melhores preços.</p>
              </div>
            )}

            {state === 'loading' && <Skeletons />}

            {state === 'error' && (
              <div className="busca-error">
                <p>Não foi possível buscar os resultados.</p>
                <small>{errorMsg}</small>
              </div>
            )}

            {state === 'done' && items.length === 0 && (
              <div className="busca-empty">
                <div className="busca-empty__icon">📭</div>
                <p className="busca-empty__title">Nenhum resultado encontrado</p>
                <p className="busca-empty__desc">Tente outros termos ou verifique a ortografia.</p>
              </div>
            )}

            {state === 'done' && items.length > 0 && (
              <div className="busca-ml__grid">
                {items.map((item) => (
                  <MlCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </section>

          {/* Coluna lateral: Shopee (em breve) */}
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
