import React, { useState, useRef, useEffect } from 'react';
import { MediaItem, ServiceItem } from '../types';
import { CLUSTERS } from '../data/servicesData';
import { getWhatsAppUrl } from '../data/socialLinks';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  MessageSquare, 
  Sparkles, 
  Film, 
  Music, 
  Image as ImageIcon, 
  Info, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Eye
} from 'lucide-react';

interface MediaShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceItem | null;
  initialMedia?: MediaItem | null;
  onOpenQuote: (service: ServiceItem) => void;
}

export const MediaShowcaseModal: React.FC<MediaShowcaseModalProps> = ({
  isOpen,
  onClose,
  service,
  initialMedia,
  onOpenQuote,
}) => {
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'audio' | 'image'>('all');
  const [isImageFullscreen, setIsImageFullscreen] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const mediaList: MediaItem[] = service?.mediaItems || [];
  const cluster = service ? CLUSTERS[service.clusterId] : CLUSTERS['01'];

  useEffect(() => {
    if (initialMedia) {
      setActiveMedia(initialMedia);
      if (initialMedia.type === 'video' || initialMedia.type === 'audio' || initialMedia.type === 'image') {
        setActiveTab('all');
      }
    } else if (mediaList.length > 0) {
      setActiveMedia(mediaList[0]);
      setActiveTab('all');
    } else {
      setActiveMedia(null);
    }
    setIsPlayingAudio(false);
    setAudioProgress(0);
    setIsImageFullscreen(false);
  }, [service, initialMedia, isOpen]);

  // Audio Handlers
  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().catch(err => console.log('Audio playback prevented:', err));
      setIsPlayingAudio(true);
    }
  };

  const handleAudioTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 0;
    setCurrentTime(current);
    setAudioDuration(duration);
    if (duration > 0) {
      setAudioProgress((current / duration) * 100);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const seekTime = (parseFloat(e.target.value) / 100) * (audioDuration || 1);
    audioRef.current.currentTime = seekTime;
    setAudioProgress(parseFloat(e.target.value));
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!isOpen || !service) return null;

  // Filter media items
  const filteredMedia = mediaList.filter(
    (item) => activeTab === 'all' || item.type === activeTab
  );

  // Helper detection functions
  const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const isVimeoUrl = (url: string) => {
    return url.includes('vimeo.com');
  };

  const isSoundCloudUrl = (url: string) => {
    return url.includes('soundcloud.com');
  };

  const isSpotifyUrl = (url: string) => {
    return url.includes('spotify.com');
  };

  const getEmbedYouTubeUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('/embed/')) return url;
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/;
    const match = url.match(regExp);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
    }
    return url;
  };

  const getEmbedVimeoUrl = (url: string) => {
    const regExp = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/;
    const match = url.match(regExp);
    if (match && match[1]) {
      return `https://player.vimeo.com/video/${match[1]}?autoplay=1`;
    }
    return url;
  };

  // Check if image URL exists or fallback to thumbnail
  const getImageDisplayUrl = (media: MediaItem) => {
    return media.url || media.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Main Modal Container */}
      <div className="bg-[#0B1120] text-white rounded-3xl border border-gray-800 max-w-5xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Top Header Bar */}
        <div className="px-5 sm:px-6 py-4 border-b border-gray-800 bg-[#111A2E] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
              style={{ backgroundColor: cluster.mainColor }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase font-bold tracking-wider text-gray-400 font-heading">
                  Centro Multimedia HMA
                </span>
                <span
                  className="text-[11px] font-bold px-2 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: `${cluster.mainColor}20`,
                    color: cluster.lightColor,
                    borderColor: `${cluster.mainColor}40`,
                  }}
                >
                  {service.nameEn}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white font-heading truncate">
                {service.nameEs}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenQuote(service)}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
              style={{ backgroundColor: cluster.mainColor }}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Cotizar este Servicio</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors cursor-pointer"
              title="Cerrar reproductor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-grow overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left / Center: Main Media Player Area (Col 8) */}
          <div className="lg:col-span-8 p-4 sm:p-6 flex flex-col justify-center bg-black/50 border-b lg:border-b-0 lg:border-r border-gray-800/80 min-h-[360px]">
            
            {activeMedia ? (
              <div className="flex flex-col h-full justify-between">
                
                {/* 1. VIDEO PLAYER (YouTube, Vimeo, MP4) */}
                {activeMedia.type === 'video' && (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-gray-800 shadow-2xl">
                    {isYouTubeUrl(activeMedia.url) ? (
                      <iframe
                        src={getEmbedYouTubeUrl(activeMedia.url)}
                        title={activeMedia.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : isVimeoUrl(activeMedia.url) ? (
                      <iframe
                        src={getEmbedVimeoUrl(activeMedia.url)}
                        title={activeMedia.title}
                        className="w-full h-full border-0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={activeMedia.url}
                        controls
                        autoPlay
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                )}

                {/* 2. AUDIO PLAYER (MP3 con Ecualizador y Controles Completos, o Spotify / SoundCloud) */}
                {activeMedia.type === 'audio' && (
                  <div>
                    {isSoundCloudUrl(activeMedia.url) ? (
                      <div className="w-full rounded-2xl overflow-hidden border border-gray-800 shadow-2xl bg-black">
                        <iframe
                          width="100%"
                          height="240"
                          scrolling="no"
                          frameBorder="no"
                          allow="autoplay"
                          src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(activeMedia.url)}&color=%2300B4D8&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
                        />
                      </div>
                    ) : isSpotifyUrl(activeMedia.url) ? (
                      <div className="w-full rounded-2xl overflow-hidden border border-gray-800 shadow-2xl bg-black">
                        <iframe
                          src={activeMedia.url.replace('open.spotify.com/', 'open.spotify.com/embed/')}
                          width="100%"
                          height="240"
                          frameBorder="0"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="w-full p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#162032] to-[#0A0F1D] border border-gray-800 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
                        
                        {/* Ambient Aura Glow */}
                        <div
                          className="absolute -top-24 -left-24 w-56 h-56 rounded-full blur-3xl opacity-25 pointer-events-none"
                          style={{ backgroundColor: cluster.mainColor }}
                        />

                        {/* Album Cover */}
                        <div 
                          className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden mb-4 border-2 shadow-2xl shrink-0 group"
                          style={{ borderColor: `${cluster.mainColor}80` }}
                        >
                          <img
                            src={activeMedia.thumbnail || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600'}
                            alt={activeMedia.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Headphones className="w-8 h-8 text-white drop-shadow-md" />
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h4 className="text-base sm:text-lg font-black text-white font-heading mb-1">
                          {activeMedia.title}
                        </h4>
                        <p className="text-xs text-gray-400 max-w-md mb-5 leading-relaxed">
                          {activeMedia.description || 'Pista de audio oficial producida por HMA Inlumenai'}
                        </p>

                        {/* Equalizer Visualizer Bars */}
                        <div className="flex items-center justify-center gap-1.5 h-8 mb-5 w-full max-w-xs">
                          {[35, 75, 100, 55, 90, 40, 95, 60, 85, 45, 90, 70, 30, 80, 50].map((height, i) => (
                            <span
                              key={i}
                              className="w-1.5 rounded-full transition-all duration-200"
                              style={{
                                height: isPlayingAudio ? `${height}%` : '20%',
                                backgroundColor: cluster.mainColor,
                                opacity: isPlayingAudio ? 0.95 : 0.35,
                              }}
                            />
                          ))}
                        </div>

                        {/* Hidden Audio Tag */}
                        <audio
                          ref={audioRef}
                          src={activeMedia.url}
                          onTimeUpdate={handleAudioTimeUpdate}
                          onEnded={() => setIsPlayingAudio(false)}
                          muted={isMuted}
                        />

                        {/* Audio Progress Slider */}
                        <div className="w-full max-w-md mb-4">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={audioProgress || 0}
                            onChange={handleSeek}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00B4D8]"
                          />
                          <div className="flex justify-between text-[11px] text-gray-400 font-mono mt-1">
                            <span>{formatTime(currentTime)}</span>
                            <span>{activeMedia.duration || formatTime(audioDuration)}</span>
                          </div>
                        </div>

                        {/* Playback Controls */}
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => {
                              if (audioRef.current) audioRef.current.currentTime -= 10;
                            }}
                            className="p-2 rounded-full text-gray-400 hover:text-white bg-gray-800/80 hover:bg-gray-700 text-xs font-mono transition-colors cursor-pointer"
                            title="Retroceder 10s"
                          >
                            -10s
                          </button>

                          <button
                            type="button"
                            onClick={togglePlayAudio}
                            className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                            style={{ backgroundColor: cluster.mainColor }}
                            title={isPlayingAudio ? 'Pausar' : 'Reproducir'}
                          >
                            {isPlayingAudio ? (
                              <Pause className="w-6 h-6 fill-white" />
                            ) : (
                              <Play className="w-6 h-6 fill-white ml-0.5" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (audioRef.current) audioRef.current.currentTime += 10;
                            }}
                            className="p-2 rounded-full text-gray-400 hover:text-white bg-gray-800/80 hover:bg-gray-700 text-xs font-mono transition-colors cursor-pointer"
                            title="Adelantar 10s"
                          >
                            +10s
                          </button>

                          <button
                            type="button"
                            onClick={() => setIsMuted(!isMuted)}
                            className="p-2.5 rounded-full text-gray-400 hover:text-white bg-gray-800/80 hover:bg-gray-700 transition-colors ml-2 cursor-pointer"
                            title={isMuted ? 'Activar sonido' : 'Silenciar'}
                          >
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          </button>
                        </div>

                      </div>
                    )}
                  </div>
                )}

                {/* 3. FOTO / IMAGE VIEWER (Visor Directo en Alta Resolución) */}
                {(activeMedia.type === 'image' || activeMedia.type === 'link') && (
                  <div className="flex flex-col items-center justify-center w-full">
                    <div className="relative w-full max-h-[58vh] rounded-2xl overflow-hidden bg-black/80 border border-gray-800 shadow-2xl flex items-center justify-center group">
                      
                      <img
                        src={getImageDisplayUrl(activeMedia)}
                        alt={activeMedia.title}
                        className="max-h-[54vh] w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-102 cursor-zoom-in"
                        onClick={() => setIsImageFullscreen(true)}
                      />

                      {/* Zoom Overlay Button */}
                      <button
                        type="button"
                        onClick={() => setIsImageFullscreen(true)}
                        className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                        title="Ver fotografía en pantalla completa"
                      >
                        <Maximize2 className="w-4 h-4" />
                        <span>Ver en Grande</span>
                      </button>

                      {/* Source badge if it has an external reference */}
                      {activeMedia.url && activeMedia.url.includes('facebook.com') && (
                        <a
                          href={activeMedia.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white text-[11px] font-bold backdrop-blur-md flex items-center gap-1.5 transition-all shadow-md"
                          title="Abrir publicación original en Facebook"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Ver en Facebook</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Details Footer under active media */}
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#111A2E] p-3.5 rounded-2xl border border-gray-800">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                        {activeMedia.title}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-800 text-gray-300 uppercase shrink-0">
                        {activeMedia.type}
                      </span>
                    </div>
                    {activeMedia.description && (
                      <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                        {activeMedia.description}
                      </p>
                    )}
                  </div>

                  <a
                    href={getWhatsAppUrl(
                      `Hola HMA Inlumenai! Me gustó la muestra "${activeMedia.title}" del servicio ${service.nameEn} y me gustaría cotizar una producción similar.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#00B4D8] hover:bg-[#0096C7] text-white text-xs font-bold shrink-0 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Pedir muestra similar</span>
                  </a>
                </div>

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-8 text-gray-400">
                <Info className="w-10 h-10 text-gray-600 mb-2" />
                <p className="text-xs">Selecciona una muestra del catálogo para reproducirla.</p>
              </div>
            )}

          </div>

          {/* Right Sidebar: Playlist & Filters (Col 4) */}
          <div className="lg:col-span-4 p-4 sm:p-6 bg-[#070D19] flex flex-col justify-between">
            
            <div>
              {/* Type Category Filter Tabs */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-[#111A2E] rounded-xl border border-gray-800 mb-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer text-center ${
                    activeTab === 'all' ? 'bg-[#1F2D4A] text-white shadow' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Todos ({mediaList.length})
                </button>
                
                <button
                  type="button"
                  onClick={() => setActiveTab('video')}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                    activeTab === 'video' ? 'bg-[#1F2D4A] text-white shadow' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <Film className="w-3 h-3 text-red-400" />
                  <span>Video</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('audio')}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                    activeTab === 'audio' ? 'bg-[#1F2D4A] text-white shadow' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <Music className="w-3 h-3 text-purple-400" />
                  <span>Audio</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('image')}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                    activeTab === 'image' ? 'bg-[#1F2D4A] text-white shadow' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <ImageIcon className="w-3 h-3 text-emerald-400" />
                  <span>Fotos</span>
                </button>
              </div>

              {/* Header List */}
              <div className="flex items-center justify-between mb-2.5">
                <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Muestras Disponibles ({filteredMedia.length})
                </h5>
              </div>

              {/* Items List */}
              <div className="space-y-2 max-h-[38vh] overflow-y-auto pr-1">
                {filteredMedia.map((media) => {
                  const isCurrent = activeMedia?.id === media.id;
                  return (
                    <button
                      key={media.id}
                      type="button"
                      onClick={() => {
                        setActiveMedia(media);
                        setIsPlayingAudio(false);
                      }}
                      className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                        isCurrent
                          ? 'bg-[#162238] border-[#00B4D8] shadow-md ring-1 ring-[#00B4D8]'
                          : 'bg-[#0E1626] hover:bg-[#141E33] border-gray-800/80 text-gray-300'
                      }`}
                    >
                      {/* Thumbnail with overlay icon */}
                      <div className="w-12 h-12 rounded-lg bg-gray-800 overflow-hidden shrink-0 relative flex items-center justify-center border border-gray-700">
                        {media.thumbnail ? (
                          <img
                            src={media.thumbnail}
                            alt={media.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-gray-400">
                            {media.type === 'video' && <Film className="w-5 h-5 text-red-400" />}
                            {media.type === 'audio' && <Music className="w-5 h-5 text-purple-400" />}
                            {media.type === 'image' && <ImageIcon className="w-5 h-5 text-emerald-400" />}
                            {media.type === 'link' && <ExternalLink className="w-5 h-5 text-blue-400" />}
                          </div>
                        )}

                        {/* Overlay Type Icon */}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          {media.type === 'video' && <Play className="w-4 h-4 fill-white text-white" />}
                          {media.type === 'audio' && <Music className="w-4 h-4 text-white" />}
                          {media.type === 'image' && <Eye className="w-4 h-4 text-white" />}
                          {media.type === 'link' && <ExternalLink className="w-4 h-4 text-white" />}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs font-bold text-white truncate">
                            {media.title}
                          </p>
                          {media.duration && (
                            <span className="text-[10px] text-gray-400 font-mono shrink-0">
                              {media.duration}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-400 truncate mt-0.5">
                          {media.description}
                        </p>
                      </div>
                    </button>
                  );
                })}

                {filteredMedia.length === 0 && (
                  <div className="p-6 rounded-2xl bg-[#0E1626] border border-gray-800 text-center">
                    <ImageIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-400">
                      No hay muestras registradas en esta categoría para este servicio.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Client Professional Guarantee / Call to Action */}
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-[#111A2E] to-[#0A101D] border border-gray-800 text-xs">
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#00B4D8] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-heading">
                    ¿Deseas una producción a la medida?
                  </strong>
                  <p className="text-gray-400 text-[11px] mt-1 leading-relaxed">
                    Personalizamos videos en 4K, canciones con voces IA y sesiones fotográficas exclusivas para tu proyecto.
                  </p>
                  <a
                    href={getWhatsAppUrl(`Hola HMA Inlumenai! Me interesa cotizar una producción para ${service.nameEn}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00B4D8] hover:underline mt-2"
                  >
                    <span>Contactar con Producción</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Lightbox / Fullscreen Image Modal */}
      {isImageFullscreen && activeMedia && (
        <div 
          className="fixed inset-0 z-60 bg-black/95 flex flex-col items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsImageFullscreen(false)}
        >
          <button
            onClick={() => setIsImageFullscreen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 transition-all cursor-pointer"
            title="Cerrar vista grande"
          >
            <X className="w-6 h-6" />
          </button>

          <img
            src={getImageDisplayUrl(activeMedia)}
            alt={activeMedia.title}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="mt-4 text-center text-white" onClick={(e) => e.stopPropagation()}>
            <h4 className="text-base font-bold">{activeMedia.title}</h4>
            {activeMedia.description && (
              <p className="text-xs text-gray-400 max-w-xl mt-1">{activeMedia.description}</p>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
