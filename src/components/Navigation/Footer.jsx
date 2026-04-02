import React from 'react';
import { MapPin, Clock, Instagram } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-column">
            <div className="footer-logo">
              <div className="logo-text">
                <span className="logo-mix">MIX</span>
                <span className="logo-cell">CELL</span>
              </div>
            </div>
            <p className="footer-desc">
              Especialistas em reparos de celulares e acessórios premium. Mais de 15.000 aparelhos consertados em quase 11 anos de confiança.
            </p>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Localização</h4>
            <div className="footer-info-item">
              <MapPin size={20} className="footer-icon" />
              <a 
                href="https://www.google.com.br/maps/place/Mix+Cell+Assistencia+Tecnica/@-29.9554357,-51.4580622,11z/data=!4m10!1m2!2m1!1smix+cell+assist%C3%AAncia+t%C3%A9cnica!3m6!1s0x951971fbbb7bf9d9:0xee539699817dd36a!8m2!3d-29.9554357!4d-51.1696711!15sCh5taXggY2VsbCBhc3Npc3TDqm5jaWEgdMOpY25pY2FaICIebWl4IGNlbGwgYXNzaXN0w6puY2lhIHTDqWNuaWNhkgEQY2VsbF9waG9uZV9zdG9yZZoBI0NoWkRTVWhOTUc5blMwVkpRMEZuVFVOSk1YRjFOR05SRUFF4AEA-gEECAAQSA!16s%2Fg%2F11gkxcc2jn?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-link-text"
              >
                Rua Júlio de Castilhos, 634 - Loja 2<br/>Canoas - RS
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Horário de Atendimento</h4>
            <div className="footer-info-item">
              <Clock size={20} className="footer-icon" />
              <div className="footer-time-text">
                <p>Seg a Sexta: 09:00 às 12:00 e 14:00 às 17:00</p>
                <p>Sábados: 09:00 às 12:00</p>
              </div>
            </div>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Redes Sociais</h4>
            <a href="https://www.instagram.com/mixcellassistencia/" target="_blank" rel="noopener noreferrer" className="social-link">
              <Instagram size={24} />
              <span>Siga no Instagram</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-links">
            <a href="#" className="text-link">Política de Privacidade</a>
            <span className="divider">•</span>
            <a href="#" className="text-link">Termos e Serviços</a>
          </div>
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} Mix Cell. Todos os direitos reservados para <strong>Creativ AI Soluções</strong>.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
