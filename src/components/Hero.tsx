import React, { useState } from 'react';
import { HmaLogo } from './HmaLogo';
import { HmaMetamorphosisLogo } from './HmaMetamorphosisLogo';
import { Sparkles, Clock, ArrowRight, ShieldCheck, CheckCircle2, Wand2, Eye } from 'lucide-react';

interface HeroProps {
  onExploreServices: () => void;
  onExploreAnniversary: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreServices,
  onExploreAnniversary,
}) => {
  const [logoMode, setLogoMode] = useState<'morph' | 'static'>('morph');

  return (
    <section id="inicio" className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-[#FAFAFC] via-[#F3F8F9] to-[#FAFAFC] dark:from-[#060C04] dark:via-[#0A130D] dark:to-[#060C04] transition-colors duration-300">
      
      {/* Aurial Ambient Background System (aurial.html) */}
      {/* 1. Radial Texture Dot Grid */}
      <div className="absolute inset-0 aurial-grid-bg opacity-75 dark:opacity-40 pointer-events-none" />

      {/* 2. Floating Cyan Ambient Sphere (#11D7B6) */}
      <div 
        className="absolute top-[-10%] right-[-5%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full bg-[#11D7B6]/25 dark:bg-[#11D7B6]/20 blur-[110px] pointer-events-none animate-aurial-cyan"
      />

      {/* 3. Floating Matriz Blue Ambient Sphere (#2D60C1 / #3D80FD) */}
      <div 
        className="absolute bottom-[-10%] left-[-5%] w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full bg-[#2D60C1]/25 dark:bg-[#3D80FD]/20 blur-[110px] pointer-events-none animate-aurial-matrix"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Institutional Message & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Ecosystem Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11D7B6]/10 dark:bg-[#11D7B6]/15 border border-[#11D7B6]/30 dark:border-[#11D7B6]/35 text-[#0C947D] dark:text-[#11D7B6] text-xs font-bold uppercase tracking-wider mb-6 shadow-xs backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#11D7B6]" />
              Ecosistema Creativo & Tecnológico InLumenAI
            </div>

            {/* Main Institutional Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#060C04] dark:text-[#FEFAE8] font-heading tracking-tight leading-[1.08] mb-6">
              La Creatividad es <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#2280AC] via-[#2D60C1] to-[#11D7B6] dark:from-[#3D80FD] dark:via-[#11D7B6] dark:to-[#75C962] bg-clip-text text-transparent">
                Un Regalo de Dios
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#374151] dark:text-gray-300 font-normal leading-relaxed max-w-2xl mb-8">
              Lleva tus ideas a la realidad, usando nuestros servicios que te permitan construirlo con confianza y seguridad.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href="#servicios"
                onClick={(e) => {
                  e.preventDefault();
                  onExploreServices();
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#2280AC] to-[#11D7B6] hover:from-[#1B6F96] hover:to-[#0EC2A4] active:scale-98 text-white font-black text-base shadow-lg shadow-[#11D7B6]/25 hover:shadow-xl hover:shadow-[#11D7B6]/35 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explorar Catálogo de Servicios</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#reloj-10-anos"
                onClick={(e) => {
                  e.preventDefault();
                  onExploreAnniversary();
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/90 dark:bg-[#0E1712] hover:bg-amber-50/50 dark:hover:bg-[#15231B] text-[#060C04] dark:text-[#FEFAE8] font-bold text-base border-2 border-[#D7BB11] shadow-sm hover:shadow-md transition-all cursor-pointer group backdrop-blur-xs"
              >
                <Clock className="w-5 h-5 text-[#D7BB11] group-hover:rotate-90 transition-transform duration-300" />
                <span>Ver Reloj 10 Años</span>
              </a>
            </div>

            {/* Value Propositions */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-gray-200/80 dark:border-gray-800/80 w-full text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#11D7B6] shrink-0" />
                <span className="font-semibold text-gray-900 dark:text-gray-200">12 Servicios en 4 Clústeres</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#75C962] shrink-0" />
                <span className="font-semibold text-gray-900 dark:text-gray-200">Paleta Técnica Calibrada</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D7BB11] shrink-0 animate-ping" />
                <span className="font-semibold text-gray-900 dark:text-gray-200">10 Años de Trayectoria</span>
              </div>
            </div>

          </div>

          {/* Right Column: Metamorphosis Vectorial Engine / 3D Monogram */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            {/* View Mode Toggle Pill */}
            <div className="inline-flex items-center p-1 rounded-xl bg-white/80 dark:bg-[#0E1712]/90 border border-gray-200 dark:border-gray-800 backdrop-blur-md shadow-xs mb-4">
              <button
                onClick={() => setLogoMode('morph')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  logoMode === 'morph'
                    ? 'bg-[#2D60C1] text-white shadow-xs'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Metamorfosis Vectorial</span>
              </button>
              <button
                onClick={() => setLogoMode('static')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  logoMode === 'static'
                    ? 'bg-[#2D60C1] text-white shadow-xs'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Logotipo Estático</span>
              </button>
            </div>

            {/* Display Component Container */}
            <div className="relative w-full max-w-[480px] flex flex-col items-center justify-center">
              {logoMode === 'morph' ? (
                <HmaMetamorphosisLogo autoPlay={true} showControls={true} />
              ) : (
                <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center p-4">
                  <HmaLogo variant="hero" />
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
