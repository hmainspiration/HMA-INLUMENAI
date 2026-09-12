import React from 'react';
import { IsotipoMaestroVector, BrandWordmark, UtilitarianIcon } from './BrandLogos';
import { ActivePage, ServiceId } from '../types';
import { SERVICES } from '../data/brandData';
import { getSiteConfig, SiteConfig } from '../utils/store';
import { useEffect, useState } from 'react';

interface FooterProps {
  isNegative?: boolean;
  onNavigate: (page: ActivePage) => void;
  onSelectService: (id: ServiceId) => void;
}

export const Footer: React.FC<FooterProps> = ({
  isNegative = false,
  onNavigate,
  onSelectService
}) => {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    setConfig(getSiteConfig());
  }, []);

  return (

    <footer
      className={`border-t pt-16 pb-12 transition-colors text-left ${
        isNegative
          ? 'bg-[#060C04] border-[#FEFAE8]/10 text-[#FEFAE8]'
          : 'bg-[#FEFAE8] border-[#060C04]/10 text-[#060C04]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <IsotipoMaestroVector width={36} height={36} isNegative={isNegative} />
              <BrandWordmark isNegative={isNegative} />
            </div>
            <p className="font-aeonik italic text-sm text-[#3D80FD] font-semibold">
              "En la luz de cada idea."
            </p>
            <p className={`font-general text-xs leading-relaxed max-w-sm ${
              isNegative ? 'text-[#FEFAE8]/70' : 'text-[#060C04]/70'
            }`}>
              Marca Matrix multiservicios nicaragüense con proyección hispanoamericana. Una década integrando disciplinas creativas, audiovisuales, espaciales y tecnológicas con IA.
            </p>
            <div className="pt-2">
              <a
                href={`mailto:${config?.contactEmail || 'inlumenaihma@gmail.com'}`}
                className="font-general text-xs inline-flex items-center gap-1.5 text-[#3D80FD] hover:underline"
              >
                <UtilitarianIcon name="email" size={14} color="#3D80FD" />
                <span>{config?.contactEmail || 'inlumenaihma@gmail.com'}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-dosis text-base font-bold uppercase tracking-wider text-[#3D80FD]">
              Navegación
            </h4>
            <ul className="space-y-2 font-general text-xs">
              <li>
                <button
                  onClick={() => onNavigate({ type: 'home' })}
                  className="hover:text-[#3D80FD] cursor-pointer"
                >
                  Inicio Ecosistema
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'trajectory' })}
                  className="hover:text-[#3D80FD] cursor-pointer"
                >
                  Trayectoria 2016 → 2026
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'colors' })}
                  className="hover:text-[#3D80FD] cursor-pointer"
                >
                  Sistema Cromático (Colores)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'contact' })}
                  className="hover:text-[#3D80FD] cursor-pointer"
                >
                  Contacto & Asesoría
                </button>
              </li>
            </ul>
          </div>

          {/* Services Group 1 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-dosis text-base font-bold uppercase tracking-wider text-[#3D80FD]">
              Los 12 Servicios (I)
            </h4>
            <ul className="space-y-1.5 font-general text-xs opacity-80">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => onSelectService(s.id)}
                    className="hover:text-[#3D80FD] cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span className="font-bold font-aeonik text-[11px]" style={{ color: s.luzColor }}>{s.letter}</span>
                    <span>· {s.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Group 2 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-dosis text-base font-bold uppercase tracking-wider text-[#3D80FD]">
              Los 12 Servicios (II)
            </h4>
            <ul className="space-y-1.5 font-general text-xs opacity-80">
              {SERVICES.slice(6, 12).map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => onSelectService(s.id)}
                    className="hover:text-[#3D80FD] cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span className="font-bold font-aeonik text-[11px]" style={{ color: s.luzColor }}>{s.letter}</span>
                    <span>· {s.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Utilitarian Social & Contact Bar matching official iconography */}
        <div className="pt-8 border-t border-current/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center flex-wrap gap-2.5 sm:gap-3">
            {/* 1. WhatsApp */}
            <a
              href={config?.socialWhatsapp || 'https://wa.me/50584620554'}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                isNegative
                  ? 'border-[#FEFAE8]/15 bg-[#FEFAE8]/5 hover:bg-[#FEFAE8]/15 text-[#FEFAE8]'
                  : 'border-[#060C04]/15 bg-white hover:bg-[#060C04]/5 text-[#060C04] shadow-xs'
              }`}
              title="WhatsApp Oficial"
            >
              <UtilitarianIcon name="whatsapp" size={18} />
            </a>

            {/* 2. Phone */}
            <a
              href={`tel:${(config?.contactPhone || '+50584620554').replace(/\s+/g, '')}`}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                isNegative
                  ? 'border-[#FEFAE8]/15 bg-[#FEFAE8]/5 hover:bg-[#FEFAE8]/15 text-[#FEFAE8]'
                  : 'border-[#060C04]/15 bg-white hover:bg-[#060C04]/5 text-[#060C04] shadow-xs'
              }`}
              title="Llamada Telefónica"
            >
              <UtilitarianIcon name="phone" size={18} />
            </a>

            {/* 3. Email */}
            <a
              href={`mailto:${config?.contactEmail || 'inlumenaihma@gmail.com'}`}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                isNegative
                  ? 'border-[#FEFAE8]/15 bg-[#FEFAE8]/5 hover:bg-[#FEFAE8]/15 text-[#FEFAE8]'
                  : 'border-[#060C04]/15 bg-white hover:bg-[#060C04]/5 text-[#060C04] shadow-xs'
              }`}
              title="Email de Contacto"
            >
              <UtilitarianIcon name="email" size={18} />
            </a>

            {/* 4. Website */}
            <button
              type="button"
              onClick={() => {
                onNavigate({ type: 'home' });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                isNegative
                  ? 'border-[#FEFAE8]/15 bg-[#FEFAE8]/5 hover:bg-[#FEFAE8]/15 text-[#FEFAE8]'
                  : 'border-[#060C04]/15 bg-white hover:bg-[#060C04]/5 text-[#060C04] shadow-xs'
              }`}
              title="Portal Web HMA INLUMENAI"
            >
              <UtilitarianIcon name="website" size={18} />
            </button>

            {/* 5. Instagram */}
            {config?.socialInstagram && (
              <a
                href={config.socialInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                  isNegative
                    ? 'border-[#FEFAE8]/15 bg-[#FEFAE8]/5 hover:bg-[#FEFAE8]/15 text-[#FEFAE8]'
                    : 'border-[#060C04]/15 bg-white hover:bg-[#060C04]/5 text-[#060C04] shadow-xs'
                }`}
                title="Instagram Oficial"
              >
                <UtilitarianIcon name="instagram" size={18} />
              </a>
            )}

            {/* 6. Facebook */}
            {config?.socialFacebook && (
              <a
                href={config.socialFacebook}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                  isNegative
                    ? 'border-[#FEFAE8]/15 bg-[#FEFAE8]/5 hover:bg-[#FEFAE8]/15 text-[#FEFAE8]'
                    : 'border-[#060C04]/15 bg-white hover:bg-[#060C04]/5 text-[#060C04] shadow-xs'
                }`}
                title="Facebook Oficial"
              >
                <UtilitarianIcon name="facebook" size={18} />
              </a>
            )}

            {/* 7. YouTube */}
            {config?.socialYoutube && (
              <a
                href={config.socialYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                  isNegative
                    ? 'border-[#FEFAE8]/15 bg-[#FEFAE8]/5 hover:bg-[#FEFAE8]/15 text-[#FEFAE8]'
                    : 'border-[#060C04]/15 bg-white hover:bg-[#060C04]/5 text-[#060C04] shadow-xs'
                }`}
                title="Canal de YouTube"
              >
                <UtilitarianIcon name="youtube" size={18} />
              </a>
            )}
          </div>

          <p className={`font-general text-xs ${isNegative ? 'text-[#FEFAE8]/50' : 'text-[#060C04]/50'}`}>
            © 2016–2026 HMA INLUMENAI. Todos los derechos reservados. {config?.showLocation && config?.locationAddress ? config.locationAddress : 'Servicio Actualmente en Línea'}.
          </p>
        </div>
      </div>
    </footer>
  );
};
