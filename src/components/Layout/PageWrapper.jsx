import React, { useEffect } from 'react';

export default function PageWrapper({ title, description, children }) {
  useEffect(() => {
    // Atualiza o título da página (SEO e aba)
    document.title = `${title} | Mix Cell Celulares`;

    // Atualiza a meta descrição
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description || 'Mix Cell Celulares — Comparador de preços e assistência técnica confiável em Canoas/RS com 11 anos de tradição.';

    // Restaura o scroll para o topo de forma instantânea
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [title, description]);

  return <div className="page-wrapper animate-fade-up">{children}</div>;
}
