import React from 'react';
import { SERVICES } from '../data/brandData';
import { ServiceId } from '../types';
import { Layers, Circle, Compass } from 'lucide-react';
import { getSiteConfig } from '../utils/store';

interface ArchitectureSectionProps {
  isNegative?: boolean;
  onSelectService: (id: ServiceId) => void;
}

export const ArchitectureSection: React.FC<ArchitectureSectionProps> = ({
  isNegative = false,
  onSelectService
}) => {
  const config = getSiteConfig();

  return (
    <section id="ecosistema" className="py-20 border-y transition-colors"
      style={{
        borderColor: isNegative ? 'rgba(254, 250, 232, 0.08)' : 'rgba(6, 12, 4, 0.08)',
        backgroundColor: isNegative ? 'rgba(6, 12, 4, 0.4)' : 'rgba(254, 250, 232, 0.4)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-general font-semibold text-[#3D80FD] bg-[#3D80FD]/10">
            <Compass className="w-3.5 h-3.5" />
            <span>ESTRUCTURA DE MARCA NORMATIVA</span>
          </div>
          <h2 className="type-h2">
            {config.archTitle || 'La Arquitectura de la Luz'}
          </h2>
          <p className={`type-body ${isNegative ? 'text-[#FEFAE8]/80' : 'text-[#060C04]/80'}`}>
            {config.archDescription || 'HMA no es una suma dispersa de servicios: es una disciplina geométrica y conceptual. Un único sistema matricial que da respuesta a las necesidades creativas y tecnológicas modernas.'}
          </p>
        </div>

        {/* The 3 Core Pillars in Flat Sophisticated Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Marca Matrix */}
          <div className={`p-8 rounded-2xl border transition-all ${
            isNegative ? 'bg-[#FEFAE8]/5 border-[#FEFAE8]/10' : 'bg-white border-[#060C04]/8 shadow-sm'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-[#3D80FD]/10 text-[#3D80FD] flex items-center justify-center mb-6">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="type-h3 mb-2">{config.archCard1Title || '1 Marca Matrix'}</h3>
            <p className={`type-body text-sm ${isNegative ? 'text-[#FEFAE8]/75' : 'text-[#060C04]/75'}`}>
              <span dangerouslySetInnerHTML={{ __html: config.archCard1Desc.replace('HMA INLUMENAI', '<strong>HMA INLUMENAI</strong>') }} />
            </p>
            <div className="mt-6 pt-4 border-t border-current/10 font-general text-xs font-semibold text-[#3D80FD]">
              {config.archCard1Sub || '"Un ecosistema, no una lista de proveedores."'}
            </div>
          </div>

          {/* Pillar 2: 12 Servicios Especializados */}
          <div className={`p-8 rounded-2xl border transition-all ${
            isNegative ? 'bg-[#FEFAE8]/5 border-[#FEFAE8]/10' : 'bg-white border-[#060C04]/8 shadow-sm'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-[#2D60C1]/10 text-[#2D60C1] flex items-center justify-center mb-6">
              <span className="font-aeonik text-lg font-bold">12</span>
            </div>
            <h3 className="type-h3 mb-2">{config.archCard2Title || '12 Servicios'}</h3>
            <p className={`type-body text-sm ${isNegative ? 'text-[#FEFAE8]/75' : 'text-[#060C04]/75'}`}>
              <span dangerouslySetInnerHTML={{ __html: config.archCard2Desc.replace('HMAINLUMENAI', '<strong>HMAINLUMENAI</strong>') }} />
            </p>
            <div className="mt-6 pt-4 border-t border-current/10 font-general text-xs font-semibold text-[#2D60C1]">
              {config.archCard2Sub || 'De Heritage (H) a Illustrations (I)'}
            </div>
          </div>

          {/* Pillar 3: 13 Formas / 1 Eje Central */}
          <div className={`p-8 rounded-2xl border transition-all ${
            isNegative ? 'bg-[#FEFAE8]/5 border-[#FEFAE8]/10' : 'bg-white border-[#060C04]/8 shadow-sm'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-[#3D80FD]/10 text-[#3D80FD] flex items-center justify-center mb-6">
              <Circle className="w-6 h-6 fill-current" />
            </div>
            <h3 className="type-h3 mb-2">{config.archCard3Title || '13 Formas Geométricas'}</h3>
            <p className={`type-body text-sm ${isNegative ? 'text-[#FEFAE8]/75' : 'text-[#060C04]/75'}`}>
              <span dangerouslySetInnerHTML={{ __html: config.archCard3Desc.replace('1 Círculo Central Constante (Forma #13)', '<strong>1 Círculo Central Constante (Forma #13)</strong>') }} />
            </p>
            <div className="mt-6 pt-4 border-t border-current/10 font-general text-xs font-semibold text-[#3D80FD]">
              {config.archCard3Sub || 'Forma #13: Proporción 1:1 invariable'}
            </div>
          </div>
        </div>

        {/* Acronym Visualizer: H-M-A-I-N-L-U-M-E-N-A-I */}
        <div className={`p-6 sm:p-8 rounded-2xl border ${
          isNegative ? 'bg-[#060C04] border-[#FEFAE8]/10' : 'bg-white/80 border-[#060C04]/8'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <p className="font-general text-xs tracking-wider uppercase font-semibold text-[#3D80FD]">
                El Acrónimo de Identidad
              </p>
              <h4 className="font-dosis text-xl font-bold mt-0.5">
                Las 12 Letras del Ecosistema HMAINLUMENAI
              </h4>
            </div>
            <p className="text-xs opacity-60 font-general">
              Haz clic en cualquier letra para examinar su disciplina especializada
            </p>
          </div>

          {/* Acronym Strip */}
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2 sm:gap-3">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelectService(s.id)}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all group cursor-pointer ${
                  isNegative
                    ? 'hover:bg-[#FEFAE8]/10 border-[#FEFAE8]/10'
                    : 'hover:bg-[#060C04]/5 border-[#060C04]/10'
                }`}
                style={{
                  borderLeftColor: s.luzColor,
                  borderLeftWidth: '3px'
                }}
                title={`${s.letter} · ${s.name}`}
              >
                <span className="font-aeonik text-2xl font-bold group-hover:scale-110 transition-transform" style={{ color: s.luzColor }}>
                  {s.letter}
                </span>
                <span className="font-general text-[11px] font-medium tracking-tight truncate max-w-[65px] mt-1 opacity-80">
                  {s.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
