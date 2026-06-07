import React, { useState, useEffect } from 'react';
import { Search, Edit2, Trash2, Printer } from 'lucide-react';
import OSTicket from './OSTicket';
import './OSList.css';

const STATUS_CORES = {
  'Em análise':     '#f59e0b',
  'Em reparo':      '#3b82f6',
  'Aguardando peça':'#8b5cf6',
  'Pronto':         '#10b981',
  'Entregue':       '#6b7280',
};

export default function OSList({ onEdit }) {
  const [ordens, setOrdens] = useState([]);
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');
  const [printingOS, setPrintingOS] = useState(null);

  function load() {
    setOrdens(JSON.parse(localStorage.getItem('mixcell_os') || '[]').reverse());
  }

  useEffect(() => { load(); }, []);

  function handleDelete(numero) {
    if (!confirm(`Excluir OS Nº ${numero}?`)) return;
    const novas = JSON.parse(localStorage.getItem('mixcell_os') || '[]').filter(o => o.numero !== numero);
    localStorage.setItem('mixcell_os', JSON.stringify(novas));
    load();
  }

  function totalOS(os) {
    const servs = (os.servicosSelecionados || []).reduce((acc, s) => acc + parseFloat(os.servicosValores?.[s] || 0), 0);
    return Math.max(0, servs - parseFloat(os.desconto || 0));
  }

  function handlePrint(os) {
    setPrintingOS(os);
    setTimeout(() => window.print(), 300);
  }

  const filtradas = ordens.filter(o => {
    const q = busca.toLowerCase();
    const match = !q ||
      o.numero?.includes(q) ||
      o.clienteNome?.toLowerCase().includes(q) ||
      o.clienteTel?.includes(q) ||
      o.modelo?.toLowerCase().includes(q) ||
      o.defeito?.toLowerCase().includes(q);
    const st = !filtroStatus || o.status === filtroStatus;
    return match && st;
  });

  return (
    <>
      {printingOS && (
        <div className="print-only">
          <OSTicket os={printingOS} total={totalOS(printingOS)} />
        </div>
      )}

      <div className="oslist screen-only">
        <div className="oslist-toolbar">
          <div className="oslist-search">
            <Search size={16} />
            <input
              placeholder="Buscar por nº, cliente, modelo, defeito..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
            />
          </div>
          <select value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)} className="oslist-filter">
            <option value="">Todos os status</option>
            {Object.keys(STATUS_CORES).map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {filtradas.length === 0 ? (
          <div className="oslist-empty">Nenhuma ordem encontrada.</div>
        ) : (
          <div className="oslist-table-wrap">
            <table className="oslist-table">
              <thead>
                <tr>
                  <th>Nº OS</th>
                  <th>Data</th>
                  <th>Cliente</th>
                  <th>Aparelho</th>
                  <th>Defeito</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtradas.map(os => (
                  <tr key={os.numero}>
                    <td className="os-num">#{os.numero}</td>
                    <td className="os-date">{os.dataEntrada}</td>
                    <td>
                      <div className="os-cliente-nome">{os.clienteNome}</div>
                      {os.clienteTel && <div className="os-cliente-tel">{os.clienteTel}</div>}
                    </td>
                    <td>{[os.marca, os.modelo].filter(Boolean).join(' ')}</td>
                    <td className="os-defeito">{os.defeito}</td>
                    <td className="os-valor">R$ {totalOS(os).toFixed(2).replace('.', ',')}</td>
                    <td>
                      <span className="status-badge" style={{ '--cor': STATUS_CORES[os.status] || '#888' }}>
                        {os.status}
                      </span>
                    </td>
                    <td>
                      <div className="os-btns">
                        <button title="Imprimir" onClick={() => handlePrint(os)}><Printer size={15} /></button>
                        <button title="Editar" onClick={() => onEdit(os)}><Edit2 size={15} /></button>
                        <button title="Excluir" className="btn-del" onClick={() => handleDelete(os.numero)}><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="oslist-count">{filtradas.length} ordem{filtradas.length !== 1 ? 's' : ''}</div>
      </div>
    </>
  );
}
