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
      desc: 'Proporcionar o melhor custo-benefício em eletrônicos e reparos rápidos de celulares, devolvendo a conectividade e segurança aos nossos clientes em Canoas/RS.'
    },
    {
      icon: <Eye size={24} className="text-sky" />,
      title: 'Visão',
      desc: 'Ser a principal referência técnica em recomendação de aparelhos e serviços de reparo, baseando-nos sempre na transparência absoluta do que conserta.'
    },
    {
      icon: <Heart size={24} className="text-sky" />,
      title: 'Valores',
      desc: 'Transparência, rigor técnico, honestidade comercial, atendimento ágil e compromisso com o descarte correto de resíduos eletrônicos.'
    }
  ];

  return (
    <PageWrapper
      title="Quem Somos"
      description="Saiba mais sobre os 11 anos de história da Mix Cell Celulares em Canoas/RS. Conheça nossa bancada e nossos valores técnicos."
    >
      <div className="sobre-page">
        {/* Seção Sobre Principal */}
        <AboutSection />

        {/* Nossa Bancada / Valores */}
        <div className="sobre-values container reveal">
          <div className="section-header center">
            <span className="badge badge--mix-cell">Diretrizes da Empresa</span>
            <h2>Nossa Filosofia Comercial</h2>
            <p className="section-subtitle">O que guia as nossas recomendações e consertos todos os dias</p>
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
            <h2>11 anos resolvendo problemas em Canoas/RS</h2>
            <p>
              Fundada em 2015 como uma pequena oficina de bairro, a Mix Cell cresceu em Canoas com o compromisso de explicar detalhadamente cada conserto. Aprendemos quais componentes falham e quais marcas duram. Em 2026, demos o passo de criar esta loja de afiliados para guiar as decisões de compra de milhares de pessoas com a mesma integridade da nossa bancada.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
