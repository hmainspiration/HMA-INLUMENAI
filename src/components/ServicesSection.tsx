import React, { useState } from 'react';
import { SERVICES, CLUSTERS } from '../data/servicesData';
import { ClusterId, ServiceItem, MediaItem } from '../types';
import { ServiceIcon } from './ServiceIcons';
import { getWhatsAppUrl } from '../data/socialLinks';
import { 
  MessageSquare, 
  ArrowUpRight, 
  Sparkles, 
  Check, 
  HelpCircle,
  Play,
  Film,
  Music,
  Image as ImageIcon
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenMedia: (service: ServiceItem, initialMedia?: MediaItem) => void;
  onOpenMediaGuide: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onSelectService,
  onOpenMedia,
  onOpenMediaGuide
}) => {
  const [selectedCluster, setSelectedCluster] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredServices = SERVICES.filter((service) => {
    const matchesCluster = selectedCluster === 'all' || service.clusterId === selectedCluster;
    const matchesSearch =
      service.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.nameEs.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCluster && matchesSearch;
  });

  const getClusterColor = (clusterId: ClusterId) => {
    return CLUSTERS[clusterId] || CLUSTERS['01'];
  };

  return (
    <section id="servicios" className="py-20 bg-[#FAFAFC] dark:bg-[#0B0F19] relative border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B4D8]/10 dark:bg-[#00B4D8]/20 text-[#007F98] dark:text-[#40C7E2] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#00B4D8]" />
              Ecosistema Integral & Muestras en Vivo
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] dark:text-white font-heading tracking-tight">
              Catálogo de Servicios HMA
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mt-2 max-w-2xl">
              12 soluciones estructuradas en 4 clústeres cromáticos. Puedes <strong>escuchar audios, ver videos y examinar fotos</strong> directamente sin salir de la página.
            </p>
          </div>

          {/* Quick Search & Orientation button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={onOpenMediaGuide}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#151D2C] hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-200 shadow-xs transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-[#00B4D8]" />
              <span>¿Cómo subir mis enlaces?</span>
            </button>

            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Buscar servicio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#151D2C] text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* Filters / Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 mt-6 pb-2 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setSelectedCluster('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedCluster === 'all'
                ? 'bg-[#111827] dark:bg-white text-white dark:text-gray-900 shadow-sm'
                : 'bg-white dark:bg-[#151D2C] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
            }`}
          >
            Todos ({SERVICES.length})
          </button>

          {Object.values(CLUSTERS).map((cluster) => (
            <button
              key={cluster.id}
              onClick={() => setSelectedCluster(cluster.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                selectedCluster === cluster.id
                  ? 'text-white shadow-sm'
                  : 'bg-white dark:bg-[#151D2C] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
              }`}
              style={{
                backgroundColor: selectedCluster === cluster.id ? cluster.mainColor : undefined,
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: selectedCluster === cluster.id ? '#FFFFFF' : cluster.mainColor,
                }}
              />
              <span>{cluster.number} · {cluster.shortName}</span>
            </button>
          ))}
        </div>

        {/* 12 Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#151D2C] rounded-2xl border border-gray-200 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-400 font-semibold">No se encontraron servicios con el criterio "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCluster('all');
              }}
              className="mt-3 text-sm font-bold text-[#00B4D8] hover:underline cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const cluster = getClusterColor(service.clusterId);
              const whatsappUrl = getWhatsAppUrl(service.defaultWhatsAppMessage);

              return (
                <div
                  key={service.id}
                  id={`servicio-${service.id}`}
                  className="bg-white dark:bg-[#151D2C] rounded-2xl border border-gray-200/90 dark:border-gray-800 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative group"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${cluster.mainColor}66`;
                    e.currentTarget.style.boxShadow = `0 12px 28px -6px ${cluster.mainColor}26, 0 0 0 1px ${cluster.mainColor}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  {/* Top Bar: Cluster Number, Service Number & Popular Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="text-[11px] font-black px-2 py-0.5 rounded-md font-mono"
                          style={{
                            backgroundColor: `${cluster.mainColor}`,
                            color: '#FFFFFF',
                          }}
                        >
                          {service.serviceNumber}
                        </span>
                        <span
                          className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg border font-heading"
                          style={{
                            backgroundColor: `${cluster.mainColor}12`,
                            color: cluster.darkColor,
                            borderColor: `${cluster.mainColor}30`,
                          }}
                        >
                          {cluster.number} · {cluster.shortName}
                        </span>
                      </div>

                      {service.isPopular && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 flex items-center gap-1">
                          ★ Destacado
                        </span>
                      )}
                    </div>

                    {/* Icon with Cluster Color Accent & Soft Glow */}
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                        style={{
                          backgroundColor: `${cluster.mainColor}15`,
                          border: `1px solid ${cluster.mainColor}30`,
                        }}
                      >
                        <ServiceIcon type={service.iconType} color={cluster.mainColor} className="w-8 h-8" />
                      </div>
                      <div>
                        {/* EN Name */}
                        <h3 className="text-xl font-black text-[#111827] dark:text-white font-heading tracking-tight leading-tight">
                          {service.nameEn}
                        </h3>
                        {/* Commercial ES Name */}
                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-0.5">
                          {service.nameEs}
                        </p>
                      </div>
                    </div>

                    {/* Tagline / Subtitle */}
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/70 p-2.5 rounded-xl mb-4 border border-gray-100 dark:border-gray-700/60 italic">
                      "{service.tagline}"
                    </p>

                    {/* Description */}
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Bullet Features */}
                    <ul className="space-y-1.5 mb-5 text-xs text-gray-700 dark:text-gray-300">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check
                            className="w-3.5 h-3.5 shrink-0 mt-0.5"
                            style={{ color: cluster.mainColor }}
                          />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Media Showcase Trigger Banner if available */}
                    {service.mediaItems && service.mediaItems.length > 0 && (
                      <button
                        onClick={() => onOpenMedia(service)}
                        className="w-full mb-4 p-2.5 rounded-xl border flex items-center justify-between transition-all group/media cursor-pointer"
                        style={{
                          backgroundColor: `${cluster.mainColor}08`,
                          borderColor: `${cluster.mainColor}25`,
                        }}
                      >
                        <div className="flex items-center gap-2 text-xs font-bold" style={{ color: cluster.darkColor }}>
                          {service.mediaItems.some(m => m.type === 'video') && (
                            <Film className="w-3.5 h-3.5" />
                          )}
                          {service.mediaItems.some(m => m.type === 'audio') && (
                            <Music className="w-3.5 h-3.5" />
                          )}
                          {service.mediaItems.every(m => m.type === 'image') && (
                            <ImageIcon className="w-3.5 h-3.5" />
                          )}
                          <span>Ver {service.mediaItems.length} Muestras & Reproducir</span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg bg-white dark:bg-gray-800 shadow-xs group-hover/media:translate-x-0.5 transition-transform" style={{ color: cluster.mainColor }}>
                          <Play className="w-3 h-3 fill-current" />
                          <span>Abrir</span>
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Actions: Direct WhatsApp Button & Quick Quote Modal */}
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2">
                    {/* Direct WhatsApp Button */}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white transition-all shadow-sm active:scale-95 hover:brightness-110"
                      style={{
                        backgroundColor: cluster.mainColor,
                      }}
                      title="Abrir WhatsApp con mensaje listo"
                    >
                      <MessageSquare className="w-4 h-4 fill-white/20" />
                      <span>Cotizar en WhatsApp</span>
                    </a>

                    {/* Detail Modal Trigger */}
                    <button
                      onClick={() => onSelectService(service)}
                      className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                      title="Ver ficha completa y cotizador"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
