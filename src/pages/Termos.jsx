import React from 'react';
import PageWrapper from '../components/Layout/PageWrapper';

export default function Termos() {
  return (
    <PageWrapper
      title="Termos de Uso"
      description="Consulte os Termos de Uso do site da Mix Cell Celulares. Condições de uso da loja de afiliados e prestação de assistência."
    >
      <div className="container" style={{ padding: '60px var(--section-px)', maxWidth: '800px', lineHeight: '1.7' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--mc-navy)', marginBottom: '24px' }}>
          Termos de Uso
        </h1>
        <p style={{ color: 'var(--mc-muted)', marginBottom: '20px', fontSize: '14px' }}>
          Última atualização: Junho de 2026
        </p>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--mc-navy)', marginBottom: '12px' }}>
            1. Aceitação dos Termos
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Ao acessar o portal da Mix Cell Celulares (mixcellcelulares.shop), você concorda em cumprir e estar sujeito aos seguintes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve navegar em nosso site.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--mc-navy)', marginBottom: '12px' }}>
            2. Limitação de Responsabilidade da Loja de Afiliados
          </h2>
          <p style={{ marginBottom: '16px' }}>
            A Mix Cell atua exclusivamente como <strong>divulgadora e indicadora de produtos através de programas de afiliados</strong>. Não somos proprietários do estoque, não realizamos o envio de mercadorias físicas compradas via links e não processamos transações financeiras.
          </p>
          <p style={{ marginBottom: '16px' }}>
            Qualquer compra efetuada pelo usuário é finalizada nas plataformas parceiras (como Amazon, Shopee, Mercado Livre, Magalu ou AliExpress). Por conseguinte, a responsabilidade sobre prazos de entrega, garantias do produto comprado, reembolsos e avarias de transporte recai inteiramente sobre a loja onde a compra foi concretizada.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--mc-navy)', marginBottom: '12px' }}>
            3. Parecer Técnico e Indicações Sinceras
          </h2>
          <p style={{ marginBottom: '16px' }}>
            O selo "Mix Cell Indica" e as descrições/pareceres de bancada presentes nas páginas de produtos representam nossa opinião profissional sincera, obtida através de consertos realizados no dia a dia. Elas servem como recomendações de durabilidade de carcaça e facilidade de reparo de peças, mas não representam uma garantia de que o produto jamais apresentará defeitos.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--mc-navy)', marginBottom: '12px' }}>
            4. Regras do Serviço de Coleta de Assistência
          </h2>
          <p style={{ marginBottom: '16px' }}>
            O serviço de "Busca e Entrega" (coleta de celular para conserto) é exclusivo para a região geográfica de Canoas/RS e adjacências (sob consulta de taxa e viabilidade de rota). A garantia dos consertos é de 90 dias corridos em conformidade com a legislação brasileira, cobrindo exclusivamente o componente substituído.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--mc-navy)', marginBottom: '12px' }}>
            5. Foro
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Fica eleito o Foro da Comarca de Canoas/RS para dirimir quaisquer dúvidas ou controvérsias decorrentes destes Termos de Uso.
          </p>
        </section>
      </div>
    </PageWrapper>
  );
}
