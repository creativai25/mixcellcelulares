import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import WhatsAppButton from './components/UI/WhatsAppButton';
import Home from './pages/Home';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota admin — sem navbar/whatsapp */}
        <Route path="/admin" element={<Admin />} />

        {/* Rotas públicas */}
        <Route path="/*" element={
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </main>
            <WhatsAppButton />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
