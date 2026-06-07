import React, { useState, useEffect } from 'react';
import { Save, Printer, RotateCcw } from 'lucide-react';
import OSTicket from './OSTicket';
import './OSForm.css';

const ITEMS = ['Smartphone', 'Tablet', 'Notebook', 'Smartwatch', 'Fone de Ouvido', 'Carregador', 'Outro'];
const MARCAS = ['Samsung', 'Apple', 'Motorola', 'Xiaomi', 'LG', 'Positivo', 'Multilaser', 'Huawei', 'Asus', 'Nokia', 'Outro'];
const SERVICOS = [
  { nome: 'Troca de Tela', preco: 0 },
  { nome: 'Troca de Bateria', preco: 0 },
  { nome: 'Conector de Carga', preco: 0 },
  { nome: 'Alto-falante / Microfone', preco: 0 },
  { nome: 'Câmera', preco: 0 },
  { nome: 'Placa / Solda', preco: 0 },
  { nome: 'Limpeza Interna', preco: 0 },
  { nome: 'Atualização de Software', preco: 0 },
  { nome: 'Desbloqueio', preco: 0 },
  { nome: 'Outro', preco: 0 },
];
const STATUS_OPTS = ['Em análise', 'Em reparo', 'Aguardando peça', 'Pronto', 'Entregue'];

function gerarNumOS() {
  const ordens = JSON.parse(localStorage.getItem('mixcell_os') || '[]');
  const ultimo = ordens.reduce((max, o) => Math.max(max, parseInt(o.numero || 0)), 0);
  return String(ultimo + 1).padStart(6, '0');
}

const BLANK = {
  numero: '',
  dataEntrada: new Date().toISOString().slice(0, 10),
  status: 'Em análise',
  // cliente
  clienteNome: '',
  clienteTel: '',
  // aparelho
  item: '',
  marca: '',
  modelo: '',
  serie: '',
  defeito: '',
  observacoes: '',
  senhaDesbloqueio: '',
  // serviços
  servicosSelecionados: [],
  servicosValores: {},
  // total
  desconto: '',
  formaPagamento: 'Dinheiro',
};

export default function OSForm({ editing, onSaved }) {
  const [form, setForm] = useState({ ...BLANK, numero: gerarNumOS() });
  const [showTicket, setShowTicket] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm(editing);
    } else {
      setForm({ ...BLANK, numero: gerarNumOS() });
    }
    setSaved(false);
  }, [editing]);

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function toggleServico(nome) {
    setForm(f => {
      const sel = f.servicosSelecionados.includes(nome)
        ? f.servicosSelecionados.filter(s => s !== nome)
        : [...f.servicosSelecionados, nome];
      return { ...f, servicosSelecionados: sel };
    });
  }

  function setServicoValor(nome, val) {
    setForm(f => ({ ...f, servicosValores: { ...f.servicosValores, [nome]: val } }));
  }

  function totalServicos() {
    return form.servicosSelecionados.reduce((acc, nome) => {
      return acc + (parseFloat(form.servicosValores[nome] || 0));
    }, 0);
  }

  function totalFinal() {
    const desc = parseFloat(form.desconto || 0);
    return Math.max(0, totalServicos() - desc);
  }

  function handleSave(e) {
    e.preventDefault();
    const ordens = JSON.parse(localStorage.getItem('mixcell_os') || '[]');
    if (editing) {
      const idx = ordens.findIndex(o => o.numero === form.numero);
      if (idx >= 0) ordens[idx] = form; else ordens.push(form);
    } else {
      ordens.push(form);
    }
    localStorage.setItem('mixcell_os', JSON.stringify(ordens));
    setSaved(true);
    setTimeout(() => { setSaved(false); onSaved && onSaved(); }, 1200);
  }

  function handlePrint() {
    setShowTicket(true);
    setTimeout(() => window.print(), 300);
  }

  return (
    <>
      {showTicket && (
        <div className="print-only">
          <OSTicket os={form} total={totalFinal()} />
        </div>
      )}

      <form className="os-form screen-only" onSubmit={handleSave}>
        <div className="os-form-header">
          <div className="os-numero">OS Nº <strong>{form.numero}</strong></div>
          <div className="os-actions">
            <button type="button" className="btn-print" onClick={handlePrint}>
              <Printer size={16} /> Imprimir
            </button>
            <button type="submit" className={`btn-save ${saved ? 'saved' : ''}`}>
              <Save size={16} /> {saved ? 'Salvo!' : editing ? 'Atualizar' : 'Salvar'}
            </button>
          </div>
        </div>

        {/* ── CLIENTE ── */}
        <section className="os-section">
          <h3>Cliente</h3>
          <div className="os-row">
            <div className="os-field flex2">
              <label>Nome</label>
              <input required value={form.clienteNome} onChange={e => set('clienteNome', e.target.value)} placeholder="Nome completo" />
            </div>
            <div className="os-field">
              <label>Telefone / WhatsApp</label>
              <input value={form.clienteTel} onChange={e => set('clienteTel', e.target.value)} placeholder="(21) 99999-9999" />
            </div>
          </div>
        </section>

        {/* ── APARELHO ── */}
        <section className="os-section">
          <h3>Aparelho</h3>
          <div className="os-row">
            <div className="os-field">
              <label>Item em manutenção</label>
              <select value={form.item} onChange={e => set('item', e.target.value)} required>
                <option value="">Selecionar...</option>
                {ITEMS.map(i => <option key={i}>{i}</option>)}
              </select>
            </div>
            <div className="os-field">
              <label>Marca</label>
              <select value={form.marca} onChange={e => set('marca', e.target.value)}>
                <option value="">Selecionar...</option>
                {MARCAS.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div className="os-field">
              <label>Modelo</label>
              <input value={form.modelo} onChange={e => set('modelo', e.target.value)} placeholder="Ex: Galaxy S21" />
            </div>
          </div>
          <div className="os-row">
            <div className="os-field">
              <label>Nº de Série / IMEI</label>
              <input value={form.serie} onChange={e => set('serie', e.target.value)} placeholder="IMEI ou nº de série" />
            </div>
            <div className="os-field">
              <label>Senha / Padrão de desbloqueio</label>
              <input value={form.senhaDesbloqueio} onChange={e => set('senhaDesbloqueio', e.target.value)} placeholder="Senha ou padrão" />
            </div>
          </div>
          <div className="os-row">
            <div className="os-field flex2">
              <label>Defeito relatado</label>
              <input required value={form.defeito} onChange={e => set('defeito', e.target.value)} placeholder="Descreva o defeito principal" />
            </div>
          </div>
          <div className="os-row">
            <div className="os-field flex2">
              <label>Observações</label>
              <textarea rows={2} value={form.observacoes} onChange={e => set('observacoes', e.target.value)} placeholder="Riscos, acessórios entregues, condições gerais..." />
            </div>
          </div>
        </section>

        {/* ── SERVIÇOS ── */}
        <section className="os-section">
          <h3>Serviços</h3>
          <div className="os-servicos-grid">
            {SERVICOS.map(s => (
              <label key={s.nome} className={`servico-item ${form.servicosSelecionados.includes(s.nome) ? 'selected' : ''}`}>
                <input type="checkbox" checked={form.servicosSelecionados.includes(s.nome)} onChange={() => toggleServico(s.nome)} />
                <span>{s.nome}</span>
                {form.servicosSelecionados.includes(s.nome) && (
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="R$ 0,00"
                    value={form.servicosValores[s.nome] || ''}
                    onChange={e => setServicoValor(s.nome, e.target.value)}
                    onClick={e => e.stopPropagation()}
                    className="servico-preco"
                  />
                )}
              </label>
            ))}
          </div>
        </section>

        {/* ── TOTAL ── */}
        <section className="os-section">
          <h3>Pagamento</h3>
          <div className="os-row">
            <div className="os-field">
              <label>Forma de pagamento</label>
              <select value={form.formaPagamento} onChange={e => set('formaPagamento', e.target.value)}>
                {['Dinheiro','PIX','Cartão Débito','Cartão Crédito','Transferência'].map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div className="os-field">
              <label>Desconto (R$)</label>
              <input type="number" min="0" step="0.01" value={form.desconto} onChange={e => set('desconto', e.target.value)} placeholder="0,00" />
            </div>
            <div className="os-field os-total-field">
              <label>Total</label>
              <div className="os-total-value">R$ {totalFinal().toFixed(2).replace('.', ',')}</div>
            </div>
          </div>
        </section>

        {/* ── STATUS ── */}
        <section className="os-section">
          <h3>Status</h3>
          <div className="os-status-group">
            {STATUS_OPTS.map(s => (
              <label key={s} className={`status-opt ${form.status === s ? 'active' : ''}`}>
                <input type="radio" name="status" value={s} checked={form.status === s} onChange={() => set('status', s)} />
                {s}
              </label>
            ))}
          </div>
        </section>
      </form>
    </>
  );
}
