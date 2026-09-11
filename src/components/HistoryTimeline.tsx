import React, { useState, useEffect } from 'react';
import { EVOLUTION_ERAS, EvolutionEra } from '../data/evolutionEras';
import { RenderHLogo } from './HLogos';
import { RenderHMALogo } from './HMALogos';
import { getSiteConfig } from '../utils/store';
import {
  History,
  HeartHandshake,
  Milestone,
  Layers,
  ZoomIn,
  X,
  ChevronRight,
  CheckCircle2,
  Clock,
  List,
  Play,
  Pause,
  ChevronLeft
} from 'lucide-react';

interface HistoryTimelineProps {
  isNegative?: boolean;
  isFullView?: boolean;
  onNavigateHeritage?: () => void;
}

type DisplayFilter = 'all' | 'decade' | 'projection';
type LogoViewMode = 'duo' | 'h' | 'hma';
type LayoutMode = 'clock' | 'linear';

export const HistoryTimeline: React.FC<HistoryTimelineProps> = ({
  isNegative = false,
  isFullView = false,
  onNavigateHeritage
}) => {
  const config = getSiteConfig();
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('clock');
  const [viewMode, setViewMode] = useState<LogoViewMode>('duo');
  const [filter, setFilter] = useState<DisplayFilter>('all');
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  
  // Clock state
  const [clockHour, setClockHour] = useState<number>(12); // Defaults to 12 (2027)
  const [isPlaying, setIsPlaying] = useState(false);

  const [modalEra, setModalEra] = useState<EvolutionEra | null>(null);
  const [modalBg, setModalBg] = useState<'obsidian' | 'black' | 'light'>('obsidian');

  const isProjection = (era: EvolutionEra) => era.year === '2027' || Boolean(era.isProjection);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setClockHour((prev) => prev === 12 ? 1 : prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handlePrevHour = () => {
    setClockHour(prev => prev === 1 ? 12 : prev - 1);
    setIsPlaying(false);
  };

  const handleNextHour = () => {
    setClockHour(prev => prev === 12 ? 1 : prev + 1);
    setIsPlaying(false);
  };

  const filteredEras = EVOLUTION_ERAS.filter((era) => {
    if (filter === 'decade') return Number(era.year) <= 2026;
    if (filter === 'projection') return isProjection(era);
    if (selectedYear !== null) return era.year === selectedYear;
    return true;
  });

  return (
    <section
      id="trayectoria"
      className="py-20 border-t transition-colors relative"
      style={{
        borderColor: isNegative ? 'rgba(254, 250, 232, 0.08)' : 'rgba(6, 12, 4, 0.08)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-general font-bold text-[#315629] bg-[#315629]/10 border border-[#315629]/20">
              <History className="w-3.5 h-3.5 text-[#75C962]" />
              <span className="tracking-wider uppercase">HERITAGE · DIEZ AÑOS EN LA LUZ (2016 → 2026)</span>
            </div>

            <h2 className="type-h2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {config.timelineTitle || 'Diez Años en la Luz (2016 — 2026)'}
            </h2>

            <p className={`type-body text-base sm:text-lg ${isNegative ? 'text-[#FEFAE8]/80' : 'text-[#060C04]/80'}`}>
              <span dangerouslySetInnerHTML={{ __html: (config.timelineDescription || 'Una década continua de geometría, propósito y evolución gráfica. Cada año articula de forma coherente su Monograma H con su Isotipo HMA complementario (2016 hasta 2026, proyectando 2027).').replace('Monograma H', '<strong class="text-[#3D80FD] font-semibold">Monograma H</strong>').replace('Isotipo HMA', '<strong class="text-[#75C962] font-semibold">Isotipo HMA</strong>') }} />
            </p>
          </div>

          {/* Reserved Faith Statement (Heritage Section 10) */}
          {config.showTimelinePrinciple && (
            <div
              className={`p-5 rounded-2xl border text-left max-w-md shrink-0 ${
                isNegative
                  ? 'bg-[#315629]/15 border-[#315629]/30 text-[#FEFAE8]'
                  : 'bg-[#315629]/8 border-[#315629]/20 text-[#1B3315]'
              }`}
            >
              <div className="flex items-center gap-2 text-[#75C962] mb-1.5">
                <HeartHandshake className="w-4 h-4" />
                <span className="font-general text-[11px] font-bold tracking-wider uppercase">
                  {config.timelinePrincipleTitle || 'Declaración de Principio'}
                </span>
              </div>
              <p className="font-newsreader italic text-lg leading-snug">
                {config.timelinePrincipleText || '"La Creatividad es un Regalo de Dios."'}
              </p>
              <p className="font-general text-[11px] opacity-75 mt-1">
                {config.timelinePrincipleSub || 'Base de fe, honestidad y respeto que preserva la memoria viva de la marca.'}
              </p>
            </div>
          )}
        </div>

        {/* Layout Mode Switcher */}
        <div className="flex justify-center my-12">
          <div className={`inline-flex items-center p-1 rounded-full border shadow-sm ${
            isNegative ? 'bg-[#060C04] border-[#FEFAE8]/20' : 'bg-white border-[#060C04]/10'
          }`}>
            <button
              onClick={() => setLayoutMode('clock')}
              className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-sm font-general font-bold transition-all cursor-pointer flex items-center gap-2 ${
                layoutMode === 'clock'
                  ? (isNegative ? 'bg-[#FEFAE8] text-[#060C04]' : 'bg-[#060C04] text-white')
                  : (isNegative ? 'text-[#FEFAE8]/70 hover:bg-[#FEFAE8]/10' : 'text-[#060C04]/70 hover:bg-black/5')
              }`}
            >
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Dial de Reloj Interactivo</span>
              <span className="sm:hidden">Reloj</span>
            </button>
            <button
              onClick={() => setLayoutMode('linear')}
              className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-sm font-general font-bold transition-all cursor-pointer flex items-center gap-2 ${
                layoutMode === 'linear'
                  ? (isNegative ? 'bg-[#FEFAE8] text-[#060C04]' : 'bg-[#060C04] text-white')
                  : (isNegative ? 'text-[#FEFAE8]/70 hover:bg-[#FEFAE8]/10' : 'text-[#060C04]/70 hover:bg-black/5')
              }`}
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Línea de Tiempo Lineal (2016–2026)</span>
              <span className="sm:hidden">Lineal</span>
            </button>
          </div>
        </div>

        {/* Dynamic View Rendering */}
        <div className="animate-fadeIn">
          {layoutMode === 'clock' ? (
            /* --- CLOCK VIEW --- */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-16 items-center mt-12 mb-24">
              {/* Left side: Clock Dial */}
              <div className="relative w-full max-w-[400px] mx-auto aspect-square flex flex-col items-center justify-center">
                {/* Dial Backgrounds */}
                <div className="absolute inset-0 rounded-full border-[12px] border-amber-300/30 bg-amber-50/40 shadow-inner" />
                <div className="absolute inset-4 rounded-full border border-black/5" />
                <div className="absolute inset-10 rounded-full border border-black/5 border-dashed" />
                
                {/* Center Pivot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#060C04] rounded-full flex items-center justify-center z-20 shadow-md">
                  <div className="w-3 h-3 bg-amber-400 rounded-full" />
                </div>

                {/* The Hand */}
                <div 
                  className="absolute top-1/2 left-1/2 w-[6px] bg-[#060C04] rounded-full origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10"
                  style={{
                    height: '35%',
                    transform: `translate(-50%, -100%) rotate(${clockHour * 30}deg)`,
                  }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#060C04] rounded-full" />
                </div>
                
                {/* Hour Nodes */}
                {EVOLUTION_ERAS.map((era, i) => {
                  const hour = i + 1;
                  const angle = (hour * 30 - 90) * (Math.PI / 180);
                  const radius = 42; 
                  const x = 50 + radius * Math.cos(angle);
                  const y = 50 + radius * Math.sin(angle);
                  const isActive = clockHour === hour;

                  return (
                    <button
                      key={hour}
                      onClick={() => { setClockHour(hour); setIsPlaying(false); }}
                      className={`absolute w-14 h-14 -ml-7 -mt-7 rounded-full flex flex-col items-center justify-center transition-all duration-300 ease-out cursor-pointer z-20 ${
                        isActive
                          ? 'bg-[#060C04] text-white shadow-xl scale-[1.15] ring-4 ring-amber-500/40'
                          : 'bg-white text-[#060C04] border border-[#060C04]/10 hover:border-[#060C04]/30 hover:scale-105 shadow-sm'
                      }`}
                      style={{ left: `${x}%`, top: `${y}%` }}
                    >
                      <span className={`text-lg font-bold font-aeonik leading-none ${isActive ? 'text-amber-400' : 'text-[#060C04]'}`}>
                        {hour}
                      </span>
                      <span className={`text-[10px] font-general leading-none mt-1 ${isActive ? 'text-white/70' : 'text-[#060C04]/50'}`}>
                        '{era.yearCode}
                      </span>
                    </button>
                  );
                })}

                {/* Bottom Controls inside Clock area */}
                <div className="absolute -bottom-20 left-0 right-0 flex items-center justify-center gap-4">
                  <button onClick={handlePrevHour} className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                    isNegative ? 'bg-[#060C04] border-[#FEFAE8]/20 hover:bg-[#FEFAE8]/10 text-[#FEFAE8]' : 'bg-white border-[#060C04]/10 hover:bg-black/5 text-[#060C04]'
                  }`}>
                    <ChevronLeft className="w-5 h-5 opacity-70" />
                  </button>
                  
                  <button onClick={() => setIsPlaying(!isPlaying)} className={`px-5 py-3 rounded-full border flex items-center gap-2 transition-colors font-general text-sm font-bold cursor-pointer shadow-sm ${
                    isNegative ? 'bg-[#060C04] border-[#FEFAE8]/20 hover:bg-[#FEFAE8]/10 text-[#FEFAE8]' : 'bg-white border-[#060C04]/10 hover:bg-black/5 text-[#060C04]'
                  }`}>
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? 'Pausar' : 'Recorrido Automático'}
                  </button>
                  
                  <button onClick={handleNextHour} className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                    isNegative ? 'bg-[#060C04] border-[#FEFAE8]/20 hover:bg-[#FEFAE8]/10 text-[#FEFAE8]' : 'bg-white border-[#060C04]/10 hover:bg-black/5 text-[#060C04]'
                  }`}>
                    <ChevronRight className="w-5 h-5 opacity-70" />
                  </button>
                </div>
              </div>

              {/* Right side: Era Data */}
              <div className={`p-8 md:p-10 rounded-[2rem] border relative min-h-[520px] flex flex-col justify-between transition-all duration-300 text-left ${
                isNegative 
                  ? 'bg-[#060C04] border-[#FEFAE8]/10 text-[#FEFAE8]' 
                  : 'bg-white border-amber-300/40 text-[#060C04] shadow-xl'
              }`}>
                {(() => {
                  const activeEra = EVOLUTION_ERAS[clockHour - 1];
                  if (!activeEra) return null;
                  
                  return (
                    <>
                      <div>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-lg bg-amber-500 text-[#060C04] font-aeonik font-bold text-sm">
                              {clockHour}:00
                            </span>
                            <h3 className="text-2xl md:text-3xl font-aeonik font-bold">Año {activeEra.year}</h3>
                          </div>
                          {isProjection(activeEra) && (
                            <span className="px-3 py-1 rounded-full text-xs font-general font-bold bg-[#11D7B6]/10 text-[#0A826E] border border-[#11D7B6]/20">
                              La Nueva Era
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h4 className="text-3xl md:text-4xl font-dosis font-bold mb-6 tracking-tight">
                          {activeEra.title || activeEra.concept}
                        </h4>

                        {/* Description */}
                        <p className="text-base font-general opacity-80 leading-relaxed mb-6">
                          {activeEra.description}
                        </p>

                        {/* Showcase de Isotipos H y HMA en Color Negro sin fondo negro */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-general font-bold uppercase tracking-wider opacity-60">
                              Isotipos {activeEra.yearCode} & {activeEra.yearCode.replace('H', 'HMA')} ({activeEra.year})
                            </span>
                            <button
                              type="button"
                              onClick={() => setModalEra(activeEra)}
                              className={`text-xs font-general font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                                isNegative ? 'text-[#3D80FD] hover:text-white' : 'text-[#2D60C1] hover:text-[#3D80FD]'
                              }`}
                            >
                              <ZoomIn className="w-3.5 h-3.5" />
                              <span>Inspeccionar vector</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            {/* Monograma H */}
                            <div
                              onClick={() => setModalEra(activeEra)}
                              className={`group p-4 rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-between h-44 ${
                                isNegative
                                  ? 'bg-white/5 border-white/10 hover:border-white/20'
                                  : 'bg-[#FEFAE8]/80 border-[#060C04]/10 hover:border-[#060C04]/25 shadow-xs'
                              }`}
                            >
                              <div className="w-full flex-1 flex items-center justify-center p-2">
                                <RenderHLogo
                                  yearCode={activeEra.yearCode}
                                  fillColor={isNegative ? '#FEFAE8' : '#060C04'}
                                  className="w-full h-full max-h-24 object-contain transition-transform group-hover:scale-105"
                                />
                              </div>
                              <div className="text-center pt-2 border-t border-current/10 w-full">
                                <p className={`text-xs font-aeonik font-bold ${isNegative ? 'text-white' : 'text-[#060C04]'}`}>
                                  Monograma {activeEra.yearCode}
                                </p>
                                <span className="text-[10px] font-general opacity-50">Símbolo Central</span>
                              </div>
                            </div>

                            {/* Isotipo HMA */}
                            <div
                              onClick={() => setModalEra(activeEra)}
                              className={`group p-4 rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-between h-44 ${
                                isNegative
                                  ? 'bg-white/5 border-white/10 hover:border-white/20'
                                  : 'bg-[#FEFAE8]/80 border-[#060C04]/10 hover:border-[#060C04]/25 shadow-xs'
                              }`}
                            >
                              <div className="w-full flex-1 flex items-center justify-center p-2">
                                <RenderHMALogo
                                  hmaCode={activeEra.yearCode}
                                  fillColor={isNegative ? '#FEFAE8' : '#060C04'}
                                  className="w-full h-full max-h-24 object-contain transition-transform group-hover:scale-105"
                                />
                              </div>
                              <div className="text-center pt-2 border-t border-current/10 w-full">
                                <p className={`text-xs font-aeonik font-bold ${isNegative ? 'text-white' : 'text-[#060C04]'}`}>
                                  Isotipo {activeEra.yearCode.replace('H', 'HMA')}
                                </p>
                                <span className="text-[10px] font-general opacity-50">Identidad Corporativa</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Milestones / Metadata list */}
                        <div className="space-y-2.5 mb-6">
                          <h5 className="text-xs font-general font-bold uppercase tracking-widest opacity-50 mb-3">
                            Hitos principales de esta hora
                          </h5>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                            <p className="text-sm font-general opacity-80">{activeEra.meaning || activeEra.continuity}</p>
                          </div>
                          {activeEra.geometry && (
                            <div className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                              <p className="text-sm font-general opacity-80">Geometría: {activeEra.geometry}</p>
                            </div>
                          )}
                          {activeEra.brandName && (
                            <div className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                              <p className="text-sm font-general opacity-80">Evolución de Marca: {activeEra.brandName}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-6 border-t border-current/10">
                        <span className="text-xs font-general opacity-50">Hora {clockHour} de 12</span>
                        <button onClick={() => setModalEra(activeEra)} className="text-sm font-general font-bold text-[#3D80FD] hover:text-[#2D60C1] transition-colors flex items-center gap-1 cursor-pointer">
                          Ver vector & servicios <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          ) : (
            /* --- LINEAR VIEW --- */
            <div className="space-y-8">
              {/* Interactive Controls Bar: View Mode & Year Filter */}
              <div
                className={`p-4 sm:p-6 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  isNegative ? 'bg-[#060C04]/70 border-[#FEFAE8]/10' : 'bg-white border-[#060C04]/10 shadow-xs'
                }`}
              >
                {/* View Mode Selector */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-general font-bold uppercase tracking-wider opacity-60 mr-1 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#3D80FD]" />
                    Vista:
                  </span>
                  <button
                    onClick={() => setViewMode('duo')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-general font-semibold transition-all cursor-pointer ${
                      viewMode === 'duo'
                        ? 'bg-[#3D80FD] text-white shadow-sm'
                        : isNegative
                        ? 'bg-[#FEFAE8]/5 text-[#FEFAE8]/70 hover:bg-[#FEFAE8]/10'
                        : 'bg-[#060C04]/5 text-[#060C04]/70 hover:bg-[#060C04]/10'
                    }`}
                  >
                    Dúo Coherente (H & HMA)
                  </button>
                  <button
                    onClick={() => setViewMode('h')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-general font-semibold transition-all cursor-pointer ${
                      viewMode === 'h'
                        ? 'bg-[#315629] text-white shadow-sm'
                        : isNegative
                        ? 'bg-[#FEFAE8]/5 text-[#FEFAE8]/70 hover:bg-[#FEFAE8]/10'
                        : 'bg-[#060C04]/5 text-[#060C04]/70 hover:bg-[#060C04]/10'
                    }`}
                  >
                    Solo Monograma H
                  </button>
                  <button
                    onClick={() => setViewMode('hma')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-general font-semibold transition-all cursor-pointer ${
                      viewMode === 'hma'
                        ? 'bg-[#315629] text-white shadow-sm'
                        : isNegative
                        ? 'bg-[#FEFAE8]/5 text-[#FEFAE8]/70 hover:bg-[#FEFAE8]/10'
                        : 'bg-[#060C04]/5 text-[#060C04]/70 hover:bg-[#060C04]/10'
                    }`}
                  >
                    Solo Isotipo HMA
                  </button>
                </div>

                {/* Quick Filter Bar */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-general font-bold uppercase tracking-wider opacity-60 mr-1">
                    Alcance:
                  </span>
                  <button
                    onClick={() => {
                      setFilter('all');
                      setSelectedYear(null);
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-general transition-colors cursor-pointer ${
                      filter === 'all' && selectedYear === null
                        ? 'bg-current/15 font-bold'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    Todos (12)
                  </button>
                  <button
                    onClick={() => {
                      setFilter('decade');
                      setSelectedYear(null);
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-general transition-colors cursor-pointer ${
                      filter === 'decade'
                        ? 'bg-current/15 font-bold'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    Década (2016–2026)
                  </button>
                  <button
                    onClick={() => {
                      setFilter('projection');
                      setSelectedYear(null);
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-general transition-colors cursor-pointer ${
                      filter === 'projection'
                        ? 'bg-[#3D80FD]/20 text-[#3D80FD] font-bold'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    2027 Proyección
                  </button>
                </div>
              </div>

              {/* Timeline Quick Navigator Bar (Pill buttons for each year) */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
                {EVOLUTION_ERAS.map((era) => {
                  const isSel = selectedYear === era.year;
                  return (
                    <button
                      key={era.year}
                      onClick={() => {
                        setFilter('all');
                        setSelectedYear(isSel ? null : era.year);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-general whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 border ${
                        isSel
                          ? 'bg-[#3D80FD] border-[#3D80FD] text-white shadow-sm font-bold'
                          : isProjection(era)
                          ? 'border-[#3D80FD]/30 bg-[#3D80FD]/10 text-[#3D80FD] hover:bg-[#3D80FD]/20'
                          : isNegative
                          ? 'border-[#FEFAE8]/10 bg-[#FEFAE8]/5 text-[#FEFAE8]/80 hover:bg-[#FEFAE8]/10'
                          : 'border-[#060C04]/10 bg-white text-[#060C04]/80 hover:bg-[#060C04]/5'
                      }`}
                    >
                      <span>{era.year}</span>
                    </button>
                  );
                })}
              </div>

              {/* Era Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEras.map((era, index) => {
                  const eraIsProj = isProjection(era);
                  return (
                    <div
                      key={era.year}
                      className={`p-6 sm:p-7 rounded-2xl border flex flex-col justify-between text-left transition-all relative overflow-hidden group ${
                        eraIsProj
                          ? isNegative
                            ? 'bg-[#060C04] border-[#3D80FD]/40 hover:border-[#3D80FD]'
                            : 'bg-white border-[#3D80FD]/30 hover:border-[#3D80FD] shadow-md'
                          : isNegative
                          ? 'bg-[#060C04] border-[#FEFAE8]/10 hover:border-[#FEFAE8]/25'
                          : 'bg-white border-[#060C04]/8 hover:border-[#060C04]/20 shadow-xs'
                      }`}
                    >
                      {/* Year Header */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-5">
                          <div className="flex items-center gap-2">
                            <span className="font-aeonik text-3xl font-bold tracking-tight text-[#3D80FD]">
                              {era.year}
                            </span>
                            {eraIsProj && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-general font-bold uppercase tracking-wider bg-[#3D80FD]/20 text-[#3D80FD] border border-[#3D80FD]/30">
                                Proyección
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Dual Coherent Visual Showcase Box */}
                        <div
                          className={`rounded-xl mb-5 p-4 border transition-all ${
                            isNegative
                              ? 'bg-[#0A1408] border-[#FEFAE8]/10 group-hover:border-[#FEFAE8]/20'
                              : 'bg-black/5 border-black/10'
                          }`}
                        >
                          {viewMode === 'duo' && (
                            <div className="grid grid-cols-2 gap-3 items-center">
                              {/* Monograma H */}
                              <div className={`flex flex-col items-center justify-center p-2 rounded-lg border h-36 ${
                                isNegative ? 'bg-black/40 border-white/5' : 'bg-[#FEFAE8]/90 border-[#060C04]/10 shadow-xs'
                              }`}>
                                <div className="w-20 h-20 flex items-center justify-center">
                                  <RenderHLogo 
                                    yearCode={era.yearCode} 
                                    fillColor={isNegative ? '#FEFAE8' : '#060C04'} 
                                    className="w-full h-full max-h-16 object-contain" 
                                  />
                                </div>
                                <span className={`text-[10px] font-general mt-1 font-medium ${
                                  isNegative ? 'text-white/70' : 'text-[#060C04]'
                                }`}>
                                  Monograma H
                                </span>
                              </div>

                              {/* Isotipo HMA */}
                              <div className={`flex flex-col items-center justify-center p-2 rounded-lg border h-36 ${
                                isNegative ? 'bg-black/40 border-white/5' : 'bg-[#FEFAE8]/90 border-[#060C04]/10 shadow-xs'
                              }`}>
                                <div className="w-20 h-20 flex items-center justify-center">
                                  <RenderHMALogo 
                                    hmaCode={era.yearCode} 
                                    fillColor={isNegative ? '#FEFAE8' : '#060C04'} 
                                    className="w-full h-full max-h-16 object-contain" 
                                  />
                                </div>
                                <span className={`text-[10px] font-general mt-1 font-medium ${
                                  isNegative ? 'text-white/70' : 'text-[#060C04]'
                                }`}>
                                  Isotipo HMA
                                </span>
                              </div>
                            </div>
                          )}

                          {viewMode === 'h' && (
                            <div className={`flex flex-col items-center justify-center p-4 rounded-lg border h-44 ${
                                isNegative ? 'bg-black/40 border-white/5' : 'bg-[#FEFAE8]/90 border-[#060C04]/10 shadow-xs'
                              }`}>
                              <div className="w-28 h-28 flex items-center justify-center mb-2">
                                <RenderHLogo 
                                  yearCode={era.yearCode} 
                                  fillColor={isNegative ? '#FEFAE8' : '#060C04'} 
                                  className="w-full h-full max-h-24 object-contain" 
                                />
                              </div>
                              <span className="text-xs font-general text-[#75C962] font-semibold">
                                Monograma H ({era.year})
                              </span>
                            </div>
                          )}

                          {viewMode === 'hma' && (
                            <div className={`flex flex-col items-center justify-center p-4 rounded-lg border h-44 ${
                                isNegative ? 'bg-black/40 border-white/5' : 'bg-[#FEFAE8]/90 border-[#060C04]/10 shadow-xs'
                              }`}>
                              <div className="w-28 h-28 flex items-center justify-center mb-2">
                                <RenderHMALogo 
                                  hmaCode={era.yearCode} 
                                  fillColor={isNegative ? '#FEFAE8' : '#060C04'} 
                                  className="w-full h-full max-h-24 object-contain" 
                                />
                              </div>
                              <span className="text-xs font-general text-[#3D80FD] font-semibold">
                                Isotipo HMA ({era.year})
                              </span>
                            </div>
                          )}

                          {/* Quick Inspect Button */}
                          <div className={`mt-3 pt-2 border-t flex items-center justify-between text-[11px] ${
                            isNegative ? 'border-white/10 text-white/60' : 'border-black/10 text-black/60'
                          }`}>
                            <span className="truncate max-w-[170px]">{era.stage || era.category}</span>
                            <button
                              onClick={() => setModalEra(era)}
                              className={`inline-flex items-center gap-1 transition-colors cursor-pointer font-semibold ${
                                isNegative ? 'text-[#3D80FD] hover:text-white' : 'text-[#3D80FD] hover:text-[#2D60C1]'
                              }`}
                            >
                              <ZoomIn className="w-3 h-3" />
                              <span>Inspeccionar</span>
                            </button>
                          </div>
                        </div>

                        {/* Title & Concept */}
                        <h3 className="font-dosis text-2xl font-bold mb-1 leading-snug">
                          {era.concept || era.title}
                        </h3>

                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: era.accentColor }} />
                          <span className="font-general text-xs font-semibold text-[#3D80FD]">
                            {era.geometry || era.brandName}
                          </span>
                        </div>

                        <p className={`font-general text-sm leading-relaxed mb-4 ${
                          isNegative ? 'text-[#FEFAE8]/75' : 'text-[#060C04]/75'
                        }`}>
                          {era.description}
                        </p>

                        <div className={`p-3 rounded-lg text-xs font-general leading-relaxed border ${
                          isNegative ? 'bg-[#FEFAE8]/5 border-[#FEFAE8]/10 text-[#FEFAE8]/70' : 'bg-[#060C04]/4 border-[#060C04]/8 text-[#060C04]/70'
                        }`}>
                          <strong className="text-current font-bold">Significado: </strong>
                          {era.meaning || era.continuity}
                        </div>
                      </div>

                      {/* Footer of Card */}
                      <div className="mt-6 pt-4 border-t border-current/10 flex items-center justify-between text-xs font-general opacity-60">
                        <div className="flex items-center gap-1.5">
                          <Milestone className="w-3.5 h-3.5" />
                          <span>Año {index + 1} de 12</span>
                        </div>
                        <button
                          onClick={() => setModalEra(era)}
                          className="hover:text-[#3D80FD] transition-colors cursor-pointer flex items-center gap-1 font-medium"
                        >
                          <span>Ver vector</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Note on Vector Fidelity & Custom Uploads */}
        {config.showTimelineAlert && (
          <div
            className={`p-6 rounded-2xl border text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-8 ${
              isNegative
                ? 'bg-[#315629]/10 border-[#315629]/25 text-[#FEFAE8]'
                : 'bg-[#315629]/6 border-[#315629]/20 text-[#1B3315]'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-general text-xs font-bold uppercase tracking-wider text-[#75C962]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Fidelidad de Renderizado Vectorial (2016 — 2027)</span>
              </div>
              <p className="text-sm font-general opacity-80 max-w-3xl">
                <span dangerouslySetInnerHTML={{ __html: (config.timelineAlertText || 'Todos los trazos vectoriales y proporciones geométricas han sido recalculados y estandarizados para que no sufran cortes ni deformaciones. Puedes pulsar en "Inspeccionar" sobre cualquier año para ver los dos isotipos en alta escala. Si deseas afinar o sustituir algún año específico con un SVG particular, indícamelo y lo ajustaremos al milímetro.').replace('"Inspeccionar"', '<strong>"Inspeccionar"</strong>') }} />
              </p>
            </div>

            {!isFullView && onNavigateHeritage && (
              <button
                onClick={onNavigateHeritage}
                className="btn-primary shrink-0 bg-[#315629] text-white hover:bg-[#1B3315] cursor-pointer shadow-sm text-sm"
              >
                <span>Ir al Servicio Heritage & Archivo</span>
                <span>→</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal Inspector for High-Precision SVG Inspection */}
      {modalEra && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div
            className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 sm:p-8 relative text-left ${
              isNegative ? 'bg-[#060C04] text-[#FEFAE8] border-[#FEFAE8]/20' : 'bg-white text-[#060C04] border-[#060C04]/15'
            }`}
          >
            {/* Close Button */}
            <button
              onClick={() => setModalEra(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-current/10 transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="pr-12 space-y-2 mb-6">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-general font-bold bg-[#3D80FD]/20 text-[#3D80FD] border border-[#3D80FD]/30">
                  Año {modalEra.year}
                </span>
                {isProjection(modalEra) && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-general font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Proyección Futura
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-dosis font-bold">
                {modalEra.concept || modalEra.title} · {modalEra.stage || modalEra.category}
              </h3>

              <p className="text-sm font-general opacity-75">
                {modalEra.geometry || modalEra.brandName} — {modalEra.description}
              </p>
            </div>

            {/* Contrast / Backplate Switcher */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-general font-bold opacity-60">Fondo de contraste:</span>
              <button
                onClick={() => setModalBg('obsidian')}
                className={`px-2.5 py-1 rounded-md text-xs font-general cursor-pointer transition-colors ${
                  modalBg === 'obsidian' ? 'bg-[#3D80FD] text-white font-bold' : 'bg-current/10 opacity-70 hover:opacity-100'
                }`}
              >
                Obsidiana HMA (#060C04)
              </button>
              <button
                onClick={() => setModalBg('black')}
                className={`px-2.5 py-1 rounded-md text-xs font-general cursor-pointer transition-colors ${
                  modalBg === 'black' ? 'bg-[#3D80FD] text-white font-bold' : 'bg-current/10 opacity-70 hover:opacity-100'
                }`}
              >
                Negro Puro (#000000)
              </button>
              <button
                onClick={() => setModalBg('light')}
                className={`px-2.5 py-1 rounded-md text-xs font-general cursor-pointer transition-colors ${
                  modalBg === 'light' ? 'bg-[#3D80FD] text-white font-bold' : 'bg-current/10 opacity-70 hover:opacity-100'
                }`}
              >
                Luz HMA (#FEFAE8)
              </button>
            </div>

            {/* Side-by-Side High-Res Vectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              {/* Monograma H Container */}
              <div
                className={`p-6 sm:p-8 rounded-2xl border flex flex-col items-center justify-between min-h-[300px] transition-colors ${
                  modalBg === 'obsidian'
                    ? 'bg-[#060C04] border-white/10'
                    : modalBg === 'black'
                    ? 'bg-black border-white/10'
                    : 'bg-[#FEFAE8] border-[#060C04]/15'
                }`}
              >
                <div className="w-full flex items-center justify-between mb-4">
                  <span className={`text-xs font-mono font-bold tracking-wider ${
                    modalBg === 'light' ? 'text-[#1B3315]' : 'text-[#75C962]'
                  }`}>
                    MONOGRAMA H ({modalEra.year})
                  </span>
                  <span className="text-[10px] font-general opacity-50">
                    Vector React SVG
                  </span>
                </div>

                <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center p-2">
                  <RenderHLogo
                    yearCode={modalEra.yearCode}
                    fillColor={modalBg === 'light' ? '#060C04' : '#FFFFFF'}
                    className="w-full h-full object-contain"
                  />
                </div>

                <p className={`text-xs font-general text-center mt-4 opacity-60 ${
                  modalBg === 'light' ? 'text-[#060C04]' : 'text-white'
                }`}>
                  Trazado de monograma central para el año {modalEra.year}
                </p>
              </div>

              {/* Isotipo HMA Container */}
              <div
                className={`p-6 sm:p-8 rounded-2xl border flex flex-col items-center justify-between min-h-[300px] transition-colors ${
                  modalBg === 'obsidian'
                    ? 'bg-[#060C04] border-white/10'
                    : modalBg === 'black'
                    ? 'bg-black border-white/10'
                    : 'bg-[#FEFAE8] border-[#060C04]/15'
                }`}
              >
                <div className="w-full flex items-center justify-between mb-4">
                  <span className={`text-xs font-mono font-bold tracking-wider ${
                    modalBg === 'light' ? 'text-[#060C04]' : 'text-[#3D80FD]'
                  }`}>
                    ISOTIPO HMA ({modalEra.year})
                  </span>
                  <span className="text-[10px] font-general opacity-50">
                    Vector React SVG
                  </span>
                </div>

                <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center p-2">
                  <RenderHMALogo
                    hmaCode={modalEra.yearCode}
                    fillColor={modalBg === 'light' ? '#060C04' : '#FFFFFF'}
                    className="w-full h-full object-contain"
                  />
                </div>

                <p className={`text-xs font-general text-center mt-4 opacity-60 ${
                  modalBg === 'light' ? 'text-[#060C04]' : 'text-white'
                }`}>
                  Isotipo corporativo complementario para el año {modalEra.year}
                </p>
              </div>
            </div>

            {/* Narrative & Meaning */}
            <div className={`p-4 rounded-xl border text-sm font-general ${
              isNegative ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
            }`}>
              <div className="font-bold mb-1 text-[#3D80FD]">Relación conceptual & Memoria histórica:</div>
              <p className="opacity-80 leading-relaxed mb-2">{modalEra.description}</p>
              <div className="text-xs opacity-70">
                <strong>Significado de la marca:</strong> {modalEra.meaning || modalEra.continuity}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
