import React from 'react';
import { ShieldCheck, Award, BadgePercent } from 'lucide-react';
import './TrustSection.css';

export default function TrustSection() {
  return (
    <section className="trust-section section section--soft reveal">
      <div className="container">
        <div className="trust-section__grid">

          {/* Left: Quote / Brand message */}
          <div className="trust-section__content">
            <span className="badge badge--mix-cell">Por que a Mix Cell?</span>
            <h2 className="trust-section__title">Compramos certo,<br />você economiza.</h2>
            <div className="trust-section__quote">
              <p className="trust-section__quote-text">
                "Cada produto da nossa loja é escolhido por quem realmente usa e testa. Sem patrocínio de marcas, sem indicação genérica — só o que vale o seu dinheiro nos maiores marketplaces do Brasil."
              </p>
              <div className="trust-section__author">
                <strong>Equipe Mix Cell</strong>
                <span>Canoas / RS — Afiliados desde 2013</span>
              </div>
            </div>
          </div>

          {/* Right: Trust badges */}
          <div className="trust-section__badges">
            <div className="trust-badge card">
              <div className="trust-badge__icon-wrapper">
                <ShieldCheck size={22} style={{ color: 'var(--mc-blue)' }} />
              </div>
              <div className="trust-badge__text">
                <h4>Seleção Rigorosa</h4>
                <p>Nenhum produto genérico ou de qualidade duvidosa entra na lista. Apenas itens aprovados pela nossa curadoria.</p>
              </div>
            </div>

            <div className="trust-badge card">
              <div className="trust-badge__icon-wrapper">
                <Award size={22} style={{ color: 'var(--mc-blue)' }} />
              </div>
              <div className="trust-badge__text">
                <h4>Afiliados Oficiais</h4>
                <p>Links diretos e seguros com Amazon, Shopee, Mercado Livre, Magalu e AliExpress — sem custo extra para você.</p>
              </div>
            </div>

            <div className="trust-badge card">
              <div className="trust-badge__icon-wrapper">
                <BadgePercent size={22} style={{ color: 'var(--mc-blue)' }} />
              </div>
              <div className="trust-badge__text">
                <h4>Menor Preço Comparado</h4>
                <p>Verificamos os preços automaticamente em todos os marketplaces para garantir que você sempre compre na melhor condição.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
