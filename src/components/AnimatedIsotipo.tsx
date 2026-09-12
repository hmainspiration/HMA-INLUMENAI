import React, { useEffect, useRef, useState, useImperativeHandle } from 'react';
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
  resetToService: () => void;
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

  const TARGET_CENTER = 540;
  const CLOCK_RADIUS = 360;
  const UNIT_M = 67;

  // Master Isotype official dynamic colors matching IsotipoMaestroVector
  const getMasterShapes = (isNeg: boolean): ShapeDefinition[] => {
    const cLuz = isNeg ? '#FEFAE8' : '#3D80FD';
    const cProfundo = isNeg ? '#3D80FD' : '#2D60C1';
    return MASTER_SHAPES.map(s => ({
      ...s,
      color: s.color === '#2D60C1' ? cProfundo : cLuz
    }));
  };

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
    // Point piece stays center
    map[pointShape.id] = { x: TARGET_CENTER, y: TARGET_CENTER, hour: 0 };
    return map;
  };

  // Reorganizar el orden de capas (Z-Index) en el DOM SVG para evitar solapamientos incorrectos
  const reorderDomLayering = (orderedShapes: ShapeDefinition[]) => {
    const layer = svgRef.current?.querySelector(`#shapes-layer-${serviceId}`);
    if (layer) {
      orderedShapes.forEach(shape => {
        const el = layer.querySelector(`#g-${serviceId}-${shape.id}`);
        if (el) {
          layer.appendChild(el);
        }
      });
    }
  };

  // Play entry animation (Nacimiento -> Reloj -> Metamorfosis -> Consolidado)
  const playEntryAnimation = (targetShapes: ShapeDefinition[], skipAnim = false) => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    reorderDomLayering(targetShapes);
    const clockPos = calculateClockPositions(targetShapes);
    const sortedShapes = [...targetShapes].sort((a, b) => a.id.localeCompare(b.id));

    if (skipAnim) {
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

    setIsConsolidated(false);
    const tl = gsap.timeline({
      onComplete: () => {
        setIsConsolidated(true);
      }
    });
    timelineRef.current = tl;

    // Reset initial state: centered circle pills
    sortedShapes.forEach(shape => {
      gsap.set(`#g-${serviceId}-${shape.id}`, {
        x: TARGET_CENTER,
        y: TARGET_CENTER,
        rotation: 0
      });
      gsap.set(`#rect-${serviceId}-${shape.id}`, {
        attr: {
          width: UNIT_M,
          height: UNIT_M,
          rx: UNIT_M / 2,
          ry: UNIT_M / 2
        },
        x: -UNIT_M / 2,
        y: -UNIT_M / 2,
        fill: shape.color,
        scale: 0,
        opacity: 0
      });
    });

    // 1. Nacimiento (Aparición escalonada)
    tl.addLabel('birth');
    sortedShapes.forEach((shape, index) => {
      tl.to(
        `#rect-${serviceId}-${shape.id}`,
        {
          scale: 1,
          opacity: 1,
          duration: 0.65,
          ease: 'back.out(1.7)'
        },
        `birth+=${index * 0.045}`
      );
    });

    // 2. Formación de Reloj
    tl.addLabel('clock_stage', '+=0.1');
    sortedShapes.forEach(shape => {
      const pos = clockPos[shape.id] || { x: TARGET_CENTER, y: TARGET_CENTER };
      tl.to(
        `#g-${serviceId}-${shape.id}`,
        {
          x: pos.x,
          y: pos.y,
          rotation: 0,
          duration: 0.9,
          ease: 'power3.inOut'
        },
        'clock_stage'
      );
    });

    // 3. Metamorfosis a forma final
    tl.addLabel('morph_stage', '+=0.2');
    sortedShapes.forEach(shape => {
      tl.to(
        `#g-${serviceId}-${shape.id}`,
        {
          x: shape.x,
          y: shape.y,
          rotation: shape.rotation,
          duration: 1.1,
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
          fill: shape.color,
          duration: 1.1,
          ease: 'power3.inOut'
        },
        'morph_stage'
      );
    });
  };

  // Transición Completa de 3 Actos: Servicio -> Maestro -> Retorno a Servicio
  const transitionToMaster = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const officialMasterShapes = getMasterShapes(isNegative);
    const serviceClockPos = calculateClockPositions(shapes);
    const masterClockPos = calculateClockPositions(officialMasterShapes);
    const sortedServiceShapes = [...shapes].sort((a, b) => a.id.localeCompare(b.id));
    const sortedMasterShapes = [...officialMasterShapes].sort((a, b) => a.id.localeCompare(b.id));

    // Garantizar que iniciamos firmemente en la geometría consolidada del servicio
    shapes.forEach(shape => {
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

    setIsConsolidated(false);
    setCurrentDisplayMode('master');

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentDisplayMode('service');
        setIsConsolidated(true);
        if (onTransitionComplete) onTransitionComplete();
      }
    });
    timelineRef.current = tl;

    // ==========================================
    // ACTO 1: RETORNO DEL SERVICIO AL RELOJ & CONVERGENCIA
    // ==========================================
    tl.addLabel('serv_return_clock');
    sortedServiceShapes.forEach(shape => {
      const target = serviceClockPos[shape.id] || { x: TARGET_CENTER, y: TARGET_CENTER };
      tl.to(
        `#g-${serviceId}-${shape.id}`,
        {
          x: target.x,
          y: target.y,
          rotation: 0,
          duration: 0.9,
          ease: 'power3.inOut'
        },
        'serv_return_clock+=0.01'
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
          duration: 0.9,
          ease: 'power3.inOut'
        },
        'serv_return_clock'
      );
    });

    // Convergencia central y salto cromático hacia Marca Madre (#3D80FD / #2D60C1)
    tl.addLabel('serv_to_master_collapse', '+=0.05');
    sortedServiceShapes.forEach(shape => {
      const masterEquivalent = officialMasterShapes.find(m => m.id === shape.id) || officialMasterShapes[0];
      tl.to(
        `#g-${serviceId}-${shape.id}`,
        {
          x: TARGET_CENTER,
          y: TARGET_CENTER,
          duration: 0.7,
          ease: 'power3.inOut'
        },
        'serv_to_master_collapse'
      );
      tl.to(
        `#rect-${serviceId}-${shape.id}`,
        {
          fill: masterEquivalent.color,
          duration: 0.7,
          ease: 'power3.inOut'
        },
        'serv_to_master_collapse'
      );
    });

    // ==========================================
    // ACTO 2: FORMACIÓN DE RELOJ MAESTRO & METAMORFOSIS AL ISOTIPO MAESTRO
    // ==========================================
    tl.addLabel('master_clock_expand', '+=0.1');
    tl.call(() => {
      reorderDomLayering(officialMasterShapes);
    }, undefined, 'master_clock_expand');

    sortedMasterShapes.forEach(mShape => {
      const target = masterClockPos[mShape.id] || { x: TARGET_CENTER, y: TARGET_CENTER };
      tl.to(
        `#g-${serviceId}-${mShape.id}`,
        {
          x: target.x,
          y: target.y,
          rotation: 0,
          duration: 0.9,
          ease: 'power3.inOut'
        },
        'master_clock_expand+=0.01'
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
          duration: 0.9,
          ease: 'power3.inOut'
        },
        'master_clock_expand'
      );
    });

    // Metamorfosis a Isotipo Maestro
    tl.addLabel('master_morph', '+=0.15');
    officialMasterShapes.forEach(mShape => {
      tl.to(
        `#g-${serviceId}-${mShape.id}`,
        {
          x: mShape.x,
          y: mShape.y,
          rotation: mShape.rotation,
          duration: 1.2,
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
          duration: 1.2,
          ease: 'power3.inOut'
        },
        'master_morph'
      );
    });

    // Hold del Isotipo Maestro (apreciación 2.0s)
    tl.addLabel('master_hold', '+=0.1');
    tl.to({}, { duration: 2.0 });

    // ==========================================
    // ACTO 3: RETORNO DEL MAESTRO AL RELOJ & RETORNO AL ISOTIPO DEL SERVICIO
    // ==========================================
    tl.addLabel('master_return_clock');
    sortedMasterShapes.forEach(mShape => {
      const target = masterClockPos[mShape.id] || { x: TARGET_CENTER, y: TARGET_CENTER };
      tl.to(
        `#g-${serviceId}-${mShape.id}`,
        {
          x: target.x,
          y: target.y,
          rotation: 0,
          duration: 0.9,
          ease: 'power3.inOut'
        },
        'master_return_clock+=0.01'
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
          duration: 0.9,
          ease: 'power3.inOut'
        },
        'master_return_clock'
      );
    });

    // Convergencia central y salto cromático de regreso a la paleta del Servicio
    tl.addLabel('master_to_service_collapse', '+=0.05');
    sortedServiceShapes.forEach(shape => {
      tl.to(
        `#g-${serviceId}-${shape.id}`,
        {
          x: TARGET_CENTER,
          y: TARGET_CENTER,
          duration: 0.7,
          ease: 'power3.inOut'
        },
        'master_to_service_collapse'
      );
      tl.to(
        `#rect-${serviceId}-${shape.id}`,
        {
          fill: shape.color,
          duration: 0.7,
          ease: 'power3.inOut'
        },
        'master_to_service_collapse'
      );
    });

    // Expansión a Reloj del Servicio
    tl.addLabel('service_clock_expand', '+=0.1');
    tl.call(() => {
      reorderDomLayering(shapes);
    }, undefined, 'service_clock_expand');

    sortedServiceShapes.forEach(shape => {
      const target = serviceClockPos[shape.id] || { x: TARGET_CENTER, y: TARGET_CENTER };
      tl.to(
        `#g-${serviceId}-${shape.id}`,
        {
          x: target.x,
          y: target.y,
          rotation: 0,
          duration: 0.9,
          ease: 'power3.inOut'
        },
        'service_clock_expand+=0.01'
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
          fill: shape.color,
          duration: 0.9,
          ease: 'power3.inOut'
        },
        'service_clock_expand'
      );
    });

    // Metamorfosis final de vuelta al Isotipo del Servicio
    tl.addLabel('service_final_morph', '+=0.15');
    shapes.forEach(shape => {
      tl.to(
        `#g-${serviceId}-${shape.id}`,
        {
          x: shape.x,
          y: shape.y,
          rotation: shape.rotation,
          duration: 1.2,
          ease: 'power3.inOut'
        },
        'service_final_morph'
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
          fill: shape.color,
          duration: 1.2,
          ease: 'power3.inOut'
        },
        'service_final_morph'
      );
    });
  };

  // Reset back to service isotype
  const resetToService = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    setCurrentDisplayMode('service');
    playEntryAnimation(shapes, false);
  };

  // Replay handler
  const replay = () => {
    if (currentDisplayMode === 'master') {
      transitionToMaster();
    } else {
      playEntryAnimation(shapes, false);
    }
  };

  useImperativeHandle(ref, () => ({
    transitionToMaster,
    resetToService,
    replay
  }));

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const effectiveShapes = !isServiceView ? getMasterShapes(isNegative) : shapes;
    
    // Al montar o cambiar de servicio, ejecutamos la animación o la dejamos consolidada si prefiere reducción de movimiento
    playEntryAnimation(effectiveShapes, prefersReducedMotion);

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [serviceId, isNegative]);

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

      {/* Control visible y permanente de repetición */}
      {allowReplay && (
        <button
          onClick={replay}
          type="button"
          title={
            currentDisplayMode === 'master'
              ? 'Repetir transición hacia Isotipo Maestro'
              : 'Reproducir animación del isotipo'
          }
          className={`mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-general font-medium transition-all cursor-pointer ${
            isNegative
              ? 'text-[#FEFAE8]/70 hover:text-[#FEFAE8] hover:bg-[#FEFAE8]/10'
              : 'text-[#060C04]/70 hover:text-[#060C04] hover:bg-[#060C04]/5'
          }`}
          aria-label="Reproducir animación"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>
            {currentDisplayMode === 'master'
              ? 'Repetir animación al Maestro'
              : 'Ver animación'}
          </span>
        </button>
      )}
    </div>
  );
});
