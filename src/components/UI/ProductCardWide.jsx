import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { categories } from '../../data/categories';
import './ProductCardWide.css';

export default function ProductCardWide({ product }) {
  const navigate = useNavigate();

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

  return (
    <div className="product-card-wide card" onClick={() => navigate(`/produto/${product.slug}`)}>
      {/* Esquerda: Mídia */}
      <div 
        className="product-card-wide__media"
        style={{ background: `linear-gradient(135deg, ${categoryInfo.color}10, ${categoryInfo.color}25)` }}
      >
        {product.badge && (
          <span className={`product-card-wide__badge badge ${getBadgeClass(product.badge)}`}>
            {product.badge}
          </span>
        )}
        {product.image ? (
          <img src={product.image} alt={product.imageAlt} className="product-card-wide__img" />
        ) : (
          <div className="product-card-wide__placeholder" style={{ color: categoryInfo.color }}>
            <IconComponent size={64} strokeWidth={1.2} />
          </div>
        )}
      </div>

      {/* Direita: Detalhes */}
      <div className="product-card-wide__info">
        <div>
          <span className="product-card-wide__brand">{product.brand}</span>
          <h2 className="product-card-wide__title">{product.name}</h2>
          <p className="product-card-wide__desc">{product.description}</p>
          
          <div className="product-card-wide__specs">
            {product.specs.slice(0, 4).map((spec, i) => (
              <span key={i} className="product-card-wide__spec">{spec}</span>
            ))}
          </div>
        </div>

        <div className="product-card-wide__footer">
          <div className="product-card-wide__price">
            <span className="product-card-wide__price-label">Melhor oferta encontrada</span>
            <div className="product-card-wide__price-row">
              <span className="product-card-wide__price-val">{formattedMinPrice}</span>
              <span className="product-card-wide__shipping-info">Frete grátis via afiliado</span>
            </div>
          </div>

          <button className="btn btn--primary product-card-wide__btn">
            Comparar Preços
          </button>
        </div>
      </div>
    </div>
  );
}
