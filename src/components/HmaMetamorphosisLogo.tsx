import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface HmaMetamorphosisLogoProps {
  className?: string;
  autoPlay?: boolean;
  showControls?: boolean;
  compact?: boolean;
}

interface LogoElement {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  rot: number;
  fill: string;
}

// 1. DEFINICIÓN EXACTA CALIBRADA DE LOS 13 ELEMENTOS (Real definitivo.html)
const LOGO_ELEMENTS: LogoElement[] = [
  // 1. Círculo
  { id: 1,  x: 717.00, y: 714.00, w: 77.7,  h: 77.7, rot: 0,   fill: '#0057FF' },
  
  // 2. Largo Superior
  { id: 2,  x: 667.50, y: 335.10, w: 466.0, h: 77.7, rot: 45,  fill: '#002060' },
  
  // 3. Mediano Superior
  { id: 3,  x: 650.00, y: 462.40, w: 310.6, h: 77.7, rot: 45,  fill: '#0057FF' },
  
  // 4. Corto Superior
  { id: 4,  x: 685.90, y: 425.90, w: 180.1, h: 77.7, rot: -45, fill: '#0057FF' },
  
  // 5. Largo Inferior
  { id: 5,  x: 612.30, y: 908.50, w: 466.0, h: 77.7, rot: 45,  fill: '#0070C0' },
  
  // 6. Mediano Inferior
  { id: 6,  x: 630.40, y: 781.30, w: 310.6, h: 77.7, rot: 45,  fill: '#002060' },
  
  // 7. Corto Inferior Izquierdo
  { id: 7,  x: 512.10, y: 734.40, w: 183.0, h: 77.7, rot: -44, fill: '#002060' },
  
  // 8. Corto Inferior Centro
  { id: 8,  x: 603.80, y: 827.30, w: 180.1, h: 77.7, rot: -45, fill: '#0070C0' },
  
  // 9. Largo Derecho
  { id: 9,  x: 926.30, y: 649.30, w: 466.0, h: 77.7, rot: -45, fill: '#002060' },
  
  // 10. Largo Izquierdo
  { id: 10, x: 353.40, y: 594.20, w: 466.0, h: 77.7, rot: -45, fill: '#0070C0' },
  
  // 11. Mediano Izquierdo
  { id: 11, x: 480.90, y: 611.80, w: 310.6, h: 77.7, rot: -45, fill: '#002060' },
  
  // 12. Píldora Horizontal (Azul Eléctrico) -> Inclinación exacta -4° (176°)
  { id: 12, x: 524.50, y: 532.30, w: 158.0, h: 77.7, rot: 176,  fill: '#0057FF' },
  
  // 13. Píldora Vertical (Azul Marino) -> Giro exacto 94°
  { id: 13, x: 487.98, y: 495.79, w: 158.0, h: 77.7, rot: 94,   fill: '#002060' }
];

// 2. CONFIGURACIÓN DEL RELOJ
const CLOCK_CX = 640;
const CLOCK_CY = 625;
const CLOCK_R = 390;
const CIRCLE_SIZE = 77.7; // Diámetro cuando están en modo esfera

// 12 posiciones horarias (1:00 a 12:00) + 1 posición central (elemento 13)
const CLOCK_POSITIONS = LOGO_ELEMENTS.map((_, index) => {
  if (index < 12) {
    const hour = index + 1; // 1, 2, 3... 12
    const angleDeg = hour * 30 - 90; // 12 en -90° (arriba)
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: CLOCK_CX + CLOCK_R * Math.cos(angleRad),
      y: CLOCK_CY + CLOCK_R * Math.sin(angleRad),
    };
  } else {
    // Elemento 13: Centro exacto del reloj
    return {
      x: CLOCK_CX,
      y: CLOCK_CY,
    };
  }
});

export const HmaMetamorphosisLogo: React.FC<HmaMetamorphosisLogoProps> = ({
  className = 'w-full max-w-[500px] aspect-square',
  autoPlay = true,
  showControls = true,
  compact = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<SVGSVGElement>(null);
  const clockGuidesRef = useRef<SVGGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [phaseName, setPhaseName] = useState<string>('1. Nacimiento de las 13 Esferas');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Crear Timeline idéntico a Real definitivo.html
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 3.0, paused: !autoPlay });
      timelineRef.current = tl;

      // PASO 1: Nacimiento de los 13 círculos
      tl.call(() => {
        setPhaseName('1. Nacimiento de las 13 Esferas');
      });

      if (clockGuidesRef.current) {
        tl.to(clockGuidesRef.current, { opacity: 0.85, duration: 0.8 });
      }

      LOGO_ELEMENTS.forEach((_, i) => {
        tl.fromTo(
          `#node-rect-${i}`,
          { scale: 0, opacity: 0, transformOrigin: 'center' },
          { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.8)' },
          i * 0.04
        );
      });

      // PASO 2: Viaje para formar el Reloj Análogo (1 al 12 + Centro)
      tl.call(
        () => {
          setPhaseName('2. Formación del Reloj Análogo');
        },
        undefined,
        '+=0.2'
      );

      LOGO_ELEMENTS.forEach((_, i) => {
        const target = CLOCK_POSITIONS[i];
        tl.to(
          `#node-g-${i}`,
          {
            x: target.x,
            y: target.y,
            duration: 1.5,
            ease: 'power3.inOut',
          },
          0.9 + i * 0.04
        );
      });

      // Pausa de contemplación en forma de reloj con ligera pulsación
      tl.to(
        '.hma-node-rect',
        {
          scale: 1.08,
          duration: 0.35,
          yoyo: true,
          repeat: 1,
          ease: 'power1.inOut',
          stagger: 0.02,
        },
        '+=0.3'
      );

      // PASO 3 y 4: Vuelo hacia el Logotipo + Metamorfosis a Rectángulos Redondeados Exactos
      tl.call(
        () => {
          setPhaseName('3. Metamorfosis hacia el Logotipo');
        },
        undefined,
        '+=0.4'
      );

      if (clockGuidesRef.current) {
        tl.to(clockGuidesRef.current, { opacity: 0, duration: 0.6 }, '<');
      }

      LOGO_ELEMENTS.forEach((item, i) => {
        // Mover a coordenada exacta (item.x, item.y) y rotación real
        tl.to(
          `#node-g-${i}`,
          {
            x: item.x,
            y: item.y,
            rotation: item.rot,
            duration: 1.7,
            ease: 'power3.inOut',
          },
          'morphPhase+=' + i * 0.03
        );

        // Estirar el <rect> a su ancho/alto/radio original de forma milimétrica
        tl.to(
          `#node-rect-${i}`,
          {
            x: -item.w / 2,
            y: -item.h / 2,
            width: item.w,
            height: item.h,
            rx: item.h / 2,
            ry: item.h / 2,
            duration: 1.7,
            ease: 'power3.inOut',
          },
          'morphPhase+=' + i * 0.03
        );
      });

      // PASO 4: Logotipo Final Completado con destello
      tl.call(() => {
        setPhaseName('4. Logotipo Completado');
      });

      if (canvasRef.current) {
        tl.to(canvasRef.current, {
          filter: 'drop-shadow(0 0 28px rgba(20, 229, 195, 0.7))',
          duration: 0.7,
          yoyo: true,
          repeat: 1,
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [autoPlay]);

  const togglePlay = () => {
    if (!timelineRef.current) return;
    if (isPlaying) {
      timelineRef.current.pause();
      setIsPlaying(false);
    } else {
      timelineRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleRestart = () => {
    if (!timelineRef.current) return;
    timelineRef.current.restart();
    setIsPlaying(true);
  };

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center relative w-full">
      {/* Dynamic Badge & Phase Indicator */}
      {!compact && (
        <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#11D7B6]/10 text-[#0C947D] dark:text-[#11D7B6] border border-[#11D7B6]/30 backdrop-blur-md shadow-xs transition-all duration-300">
          <span className="w-2 h-2 rounded-full bg-[#11D7B6] animate-pulse"></span>
          <span className="font-heading font-bold">{phaseName}</span>
        </div>
      )}

      {/* LIENZO SVG (1280x1280 centrado exacto de Real definitivo.html) */}
      <div className={`relative ${className} bg-[#111428]/80 dark:bg-[#080E0B]/90 backdrop-blur-md rounded-3xl border border-white/10 dark:border-white/5 shadow-2xl p-4 sm:p-6 flex items-center justify-center overflow-hidden`}>
        
        {/* Halo resplandor sutil */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0057FF]/10 via-[#14E5C3]/10 to-transparent blur-2xl pointer-events-none" />

        <svg
          ref={canvasRef}
          id="logo-canvas"
          viewBox="0 0 1280 1280"
          className="w-full h-full drop-shadow-[0_0_18px_rgba(0,87,255,0.45)] overflow-visible relative z-10"
        >
          {/* Guía sutil del reloj (se desvanece al pasar al logo) */}
          <g ref={clockGuidesRef} id="clock-guides" opacity={0}>
            <circle
              cx={CLOCK_CX}
              cy={CLOCK_CY}
              r={CLOCK_R}
              fill="none"
              stroke="rgba(20, 229, 195, 0.25)"
              strokeWidth="2.5"
              strokeDasharray="6 8"
            />
            <circle cx={CLOCK_CX} cy={CLOCK_CY} r="6" fill="#14E5C3" opacity="0.6" />
          </g>

          {/* Grupo contenedor de los 13 elementos */}
          <g id="elements-container">
            {LOGO_ELEMENTS.map((item, i) => (
              <g
                key={item.id}
                id={`node-g-${i}`}
                className="hma-node-g"
                transform={`translate(${CLOCK_CX}, ${CLOCK_CY}) rotate(0)`}
              >
                <rect
                  id={`node-rect-${i}`}
                  className="hma-node-rect"
                  x={-CIRCLE_SIZE / 2}
                  y={-CIRCLE_SIZE / 2}
                  width={CIRCLE_SIZE}
                  height={CIRCLE_SIZE}
                  rx={CIRCLE_SIZE / 2}
                  ry={CIRCLE_SIZE / 2}
                  fill={item.fill}
                  opacity={0}
                />
              </g>
            ))}
          </g>
        </svg>
      </div>

      {/* CONTROLES */}
      {showControls && (
        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 active:scale-95 text-gray-900 dark:text-[#FEFAE8] border border-gray-300 dark:border-white/10 transition flex items-center gap-2 cursor-pointer shadow-xs"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 text-[#0057FF] dark:text-[#14E5C3]" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-[#14E5C3]" />
                <span>Reanudar</span>
              </>
            )}
          </button>

          <button
            onClick={handleRestart}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#0057FF] hover:bg-blue-600 active:scale-95 text-white transition shadow-lg shadow-[#0057FF]/30 flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reiniciar</span>
          </button>
        </div>
      )}
    </div>
  );
};
