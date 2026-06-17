import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageWrapper from '../components/Layout/PageWrapper';
import Comparador from '../components/Sections/Comparador';
import ScrollRow from '../components/UI/ScrollRow';
import ProductCard from '../components/UI/ProductCard';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { ArrowLeft, CheckCircle, HelpCircle, Shield, ShoppingCart, Info } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Produto.css';

export default function Produto() {
  const { slug } = useParams();
  const navigate = useNavigate();
  useScrollReveal();

  // Encontra o produto atual
  const product = useMemo(() => {
    return products.find((p) => p.slug === slug && p.active);
  }, [slug]);

  // Encontra produtos relacionados para o cross-sell
  const crossSellProducts = useMemo(() => {
    if (!product) return [];
    return products.filter((p) => product.crossSell.includes(p.slug) && p.active);
  }, [product]);

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2 style={{ fontWeight: 800 }}>Produto não encontrado</h2>
        <p style={{ color: 'var(--mc-muted)', marginTop: 8 }}>O produto que você está procurando não existe ou está indisponível.</p>
        <button className="btn btn--primary" style={{ marginTop: 24 }} onClick={() => navigate('/loja')}>
          Ir para a Loja
        </button>
      </div>
    );
  }

  const categoryInfo = categories.find((c) => c.slug === product.category) || {
    icon: 'HelpCircle',
    color: '#3ABEFF',
    label: product.category
  };

  const IconComponent = Icons[categoryInfo.icon] || Icons.HelpCircle;

  // Preço mínimo formatado
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
    <PageWrapper
      title={product.name}
      description={`Compare os melhores preços de ${product.name} em 5 lojas virtuais. Avaliação de durabilidade e indicação técnica da Mix Cell.`}
    >
      <div className="produto-page container">
        {/* Breadcrumb / Voltar */}
        <div className="produto-page__nav">
          <button className="produto-page__back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} /> Voltar
          </button>
          <div className="produto-page__breadcrumb">
            <span onClick={() => navigate('/loja')}>Loja</span>
            <span className="separator">/</span>
            <span onClick={() => navigate(`/loja/${product.category}`)}>{categoryInfo.label}</span>
            <span className="separator">/</span>
            <span className="active">{product.name}</span>
          </div>
        </div>

        {/* Informações Principais do Produto */}
        <div className="produto-page__main">
          {/* Coluna Esquerda: Imagem */}
          <div 
            className="produto-page__media"
            style={{ background: `linear-gradient(135deg, ${categoryInfo.color}08, ${categoryInfo.color}18)` }}
          >
            {product.badge && (
              <span className={`produto-page__badge badge ${getBadgeClass(product.badge)}`}>
                {product.badge}
              </span>
            )}
            
            {product.image ? (
              <img src={product.image} alt={product.imageAlt} className="produto-page__img" />
            ) : (
              <div className="produto-page__placeholder" style={{ color: categoryInfo.color }}>
                <IconComponent size={96} strokeWidth={1.1} />
                <span className="produto-page__placeholder-text">Modelo 3D do Aparelho</span>
              </div>
            )}
          </div>

          {/* Coluna Direita: Informações */}
          <div className="produto-page__details">
            <div className="produto-page__header-info">
              <span className="produto-page__brand">{product.brand}</span>
              <h1 className="produto-page__title">{product.name}</h1>
              
              <div className="produto-page__price-block">
                <span className="produto-page__price-label">A partir de</span>
                <div className="produto-page__price-row">
                  <span className="produto-page__price-val">{formattedMinPrice}</span>
                  <span className="produto-page__price-note">preço de referência · confira o valor atual no Mercado Livre</span>
                </div>
              </div>
            </div>

            {/* Diferencial Inesquecível - Avaliação Técnica */}
            <div className="produto-page__tech-review">
              <div className="produto-page__tech-review-header">
                <Shield size={18} className="text-sky" />
                <h4>Parecer Técnico da Mix Cell</h4>
              </div>
              <p className="produto-page__tech-review-text">
                {product.description}
              </p>
              <div className="produto-page__tech-highlights">
                <div className="produto-page__highlight-item">
                  <CheckCircle size={14} className="text-green" />
                  <span>Facilidade de Reparo: Alta</span>
                </div>
                <div className="produto-page__highlight-item">
                  <CheckCircle size={14} className="text-green" />
                  <span>Durabilidade dos Acessórios: Recomendada</span>
                </div>
              </div>
            </div>

            {/* Especificações Técnicas */}
            <div className="produto-page__specs-section">
              <h4>Ficha Técnica Simplificada</h4>
              <ul className="produto-page__specs-list">
                {product.specs.map((spec, i) => (
                  <li key={i}>{spec}</li>
                ))}
              </ul>
            </div>

            {/* Suporte Assistência Técnica CTA */}
            <div className="produto-page__support-cta">
              <div className="produto-page__support-info">
                <Info size={20} className="text-sky" />
                <div>
                  <h5>Dúvidas sobre o modelo ou conserto?</h5>
                  <p>Fale diretamente com quem conserta para tirar dúvidas ou solicitar orçamento.</p>
                </div>
              </div>
              <button 
                className="btn btn--whatsapp btn--sm"
                onClick={() => window.open(`https://wa.me/5551999999999?text=Olá, tenho dúvidas sobre o modelo ${product.name} ou gostaria de um orçamento de conserto.`, '_blank')}
              >
                Chamar Assistência no WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Comparador de Preços (Marketplaces) */}
        <Comparador marketplaces={product.marketplaces} />

        {/* Cross Sell (Acessórios Sugeridos) */}
        {crossSellProducts.length > 0 && (
          <div className="produto-page__related">
            <ScrollRow 
              title="Acessórios Indicados" 
              subtitle="Adicione proteção e aproveite o frete com itens compatíveis"
            >
              {crossSellProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </ScrollRow>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
