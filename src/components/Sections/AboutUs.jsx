import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <section id="sobre" className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="section-badge">Sobre a Mix Cell</div>
          <h2 className="section-title">Tecnologia, Qualidade <br/>e <span className="text-gradient">11 Anos de Confiança</span></h2>
          <p className="about-description">
            A Mix Cell Assistência Técnica nasceu em Canoas - RS com um único propósito: devolver a vida ao seu principal instrumento de trabalho e comunicação com a máxima agilidade e qualidade do mercado.
          </p>
          <p className="about-description">
            Nós sabemos o quanto ficar sem celular impacta o seu dia a dia. Por isso, oferecemos o serviço de <strong>Busca e Entrega</strong>, e já consertamos mais de <strong>15.000 aparelhos</strong> ao longo de quase 11 anos de trajetória.
          </p>
          <div className="about-highlights">
            <div className="highlight-item">
              <div className="highlight-icon">🏆</div>
              <span>Equipe Técnica Especializada</span>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">⏱️</div>
              <span>Reparos a partir de 1h</span>
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
