import React from 'react';
import { HeroMotionConfig } from '../utils/store';

interface HeroMotionBackgroundProps {
  isNegative?: boolean;
  config?: HeroMotionConfig;
}

export const HeroMotionBackground: React.FC<HeroMotionBackgroundProps> = ({
  isNegative = false,
  config = {
    enabled: true,
    intensity: 0.35,
    speed: 1.0,
    showDeepOrb: true,
    showLightOrb: true,
    showGridPattern: true
  }
}) => {
  if (!config.enabled) return null;

  const durationOrb1 = `${16 / (config.speed || 1)}s`;
  const durationOrb2 = `${19 / (config.speed || 1)}s`;
  const orbOpacity = (config.intensity || 0.35) * (isNegative ? 0.35 : 0.22);
  const gridOpacity = (config.intensity || 0.35) * (isNegative ? 0.75 : 0.4);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0"
    >
      <style>{`
        @keyframes hma-float-orb1 {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px) rotate(0deg);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-35px) rotate(3deg);
          }
        }
        @keyframes hma-float-orb2 {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px) rotate(0deg);
          }
          50% {
            transform: translate(-50%, -50%) translateY(30px) rotate(-4deg);
          }
        }
      `}</style>

      {/* Layer: Orbe Azul Profundo (#3D80FD) */}
      {config.showDeepOrb && (
        <div
          className="absolute"
          style={{
            left: 'calc(50% - 160px)',
            top: 'calc(50% - 80px)',
            width: '600px',
            height: '600px',
            transform: 'translate(-50%, -50%) scale(0.85)',
            opacity: orbOpacity,
            filter: 'blur(140px)',
            mixBlendMode: isNegative ? 'screen' : 'multiply',
            zIndex: 1,
            color: '#3D80FD'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              animation: `hma-float-orb1 ${durationOrb1} ease-in-out infinite`
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50" fill="#3D80FD" />
            </svg>
          </div>
        </div>
      )}

      {/* Layer: Orbe Azul Luz (#052D63) */}
      {config.showLightOrb && (
        <div
          className="absolute"
          style={{
            left: 'calc(50% + 230px)',
            top: 'calc(50% + 90px)',
            width: '850px',
            height: '850px',
            transform: 'translate(-50%, -50%) scale(0.65)',
            opacity: orbOpacity * 1.1,
            filter: 'blur(150px)',
            mixBlendMode: isNegative ? 'screen' : 'multiply',
            zIndex: 2,
            color: '#052D63'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              animation: `hma-float-orb2 ${durationOrb2} ease-in-out infinite`
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50" fill="#052D63" />
            </svg>
          </div>
        </div>
      )}

      {/* Layer: Grid Pattern (24x24 dots) */}
      {config.showGridPattern && (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: gridOpacity,
            mixBlendMode: isNegative ? 'color-dodge' : 'multiply',
            zIndex: 3
          }}
        >
          <svg width="100%" height="100%">
            <defs>
              <pattern id="pat-grid-bg-hero" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle
                  cx="12"
                  cy="12"
                  r="1"
                  fill={isNegative ? 'rgba(255, 255, 255, 0.25)' : 'rgba(5, 45, 99, 0.25)'}
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pat-grid-bg-hero)" />
          </svg>
        </div>
      )}
    </div>
  );
};

export const generateStandaloneMotionHtml = (config?: HeroMotionConfig): string => {
  const c = config || {
    enabled: true,
    intensity: 0.35,
    speed: 1.0,
    showDeepOrb: true,
    showLightOrb: true,
    showGridPattern: true
  };

  const dur1 = `${16 / (c.speed || 1)}s`;
  const dur2 = `${19 / (c.speed || 1)}s`;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MOTION HMA MATRIX - Canvas Animado (v3.0)</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #060C04;
      color: #FEFAE8;
      font-family: system-ui, -apple-system, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      overflow: hidden;
    }
    .stage-container {
      position: relative;
      width: 1920px;
      height: 1080px;
      max-width: 95vw;
      max-height: 95vh;
      background-color: #060C04;
      aspect-ratio: 16 / 9;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(61, 128, 253, 0.2);
      border-radius: 12px;
      overflow: hidden;
    }
    .layer-item svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    @keyframes hma-float {
      0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
      50% { transform: translate(-50%, -50%) translateY(var(--anim-y, -25px)) rotate(3deg); }
    }
    .anim-float { animation: hma-float var(--anim-duration, 4s) ease-in-out infinite; animation-delay: var(--anim-delay, 0s); }
  </style>
</head>
<body>
  <div class="stage-container">
    ${
      c.showDeepOrb
        ? `<!-- Layer: Orbe Profundo (#3D80FD) -->
    <div class="layer-item" style="
      position: absolute;
      left: calc(50% + -160px);
      top: calc(50% + -100px);
      width: 600px;
      height: 600px;
      transform: translate(-50%, -50%) rotate(0deg) scale(0.7);
      opacity: ${(c.intensity || 0.35) * 0.5};
      filter: blur(150px);
      mix-blend-mode: screen;
      z-index: 1;
      color: #3D80FD;
      --anim-duration: ${dur1};
      --anim-x: -240px;
      --anim-y: -186px;
      --anim-delay: 0s;
    ">
      <div class="anim-float" style="width: 100%; height: 100%;">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#3D80FD"/></svg>
      </div>
    </div>`
        : ''
    }

    ${
      c.showLightOrb
        ? `<!-- Layer: Orbe Luz (#052D63) -->
    <div class="layer-item" style="
      position: absolute;
      left: calc(50% + 230px);
      top: calc(50% + 100px);
      width: 1040px;
      height: 1040px;
      transform: translate(-50%, -50%) rotate(0deg) scale(0.45);
      opacity: ${(c.intensity || 0.35) * 0.5};
      filter: blur(150px);
      mix-blend-mode: screen;
      z-index: 2;
      color: #052D63;
      --anim-duration: ${dur2};
      --anim-x: 180px;
      --anim-y: 160px;
      --anim-delay: 0s;
    ">
      <div class="anim-float" style="width: 100%; height: 100%;">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#052D63"/></svg>
      </div>
    </div>`
        : ''
    }

    ${
      c.showGridPattern
        ? `<!-- Layer: Grid Pattern -->
    <div class="layer-item" style="
      position: absolute;
      left: 50%;
      top: 50%;
      width: 100%;
      height: 100%;
      transform: translate(-50%, -50%) rotate(0deg) scale(1.1);
      opacity: ${(c.intensity || 0.35) * 1.5};
      filter: blur(0px);
      mix-blend-mode: color-dodge;
      z-index: 3;
    ">
      <div style="width: 100%; height: 100%;">
        <svg width="100%" height="100%"><defs><pattern id="pat-grid-bg" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="12" cy="12" r="1" fill="rgba(255,255,255,0.15)"/></pattern></defs><rect width="100%" height="100%" fill="url(#pat-grid-bg)"/></svg>
      </div>
    </div>`
        : ''
    }
  </div>
</body>
</html>`;
};
