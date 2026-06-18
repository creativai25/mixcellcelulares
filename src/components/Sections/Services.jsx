import React from 'react';
import { Smartphone, BatteryCharging, Mic, Disc, Zap, Cpu } from 'lucide-react';
import './Services.css';

const Services = () => {
  const servicesList = [
    {
      id: 1,
      icon: <Smartphone size={40} />,
      title: 'Troca de Telas',
      desc: 'Trabalhamos com tela paralelas, nacionais e originais*(ver disponibilidade).',
      price: 'A partir de R$ 250,00',
    },
    {
      id: 2,
      icon: <Zap size={40} />,
      title: 'Conector de Carga',
      desc: 'Celular não carrega ou apresenta mal contato? Substituímos o dock de carga.',
      price: 'A partir de R$ 80',
    },
    {
      id: 3,
      icon: <BatteryCharging size={40} />,
      title: 'Troca de Bateria',
      desc: 'As baterias tem 90 dias corridos de garantia.',
      price: 'A partir de R$ 120',
    },
    {
      id: 4,
      icon: <Mic size={40} />,
      title: 'Troca de Microfone',
      desc: 'Áudio baixo nas ligações ou WhatsApp? Reparo rápido de microfones e alto-falantes.',
      price: 'A partir de R$ 90',
    },
    {
      id: 5,
      icon: <Disc size={40} />,
      title: 'Tampa Traseira (iPhone)',
      desc: 'Troca a laser da tampa de vidro traseira do seu iPhone. Fica como novo!',
      price: 'Consulte Modelo',
    },
    {
      id: 6,
      icon: <Cpu size={40} />,
      title: 'Sistema',
      desc: 'Celular travando, lento, com vírus ou não liga? Fazemos formatação, atualização de software, remoção de apps maliciosos e reparo de sistema.',
      price: 'A partir de R$ 70',
    }
  ];

  return (
    <section id="servicos" className="services-section">
      <div className="services-container">
        <div className="section-header center">
          <div className="section-badge">Consertos Rápidos</div>
          <h2 className="section-title">O Que Seu Aparelho Precisa?</h2>
          <p className="section-subtitle">
            Especialistas em reparos avançados. Diagnóstico gratuito e conserto na hora para a maioria dos defeitos.
          </p>
        </div>

        <div className="services-grid-main">
          {servicesList.map((service) => (
            <div key={service.id} className="service-card-main glass-panel">
              <div className="service-icon-main">{service.icon}</div>
              <h3 className="service-title-main">{service.title}</h3>
              <p className="service-desc-main">{service.desc}</p>
              <div className="service-footer">
                <span className="service-price">{service.price}</span>
                <button className="btn-service">Orçamento</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
