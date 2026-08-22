import React from 'react';
import { HmaLogo } from './HmaLogo';
import { Sparkles, Clock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onExploreServices: () => void;
  onExploreAnniversary: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreServices,
  onExploreAnniversary,
}) => {
  return (
    <section id="inicio" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden bg-gradient-to-b from-white via-[#FAFCFE] to-white dark:from-[#0B0F19] dark:via-[#111827] dark:to-[#0B0F19] transition-colors duration-200">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#E5E7EB_1px,transparent_1px)] dark:bg-[radial-gradient(#1F2937_1px,transparent_1px)] [background-size:24px_24px] opacity-40 dark:opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B4D8]/10 dark:bg-[#00B4D8]/20 border border-[#00B4D8]/25 dark:border-[#00B4D8]/40 text-[#007F98] dark:text-[#40C7E2] text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#00B4D8]" />
              Ecosistema Creativo & Tecnológico
            </div>

            {/* Main Institutional Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#111827] dark:text-white font-heading tracking-tight leading-[1.08] mb-6">
              La Creatividad es <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#111827] via-[#007F98] to-[#00B4D8] dark:from-white dark:via-[#40C7E2] dark:to-[#00B4D8] bg-clip-text text-transparent">
                Un Regalo de Dios
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#4B5563] dark:text-gray-300 font-normal leading-relaxed max-w-2xl mb-8">
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
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#00B4D8] hover:bg-[#0096C7] active:bg-[#007F98] text-white font-black text-base shadow-lg shadow-[#00B4D8]/25 hover:shadow-xl hover:shadow-[#00B4D8]/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Explorar Servicios</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#reloj-10-anos"
                onClick={(e) => {
                  e.preventDefault();
                  onExploreAnniversary();
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white dark:bg-[#151D2C] hover:bg-amber-50/50 dark:hover:bg-[#1E293B] text-[#111827] dark:text-gray-100 font-bold text-base border-2 border-[#F5A623] shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <Clock className="w-5 h-5 text-[#F5A623] group-hover:rotate-90 transition-transform duration-300" />
                <span>Ver Demo 10 Años</span>
              </a>
            </div>

            {/* Key Value Propositions Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-10 mt-10 border-t border-gray-200/80 dark:border-gray-800 w-full text-xs text-[#6B7280] dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00B4D8] shrink-0" />
                <span className="font-semibold text-gray-800 dark:text-gray-200">12 Servicios Integrados</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
                <span className="font-semibold text-gray-800 dark:text-gray-200">Atención Personalizada</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <span className="w-2 h-2 rounded-full bg-[#F5A623] shrink-0" />
                <span className="font-semibold text-gray-800 dark:text-gray-200">10 Años de Trayectoria</span>
              </div>
            </div>

          </div>

          {/* Right Column: Isometric HMA INLUMENAI Graphic Hero */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative">
              <HmaLogo variant="hero" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
