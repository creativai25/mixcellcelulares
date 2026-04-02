import React, { useState } from 'react';
import { Play } from 'lucide-react';
import './RepairVideos.css';

const RepairVideos = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  const videos = [
    {
      id: 1,
      title: 'Troca de Tela iPhone 13 Pro Max',
      thumb: 'https://images.unsplash.com/photo-1592893549646-6fb747192931?auto=format&fit=crop&q=80&w=600',
      duration: '0:59',
      category: 'Tela',
    },
    {
      id: 2,
      title: 'Reparo Placa Motorola Edge',
      thumb: 'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?auto=format&fit=crop&q=80&w=600',
      duration: '1:15',
      category: 'Placa',
    },
    {
      id: 3,
      title: 'Substituição Bateria Samsung S23',
      thumb: 'https://images.unsplash.com/photo-1590216127395-5cb2b57bf104?auto=format&fit=crop&q=80&w=600',
      duration: '0:45',
      category: 'Bateria',
    },
  ];

  return (
    <section id="videos" className="videos-section">
      <div className="videos-container">
        <div className="section-header">
          <h2 className="section-title">Nossos Reparos em Ação</h2>
          <p className="section-subtitle">
            Transparência total. Assista a alguns dos 12.000 aparelhos que já trouxemos de volta à vida.
          </p>
        </div>

        <div className="videos-grid">
          {videos.map((video) => (
            <div key={video.id} className="video-card glass-panel" onClick={() => setActiveVideo(video.id)}>
              <div className="video-thumbnail">
                <img src={video.thumb} alt={video.title} loading="lazy" />
                <div className="play-button">
                  <Play fill="white" size={24} />
                </div>
                <span className="video-duration">{video.duration}</span>
                <span className="video-category">{video.category}</span>
              </div>
              <div className="video-info">
                <h3>{video.title}</h3>
                <p>Ver o antes e depois incrível deste aparelho.</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Placeholder */}
      {activeVideo && (
        <div className="video-modal-overlay" onClick={() => setActiveVideo(null)}>
          <div className="video-modal-content">
            <button className="modal-close" onClick={() => setActiveVideo(null)}>✕ Fechar</button>
            <div className="video-player-placeholder">
              <span className="text-gradient">Espaço para componente de Vídeo (Reels/TikTok)</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RepairVideos;
