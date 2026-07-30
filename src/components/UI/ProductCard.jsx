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

export default function ProductCard({ product }) {
  const navigate = useNavigate();

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
    <div className="product-card" onClick={() => navigate(`/produto/${product.slug}`)}>
      {/* Image */}
      <div className="product-card__media">
        {product.badge && (
          <span className={`product-card__badge badge ${getBadgeClass(product.badge)}`}>
            {product.badge}
          </span>
        )}
        {product.image ? (
          <img src={product.image} alt={product.imageAlt} className="product-card__img" />
        ) : (
          <div className="product-card__placeholder" style={{ color: categoryInfo.color }}>
            <IconComponent size={44} strokeWidth={1.2} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="product-card__content">
        <div className="product-card__store-row">
          <span className="product-card__brand">{product.brand || 'Mix Cell'}</span>
          <span className={`product-card__store-badge store-badge--${mainStoreKey}`}>
            {mainStoreName}
          </span>
        </div>

        <h3 className="product-card__name">{product.name}</h3>

        <div className="product-card__rating">
          <span className="stars">★★★★★</span>
          <span className="rating-val">4.8</span>
        </div>

        <div className="product-card__price-block">
          <span className="product-card__price-from">a partir de</span>
          <div className="product-card__price-val">{formattedMinPrice}</div>
        </div>

        <span className="product-card__cta">Ver Oferta →</span>
      </div>
    </div>
  );
}
