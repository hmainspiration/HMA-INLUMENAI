import React, { useState, useEffect } from 'react';
import { SERVICES } from '../data/brandData';
import { EVOLUTION_ERAS } from '../data/evolutionEras';
import { getPortfolioFiles } from '../utils/portfolioRegistry';
import {
  getSiteConfig,
  saveSiteConfig,
  getPortfolioConfig,
  savePortfolioConfig,
  SiteConfig,
  ServicePortfolioConfig,
  PortfolioMedia
} from '../utils/store';
import {
  Sliders,
  FolderKanban,
  Database,
  LogOut,
  Globe,
  Plus,
  Trash2,
  Eye,
  Video,
  Music,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  FileCode,
  X,
  Play,
  Copy,
  ExternalLink,
  Download,
  Upload,
  Sparkles,
  RotateCcw,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  CheckCheck,
  Archive,
  Clock,
  RefreshCw,
  Flame
} from 'lucide-react';
import { extractYouTubeId, getYouTubeThumbnail } from './MediaRenderer';
import { generateStandaloneMotionHtml, parseMotionHtmlToConfig } from './HeroMotionBackground';
import { IsotipoMaestroVector } from './BrandLogos';
import { updateFavicon } from '../utils/favicon';
import {
  subscribeSiteConfig,
  subscribePortfolioConfig,
  subscribeInquiries,
  updateInquiryStatusInFirestore,
  deleteInquiryFromFirestore,
  ContactInquiry
} from '../lib/firebase';

export const AdminPanel: React.FC<{ isNegative: boolean; onNavigateHome: () => void }> = ({
  isNegative,
  onNavigateHome
}) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'config' | 'portfolio' | 'inquiries' | 'data'>('portfolio');

  // Data State
  const [servicesJson, setServicesJson] = useState('');
  const [erasJson, setErasJson] = useState('');

  // Config State
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);

  // Portfolio State
  const [portfolioConfig, setPortfolioConfig] = useState<Record<string, ServicePortfolioConfig>>({});
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES[0].id);
  const [autoFiles, setAutoFiles] = useState<string[]>([]);
  const [portfolioFilter, setPortfolioFilter] = useState<'all' | 'youtube' | 'audio' | 'image'>('all');

  // Firebase Inquiries State
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [inquiryFilter, setInquiryFilter] = useState<'all' | 'nuevo' | 'en_proceso' | 'atendido' | 'archivado'>('all');
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(true);

  // New Media State
  const [newMediaType, setNewMediaType] = useState<'youtube' | 'image' | 'audio'>('youtube');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaTitle, setNewMediaTitle] = useState('');
  const [newMediaCover, setNewMediaCover] = useState('');
  const [showAddForm, setShowAddForm] = useState(true);

  // Live Preview Modal inside Admin
  const [previewMedia, setPreviewMedia] = useState<PortfolioMedia | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Import HTML Modal & File Ref
  const htmlFileInputRef = React.useRef<HTMLInputElement>(null);
  const [showImportHtmlModal, setShowImportHtmlModal] = useState(false);
  const [importHtmlText, setImportHtmlText] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    updateFavicon(isNegative);
  }, [isNegative]);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('hma_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    setServicesJson(JSON.stringify(SERVICES, null, 2));
    setErasJson(JSON.stringify(EVOLUTION_ERAS, null, 2));
    setSiteConfig(getSiteConfig());
    setPortfolioConfig(getPortfolioConfig());
    setAutoFiles(getPortfolioFiles());

    // Subscribe to real-time Firestore updates
    const unsubSite = subscribeSiteConfig((remoteConfig) => {
      setSiteConfig((prev) => (prev ? { ...prev, ...remoteConfig } : { ...getSiteConfig(), ...remoteConfig }));
    });

    const unsubPortfolio = subscribePortfolioConfig((remotePortfolio) => {
      setPortfolioConfig(remotePortfolio);
    });

    const unsubInquiries = subscribeInquiries((remoteInquiries) => {
      setInquiries(remoteInquiries);
      setIsFirebaseConnected(true);
    });

    return () => {
      unsubSite();
      unsubPortfolio();
      unsubInquiries();
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '951922') {
      sessionStorage.setItem('hma_admin_auth', 'true');
      setIsAuthenticated(true);
    } else {
      alert('PIN incorrecto. (Referencia: 951922)');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('hma_admin_auth');
    setIsAuthenticated(false);
    onNavigateHome();
  };

  const handleSaveData = () => {
    try {
      const parsedServices = JSON.parse(servicesJson);
      const parsedEras = JSON.parse(erasJson);
      localStorage.setItem('hma_services', JSON.stringify(parsedServices));
      localStorage.setItem('hma_eras', JSON.stringify(parsedEras));
      showToast('Datos maestros (JSON) guardados exitosamente.');
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      alert('Error: Formato JSON inválido.');
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (siteConfig) {
      saveSiteConfig(siteConfig);
      showToast('Configuración general actualizada.');
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  const handleExportMotionHtml = () => {
    if (!siteConfig) return;
    const htmlContent = generateStandaloneMotionHtml(siteConfig.heroMotion);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'motion-hma-matrix-v3.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Archivo HTML de animación exportado y descargado.');
  };

  const handleImportMotionHtmlFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && siteConfig) {
        const parsed = parseMotionHtmlToConfig(content);
        setSiteConfig({
          ...siteConfig,
          heroMotion: parsed
        });
        showToast('Animación HTML importada y aplicada al Hero.');
        setShowImportHtmlModal(false);
        setImportHtmlText('');
      }
    };
    reader.readAsText(file);
    // Reset file input value so same file can be re-uploaded if needed
    e.target.value = '';
  };

  const handleImportMotionHtmlText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importHtmlText.trim() || !siteConfig) return;

    const parsed = parseMotionHtmlToConfig(importHtmlText);
    setSiteConfig({
      ...siteConfig,
      heroMotion: parsed
    });
    showToast('Animación HTML procesada y aplicada al Hero.');
    setShowImportHtmlModal(false);
    setImportHtmlText('');
  };

  const handleCopyMotionHtml = () => {
    if (!siteConfig) return;
    const htmlContent = generateStandaloneMotionHtml(siteConfig.heroMotion);
    navigator.clipboard.writeText(htmlContent);
    showToast('Código HTML de la animación copiado al portapapeles.');
  };

  const handleResetMotion = () => {
    if (!siteConfig) return;
    setSiteConfig({
      ...siteConfig,
      heroMotion: {
        enabled: true,
        intensity: 0.35,
        speed: 1.0,
        showDeepOrb: true,
        showLightOrb: true,
        showGridPattern: true
      }
    });
    showToast('Valores de la animación restablecidos a los recomendados.');
  };

  const handleTogglePortfolioPublish = (serviceId: string) => {
    const current = portfolioConfig[serviceId] || { isPublished: false, customMedia: [] };
    const updated = {
      ...portfolioConfig,
      [serviceId]: { ...current, isPublished: !current.isPublished }
    };
    setPortfolioConfig(updated);
    savePortfolioConfig(updated);
    showToast(
      updated[serviceId].isPublished
        ? 'Portafolio visible públicamente en el sitio web.'
        : 'Portafolio oculto al público.'
    );
  };

  const handleAddCustomMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaUrl.trim()) return;

    const current = portfolioConfig[selectedServiceId] || { isPublished: false, customMedia: [] };
    const newItem: PortfolioMedia = {
      id: Date.now().toString(),
      type: newMediaType,
      url: newMediaUrl.trim(),
      title: newMediaTitle.trim() || undefined,
      coverUrl: newMediaType === 'audio' && newMediaCover.trim() ? newMediaCover.trim() : undefined
    };

    const updated = {
      ...portfolioConfig,
      [selectedServiceId]: {
        ...current,
        customMedia: [...current.customMedia, newItem]
      }
    };

    setPortfolioConfig(updated);
    savePortfolioConfig(updated);

    // reset form
    setNewMediaUrl('');
    setNewMediaTitle('');
    setNewMediaCover('');
    showToast('Recurso añadido al portafolio.');
  };

  const handleAddLocalAutoFile = (filePath: string) => {
    const isImg = filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.jpeg') || filePath.endsWith('.svg');
    const isAudio = filePath.endsWith('.mp3');
    const filename = filePath.split('/').pop()?.replace(/\.[^/.]+$/, '') || 'Recurso Local';

    const current = portfolioConfig[selectedServiceId] || { isPublished: false, customMedia: [] };
    
    // check if already added
    if (current.customMedia.some(m => m.url === filePath)) {
      showToast('Este archivo ya está en la lista de recursos.');
      return;
    }

    const newItem: PortfolioMedia = {
      id: Date.now().toString(),
      type: isImg ? 'image' : isAudio ? 'audio' : 'image',
      url: filePath,
      title: filename
    };

    const updated = {
      ...portfolioConfig,
      [selectedServiceId]: {
        ...current,
        customMedia: [...current.customMedia, newItem]
      }
    };

    setPortfolioConfig(updated);
    savePortfolioConfig(updated);
    showToast('Archivo local integrado al portafolio.');
  };

  const handleRemoveCustomMedia = (serviceId: string, mediaId: string) => {
    const current = portfolioConfig[serviceId];
    if (!current) return;

    const updated = {
      ...portfolioConfig,
      [serviceId]: {
        ...current,
        customMedia: current.customMedia.filter(m => m.id !== mediaId)
      }
    };
    setPortfolioConfig(updated);
    savePortfolioConfig(updated);
    showToast('Recurso eliminado.');
  };

  const handleUpdateInquiryStatus = async (id: string, status: ContactInquiry['status']) => {
    try {
      await updateInquiryStatusInFirestore(id, status);
      showToast(`Solicitud marcada como "${status}".`);
    } catch (err) {
      showToast('Error al actualizar el estado de la solicitud.');
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm('¿Deseas eliminar permanentemente esta solicitud de la base de datos Firestore?')) return;
    try {
      await deleteInquiryFromFirestore(id);
      showToast('Solicitud eliminada de Firestore.');
    } catch (err) {
      showToast('Error al eliminar la solicitud.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-[#060C04] text-[#FEFAE8]">
        <div className="p-8 rounded-3xl max-w-md w-full shadow-2xl bg-white/5 border border-white/10 text-center space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#3D80FD] uppercase tracking-widest">HMA INLUMENAI</span>
            <h2 className="text-3xl font-aeonik font-bold">Panel de Administración</h2>
            <p className="text-xs opacity-60">Ingresa tu clave PIN de seguridad</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="••••••"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="px-4 py-3.5 rounded-2xl text-center tracking-[0.5em] font-mono text-xl outline-none bg-black/60 text-white border border-white/10 focus:border-[#3D80FD] transition-colors"
              autoFocus
            />
            <button
              type="submit"
              className="py-3.5 rounded-2xl font-general font-bold uppercase tracking-wider text-xs bg-[#3D80FD] text-white hover:bg-blue-600 transition-colors shadow-lg cursor-pointer"
            >
              Acceder al Sistema
            </button>
          </form>

          <button
            onClick={onNavigateHome}
            className="text-xs uppercase font-general tracking-wider opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          >
            ← Volver al Sitio Web
          </button>
        </div>
      </div>
    );
  }

  const selectedService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];
  const serviceAutoFiles = autoFiles.filter(f => f.includes(`/portfolio/${selectedServiceId}/`));
  const selectedPortfolioConfig = portfolioConfig[selectedServiceId] || { isPublished: false, customMedia: [] };

  const activeMediaList = selectedPortfolioConfig.customMedia || [];
  const filteredAdminMedia = activeMediaList.filter(item => {
    if (portfolioFilter === 'all') return true;
    return item.type === portfolioFilter;
  });

  const countVideos = activeMediaList.filter(i => i.type === 'youtube').length;
  const countAudios = activeMediaList.filter(i => i.type === 'audio').length;
  const countImages = activeMediaList.filter(i => i.type === 'image').length;

  return (
    <div className={`min-h-screen flex flex-col font-general ${isNegative ? 'bg-[#060C04] text-[#FEFAE8]' : 'bg-[#FEFAE8] text-[#060C04]'}`}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#3D80FD] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-sm font-semibold animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER: Navigation Tabs & Controls */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
        isNegative ? 'bg-[#060C04]/90 border-white/10' : 'bg-[#FEFAE8]/90 border-black/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Title */}
          <div className="flex items-center gap-3">
            <div className="p-1 rounded-lg transition-transform hover:scale-105">
              <IsotipoMaestroVector width={36} height={36} isNegative={isNegative} />
            </div>
            <div>
              <h1 className="font-aeonik font-bold text-lg leading-tight">HMA INLUMENAI</h1>
              <span className="text-[10px] font-mono opacity-60 uppercase tracking-wider block">Panel de Control</span>
            </div>
          </div>

          {/* TOP TABS NAVIGATION */}
          <nav className={`flex items-center p-1.5 rounded-2xl border ${
            isNegative ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
          }`}>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'portfolio'
                  ? 'bg-[#3D80FD] text-white shadow-md'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span>Portafolios</span>
            </button>

            <button
              onClick={() => setActiveTab('config')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'config'
                  ? 'bg-[#3D80FD] text-white shadow-md'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Configuración</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer relative ${
                activeTab === 'inquiries'
                  ? 'bg-[#3D80FD] text-white shadow-md'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Solicitudes</span>
              {inquiries.filter(i => i.status === 'nuevo').length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-red-500 text-white font-bold animate-pulse">
                  {inquiries.filter(i => i.status === 'nuevo').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('data')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'data'
                  ? 'bg-[#3D80FD] text-white shadow-md'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Base de Datos</span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-mono font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Firestore En Vivo</span>
            </div>
            <button
              onClick={onNavigateHome}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                isNegative ? 'border-white/15 hover:bg-white/10' : 'border-black/15 hover:bg-black/10'
              }`}
              title="Ir a la web pública"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ver Sitio Web</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 transition-colors cursor-pointer"
              title="Cerrar sesión de administrador"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>

        </div>
      </header>

      {/* MAIN EXPANDED CONTENT (Full width without sidebar compression) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">

        {/* TAB 1: PORTAFOLIOS MULTIMEDIA */}
        {activeTab === 'portfolio' && (
          <div className="space-y-8">
            
            {/* 1.1 Horizontal Service Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-widest opacity-60">
                  Selecciona el servicio para administrar su portafolio (12 Disciplinas)
                </h3>
                <span className="text-xs opacity-60">
                  Servicio activo: <strong>{selectedService.fullServiceName}</strong>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5">
                {SERVICES.map(s => {
                  const sConf = portfolioConfig[s.id];
                  const mediaCount = (sConf?.customMedia || []).length;
                  const isPub = sConf?.isPublished;
                  const isSelected = selectedServiceId === s.id;

                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedServiceId(s.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                        isSelected
                          ? isNegative
                            ? 'bg-white/15 border-[#3D80FD] shadow-lg'
                            : 'bg-black/10 border-[#3D80FD] shadow-lg'
                          : isNegative
                          ? 'bg-white/5 border-white/10 hover:border-white/20'
                          : 'bg-black/5 border-black/10 hover:border-black/20'
                      }`}
                      style={{
                        borderLeftColor: s.luzColor,
                        borderLeftWidth: isSelected ? '4px' : '3px'
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-aeonik text-xs font-bold" style={{ color: s.luzColor }}>
                          {s.letter} · {s.name}
                        </span>
                        {isPub ? (
                          <span className="w-2 h-2 rounded-full bg-green-500" title="Público en la web" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-gray-400 opacity-50" title="Oculto" />
                        )}
                      </div>
                      <span className="text-[11px] opacity-60 block mt-1">
                        {mediaCount} {mediaCount === 1 ? 'recurso' : 'recursos'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 1.2 Service Portfolio Header Bar */}
            <div className={`p-6 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm ${
              isNegative ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
            }`}>
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-sm"
                  style={{ backgroundColor: selectedService.luzColor }}
                >
                  {selectedService.letter}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-aeonik font-bold">
                      {selectedService.fullServiceName}
                    </h2>
                    <span className="text-xs font-mono opacity-50">(/hma-{selectedService.id})</span>
                  </div>
                  <p className="text-xs opacity-70 mt-0.5">
                    {selectedService.tagline}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleTogglePortfolioPublish(selectedServiceId)}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer flex items-center gap-2 ${
                    selectedPortfolioConfig.isPublished
                      ? 'bg-green-500/20 text-green-500 border-green-500/40 hover:bg-green-500/30'
                      : 'bg-amber-500/20 text-amber-500 border-amber-500/40 hover:bg-amber-500/30'
                  }`}
                >
                  {selectedPortfolioConfig.isPublished ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Público en la Web</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4" />
                      <span>Desactivado (Oculto)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${
                    showAddForm ? 'bg-[#3D80FD] text-white' : isNegative ? 'bg-white/10' : 'bg-black/10'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{showAddForm ? 'Ocultar Formulario' : 'Añadir Recurso'}</span>
                </button>
              </div>
            </div>

            {/* 1.3 Add Resource Form Box */}
            {showAddForm && (
              <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 shadow-md ${
                isNegative ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
              }`}>
                <div className="flex items-center justify-between border-b border-inherit pb-4">
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#3D80FD]" />
                    <h3 className="font-aeonik font-bold text-lg">Añadir Nuevo Recurso Multimedia</h3>
                  </div>
                  <span className="text-xs opacity-60">Soporta YouTube, Audios MP3 e Imágenes</span>
                </div>

                {/* Form */}
                <form onSubmit={handleAddCustomMedia} className="space-y-6">
                  {/* Media Type Selector */}
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setNewMediaType('youtube')}
                      className={`p-3.5 rounded-2xl border text-center font-bold text-xs uppercase tracking-wider flex flex-col items-center gap-2 transition-all cursor-pointer ${
                        newMediaType === 'youtube'
                          ? 'bg-red-500/10 border-red-500 text-red-500 shadow-sm'
                          : isNegative ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                      }`}
                    >
                      <Video className="w-5 h-5" />
                      <span>Video YouTube</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setNewMediaType('audio')}
                      className={`p-3.5 rounded-2xl border text-center font-bold text-xs uppercase tracking-wider flex flex-col items-center gap-2 transition-all cursor-pointer ${
                        newMediaType === 'audio'
                          ? 'bg-blue-500/10 border-blue-500 text-blue-500 shadow-sm'
                          : isNegative ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                      }`}
                    >
                      <Music className="w-5 h-5" />
                      <span>Audio (MP3)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setNewMediaType('image')}
                      className={`p-3.5 rounded-2xl border text-center font-bold text-xs uppercase tracking-wider flex flex-col items-center gap-2 transition-all cursor-pointer ${
                        newMediaType === 'image'
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500 shadow-sm'
                          : isNegative ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                      }`}
                    >
                      <ImageIcon className="w-5 h-5" />
                      <span>Imagen (PNG/JPG)</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider opacity-60">Título o Etiqueta</label>
                      <input
                        type="text"
                        value={newMediaTitle}
                        onChange={(e) => setNewMediaTitle(e.target.value)}
                        placeholder="Ej: Himno Conmemorativo 2026 / Render Fachada"
                        className={`px-4 py-3 rounded-xl text-sm outline-none border transition-colors ${
                          isNegative ? 'bg-black/50 border-white/10 focus:border-[#3D80FD]' : 'bg-white border-black/10 focus:border-[#3D80FD]'
                        }`}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider opacity-60">
                        {newMediaType === 'youtube' ? 'Enlace de YouTube' : 'URL o Ruta del Archivo'}
                      </label>
                      <input
                        type="text"
                        value={newMediaUrl}
                        onChange={(e) => setNewMediaUrl(e.target.value)}
                        placeholder={
                          newMediaType === 'youtube'
                            ? 'https://www.youtube.com/watch?v=...'
                            : newMediaType === 'audio'
                            ? '/portfolio/melody/pista-01.mp3 o URL web'
                            : '/portfolio/architecture/render.png o URL web'
                        }
                        required
                        className={`px-4 py-3 rounded-xl text-sm outline-none border transition-colors ${
                          isNegative ? 'bg-black/50 border-white/10 focus:border-[#3D80FD]' : 'bg-white border-black/10 focus:border-[#3D80FD]'
                        }`}
                      />
                    </div>
                  </div>

                  {newMediaType === 'audio' && (
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider opacity-60">
                        Carátula / Portada del Audio (Opcional)
                      </label>
                      <input
                        type="text"
                        value={newMediaCover}
                        onChange={(e) => setNewMediaCover(e.target.value)}
                        placeholder="/portfolio/melody/cover.png o enlace de imagen"
                        className={`px-4 py-3 rounded-xl text-sm outline-none border transition-colors ${
                          isNegative ? 'bg-black/50 border-white/10 focus:border-[#3D80FD]' : 'bg-white border-black/10 focus:border-[#3D80FD]'
                        }`}
                      />
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-2xl font-bold uppercase tracking-wider text-xs bg-[#3D80FD] text-white hover:bg-blue-600 transition-colors shadow-md cursor-pointer flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Añadir al Portafolio de {selectedService.name}</span>
                    </button>
                  </div>
                </form>

                {/* Auto-detected files helper */}
                {serviceAutoFiles.length > 0 && (
                  <div className={`p-4 rounded-2xl border ${
                    isNegative ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-50 border-blue-500/20'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#3D80FD]">
                        Archivos locales detectados en /public/portfolio/{selectedService.id}/
                      </span>
                      <span className="text-[11px] opacity-60">Haz clic para integrar al portafolio</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {serviceAutoFiles.map(file => (
                        <button
                          key={file}
                          onClick={() => handleAddLocalAutoFile(file)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all cursor-pointer flex items-center gap-1.5 ${
                            isNegative ? 'bg-black/40 border-white/15 hover:border-white/30' : 'bg-white border-black/10 hover:border-black/25'
                          }`}
                          title="Integrar archivo al portafolio"
                        >
                          <Plus className="w-3 h-3 text-[#3D80FD]" />
                          <span>{file.split('/').pop()}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 1.4 Resource Inventory (Organized Gallery Grid) */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-inherit pb-4">
                <div>
                  <h3 className="font-aeonik font-bold text-xl">Recursos en Inventario ({activeMediaList.length})</h3>
                  <p className="text-xs opacity-60">
                    Administra, previsualiza y elimina los contenidos asignados a este servicio.
                  </p>
                </div>

                {/* Category Filter in Admin */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPortfolioFilter('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      portfolioFilter === 'all'
                        ? 'bg-[#3D80FD] text-white'
                        : isNegative ? 'bg-white/5 text-white/70' : 'bg-black/5 text-black/70'
                    }`}
                  >
                    Todos ({activeMediaList.length})
                  </button>

                  {countVideos > 0 && (
                    <button
                      onClick={() => setPortfolioFilter('youtube')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        portfolioFilter === 'youtube'
                          ? 'bg-red-500 text-white'
                          : isNegative ? 'bg-white/5 text-white/70' : 'bg-black/5 text-black/70'
                      }`}
                    >
                      Videos ({countVideos})
                    </button>
                  )}

                  {countAudios > 0 && (
                    <button
                      onClick={() => setPortfolioFilter('audio')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        portfolioFilter === 'audio'
                          ? 'bg-blue-500 text-white'
                          : isNegative ? 'bg-white/5 text-white/70' : 'bg-black/5 text-black/70'
                      }`}
                    >
                      Audios ({countAudios})
                    </button>
                  )}

                  {countImages > 0 && (
                    <button
                      onClick={() => setPortfolioFilter('image')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        portfolioFilter === 'image'
                          ? 'bg-emerald-500 text-white'
                          : isNegative ? 'bg-white/5 text-white/70' : 'bg-black/5 text-black/70'
                      }`}
                    >
                      Imágenes ({countImages})
                    </button>
                  )}
                </div>
              </div>

              {filteredAdminMedia.length === 0 ? (
                <div className={`p-12 rounded-3xl border text-center space-y-3 ${
                  isNegative ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
                }`}>
                  <FolderKanban className="w-10 h-10 mx-auto opacity-30 text-[#3D80FD]" />
                  <h4 className="font-bold text-base">No hay recursos en esta categoría</h4>
                  <p className="text-xs opacity-60 max-w-sm mx-auto">
                    Usa el formulario superior para añadir enlaces de YouTube, pistas de audio MP3 o imágenes de diseño.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAdminMedia.map(item => {
                    const thumb = item.type === 'youtube' ? getYouTubeThumbnail(item.url) : item.coverUrl || item.url;
                    return (
                      <div
                        key={item.id}
                        className={`flex flex-col rounded-3xl overflow-hidden border shadow-sm transition-all ${
                          isNegative ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-white border-black/10 hover:border-black/20'
                        }`}
                      >
                        {/* Thumbnail / Header */}
                        <div className="relative w-full aspect-video bg-black/30 overflow-hidden flex items-center justify-center">
                          {item.type === 'youtube' || item.type === 'image' || (item.type === 'audio' && item.coverUrl) ? (
                            <img src={thumb} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-500/20 text-blue-500">
                              <Music className="w-12 h-12" />
                            </div>
                          )}

                          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-white shadow-md ${
                            item.type === 'youtube' ? 'bg-red-600' : item.type === 'audio' ? 'bg-blue-600' : 'bg-emerald-600'
                          }`}>
                            {item.type === 'youtube' ? 'YouTube' : item.type === 'audio' ? 'MP3 Audio' : 'Imagen'}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                          <div className="space-y-1">
                            <h4 className="font-bold text-sm truncate">
                              {item.title || 'Recurso sin título'}
                            </h4>
                            <p className="font-mono text-xs opacity-50 truncate" title={item.url}>
                              {item.url}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-between border-t border-inherit pt-3">
                            <button
                              onClick={() => setPreviewMedia(item)}
                              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#3D80FD]/10 text-[#3D80FD] hover:bg-[#3D80FD]/20 transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Probar</span>
                            </button>

                            <button
                              onClick={() => handleRemoveCustomMedia(selectedServiceId, item.id)}
                              className="px-3 py-1.5 rounded-xl text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                              title="Eliminar recurso"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Eliminar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: CONFIGURACIÓN GENERAL */}
        {activeTab === 'config' && siteConfig && (
          <div className={`p-8 rounded-3xl shadow-xl space-y-8 ${
            isNegative ? 'bg-white/5 border border-white/10' : 'bg-white border border-black/10'
          }`}>
            <div className="flex items-center justify-between border-b border-inherit pb-4">
              <div>
                <h2 className="text-2xl font-aeonik font-bold">Configuración Global del Sitio</h2>
                <p className="text-xs opacity-60">Personaliza datos de contacto, visibilidad de módulos y textos principales.</p>
              </div>
              <button
                onClick={handleSaveConfig}
                className="px-6 py-2.5 rounded-2xl font-bold uppercase tracking-wider text-xs bg-[#3D80FD] text-white hover:bg-blue-600 transition-colors shadow-md cursor-pointer"
              >
                Guardar Cambios
              </button>
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-8">
              
              {/* CONTROL DE ANIMACIÓN DE FONDO DEL HERO PRINCIPAL (MOTION MATRIX v3.0) */}
              <div className={`p-6 sm:p-7 rounded-3xl border space-y-6 ${
                isNegative ? 'bg-white/5 border-white/10' : 'bg-blue-50/40 border-blue-500/20'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-inherit pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#3D80FD]" />
                      <h3 className="font-aeonik font-bold text-lg">Animación de Fondo del Hero Principal (Motion Matrix)</h3>
                    </div>
                    <p className="text-xs opacity-60">
                      Controla los orbes de luz dinámica, la cuadrícula de partículas, su opacidad y exporta el archivo HTML standalone.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Hidden input for HTML file selection */}
                    <input
                      type="file"
                      ref={htmlFileInputRef}
                      accept=".html,.htm"
                      onChange={handleImportMotionHtmlFile}
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={() => setShowImportHtmlModal(true)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                        isNegative ? 'border-white/15 bg-white/5 hover:bg-white/10' : 'border-black/15 bg-black/5 hover:bg-black/10'
                      }`}
                      title="Importar archivo HTML o código del Hero"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#3D80FD]" />
                      <span>Importar HTML</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleExportMotionHtml}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#3D80FD] text-white hover:bg-blue-600 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                      title="Descargar archivo HTML standalone"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Exportar HTML</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyMotionHtml}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                        isNegative ? 'border-white/15 hover:bg-white/10' : 'border-black/15 hover:bg-black/5'
                      }`}
                      title="Copiar código HTML al portapapeles"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Código</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleResetMotion}
                      className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                        isNegative ? 'border-white/15 hover:bg-white/10' : 'border-black/15 hover:bg-black/5'
                      }`}
                      title="Restablecer valores sugeridos"
                    >
                      <RotateCcw className="w-4 h-4 opacity-70" />
                    </button>
                  </div>
                </div>

                {/* Main Switch */}
                <div className="flex items-center justify-between p-4 rounded-2xl border bg-black/5 dark:bg-black/40 border-inherit">
                  <div>
                    <span className="font-bold text-sm block">Estado de la Animación en el Hero</span>
                    <span className="text-xs opacity-60">
                      {siteConfig.heroMotion?.enabled !== false ? 'Activa y visible en la sección de inicio.' : 'Oculta (fondo plano neutro).'}
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={siteConfig.heroMotion?.enabled !== false}
                      onChange={(e) =>
                        setSiteConfig({
                          ...siteConfig,
                          heroMotion: {
                            ...(siteConfig.heroMotion || {
                              intensity: 0.35,
                              speed: 1.0,
                              showDeepOrb: true,
                              showLightOrb: true,
                              showGridPattern: true
                            }),
                            enabled: e.target.checked
                          }
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3D80FD]"></div>
                  </label>
                </div>

                {/* Sub-controls when enabled */}
                {siteConfig.heroMotion?.enabled !== false && (
                  <div className="space-y-6 pt-2">
                    {/* Layer Toggles */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider opacity-60 block mb-3">
                        Capas Visibles de la Animación
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <label className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-colors ${
                          isNegative ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
                        }`}>
                          <input
                            type="checkbox"
                            checked={siteConfig.heroMotion?.showDeepOrb !== false}
                            onChange={(e) =>
                              setSiteConfig({
                                ...siteConfig,
                                heroMotion: {
                                  ...siteConfig.heroMotion,
                                  showDeepOrb: e.target.checked
                                }
                              })
                            }
                            className="w-4 h-4 accent-[#3D80FD]"
                          />
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold">Orbe Profundo</span>
                            <span className="text-[10px] font-mono opacity-60">#3D80FD</span>
                          </div>
                        </label>

                        <label className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-colors ${
                          isNegative ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
                        }`}>
                          <input
                            type="checkbox"
                            checked={siteConfig.heroMotion?.showLightOrb !== false}
                            onChange={(e) =>
                              setSiteConfig({
                                ...siteConfig,
                                heroMotion: {
                                  ...siteConfig.heroMotion,
                                  showLightOrb: e.target.checked
                                }
                              })
                            }
                            className="w-4 h-4 accent-[#052D63]"
                          />
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold">Orbe Luz</span>
                            <span className="text-[10px] font-mono opacity-60">#052D63</span>
                          </div>
                        </label>

                        <label className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-colors ${
                          isNegative ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
                        }`}>
                          <input
                            type="checkbox"
                            checked={siteConfig.heroMotion?.showGridPattern !== false}
                            onChange={(e) =>
                              setSiteConfig({
                                ...siteConfig,
                                heroMotion: {
                                  ...siteConfig.heroMotion,
                                  showGridPattern: e.target.checked
                                }
                              })
                            }
                            className="w-4 h-4 accent-[#3D80FD]"
                          />
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold">Cuadrícula Digital</span>
                            <span className="text-[10px] font-mono opacity-60">24x24 dots</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Sliders: Intensity & Speed */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold uppercase tracking-wider opacity-60">
                            Intensidad / Opacidad del Brillo
                          </label>
                          <span className="font-mono text-xs font-bold">
                            {Math.round((siteConfig.heroMotion?.intensity ?? 0.35) * 100)}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0.1"
                          max="1.0"
                          step="0.05"
                          value={siteConfig.heroMotion?.intensity ?? 0.35}
                          onChange={(e) =>
                            setSiteConfig({
                              ...siteConfig,
                              heroMotion: {
                                ...siteConfig.heroMotion,
                                intensity: parseFloat(e.target.value)
                              }
                            })
                          }
                          className="w-full accent-[#3D80FD] cursor-pointer"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold uppercase tracking-wider opacity-60">
                            Velocidad de Movimiento
                          </label>
                          <span className="font-mono text-xs font-bold">
                            {(siteConfig.heroMotion?.speed ?? 1.0).toFixed(1)}x
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0.5"
                          max="2.5"
                          step="0.25"
                          value={siteConfig.heroMotion?.speed ?? 1.0}
                          onChange={(e) =>
                            setSiteConfig({
                              ...siteConfig,
                              heroMotion: {
                                ...siteConfig.heroMotion,
                                speed: parseFloat(e.target.value)
                              }
                            })
                          }
                          className="w-full accent-[#3D80FD] cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Visibilidad de Secciones */}
              <div className="space-y-4">
                <h3 className="font-bold text-base">Visibilidad de Secciones en Home</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { key: 'showHero', label: 'Hero Principal' },
                    { key: 'showArchitecture', label: 'Arquitectura de la Luz' },
                    { key: 'showServices', label: 'Grilla de 12 Servicios' },
                    { key: 'showDifferentiators', label: 'Diferenciadores' },
                    { key: 'showTimeline', label: 'Línea de Tiempo' },
                    { key: 'showContact', label: 'Sección de Contacto' }
                  ].map(sec => (
                    <label key={sec.key} className={`p-4 rounded-2xl border flex items-center gap-3 cursor-pointer transition-colors ${
                      isNegative ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                    }`}>
                      <input
                        type="checkbox"
                        checked={siteConfig[sec.key as keyof typeof siteConfig] as boolean}
                        onChange={e => setSiteConfig({...siteConfig, [sec.key]: e.target.checked})}
                        className="w-4 h-4 accent-[#3D80FD]"
                      />
                      <span className="text-xs font-semibold">{sec.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Contacto & Socials */}
              <div className={`p-6 sm:p-7 rounded-3xl border space-y-5 ${
                isNegative ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
              }`}>
                <h3 className="font-aeonik font-bold text-lg border-b border-inherit pb-3">Módulo: Contacto & Redes (Canal Directo)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold opacity-60">Título Principal</label>
                    <input
                      type="text"
                      value={siteConfig.contactTitle || ''}
                      onChange={e => setSiteConfig({...siteConfig, contactTitle: e.target.value})}
                      placeholder="Ej. Iniciar Conversación con el Ecosistema"
                      className={`px-4 py-3 rounded-xl text-sm outline-none border ${isNegative ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold opacity-60">Descripción / Bajada</label>
                    <textarea
                      value={siteConfig.contactDescription || ''}
                      onChange={e => setSiteConfig({...siteConfig, contactDescription: e.target.value})}
                      placeholder="Texto descriptivo para el formulario..."
                      rows={2}
                      className={`px-4 py-3 rounded-xl text-sm outline-none border resize-none ${isNegative ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold opacity-60">Email de Contacto</label>
                    <input
                      type="email"
                      value={siteConfig.contactEmail || ''}
                      onChange={e => setSiteConfig({...siteConfig, contactEmail: e.target.value})}
                      className={`px-4 py-3 rounded-xl text-sm outline-none border ${isNegative ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold opacity-60">Teléfono / WhatsApp</label>
                    <input
                      type="text"
                      value={siteConfig.contactPhone || ''}
                      onChange={e => setSiteConfig({...siteConfig, contactPhone: e.target.value})}
                      className={`px-4 py-3 rounded-xl text-sm outline-none border ${isNegative ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold opacity-60">Enlace WhatsApp API</label>
                    <input
                      type="text"
                      value={siteConfig.socialWhatsapp || ''}
                      onChange={e => setSiteConfig({...siteConfig, socialWhatsapp: e.target.value})}
                      className={`px-4 py-3 rounded-xl text-sm outline-none border ${isNegative ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold opacity-60">Canal de YouTube</label>
                    <input
                      type="text"
                      value={siteConfig.socialYoutube || ''}
                      onChange={e => setSiteConfig({...siteConfig, socialYoutube: e.target.value})}
                      className={`px-4 py-3 rounded-xl text-sm outline-none border ${isNegative ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold opacity-60">Instagram Oficial</label>
                    <input
                      type="text"
                      value={siteConfig.socialInstagram || ''}
                      onChange={e => setSiteConfig({...siteConfig, socialInstagram: e.target.value})}
                      className={`px-4 py-3 rounded-xl text-sm outline-none border ${isNegative ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold opacity-60">Facebook Oficial</label>
                    <input
                      type="text"
                      value={siteConfig.socialFacebook || ''}
                      onChange={e => setSiteConfig({...siteConfig, socialFacebook: e.target.value})}
                      className={`px-4 py-3 rounded-xl text-sm outline-none border ${isNegative ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 pt-3 border-t border-inherit">
                  <label className="flex items-center gap-3 cursor-pointer pt-3">
                    <input
                      type="checkbox"
                      checked={siteConfig.showLocation || false}
                      onChange={(e) => setSiteConfig({ ...siteConfig, showLocation: e.target.checked })}
                      className="w-4 h-4 accent-[#3D80FD]"
                    />
                    <span className="text-sm font-semibold">Mostrar Ubicación Física</span>
                  </label>

                  {siteConfig.showLocation && (
                    <input
                      type="text"
                      value={siteConfig.locationAddress || ''}
                      onChange={(e) => setSiteConfig({ ...siteConfig, locationAddress: e.target.value })}
                      placeholder="Ej. Ciudad, País"
                      className={`flex-1 px-4 py-2 mt-2 sm:mt-0 rounded-xl text-sm outline-none border transition-colors ${
                        isNegative ? 'bg-black/50 border-white/10 focus:border-[#3D80FD]' : 'bg-white border-black/10 focus:border-[#3D80FD]'
                      }`}
                    />
                  )}
                </div>
              </div>

              {/* Hero Texts */}
              <div className="space-y-4 border-t border-inherit pt-6">
                <h3 className="font-bold text-base">Textos del Hero de Inicio</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold opacity-60">Título Hero</label>
                    <input
                      type="text"
                      value={siteConfig.heroTitle}
                      onChange={e => setSiteConfig({...siteConfig, heroTitle: e.target.value})}
                      className={`px-4 py-3 rounded-xl text-sm outline-none border ${isNegative ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold opacity-60">Palabra Destacada</label>
                    <input
                      type="text"
                      value={siteConfig.heroHighlight}
                      onChange={e => setSiteConfig({...siteConfig, heroHighlight: e.target.value})}
                      className={`px-4 py-3 rounded-xl text-sm outline-none border ${isNegative ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}
                    />
                  </div>

                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-xs font-bold opacity-60">Descripción Hero</label>
                    <textarea
                      value={siteConfig.heroDescription}
                      onChange={e => setSiteConfig({...siteConfig, heroDescription: e.target.value})}
                      className={`px-4 py-3 rounded-xl text-sm h-24 resize-none outline-none border ${isNegative ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}
                    />
                  </div>
                </div>
              </div>

              {/* Architecture Section */}
              <div className={`p-6 sm:p-7 rounded-3xl border space-y-5 ${
                isNegative ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
              }`}>
                <div className="flex items-center gap-2 border-b border-inherit pb-3">
                  <h3 className="font-aeonik font-bold text-lg">Módulo: Arquitectura de la Luz</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold opacity-60">Título Principal</label>
                    <input
                      type="text"
                      value={siteConfig.archTitle || ''}
                      onChange={e => setSiteConfig({...siteConfig, archTitle: e.target.value})}
                      placeholder="Ej. La Arquitectura de la Luz"
                      className={`px-4 py-3 rounded-xl text-sm outline-none border ${isNegative ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}
                    />
                  </div>

                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-xs font-bold opacity-60">Descripción / Párrafo</label>
                    <textarea
                      value={siteConfig.archDescription || ''}
                      onChange={e => setSiteConfig({...siteConfig, archDescription: e.target.value})}
                      placeholder="Texto explicativo sobre el origen del nombre..."
                      rows={4}
                      className={`px-4 py-3 rounded-xl text-sm outline-none border resize-none ${isNegative ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}
                    />
                  </div>
                </div>
              </div>

              {/* Services Section */}
              <div className={`p-6 sm:p-7 rounded-3xl border space-y-5 ${
                isNegative ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
              }`}>
                <div className="flex items-center gap-2 border-b border-inherit pb-3">
                  <h3 className="font-aeonik font-bold text-lg">Módulo: Ecosistema (Grilla de 12 Servicios)</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold opacity-60">Título Principal</label>
                    <input
                      type="text"
                      value={siteConfig.servicesTitle || ''}
                      onChange={e => setSiteConfig({...siteConfig, servicesTitle: e.target.value})}
                      placeholder="Ej. Las 12 Ramas de HMA"
                      className={`px-4 py-3 rounded-xl text-sm outline-none border ${isNegative ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}
                    />
                  </div>

                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-xs font-bold opacity-60">Descripción (Texto de fondo)</label>
                    <input
                      type="text"
                      value={siteConfig.servicesDescription || ''}
                      onChange={e => setSiteConfig({...siteConfig, servicesDescription: e.target.value})}
                      placeholder="Ej. Doce disciplinas creativas interconectadas..."
                      className={`px-4 py-3 rounded-xl text-sm outline-none border ${isNegative ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}
                    />
                  </div>
                </div>
              </div>

              {/* Differentiators Section */}
              <div className={`p-6 sm:p-7 rounded-3xl border space-y-5 ${
                isNegative ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
              }`}>
                <div className="flex items-center gap-2 border-b border-inherit pb-3">
                  <h3 className="font-aeonik font-bold text-lg">Módulo: Diferenciadores Estratégicos</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold opacity-60">Título Principal</label>
                    <input
                      type="text"
                      value={siteConfig.diffTitle || ''}
                      onChange={e => setSiteConfig({...siteConfig, diffTitle: e.target.value})}
                      placeholder="Ej. ¿Por qué el Ecosistema HMA?"
                      className={`px-4 py-3 rounded-xl text-sm outline-none border ${isNegative ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}
                    />
                  </div>

                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-xs font-bold opacity-60">Descripción Principal</label>
                    <textarea
                      value={siteConfig.diffDescription || ''}
                      onChange={e => setSiteConfig({...siteConfig, diffDescription: e.target.value})}
                      placeholder="Ej. Principios fundacionales..."
                      rows={2}
                      className={`px-4 py-3 rounded-xl text-sm outline-none border resize-none ${isNegative ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}
                    />
                  </div>
                </div>
              </div>

              {/* Timeline Texts */}
              <div className={`p-6 sm:p-7 rounded-3xl border space-y-5 ${
                isNegative ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
              }`}>
                <div className="flex items-center gap-2 border-b border-inherit pb-3">
                  <h3 className="font-aeonik font-bold text-lg">Módulo: Trayectoria (Heritage)</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold opacity-60">Título Principal</label>
                    <input
                      type="text"
                      value={siteConfig.timelineTitle || ''}
                      onChange={e => setSiteConfig({...siteConfig, timelineTitle: e.target.value})}
                      placeholder="Ej. Diez Años en la Luz (2016 — 2026)"
                      className={`px-4 py-3 rounded-xl text-sm outline-none border ${isNegative ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold opacity-60">Descripción General</label>
                    <textarea
                      value={siteConfig.timelineDescription || ''}
                      onChange={e => setSiteConfig({...siteConfig, timelineDescription: e.target.value})}
                      placeholder="Una década continua de geometría..."
                      rows={2}
                      className={`px-4 py-3 rounded-xl text-sm outline-none border resize-none ${isNegative ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}
                    />
                  </div>

                  <div className="md:col-span-2 flex flex-col sm:flex-row gap-5 pt-3 border-t border-inherit mt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={siteConfig.showTimelinePrinciple ?? true}
                        onChange={(e) => setSiteConfig({ ...siteConfig, showTimelinePrinciple: e.target.checked })}
                        className="w-4 h-4 accent-[#3D80FD]"
                      />
                      <span className="text-sm font-semibold">Mostrar Declaración de Principio (Mensaje de Fe)</span>
                    </label>
                  </div>

                  {siteConfig.showTimelinePrinciple && (
                    <>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold opacity-60">Título del Principio</label>
                        <input
                          type="text"
                          value={siteConfig.timelinePrincipleTitle || ''}
                          onChange={e => setSiteConfig({...siteConfig, timelinePrincipleTitle: e.target.value})}
                          placeholder="Declaración de Principio"
                          className={`px-4 py-3 rounded-xl text-sm outline-none border ${isNegative ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}
                        />
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold opacity-60">Cita / Mensaje Principal</label>
                        <input
                          type="text"
                          value={siteConfig.timelinePrincipleText || ''}
                          onChange={e => setSiteConfig({...siteConfig, timelinePrincipleText: e.target.value})}
                          placeholder='"La Creatividad es un Regalo de Dios."'
                          className={`px-4 py-3 rounded-xl text-sm outline-none border ${isNegative ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}
                        />
                      </div>

                      <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="text-xs font-bold opacity-60">Subtítulo / Contexto del Principio</label>
                        <input
                          type="text"
                          value={siteConfig.timelinePrincipleSub || ''}
                          onChange={e => setSiteConfig({...siteConfig, timelinePrincipleSub: e.target.value})}
                          placeholder="Base de fe, honestidad y respeto..."
                          className={`px-4 py-3 rounded-xl text-sm outline-none border ${isNegative ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}
                        />
                      </div>
                    </>
                  )}

                  <div className="md:col-span-2 flex flex-col sm:flex-row gap-5 pt-3 border-t border-inherit mt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={siteConfig.showTimelineAlert ?? true}
                        onChange={(e) => setSiteConfig({ ...siteConfig, showTimelineAlert: e.target.checked })}
                        className="w-4 h-4 accent-[#3D80FD]"
                      />
                      <span className="text-sm font-semibold">Mostrar Alerta de Fidelidad Vectorial</span>
                    </label>
                  </div>

                  {siteConfig.showTimelineAlert && (
                    <div className="md:col-span-2 flex flex-col gap-2">
                      <label className="text-xs font-bold opacity-60">Texto de la Alerta (Soporta HTML básico para negritas)</label>
                      <textarea
                        value={siteConfig.timelineAlertText || ''}
                        onChange={e => setSiteConfig({...siteConfig, timelineAlertText: e.target.value})}
                        placeholder="Todos los trazos vectoriales..."
                        rows={2}
                        className={`px-4 py-3 rounded-xl text-sm outline-none border resize-none ${isNegative ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-inherit">
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-2xl font-bold uppercase tracking-wider text-xs bg-[#3D80FD] text-white hover:bg-blue-600 transition-colors shadow-md cursor-pointer"
                >
                  Guardar Configuración
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: SOLICITUDES / INQUIRIES (FIREBASE FIRESTORE) */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-inherit pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-aeonik font-bold">Solicitudes y Clientes</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#3D80FD]/15 text-[#3D80FD]">
                    {inquiries.length} registradas
                  </span>
                </div>
                <p className="text-xs opacity-60 mt-0.5">
                  Mensajes y cotizaciones recibidas desde el formulario web en tiempo real a través de Cloud Firestore.
                </p>
              </div>

              {/* Status Filter Buttons */}
              <div className={`flex items-center p-1 rounded-2xl border text-xs font-semibold ${
                isNegative ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
              }`}>
                {(['all', 'nuevo', 'en_proceso', 'atendido', 'archivado'] as const).map((filterVal) => (
                  <button
                    key={filterVal}
                    onClick={() => setInquiryFilter(filterVal)}
                    className={`px-3 py-1.5 rounded-xl capitalize transition-colors cursor-pointer ${
                      inquiryFilter === filterVal
                        ? 'bg-[#3D80FD] text-white shadow-xs'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {filterVal === 'all' ? 'Todas' : filterVal.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiries Grid */}
            {inquiries.filter((inq) => inquiryFilter === 'all' || inq.status === inquiryFilter).length === 0 ? (
              <div className={`p-12 text-center rounded-3xl border space-y-3 ${
                isNegative ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
              }`}>
                <MessageSquare className="w-10 h-10 opacity-30 mx-auto" />
                <h3 className="font-bold text-base">No hay solicitudes en esta categoría</h3>
                <p className="text-xs opacity-60 max-w-sm mx-auto">
                  Las solicitudes enviadas desde la sección de contacto del sitio web aparecerán instantáneamente aquí.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {inquiries
                  .filter((inq) => inquiryFilter === 'all' || inq.status === inquiryFilter)
                  .map((inq) => {
                    const statusColor =
                      inq.status === 'nuevo'
                        ? 'bg-amber-500/15 text-amber-500 border-amber-500/30'
                        : inq.status === 'en_proceso'
                        ? 'bg-blue-500/15 text-blue-500 border-blue-500/30'
                        : inq.status === 'atendido'
                        ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
                        : 'bg-gray-500/15 text-gray-400 border-gray-500/30';

                    const formattedDate = inq.createdAt?.seconds
                      ? new Date(inq.createdAt.seconds * 1000).toLocaleString('es-NI', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : 'Reciente';

                    return (
                      <div
                        key={inq.id}
                        className={`p-6 rounded-3xl border flex flex-col justify-between gap-5 transition-all shadow-sm ${
                          isNegative ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-white border-black/10 hover:border-black/20'
                        }`}
                      >
                        <div className="space-y-4">
                          {/* Top Row: Name & Status */}
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-aeonik font-bold text-lg leading-tight">{inq.nombre}</h4>
                              {inq.organizacion && (
                                <p className="text-xs opacity-70 mt-0.5 font-medium">{inq.organizacion}</p>
                              )}
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColor}`}>
                              {inq.status.replace('_', ' ')}
                            </span>
                          </div>

                          {/* Service Tag */}
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-[#3D80FD]/10 text-[#3D80FD]">
                            <span>Disciplina:</span>
                            <span className="font-bold">{inq.servicio}</span>
                          </div>

                          {/* Message Body */}
                          <div className={`p-3.5 rounded-2xl text-xs leading-relaxed border ${
                            isNegative ? 'bg-black/40 border-white/5 text-white/90' : 'bg-black/5 border-black/5 text-black/90'
                          }`}>
                            <p className="whitespace-pre-wrap">{inq.mensaje}</p>
                          </div>

                          {/* Contact Methods */}
                          <div className="space-y-1.5 text-xs">
                            <a
                              href={`mailto:${inq.email}`}
                              className="flex items-center gap-2 opacity-80 hover:opacity-100 hover:text-[#3D80FD] transition-colors"
                            >
                              <Mail className="w-3.5 h-3.5 opacity-60" />
                              <span className="truncate">{inq.email}</span>
                            </a>
                            {inq.telefono && (
                              <a
                                href={`https://wa.me/${inq.telefono.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 opacity-80 hover:opacity-100 hover:text-emerald-500 transition-colors"
                              >
                                <Phone className="w-3.5 h-3.5 opacity-60" />
                                <span>{inq.telefono}</span>
                              </a>
                            )}
                            <div className="flex items-center gap-2 text-[11px] opacity-40 pt-1 font-mono">
                              <Clock className="w-3 h-3" />
                              <span>{formattedDate}</span>
                            </div>
                          </div>
                        </div>

                        {/* Card Actions: Status Update & Delete */}
                        <div className="pt-4 border-t border-inherit flex items-center justify-between gap-2">
                          <select
                            value={inq.status}
                            onChange={(e) => inq.id && handleUpdateInquiryStatus(inq.id, e.target.value as ContactInquiry['status'])}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border outline-none cursor-pointer ${
                              isNegative ? 'bg-black/60 border-white/15 text-white' : 'bg-white border-black/15 text-black'
                            }`}
                          >
                            <option value="nuevo">Nuevo</option>
                            <option value="en_proceso">En Proceso</option>
                            <option value="atendido">Atendido</option>
                            <option value="archivado">Archivado</option>
                          </select>

                          <div className="flex items-center gap-1.5">
                            <a
                              href={`mailto:${inq.email}?subject=Respuesta de HMA INLUMENAI&body=Hola ${inq.nombre},`}
                              className="p-2 rounded-xl border border-inherit hover:bg-[#3D80FD] hover:text-white transition-colors cursor-pointer"
                              title="Responder por correo"
                            >
                              <Mail className="w-4 h-4" />
                            </a>
                            {inq.id && (
                              <button
                                onClick={() => handleDeleteInquiry(inq.id!)}
                                className="p-2 rounded-xl text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-colors cursor-pointer"
                                title="Eliminar solicitud"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: BASE DE DATOS (JSON) */}
        {activeTab === 'data' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-inherit pb-4">
              <div>
                <h2 className="text-2xl font-aeonik font-bold">Gestor Maestro de Datos (JSON)</h2>
                <p className="text-xs opacity-60">Edita directamente la estructura de servicios y trayectoria histórica.</p>
              </div>
              <button
                onClick={handleSaveData}
                className="px-6 py-2.5 rounded-2xl font-bold uppercase tracking-wider text-xs bg-[#3D80FD] text-white hover:bg-blue-600 transition-colors shadow-md cursor-pointer"
              >
                Guardar Base de Datos
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={`p-6 rounded-3xl border space-y-3 ${
                isNegative ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">Servicios (JSON)</span>
                  <span className="text-[11px] opacity-60">12 Servicios Registrados</span>
                </div>
                <textarea
                  value={servicesJson}
                  onChange={(e) => setServicesJson(e.target.value)}
                  className={`w-full h-[450px] p-4 rounded-2xl font-mono text-xs outline-none resize-none border ${
                    isNegative ? 'bg-black/60 text-green-400 border-white/10' : 'bg-gray-50 text-green-700 border-black/10'
                  }`}
                  spellCheck="false"
                />
              </div>

              <div className={`p-6 rounded-3xl border space-y-3 ${
                isNegative ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">Trayectoria & Eras (JSON)</span>
                  <span className="text-[11px] opacity-60">2016 → 2026</span>
                </div>
                <textarea
                  value={erasJson}
                  onChange={(e) => setErasJson(e.target.value)}
                  className={`w-full h-[450px] p-4 rounded-2xl font-mono text-xs outline-none resize-none border ${
                    isNegative ? 'bg-black/60 text-green-400 border-white/10' : 'bg-gray-50 text-green-700 border-black/10'
                  }`}
                  spellCheck="false"
                />
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ADMIN LIVE PREVIEW MODAL */}
      {previewMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setPreviewMedia(null)}
        >
          <div
            className={`relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl flex flex-col border ${
              isNegative ? 'bg-[#060C04] border-white/15 text-[#FEFAE8]' : 'bg-white border-black/15 text-[#060C04]'
            }`}
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 flex items-center justify-between border-b border-inherit">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#3D80FD] text-white">
                  Previsualización Admin
                </span>
                <h4 className="font-bold text-sm truncate">{previewMedia.title || 'Recurso'}</h4>
              </div>
              <button
                onClick={() => setPreviewMedia(null)}
                className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-black/5 dark:bg-black/40 flex items-center justify-center">
              {previewMedia.type === 'youtube' && (
                <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                  {(() => {
                    const ytId = extractYouTubeId(previewMedia.url);
                    const embedUrl = ytId
                      ? `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`
                      : previewMedia.url;
                    return (
                      <iframe
                        src={embedUrl}
                        title={previewMedia.title || 'YouTube Player'}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    );
                  })()}
                </div>
              )}

              {previewMedia.type === 'audio' && (
                <div className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-black/60 border border-inherit shadow-lg flex flex-col items-center gap-4">
                  {previewMedia.coverUrl ? (
                    <img src={previewMedia.coverUrl} alt="Cover" className="w-40 h-40 rounded-2xl object-cover" />
                  ) : (
                    <div className="w-28 h-28 rounded-2xl bg-blue-500/20 flex items-center justify-center text-[#3D80FD]">
                      <Music className="w-12 h-12" />
                    </div>
                  )}
                  <h4 className="font-bold text-sm">{previewMedia.title || 'Pista de Audio'}</h4>
                  <audio controls autoPlay className="w-full h-10 outline-none">
                    <source src={previewMedia.url} type="audio/mpeg" />
                  </audio>
                </div>
              )}

              {previewMedia.type === 'image' && (
                <img
                  src={previewMedia.url}
                  alt={previewMedia.title}
                  className="max-h-[65vh] max-w-full rounded-xl object-contain shadow-2xl"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: IMPORTAR HTML PARA HERO MOTION MATRIX */}
      {showImportHtmlModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 ${
            isNegative ? 'bg-[#0A1208] border-white/15 text-[#FEFAE8]' : 'bg-white border-black/15 text-[#060C04]'
          }`}>
            {/* Modal Header */}
            <div className="p-6 border-b border-inherit flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#3D80FD]/10 text-[#3D80FD]">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-aeonik font-bold text-lg">Importar HTML para Hero Principal</h3>
                  <p className="text-xs opacity-60">Sube un archivo .html o pega código HTML del Motion Matrix</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowImportHtmlModal(false)}
                className="p-2 rounded-xl border border-inherit hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Option 1: File Upload */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider opacity-60 block">
                  Opción 1: Seleccionar archivo desde tu dispositivo
                </label>
                <div
                  onClick={() => htmlFileInputRef.current?.click()}
                  className={`p-6 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                    isNegative
                      ? 'border-white/20 hover:border-[#3D80FD] bg-white/5 hover:bg-white/10'
                      : 'border-black/20 hover:border-[#3D80FD] bg-black/5 hover:bg-black/10'
                  }`}
                >
                  <Upload className="w-8 h-8 text-[#3D80FD] opacity-80" />
                  <span className="text-sm font-semibold text-center">Haz clic para buscar archivo .html / .htm</span>
                  <span className="text-xs opacity-50">Soporta exportaciones directas de HMA Motion Matrix y variantes personalizadas</span>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-current opacity-10" />
                <span className="text-[11px] font-mono opacity-50 uppercase tracking-wider">O pega el código</span>
                <div className="flex-1 h-px bg-current opacity-10" />
              </div>

              {/* Option 2: Paste Raw HTML Code */}
              <form onSubmit={handleImportMotionHtmlText} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-60 block">
                    Opción 2: Pegar código HTML
                  </label>
                  <textarea
                    value={importHtmlText}
                    onChange={(e) => setImportHtmlText(e.target.value)}
                    placeholder="<!DOCTYPE html>&#10;<!-- Pega aquí el código HTML completo -->"
                    rows={6}
                    className={`w-full p-3.5 rounded-2xl text-xs font-mono outline-none border resize-none transition-colors ${
                      isNegative
                        ? 'bg-black/50 border-white/15 focus:border-[#3D80FD]'
                        : 'bg-black/5 border-black/15 focus:border-[#3D80FD]'
                    }`}
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowImportHtmlModal(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold border border-inherit hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={!importHtmlText.trim()}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#3D80FD] text-white hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Aplicar e Importar</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
