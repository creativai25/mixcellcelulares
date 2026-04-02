import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import WhatsAppButton from './components/UI/WhatsAppButton';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
