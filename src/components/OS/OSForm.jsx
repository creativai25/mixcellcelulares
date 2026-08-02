import React, { useState, useEffect, useMemo } from 'react';
import { Save, Printer, RotateCcw, Plus, Trash2, Camera, Send } from 'lucide-react';
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
const STATUS_OPTS = ['Em análise', 'Em reparo', 'Aguardando peça', 'Pronto', 'Entregue', 'Sem conserto'];

function gerarNumOS() {
  const ordens = JSON.parse(localStorage.getItem('mixcell_os') || '[]');
  const ultimo = ordens.reduce((max, o) => Math.max(max, parseInt(o.numero || 0)), 0);
  return String(ultimo + 1).padStart(6, '0');
}

const BLANK = {
  numero: '',
  dataEntrada: new Date().toISOString().slice(0, 10),
  tipo: 'Conserto',
  status: 'Em análise',
  clienteNome: '',
  clienteTel: '',
  item: '',
  marca: '',
  modelo: '',
  serie: '',
  defeito: '',
  diagnostico: '',
  observacoes: '',
  senhaDesbloqueio: '',
  servicosSelecionados: [],
  servicosValores: {},
  itensPersonalizados: [],
  desconto: '',
  formaPagamento: 'Dinheiro',
  fotoEntrada: '',
  fotoAberto: '',
  fotoPronto: '',
};

function getHistorico() {
  return JSON.parse(localStorage.getItem('mixcell_os') || '[]');
}

export default function OSForm({ editing, onSaved }) {
  const [form, setForm] = useState({ ...BLANK, numero: gerarNumOS() });
  const [showTicket, setShowTicket] = useState(false);
  const [saved, setSaved] = useState(false);
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    if (editing) {
      setForm(editing);
    } else {
      setForm({ ...BLANK, numero: gerarNumOS() });
    }
    setSaved(false);
  }, [editing]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('mixcell_fornecedores') || '[]');
    setFornecedores(list);
  }, []);

  // Sugestões do histórico
  const historico = useMemo(() => getHistorico(), [saved]);
  const marcasSugeridas = useMemo(() => {
    const set = new Set([...MARCAS, ...historico.map(o => o.marca).filter(Boolean)]);
    return [...set];
  }, [historico]);
  const modelosSugeridos = useMemo(() => {
    const modelos = historico
      .filter(o => !form.marca || o.marca === form.marca)
      .map(o => o.modelo).filter(Boolean);
    return [...new Set(modelos)];
  }, [historico, form.marca]);
  const descricoesSugeridas = useMemo(() => {
    const descsFromOS = historico.flatMap(o => (o.itensPersonalizados || []).map(i => i.descricao).filter(Boolean));
    const descsSaved = JSON.parse(localStorage.getItem('mixcell_servicos_custom') || '[]');
    return [...new Set([...descsFromOS, ...descsSaved])];
  }, [historico]);

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function addItem() {
    setForm(f => ({
      ...f,
      itensPersonalizados: [
        ...(f.itensPersonalizados || []),
        { descricao: '', fornecedorId: '', valorCusto: '', valorMotoboy: '', valor: '' }
      ]
    }));
  }
  function removeItem(idx) {
    setForm(f => ({ ...f, itensPersonalizados: f.itensPersonalizados.filter((_, i) => i !== idx) }));
  }
  function setItem(idx, field, value) {
    setForm(f => {
      const items = [...(f.itensPersonalizados || [])];
      let updatedItem = { ...items[idx], [field]: value };
      
      if (field === 'fornecedorId') {
        const sup = fornecedores.find(s => s.id === value);
        if (sup) {
          updatedItem.valorMotoboy = sup.custoMotoboy || '';
        } else {
          updatedItem.valorMotoboy = '';
        }
      }
      
      items[idx] = updatedItem;
      return { ...f, itensPersonalizados: items };
    });
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
    const fixos = form.servicosSelecionados.reduce((acc, nome) => acc + parseFloat(form.servicosValores[nome] || 0), 0);
    const livres = (form.itensPersonalizados || []).reduce((acc, i) => acc + parseFloat(i.valor || 0), 0);
    return fixos + livres;
  }

  function totalFinal() {
    const desc = parseFloat(form.desconto || 0);
    return Math.max(0, totalServicos() - desc);
  }

  function handleSave(e) {
    if (e) e.preventDefault();
    
    // Salvar descrições de serviços personalizados no cache para auto-complete
    if (form.itensPersonalizados) {
      const novasDesc = form.itensPersonalizados.map(i => i.descricao?.trim()).filter(Boolean);
      if (novasDesc.length > 0) {
        const salvas = JSON.parse(localStorage.getItem('mixcell_servicos_custom') || '[]');
        const totalSet = new Set([...salvas, ...novasDesc]);
        localStorage.setItem('mixcell_servicos_custom', JSON.stringify([...totalSet]));
      }
    }

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

  function handleDeleteForm() {
    if (!confirm(`Tem certeza que deseja excluir a OS Nº ${form.numero} permanentemente?`)) return;
    const ordens = JSON.parse(localStorage.getItem('mixcell_os') || '[]');
    const novas = ordens.filter(o => o.numero !== form.numero);
    localStorage.setItem('mixcell_os', JSON.stringify(novas));
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onSaved && onSaved();
    }, 500);
  }

  function handleFotoUpload(e, fase) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        set(fase, compressedBase64);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  function getWhatsAppLink() {
    const total = totalFinal();
    const servsText = form.servicosSelecionados.map(s => `- ${s}: R$ ${parseFloat(form.servicosValores[s] || 0).toFixed(2).replace('.', ',')}`).join('\n');
    const itensText = (form.itensPersonalizados || []).map(i => `- ${i.descricao}: R$ ${parseFloat(i.valor || 0).toFixed(2).replace('.', ',')}`).join('\n');
    
    let text = `Olá, *${form.clienteNome}*!\n\nA Ordem de Serviço *Nº ${form.numero}* do seu *${form.item} ${form.marca} ${form.modelo}* foi finalizada.\n\n*Status:* ${form.status}\n`;
    
    if (servsText || itensText) {
      text += `\n*Serviços realizados:*\n`;
      if (servsText) text += servsText + '\n';
      if (itensText) text += itensText + '\n';
    }
    
    if (parseFloat(form.desconto || 0) > 0) {
      text += `*Desconto:* - R$ ${parseFloat(form.desconto).toFixed(2).replace('.', ',')}\n`;
    }
    
    text += `*Total:* R$ ${total.toFixed(2).replace('.', ',')}\n`;
    text += `*Forma de Pagamento:* ${form.formaPagamento}\n\n`;
    text += `*Garantia:* 90 dias nos serviços executados.\n\nVocê já pode retirar o seu aparelho na *Mix Cell*. Agradecemos a preferência! 🔧`;
    
    const cleanPhone = form.clienteTel ? form.clienteTel.replace(/\D/g, '') : '';
    const phoneWithDDI = cleanPhone.length >= 10 && !cleanPhone.startsWith('55') ? '55' + cleanPhone : cleanPhone;
    
    return `https://api.whatsapp.com/send?phone=${phoneWithDDI}&text=${encodeURIComponent(text)}`;
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
            {editing && (
              <button type="button" className="btn-delete" onClick={handleDeleteForm}>
                <Trash2 size={16} /> Excluir OS
              </button>
            )}
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
              <input list="dl-marcas" value={form.marca} onChange={e => set('marca', e.target.value)} placeholder="Samsung, Apple..." autoComplete="off" />
              <datalist id="dl-marcas">
                {marcasSugeridas.map(m => <option key={m} value={m} />)}
              </datalist>
            </div>
            <div className="os-field">
              <label>Modelo</label>
              <input list="dl-modelos" value={form.modelo} onChange={e => set('modelo', e.target.value)} placeholder="Ex: Galaxy A34" autoComplete="off" />
              <datalist id="dl-modelos">
                {modelosSugeridos.map(m => <option key={m} value={m} />)}
              </datalist>
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
              <label>Diagnóstico Técnico (Problema & Diagnóstico)</label>
              <textarea rows={2} value={form.diagnostico} onChange={e => set('diagnostico', e.target.value)} placeholder="Descreva a análise técnica e peças a trocar..." />
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
          <h3>Serviços Estáticos</h3>
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

        {/* ── ITENS PERSONALIZADOS (ORÇAMENTO) ── */}
        <section className="os-section">
          <div className="os-itens-header">
            <h3>Itens do Orçamento</h3>
            <button type="button" className="btn-add-item" onClick={addItem}>
              <Plus size={14} /> Adicionar item
            </button>
          </div>
          <datalist id="dl-descricoes">
            {descricoesSugeridas.map(d => <option key={d} value={d} />)}
          </datalist>
          {(form.itensPersonalizados || []).length === 0 ? (
            <p className="os-itens-empty">Nenhum item. Clique em "Adicionar item" para inserir serviços livres.</p>
          ) : (
            <div className="os-itens-lista">
              {(form.itensPersonalizados || []).map((item, idx) => (
                <div key={idx} className="os-item-row-complex">
                  <div className="os-item-field flex2">
                    <label>Descrição</label>
                    <input
                      list="dl-descricoes"
                      className="os-item-desc"
                      placeholder="Descrição do serviço ou peça..."
                      value={item.descricao}
                      onChange={e => setItem(idx, 'descricao', e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                  <div className="os-item-field flex2">
                    <label>Fornecedor</label>
                    <select
                      value={item.fornecedorId}
                      onChange={e => setItem(idx, 'fornecedorId', e.target.value)}
                    >
                      <option value="">Selecionar fornecedor...</option>
                      {fornecedores.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
                    </select>
                  </div>
                  <div className="os-item-field">
                    <label>Custo Peça (R$)</label>
                    <input
                      type="number" min="0" step="0.01"
                      placeholder="0,00"
                      value={item.valorCusto || ''}
                      onChange={e => setItem(idx, 'valorCusto', e.target.value)}
                    />
                  </div>
                  <div className="os-item-field">
                    <label>Motoboy (R$)</label>
                    <input
                      type="number" min="0" step="0.01"
                      placeholder="0,00"
                      value={item.valorMotoboy || ''}
                      onChange={e => setItem(idx, 'valorMotoboy', e.target.value)}
                    />
                  </div>
                  <div className="os-item-field">
                    <label>Cobrado (R$)</label>
                    <input
                      type="number" min="0" step="0.01"
                      placeholder="0,00"
                      value={item.valor || ''}
                      onChange={e => setItem(idx, 'valor', e.target.value)}
                    />
                  </div>
                  <button type="button" className="btn-remove-item" onClick={() => removeItem(idx)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── IMAGENS DO APARELHO ── */}
        <section className="os-section">
          <h3>Imagens do Aparelho</h3>
          <div className="os-fotos-grid">
            
            {/* Foto Entrada */}
            <div className="foto-upload-box">
              <span className="foto-box-label">📸 Foto de Entrada (Aparelho Fechado)</span>
              {form.fotoEntrada ? (
                <div className="foto-preview-container">
                  <img src={form.fotoEntrada} alt="Foto Entrada" className="foto-preview-img" />
                  <div className="foto-overlay-actions">
                    <a href={form.fotoEntrada} download={`OS_${form.numero}_entrada.jpg`} className="btn-download-foto">Baixar</a>
                    <button type="button" className="btn-remove-foto" onClick={() => set('fotoEntrada', '')}>Excluir</button>
                  </div>
                </div>
              ) : (
                <label className="foto-input-label">
                  <Camera size={20} />
                  <span>Anexar/Tirar Foto</span>
                  <input type="file" accept="image/*" capture="environment" onChange={e => handleFotoUpload(e, 'fotoEntrada')} style={{ display: 'none' }} />
                </label>
              )}
            </div>

            {/* Foto Aberto */}
            <div className="foto-upload-box">
              <span className="foto-box-label">🛠️ Foto Aberto (Na Bancada)</span>
              {form.fotoAberto ? (
                <div className="foto-preview-container">
                  <img src={form.fotoAberto} alt="Foto Aberto" className="foto-preview-img" />
                  <div className="foto-overlay-actions">
                    <a href={form.fotoAberto} download={`OS_${form.numero}_aberto.jpg`} className="btn-download-foto">Baixar</a>
                    <button type="button" className="btn-remove-foto" onClick={() => set('fotoAberto', '')}>Excluir</button>
                  </div>
                </div>
              ) : (
                <label className="foto-input-label">
                  <Camera size={20} />
                  <span>Anexar/Tirar Foto</span>
                  <input type="file" accept="image/*" capture="environment" onChange={e => handleFotoUpload(e, 'fotoAberto')} style={{ display: 'none' }} />
                </label>
              )}
            </div>

            {/* Foto Pronto */}
            <div className="foto-upload-box">
              <span className="foto-box-label">✅ Foto Pronto (Concluído)</span>
              {form.fotoPronto ? (
                <div className="foto-preview-container">
                  <img src={form.fotoPronto} alt="Foto Pronto" className="foto-preview-img" />
                  <div className="foto-overlay-actions">
                    <a href={form.fotoPronto} download={`OS_${form.numero}_pronto.jpg`} className="btn-download-foto">Baixar</a>
                    <button type="button" className="btn-remove-foto" onClick={() => set('fotoPronto', '')}>Excluir</button>
                  </div>
                </div>
              ) : (
                <label className="foto-input-label">
                  <Camera size={20} />
                  <span>Anexar/Tirar Foto</span>
                  <input type="file" accept="image/*" capture="environment" onChange={e => handleFotoUpload(e, 'fotoPronto')} style={{ display: 'none' }} />
                </label>
              )}
            </div>

          </div>
        </section>

        {/* ── PAGAMENTO ── */}
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

        {/* ── TIPO + STATUS ── */}
        <section className="os-section">
          <div className="os-tipo-status-row">
            <div>
              <h3>Tipo</h3>
              <div className="os-status-group">
                {['Orçamento', 'Conserto'].map(t => (
                  <label key={t} className={`status-opt tipo-opt tipo-${t === 'Orçamento' ? 'orcamento' : 'conserto'} ${form.tipo === t ? 'active' : ''}`}>
                    <input type="radio" name="tipo" value={t} checked={form.tipo === t} onChange={() => set('tipo', t)} />
                    {t}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h3>Status</h3>
              <div className="os-status-group">
                {STATUS_OPTS.map(s => (
                  <label key={s} className={`status-opt ${form.status === s ? 'active' : ''}`}>
                    <input type="radio" name="status" value={s} checked={form.status === s} onChange={() => set('status', s)} />
                    {s}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── AÇÕES FINAIS (BOTTOM ACTIONS) ── */}
        <section className="os-section screen-only">
          <div className="os-form-bottom-actions">
            <button type="submit" className={`btn-save-large ${saved ? 'saved' : ''}`}>
              <Save size={18} /> {saved ? 'Ordem Salva com Sucesso!' : editing ? 'Atualizar Ordem de Serviço' : 'Salvar Ordem de Serviço'}
            </button>
            {['Pronto', 'Entregue', 'Sem conserto'].includes(form.status) && form.formaPagamento && (
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-send"
              >
                <Send size={18} /> Enviar Final de OS (WhatsApp)
              </a>
            )}
          </div>
        </section>
      </form>
    </>
  );
}
