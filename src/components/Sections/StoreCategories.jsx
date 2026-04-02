import React from 'react';
import './StoreCategories.css';

const StoreCategories = () => {
  const categories = [
    {
      id: 1,
      title: 'Capas',
      models: 'iPhone, Samsung, Motorola, Redmi/Poco',
      icon: '📱',
      color: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
    },
    {
      id: 2,
      title: 'Carregadores & Cabos',
      models: 'Tipo C, Lightning, Micro USB/V8',
      icon: '🔌',
      color: 'linear-gradient(135deg, #FF6B6B 0%, #C44D58 100%)'
    },
    {
      id: 3,
      title: 'Películas',
      models: '3D, TPU SOFT, Câmera',
      icon: '🛡️',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 4,
      title: 'Fones de Ouvido',
      models: 'Com fio, Bluetooth, Headset',
      icon: '🎧',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      id: 5,
      title: 'Acessórios Variados',
      models: 'Suporte Veicular, Diversos',
      icon: '🎮',
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    }
  ];

  return (
    <section id="loja" className="store-categories-section">
      <div className="store-container">
        <div className="section-header center">
          <div className="section-badge">Loja Virtual</div>
          <h2 className="section-title">Produtos & Acessórios</h2>
          <p className="section-subtitle">Tudo o que você precisa para o seu aparelho em um só lugar.</p>
        </div>
        
        <div className="categories-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="category-card" style={{ background: cat.color }}>
              <div className="cat-icon-wrapper">{cat.icon}</div>
              <h3 className="cat-title">{cat.title}</h3>
              <p className="cat-models">{cat.models}</p>
              <button className="btn-view-products">Ver Produtos</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoreCategories;
