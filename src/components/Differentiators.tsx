import React from 'react';
import { ShieldCheck, Puzzle, History, Globe2 } from 'lucide-react';
import { getSiteConfig } from '../utils/store';

interface DifferentiatorsProps {
  isNegative?: boolean;
}

export const Differentiators: React.FC<DifferentiatorsProps> = ({ isNegative = false }) => {
  const config = getSiteConfig();

  const points = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#3D80FD]" />,
      title: config.diffCard1Title || 'Un ecosistema, no una lista de proveedores',
      description: config.diffCard1Desc || 'Resolver un proyecto de marca hoy requiere agencias de diseño, productoras audiovisuales, programadores y consultores de imprenta. HMA INLUMENAI integra todas las disciplinas bajo una misma dirección artística y de calidad.'
    },
    {
      icon: <Puzzle className="w-6 h-6 text-[#108591]" />,
      title: config.diffCard2Title || 'Combinaciones que nadie más ofrece juntas',
      description: config.diffCard2Desc || 'Diseño y render de templos religiosos (Architecture), creación de fuentes tipográficas exclusivas (Alphabets), generación de música con IA (Melody) y conservación documental (Heritage). Todo en un solo equipo.'
    },
    {
      icon: <History className="w-6 h-6 text-[#315629]" />,
      title: config.diffCard3Title || 'Diez años de evolución, no una marca improvisada',
      description: config.diffCard3Desc || 'Una trayectoria iniciada en 2016 con HMA Diseños hasta la consolidación como Marca Matrix en 2026. No somos un experimento de fin de semana: contamos con una década de metodología comprobable.'
    },
    {
      icon: <Globe2 className="w-6 h-6 text-[#D96B43]" />,
      title: config.diffCard4Title || 'Cercanía real con el mercado hispanohablante',
      description: config.diffCard4Desc || 'Nacida en Nicaragua con proyección hispanoamericana. Entendemos las dinámicas culturales, la sensibilidad de las comunidades de fe, y las realidades de costos de emprendedores y pequeñas empresas locales.'
    }
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-3xl space-y-3 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-general font-semibold text-[#3D80FD] bg-[#3D80FD]/10">
          <span>PROPUESTA DE VALOR</span>
        </div>
        <h2 className="type-h2">
          {config.diffTitle || 'Por qué el Ecosistema HMA'}
        </h2>
        <p className={`type-body ${isNegative ? 'text-[#FEFAE8]/80' : 'text-[#060C04]/80'}`}>
          {config.diffDescription || 'Principios fundacionales que nos diferencian de agencias genéricas y plataformas automatizadas sin criterio humano.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {points.map((p, idx) => (
          <div
            key={idx}
            className={`p-8 rounded-2xl border text-left flex flex-col justify-between transition-all ${
              isNegative ? 'bg-[#060C04] border-[#FEFAE8]/10 hover:border-[#FEFAE8]/25' : 'bg-white border-[#060C04]/8 hover:border-[#060C04]/20 shadow-sm'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-current/5 flex items-center justify-center mb-6">
                {p.icon}
              </div>
              <h3 className="font-dosis text-2xl font-bold mb-3">
                {p.title}
              </h3>
              <p className={`font-general text-sm leading-relaxed ${
                isNegative ? 'text-[#FEFAE8]/75' : 'text-[#060C04]/75'
              }`}>
                {p.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
