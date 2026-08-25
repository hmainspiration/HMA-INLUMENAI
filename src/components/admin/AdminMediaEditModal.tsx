import React, { useState } from 'react';
import { MediaItem, MediaType, ServiceItem } from '../../types';
import { CLUSTERS } from '../../data/servicesData';
import { X, Save, Film, Music, Image as ImageIcon, Link as LinkIcon, Sparkles, HelpCircle, Eye } from 'lucide-react';

interface AdminMediaEditModalProps {
  item: MediaItem | null;
  services: ServiceItem[];
  defaultServiceId?: string;
  onClose: () => void;
  onSave: (data: Omit<MediaItem, 'id'>, id?: string) => void;
}

export const AdminMediaEditModal: React.FC<AdminMediaEditModalProps> = ({
  item,
  services,
  defaultServiceId,
  onClose,
  onSave,
}) => {
  const isEditing = Boolean(item);

  const initialServiceId = item?.serviceId || defaultServiceId || services[0]?.id || 'design';
  const [serviceId, setServiceId] = useState(initialServiceId);
  const [type, setType] = useState<MediaType>(item?.type || 'image');
  const [title, setTitle] = useState(item?.title || '');
  const [description, setDescription] = useState(item?.description || '');
  const [url, setUrl] = useState(item?.url || '');
  const [thumbnail, setThumbnail] = useState(item?.thumbnail || '');
  const [duration, setDuration] = useState(item?.duration || '');
  const [author, setAuthor] = useState(item?.author || '');

  const selectedService = services.find((s) => s.id === serviceId) || services[0];
  const cluster = CLUSTERS[selectedService?.clusterId || '01'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    const mediaData: Omit<MediaItem, 'id'> = {
      title: title.trim(),
      type,
      description: description.trim() || undefined,
      url: url.trim(),
      thumbnail: thumbnail.trim() || (type === 'image' ? url.trim() : undefined),
      duration: duration.trim() || undefined,
      author: author.trim() || undefined,
      serviceId,
      clusterId: selectedService.clusterId,
    };

    onSave(mediaData, item?.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="bg-[#0F172A] text-gray-100 rounded-3xl border border-gray-800 max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#152033] px-6 py-4 border-b border-gray-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00B4D8]/20 flex items-center justify-center text-[#00B4D8]">
              {type === 'video' ? (
                <Film className="w-4 h-4 text-red-400" />
              ) : type === 'audio' ? (
                <Music className="w-4 h-4 text-purple-400" />
              ) : type === 'image' ? (
                <ImageIcon className="w-4 h-4 text-emerald-400" />
              ) : (
                <LinkIcon className="w-4 h-4 text-blue-400" />
              )}
            </div>
            <div>
              <h3 className="text-base font-black text-white font-heading">
                {isEditing ? 'Editar Muestra / Contenido' : 'Agregar Nueva Muestra Multimedia'}
              </h3>
              <p className="text-[11px] text-gray-400">
                Configura videos, pistas de audio o fotos en alta definición para el catálogo.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {/* Target Service Selection */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Servicio al que pertenece esta muestra:
            </label>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
            >
              {services.map((svc) => (
                <option key={svc.id} value={svc.id}>
                  [{svc.serviceNumber}] {svc.nameEn} ({svc.nameEs})
                </option>
              ))}
            </select>
          </div>

          {/* Media Type Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5">
              Tipo de Formato:
            </label>
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setType('image')}
                className={`py-2 px-2 rounded-xl border text-[11px] font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  type === 'image'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                    : 'bg-[#141E33] border-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Foto / Imagen</span>
              </button>

              <button
                type="button"
                onClick={() => setType('audio')}
                className={`py-2 px-2 rounded-xl border text-[11px] font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  type === 'audio'
                    ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                    : 'bg-[#141E33] border-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                <Music className="w-4 h-4" />
                <span>Audio (MP3)</span>
              </button>

              <button
                type="button"
                onClick={() => setType('video')}
                className={`py-2 px-2 rounded-xl border text-[11px] font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  type === 'video'
                    ? 'bg-red-500/20 border-red-500 text-red-400'
                    : 'bg-[#141E33] border-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                <Film className="w-4 h-4" />
                <span>Video YouTube</span>
              </button>

              <button
                type="button"
                onClick={() => setType('link')}
                className={`py-2 px-2 rounded-xl border text-[11px] font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  type === 'link'
                    ? 'bg-[#1877F2]/20 border-[#1877F2] text-[#6098FE]'
                    : 'bg-[#141E33] border-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                <LinkIcon className="w-4 h-4" />
                <span>Enlace Web</span>
              </button>
            </div>

            {/* Smart Format Tip */}
            <div className="mt-2 p-2.5 rounded-xl bg-[#090F1E] border border-gray-800 text-[11px] text-gray-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#00B4D8] shrink-0" />
              {type === 'image' && (
                <span>Para <strong>Fotos</strong>, coloca la URL directa de la imagen (.jpg, .png o de Unsplash/Imgur) para que se aprecie en alta definición.</span>
              )}
              {type === 'audio' && (
                <span>Para <strong>Audios</strong>, pega un enlace directo a archivo .mp3 o enlace de SoundCloud/Spotify para reproducirlo con el ecualizador.</span>
              )}
              {type === 'video' && (
                <span>Para <strong>Videos</strong>, pega cualquier enlace de YouTube (normal, short o watch) o Vimeo y se reproducirá al instante.</span>
              )}
              {type === 'link' && (
                <span>Para <strong>Enlaces</strong>, puedes pegar publicaciones de Facebook, páginas web o perfiles.</span>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Título de la Muestra:
            </label>
            <input
              type="text"
              placeholder="Ej. Retrato de Estudio & Corrección de Color"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Enlace URL del Contenido (Imagen, MP3, YouTube o Web):
            </label>
            <input
              type="url"
              placeholder={
                type === 'image' 
                  ? 'https://images.unsplash.com/... o https://tuservidor.com/foto.jpg' 
                  : type === 'audio'
                  ? 'https://tuservidor.com/cancion.mp3 o https://soundcloud.com/...'
                  : type === 'video'
                  ? 'https://www.youtube.com/watch?v=... o https://youtu.be/...'
                  : 'https://www.facebook.com/...'
              }
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
            />
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              URL de la Portada / Miniatura (Opcional):
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/... (si lo dejas vacío, usa la URL principal en fotos)"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
            />
          </div>

          {/* Duration / Tag & Author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Etiqueta / Duración:
              </label>
              <input
                type="text"
                placeholder="Ej. 1:45, 4K, YouTube, HD"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Autor / Productor:
              </label>
              <input
                type="text"
                placeholder="Ej. HMA Music Studio"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Descripción o Detalles:
            </label>
            <textarea
              rows={2}
              placeholder="Breve reseña del proyecto o técnica empleada..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-gray-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-700 text-xs font-bold text-gray-300 hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#00B4D8] hover:bg-[#0096B4] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-[#00B4D8]/20 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Actualizar Muestra' : 'Guardar Muestra'}</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
