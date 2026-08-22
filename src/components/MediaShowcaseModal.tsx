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
  ChevronRight
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

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const mediaList: MediaItem[] = service?.mediaItems || [];

  const cluster = service ? CLUSTERS[service.clusterId] : CLUSTERS['01'];

  useEffect(() => {
    if (initialMedia) {
      setActiveMedia(initialMedia);
    } else if (mediaList.length > 0) {
      setActiveMedia(mediaList[0]);
    } else {
      setActiveMedia(null);
    }
    setIsPlayingAudio(false);
    setAudioProgress(0);
  }, [service, initialMedia, isOpen]);

  // Audio Handlers
  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().catch(err => console.log('Audio autoplay prevented:', err));
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
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!isOpen || !service) return null;

  const filteredMedia = mediaList.filter(
    (item) => activeTab === 'all' || item.type === activeTab
  );

  const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getEmbedYouTubeUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('/embed/')) return url;
    
    // Support youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID, with extra parameters
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;
    const match = url.match(regExp);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
    }
    return url;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Container */}
      <div className="bg-[#0F172A] text-white rounded-3xl border border-gray-800 max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800 bg-[#1E293B]/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: cluster.mainColor }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider text-gray-400 font-heading">
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
              <h3 className="text-lg font-black text-white font-heading">
                {service.nameEs}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenQuote(service)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white transition-all shadow-md"
              style={{ backgroundColor: cluster.mainColor }}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Cotizar este Servicio</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex-grow overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Main Media Player / Screen (Col 8) */}
          <div className="lg:col-span-8 p-4 sm:p-6 flex flex-col justify-center bg-black/40 border-b lg:border-b-0 lg:border-r border-gray-800">
            
            {activeMedia ? (
              <div className="flex flex-col h-full justify-center">
                
                {/* 1. Video Player (YouTube or HTML5) */}
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

                {/* 2. Audio Player with Visualizer */}
                {activeMedia.type === 'audio' && (
                  <div className="w-full p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#1E293B] to-[#0F172A] border border-gray-800 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
                    
                    {/* Background Ambient Glow */}
                    <div
                      className="absolute -top-20 -left-20 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
                      style={{ backgroundColor: cluster.mainColor }}
                    />

                    {/* Album Art / Music Icon */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden mb-5 border-2 shadow-xl shrink-0 group"
                         style={{ borderColor: `${cluster.mainColor}60` }}>
                      <img
                        src={activeMedia.thumbnail || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600'}
                        alt={activeMedia.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Music className="w-8 h-8 text-white drop-shadow" />
                      </div>
                    </div>

                    <h4 className="text-lg sm:text-xl font-black text-white font-heading mb-1">
                      {activeMedia.title}
                    </h4>
                    <p className="text-xs text-gray-400 max-w-md mb-6 leading-relaxed">
                      {activeMedia.description || 'Pista original producida por HMA Inlumenai'}
                    </p>

                    {/* Equalizer animation bar */}
                    <div className="flex items-center gap-1 h-8 mb-6">
                      {[40, 75, 100, 60, 85, 30, 95, 50, 80, 45, 90, 65, 35].map((height, i) => (
                        <span
                          key={i}
                          className="w-1 rounded-full transition-all duration-300"
                          style={{
                            height: isPlayingAudio ? `${height}%` : '20%',
                            backgroundColor: cluster.mainColor,
                            opacity: isPlayingAudio ? 0.9 : 0.4,
                          }}
                        />
                      ))}
                    </div>

                    {/* Audio HTML Element */}
                    <audio
                      ref={audioRef}
                      src={activeMedia.url}
                      onTimeUpdate={handleAudioTimeUpdate}
                      onEnded={() => setIsPlayingAudio(false)}
                      muted={isMuted}
                    />

                    {/* Progress Slider */}
                    <div className="w-full max-w-md mb-4">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={audioProgress || 0}
                        onChange={handleSeek}
                        className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00B4D8]"
                      />
                      <div className="flex justify-between text-[11px] text-gray-400 font-mono mt-1">
                        <span>{formatTime(currentTime)}</span>
                        <span>{activeMedia.duration || formatTime(audioDuration)}</span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => {
                          if (audioRef.current) audioRef.current.currentTime -= 10;
                        }}
                        className="p-2 rounded-full text-gray-400 hover:text-white bg-gray-800/80 hover:bg-gray-700 text-xs transition-colors"
                        title="Retroceder 10s"
                      >
                        -10s
                      </button>

                      <button
                        onClick={togglePlayAudio}
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
                        style={{ backgroundColor: cluster.mainColor }}
                      >
                        {isPlayingAudio ? (
                          <Pause className="w-6 h-6 fill-white" />
                        ) : (
                          <Play className="w-6 h-6 fill-white ml-0.5" />
                        )}
                      </button>

                      <button
                        onClick={() => {
                          if (audioRef.current) audioRef.current.currentTime += 10;
                        }}
                        className="p-2 rounded-full text-gray-400 hover:text-white bg-gray-800/80 hover:bg-gray-700 text-xs transition-colors"
                        title="Adelantar 10s"
                      >
                        +10s
                      </button>

                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2 rounded-full text-gray-400 hover:text-white bg-gray-800/80 hover:bg-gray-700 transition-colors ml-2"
                        title={isMuted ? 'Activar sonido' : 'Silenciar'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>

                  </div>
                )}

                {/* 3. Image / Lightbox Viewer */}
                {activeMedia.type === 'image' && (
                  <div className="flex flex-col items-center">
                    <div className="relative max-h-[60vh] rounded-2xl overflow-hidden bg-black/60 border border-gray-800 shadow-2xl flex items-center justify-center group">
                      <img
                        src={activeMedia.url}
                        alt={activeMedia.title}
                        className="max-h-[55vh] w-auto object-contain transition-transform duration-300 group-hover:scale-102"
                      />
                    </div>
                  </div>
                )}

                {/* 4. Link / External View Viewer */}
                {activeMedia.type === 'link' && (
                  <div className="flex flex-col items-center">
                    <div className="relative w-full max-w-2xl max-h-[60vh] aspect-video rounded-2xl overflow-hidden bg-black/60 border border-gray-800 shadow-2xl flex items-center justify-center group">
                      <img
                        src={activeMedia.thumbnail || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&auto=format&fit=crop'}
                        alt={activeMedia.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="relative z-10 flex flex-col items-center p-6 text-center">
                        <ExternalLink className="w-12 h-12 text-white mb-4 drop-shadow-lg" />
                        <h4 className="text-xl font-bold text-white mb-2 drop-shadow-md">{activeMedia.title}</h4>
                        <p className="text-sm text-gray-300 mb-6 drop-shadow-md max-w-md">{activeMedia.description}</p>
                        <a 
                          href={activeMedia.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-6 py-3 rounded-full text-white font-bold bg-[#00B4D8] hover:bg-[#0096C7] transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                        >
                          Abrir en Facebook
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Details Footer under player */}
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-900/60 p-4 rounded-xl border border-gray-800/60">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{activeMedia.title}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-800 text-gray-300 uppercase">
                        {activeMedia.type}
                      </span>
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {activeMedia.description}
                    </p>
                  </div>

                  <a
                    href={getWhatsAppUrl(
                      `Hola HMA Inlumenai! Me gustó la muestra "${activeMedia.title}" del servicio ${service.nameEn} y me gustaría cotizar algo similar.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-[#00B4D8] hover:bg-[#0096C7] text-white text-xs font-bold shrink-0 shadow-sm transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Pedir muestra similar</span>
                  </a>
                </div>

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-8 text-gray-400">
                <Info className="w-12 h-12 text-gray-600 mb-3" />
                <p className="text-sm">Selecciona una muestra del catálogo para reproducirla.</p>
              </div>
            )}

          </div>

          {/* Media Playlist & Info (Col 4) */}
          <div className="lg:col-span-4 p-4 sm:p-6 bg-[#0B1120] flex flex-col justify-between">
            
            <div>
              {/* Type Filters */}
              <div className="flex items-center gap-1.5 p-1 bg-gray-900 rounded-xl border border-gray-800 mb-4">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                    activeTab === 'all' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Todos ({mediaList.length})
                </button>
                <button
                  onClick={() => setActiveTab('video')}
                  className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 ${
                    activeTab === 'video' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <Film className="w-3 h-3" />
                  <span>Video</span>
                </button>
                <button
                  onClick={() => setActiveTab('audio')}
                  className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 ${
                    activeTab === 'audio' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <Music className="w-3 h-3" />
                  <span>Audio</span>
                </button>
                <button
                  onClick={() => setActiveTab('image')}
                  className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 ${
                    activeTab === 'image' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <ImageIcon className="w-3 h-3" />
                  <span>Fotos</span>
                </button>
              </div>

              {/* Items List */}
              <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Muestras Disponibles
              </h5>

              <div className="space-y-2 max-h-[38vh] overflow-y-auto pr-1">
                {filteredMedia.map((media) => {
                  const isCurrent = activeMedia?.id === media.id;
                  return (
                    <button
                      key={media.id}
                      onClick={() => {
                        setActiveMedia(media);
                        setIsPlayingAudio(false);
                      }}
                      className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
                        isCurrent
                          ? 'bg-gray-800/90 border-gray-600 shadow-md ring-1'
                          : 'bg-gray-900/60 hover:bg-gray-900 border-gray-800 text-gray-300'
                      }`}
                      style={{
                        borderColor: isCurrent ? cluster.mainColor : undefined,
                      }}
                    >
                      {/* Thumbnail or Type Icon */}
                      <div className="w-12 h-12 rounded-lg bg-gray-800 overflow-hidden shrink-0 relative flex items-center justify-center">
                        {media.thumbnail ? (
                          <img
                            src={media.thumbnail}
                            alt={media.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-gray-400">
                            {media.type === 'video' && <Film className="w-5 h-5" />}
                            {media.type === 'audio' && <Music className="w-5 h-5" />}
                            {media.type === 'image' && <ImageIcon className="w-5 h-5" />}
                            {media.type === 'link' && <ExternalLink className="w-5 h-5" />}
                          </div>
                        )}

                        {/* Overlay icon */}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          {media.type === 'video' && <Play className="w-4 h-4 fill-white text-white" />}
                          {media.type === 'audio' && <Music className="w-4 h-4 text-white" />}
                          {media.type === 'image' && <ImageIcon className="w-4 h-4 text-white" />}
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
                  <p className="text-xs text-gray-500 text-center py-6">
                    No hay muestras en esta categoría para este servicio.
                  </p>
                )}
              </div>
            </div>

            {/* Non-programmer friendly note */}
            <div className="mt-4 p-3.5 rounded-2xl bg-gray-900 border border-gray-800 text-xs">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#00B4D8] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">¿Cómo añadir tus videos o canciones?</strong>
                  <p className="text-gray-400 text-[11px] mt-0.5 leading-relaxed">
                    Solo pegas el enlace de tu video de YouTube o MP3 en el archivo de datos sin necesidad de bases de datos complejas. ¡Tus clientes lo reproducen aquí mismo!
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
