import React from 'react';
import './OSTicket.css';

export default function OSTicket({ os, total }) {
  const hoje = new Date().toLocaleDateString('pt-BR');
  const horaEntrada = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="ticket">
      <div className="ticket-header">
        <div className="ticket-logo">🔧 MIX CELL</div>
        <div className="ticket-sub">Assistência Técnica</div>
        <div className="ticket-sub">Niterói - Canoas / RJ</div>
        <div className="ticket-divider">- - - - - - - - - - - - - - - - -</div>
      </div>

      <div className="ticket-row">
        <span>OS Nº</span><strong>{os.numero}</strong>
      </div>
      <div className="ticket-row">
        <span>Data</span><span>{os.dataEntrada || hoje} {horaEntrada}</span>
      </div>
      <div className="ticket-divider">- - - - - - - - - - - - - - - - -</div>

      <div className="ticket-block">
        <div className="ticket-label">CLIENTE</div>
        <div>{os.clienteNome}</div>
        {os.clienteTel && <div>{os.clienteTel}</div>}
      </div>
      <div className="ticket-divider">- - - - - - - - - - - - - - - - -</div>

      <div className="ticket-block">
        <div className="ticket-label">APARELHO</div>
        <div>{[os.item, os.marca, os.modelo].filter(Boolean).join(' · ')}</div>
        {os.serie && <div>IMEI/Série: {os.serie}</div>}
        {os.senhaDesbloqueio && <div>Senha: {os.senhaDesbloqueio}</div>}
      </div>
      <div className="ticket-divider">- - - - - - - - - - - - - - - - -</div>

      <div className="ticket-block">
        <div className="ticket-label">DEFEITO</div>
        <div>{os.defeito}</div>
        {os.observacoes && <div className="ticket-obs">{os.observacoes}</div>}
      </div>
      <div className="ticket-divider">- - - - - - - - - - - - - - - - -</div>

      {os.servicosSelecionados?.length > 0 && (
        <>
          <div className="ticket-block">
            <div className="ticket-label">SERVIÇOS</div>
            {os.servicosSelecionados.map(s => (
              <div key={s} className="ticket-row">
                <span>{s}</span>
                <span>R$ {parseFloat(os.servicosValores?.[s] || 0).toFixed(2).replace('.', ',')}</span>
              </div>
            ))}
          </div>
          <div className="ticket-divider">- - - - - - - - - - - - - - - - -</div>
        </>
      )}

      {os.desconto > 0 && (
        <div className="ticket-row">
          <span>Desconto</span><span>- R$ {parseFloat(os.desconto).toFixed(2).replace('.', ',')}</span>
        </div>
      )}
      <div className="ticket-row ticket-total">
        <span>TOTAL</span><strong>R$ {parseFloat(total || 0).toFixed(2).replace('.', ',')}</strong>
      </div>
      {os.formaPagamento && (
        <div className="ticket-row">
          <span>Pagamento</span><span>{os.formaPagamento}</span>
        </div>
      )}

      <div className="ticket-divider">- - - - - - - - - - - - - - - - -</div>
      <div className="ticket-footer">
        <div>GARANTIA: 90 dias nos serviços</div>
        <div>executados pela Mix Cell.</div>
        <div className="ticket-spacer" />
        <div>Obrigado pela preferência!</div>
        <div>mixcellcelulares.shop</div>
      </div>
    </div>
  );
}
