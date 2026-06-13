import React, { useState } from 'react';
import { videos } from '../../data/videos';
import { Play, Eye, Clock } from 'lucide-react';
import './VideoSection.css';

export default function VideoSection() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="video-section container reveal">
      <div className="video-section__header">
        <span className="badge badge--mix-cell">Quem conserta mostra</span>
        <h2 className="video-section__title">Nossos Vídeos de Reparo</h2>
        <p className="video-section__subtitle">
          Assista à rotina da nossa bancada. Transparência técnica e dicas práticas diretamente da nossa oficina em Canoas.
        </p>
      </div>

      <div className="video-section__grid">
        {videos.map((vid) => {
          const isPlaying = activeVideo === vid.id;
          
          return (
            <div key={vid.id} className="video-card card">
              <div className="video-card__media">
                {isPlaying ? (
                  <iframe
                    title={vid.title}
                    className="video-card__iframe"
                    src={`https://www.youtube.com/embed/${vid.youtubeId}?autoplay=1&rel=0`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="video-card__thumb-wrapper" onClick={() => setActiveVideo(vid.id)}>
                    <img
                      src={`https://img.youtube.com/vi/${vid.youtubeId}/mqdefault.jpg`}
                      alt={vid.title}
                      className="video-card__thumb"
                      loading="lazy"
                    />
                    
                    {/* Tag de categoria do vídeo */}
                    <span className="video-card__category">{vid.category}</span>
                    
                    {/* Botão de play animado */}
                    <div className="video-card__play-btn">
                      <div className="video-card__play-ring" />
                      <Play size={20} fill="currentColor" className="video-card__play-icon" />
                    </div>
                    
                    <span className="video-card__duration">
                      <Clock size={12} /> {vid.duration}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="video-card__content">
                <h3 className="video-card__title">{vid.title}</h3>
                <div className="video-card__meta">
                  <span className="video-card__views">
                    <Eye size={12} /> {vid.views}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
