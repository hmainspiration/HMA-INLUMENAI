import React from 'react';
import { HmaLogo } from './HmaLogo';
import { SocialMediaBar } from './SocialMediaBar';
import { MessageSquare, HelpCircle, ArrowUp, Sparkles } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/socialLinks';

interface FooterProps {
  onOpenDeploymentGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDeploymentGuide }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1120] text-white pt-16 pb-32 md:pb-28 border-t border-gray-800 relative overflow-hidden">
      {/* Subtle Background Watermark using Monochrome HMA Logo */}
      <div 
        className="absolute -right-16 -bottom-16 w-96 h-96 opacity-[0.03] pointer-events-none select-none text-white"
        aria-hidden="true"
      >
        <HmaLogo variant="monochrome" color="currentColor" className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-800">
          
          {/* Col 1: Brand & Isologo & Social Media */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              {/* Isologo with safe area (44px) */}
              <div className="w-11 h-11 shrink-0">
                <HmaLogo variant="monochrome" color="#FFFFFF" className="w-11 h-11" />
              </div>
              <div>
                <h3 className="text-xl font-black font-heading tracking-tight text-white leading-none">
                  HMA INLUMENAI
                </h3>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mt-1">
                  Ecosistema Creativo & Tecnológico
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 max-w-sm mb-5 leading-relaxed">
              La Creatividad es Un Regalo de Dios. Impulsamos tus proyectos a través de identidad visual, producción sonora, preservación de memoria y desarrollo tecnológico.
            </p>

            {/* Social Media Links List */}
            <div className="mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                Redes & Contacto Oficial:
              </span>
              <SocialMediaBar variant="footer" />
            </div>
          </div>

          {/* Col 2: 4 Clusters Links */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 font-heading mb-4">
              Clústeres Cromáticos HMA
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00B4D8] shrink-0" />
                <a href="#servicios" className="text-gray-300 hover:text-white transition-colors">
                  01 — Identidad & Arte (HMA DESIGN, HMA TYPE, HMA VISUALS)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7B2CBF] shrink-0" />
                <a href="#servicios" className="text-gray-300 hover:text-white transition-colors">
                  02 — Audiovisual & Sonido (HMA PHOTOGRAPHY, HMA MUSIC, HMA CINEMA)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623] shrink-0" />
                <a href="#servicios" className="text-gray-300 hover:text-white transition-colors">
                  03 — Fe, Palabra & Legado (HMA TEMPLES, HMA PUBLISHING, HMA TRANSCENDENCE)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0" />
                <a href="#servicios" className="text-gray-300 hover:text-white transition-colors">
                  04 — Tecnología & Producción Física (HMA WATERMARK, HMA SOFTWARE, HMA PRINT)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links & Guide */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 font-heading mb-4">
              Navegación Rápida
            </h4>
            <ul className="space-y-2 text-xs mb-6">
              <li>
                <a href="#inicio" className="text-gray-300 hover:text-[#00B4D8] transition-colors">
                  Inicio Institucional
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-gray-300 hover:text-[#00B4D8] transition-colors">
                  Catálogo de 12 Servicios
                </a>
              </li>
              <li>
                <a href="#reloj-10-anos" className="text-amber-400 hover:text-amber-300 font-bold transition-colors">
                  10 Años · El Reloj de las 12 H (Especial)
                </a>
              </li>
              <li>
                <a href="#portafolio" className="text-gray-300 hover:text-[#00B4D8] transition-colors">
                  Portafolio de Proyectos
                </a>
              </li>
            </ul>

            <button
              onClick={onOpenDeploymentGuide}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-bold text-gray-200 border border-gray-700 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#00B4D8]" />
              <span>Ver Guía de Despliegue</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p>© 2016 – 2026 HMA INLUMENAI. Todos los derechos reservados.</p>
            <span className="hidden sm:inline text-gray-600">·</span>
            <span className="px-2 py-0.5 rounded-full bg-gray-800 text-[#11D7B6] font-mono text-[10px] font-bold border border-gray-700">
              v1.17.0 · Logotipo Oficial y Favicon Calibrado
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href={SOCIAL_LINKS.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00B4D8] hover:underline font-bold flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Atención directa vía WhatsApp</span>
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors cursor-pointer"
              title="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
