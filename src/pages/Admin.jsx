import React, { useState, useMemo } from 'react';
import { LogOut, PlusCircle, List, Truck, TrendingUp, Users, Wrench } from 'lucide-react';
import OSForm from '../components/OS/OSForm';
import OSList from '../components/OS/OSList';
import Fornecedores from '../components/OS/Fornecedores';
import './Admin.css';

const ADMIN_PASSWORD = 'mixcell2024';
const AUTH_KEY = 'mixcell_admin_auth';

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === 'true');
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState(false);
  const [tab, setTab] = useState('nova');
  const [editingOS, setEditingOS] = useState(null);

  const metrics = useMemo(() => {
    const ordens = JSON.parse(localStorage.getItem('mixcell_os') || '[]');
    const hoje = new Date().toISOString().slice(0, 10);
    const mesAtual = hoje.slice(0, 7);
    
    // 1. Faturamento de Hoje (Apenas OSs Entregues concluídas hoje)
    const faturamentoHoje = ordens
      .filter(o => o.status === 'Entregue' && o.dataEntrada === hoje)
      .reduce((acc, o) => {
        const servs = (o.servicosSelecionados || []).reduce((sum, s) => sum + parseFloat(o.servicosValores?.[s] || 0), 0);
        const itens = (o.itensPersonalizados || []).reduce((sum, i) => sum + parseFloat(i.valor || 0), 0);
        const total = Math.max(0, servs + itens - parseFloat(o.desconto || 0));
        return acc + total;
      }, 0);

    // 2. Novos Clientes no Mês
    const clientesPrimeiraData = {};
    ordens.forEach(o => {
      const nome = o.clienteNome?.trim();
      const data = o.dataEntrada;
      if (nome && data) {
        if (!clientesPrimeiraData[nome] || data < clientesPrimeiraData[nome]) {
          clientesPrimeiraData[nome] = data;
        }
      }
    });
    const novosClientesMes = Object.values(clientesPrimeiraData).filter(data => data.startsWith(mesAtual)).length;

    // 3. OS Ativas (todas exceto Entregue e Sem conserto)
    const osAtivas = ordens.filter(o => o.status !== 'Entregue' && o.status !== 'Sem conserto').length;

    return {
      faturamentoHoje,
      novosClientesMes,
      osAtivas
    };
  }, [tab, editingOS]);

  function handleLogin(e) {
    e.preventDefault();
    if (pwInput === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      setAuthed(true);
    } else {
      setPwError(true);
      setTimeout(() => setPwError(false), 2000);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  }

  function handleEdit(os) {
    setEditingOS(os);
    setTab('nova');
  }

  function handleSaved() {
    setEditingOS(null);
    setTab('ordens');
  }

  if (!authed) {
    return (
      <div className="admin-login">
        <div className="login-card">
          <div className="login-logo">
            <span className="login-logo-icon">🔧</span>
            <h1>Mix Cell</h1>
            <p>Área Administrativa</p>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Senha de acesso"
              value={pwInput}
              onChange={e => setPwInput(e.target.value)}
              className={pwError ? 'error' : ''}
              autoFocus
            />
            {pwError && <span className="login-error">Senha incorreta</span>}
            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="admin-header-left">
          <span className="admin-logo">🔧 Mix Cell</span>
          <span className="admin-subtitle">Ordens de Serviço</span>
        </div>
        <nav className="admin-tabs">
          <button className={tab === 'nova' ? 'active' : ''} onClick={() => { setTab('nova'); setEditingOS(null); }}>
            <PlusCircle size={16} /> Nova OS
          </button>
          <button className={tab === 'ordens' ? 'active' : ''} onClick={() => setTab('ordens')}>
            <List size={16} /> Ordens
          </button>
          <button className={tab === 'fornecedores' ? 'active' : ''} onClick={() => setTab('fornecedores')}>
            <Truck size={16} /> Fornecedores
          </button>
        </nav>
        <button className="admin-logout" onClick={handleLogout} title="Sair">
          <LogOut size={18} />
        </button>
      </header>
      <main className="admin-main">
        {/* Painel de Métricas (Dashboard) - Oculto em modo de impressão */}
        <div className="admin-dashboard-metrics screen-only">
          <div className="metric-card">
            <div className="metric-icon-wrapper green">
              <TrendingUp size={24} />
            </div>
            <div className="metric-info">
              <span className="metric-label">Faturamento Hoje</span>
              <span className="metric-value">R$ {metrics.faturamentoHoje.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon-wrapper blue">
              <Users size={24} />
            </div>
            <div className="metric-info">
              <span className="metric-label">Novos Clientes (Mês)</span>
              <span className="metric-value">{metrics.novosClientesMes}</span>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon-wrapper purple">
              <Wrench size={24} />
            </div>
            <div className="metric-info">
              <span className="metric-label">OS Ativas</span>
              <span className="metric-value">{metrics.osAtivas}</span>
            </div>
          </div>
        </div>

        {tab === 'nova' && <OSForm editing={editingOS} onSaved={handleSaved} />}
        {tab === 'ordens' && <OSList onEdit={handleEdit} />}
        {tab === 'fornecedores' && <Fornecedores />}
      </main>
    </div>
  );
}
