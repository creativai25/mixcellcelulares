import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { categories } from '../../data/categories';
import './ProductCard.css';

const storeNames = {
  shopee: 'Shopee',
  mercadolivre: 'Mercado Livre',
  amazon: 'Amazon',
  magalu: 'Magalu',
  aliexpress: 'AliExpress'
};

export default function ProductCard({ product, variant = 'default' }) {
  const navigate = useNavigate();
  const isHero = variant === 'hero';

  const categoryInfo = categories.find(c => c.slug === product.category) || {
    icon: 'HelpCircle',
    color: '#1A56DB'
  };
  const IconComponent = Icons[categoryInfo.icon] || Icons.HelpCircle;

  const prices = Object.values(product.marketplaces).map(m => m.preco).filter(p => p > 0);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const formattedMinPrice = minPrice > 0
    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(minPrice)
    : 'Indisponível';

  const storeKeys = Object.keys(product.marketplaces);
  const mainStoreKey = storeKeys[0] || 'mercadolivre';
  const mainStoreName = storeNames[mainStoreKey] || 'Ver Loja';

  const getBadgeClass = (badge) => {
    if (!badge) return '';
    const clean = badge.toLowerCase();
    if (clean.includes('indica')) return 'badge--mix-cell';
    if (clean.includes('oferta')) return 'badge--oferta';
    if (clean.includes('premium')) return 'badge--premium';
    return 'badge--novo';
  };

  return (
    <div
      className={`product-card${isHero ? ' product-card--hero' : ''}`}
      onClick={() => navigate(`/produto/${product.slug}`)}
    >
      {/* Image */}
      <div className="product-card__media">
        {product.badge && (
          <span className={`product-card__badge badge ${getBadgeClass(product.badge)}`}>
            {product.badge}
          </span>
        )}
        {product.image ? (
          <img src={product.image} alt={product.imageAlt} className="product-card__img" loading="lazy" />
        ) : (
          <div className="product-card__placeholder" style={{ color: categoryInfo.color }}>
            <IconComponent size={isHero ? 64 : 48} strokeWidth={1.2} />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="product-card__body">
        <p className="product-card__name">{product.name}</p>

        {isHero && product.description && (
          <p className="product-card__desc">{product.description}</p>
        )}

        <div className="product-card__price-row">
          <span className="product-card__price">{formattedMinPrice}</span>
        </div>

        <div className="product-card__foot">
          <span className={`product-card__store store--${mainStoreKey}`}>
            {mainStoreName}
          </span>
          <span className="product-card__stars">★ 4.8</span>
        </div>

        {isHero && (
          <span className="product-card__cta">Ver Oferta →</span>
        )}
      </div>
    </div>
  );
}
