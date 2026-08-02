import React from 'react';
import PageWrapper from '../components/Layout/PageWrapper';
import AboutSection from '../components/Sections/AboutUs';
import TrustSection from '../components/Sections/TrustSection';
import { Target, Eye, Heart, Milestone } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Sobre.css';

export default function Sobre() {
  useScrollReveal();
  const values = [
    {
      icon: <Target size={24} className="text-sky" />,
      title: 'Missão',
      desc: 'Guiar os consumidores brasileiros nas melhores decisões de compra de celulares e acessórios, garantindo o menor preço e indicando apenas itens de alta durabilidade.'
    },
    {
      icon: <Eye size={24} className="text-sky" />,
      title: 'Visão',
      desc: 'Ser a principal referência independente em curadoria e comparação de preços de hardware, reconhecida pela honestidade técnica e transparência das avaliações.'
    },
    {
      icon: <Heart size={24} className="text-sky" />,
      title: 'Valores',
      desc: 'Transparência absoluta, rigor analítico, isenção comercial, compromisso com a economia do usuário e aversão a produtos descartáveis.'
    }
  ];

  return (
    <PageWrapper
      title="Quem Somos"
      description="Conheça a história e os valores da curadoria técnica da Mix Cell Shop. Indicando o que realmente dura, pelo menor preço."
    >
      <div className="sobre-page">
        {/* Seção Sobre Principal */}
        <AboutSection />

        {/* Nossa Bancada / Valores */}
        <div className="sobre-values container reveal">
          <div className="section-header center">
            <span className="badge badge--mix-cell">Diretrizes da Empresa</span>
            <h2>Nossa Filosofia Comercial</h2>
            <p className="section-subtitle">O que guia as nossas recomendações e curadoria todos os dias</p>
          </div>

          <div className="sobre-values__grid">
            {values.map((v, idx) => (
              <div key={idx} className="value-card card">
                <div className="value-card__icon-wrapper">{v.icon}</div>
                <h3 className="value-card__title">{v.title}</h3>
                <p className="value-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Selos de Confiança (Reusando TrustSection) */}
        <TrustSection />

        {/* História / Timeline */}
        <div className="sobre-history container reveal">
          <div className="sobre-history__inner card">
            <div className="sobre-history__badge">
              <Milestone size={20} />
              <span>Nossa Linha do Tempo</span>
            </div>
            <h2>11 anos de experiência técnica em tecnologia</h2>
            <p>
              Nossa história começou em 2015 como um laboratório de assistência técnica. Ao longo de mais de uma década na bancada, analisando componentes danificados e descobrindo quais marcas dão defeito mais rápido, acumulamos um conhecimento profundo sobre hardware. Em 2026, transformamos essa bagagem técnica na Mix Cell Shop: um portal independente de afiliados projetado para poupar seu tempo e dinheiro, recomendando apenas o que realmente dura.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
