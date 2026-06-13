import React from 'react';
import { ShieldCheck, Award, Heart, Sparkles } from 'lucide-react';
import './TrustSection.css';

export default function TrustSection() {
  return (
    <section className="trust-section section section--soft reveal">
      <div className="container">
        <div className="trust-section__grid">
          {/* Esquerda: Mensagem institucional / Quote do Fundador */}
          <div className="trust-section__content">
            <span className="badge badge--mix-cell">11 anos de tradição</span>
            <h2 className="trust-section__title">Por que confiar na Mix Cell?</h2>
            
            <div className="trust-section__quote">
              <p className="trust-section__quote-text">
                "Quem conserta sabe o que quebra, quem usa sabe o que dura. Na bancada, nós vemos quais marcas dão defeito mais rápido. Por isso, nossa loja de afiliados indica apenas o que realmente vale o seu dinheiro."
              </p>
              <div className="trust-section__author">
                <strong>Equipe Técnica Mix Cell</strong>
                <span>Canoas / RS</span>
              </div>
            </div>
          </div>

          {/* Direita: Badges de Confiança */}
          <div className="trust-section__badges">
            <div className="trust-badge card">
              <div className="trust-badge__icon-wrapper">
                <ShieldCheck size={24} className="text-sky" />
              </div>
              <div className="trust-badge__text">
                <h4>Filtro de Durabilidade</h4>
                <p>Nenhum produto genérico entra na nossa lista. Apenas itens aprovados em nossos testes de estresse.</p>
              </div>
            </div>

            <div className="trust-badge card">
              <div className="trust-badge__icon-wrapper">
                <Award size={24} className="text-sky" />
              </div>
              <div className="trust-badge__text">
                <h4>Afiliados Oficiais</h4>
                <p>Links diretos e seguros integrados com a Amazon, Shopee, Mercado Livre, Magalu e AliExpress.</p>
              </div>
            </div>

            <div className="trust-badge card">
              <div className="trust-badge__icon-wrapper">
                <Sparkles size={24} className="text-sky" />
              </div>
              <div className="trust-badge__text">
                <h4>Opinião Isenta</h4>
                <p>Não somos patrocinados pelas marcas. Se um cabo quebra fácil ou se a bateria vicia, nós avisamos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
