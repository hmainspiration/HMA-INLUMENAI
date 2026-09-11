import React, { useEffect, useState } from 'react';
import { AnimatedIsotipo } from './AnimatedIsotipo';
import { MASTER_SHAPES } from '../data/brandData';
import { ArrowDown, Sparkles, Layers } from 'lucide-react';
import { getSiteConfig, SiteConfig } from '../utils/store';
import { HeroMotionBackground } from './HeroMotionBackground';

interface HeroProps {
  isNegative?: boolean;
  onExploreServices: () => void;
  onExploreEcosystem: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  isNegative = false,
  onExploreServices,
  onExploreEcosystem
}) => {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    setConfig(getSiteConfig());
  }, []);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Animated Motion Matrix */}
      <HeroMotionBackground
        isNegative={isNegative}
        config={config?.heroMotion}
      />

      {/* Structural backdrop subtle guides */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & Ecosystem Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Trajectory Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-general font-medium transition-colors"
                 style={{
                   borderColor: isNegative ? 'rgba(254, 250, 232, 0.15)' : 'rgba(6, 12, 4, 0.12)',
                   backgroundColor: isNegative ? 'rgba(254, 250, 232, 0.05)' : 'rgba(6, 12, 4, 0.03)'
                 }}>
              <span className="w-2 h-2 rounded-full bg-[#3D80FD] animate-pulse" />
              <span className="font-semibold tracking-wide">10 AÑOS DE TRAYECTORIA (2016 → 2026)</span>
              <span className="opacity-40">|</span>
              <span className="opacity-80">NICARAGUA & HISPANOAMÉRICA</span>
            </div>

            {/* Main Universal Display Headline */}
            <h1 className="type-display text-balance">
              {config?.heroTitle || 'La Creatividad es un'} <span className="text-[#3D80FD]">{config?.heroHighlight || 'Regalo de Dios'}</span>.
            </h1>

            {/* Value Proposition Body */}
            <p className={`type-body text-lg sm:text-xl max-w-2xl leading-relaxed ${
              isNegative ? 'text-[#FEFAE8]/80' : 'text-[#060C04]/80'
            }`}>
              {config?.heroDescription || 'Construimos sistemas de identidad visual y herramientas creativas de impacto.'}
            </p>

            {/* Core Value Pillars - Quick Metric Tokens */}
            <div className="grid grid-cols-3 gap-4 pt-2 max-w-xl">
              <div className={`p-4 rounded-xl border ${
                isNegative ? 'border-[#FEFAE8]/10 bg-[#FEFAE8]/5' : 'border-[#060C04]/8 bg-white/60'
              }`}>
                <div className="font-aeonik text-2xl font-bold text-[#3D80FD]">{config?.heroMetric1Value || '10'}</div>
                <div className="font-general text-xs opacity-75 mt-0.5">{config?.heroMetric1Label || 'Años de evolución'}</div>
              </div>
              <div className={`p-4 rounded-xl border ${
                isNegative ? 'border-[#FEFAE8]/10 bg-[#FEFAE8]/5' : 'border-[#060C04]/8 bg-white/60'
              }`}>
                <div className="font-aeonik text-2xl font-bold text-[#2D60C1]">{config?.heroMetric2Value || '12'}</div>
                <div className="font-general text-xs opacity-75 mt-0.5">{config?.heroMetric2Label || 'Servicios autónomos'}</div>
              </div>
              <div className={`p-4 rounded-xl border ${
                isNegative ? 'border-[#FEFAE8]/10 bg-[#FEFAE8]/5' : 'border-[#060C04]/8 bg-white/60'
              }`}>
                <div className="font-aeonik text-2xl font-bold text-[#3D80FD]">{config?.heroMetric3Value || '13'}</div>
                <div className="font-general text-xs opacity-75 mt-0.5">{config?.heroMetric3Label || 'Formas / 1 Eje Central'}</div>
              </div>
            </div>

            {/* Action Buttons in General Sans */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onExploreServices}
                className="btn-primary btn-lg bg-[#3D80FD] text-white hover:bg-[#2D60C1] shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Explorar los 12 Servicios</span>
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                onClick={onExploreEcosystem}
                className={`btn-primary btn-lg border flex items-center gap-2 cursor-pointer transition-colors ${
                  isNegative
                    ? 'border-[#FEFAE8]/20 text-[#FEFAE8] hover:bg-[#FEFAE8]/10'
                    : 'border-[#060C04]/20 text-[#060C04] hover:bg-[#060C04]/5'
                }`}
              >
                <Layers className="w-4 h-4 text-[#3D80FD]" />
                <span>Arquitectura de Marca</span>
              </button>
            </div>
          </div>

          {/* Right Column: Animated Master Logo (13 Shapes) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className={`w-full max-w-[460px] p-8 sm:p-10 rounded-2xl border relative flex flex-col items-center justify-center transition-all ${
              isNegative
                ? 'bg-[#060C04]/60 border-[#FEFAE8]/10 shadow-2xl shadow-black/60'
                : 'bg-white/70 border-[#060C04]/8 shadow-xl shadow-black/5'
            }`}>
              <div className="w-full aspect-square flex items-center justify-center">
                <AnimatedIsotipo
                  shapes={MASTER_SHAPES}
                  serviceId="master-home"
                  isServiceView={false}
                  isNegative={isNegative}
                  allowReplay={true}
                />
              </div>

              {/* Sub-label explaining the geometry */}
              <div className="text-center mt-2">
                <p className="font-general text-xs tracking-wider uppercase font-semibold text-[#3D80FD]">
                  Isotipo Maestro
                </p>
                <p className={`font-general text-[11px] mt-0.5 ${isNegative ? 'text-[#FEFAE8]/60' : 'text-[#060C04]/60'}`}>
                  12 Rectángulos Redondeados + 1 Círculo Central Constante
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
