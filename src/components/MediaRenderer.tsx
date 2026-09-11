import React, { useState } from 'react';
import { Play, Music, Image as ImageIcon, Volume2, Maximize2, ExternalLink, X } from 'lucide-react';
import { PortfolioMedia } from '../utils/store';

export const extractYouTubeId = (url: string): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export const getYouTubeThumbnail = (url: string): string => {
  const id = extractYouTubeId(url);
  if (id) {
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }
  return '/assets/video-placeholder.png';
};

interface MediaCardProps {
  item: PortfolioMedia;
  isNegative?: boolean;
  accentColor?: string;
  onPreview?: (item: PortfolioMedia) => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  item,
  isNegative = false,
  accentColor = '#3D80FD',
  onPreview
}) => {
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const ytId = item.type === 'youtube' ? extractYouTubeId(item.url) : null;
  const thumbnail = item.type === 'youtube' ? getYouTubeThumbnail(item.url) : item.coverUrl || item.url;

  if (item.type === 'youtube') {
    const embedUrl = ytId ? `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0` : item.url;

    if (isPlayingInline) {
      return (
        <div className={`flex flex-col rounded-2xl overflow-hidden border shadow-lg transition-all ${
          isNegative ? 'bg-[#060C04] border-white/10' : 'bg-white border-black/10'
        }`}>
          <div className="relative w-full aspect-video bg-black">
            <iframe
              src={embedUrl}
              title={item.title || 'Video de YouTube'}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => setIsPlayingInline(false)}
              className="absolute top-2 right-2 z-10 bg-black/70 hover:bg-black text-white p-1.5 rounded-full transition-colors"
              title="Cerrar reproductor"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 flex items-center justify-between">
            <h4 className="font-general font-semibold text-sm truncate">{item.title || 'Video en reproducción'}</h4>
            <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-red-500/10 text-red-500 font-bold">
              YouTube HD
            </span>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`group flex flex-col rounded-2xl overflow-hidden border shadow-sm hover:shadow-md transition-all cursor-pointer ${
          isNegative ? 'bg-[#060C04] border-white/10 hover:border-white/20' : 'bg-white border-black/8 hover:border-black/15'
        }`}
        onClick={() => {
          if (onPreview) {
            onPreview(item);
          } else {
            setIsPlayingInline(true);
          }
        }}
      >
        <div className="relative w-full aspect-video bg-black/40 overflow-hidden flex items-center justify-center">
          <img
            src={thumbnail}
            alt={item.title || 'Video Thumbnail'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          
          {/* Play Button Badge */}
          <div
            className="absolute z-10 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl transition-transform group-hover:scale-110"
            style={{ backgroundColor: accentColor }}
          >
            <Play className="w-5 h-5 ml-0.5 fill-current" />
          </div>

          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white text-[11px] font-general">
            <span className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded font-mono font-medium">
              Video Embebido
            </span>
            <span className="flex items-center gap-1 opacity-80">
              <Maximize2 className="w-3 h-3" />
              <span>Ver</span>
            </span>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-1">
          <h4 className="font-general font-semibold text-sm line-clamp-1 group-hover:text-[#3D80FD] transition-colors">
            {item.title || 'Video de Portafolio'}
          </h4>
          <p className="font-general text-xs opacity-60 truncate">
            {item.url}
          </p>
        </div>
      </div>
    );
  }

  if (item.type === 'audio') {
    return (
      <div
        className={`flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl border shadow-sm ${
          isNegative ? 'bg-[#060C04] border-white/10' : 'bg-white border-black/8'
        }`}
      >
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl overflow-hidden bg-black/10 flex items-center justify-center">
          {item.coverUrl ? (
            <img src={item.coverUrl} alt={item.title || 'Cover'} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
              <Music className="w-8 h-8" style={{ color: accentColor }} />
            </div>
          )}
        </div>

        <div className="flex-1 w-full min-w-0 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
              Audio Track MP3
            </span>
          </div>
          <h4 className="font-general font-semibold text-sm truncate">
            {item.title || 'Pista de Audio'}
          </h4>
          <audio controls className="w-full h-9 outline-none">
            <source src={item.url} type="audio/mpeg" />
            Tu navegador no soporta reproducción de audio.
          </audio>
        </div>
      </div>
    );
  }

  // Image Type
  return (
    <div
      className={`group flex flex-col rounded-2xl overflow-hidden border shadow-sm hover:shadow-md transition-all cursor-pointer ${
        isNegative ? 'bg-[#060C04] border-white/10 hover:border-white/20' : 'bg-white border-black/8 hover:border-black/15'
      }`}
      onClick={() => onPreview && onPreview(item)}
    >
      <div className="relative w-full aspect-video sm:aspect-4/3 bg-black/5 overflow-hidden flex items-center justify-center">
        <img
          src={item.url}
          alt={item.title || 'Portfolio Image'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-white/90 text-black p-2.5 rounded-full shadow-lg">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="p-3">
        <h4 className="font-general font-semibold text-sm truncate">
          {item.title || 'Arte Gráfico'}
        </h4>
      </div>
    </div>
  );
};

export const MediaRenderer: React.FC<{
  type: 'youtube' | 'image' | 'audio';
  url: string;
  coverUrl?: string;
  title?: string;
  isNegative?: boolean;
  accentColor?: string;
}> = ({ type, url, coverUrl, title, isNegative = false, accentColor = '#3D80FD' }) => {
  return (
    <MediaCard
      item={{ id: '1', type, url, coverUrl, title }}
      isNegative={isNegative}
      accentColor={accentColor}
    />
  );
};
