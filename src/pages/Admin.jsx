import React, { useState } from 'react';
import { LogOut, PlusCircle, List } from 'lucide-react';
import OSForm from '../components/OS/OSForm';
import OSList from '../components/OS/OSList';
import './Admin.css';

const ADMIN_PASSWORD = 'mixcell2024';
const AUTH_KEY = 'mixcell_admin_auth';

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === 'true');
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState(false);
  const [tab, setTab] = useState('nova');
  const [editingOS, setEditingOS] = useState(null);

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
        </nav>
        <button className="admin-logout" onClick={handleLogout} title="Sair">
          <LogOut size={18} />
        </button>
      </header>
      <main className="admin-main">
        {tab === 'nova' && <OSForm editing={editingOS} onSaved={handleSaved} />}
        {tab === 'ordens' && <OSList onEdit={handleEdit} />}
      </main>
    </div>
  );
}
