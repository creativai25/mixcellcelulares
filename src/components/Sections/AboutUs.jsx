import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <section id="sobre" className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="section-badge">Sobre a Mix Cell</div>
          <h2 className="section-title">Tecnologia, Curadoria <br/>e <span className="text-gradient">11 Anos de Confiança</span></h2>
          <p className="about-description">
            A Mix Cell nasceu do desejo de guiar o consumidor de tecnologia com a máxima transparência. Nossa trajetória é baseada na confiança de quem realmente entende o que acontece por dentro de cada aparelho.
          </p>
          <p className="about-description">
            Após realizar mais de <strong>15.000 consertos</strong> ao longo de 11 anos de atividade técnica de laboratório, adquirimos uma bagagem incomparável sobre quais marcas duram e quais falham rapidamente. Hoje, usamos esse conhecimento para analisar e indicar as melhores ofertas de celulares e acessórios da internet.
          </p>
          <div className="about-highlights">
            <div className="highlight-item">
              <div className="highlight-icon">🏆</div>
              <span>Curadoria Técnica Rigorosa</span>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">⏱️</div>
              <span>Ofertas Atualizadas Diariamente</span>
            </div>
          </div>
        </div>
        <div className="about-image-wrapper">
          <div className="about-image-decoration"></div>
          {/* Store Video */}
          <div className="about-image glass-panel video-container">
            <video 
              src="/loja-video.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="about-video-player"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
