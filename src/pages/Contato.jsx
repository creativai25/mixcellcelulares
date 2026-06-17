import React, { useState } from 'react';
import PageWrapper from '../components/Layout/PageWrapper';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, Instagram } from 'lucide-react';
import './Contato.css';

export default function Contato() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simula envio de formulário
    setTimeout(() => {
      setFormSubmitted(true);
      setFormData({ nome: '', email: '', telefone: '', mensagem: '' });
    }, 800);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <PageWrapper
      title="Fale Conosco"
      description="Entre em contato com a equipe Mix Cell Celulares em Canoas/RS. Envie mensagens, consulte nosso endereço e horário de funcionamento."
    >
      <div className="contato-page container">
        {/* Cabeçalho */}
        <div className="contato-page__header">
          <span className="badge badge--mix-cell">Canais de Atendimento</span>
          <h1 className="contato-page__title">Fale com a Mix Cell</h1>
          <p className="loja-page__subtitle">
            Estamos prontos para tirar suas dúvidas sobre produtos, orçamentos de conserto e parcerias.
          </p>
        </div>

        <div className="contato-page__grid">
          {/* Esquerda: Informações e Horários */}
          <div className="contato-page__info">
            <div className="contato-info-card card">
              <h3>Informações de Contato</h3>
              
              <div className="contato-info-item">
                <div className="contato-info-item__icon">
                  <MapPin size={20} className="text-sky" />
                </div>
                <div>
                  <h4>Nossa Loja / Assistência</h4>
                  <p>Rua Júlio de Castilhos, 634 — Canoas / RS</p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Rua+Julio+de+Castilhos+634+Canoas+RS"
                    target="_blank"
                    rel="noreferrer"
                    className="contato-info-item__link"
                  >
                    Ver no Google Maps →
                  </a>
                </div>
              </div>

              <div className="contato-info-item">
                <div className="contato-info-item__icon">
                  <Phone size={20} className="text-sky" />
                </div>
                <div>
                  <h4>WhatsApp e Telefone</h4>
                  <p>(51) 98321-5850</p>
                  <a 
                    href="https://wa.me/5551983215850" 
                    target="_blank" 
                    rel="noreferrer"
                    className="contato-info-item__link text-green"
                  >
                    Iniciar Conversa Rápida →
                  </a>
                </div>
              </div>

              <div className="contato-info-item">
                <div className="contato-info-item__icon">
                  <Mail size={20} className="text-sky" />
                </div>
                <div>
                  <h4>E-mail Oficial</h4>
                  <p>mixassistencia@gmail.com</p>
                </div>
              </div>

              <div className="contato-info-item">
                <div className="contato-info-item__icon">
                  <Instagram size={20} className="text-sky" />
                </div>
                <div>
                  <h4>Instagram</h4>
                  <p>@mixcellassistencia</p>
                  <a
                    href="https://www.instagram.com/mixcellassistencia/"
                    target="_blank"
                    rel="noreferrer"
                    className="contato-info-item__link"
                  >
                    Seguir no Instagram →
                  </a>
                </div>
              </div>

              <div className="contato-info-item">
                <div className="contato-info-item__icon">
                  <Clock size={20} className="text-sky" />
                </div>
                <div>
                  <h4>Horário de Funcionamento</h4>
                  <p>Segunda a Sexta: 09h às 12h e 14h às 17h</p>
                  <p>Sábado: 09h às 12h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Direita: Formulário de Contato */}
          <div className="contato-page__form-wrapper">
            <div className="contato-form card">
              {formSubmitted ? (
                <div className="contato-form__success">
                  <CheckCircle2 size={48} className="text-green animate-pulse" />
                  <h3>Mensagem enviada!</h3>
                  <p>Agradecemos o seu contato. Nossa equipe responderá a sua mensagem por e-mail ou WhatsApp o mais rápido possível.</p>
                  <button className="btn btn--outline btn--sm" onClick={() => setFormSubmitted(false)}>
                    Enviar Nova Mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3>Envie uma Mensagem</h3>
                  <p className="contato-form__subtitle">Retornamos em até 24 horas úteis</p>

                  <div className="form-group">
                    <label htmlFor="nome">Seu Nome Completo</label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      placeholder="Ex: João da Silva"
                      value={formData.nome}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">E-mail para Retorno</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="Ex: joao@email.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="telefone">WhatsApp / Telefone</label>
                      <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        required
                        placeholder="Ex: (51) 99999-9999"
                        value={formData.telefone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="mensagem">Como podemos ajudar?</label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      required
                      rows="4"
                      placeholder="Descreva sua dúvida, orçamento ou solicitação..."
                      value={formData.mensagem}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="btn btn--primary contato-form__submit">
                    <Send size={16} /> Enviar Mensagem
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
