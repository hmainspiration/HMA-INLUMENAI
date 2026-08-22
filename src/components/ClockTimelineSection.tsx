import React, { useState, useEffect } from 'react';
import { HmaLogo } from './HmaLogo';
import { TenthAnniversaryLogo } from './TenthAnniversaryLogo';
import { Logo2016 } from './Logo2016';
import { TIMELINE_MILESTONES } from '../data/timelineData';
import { CLUSTERS } from '../data/servicesData';
import { Clock, Calendar, Sparkles, Award, ArrowRight, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ClockTimelineSection: React.FC = () => {
  const [selectedHour, setSelectedHour] = useState<number>(11); // Default to 11 (Year 2026: 10 Years Anniversary)
  const [viewMode, setViewMode] = useState<'clock' | 'timeline'>('clock');
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const { isDark } = useTheme();

  const currentMilestone =
    TIMELINE_MILESTONES.find((m) => m.hour === selectedHour) || TIMELINE_MILESTONES[0];

  // Auto rotate timer if user enables it
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setSelectedHour((prev) => (prev % 12) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const cluster = currentMilestone.clusterId ? CLUSTERS[currentMilestone.clusterId] : CLUSTERS['03'];

  // Clock calculations (360 degrees / 12 hours = 30 degrees per hour)
  const handRotation = (selectedHour % 12) * 30;

  return (
    <section id="reloj-10-anos" className="py-20 bg-gradient-to-b from-white via-[#FFFBF2] to-white dark:from-[#0B0F19] dark:via-[#131B2E] dark:to-[#0B0F19] relative border-t border-amber-200/60 dark:border-gray-800 overflow-hidden transition-colors duration-200">
      
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#00B4D8]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Anniversary Conmemorative Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-amber-400/20 to-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs font-black uppercase tracking-wider mb-4 shadow-xs">
            <Award className="w-4 h-4 text-[#F5A623]" />
            Edición Conmemorativa Especial · 10 Años (2016 – 2026)
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] dark:text-white font-heading tracking-tight">
            El Reloj de las 12 Horas
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mt-3">
            Cada hora en el reloj representa un capítulo trascendental en la historia y evolución creativa de <strong className="text-[#111827] dark:text-white">HMA INLUMENAI</strong>.
          </p>

          {/* Temporal Section Note */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-xs text-amber-800 dark:text-amber-300">
            <Info className="w-4 h-4 shrink-0 text-[#F5A623]" />
            <span>Nota: Módulo conmemorativo temporal por el 10° Aniversario. Varía según cada celebración institucional.</span>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setViewMode('clock')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'clock'
                  ? 'bg-[#111827] dark:bg-white text-white dark:text-gray-900 shadow-sm'
                  : 'bg-white dark:bg-[#151D2C] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700'
              }`}
            >
              Dial de Reloj Interactivo
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'timeline'
                  ? 'bg-[#111827] dark:bg-white text-white dark:text-gray-900 shadow-sm'
                  : 'bg-white dark:bg-[#151D2C] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700'
              }`}
            >
              Línea de Tiempo Lineal (2016–2026)
            </button>
          </div>
        </div>

        {viewMode === 'clock' ? (
          /* Clock Dial Mode */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Interactive Clock Dial (Left / Center) */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-white dark:bg-[#151D2C] border-8 border-amber-200/80 dark:border-amber-900/60 shadow-2xl flex items-center justify-center p-6">
                
                {/* Clock Outer Rim Detail */}
                <div className="absolute inset-2 rounded-full border border-gray-200 dark:border-gray-700/60" />
                <div className="absolute inset-4 rounded-full border border-dashed border-gray-300/80 dark:border-gray-700" />

                {/* Clock Center Logo */}
                <div className="absolute flex flex-col items-center justify-center text-center z-10 pointer-events-none">
                  {currentMilestone.logoType === '10-anos' ? (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mb-1 text-[#111827] dark:text-white drop-shadow-md transition-colors">
                      <TenthAnniversaryLogo className="w-full h-full" />
                    </div>
                  ) : currentMilestone.logoType === '2016' ? (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 mb-1 text-[#111827] dark:text-white drop-shadow-md transition-colors">
                      <Logo2016 className="w-full h-full" />
                    </div>
                  ) : currentMilestone.logoPath ? (
                    <img 
                      src={currentMilestone.logoPath} 
                      alt={`Logo ${currentMilestone.year}`} 
                      className="w-14 h-14 mb-1 object-contain drop-shadow-md" 
                    />
                  ) : (
                    <div className="w-9 h-9 mb-0.5 text-[#111827] dark:text-white opacity-85">
                      <HmaLogo variant="monochrome" color={isDark ? "#FFFFFF" : "#111827"} className="w-full h-full" />
                    </div>
                  )}
                  <span className="text-[9px] font-bold text-[#F5A623] tracking-wider uppercase">Año</span>
                  <span className="text-xs font-black text-[#111827] dark:text-amber-300 font-heading mt-0.5 bg-amber-50 dark:bg-amber-950/80 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                    {currentMilestone.year}
                  </span>
                </div>

                {/* Rotating Clock Hand */}
                <div
                  className="absolute w-2 h-36 origin-bottom rounded-full transition-transform duration-500 ease-out z-20"
                  style={{
                    backgroundColor: isDark ? '#F5A623' : '#111827',
                    transform: `translateY(-50%) rotate(${handRotation}deg)`,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full absolute -top-1 -left-1 border-2 border-white dark:border-gray-900 shadow-sm"
                    style={{ backgroundColor: '#F5A623' }}
                  />
                </div>

                {/* Center Pin */}
                <div className="w-5 h-5 rounded-full bg-[#111827] dark:bg-white border-2 border-white dark:border-gray-900 shadow-md z-30" />

                {/* 12 Clock Hour Buttons placed mathematically around the circle */}
                {TIMELINE_MILESTONES.map((m) => {
                  const angle = (m.hour * 30 - 90) * (Math.PI / 180);
                  const radius = 135; // px from center
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  const isSelected = selectedHour === m.hour;

                  return (
                    <button
                      key={m.hour}
                      onClick={() => {
                        setSelectedHour(m.hour);
                        setIsAutoPlaying(false);
                      }}
                      className={`absolute w-10 h-10 sm:w-11 sm:h-11 rounded-full flex flex-col items-center justify-center transition-all duration-200 z-30 font-heading cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                        isSelected
                          ? 'bg-[#111827] dark:bg-white text-white dark:text-gray-900 scale-110 shadow-lg ring-4 ring-[#F5A623]'
                          : 'bg-white dark:bg-[#1E293B] text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-amber-950/50 hover:scale-105 border border-gray-300 dark:border-gray-700 shadow-xs'
                      }`}
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                      }}
                      title={`Hora ${m.hour}:00 · Año ${m.year} (${m.title})`}
                    >
                      <span className="text-xs font-black">{m.hour}</span>
                      <span className="text-[8px] opacity-70 font-heading font-bold leading-none">
                        '{m.year.slice(2)}
                      </span>
                    </button>
                  );
                })}

              </div>

              {/* Clock Controls */}
              <div className="flex items-center gap-3 mt-8">
                <button
                  onClick={() => setSelectedHour((prev) => (prev === 1 ? 12 : prev - 1))}
                  className="p-2.5 rounded-full bg-white dark:bg-[#151D2C] border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-xs transition-colors cursor-pointer"
                  aria-label="Hora anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isAutoPlaying
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-white dark:bg-[#151D2C] text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isAutoPlaying ? 'Pausar Recorrido' : 'Recorrido Automático'}</span>
                </button>

                <button
                  onClick={() => setSelectedHour((prev) => (prev === 12 ? 1 : prev + 1))}
                  className="p-2.5 rounded-full bg-white dark:bg-[#151D2C] border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-xs transition-colors cursor-pointer"
                  aria-label="Hora siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>

            {/* Milestone Story Card (Right Column) */}
            <div className="lg:col-span-6">
              <div className="bg-white dark:bg-[#151D2C] rounded-3xl border-2 border-amber-200 dark:border-amber-900/60 p-8 shadow-xl relative overflow-hidden">
                
                {/* Top Year & Hour Ribbon */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-amber-500 text-white font-heading font-black text-sm shadow-xs">
                      {currentMilestone.clockDisplay}
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-[#111827] dark:text-white font-heading tracking-tight">
                      Año {currentMilestone.year}
                    </span>
                  </div>

                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full border font-heading"
                    style={{
                      backgroundColor: `${cluster.mainColor}15`,
                      color: cluster.darkColor,
                      borderColor: `${cluster.mainColor}35`,
                    }}
                  >
                    {currentMilestone.highlightTag}
                  </span>
                </div>

                {/* Milestone Title */}
                <h3 className="text-2xl sm:text-3xl font-black text-[#111827] dark:text-white font-heading tracking-tight mb-3">
                  {currentMilestone.title}
                </h3>

                {/* Summary */}
                <p className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4 leading-relaxed">
                  {currentMilestone.summary}
                </p>

                {/* Narrative Details */}
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6 bg-gray-50 dark:bg-[#0F172A] p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                  {currentMilestone.details}
                </p>

                {/* Key Accomplishments */}
                <div className="mb-6">
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 dark:text-gray-400 font-heading mb-3">
                    Hitos Principales de Esta Hora
                  </h4>
                  <ul className="space-y-2">
                    {currentMilestone.milestones.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Navigator */}
                <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Hora {currentMilestone.hour} de 12</span>
                  <a
                    href="#servicios"
                    className="inline-flex items-center gap-1 font-bold text-[#00B4D8] hover:underline"
                  >
                    <span>Ver servicios relacionados</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </div>

          </div>
        ) : (
          /* Linear Timeline Mode */
          <div className="space-y-6 max-w-4xl mx-auto">
            {TIMELINE_MILESTONES.map((m) => {
              const isSelected = selectedHour === m.hour;
              const cl = m.clusterId ? CLUSTERS[m.clusterId] : CLUSTERS['03'];

              return (
                <div
                  key={m.hour}
                  onClick={() => setSelectedHour(m.hour)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-[#1E293B] border-amber-400 dark:border-amber-500 shadow-lg ring-2 ring-amber-300/50'
                      : 'bg-white/80 dark:bg-[#151D2C] hover:bg-white dark:hover:bg-[#1E293B] border-gray-200 dark:border-gray-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded bg-[#111827] dark:bg-white text-white dark:text-gray-900 text-xs font-heading font-bold">
                        {m.clockDisplay}
                      </span>
                      <span className="text-lg font-black text-[#111827] dark:text-white font-heading tracking-tight">
                        Año {m.year}
                      </span>
                      <h3 className="text-base font-black text-gray-900 dark:text-white font-heading">
                        {m.title}
                      </h3>
                    </div>

                    <span
                      className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border self-start sm:self-auto"
                      style={{
                        backgroundColor: `${cl.mainColor}15`,
                        color: cl.darkColor,
                        borderColor: `${cl.mainColor}30`,
                      }}
                    >
                      {m.highlightTag}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2">{m.summary}</p>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
