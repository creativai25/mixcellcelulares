import React from 'react';
import MarketplaceBtn from '../UI/MarketplaceBtn';
import { AlertCircle } from 'lucide-react';
import './Comparador.css';

export default function Comparador({ marketplaces }) {
  // Mostra apenas marketplaces com link de afiliado real, ordenados pelo menor custo total
  const storeList = Object.entries(marketplaces)
    .map(([key, data]) => ({ key, ...data }))
    .filter((s) => s.url && String(s.url).trim() !== '')
    .sort((a, b) => (a.preco + (a.frete || 0)) - (b.preco + (b.frete || 0)));

  // Recalcula a "Melhor Preço" entre os visíveis (preferindo lojas sem taxa de importação)
  storeList.forEach((s) => { s.best = false; });
  const bestStore = storeList.find((s) => !s.alert) || storeList[0];
  if (bestStore) bestStore.best = true;

  if (storeList.length === 0) {
    return (
      <div className="comparador reveal">
        <div className="comparador__header">
          <h3 className="comparador__title">Comparador de Preços</h3>
        </div>
        <p className="comparador__empty">
          Estamos selecionando as melhores ofertas para este produto. Fale com a gente no WhatsApp que indicamos onde comprar com confiança.
        </p>
      </div>
    );
  }

  return (
    <div className="comparador reveal">
      <div className="comparador__header">
        <h3 className="comparador__title">Comparador de Preços</h3>
        <p className="comparador__subtitle">
          Buscamos as melhores ofertas nas principais lojas do mercado brasileiro em tempo real
        </p>
      </div>

      <div className="comparador__list">
        {storeList.map((store) => (
          <div key={store.key} className="comparador__item">
            <MarketplaceBtn storeKey={store.key} data={store} />
          </div>
        ))}
      </div>

      <div className="comparador__footer">
        <div className="comparador__disclaimer">
          <AlertCircle size={16} className="comparador__disclaimer-icon" />
          <span>
            <strong>Nota de Afiliado:</strong> Compras através dos links acima geram uma comissão para a Mix Cell Apoio Técnico, sem nenhum custo adicional para você. Isso nos ajuda a manter a nossa oficina ativa e testar novos produtos!
          </span>
        </div>
      </div>
    </div>
  );
}
