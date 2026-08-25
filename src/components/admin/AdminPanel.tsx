import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { CLUSTERS } from '../../data/servicesData';
import { ServiceItem, MediaItem, PortfolioItem } from '../../types';
import { HmaLogo } from '../HmaLogo';
import { ServiceIcon } from '../ServiceIcons';
import { AdminServiceEditModal } from './AdminServiceEditModal';
import { AdminMediaEditModal } from './AdminMediaEditModal';
import { AdminPortfolioEditModal } from './AdminPortfolioEditModal';
import { AdminTimelineTab } from './AdminTimelineTab';
import { 
  LayoutGrid, 
  Film, 
  FolderGit2, 
  Settings, 
  Eye, 
  LogOut, 
  Download, 
  Upload, 
  RotateCcw, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  Search, 
  Music, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  Shield,
  Palette
} from 'lucide-react';

interface AdminPanelProps {
  onGoToPublicSite?: () => void;
  onBackToSite?: () => void;
  onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onGoToPublicSite, onBackToSite, onLogout }) => {
  const handleExitToPublic = () => {
    if (onBackToSite) onBackToSite();
    else if (onGoToPublicSite) onGoToPublicSite();
  };
  const {
    services,
    mediaItems,
    portfolioItems,
    siteConfig,
    updateService,
    toggleServiceActive,
    addMediaItem,
    updateMediaItem,
    deleteMediaItem,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
    updateSiteConfig,
    resetAllToDefaults,
    exportDataToJson,
    importDataFromJson,
  } = useData();

  const [activeTab, setActiveTab] = useState<'services' | 'media' | 'portfolio' | 'timeline' | 'settings'>('services');
  const [selectedServiceToEdit, setSelectedServiceToEdit] = useState<ServiceItem | null>(null);
  
  // Media Modal state
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [mediaItemToEdit, setMediaItemToEdit] = useState<MediaItem | null>(null);
  const [mediaFilterService, setMediaFilterService] = useState<string>('all');
  
  // Portfolio Modal state
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [portfolioItemToEdit, setPortfolioItemToEdit] = useState<PortfolioItem | null>(null);

  // Search in services tab
  const [serviceSearch, setServiceSearch] = useState('');
  const [serviceClusterFilter, setServiceClusterFilter] = useState('all');

  // Flash notification message
  const [notification, setNotification] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null);

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Export JSON file
  const handleExportJson = () => {
    const jsonStr = exportDataToJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hma_inlumenai_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification('¡Copia de seguridad descargada exitosamente en formato JSON!');
  };

  // Import JSON file
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importDataFromJson(content);
        if (success) {
          showNotification('¡Datos importados y aplicados exitosamente!');
        } else {
          showNotification('Error al leer el archivo JSON. Verifica que sea válido.', 'error');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleResetDefaults = () => {
    if (window.confirm('¿Estás seguro de que deseas restablecer todos los servicios, muestras y portafolios a sus valores oficiales originales?')) {
      resetAllToDefaults();
      showNotification('Todos los datos se han restablecido a los valores oficiales de fábrica.', 'info');
    }
  };

  const filteredServices = services.filter((s) => {
    const matchesCluster = serviceClusterFilter === 'all' || s.clusterId === serviceClusterFilter;
    const matchesSearch =
      s.nameEn.toLowerCase().includes(serviceSearch.toLowerCase()) ||
      s.nameEs.toLowerCase().includes(serviceSearch.toLowerCase()) ||
      s.serviceNumber.includes(serviceSearch);
    return matchesCluster && matchesSearch;
  });

  const filteredMedia = mediaItems.filter((m) => {
    return mediaFilterService === 'all' || m.serviceId === mediaFilterService;
  });

  return (
    <div className="min-h-screen bg-[#070D18] text-gray-100 flex flex-col font-sans selection:bg-[#00B4D8] selection:text-white">
      
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 bg-[#0B1323]/95 backdrop-blur-md border-b border-gray-800/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#00B4D8]/10 border border-[#00B4D8]/30 flex items-center justify-center text-[#00B4D8]">
            <HmaLogo variant="monochrome" color="#00B4D8" className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black font-heading tracking-tight text-white">
                HMA INLUMENAI
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00B4D8]/15 border border-[#00B4D8]/30 text-[#40C7E2] uppercase font-mono">
                Panel Administrador
              </span>
            </div>
            <p className="text-[10px] text-gray-400">
              Control Total de Módulos, Enlaces, Portafolios y Marca
            </p>
          </div>
        </div>

        {/* Action Controls in Header */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleExitToPublic}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#141E33] hover:bg-[#1E2D4A] border border-gray-700 text-xs font-bold text-gray-200 transition-all cursor-pointer"
            title="Ver cómo ven los clientes la página"
          >
            <Eye className="w-3.5 h-3.5 text-[#00B4D8]" />
            <span className="hidden sm:inline">Ver Sitio Público</span>
          </button>

          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/30 hover:bg-red-900/40 border border-red-800/40 text-xs font-bold text-red-400 transition-all cursor-pointer"
            title="Cerrar sesión de administrador"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-18 right-6 z-50 animate-in slide-in-from-top duration-300">
          <div
            className={`px-4 py-3 rounded-2xl border shadow-xl flex items-center gap-2.5 text-xs font-bold ${
              notification.type === 'error'
                ? 'bg-red-950 border-red-700 text-red-200'
                : notification.type === 'info'
                ? 'bg-blue-950 border-blue-700 text-blue-200'
                : 'bg-emerald-950 border-emerald-700 text-emerald-200'
            }`}
          >
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Secondary Sub-header Tabs */}
      <div className="bg-[#0A101D] border-b border-gray-800 px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between overflow-x-auto">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'services'
                ? 'bg-[#00B4D8] text-white shadow-md shadow-[#00B4D8]/20'
                : 'text-gray-400 hover:text-white hover:bg-[#141E33]'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>1. Servicios & Isotipos ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'media'
                ? 'bg-[#00B4D8] text-white shadow-md shadow-[#00B4D8]/20'
                : 'text-gray-400 hover:text-white hover:bg-[#141E33]'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>2. Muestras & Multimedia ({mediaItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'portfolio'
                ? 'bg-[#00B4D8] text-white shadow-md shadow-[#00B4D8]/20'
                : 'text-gray-400 hover:text-white hover:bg-[#141E33]'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>3. Portafolio ({portfolioItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'timeline'
                ? 'bg-[#00B4D8] text-white shadow-md shadow-[#00B4D8]/20'
                : 'text-gray-400 hover:text-white hover:bg-[#141E33]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>4. Reloj 10 Años</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-[#00B4D8] text-white shadow-md shadow-[#00B4D8]/20'
                : 'text-gray-400 hover:text-white hover:bg-[#141E33]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>5. Ajustes & Redes</span>
          </button>
        </div>

        {/* Backup tools right button */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={handleExportJson}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-300 hover:text-[#00B4D8] px-2.5 py-1.5 rounded-lg bg-[#141E33] border border-gray-700/60 cursor-pointer transition-colors"
            title="Descargar copia de seguridad en JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar Copia</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* ========================================================================= */}
        {/* TAB 1: SERVICIOS & ISOTIPOS                                               */}
        {/* ========================================================================= */}
        {activeTab === 'services' && (
          <div className="space-y-6 animate-in fade-in">
            
            {/* Header / Intro banner for non-programmer */}
            <div className="bg-[#0F172A] p-6 rounded-3xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black font-heading text-white tracking-tight flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[#00B4D8]" />
                  <span>Administrador de los 12 Servicios HMA</span>
                </h2>
                <p className="text-xs text-gray-400 mt-1 max-w-2xl leading-relaxed">
                  Aquí puedes cambiar el nombre, lema, colores oficiales, entregables o subir un nuevo código SVG para el logotipo. Si deshabilitas un servicio indispensable, se mostrará como <strong>"En construcción"</strong> en la vista pública.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar servicio..."
                    value={serviceSearch}
                    onChange={(e) => setServiceSearch(e.target.value)}
                    className="pl-8 pr-3 py-2 rounded-xl bg-[#070D18] border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                  />
                </div>

                <select
                  value={serviceClusterFilter}
                  onChange={(e) => setServiceClusterFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#070D18] border border-gray-700 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                >
                  <option value="all">Todos los Clústeres</option>
                  <option value="01">Clúster 01 · Identidad</option>
                  <option value="02">Clúster 02 · Audiovisual</option>
                  <option value="03">Clúster 03 · Fe & Legado</option>
                  <option value="04">Clúster 04 · Tecnología</option>
                </select>
              </div>
            </div>

            {/* Grid of 12 Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredServices.map((service) => {
                const cluster = CLUSTERS[service.clusterId] || CLUSTERS['01'];
                const colorHex = service.colorHex || cluster.mainColor;
                const isOnline = service.isActive !== false;

                return (
                  <div
                    key={service.id}
                    className="bg-[#0F172A] rounded-2xl border border-gray-800 p-5 flex flex-col justify-between transition-all hover:border-gray-700 relative group shadow-sm"
                    style={{
                      borderTop: `3px solid ${colorHex}`,
                    }}
                  >
                    <div>
                      {/* Top status bar */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="text-xs font-mono font-black px-2 py-0.5 rounded text-white"
                            style={{ backgroundColor: colorHex }}
                          >
                            {service.serviceNumber}
                          </span>
                          <span className="text-[11px] font-bold text-gray-400">
                            Clúster {cluster.number}
                          </span>
                        </div>

                        {/* Fast Status Toggle Switch */}
                        <button
                          type="button"
                          onClick={() => {
                            toggleServiceActive(service.id);
                            showNotification(
                              `Módulo ${service.serviceNumber} ${isOnline ? 'puesto en "En Construcción"' : 'habilitado como Activo'}`
                            );
                          }}
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 transition-all cursor-pointer ${
                            isOnline
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                          }`}
                          title="Haz clic para alternar entre Activo y En Construcción"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                          <span>{isOnline ? 'Activo' : 'En Construcción'}</span>
                        </button>
                      </div>

                      {/* Service Isotype & Title */}
                      <div className="flex items-center gap-3.5 mb-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: `${colorHex}15`,
                            border: `1px solid ${colorHex}30`,
                          }}
                        >
                          <ServiceIcon
                            type={service.iconType}
                            color={colorHex}
                            customSvg={service.customSvg}
                            className="w-7 h-7"
                          />
                        </div>
                        <div className="overflow-hidden">
                          <h3 className="text-base font-black text-white font-heading truncate">
                            {service.nameEn}
                          </h3>
                          <p className="text-xs font-semibold text-gray-400 truncate">
                            {service.nameEs}
                          </p>
                        </div>
                      </div>

                      {/* Tagline */}
                      <p className="text-[11px] text-gray-400 italic bg-[#090F1E] p-2 rounded-lg border border-gray-800/80 mb-3 truncate">
                        "{service.tagline}"
                      </p>

                      {/* Technical Specs Strip */}
                      <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 pb-3 mb-3 border-b border-gray-800">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colorHex }} />
                          <span>{colorHex}</span>
                        </span>
                        <span>{service.mediaItems?.length || 0} Muestras</span>
                        <span>{service.features.length} Entregables</span>
                      </div>
                    </div>

                    {/* Action button */}
                    <button
                      type="button"
                      onClick={() => setSelectedServiceToEdit(service)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#141E33] hover:bg-[#00B4D8] hover:text-white text-gray-200 text-xs font-bold flex items-center justify-center gap-2 border border-gray-700/60 hover:border-transparent transition-all cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Editar Módulo, Textos & SVG</span>
                    </button>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: MUESTRAS & MULTIMEDIA                                              */}
        {/* ========================================================================= */}
        {activeTab === 'media' && (
          <div className="space-y-6 animate-in fade-in">
            
            {/* Header */}
            <div className="bg-[#0F172A] p-6 rounded-3xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black font-heading text-white tracking-tight flex items-center gap-2">
                  <Film className="w-5 h-5 text-[#00B4D8]" />
                  <span>Muestras Multimedia & Enlaces Externos</span>
                </h2>
                <p className="text-xs text-gray-400 mt-1 max-w-2xl">
                  Administra los videos de YouTube, audios, fotos o enlaces de Facebook de cada uno de los 12 servicios.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <select
                  value={mediaFilterService}
                  onChange={(e) => setMediaFilterService(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#070D18] border border-gray-700 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                >
                  <option value="all">Todos los Servicios ({mediaItems.length})</option>
                  {services.map((svc) => (
                    <option key={svc.id} value={svc.id}>
                      [{svc.serviceNumber}] {svc.nameEn}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => {
                    setMediaItemToEdit(null);
                    setIsMediaModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#00B4D8] hover:bg-[#0096B4] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-[#00B4D8]/20 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nueva Muestra</span>
                </button>
              </div>
            </div>

            {/* Media Items Table / Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMedia.map((media) => {
                const svc = services.find((s) => s.id === media.serviceId) || services[0];
                const cluster = CLUSTERS[media.clusterId || '01'];

                return (
                  <div
                    key={media.id}
                    className="bg-[#0F172A] rounded-2xl border border-gray-800 p-4 flex flex-col justify-between transition-all hover:border-gray-700"
                  >
                    <div>
                      {/* Top service badge & type */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-md font-heading text-white"
                          style={{ backgroundColor: svc?.colorHex || cluster.mainColor }}
                        >
                          {svc?.serviceNumber} · {svc?.nameEn}
                        </span>

                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-gray-800 text-gray-300">
                          {media.type}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-sm font-black text-white font-heading line-clamp-1 mb-1">
                        {media.title}
                      </h4>

                      {media.description && (
                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-3">
                          {media.description}
                        </p>
                      )}

                      {/* URL Preview */}
                      <div className="bg-[#090F1E] px-2.5 py-1.5 rounded-lg border border-gray-800 text-[10px] font-mono text-gray-400 truncate mb-3 flex items-center gap-1">
                        <ExternalLink className="w-3 h-3 shrink-0 text-[#00B4D8]" />
                        <span className="truncate">{media.url}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
                      <a
                        href={media.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-[#00B4D8] hover:underline flex items-center gap-1"
                      >
                        <span>Probar Enlace</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setMediaItemToEdit(media);
                            setIsMediaModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors cursor-pointer"
                          title="Editar muestra"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`¿Eliminar la muestra "${media.title}"?`)) {
                              deleteMediaItem(media.id);
                              showNotification('Muestra eliminada correctamente.');
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/40 text-red-400 transition-colors cursor-pointer"
                          title="Eliminar muestra"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: PORTAFOLIO                                                         */}
        {/* ========================================================================= */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6 animate-in fade-in">
            
            {/* Header */}
            <div className="bg-[#0F172A] p-6 rounded-3xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black font-heading text-white tracking-tight flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-[#7B2CBF]" />
                  <span>Proyectos del Portafolio</span>
                </h2>
                <p className="text-xs text-gray-400 mt-1 max-w-2xl">
                  Agrega, edita o elimina las muestras de trabajos realizados que se muestran a los clientes.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setPortfolioItemToEdit(null);
                  setIsPortfolioModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-[#7B2CBF] hover:bg-[#6820A3] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-[#7B2CBF]/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Proyecto</span>
              </button>
            </div>

            {/* Grid of Portfolio projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {portfolioItems.map((item) => {
                const cluster = CLUSTERS[item.clusterId] || CLUSTERS['01'];

                return (
                  <div
                    key={item.id}
                    className="bg-[#0F172A] rounded-2xl border border-gray-800 p-5 flex flex-col justify-between transition-all hover:border-gray-700 shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                          style={{
                            backgroundColor: `${cluster.mainColor}20`,
                            color: cluster.lightColor,
                          }}
                        >
                          {item.category}
                        </span>
                        <span className="text-[11px] font-mono text-gray-400 font-bold">
                          {item.year}
                        </span>
                      </div>

                      <h3 className="text-base font-black text-white font-heading tracking-tight mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium mb-3">
                        {item.subtitle}
                      </p>

                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 mb-4">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.deliverables.map((del, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded bg-[#141E33] text-gray-300 border border-gray-800"
                          >
                            {del}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
                      {item.externalLink ? (
                        <a
                          href={item.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#00B4D8] hover:underline font-bold flex items-center gap-1"
                        >
                          <span>Ver Álbum</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-xs text-gray-500 italic">Sin enlace</span>
                      )}

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setPortfolioItemToEdit(item);
                            setIsPortfolioModalOpen(true);
                          }}
                          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`¿Eliminar el proyecto "${item.title}"?`)) {
                              deletePortfolioItem(item.id);
                              showNotification('Proyecto eliminado del portafolio.');
                            }
                          }}
                          className="p-2 rounded-lg bg-red-950/30 hover:bg-red-900/40 text-red-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: TIMELINE (10 AÑOS)                                                 */}
        {/* ========================================================================= */}
        {activeTab === 'timeline' && (
          <AdminTimelineTab />
        )}

        {/* ========================================================================= */}
        {/* TAB 5: CONFIGURACIÓN GLOBAL & REDES                                       */}
        {/* ========================================================================= */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in">
            
            {/* Social Links Form */}
            <div className="bg-[#0F172A] p-6 rounded-3xl border border-gray-800 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-5 h-5 text-[#00B4D8]" />
                <h3 className="text-lg font-black font-heading text-white">
                  Canales Oficiales & Redes de Contacto
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Número de WhatsApp (con código de país, sin signos):
                  </label>
                  <input
                    type="text"
                    value={siteConfig.whatsappPhone}
                    onChange={(e) => updateSiteConfig({ whatsappPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Texto Visible de WhatsApp:
                  </label>
                  <input
                    type="text"
                    value={siteConfig.whatsappDisplay}
                    onChange={(e) => updateSiteConfig({ whatsappDisplay: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    URL de la Página de Facebook:
                  </label>
                  <input
                    type="url"
                    value={siteConfig.facebookUrl}
                    onChange={(e) => updateSiteConfig({ facebookUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    URL del Perfil de Instagram:
                  </label>
                  <input
                    type="url"
                    value={siteConfig.instagramUrl}
                    onChange={(e) => updateSiteConfig({ instagramUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    URL del Canal de YouTube:
                  </label>
                  <input
                    type="url"
                    value={siteConfig.youtubeUrl}
                    onChange={(e) => updateSiteConfig({ youtubeUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Lema Institucional / Slogan:
                  </label>
                  <input
                    type="text"
                    value={siteConfig.motto}
                    onChange={(e) => updateSiteConfig({ motto: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => showNotification('¡Configuración de contacto guardada exitosamente!')}
                className="mt-2 px-5 py-2.5 rounded-xl bg-[#00B4D8] hover:bg-[#0096B4] text-white text-xs font-bold transition-all cursor-pointer"
              >
                Guardar Ajustes de Contacto
              </button>
            </div>

            {/* Backup and Restore Tools */}
            <div className="bg-[#0F172A] p-6 rounded-3xl border border-gray-800 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-black font-heading text-white">
                  Copias de Seguridad & Restauración
                </h3>
              </div>
              <p className="text-xs text-gray-400">
                Todo lo que modifiques se guarda automáticamente en tu navegador. Puedes descargar un archivo JSON para tener un respaldo o transferir tus configuraciones a otro dispositivo.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="p-4 rounded-2xl bg-[#141E33] hover:bg-[#1E2D4A] border border-gray-700 text-left transition-all cursor-pointer group"
                >
                  <Download className="w-5 h-5 text-[#00B4D8] mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xs font-bold text-white">Descargar Respaldo JSON</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Guarda todos los servicios, muestras y portafolios en un solo archivo.
                  </p>
                </button>

                <label className="p-4 rounded-2xl bg-[#141E33] hover:bg-[#1E2D4A] border border-gray-700 text-left transition-all cursor-pointer group relative block">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJson}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <Upload className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xs font-bold text-white">Restaurar desde Respaldo JSON</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Carga un archivo de copia de seguridad previamente descargado.
                  </p>
                </label>
              </div>

              {/* Factory reset */}
              <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-red-400">Restablecer a Valores Oficiales de Fábrica</h4>
                  <p className="text-[11px] text-gray-500">
                    Borra las modificaciones personalizadas y restaura los 12 servicios iniciales.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="px-4 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800 text-xs font-bold text-red-300 transition-colors cursor-pointer"
                >
                  Restablecer
                </button>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* Service Edit Modal */}
      <AdminServiceEditModal
        service={selectedServiceToEdit}
        onClose={() => setSelectedServiceToEdit(null)}
        onSave={(id, updated) => {
          updateService(id, updated);
          showNotification('¡Módulo actualizado correctamente!');
        }}
      />

      {/* Media Edit Modal */}
      {isMediaModalOpen && (
        <AdminMediaEditModal
          item={mediaItemToEdit}
          services={services}
          defaultServiceId={mediaFilterService !== 'all' ? mediaFilterService : undefined}
          onClose={() => {
            setIsMediaModalOpen(false);
            setMediaItemToEdit(null);
          }}
          onSave={(mediaData, id) => {
            if (id) {
              updateMediaItem(id, mediaData);
              showNotification('¡Muestra multimedia actualizada!');
            } else {
              addMediaItem(mediaData);
              showNotification('¡Nueva muestra agregada al catálogo!');
            }
          }}
        />
      )}

      {/* Portfolio Edit Modal */}
      {isPortfolioModalOpen && (
        <AdminPortfolioEditModal
          item={portfolioItemToEdit}
          onClose={() => {
            setIsPortfolioModalOpen(false);
            setPortfolioItemToEdit(null);
          }}
          onSave={(portData, id) => {
            if (id) {
              updatePortfolioItem(id, portData);
              showNotification('¡Proyecto del portafolio actualizado!');
            } else {
              addPortfolioItem(portData);
              showNotification('¡Nuevo proyecto agregado al portafolio!');
            }
          }}
        />
      )}

    </div>
  );
};
