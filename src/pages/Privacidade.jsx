import React from 'react';
import PageWrapper from '../components/Layout/PageWrapper';

export default function Privacidade() {
  return (
    <PageWrapper
      title="Política de Privacidade"
      description="Leia a política de privacidade da Mix Cell Celulares. Informações sobre proteção de dados, cookies e links de afiliados."
    >
      <div className="container" style={{ padding: '60px var(--section-px)', maxWidth: '800px', lineHeight: '1.7' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--mc-navy)', marginBottom: '24px' }}>
          Política de Privacidade
        </h1>
        <p style={{ color: 'var(--mc-muted)', marginBottom: '20px', fontSize: '14px' }}>
          Última atualização: Junho de 2026
        </p>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--mc-navy)', marginBottom: '12px' }}>
            1. Compromisso com a Privacidade
          </h2>
          <p style={{ marginBottom: '16px' }}>
            A Mix Cell está empenhada em proteger a privacidade dos visitantes do nosso site. Esta Política de Privacidade explica como gerenciamos as informações de navegação em nosso portal de afiliados e serviços.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--mc-navy)', marginBottom: '12px' }}>
            2. Coleta de Dados (Ausência de Cadastro)
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Como um portal de afiliados de MVP (Mínimo Produto Viável), a Mix Cell <strong>não realiza cadastro de usuários, logins ou coleta de dados pessoais</strong> diretamente em nossos servidores. Não mantemos banco de dados de clientes no site.
          </p>
          <p style={{ marginBottom: '16px' }}>
            Caso você utilize nossos botões de redirecionamento para o WhatsApp para falar com a assistência técnica ou solicitar orçamentos, seus dados (número de telefone e nome) serão processados diretamente no aplicativo do WhatsApp, sob a política de privacidade da Meta Inc.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--mc-navy)', marginBottom: '12px' }}>
            3. Uso de Cookies e Links de Afiliados
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Nossa plataforma exibe links de afiliados para grandes marketplaces (Amazon, Shopee, Mercado Livre, Magalu e AliExpress). Ao clicar nesses links, as respectivas lojas parceiras podem inserir um cookie no seu navegador para registrar que o clique se originou do site da Mix Cell.
          </p>
          <p style={{ marginBottom: '16px' }}>
            Esse cookie serve exclusivamente para comissionar a indicação técnica da Mix Cell em caso de compra futura, sem gerar qualquer custo extra para você. Você pode gerenciar, desativar ou limpar esses cookies diretamente nas configurações de privacidade do seu navegador.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--mc-navy)', marginBottom: '12px' }}>
            4. Seus Direitos (LGPD)
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Em conformidade com a Lei Geral de Proteção de Dados (LGPD), garantimos total transparência. Como não armazenamos seus dados pessoais de cadastro, seus dados de navegação são regidos pelo navegador. Você tem o direito de rejeitar nossos cookies de afiliados a qualquer momento usando nosso banner de consentimento de cookies.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--mc-navy)', marginBottom: '12px' }}>
            5. Alterações nesta Política
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Podemos atualizar esta política periodicamente para refletir mudanças operacionais ou legislativas. Recomendamos a leitura desta página regularmente.
          </p>
        </section>
      </div>
    </PageWrapper>
  );
}
