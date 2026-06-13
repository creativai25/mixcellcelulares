import React from 'react';
import './MarketplaceBtn.css';

const logos = {
  amazon: {
    name: 'Amazon',
    color: '#FF9900',
    logoText: 'amazon'
  },
  mercadolivre: {
    name: 'Mercado Livre',
    color: '#FFE600',
    textColor: '#333333',
    logoText: 'mercadolivre'
  },
  magalu: {
    name: 'Magalu',
    color: '#0086FF',
    logoText: 'magalu'
  },
  shopee: {
    name: 'Shopee',
    color: '#EE4D2D',
    logoText: 'shopee'
  },
  aliexpress: {
    name: 'AliExpress',
    color: '#E62E04',
    logoText: 'aliexpress'
  }
};

export default function MarketplaceBtn({ storeKey, data, compact = false }) {
  const store = logos[storeKey] || { name: storeKey, color: '#3ABEFF', logoText: storeKey };
  const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.preco);

  // Link de afiliado: nova aba + rel sponsored (boa prática Google/SEO) + segurança
  const affiliateProps = {
    href: data.url,
    target: '_blank',
    rel: 'sponsored noopener noreferrer',
    onClick: (e) => e.stopPropagation()
  };

  if (compact) {
    return (
      <a
        className={`mkt-btn mkt-btn--compact${data.best ? ' mkt-btn--best' : ''}`}
        {...affiliateProps}
        style={{ '--store-color': store.color }}
      >
        <span className="mkt-btn__name">{store.name}</span>
        <span className="mkt-btn__price">{formattedPrice}</span>
      </a>
    );
  }

  return (
    <a
      className={`mkt-btn${data.best ? ' mkt-btn--best' : ''}${data.alert ? ' mkt-btn--alert' : ''}`}
      {...affiliateProps}
      style={{ '--store-color': store.color }}
    >
      <div className="mkt-btn__store-info">
        <span 
          className="mkt-btn__badge" 
          style={{ backgroundColor: store.color, color: store.textColor || '#ffffff' }}
        >
          {store.name}
        </span>
        <div className="mkt-btn__meta">
          <span className="mkt-btn__shipping">
            {data.frete === 0 ? 'Frete Grátis' : `Frete: R$ ${data.frete.toFixed(2)}`}
          </span>
          <span className="mkt-btn__delivery">· {data.prazo}</span>
        </div>
      </div>

      <div className="mkt-btn__price-section">
        {data.best && <span className="mkt-btn__tag mkt-btn__tag--best">Melhor Preço</span>}
        {data.alert && <span className="mkt-btn__tag mkt-btn__tag--warning">Sujeito a Taxa</span>}
        <span className="mkt-btn__value">{formattedPrice}</span>
        <span className="mkt-btn__action-label">Ir para a Loja →</span>
      </div>
    </a>
  );
}
