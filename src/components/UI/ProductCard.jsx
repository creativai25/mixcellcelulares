import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { categories } from '../../data/categories';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  // Encontra a categoria para pegar o ícone e a cor de placeholder
  const categoryInfo = categories.find(c => c.slug === product.category) || {
    icon: 'HelpCircle',
    color: '#3ABEFF'
  };

  const IconComponent = Icons[categoryInfo.icon] || Icons.HelpCircle;

  // Calcula o preço mínimo
  const prices = Object.values(product.marketplaces).map(m => m.preco);
  const minPrice = Math.min(...prices);
  const formattedMinPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(minPrice);

  const getBadgeClass = (badge) => {
    if (!badge) return '';
    const clean = badge.toLowerCase();
    if (clean.includes('indica')) return 'badge--mix-cell';
    if (clean.includes('oferta')) return 'badge--oferta';
    if (clean.includes('premium')) return 'badge--premium';
    return 'badge--novo';
  };

  const handleCardClick = () => {
    navigate(`/produto/${product.slug}`);
  };

  return (
    <div className="product-card card" onClick={handleCardClick}>
      {/* Imagem / Placeholder */}
      <div 
        className="product-card__media"
        style={{ background: `linear-gradient(135deg, ${categoryInfo.color}15, ${categoryInfo.color}35)` }}
      >
        {product.badge && (
          <span className={`product-card__badge badge ${getBadgeClass(product.badge)}`}>
            {product.badge}
          </span>
        )}
        
        {product.image ? (
          <img src={product.image} alt={product.imageAlt} className="product-card__img" />
        ) : (
          <div className="product-card__placeholder" style={{ color: categoryInfo.color }}>
            <IconComponent size={48} strokeWidth={1.2} />
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="product-card__content">
        <span className="product-card__brand">{product.brand}</span>
        <h3 className="product-card__name">{product.name}</h3>
        
        {/* Specs rápidas */}
        <div className="product-card__specs">
          {product.specs.slice(0, 2).map((spec, i) => (
            <span key={i} className="product-card__spec-pill">{spec}</span>
          ))}
        </div>

        {/* Rodapé do Card com Preço Mínimo */}
        <div className="product-card__footer">
          <div className="product-card__price-wrapper">
            <span className="product-card__price-label">A partir de</span>
            <span className="product-card__price-val">{formattedMinPrice}</span>
          </div>
          <button className="btn btn--outline btn--sm product-card__btn">
            Comparar
          </button>
        </div>
      </div>
    </div>
  );
}
