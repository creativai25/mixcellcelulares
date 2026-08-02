import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Trash2, Edit2, Phone, DollarSign, Calendar } from 'lucide-react';
import './Fornecedores.css';

export default function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [nome, setNome] = useState('');
  const [tel, setTel] = useState('');
  const [custoMotoboy, setCustoMotoboy] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [editingId, setEditingId] = useState(null);
  
  // Relatórios
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  });

  useEffect(() => {
    load();
  }, []);

  function load() {
    const list = JSON.parse(localStorage.getItem('mixcell_fornecedores') || '[]');
    setFornecedores(list);
  }

  function handleSave(e) {
    e.preventDefault();
    if (!nome.trim()) return;

    const list = JSON.parse(localStorage.getItem('mixcell_fornecedores') || '[]');
    const newFornecedor = {
      id: editingId || Date.now().toString(),
      nome: nome.trim(),
      tel: tel.trim(),
      custoMotoboy: parseFloat(custoMotoboy || 0),
      observacoes: observacoes.trim()
    };

    if (editingId) {
      const idx = list.findIndex(f => f.id === editingId);
      if (idx >= 0) list[idx] = newFornecedor;
    } else {
      list.push(newFornecedor);
    }

    localStorage.setItem('mixcell_fornecedores', JSON.stringify(list));
    setFieldsBlank();
    load();
  }

  function setFieldsBlank() {
    setNome('');
    setTel('');
    setCustoMotoboy('');
    setObservacoes('');
    setEditingId(null);
  }

  function handleEdit(f) {
    setEditingId(f.id);
    setNome(f.nome);
    setTel(f.tel);
    setCustoMotoboy(f.custoMotoboy || '');
    setObservacoes(f.observacoes);
  }

  function handleDelete(id, name) {
    if (!confirm(`Deseja excluir o fornecedor "${name}"?`)) return;
    const list = JSON.parse(localStorage.getItem('mixcell_fornecedores') || '[]');
    const updated = list.filter(f => f.id !== id);
    localStorage.setItem('mixcell_fornecedores', JSON.stringify(updated));
    load();
  }

  // Estatísticas de gastos por fornecedor baseadas no histórico de OS
  const relatorioGastos = useMemo(() => {
    const ordens = JSON.parse(localStorage.getItem('mixcell_os') || '[]');
    
    // Filtrar ordens do mês selecionado
    const ordensDoMes = ordens.filter(os => {
      if (!os.dataEntrada) return false;
      return os.dataEntrada.startsWith(selectedMonth);
    });

    const gastos = {};
    
    // Inicializar fornecedores conhecidos
    fornecedores.forEach(f => {
      gastos[f.id] = {
        id: f.id,
        nome: f.nome,
        pecasTotal: 0,
        motoboyTotal: 0,
        totalGeral: 0,
        pecasCompradas: []
      };
    });

    // Adicionar um fornecedor "Não definido" para itens sem fornecedorId ou fornecedores excluídos
    const ID_OUTROS = 'outros';
    gastos[ID_OUTROS] = {
      id: ID_OUTROS,
      nome: 'Sem Fornecedor / Outros',
      pecasTotal: 0,
      motoboyTotal: 0,
      totalGeral: 0,
      pecasCompradas: []
    };

    // Processar itens das ordens do mês
    ordensDoMes.forEach(os => {
      if (os.itensPersonalizados) {
        os.itensPersonalizados.forEach(item => {
          const fid = item.fornecedorId || ID_OUTROS;
          const custoPeca = parseFloat(item.valorCusto || 0);
          const custoMoto = parseFloat(item.valorMotoboy || 0);
          
          if (!gastos[fid]) {
            gastos[fid] = {
              id: fid,
              nome: fornecedores.find(f => f.id === fid)?.nome || 'Outro Fornecedor',
              pecasTotal: 0,
              motoboyTotal: 0,
              totalGeral: 0,
              pecasCompradas: []
            };
          }

          gastos[fid].pecasTotal += custoPeca;
          gastos[fid].motoboyTotal += custoMoto;
          gastos[fid].totalGeral += (custoPeca + custoMoto);
          if (item.descricao) {
            gastos[fid].pecasCompradas.push({
              os: os.numero,
              cliente: os.clienteNome,
              aparelho: `${os.marca} ${os.modelo}`.trim(),
              descricao: item.descricao,
              custo: custoPeca,
              motoboy: custoMoto
            });
          }
        });
      }
    });

    // Ordena do maior gasto para o menor e remove quem não teve nenhum gasto (exceto se for cadastrado)
    return Object.values(gastos).sort((a, b) => b.totalGeral - a.totalGeral);
  }, [fornecedores, selectedMonth]);

  return (
    <div className="fornecedores-tab">
      <div className="fornecedores-layout">
        
        {/* Form Cadastro */}
        <div className="fornecedores-card form-card">
          <h3>{editingId ? 'Editar Fornecedor' : 'Cadastrar Fornecedor'}</h3>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Nome do Fornecedor *</label>
              <input required value={nome} onChange={e => setNome(e.target.value)} placeholder="Ex: Central das Peças" />
            </div>
            <div className="form-group">
              <label>Telefone / WhatsApp</label>
              <input value={tel} onChange={e => setTel(e.target.value)} placeholder="Ex: (51) 98888-8888" />
            </div>
            <div className="form-group">
              <label>Custo Padrão Motoboy (R$)</label>
              <input type="number" min="0" step="0.01" value={custoMotoboy} onChange={e => setCustoMotoboy(e.target.value)} placeholder="0,00" />
            </div>
            <div className="form-group">
              <label>Observações</label>
              <textarea rows={3} value={observacoes} onChange={e => setObservacoes(e.target.value)} placeholder="Endereço, chave pix, etc..." />
            </div>
            <div className="form-actions">
              {editingId && (
                <button type="button" className="btn-cancel" onClick={setFieldsBlank}>Cancelar</button>
              )}
              <button type="submit" className="btn-submit">
                <Plus size={16} /> {editingId ? 'Atualizar' : 'Adicionar'}
              </button>
            </div>
          </form>
        </div>

        {/* Lista de Fornecedores */}
        <div className="fornecedores-card list-card">
          <h3>Fornecedores Cadastrados</h3>
          {fornecedores.length === 0 ? (
            <p className="empty-text">Nenhum fornecedor cadastrado.</p>
          ) : (
            <div className="fornecedores-list">
              {fornecedores.map(f => (
                <div key={f.id} className="fornecedor-item-row">
                  <div className="fornecedor-info">
                    <div className="fornecedor-name">{f.nome}</div>
                    <div className="fornecedor-details">
                      {f.tel && <span><Phone size={12} /> {f.tel}</span>}
                      <span><DollarSign size={12} /> Motoboy: R$ {parseFloat(f.custoMotoboy || 0).toFixed(2).replace('.', ',')}</span>
                    </div>
                    {f.observacoes && <p className="fornecedor-obs">{f.observacoes}</p>}
                  </div>
                  <div className="fornecedor-item-actions">
                    <button title="Editar" className="btn-edit" onClick={() => handleEdit(f)}><Edit2 size={14} /></button>
                    <button title="Excluir" className="btn-delete-small" onClick={() => handleDelete(f.id, f.nome)}><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Relatórios Mensais de Gastos */}
      <div className="relatorio-gastos-section">
        <div className="relatorio-header">
          <div className="relatorio-title">
            <Calendar size={18} />
            <h3>Relatório de Custos e Compras por Fornecedor</h3>
          </div>
          <input
            type="month"
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            className="month-picker"
          />
        </div>

        <div className="relatorio-fornecedores-grid">
          {relatorioGastos.filter(g => g.totalGeral > 0 || g.id !== 'outros').map(g => (
            <div key={g.id} className="fornecedores-card gasto-card">
              <div className="gasto-card-header">
                <h4>{g.nome}</h4>
                <div className="gasto-total">R$ {g.totalGeral.toFixed(2).replace('.', ',')}</div>
              </div>
              <div className="gasto-breakdown">
                <div>Peças: <strong>R$ {g.pecasTotal.toFixed(2).replace('.', ',')}</strong></div>
                <div>Motoboy: <strong>R$ {g.motoboyTotal.toFixed(2).replace('.', ',')}</strong></div>
              </div>

              {g.pecasCompradas.length === 0 ? (
                <p className="no-parts-text">Nenhuma compra registrada neste mês.</p>
              ) : (
                <div className="pecas-compradas-list">
                  <h5>Itens comprados:</h5>
                  <ul>
                    {g.pecasCompradas.map((comp, idx) => (
                      <li key={idx} className="peca-compra-item">
                        <div className="peca-desc">
                          <strong>{comp.descricao}</strong>
                          <span>OS #{comp.os} - {comp.aparelho}</span>
                        </div>
                        <div className="peca-valores">
                          <span>Peça: R$ {comp.custo.toFixed(2).replace('.', ',')}</span>
                          {comp.motoboy > 0 && <span>Motoboy: R$ {comp.motoboy.toFixed(2).replace('.', ',')}</span>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
