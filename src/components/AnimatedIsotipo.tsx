import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ShapeDefinition } from '../types';
import { MASTER_SHAPES } from '../data/brandData';
import { RotateCw } from 'lucide-react';

interface AnimatedIsotipoProps {
  shapes: ShapeDefinition[];
  serviceId?: string;
  isServiceView?: boolean;
  className?: string;
  isNegative?: boolean;
  onTransitionComplete?: () => void;
  allowReplay?: boolean;
}

export interface AnimatedIsotipoRef {
  transitionToMaster: () => void;
  replay: () => void;
}

export const AnimatedIsotipo = React.forwardRef<AnimatedIsotipoRef, AnimatedIsotipoProps>(({
  shapes,
  serviceId = 'master',
  isServiceView = false,
  className = '',
  isNegative = false,
  onTransitionComplete,
  allowReplay = true
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isConsolidated, setIsConsolidated] = useState(false);
  const [currentDisplayMode, setCurrentDisplayMode] = useState<'service' | 'master'>(isServiceView ? 'service' : 'master');
  const [hasPlayedInSession, setHasPlayedInSession] = useState(false);

  const TARGET_CENTER = 540;
  const CLOCK_RADIUS = 360;
  const UNIT_M = 67;

  // Identify point/circle shape (1:1 ratio)
  const findPointPiece = (shapeList: ShapeDefinition[]) => {
    return shapeList.find(s => Math.abs(s.length - s.width) < 0.01) || shapeList[0];
  };

  // Calculate the 12 positions of clock around center (540, 540)
  const calculateClockPositions = (shapeList: ShapeDefinition[]) => {
    const pointShape = findPointPiece(shapeList);
    const otherShapes = shapeList
      .filter(s => s.id !== pointShape.id)
      .sort((a, b) => a.id.localeCompare(b.id));

    const map: Record<string, { x: number; y: number; hour: number }> = {};
    otherShapes.forEach((shape, i) => {
      const hour = i + 1;
      const angleRad = ((hour * 30 - 90) * Math.PI) / 180;
      map[shape.id] = {
        x: TARGET_CENTER + CLOCK_RADIUS * Math.cos(angleRad),
        y: TARGET_CENTER + CLOCK_RADIUS * Math.sin(angleRad),
        hour
      };
    });
    // Point piece stays dead center
    map[pointShape.id] = { x: TARGET_CENTER, y: TARGET_CENTER, hour: 0 };
    return map;
  };

  // Play entry animation (Nacimiento -> Reloj -> Metamorfosis -> Consolidado)
  const playEntryAnimation = (targetShapes: ShapeDefinition[], skipAnim = false) => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const clockPos = calculateClockPositions(targetShapes);
    const sortedShapes = [...targetShapes].sort((a, b) => a.id.localeCompare(b.id));

    if (skipAnim) {
      // Instant consolidation for prefers-reduced-motion or repeated session visit
      targetShapes.forEach(shape => {
        gsap.set(`#g-${serviceId}-${shape.id}`, {
          x: shape.x,
          y: shape.y,
          rotation: shape.rotation
        });
        gsap.set(`#rect-${serviceId}-${shape.id}`, {
          attr: {
            width: shape.width,
            height: shape.length,
            rx: shape.width / 2,
            ry: shape.width / 2
          },
          x: -shape.width / 2,
          y: -shape.length / 2,
          fill: shape.color,
          scale: 1,
          opacity: 1
        });
      });
      setIsConsolidated(true);
      return;
    }

    // Reset to birth state
    targetShapes.forEach(shape => {
      gsap.set(`#g-${serviceId}-${shape.id}`, { x: TARGET_CENTER, y: TARGET_CENTER, rotation: 0 });
      gsap.set(`#rect-${serviceId}-${shape.id}`, {
        attr: { width: UNIT_M, height: UNIT_M, rx: UNIT_M / 2, ry: UNIT_M / 2 },
        x: -UNIT_M / 2,
        y: -UNIT_M / 2,
        fill: shape.color,
        scale: 0,
        opacity: 0
      });
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsConsolidated(true);
        sessionStorage.setItem(`hma_anim_played_${serviceId}`, 'true');
        setHasPlayedInSession(true);
      }
    });
    timelineRef.current = tl;

    // 1. Nacimiento escalonado
    sortedShapes.forEach((shape, i) => {
      tl.to(
        `#rect-${serviceId}-${shape.id}`,
        { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.5)' },
        i * 0.02
      );
    });

    // 2. Reloj
    tl.addLabel('clock_stage', '+=0.2');
    sortedShapes.forEach(shape => {
      const target = clockPos[shape.id];
      tl.to(
        `#g-${serviceId}-${shape.id}`,
        {
          x: target.x,
          y: target.y,
          rotation: 0,
          duration: 0.9,
          ease: 'power3.inOut'
        },
        'clock_stage+=0.02'
      );
    });

    // 3. Metamorfosis a Isotipo Consolidado
    tl.addLabel('morph_stage', '+=0.25');
    targetShapes.forEach(shape => {
      tl.to(
        `#g-${serviceId}-${shape.id}`,
        {
          x: shape.x,
          y: shape.y,
          rotation: shape.rotation,
          duration: 1.15,
          ease: 'power3.inOut'
        },
        'morph_stage'
      );
      tl.to(
        `#rect-${serviceId}-${shape.id}`,
        {
          attr: {
            width: shape.width,
            height: shape.length,
            rx: shape.width / 2,
            ry: shape.width / 2
          },
          x: -shape.width / 2,
          y: -shape.length / 2,
          duration: 1.15,
          ease: 'power3.inOut'
        },
        'morph_stage'
      );
    });

    // Final hold (stops here permanently, no loop)
  };

  // Section 5.3: Transición Servicio -> Maestro
  const transitionToMaster = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const currentShapes = shapes;
    const masterClockPos = calculateClockPositions(MASTER_SHAPES);
    const sortedShapes = [...currentShapes].sort((a, b) => a.id.localeCompare(b.id));

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentDisplayMode('master');
        setIsConsolidated(true);
        if (onTransitionComplete) onTransitionComplete();
      }
    });
    timelineRef.current = tl;

    // 1. Retorno al reloj desde la posición del servicio
    tl.addLabel('return_clock');
    sortedShapes.forEach(shape => {
      const target = masterClockPos[shape.id] || { x: TARGET_CENTER, y: TARGET_CENTER };
      tl.to(
        `#g-${serviceId}-${shape.id}`,
        {
          x: target.x,
          y: target.y,
          rotation: 0,
          duration: 0.85,
          ease: 'power3.inOut'
        },
        'return_clock+=0.01'
      );
      tl.to(
        `#rect-${serviceId}-${shape.id}`,
        {
          attr: {
            width: UNIT_M,
            height: UNIT_M,
            rx: UNIT_M / 2,
            ry: UNIT_M / 2
          },
          x: -UNIT_M / 2,
          y: -UNIT_M / 2,
          duration: 0.85,
          ease: 'power3.inOut'
        },
        'return_clock'
      );
    });

    // 2. Convergencia central y salto a color de Marca Madre (#3D80FD / #2D60C1)
    tl.addLabel('collapse');
    sortedShapes.forEach(shape => {
      const masterEquivalent = MASTER_SHAPES.find(m => m.id === shape.id) || MASTER_SHAPES[0];
      tl.to(
        `#g-${serviceId}-${shape.id}`,
        {
          x: TARGET_CENTER,
          y: TARGET_CENTER,
          duration: 0.65,
          ease: 'power3.inOut'
        },
        'collapse'
      );
      tl.to(
        `#rect-${serviceId}-${shape.id}`,
        {
          fill: masterEquivalent.color,
          duration: 0.65,
          ease: 'power3.inOut'
        },
        'collapse'
      );
    });

    // 3. Formación de Reloj Maestro
    tl.addLabel('master_clock', '+=0.1');
    MASTER_SHAPES.forEach(mShape => {
      const target = masterClockPos[mShape.id];
      tl.to(
        `#g-${serviceId}-${mShape.id}`,
        {
          x: target.x,
          y: target.y,
          rotation: 0,
          duration: 0.8,
          ease: 'power3.inOut'
        },
        'master_clock+=0.01'
      );
      tl.to(
        `#rect-${serviceId}-${mShape.id}`,
        {
          attr: {
            width: UNIT_M,
            height: UNIT_M,
            rx: UNIT_M / 2,
            ry: UNIT_M / 2
          },
          x: -UNIT_M / 2,
          y: -UNIT_M / 2,
          fill: mShape.color,
          duration: 0.8,
          ease: 'power3.inOut'
        },
        'master_clock'
      );
    });

    // 4. Metamorfosis final hacia Isotipo Maestro
    tl.addLabel('master_morph', '+=0.2');
    MASTER_SHAPES.forEach(mShape => {
      tl.to(
        `#g-${serviceId}-${mShape.id}`,
        {
          x: mShape.x,
          y: mShape.y,
          rotation: mShape.rotation,
          duration: 1.1,
          ease: 'power3.inOut'
        },
        'master_morph'
      );
      tl.to(
        `#rect-${serviceId}-${mShape.id}`,
        {
          attr: {
            width: mShape.width,
            height: mShape.length,
            rx: mShape.width / 2,
            ry: mShape.width / 2
          },
          x: -mShape.width / 2,
          y: -mShape.length / 2,
          fill: mShape.color,
          duration: 1.1,
          ease: 'power3.inOut'
        },
        'master_morph'
      );
    });
  };

  // Replay
  const replay = () => {
    setCurrentDisplayMode('service');
    playEntryAnimation(shapes, false);
  };

  React.useImperativeHandle(ref, () => ({
    transitionToMaster,
    replay
  }));

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    // Check session storage
    const played = sessionStorage.getItem(`hma_anim_played_${serviceId}`) === 'true';
    setHasPlayedInSession(played);

    const shouldSkip = prefersReducedMotion || played;
    playEntryAnimation(shapes, shouldSkip);

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [serviceId]);

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center justify-center ${className}`}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1080 1080"
        className="w-full h-full max-w-[500px] max-h-[500px] drop-shadow-sm select-none"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={
          currentDisplayMode === 'master'
            ? 'Isotipo Maestro HMA INLUMENAI'
            : `Isotipo animado ${serviceId}`
        }
      >
        <g id={`master-rotation-${serviceId}`}>
          <g id={`shapes-layer-${serviceId}`}>
            {shapes.map(shape => (
              <g key={shape.id} id={`g-${serviceId}-${shape.id}`}>
                <rect id={`rect-${serviceId}-${shape.id}`} />
              </g>
            ))}
          </g>
        </g>
      </svg>

      {/* Control discreto de repetición si la animación ya terminó */}
      {allowReplay && isConsolidated && (
        <button
          onClick={replay}
          title="Reproducir animación del isotipo"
          className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-general font-medium transition-all ${
            isNegative
              ? 'text-[#FEFAE8]/60 hover:text-[#FEFAE8] hover:bg-[#FEFAE8]/10'
              : 'text-[#060C04]/60 hover:text-[#060C04] hover:bg-[#060C04]/5'
          }`}
          aria-label="Reproducir animación de nuevo"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Ver animación</span>
        </button>
      )}
    </div>
  );
});
