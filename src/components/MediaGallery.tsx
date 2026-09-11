import React, { useState } from 'react';
import { Video, Music, Image as ImageIcon, Grid, X, Play, Maximize2, Sparkles } from 'lucide-react';
import { PortfolioMedia } from '../utils/store';
import { MediaCard, extractYouTubeId } from './MediaRenderer';

interface MediaGalleryProps {
  items: PortfolioMedia[];
  isNegative?: boolean;
  accentColor?: string;
  serviceName?: string;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({
  items,
  isNegative = false,
  accentColor = '#3D80FD',
  serviceName = 'Servicio'
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'youtube' | 'audio' | 'image'>('all');
  const [modalItem, setModalItem] = useState<PortfolioMedia | null>(null);

  const videoCount = items.filter(i => i.type === 'youtube').length;
  const audioCount = items.filter(i => i.type === 'audio').length;
  const imageCount = items.filter(i => i.type === 'image').length;

  const filteredItems = items.filter(item => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  const handleOpenPreview = (item: PortfolioMedia) => {
    setModalItem(item);
  };

  const handleCloseModal = () => {
    setModalItem(null);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-full text-xs font-general font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeFilter === 'all'
              ? 'text-white shadow-sm scale-105'
              : isNegative
              ? 'bg-white/5 text-white/70 hover:bg-white/10'
              : 'bg-black/5 text-black/70 hover:bg-black/10'
          }`}
          style={{ backgroundColor: activeFilter === 'all' ? accentColor : undefined }}
        >
          <Grid className="w-3.5 h-3.5" />
          <span>Todos ({items.length})</span>
        </button>

        {videoCount > 0 && (
          <button
            onClick={() => setActiveFilter('youtube')}
            className={`px-4 py-2 rounded-full text-xs font-general font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeFilter === 'youtube'
                ? 'text-white shadow-sm scale-105'
                : isNegative
                ? 'bg-white/5 text-white/70 hover:bg-white/10'
                : 'bg-black/5 text-black/70 hover:bg-black/10'
            }`}
            style={{ backgroundColor: activeFilter === 'youtube' ? accentColor : undefined }}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Videos ({videoCount})</span>
          </button>
        )}

        {audioCount > 0 && (
          <button
            onClick={() => setActiveFilter('audio')}
            className={`px-4 py-2 rounded-full text-xs font-general font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeFilter === 'audio'
                ? 'text-white shadow-sm scale-105'
                : isNegative
                ? 'bg-white/5 text-white/70 hover:bg-white/10'
                : 'bg-black/5 text-black/70 hover:bg-black/10'
            }`}
            style={{ backgroundColor: activeFilter === 'audio' ? accentColor : undefined }}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Audios ({audioCount})</span>
          </button>
        )}

        {imageCount > 0 && (
          <button
            onClick={() => setActiveFilter('image')}
            className={`px-4 py-2 rounded-full text-xs font-general font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeFilter === 'image'
                ? 'text-white shadow-sm scale-105'
                : isNegative
                ? 'bg-white/5 text-white/70 hover:bg-white/10'
                : 'bg-black/5 text-black/70 hover:bg-black/10'
            }`}
            style={{ backgroundColor: activeFilter === 'image' ? accentColor : undefined }}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Imágenes ({imageCount})</span>
          </button>
        )}
      </div>

      {/* Grid of Resources */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <MediaCard
            key={item.id}
            item={item}
            isNegative={isNegative}
            accentColor={accentColor}
            onPreview={handleOpenPreview}
          />
        ))}
      </div>

      {/* Modal / Theater Mode for Selected Media */}
      {modalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={handleCloseModal}
        >
          <div
            className={`relative w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border ${
              isNegative ? 'bg-[#060C04] border-white/15 text-[#FEFAE8]' : 'bg-white border-black/15 text-[#060C04]'
            }`}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-inherit">
              <div className="flex items-center gap-3">
                <span
                  className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: accentColor }}
                >
                  {modalItem.type === 'youtube' ? 'Video Embebido' : modalItem.type === 'audio' ? 'Audio MP3' : 'Imagen'}
                </span>
                <h3 className="font-general font-bold text-base sm:text-lg truncate max-w-md">
                  {modalItem.title || `${serviceName} - Recurso`}
                </h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
                title="Cerrar vista"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 overflow-y-auto flex items-center justify-center bg-black/5 dark:bg-black/40">
              {modalItem.type === 'youtube' && (
                <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                  {(() => {
                    const ytId = extractYouTubeId(modalItem.url);
                    const embedUrl = ytId
                      ? `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`
                      : modalItem.url;
                    return (
                      <iframe
                        src={embedUrl}
                        title={modalItem.title || 'Video de YouTube'}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    );
                  })()}
                </div>
              )}

              {modalItem.type === 'audio' && (
                <div className="w-full max-w-lg p-6 rounded-2xl bg-white dark:bg-black/60 border border-inherit shadow-lg flex flex-col items-center gap-6">
                  {modalItem.coverUrl ? (
                    <img
                      src={modalItem.coverUrl}
                      alt={modalItem.title || 'Cover'}
                      className="w-48 h-48 rounded-2xl object-cover shadow-md"
                    />
                  ) : (
                    <div
                      className="w-36 h-36 rounded-2xl flex items-center justify-center shadow-inner"
                      style={{ backgroundColor: `${accentColor}20` }}
                    >
                      <Music className="w-16 h-16" style={{ color: accentColor }} />
                    </div>
                  )}
                  <div className="text-center w-full space-y-1">
                    <h4 className="font-general font-bold text-lg">{modalItem.title || 'Pista de Audio'}</h4>
                    <p className="font-general text-xs opacity-60">HMA INLUMENAI Audio Engine</p>
                  </div>
                  <audio controls autoPlay className="w-full h-11 outline-none">
                    <source src={modalItem.url} type="audio/mpeg" />
                    Tu navegador no soporta el reproductor de audio.
                  </audio>
                </div>
              )}

              {modalItem.type === 'image' && (
                <div className="max-h-[70vh] flex items-center justify-center">
                  <img
                    src={modalItem.url}
                    alt={modalItem.title || 'Imagen'}
                    className="max-h-[70vh] max-w-full rounded-xl object-contain shadow-2xl"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
