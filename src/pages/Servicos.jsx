import React from 'react';
import PageWrapper from '../components/Layout/PageWrapper';
import ServicesSection from '../components/Sections/Services';
import { Smartphone, Shield, Clock, Truck, ChevronRight } from 'lucide-react';
import './Servicos.css';

export default function Servicos() {
  const steps = [
    {
      icon: <Clock size={28} className="text-sky" />,
      title: '1. Solicite Orçamento',
      desc: 'Descreva o problema do celular pelo WhatsApp. Respondemos com a estimativa de preço na hora.'
    },
    {
      icon: <Truck size={28} className="text-sky" />,
      title: '2. Coleta ou Entrega',
      desc: 'Traga o aparelho em nossa oficina ou solicite o serviço de coleta (consulte taxas de entrega).'
    },
    {
      icon: <Smartphone size={28} className="text-sky" />,
      title: '3. Reparo Técnico',
      desc: 'Nossos técnicos realizam a troca de telas, baterias ou soldas complexas utilizando peças selecionadas.'
    },
    {
      icon: <Shield size={28} className="text-sky" />,
      title: '4. Entrega e Garantia',
      desc: 'Retire seu aparelho pronto e testado. Oferecemos 90 dias de garantia corrida em todos os reparos.'
    }
  ];

  return (
    <PageWrapper
      title="Assistência Técnica"
      description="Conserto de celulares em Canoas/RS. Especialistas em troca de tela, bateria, conectores e reparo de placa. 11 anos de confiança."
    >
      <div className="servicos-page">
        {/* Intro */}
        <div className="servicos-intro container">
          <span className="badge badge--mix-cell">Assistência Técnica de Canoas/RS</span>
          <h1>Conserto Rápido de Celulares</h1>
          <p className="servicos-intro__lead">
            Com quase 11 anos de experiência e mais de 15 mil celulares consertados, oferecemos diagnósticos rápidos e reparos executados com o máximo rigor técnico.
          </p>
        </div>

        {/* Serviços Grid */}
        <ServicesSection />

        {/* Passo a Passo */}
        <div className="servicos-steps container">
          <div className="section-header center">
            <span className="badge badge--mix-cell">Fluxo de Bancada</span>
            <h2>Como Funciona o Conserto?</h2>
            <p className="section-subtitle">Processo ágil e transparente da avaliação inicial à entrega final</p>
          </div>

          <div className="servicos-steps__grid">
            {steps.map((step, idx) => (
              <div key={idx} className="step-card card">
                <div className="step-card__icon">{step.icon}</div>
                <h3 className="step-card__title">{step.title}</h3>
                <p className="step-card__desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="servicos-cta container">
          <div className="servicos-cta__inner card">
            <h2>Precisa de um conserto agora?</h2>
            <p>Fale diretamente com o nosso laboratório técnico para tirar dúvidas ou agendar o recolhimento do aparelho.</p>
            <button 
              className="btn btn--whatsapp btn--lg"
              onClick={() => window.open('https://wa.me/5551983215850?text=Olá, gostaria de solicitar um orçamento para conserto de celular.', '_blank')}
            >
              Iniciar Conversa no WhatsApp
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
