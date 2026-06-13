import React from 'react';
import './TopBar.css';

const messages = [
  "Indicações de quem conserta celulares e vende acessórios todos os dias",
  "Compare preços em 5 marketplaces — Mix Cell",
  "4.9★ no Google · 88 avaliações reais · Canoas/RS",
  "11 anos de confiança em Canoas/RS",
  "Frete grátis acima de R$ 99 na Shopee",
];

export default function TopBar() {
  const repeated = [...messages, ...messages]; // loop perfeito

  return (
    <div className="topbar">
      <div className="topbar__track">
        {repeated.map((msg, i) => (
          <span key={i} className="topbar__item">
            <span className="topbar__dot">⚡</span>
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
