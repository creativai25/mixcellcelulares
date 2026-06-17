import React, { useMemo } from 'react';
import PageWrapper from '../components/Layout/PageWrapper';
import ProductCard from '../components/UI/ProductCard';
import { products } from '../data/products';
import { linhas } from '../data/linhas';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Sparkles } from 'lucide-react';
import './Linhas.css';

export default function Linhas() {
  useScrollReveal();

  // Agrupa produtos por linha; mostra TODAS as linhas (as sem produto ficam "em breve")
  const grupos = useMemo(() => {
    return linhas.map((linha) => ({
      linha,
      itens: products.filter((p) => p.linha === linha.id && p.active),
    }));
  }, []);

  return (
    <PageWrapper
      title="Guia de Linhas — qual celular é o seu?"
      description="Entenda as linhas de cada marca (Motorola G, Samsung A, iPhone, Poco e mais) e descubra qual é a melhor escolha para você, explicado por quem conserta."
    >
      <div className="linhas-page container">
        <div className="linhas-page__header">
          <span className="badge badge--mix-cell">Guia de Compra</span>
          <h1 className="linhas-page__title">Qual linha combina com você?</h1>
          <p className="linhas-page__subtitle">
            Cada marca divide os celulares em "linhas". Entender a diferença evita você
            pagar por algo que não vai usar — ou ficar sem o que precisa. Abaixo, a explicação
            sincera de quem conserta esses aparelhos todos os dias.
          </p>
        </div>

        {grupos.map(({ linha, itens }) => (
          <section key={linha.id} id={linha.slug} className="linha-bloco reveal">
            <div className="linha-bloco__intro">
              <span className="linha-bloco__brand">{linha.brand}</span>
              <h2 className="linha-bloco__label">{linha.label}</h2>
              <p className="linha-bloco__bestfor">
                <Sparkles size={15} className="text-sky" /> Melhor para: {linha.bestFor}
              </p>
              <p className="linha-bloco__desc">{linha.description}</p>
            </div>

            {itens.length > 0 ? (
              <div className="linha-bloco__grid">
                {itens.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="linha-bloco__soon">
                <span className="linha-bloco__soon-badge">Em breve</span>
                <p>Estamos selecionando os melhores modelos desta linha. Volte logo — ou fale no WhatsApp que indicamos o ideal pra você agora mesmo.</p>
              </div>
            )}
          </section>
        ))}
      </div>
    </PageWrapper>
  );
}
