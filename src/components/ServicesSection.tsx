import React, { useState } from 'react';
import { SERVICES, CLUSTERS, TECHNICAL_PALETTE } from '../data/servicesData';
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
  Image as ImageIcon,
  LayoutGrid,
  FileCode2
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
  const [viewMode, setViewMode] = useState<'isotypes' | 'catalog'>('isotypes');

  const filteredServices = SERVICES.filter((service) => {
    const matchesCluster = selectedCluster === 'all' || service.clusterId === selectedCluster;
    const matchesSearch =
      service.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.nameEs.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (service.concept && service.concept.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCluster && matchesSearch;
  });

  const getClusterColor = (clusterId: ClusterId) => {
    return CLUSTERS[clusterId] || CLUSTERS['01'];
  };

  return (
    <section id="servicios" className="py-20 bg-[#FAFAFC] dark:bg-[#060C04] relative border-t border-gray-200 dark:border-gray-850 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11D7B6]/10 dark:bg-[#11D7B6]/15 border border-[#11D7B6]/30 dark:border-[#11D7B6]/35 text-[#0C947D] dark:text-[#11D7B6] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#11D7B6]" />
              Ecosistema Integral & Ficha Técnica de Isotipos
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#060C04] dark:text-[#FEFAE8] font-heading tracking-tight">
              Catálogo de 12 Servicios HMA
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mt-2 max-w-2xl">
              12 soluciones estructuradas con su color calibrado de la Ficha Técnica oficial. Puedes <strong>reproducir audios, videos y fotos</strong> directamente sin salir de la página.
            </p>
          </div>

          {/* Controls: View Switcher & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* View Mode Toggle (hma_inlumenai_isotypes vs Commercial Catalog) */}
            <div className="inline-flex items-center p-1 rounded-xl bg-white dark:bg-[#0E1712] border border-gray-200 dark:border-gray-800 shadow-xs">
              <button
                onClick={() => setViewMode('isotypes')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'isotypes'
                    ? 'bg-[#2D60C1] text-white shadow-xs'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                title="Presentación técnica de los 12 isotipos"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Ficha Isotipos</span>
              </button>
              <button
                onClick={() => setViewMode('catalog')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'catalog'
                    ? 'bg-[#2D60C1] text-white shadow-xs'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                title="Vista catálogo comercial detallada"
              >
                <FileCode2 className="w-3.5 h-3.5" />
                <span>Catálogo Completo</span>
              </button>
            </div>

            <button
              onClick={onOpenMediaGuide}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-[#0E1712] hover:bg-gray-50 dark:hover:bg-[#15231B] text-xs font-bold text-gray-700 dark:text-gray-200 shadow-xs transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-[#11D7B6]" />
              <span>¿Cómo subir mis enlaces?</span>
            </button>

            <div className="w-full sm:w-56">
              <input
                type="text"
                placeholder="Buscar servicio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-[#0E1712] text-gray-900 dark:text-[#FEFAE8] placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#11D7B6] focus:border-transparent shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* Filters / Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-gray-200 dark:border-gray-800/80">
          <button
            onClick={() => setSelectedCluster('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedCluster === 'all'
                ? 'bg-[#060C04] dark:bg-[#FEFAE8] text-white dark:text-[#060C04] shadow-sm'
                : 'bg-white dark:bg-[#0E1712] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#15231B] border border-gray-200 dark:border-gray-800'
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
                  : 'bg-white dark:bg-[#0E1712] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#15231B] border border-gray-200 dark:border-gray-800'
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

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#0E1712] rounded-2xl border border-gray-200 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-400 font-semibold">No se encontraron servicios con el criterio "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCluster('all');
              }}
              className="mt-3 text-sm font-bold text-[#11D7B6] hover:underline cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        ) : viewMode === 'isotypes' ? (
          /* ========================================================= */
          /* PRESENTACIÓN TÉCNICA DE LOS 12 ISOTIPOS (hma_inlumenai_isotypes.html) */
          /* ========================================================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredServices.map((service) => {
              const cluster = getClusterColor(service.clusterId);
              const colorHex = service.colorHex || cluster.mainColor;
              const whatsappUrl = getWhatsAppUrl(service.defaultWhatsAppMessage);

              return (
                <div
                  key={service.id}
                  id={`isotipo-${service.id}`}
                  className="bg-white dark:bg-[#0E1712] rounded-2xl border border-gray-200/90 dark:border-gray-800 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden group shadow-xs"
                  style={{
                    borderTop: `4px solid ${colorHex}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${colorHex}88`;
                    e.currentTarget.style.borderTopColor = colorHex;
                    e.currentTarget.style.boxShadow = `0 16px 32px -8px ${colorHex}30, 0 0 0 1px ${colorHex}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.borderTopColor = colorHex;
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <div className="p-6">
                    {/* Top Metadata Header */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-xs font-mono font-black px-2.5 py-1 rounded-md text-white shadow-2xs"
                          style={{ backgroundColor: colorHex }}
                        >
                          {service.serviceNumber}
                        </span>
                        <span className="text-xs font-extrabold text-gray-500 dark:text-gray-400 font-heading">
                          Clúster {cluster.number}
                        </span>
                      </div>

                      {/* Technical Color Chip Badge */}
                      <div 
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border"
                        style={{
                          backgroundColor: `${colorHex}15`,
                          color: colorHex,
                          borderColor: `${colorHex}35`,
                        }}
                      >
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colorHex }} />
                        <span>{colorHex}</span>
                      </div>
                    </div>

                    {/* Central Hero Box for the Isotype */}
                    <div 
                      className="w-full aspect-[16/10] rounded-xl flex items-center justify-center p-6 mb-4 relative transition-all duration-300 group-hover:scale-[1.02]"
                      style={{
                        backgroundColor: '#060C04',
                        border: `1px solid ${colorHex}25`,
                      }}
                    >
                      {/* Subtle Grid in Isotype Canvas */}
                      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                      
                      {/* Ambient Glow */}
                      <div 
                        className="absolute inset-0 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"
                        style={{ backgroundColor: colorHex }}
                      />

                      {/* The Vector Isotype */}
                      <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center filter drop-shadow-md">
                        <ServiceIcon 
                          type={service.iconType} 
                          color={colorHex} 
                          className="w-full h-full object-contain" 
                        />
                      </div>
                    </div>

                    {/* Title & Commercial Definition */}
                    <h3 className="text-xl font-black text-[#060C04] dark:text-[#FEFAE8] font-heading tracking-tight">
                      {service.nameEn}
                    </h3>
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-0.5 mb-3">
                      {service.nameEs}
                    </p>

                    {/* Geometric Concept Strip */}
                    {service.concept && (
                      <div className="mb-3 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-[#15231B] border border-gray-200/80 dark:border-gray-800 text-[11px] text-gray-700 dark:text-gray-300 font-medium flex items-center justify-between">
                        <span className="text-gray-400 dark:text-gray-500">Concepto:</span>
                        <span className="font-bold text-gray-900 dark:text-[#FEFAE8]">{service.concept}</span>
                      </div>
                    )}

                    {/* Technical Color Coordinates Row */}
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-gray-500 dark:text-gray-400 bg-gray-50/70 dark:bg-[#121C15]/70 p-2.5 rounded-lg border border-gray-100 dark:border-gray-800/60 mb-4">
                      <div>
                        <span className="text-gray-400 dark:text-gray-500">RGB: </span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{service.rgb || '—'}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 dark:text-gray-500">CMYK: </span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{service.cmyk || '—'}</span>
                      </div>
                    </div>

                    {/* Media trigger banner if items exist */}
                    {service.mediaItems && service.mediaItems.length > 0 && (
                      <button
                        onClick={() => onOpenMedia(service)}
                        className="w-full mb-2 p-2.5 rounded-xl border flex items-center justify-between transition-all group/media cursor-pointer hover:brightness-105"
                        style={{
                          backgroundColor: `${colorHex}10`,
                          borderColor: `${colorHex}30`,
                        }}
                      >
                        <div className="flex items-center gap-2 text-xs font-bold" style={{ color: colorHex }}>
                          {service.mediaItems.some(m => m.type === 'video') && (
                            <Film className="w-3.5 h-3.5" />
                          )}
                          {service.mediaItems.some(m => m.type === 'audio') && (
                            <Music className="w-3.5 h-3.5" />
                          )}
                          {service.mediaItems.every(m => m.type === 'image') && (
                            <ImageIcon className="w-3.5 h-3.5" />
                          )}
                          <span>Ver {service.mediaItems.length} Muestras en Vivo</span>
                        </div>
                        <span 
                          className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-white dark:bg-[#0E1712] shadow-2xs group-hover/media:translate-x-0.5 transition-transform" 
                          style={{ color: colorHex }}
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Reproducir</span>
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-4 pt-3 border-t border-gray-100 dark:border-gray-800/80 bg-gray-50/50 dark:bg-[#0A130D]/50 flex items-center gap-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white transition-all shadow-xs active:scale-95 hover:brightness-110"
                      style={{ backgroundColor: colorHex }}
                    >
                      <MessageSquare className="w-4 h-4 fill-white/20" />
                      <span>Cotizar en WhatsApp</span>
                    </a>

                    <button
                      onClick={() => onSelectService(service)}
                      className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0E1712] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#15231B] hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                      title="Ver ficha completa y cotizador"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* ========================================================= */
          /* VISTA CATÁLOGO COMERCIAL COMPLETO                         */
          /* ========================================================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const cluster = getClusterColor(service.clusterId);
              const colorHex = service.colorHex || cluster.mainColor;
              const whatsappUrl = getWhatsAppUrl(service.defaultWhatsAppMessage);

              return (
                <div
                  key={service.id}
                  id={`servicio-${service.id}`}
                  className="bg-white dark:bg-[#0E1712] rounded-2xl border border-gray-200/90 dark:border-gray-800 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative group shadow-xs"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${colorHex}66`;
                    e.currentTarget.style.boxShadow = `0 14px 30px -6px ${colorHex}25, 0 0 0 1px ${colorHex}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <div>
                    {/* Top Bar: Cluster Number, Service Number & Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="text-[11px] font-black px-2 py-0.5 rounded-md font-mono text-white"
                          style={{ backgroundColor: colorHex }}
                        >
                          {service.serviceNumber}
                        </span>
                        <span
                          className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg border font-heading"
                          style={{
                            backgroundColor: `${colorHex}12`,
                            color: colorHex,
                            borderColor: `${colorHex}30`,
                          }}
                        >
                          {cluster.number} · {cluster.shortName}
                        </span>
                      </div>

                      {service.isPopular && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 flex items-center gap-1">
                          ★ Destacado
                        </span>
                      )}
                    </div>

                    {/* Icon with Technical Color Accent */}
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                        style={{
                          backgroundColor: `${colorHex}15`,
                          border: `1px solid ${colorHex}30`,
                        }}
                      >
                        <ServiceIcon type={service.iconType} color={colorHex} className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-[#060C04] dark:text-[#FEFAE8] font-heading tracking-tight leading-tight">
                          {service.nameEn}
                        </h3>
                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-0.5">
                          {service.nameEs}
                        </p>
                      </div>
                    </div>

                    {/* Tagline */}
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-[#15231B] p-2.5 rounded-xl mb-4 border border-gray-100 dark:border-gray-800 italic">
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
                            style={{ color: colorHex }}
                          />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Media trigger banner */}
                    {service.mediaItems && service.mediaItems.length > 0 && (
                      <button
                        onClick={() => onOpenMedia(service)}
                        className="w-full mb-4 p-2.5 rounded-xl border flex items-center justify-between transition-all group/media cursor-pointer"
                        style={{
                          backgroundColor: `${colorHex}08`,
                          borderColor: `${colorHex}25`,
                        }}
                      >
                        <div className="flex items-center gap-2 text-xs font-bold" style={{ color: colorHex }}>
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
                        <span 
                          className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg bg-white dark:bg-[#0E1712] shadow-xs group-hover/media:translate-x-0.5 transition-transform" 
                          style={{ color: colorHex }}
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Abrir</span>
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white transition-all shadow-sm active:scale-95 hover:brightness-110"
                      style={{ backgroundColor: colorHex }}
                    >
                      <MessageSquare className="w-4 h-4 fill-white/20" />
                      <span>Cotizar en WhatsApp</span>
                    </a>

                    <button
                      onClick={() => onSelectService(service)}
                      className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0E1712] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#15231B] hover:text-black dark:hover:text-white transition-colors cursor-pointer"
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
