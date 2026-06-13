import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageWrapper from '../components/Layout/PageWrapper';
import ProductCard from '../components/UI/ProductCard';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { ArrowLeft } from 'lucide-react';
import './Categoria.css';

export default function Categoria() {
  const { categoria } = useParams();
  const navigate = useNavigate();

  // Encontra a categoria atual com base no slug
  const currentCategory = categories.find((c) => c.slug === categoria);

  // Filtra os produtos pertencentes a essa categoria
  const categoryProducts = products.filter(
    (p) => p.category === categoria && p.active
  );

  // Se a categoria não existir na lista, redireciona ou mostra 404
  if (!currentCategory) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2 style={{ fontWeight: 800 }}>Categoria não encontrada</h2>
        <p style={{ color: 'var(--mc-muted)', marginTop: 8 }}>A categoria selecionada não está disponível.</p>
        <button className="btn btn--primary" style={{ marginTop: 24 }} onClick={() => navigate('/loja')}>
          Ir para a Loja
        </button>
      </div>
    );
  }

  return (
    <PageWrapper
      title={currentCategory.label}
      description={`Confira os melhores preços e análises de ${currentCategory.label} na Mix Cell. Indicações baseadas em testes reais de bancada.`}
    >
      <div className="categoria-page container">
        {/* Breadcrumb / Botão de Voltar */}
        <button className="categoria-page__back-btn" onClick={() => navigate('/loja')}>
          <ArrowLeft size={16} /> Voltar para a Loja
        </button>

        {/* Cabeçalho da Categoria */}
        <div className="categoria-page__header" style={{ '--cat-accent-color': currentCategory.color }}>
          <h1 className="categoria-page__title">
            Melhores Ofertas de <span className="text-gradient">{currentCategory.label}</span>
          </h1>
          <p className="categoria-page__desc">
            Veja as ofertas atualizadas e as especificações técnicas recomendadas pela nossa equipe para {currentCategory.label.toLowerCase()}.
          </p>
        </div>

        {/* Grid de Resultados */}
        {categoryProducts.length > 0 ? (
          <div className="categoria-page__grid">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="categoria-page__empty">
            <div className="categoria-page__empty-icon">📦</div>
            <h3>Sem produtos nesta categoria</h3>
            <p>Ainda estamos cadastrando produtos em {currentCategory.label}. Em breve teremos novos links de afiliados e indicações!</p>
            <button className="btn btn--outline" onClick={() => navigate('/loja')}>
              Explorar Outros Produtos
            </button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
