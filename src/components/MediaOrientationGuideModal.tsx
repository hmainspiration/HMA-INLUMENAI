import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Youtube, 
  Music, 
  Image as ImageIcon, 
  Database, 
  Link as LinkIcon, 
  CheckCircle, 
  Code,
  Copy,
  CheckCheck
} from 'lucide-react';

interface MediaOrientationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MediaOrientationGuideModal: React.FC<MediaOrientationGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#151D2C] rounded-3xl border border-gray-200 dark:border-gray-800 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col transition-colors">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-[#151D2C]/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00B4D8]/10 dark:bg-[#00B4D8]/20 text-[#00B4D8] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#111827] dark:text-white font-heading">
                Orientación Experta: ¿Base de Datos o Enlaces?
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Guía práctica para dueños creativos sin conocimientos de programación
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          
          {/* Comparative Recommendation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Strategy 1: Smart Links (Recommended) */}
            <div className="p-5 rounded-2xl bg-[#00B4D8]/5 dark:bg-[#00B4D8]/10 border-2 border-[#00B4D8]/30 dark:border-[#00B4D8]/40 relative">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00B4D8] text-white text-[11px] font-bold mb-3">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Opción Más Rápida y Económica</span>
              </div>
              <h4 className="text-base font-bold text-gray-900 dark:text-white font-heading mb-1.5 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-[#00B4D8]" />
                <span>Enlaces Inteligentes con Reproducción Integrada</span>
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                Subes tus videos a YouTube (públicos o no listados), tus audios a plataformas de audio y tus fotos a la nube. Tu web los reproduce <strong>directamente en pantalla completa</strong> sin costo de almacenamiento.
              </p>
              <ul className="text-xs space-y-1.5 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8]" />
                  <span><strong>100% Gratis:</strong> Sin facturas sorpresa de servidores.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8]" />
                  <span><strong>Velocidad Extrema:</strong> Carga al instante en celulares.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8]" />
                  <span><strong>Reproducción Nativa:</strong> El cliente no sale de tu web.</span>
                </li>
              </ul>
            </div>

            {/* Strategy 2: Cloud Database (Supabase / Firebase) */}
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-800">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-[11px] font-bold mb-3">
                <Database className="w-3.5 h-3.5" />
                <span>Para Etapas Avanzadas</span>
              </div>
              <h4 className="text-base font-bold text-gray-900 dark:text-white font-heading mb-1.5 flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-500" />
                <span>Base de Datos en la Nube (Supabase/Firebase)</span>
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                Ideal si en el futuro tienes un equipo de 3 o más personas que necesitan un panel con contraseña (tipo CMS) para subir contenido sin pedirle al asistente de IA que lo agregue.
              </p>
              <ul className="text-xs space-y-1.5 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span><strong>Panel Administrativo:</strong> Subida desde un formulario.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span><strong>Gestión de Usuarios:</strong> Control de accesos y roles.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Supported Media Types */}
          <div className="space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-gray-900 dark:text-white font-heading">
              Formatos que tu web ya puede reproducir en vivo
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0F172A] flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                  <Youtube className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-xs text-gray-900 dark:text-white block font-heading">Videos de YouTube & Reels</strong>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">Cualquier enlace de video o reel</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0F172A] flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-xs text-gray-900 dark:text-white block font-heading">Música & Pistas MP3</strong>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">Reproductor con barra de tiempo</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0F172A] flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-cyan-100 dark:bg-cyan-950/60 text-[#00B4D8] flex items-center justify-center shrink-0">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-xs text-gray-900 dark:text-white block font-heading">Galerías & Marcos</strong>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">Visor de alta definición con zoom</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copy-paste prompt example for the user */}
          <div className="p-4 rounded-2xl bg-gray-900 dark:bg-[#0B0F19] text-white border border-gray-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00B4D8]">
                <Code className="w-4 h-4" />
                <span>¿Cómo pedirme que añada tus nuevos videos o audios?</span>
              </div>
              <button
                onClick={() => handleCopy(
                  'Por favor añade este video de YouTube a mi servicio de Motion: https://www.youtube.com/watch?v=EJEMPLO con el título "Nuevo Reel HMA"',
                  'prompt'
                )}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-medium text-gray-300 transition-colors cursor-pointer"
              >
                {copiedCode === 'prompt' ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Ejemplo</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-300">
              Solo escríbeme en el chat algo como: <br />
              <em className="text-amber-300 font-mono text-[11px] block mt-1">
                «Por favor añade este video de YouTube a mi servicio de Motion: https://www.youtube.com/watch?v=... con el título "Intro Oficial 2026"»
              </em>
              ¡Y yo me encargaré de integrarlo y actualizar la versión automáticamente!
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 dark:bg-[#0F172A] border-t border-gray-100 dark:border-gray-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#111827] dark:bg-white hover:bg-black dark:hover:bg-gray-100 text-white dark:text-gray-900 text-xs font-bold transition-colors cursor-pointer"
          >
            Entendido, ¡gracias!
          </button>
        </div>

      </div>
    </div>
  );
};
