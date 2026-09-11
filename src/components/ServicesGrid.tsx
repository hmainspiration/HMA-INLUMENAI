import React from 'react';
import { SERVICES } from '../data/brandData';
import { ServiceId } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { getSiteConfig } from '../utils/store';

interface ServicesGridProps {
  isNegative?: boolean;
  onSelectService: (id: ServiceId) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  isNegative = false,
  onSelectService
}) => {
  const config = getSiteConfig();

  return (
    <section id="servicios" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl space-y-2 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-general font-semibold text-[#3D80FD] bg-[#3D80FD]/10">
            <span>CATÁLOGO NORMATIVO</span>
          </div>
          <h2 className="type-h2">
            {config.servicesTitle || 'Los 12 Servicios Especializados'}
          </h2>
          <p className={`type-body ${isNegative ? 'text-[#FEFAE8]/80' : 'text-[#060C04]/80'}`}>
            {config.servicesDescription || 'Cada disciplina opera con autonomía técnica, integrada orgánicamente bajo el rigor de la Marca Matrix.'}
          </p>
        </div>
        <p className={`font-general text-xs max-w-xs ${isNegative ? 'text-[#FEFAE8]/60' : 'text-[#060C04]/60'}`}>
          {config.servicesRuleText || 'Regla de identidad 2.2: peso visual equitativo con acento de subpaleta contenido.'}
        </p>
      </div>

      {/* Grid of 12 Services - 3 columns on desktop, 2 on tablet, 1 on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((service) => {
          return (
            <div
              key={service.id}
              onClick={() => onSelectService(service.id)}
              className={`group relative p-6 sm:p-7 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between text-left ${
                isNegative
                  ? 'bg-[#060C04] border-[#FEFAE8]/10 hover:border-[#FEFAE8]/30 hover:bg-[#FEFAE8]/5'
                  : 'bg-white border-[#060C04]/8 hover:border-[#060C04]/20 hover:shadow-md'
              }`}
              style={{
                // Subtle boundary accent respecting rule 2.2 (thin border edge)
                borderTopColor: service.luzColor,
                borderTopWidth: '3px'
              }}
            >
              <div className="space-y-4">
                {/* Header of Card: Letter Badge + Color dot + Cluster */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {/* Contained Badge for Letter */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-aeonik text-sm font-bold shadow-xs"
                      style={{
                        backgroundColor: isNegative ? `${service.luzColor}22` : `${service.luzColor}15`,
                        color: service.luzColor
                      }}
                    >
                      {service.letter}
                    </div>
                    {/* Small Color Dot Accent */}
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: service.luzColor }}
                      title={`Subpaleta: ${service.luzColor} / ${service.profundoColor}`}
                    />
                  </div>

                  <span className="font-general text-[11px] uppercase tracking-wider opacity-60 font-medium">
                    {service.cluster.split('—')[0].trim()}
                  </span>
                </div>

                {/* Service Name: Dosis Bold (Section 2.3) */}
                <div>
                  <h3 className="font-dosis text-2xl font-bold tracking-tight text-balance group-hover:text-[#3D80FD] transition-colors">
                    {service.name}
                  </h3>
                  <p className="font-general text-xs font-medium text-opacity-80 mt-1 opacity-70">
                    {service.tagline}
                  </p>
                </div>

                {/* Body description in General Sans */}
                <p className={`font-general text-sm line-clamp-3 leading-relaxed ${
                  isNegative ? 'text-[#FEFAE8]/75' : 'text-[#060C04]/75'
                }`}>
                  {service.description}
                </p>
              </div>

              {/* Card Footer: Deliverables snippet + arrow */}
              <div className="pt-6 mt-6 border-t border-current/10 flex items-center justify-between">
                <span className="font-general text-xs font-semibold text-[#3D80FD] group-hover:underline">
                  Ver especificación completa
                </span>
                <div className={`p-1.5 rounded-full transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                  isNegative ? 'bg-[#FEFAE8]/10' : 'bg-[#060C04]/5'
                }`}>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
