import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/Navigation/TopBar';
import Navbar from './components/Navigation/Navbar';
import Footer from './components/Navigation/Footer';
import WhatsAppButton from './components/UI/WhatsAppButton';
import CookieBanner from './components/UI/CookieBanner';

// Pages
import Home from './pages/Home';
import Admin from './pages/Admin';

// Lazy imports para performance
const Loja      = React.lazy(() => import('./pages/Loja'));
const Linhas    = React.lazy(() => import('./pages/Linhas'));
const Categoria = React.lazy(() => import('./pages/Categoria'));
const Produto   = React.lazy(() => import('./pages/Produto'));
const Servicos  = React.lazy(() => import('./pages/Servicos'));
const Sobre     = React.lazy(() => import('./pages/Sobre'));
const Contato   = React.lazy(() => import('./pages/Contato'));
const Privacidade = React.lazy(() => import('./pages/Privacidade'));
const Termos    = React.lazy(() => import('./pages/Termos'));

const Fallback = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ color: 'var(--mc-muted)', fontSize: 14 }}>Carregando…</div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota admin — sem navbar/whatsapp */}
        <Route path="/admin" element={<Admin />} />

        {/* Rotas públicas (loja) */}
        <Route path="/*" element={
          <div className="app-container">
            <TopBar />
            <Navbar />
            <main className="main-content">
              <React.Suspense fallback={<Fallback />}>
                <Routes>
                  <Route path="/"                                element={<Home />} />
                  <Route path="/loja"                            element={<Loja />} />
                  <Route path="/linhas"                          element={<Linhas />} />
                  <Route path="/loja/:categoria"                 element={<Categoria />} />
                  <Route path="/produto/:slug"                   element={<Produto />} />
                  <Route path="/servicos"                        element={<Servicos />} />
                  <Route path="/servicos/conserto-iphone-canoas" element={<Servicos servico="iphone" />} />
                  <Route path="/servicos/troca-tela-canoas"      element={<Servicos servico="tela" />} />
                  <Route path="/sobre"                           element={<Sobre />} />
                  <Route path="/contato"                         element={<Contato />} />
                  <Route path="/privacidade"                     element={<Privacidade />} />
                  <Route path="/termos"                          element={<Termos />} />
                  {/* 404 */}
                  <Route path="*" element={
                    <div style={{ textAlign:'center', padding:'80px 20px' }}>
                      <h1 style={{ fontSize:64, fontWeight:800, color:'var(--mc-sky)' }}>404</h1>
                      <p style={{ color:'var(--mc-muted)', marginTop:12 }}>Página não encontrada.</p>
                      <a href="/" className="btn btn--primary" style={{ marginTop:24, display:'inline-flex' }}>
                        Voltar ao início
                      </a>
                    </div>
                  } />
                </Routes>
              </React.Suspense>
            </main>
            <Footer />
            <WhatsAppButton />
            <CookieBanner />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
