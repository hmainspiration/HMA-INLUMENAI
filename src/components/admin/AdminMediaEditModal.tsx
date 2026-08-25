import React, { useState } from 'react';
import { MediaItem, MediaType, ServiceItem } from '../../types';
import { CLUSTERS } from '../../data/servicesData';
import { X, Save, Film, Music, Image as ImageIcon, Link as LinkIcon, Sparkles } from 'lucide-react';

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
  const [type, setType] = useState<MediaType>(item?.type || 'link');
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
      thumbnail: thumbnail.trim() || undefined,
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
                <Film className="w-4 h-4" />
              ) : type === 'audio' ? (
                <Music className="w-4 h-4" />
              ) : type === 'image' ? (
                <ImageIcon className="w-4 h-4" />
              ) : (
                <LinkIcon className="w-4 h-4" />
              )}
            </div>
            <div>
              <h3 className="text-base font-black text-white font-heading">
                {isEditing ? 'Editar Muestra / Enlace' : 'Agregar Nueva Muestra o Enlace'}
              </h3>
              <p className="text-[11px] text-gray-400">
                Añade videos, audios, fotos o enlaces de Facebook/YouTube al catálogo.
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
              Tipo de Contenido / Formato:
            </label>
            <div className="grid grid-cols-4 gap-2">
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
                onClick={() => setType('audio')}
                className={`py-2 px-2 rounded-xl border text-[11px] font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  type === 'audio'
                    ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                    : 'bg-[#141E33] border-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                <Music className="w-4 h-4" />
                <span>Audio MP3</span>
              </button>

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
                <span>Imagen / Foto</span>
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Título de la Muestra / Proyecto:
            </label>
            <input
              type="text"
              placeholder="Ej. Es Una Lluvia de Gracia · Video 01"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Enlace URL (YouTube, Facebook, MP3, etc.):
            </label>
            <input
              type="url"
              placeholder="https://www.youtube.com/watch?v=... o https://facebook.com/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
            />
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              URL de la Imagen de Portada / Miniatura (Opcional):
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/... o enlace directo a imagen"
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
                placeholder="Ej. YouTube, Reel, 4:20, 4K"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Autor / Productor (Opcional):
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
              placeholder="Breve reseña del contenido..."
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
              <span>{isEditing ? 'Actualizar Muestra' : 'Agregar Muestra'}</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
