export const ORIGINAL_ISOTIPO_MAESTRO_NAME = 'INLUMENAI_MOTION_HMA_COLOR_(ISOTIPO_BASE)_v2026.40';

export const ORIGINAL_ISOTIPO_MAESTRO_HTML = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HMA INLUMENAI — Isotipo Maestro (Motor GSAP)</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body, html {
      width: 100%;
      height: 100%;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      cursor: pointer;
    }
    #stage-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    svg {
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      overflow: visible;
    }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
</head>
<body>
  <div id="stage-container" title="Haz clic para reiniciar la animación">
    <svg id="isotipo-maestro-svg" viewBox="0 0 1080 1080" preserveAspectRatio="xMidYMid meet">
      <!-- 13 Formas Geométricas Oficiales: La Arquitectura de la Luz -->
      <g id="g-master-forma-01"><rect id="rect-master-forma-01" fill="#3D80FD" /></g>
      <g id="g-master-forma-02"><rect id="rect-master-forma-02" fill="#3D80FD" /></g>
      <g id="g-master-forma-03"><rect id="rect-master-forma-03" fill="#3D80FD" /></g>
      <g id="g-master-forma-04"><rect id="rect-master-forma-04" fill="#2D60C1" /></g>
      <g id="g-master-forma-05"><rect id="rect-master-forma-05" fill="#2D60C1" /></g>
      <g id="g-master-forma-06"><rect id="rect-master-forma-06" fill="#3D80FD" /></g>
      <g id="g-master-forma-07"><rect id="rect-master-forma-07" fill="#3D80FD" /></g>
      <g id="g-master-forma-08"><rect id="rect-master-forma-08" fill="#3D80FD" /></g>
      <g id="g-master-forma-09"><rect id="rect-master-forma-09" fill="#2D60C1" /></g>
      <g id="g-master-forma-10"><rect id="rect-master-forma-10" fill="#2D60C1" /></g>
      <g id="g-master-forma-11"><rect id="rect-master-forma-11" fill="#3D80FD" /></g>
      <g id="g-master-forma-12"><rect id="rect-master-forma-12" fill="#2D60C1" /></g>
      <g id="g-master-forma-13"><rect id="rect-master-forma-13" fill="#2D60C1" /></g>
    </svg>
  </div>

  <script>
    // Parámetros y Geometría Canónica de Marca HMA INLUMENAI (2016-2026)
    const TARGET_CENTER = 540;
    const CLOCK_RADIUS = 360;
    const UNIT_M = 67;

    const MASTER_SHAPES = [
      { id: 'forma-06', length: 67, width: 67, x: 611.07, y: 611.07, rotation: -45, color: '#3D80FD' },
      { id: 'forma-07', length: 402, width: 67, x: 516.31, y: 800.57, rotation: -45, color: '#3D80FD' },
      { id: 'forma-08', length: 402, width: 67, x: 279.43, y: 516.31, rotation: 45, color: '#3D80FD' },
      { id: 'forma-09', length: 402, width: 67, x: 800.57, y: 563.69, rotation: 45, color: '#2D60C1' },
      { id: 'forma-10', length: 268, width: 67, x: 397.87, y: 540.01, rotation: 45, color: '#2D60C1' },
      { id: 'forma-11', length: 268, width: 67, x: 539.99, y: 397.87, rotation: -45, color: '#3D80FD' },
      { id: 'forma-12', length: 268, width: 67, x: 540.01, y: 682.13, rotation: -45, color: '#2D60C1' },
      { id: 'forma-13', length: 402, width: 67, x: 563.69, y: 279.43, rotation: -45, color: '#2D60C1' },
      { id: 'forma-04', length: 167.5, width: 67, x: 433.41, y: 646.6, rotation: 45, color: '#2D60C1' },
      { id: 'forma-02', length: 167.5, width: 67, x: 504.47, y: 717.66, rotation: 45, color: '#3D80FD' },
      { id: 'forma-01', length: 167.5, width: 67, x: 575.53, y: 362.34, rotation: 45, color: '#3D80FD' },
      { id: 'forma-03', length: 167.5, width: 67, x: 420.4, y: 481.95, rotation: -105, color: '#3D80FD' },
      { id: 'forma-05', length: 167.5, width: 67, x: 384.86, y: 446.42, rotation: 15, color: '#2D60C1' }
    ];

    // Cálculo de las 12 Posiciones Horarias del Reloj
    function getClockPositions() {
      const pointShape = MASTER_SHAPES.find(s => Math.abs(s.length - s.width) < 0.01) || MASTER_SHAPES[0];
      const otherShapes = MASTER_SHAPES.filter(s => s.id !== pointShape.id).sort((a, b) => a.id.localeCompare(b.id));

      const map = {};
      otherShapes.forEach((shape, i) => {
        const hour = i + 1;
        const angleRad = ((hour * 30 - 90) * Math.PI) / 180;
        map[shape.id] = {
          x: TARGET_CENTER + CLOCK_RADIUS * Math.cos(angleRad),
          y: TARGET_CENTER + CLOCK_RADIUS * Math.sin(angleRad)
        };
      });
      map[pointShape.id] = { x: TARGET_CENTER, y: TARGET_CENTER };
      return map;
    }

    let timeline = null;

    function playAnimation() {
      if (timeline) timeline.kill();

      const clockPos = getClockPositions();
      const sorted = [...MASTER_SHAPES].sort((a, b) => a.id.localeCompare(b.id));

      // Reset Inicial
      sorted.forEach(shape => {
        gsap.set('#g-master-' + shape.id, { x: TARGET_CENTER, y: TARGET_CENTER, rotation: 0 });
        gsap.set('#rect-master-' + shape.id, {
          attr: { width: UNIT_M, height: UNIT_M, rx: UNIT_M / 2, ry: UNIT_M / 2 },
          x: -UNIT_M / 2,
          y: -UNIT_M / 2,
          fill: shape.color,
          scale: 0,
          opacity: 0
        });
      });

      timeline = gsap.timeline();

      // Acto 1: Nacimiento
      timeline.addLabel('birth');
      sorted.forEach((shape, i) => {
        timeline.to('#rect-master-' + shape.id, {
          scale: 1,
          opacity: 1,
          duration: 0.65,
          ease: 'back.out(1.7)'
        }, 'birth+=' + (i * 0.045));
      });

      // Acto 2: Formación de Reloj
      timeline.addLabel('clock_stage', '+=0.1');
      sorted.forEach(shape => {
        const pos = clockPos[shape.id] || { x: TARGET_CENTER, y: TARGET_CENTER };
        timeline.to('#g-master-' + shape.id, {
          x: pos.x,
          y: pos.y,
          rotation: 0,
          duration: 0.9,
          ease: 'power3.inOut'
        }, 'clock_stage');
      });

      // Acto 3: Metamorfosis al Isotipo Consolidado
      timeline.addLabel('morph_stage', '+=0.2');
      sorted.forEach(shape => {
        timeline.to('#g-master-' + shape.id, {
          x: shape.x,
          y: shape.y,
          rotation: shape.rotation,
          duration: 1.1,
          ease: 'power3.inOut'
        }, 'morph_stage');

        timeline.to('#rect-master-' + shape.id, {
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
        }, 'morph_stage');
      });
    }

    window.addEventListener('DOMContentLoaded', playAnimation);
    document.getElementById('stage-container').addEventListener('click', playAnimation);
  </script>
</body>
</html>`;
