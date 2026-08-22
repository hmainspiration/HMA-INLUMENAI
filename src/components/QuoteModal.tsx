import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { CLUSTERS } from '../data/servicesData';
import { ServiceIcon } from './ServiceIcons';
import { HmaLogo } from './HmaLogo';
import { getWhatsAppUrl } from '../data/socialLinks';
import { 
  X, 
  MessageSquare, 
  Check, 
  Sparkles, 
  Copy, 
  CheckCheck, 
  Send,
  Play
} from 'lucide-react';

interface QuoteModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenMedia?: (service: ServiceItem) => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ service, onClose, onOpenMedia }) => {
  if (!service) return null;

  const cluster = CLUSTERS[service.clusterId] || CLUSTERS['01'];

  const [clientName, setClientName] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [copied, setCopied] = useState(false);

  const urgencyLabel =
    urgency === 'urgent' ? 'Prioridad Alta (Urgente)' : urgency === 'medium' ? 'Prioridad Media (1 semana)' : 'Tiempo Normal';

  const constructedMessage = `Hola HMA Inlumenai! 👋
Mi nombre es: ${clientName.trim() || '[Mi Nombre]'}
Me interesa cotizar el servicio: *${service.nameEn}* (${service.nameEs})
Clúster: ${cluster.number} — ${cluster.name}

Detalles de mi proyecto:
${projectDetails.trim() || 'Deseo solicitar información y precios para este servicio.'}

Tiempo estimado deseado: ${urgencyLabel}

Espero su pronta respuesta. ¡Muchas gracias!`;

  const whatsappUrl = getWhatsAppUrl(constructedMessage);

  const handleCopy = () => {
    navigator.clipboard.writeText(constructedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="bg-white dark:bg-[#151D2C] rounded-3xl border border-gray-200 dark:border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative overflow-hidden transition-colors">
        
        {/* Subtle Background Watermark using Monochrome HMA Logo */}
        <div 
          className="absolute -right-12 -bottom-12 w-64 h-64 opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none text-[#111827] dark:text-white"
          aria-hidden="true"
        >
          <HmaLogo variant="monochrome" color="currentColor" className="w-full h-full" />
        </div>
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 dark:bg-[#151D2C]/95 backdrop-blur-md px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-bold px-2.5 py-0.5 rounded-full border font-heading"
              style={{
                backgroundColor: `${cluster.mainColor}15`,
                color: cluster.darkColor,
                borderColor: `${cluster.mainColor}30`,
              }}
            >
              Clúster {cluster.number} · {cluster.name}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Service Title & Icon Header */}
          <div className="flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                backgroundColor: `${cluster.mainColor}15`,
                border: `1px solid ${cluster.mainColor}35`,
              }}
            >
              <ServiceIcon type={service.iconType} color={cluster.mainColor} className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#111827] dark:text-white font-heading tracking-tight">
                {service.nameEn}
              </h3>
              <p className="text-sm font-bold text-gray-500 dark:text-gray-400">{service.nameEs}</p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 italic font-medium">"{service.tagline}"</p>
            </div>
          </div>

          {/* Description & Deliverables */}
          <div className="bg-gray-50 dark:bg-[#0F172A] p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
            <h4 className="text-xs font-black uppercase text-gray-400 dark:text-gray-400 font-heading mb-2">
              ¿Qué incluye este servicio?
            </h4>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              {service.description}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-800 dark:text-gray-200">
              {service.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 shrink-0" style={{ color: cluster.mainColor }} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            {/* Media quick trigger if available */}
            {service.mediaItems && service.mediaItems.length > 0 && onOpenMedia && (
              <div className="mt-4 pt-3 border-t border-gray-200/80 dark:border-gray-800 flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  Hay {service.mediaItems.length} muestras multimedia para este servicio:
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onOpenMedia(service);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-xs hover:opacity-90 transition-opacity cursor-pointer"
                  style={{ backgroundColor: cluster.mainColor }}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Reproducir / Ver Muestras</span>
                </button>
              </div>
            )}
          </div>

          {/* WhatsApp Customizer Form */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00B4D8]" />
              <h4 className="text-sm font-black text-[#111827] dark:text-white font-heading">
                Generador de Cotización para WhatsApp
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Tu Nombre o Empresa:
                </label>
                <input
                  type="text"
                  placeholder="Ej. Daniel Hernández"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0F172A] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Prioridad / Entrega:
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0F172A] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                >
                  <option value="normal">Tiempo Normal (Estándar)</option>
                  <option value="medium">Media (Dentro de 1 semana)</option>
                  <option value="urgent">Prioridad Alta (Urgente)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Detalles específicos o requerimientos (opcional):
              </label>
              <textarea
                rows={2}
                placeholder="Ej. Necesito 3 marcos de aniversario para el 15 de marzo, y formato cuadrado..."
                value={projectDetails}
                onChange={(e) => setProjectDetails(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0F172A] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
              />
            </div>

            {/* Live Message Preview */}
            <div className="bg-[#F8FAFC] dark:bg-[#0F172A] border border-gray-200 dark:border-gray-800 rounded-2xl p-3 text-xs font-mono text-gray-700 dark:text-gray-300 relative">
              <div className="flex items-center justify-between mb-1 pb-1 border-b border-gray-200 dark:border-gray-800">
                <span className="text-[10px] uppercase font-bold text-gray-400">Mensaje que se enviará:</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#007F98] dark:text-[#40C7E2] hover:underline cursor-pointer"
                >
                  {copied ? <CheckCheck className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>
              <p className="whitespace-pre-wrap text-[11px] text-gray-600 dark:text-gray-300">
                {constructedMessage}
              </p>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-black text-sm text-white shadow-lg transition-all hover:brightness-110 active:scale-95"
              style={{ backgroundColor: cluster.mainColor }}
            >
              <MessageSquare className="w-4 h-4 fill-white/20" />
              <span>Enviar Cotización a WhatsApp</span>
              <Send className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl border border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
