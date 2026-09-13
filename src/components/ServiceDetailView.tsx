import React, { useRef, useState, useEffect } from 'react';
import { ServiceItem } from '../types';
import { AnimatedIsotipo, AnimatedIsotipoRef } from './AnimatedIsotipo';
import { SERVICES } from '../data/brandData';
import { getPortfolioConfig, getSiteConfig, SiteConfig, PortfolioMedia, formatMatrixHtmlDoc } from '../utils/store';
import { subscribeSiteConfig } from '../lib/firebase';
import { getPortfolioFiles } from '../utils/portfolioRegistry';
import { MediaGallery } from './MediaGallery';
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
  RotateCcw,
  Share2
} from 'lucide-react';

interface ServiceDetailViewProps {
  service: ServiceItem;
  isNegative?: boolean;
  onBackToHome: () => void;
  onSelectOtherService: (serviceId: string) => void;
  onContactService: (serviceName: string) => void;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({
  service,
  isNegative = false,
  onBackToHome,
  onSelectOtherService,
  onContactService
}) => {
  const isotipoRef = useRef<AnimatedIsotipoRef>(null);
  const [hasTransformedToMaster, setHasTransformedToMaster] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [config, setConfig] = useState<SiteConfig | null>(null);

  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [autoFiles, setAutoFiles] = useState<string[]>([]);

  useEffect(() => {
    setConfig(getSiteConfig());
    const pConfig = getPortfolioConfig();
    setPortfolioData(pConfig[service.id] || null);
    
    const allFiles = getPortfolioFiles();
    setAutoFiles(allFiles.filter(f => f.includes(`/portfolio/${service.id}/`)));
    
    setHasTransformedToMaster(false);

    const unsub = subscribeSiteConfig((remoteConfig) => {
      if (remoteConfig) {
        setConfig(prev => ({ ...(prev || getSiteConfig()), ...remoteConfig }));
      }
    });

    return () => unsub();
  }, [service.id]);

  const useCustomMatrixHtml = Boolean(
    config?.applyMatrixHtmlToServices !== false && 
    config?.customMatrixHtml && 
    config.customMatrixHtml.trim().length > 0
  );

  const renderPortfolioSection = () => {
    if (!portfolioData?.isPublished) return null;
    
    const customMedia: PortfolioMedia[] = portfolioData.customMedia || [];
    const autoMedia: PortfolioMedia[] = autoFiles.map((file, idx) => {
      const isImg = file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.svg');
      const isAudio = file.endsWith('.mp3');
      const filename = file.split('/').pop()?.replace(/\.[^/.]+$/, '') || 'Recurso';
      return {
        id: `auto-${idx}-${file}`,
        type: isImg ? 'image' : isAudio ? 'audio' : 'image',
        url: file,
        title: filename
      };
    });

    const allMedia: PortfolioMedia[] = [...customMedia, ...autoMedia];
    
    if (allMedia.length === 0) return null;

    return (
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span
            className="font-general text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border inline-block"
            style={{
              color: service.luzColor,
              borderColor: `${service.luzColor}30`,
              backgroundColor: `${service.luzColor}10`
            }}
          >
            Portafolio & Recursos Oficiales
          </span>
          <h2 className="type-h2">Casos de Éxito & Muestras de Trabajo</h2>
          <p className="font-general text-sm opacity-70 max-w-xl mx-auto">
            Explora la producción multimedia y gráfica desarrollada bajo los estándares de {service.fullServiceName}.
          </p>
        </div>

        <MediaGallery
          items={allMedia}
          isNegative={isNegative}
          accentColor={service.luzColor}
          serviceName={service.fullServiceName}
        />
      </section>
    );
  };


  // Trigger transition (Servicio -> Maestro -> Retorno a Servicio)
  const handleTriggerMasterTransition = () => {
    setIsTransforming(true);
    if (isotipoRef.current) {
      isotipoRef.current.transitionToMaster();
    } else {
      setIsTransforming(false);
    }
  };

  const handleResetServiceIsotipo = () => {
    setIsTransforming(true);
    if (isotipoRef.current) {
      isotipoRef.current.resetToService();
    }
    setHasTransformedToMaster(false);
    setIsTransforming(false);
  };

  return (
    <div className="min-h-screen">
      {/* Top Breadcrumb Bar */}
      <div className="border-b transition-colors"
        style={{
          borderColor: isNegative ? 'rgba(254, 250, 232, 0.1)' : 'rgba(6, 12, 4, 0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-general font-semibold hover:text-[#3D80FD] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Ecosistema HMA</span>
          </button>

          <div className="flex items-center gap-3 text-xs font-general opacity-60">
            <span>Servicio {service.index} de 12</span>
            <span>·</span>
            <span>Letra "{service.letter}"</span>
          </div>
        </div>
      </div>

      {/* Hero Section — Subpalette protagonista permitida */}
      <section
        className="relative py-16 lg:py-24 border-b overflow-hidden transition-colors"
        style={{
          backgroundColor: isNegative ? `${service.profundoColor}35` : `${service.luzColor}15`,
          borderColor: isNegative ? 'rgba(254, 250, 232, 0.1)' : 'rgba(6, 12, 4, 0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Service Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="px-3 py-1 rounded-full text-xs font-general font-bold uppercase tracking-wider text-white shadow-xs notranslate"
                  style={{ backgroundColor: service.luzColor }}
                  translate="no"
                >
                  Letra {service.letter} · HMAINLUMENAI
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-general font-medium border"
                  style={{
                    borderColor: isNegative ? 'rgba(254, 250, 232, 0.2)' : 'rgba(6, 12, 4, 0.15)',
                    color: isNegative ? '#FEFAE8' : '#060C04'
                  }}
                >
                  {service.cluster}
                </span>
              </div>

              {/* Service Display Title */}
              <div>
                <h1 className="type-display notranslate" style={{ color: service.luzColor }} translate="no">
                  {service.fullServiceName}
                </h1>
                <h2 className="type-h2 mt-2 opacity-90">
                  {service.tagline}
                </h2>
              </div>

              {/* Detailed Description */}
              <p className={`type-body text-lg leading-relaxed ${
                isNegative ? 'text-[#FEFAE8]/85' : 'text-[#060C04]/85'
              }`}>
                {service.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => onContactService(service.name)}
                  className="btn-primary btn-lg text-white shadow-md cursor-pointer flex items-center gap-2"
                  style={{ backgroundColor: service.luzColor }}
                >
                  <span>Solicitar Servicio <span className="notranslate" translate="no">{service.name}</span></span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* The Mandatory Interactive Service -> Master Transition CTA */}
                <button
                  onClick={handleTriggerMasterTransition}
                  disabled={isTransforming}
                  className={`btn-primary btn-lg border flex items-center gap-2 cursor-pointer transition-all ${
                    hasTransformedToMaster
                      ? 'bg-[#3D80FD]/15 border-[#3D80FD] text-[#3D80FD] hover:bg-[#3D80FD]/25'
                      : isNegative
                      ? 'border-[#FEFAE8]/30 hover:bg-[#FEFAE8]/10'
                      : 'border-[#060C04]/20 hover:bg-[#060C04]/5'
                  }`}
                  title={
                    hasTransformedToMaster
                      ? 'Repetir la animación de cómo pasa del isotipo de servicio al Isotipo Maestro'
                      : 'Transformar isotipo hacia el Isotipo Maestro HMA'
                  }
                >
                  {isTransforming ? (
                    <Sparkles className="w-4 h-4 text-[#3D80FD] animate-spin" />
                  ) : (
                    <Layers className="w-4 h-4 text-[#3D80FD]" />
                  )}
                  <span>
                    {isTransforming
                      ? 'Metamorfoseando...'
                      : hasTransformedToMaster
                      ? 'Repetir Transición al Maestro'
                      : 'Integrar con Marca Matrix'}
                  </span>
                </button>

                {hasTransformedToMaster && (
                  <button
                    onClick={handleResetServiceIsotipo}
                    disabled={isTransforming}
                    className={`btn-primary btn-lg border flex items-center gap-2 cursor-pointer transition-all ${
                      isNegative
                        ? 'border-[#FEFAE8]/30 hover:bg-[#FEFAE8]/10 text-[#FEFAE8]'
                        : 'border-[#060C04]/20 hover:bg-[#060C04]/5 text-[#060C04]'
                    }`}
                    title={`Volver al isotipo original de ${service.name}`}
                  >
                    <RotateCcw className="w-4 h-4 text-inherit" />
                    <span>Volver a {service.name}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right: The Live Animated Isotipo Canvas */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div
                className={`w-full max-w-[460px] flex flex-col items-center justify-center transition-all ${
                  config?.showIsotipoContainer
                    ? isNegative
                      ? 'p-8 rounded-3xl border bg-[#060C04]/80 border-[#FEFAE8]/15 shadow-2xl'
                      : 'p-8 rounded-3xl border bg-white border-[#060C04]/10 shadow-lg'
                    : 'p-0 bg-transparent'
                }`}
              >
                <div className="w-full aspect-square flex items-center justify-center">
                  <AnimatedIsotipo
                    ref={isotipoRef}
                    shapes={service.shapes}
                    serviceId={`service-${service.id}`}
                    isServiceView={true}
                    isNegative={isNegative}
                    allowReplay={true}
                    onTransitionComplete={() => {
                      setIsTransforming(false);
                      setHasTransformedToMaster(true);
                    }}
                  />
                </div>

                {/* Interactive Status Indicator */}
                <div className="mt-3 text-center space-y-1">
                  <p className="font-general text-xs font-semibold tracking-wide uppercase" style={{ color: isTransforming ? '#3D80FD' : service.luzColor }}>
                    {isTransforming
                      ? 'Transición Activa: Servicio ➔ Maestro ➔ Servicio'
                      : `Isotipo ${service.name} (Consolidado)`}
                  </p>
                  <p className="font-general text-[11px] opacity-60">
                    {isTransforming
                      ? 'Metamorfosis GSAP entre las 13 formas geométricas oficiales'
                      : `Subpaleta cerrada: ${service.luzColor} / ${service.profundoColor}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {renderPortfolioSection()}

      {/* Deliverables & Capabilities Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          {/* Deliverables */}
          <div className={`p-8 sm:p-10 rounded-2xl border space-y-6 ${
            isNegative ? 'bg-[#060C04] border-[#FEFAE8]/10' : 'bg-white border-[#060C04]/8 shadow-sm'
          }`}>
            <div>
              <span className="font-general text-xs font-bold uppercase tracking-wider text-[#3D80FD]">
                Entregables Clave
              </span>
              <h3 className="type-h3 mt-1">Qué incluye el servicio</h3>
            </div>

            <ul className="space-y-4">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3.5">
                  <CheckCircle2
                    className="w-5 h-5 shrink-0 mt-0.5"
                    style={{ color: service.luzColor }}
                  />
                  <span className={`font-general text-sm leading-relaxed ${
                    isNegative ? 'text-[#FEFAE8]/80' : 'text-[#060C04]/80'
                  }`}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Capabilities */}
          <div className={`p-8 sm:p-10 rounded-2xl border space-y-6 ${
            isNegative ? 'bg-[#060C04] border-[#FEFAE8]/10' : 'bg-white border-[#060C04]/8 shadow-sm'
          }`}>
            <div>
              <span className="font-general text-xs font-bold uppercase tracking-wider text-[#3D80FD]">
                Estándares de Calidad
              </span>
              <h3 className="type-h3 mt-1">Capacidades y metodología</h3>
            </div>

            <ul className="space-y-4">
              {service.capabilities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3.5">
                  <div
                    className="w-2 h-2 rounded-full shrink-0 mt-2"
                    style={{ backgroundColor: service.luzColor }}
                  />
                  <span className={`font-general text-sm leading-relaxed ${
                    isNegative ? 'text-[#FEFAE8]/80' : 'text-[#060C04]/80'
                  }`}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dedicated Interactive Master Transition Banner (Section 5.3 mandate) */}
        <div
          className="p-8 sm:p-12 rounded-3xl border text-center space-y-6 relative overflow-hidden"
          style={{
            backgroundColor: isNegative ? 'rgba(6, 12, 4, 0.8)' : 'rgba(255, 255, 255, 0.9)',
            borderColor: service.luzColor
          }}
        >
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="font-general text-xs font-bold tracking-widest uppercase text-[#3D80FD]">
              Cohesión del Ecosistema HMA
            </span>
            <h3 className="type-h2">
              ¿Listo para integrar {service.name} con las demás disciplinas?
            </h3>
            <p className={`type-body text-sm ${isNegative ? 'text-[#FEFAE8]/75' : 'text-[#060C04]/75'}`}>
              Una sola marca matriz significa que tu identidad visual, tu música con IA, tu sitio web y tus productos personalizados comparten los mismos códigos y estándares sin fricción.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
            <button
              onClick={handleTriggerMasterTransition}
              disabled={isTransforming || hasTransformedToMaster}
              className="btn-primary btn-lg bg-[#3D80FD] text-white hover:bg-[#2D60C1] shadow-md cursor-pointer flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>
                {hasTransformedToMaster
                  ? 'Isotipo Maestro Consolidado'
                  : 'Volver al Ecosistema HMA (Transición en Vivo)'}
              </span>
            </button>
            {config?.enableInquiries !== false && !config?.disabledServicesInquiries?.includes(service.id) && (
              <button
                onClick={() => onContactService(service.name)}
                className={`btn-primary btn-lg border cursor-pointer ${
                  isNegative ? 'border-[#FEFAE8]/20 hover:bg-[#FEFAE8]/10' : 'border-[#060C04]/20 hover:bg-[#060C04]/5'
                }`}
              >
                <span>Consultar Tarifas & Alcance</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Navigation to Other 11 Services */}
        <div className="pt-8 border-t border-current/10 space-y-6 text-left">
          <div className="flex items-center justify-between">
            <h4 className="font-dosis text-xl font-bold">
              Explorar otros servicios del ecosistema
            </h4>
            <span className="text-xs opacity-60 font-general">
              12 especialidades bajo HMAINLUMENAI
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {SERVICES.filter(s => s.id !== service.id).map(s => (
              <button
                key={s.id}
                onClick={() => onSelectOtherService(s.id)}
                className={`p-3.5 rounded-xl border text-left transition-all hover:scale-102 cursor-pointer notranslate ${
                  isNegative
                    ? 'bg-[#060C04] border-[#FEFAE8]/10 hover:border-[#FEFAE8]/30'
                    : 'bg-white border-[#060C04]/8 hover:border-[#060C04]/20 shadow-xs'
                }`}
                style={{
                  borderLeftColor: s.luzColor,
                  borderLeftWidth: '3px'
                }}
                translate="no"
              >
                <div className="font-aeonik text-sm font-bold" style={{ color: s.luzColor }}>
                  {s.letter} · {s.name}
                </div>
                <div className="font-general text-[11px] opacity-60 truncate mt-1">
                  {s.tagline}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
