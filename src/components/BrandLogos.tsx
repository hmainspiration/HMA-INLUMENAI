import React from 'react';

// Isotipo Compacto HMA.I - Firma abreviada reglamentaria (Sección 2.4)
export const IsotipoCompacto: React.FC<{
  size?: number;
  className?: string;
  isNegative?: boolean;
  luzColor?: string;
  profundoColor?: string;
}> = ({
  size = 40,
  className = '',
  isNegative = false,
  luzColor = '#3D80FD',
  profundoColor = '#2D60C1'
}) => {
  const c1 = isNegative ? '#FEFAE8' : profundoColor;
  const c2 = isNegative ? '#3D80FD' : luzColor;
  const cDot = isNegative ? '#FEFAE8' : luzColor;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Isotipo Compacto HMA.I"
    >
      {/* Rectángulo 1 */}
      <rect x="18" y="24" width="14" height="52" rx="7" fill={c1} />
      {/* Rectángulo 2 */}
      <rect x="38" y="24" width="14" height="52" rx="7" fill={c2} />
      {/* Forma #13 Círculo constante de proporción 1:1 */}
      <circle cx="72" cy="50" r="11" fill={cDot} />
    </svg>
  );
};

// Isotipo Maestro Estático (Vectorial de alta fidelidad)
export const IsotipoMaestroVector: React.FC<{
  width?: number;
  height?: number;
  className?: string;
  luzColor?: string;
  profundoColor?: string;
  isNegative?: boolean;
}> = ({
  width = 54,
  height = 54,
  className = '',
  luzColor = '#3D80FD',
  profundoColor = '#2D60C1',
  isNegative = false
}) => {
  const cLuz = isNegative ? '#FEFAE8' : luzColor;
  const cProfundo = isNegative ? '#3D80FD' : profundoColor;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1080 1080"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Isotipo Maestro HMA INLUMENAI"
    >
      {/* 13 Formas exactas del sistema de marca madre */}
      {/* Diagonal Superior */}
      <g transform="translate(563.69, 279.43) rotate(-45)">
        <rect x="-33.5" y="-201" width="67" height="402" rx="33.5" fill={cProfundo} />
      </g>
      {/* Brazo Lateral Izq */}
      <g transform="translate(397.87, 540.01) rotate(45)">
        <rect x="-33.5" y="-134" width="67" height="268" rx="33.5" fill={cProfundo} />
      </g>
      {/* Pilar Conector */}
      <g transform="translate(575.53, 362.34) rotate(45)">
        <rect x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" fill={cLuz} />
      </g>
      {/* Guía Orbital */}
      <g transform="translate(420.4, 481.95) rotate(-105)">
        <rect x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" fill={cLuz} />
      </g>
      {/* Forma #13 Círculo Central Constante 67x67 */}
      <g transform="translate(611.07, 611.07) rotate(-45)">
        <rect x="-33.5" y="-33.5" width="67" height="67" rx="33.5" fill={cLuz} />
      </g>
      {/* Base Inferior Izq */}
      <g transform="translate(516.31, 800.57) rotate(-45)">
        <rect x="-33.5" y="-201" width="67" height="402" rx="33.5" fill={cLuz} />
      </g>
      {/* Poste Lateral */}
      <g transform="translate(279.43, 516.31) rotate(45)">
        <rect x="-33.5" y="-201" width="67" height="402" rx="33.5" fill={cLuz} />
      </g>
      {/* Poste Derecho */}
      <g transform="translate(800.57, 563.69) rotate(45)">
        <rect x="-33.5" y="-201" width="67" height="402" rx="33.5" fill={cProfundo} />
      </g>
      {/* Viga Central Superior */}
      <g transform="translate(539.99, 397.87) rotate(-45)">
        <rect x="-33.5" y="-134" width="67" height="268" rx="33.5" fill={cLuz} />
      </g>
      {/* Viga Central Inferior */}
      <g transform="translate(540.01, 682.13) rotate(-45)">
        <rect x="-33.5" y="-134" width="67" height="268" rx="33.5" fill={cProfundo} />
      </g>
      {/* Segmento Inflexión */}
      <g transform="translate(384.86, 446.42) rotate(15)">
        <rect x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" fill={cProfundo} />
      </g>
      {/* Apoyo Angular */}
      <g transform="translate(433.41, 646.6) rotate(45)">
        <rect x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" fill={cProfundo} />
      </g>
      {/* Puntal de Base */}
      <g transform="translate(504.47, 717.66) rotate(45)">
        <rect x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" fill={cLuz} />
      </g>
    </svg>
  );
};

// Wordmark "INLUMENAI" con Aeonik Bold
export const BrandWordmark: React.FC<{
  className?: string;
  isNegative?: boolean;
}> = ({ className = '', isNegative = false }) => {
  return (
    <div className={`flex flex-col select-none ${className}`}>
      <span
        className={`font-aeonik text-xs font-bold tracking-[0.22em] ${
          isNegative ? 'text-[#FEFAE8]/60' : 'text-[#2D60C1]'
        }`}
      >
        HMA
      </span>
      <span
        className={`font-aeonik text-lg sm:text-xl font-bold tracking-[0.08em] leading-none ${
          isNegative ? 'text-[#FEFAE8]' : 'text-[#060C04]'
        }`}
      >
        INLUMENAI
      </span>
    </div>
  );
};

// Set de 8 Íconos Utilitarios Cerrados (Sección 2.5)
// Caja 1x1, radio esquina 0.15x, grosor de trazo 0.08x constante, rotación 0°
export const UtilitarianIcon: React.FC<{
  name: 'phone' | 'email' | 'location' | 'website' | 'whatsapp' | 'instagram' | 'facebook' | 'youtube';
  size?: number;
  className?: string;
  color?: string;
}> = ({ name, size = 24, className = '', color = 'currentColor' }) => {
  const strokeWidth = size * 0.08;
  const radius = size * 0.15;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.92"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="1.5" y="1.5" width="21" height="21" rx="3.6" strokeWidth="0" />
      {name === 'phone' && (
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      )}
      {name === 'email' && (
        <>
          <rect x="2" y="4" width="20" height="16" rx="3.6" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </>
      )}
      {name === 'location' && (
        <>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </>
      )}
      {name === 'website' && (
        <>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </>
      )}
      {name === 'whatsapp' && (
        <>
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0 0 1" />
        </>
      )}
      {name === 'instagram' && (
        <>
          <rect x="2" y="2" width="20" height="20" rx="3.6" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </>
      )}
      {name === 'facebook' && (
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      )}
      {name === 'youtube' && (
        <>
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <path d="m10 15 5-3-5-3v6Z" fill={color} />
        </>
      )}
    </svg>
  );
};

// Canonical Solid Isotype - HMA INLUMENAI COLOR (viewBox 0 0 980 826)
export const CanonicalIsotipoColor: React.FC<{
  width?: number | string;
  height?: number | string;
  className?: string;
}> = ({ width = '100%', height = '100%', className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 980 826"
      width={width}
      height={height}
      className={className}
      aria-label="HMA INLUMENAI Isotipo Base Color"
    >
      <g id="hma-isotype-color" data-service="HMA INLUMENAI">
        <rect id="forma-08" x="-33.5" y="-201" width="67" height="402" rx="33.5" ry="33.5" fill="#3D80FD" opacity="1" transform="translate(152.43 389.31) rotate(45)" />
        <rect id="forma-06" x="-33.5" y="-33.5" width="67" height="67" rx="33.5" ry="33.5" fill="#3D80FD" opacity="1" transform="translate(484.07 484.07) rotate(-45)" />
        <rect id="forma-07" x="-33.5" y="-201" width="67" height="402" rx="33.5" ry="33.5" fill="#3D80FD" opacity="1" transform="translate(389.31 673.57) rotate(-45)" />
        <rect id="forma-09" x="-33.5" y="-201" width="67" height="402" rx="33.5" ry="33.5" fill="#2D60C1" opacity="1" transform="translate(673.57 436.69) rotate(45)" />
        <rect id="forma-10" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill="#2D60C1" opacity="1" transform="translate(270.87 413.01) rotate(45)" />
        <rect id="forma-11" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill="#3D80FD" opacity="1" transform="translate(412.99 270.87) rotate(-45)" />
        <rect id="forma-12" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill="#2D60C1" opacity="1" transform="translate(413.01 555.13) rotate(-45)" />
        <rect id="forma-13" x="-33.5" y="-201" width="67" height="402" rx="33.5" ry="33.5" fill="#2D60C1" opacity="1" transform="translate(436.69 152.43) rotate(-45)" />
        <rect id="forma-03" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill="#3D80FD" opacity="1" transform="translate(293.4 354.95) rotate(-105)" />
        <rect id="forma-05" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill="#2D60C1" opacity="1" transform="translate(257.86 319.42) rotate(15)" />
        <rect id="forma-01" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill="#3D80FD" opacity="1" transform="translate(448.53 235.34) rotate(45)" />
        <rect id="forma-04" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill="#2D60C1" opacity="1" transform="translate(306.41 519.6) rotate(45)" />
        <rect id="forma-02" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill="#3D80FD" opacity="1" transform="translate(377.47 590.66) rotate(45)" />
      </g>
    </svg>
  );
};

// Canonical Solid Isotype - HMA INLUMENAI POSITIVO / NEGATIVO (viewBox 0 0 980 826)
export const CanonicalIsotipoPosNeg: React.FC<{
  width?: number | string;
  height?: number | string;
  className?: string;
  isNegative?: boolean;
}> = ({ width = '100%', height = '100%', className = '', isNegative = false }) => {
  const cLight = isNegative ? '#060C04' : '#FEFAE8';
  const cDark = isNegative ? '#FEFAE8' : '#060C04';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 980 826"
      width={width}
      height={height}
      className={className}
      aria-label="HMA INLUMENAI Isotipo Base Positivo/Negativo"
    >
      <g id="hma-isotype-posneg" data-service="HMA INLUMENAI">
        <rect id="forma-08" x="-33.5" y="-201" width="67" height="402" rx="33.5" ry="33.5" fill={cLight} opacity="1" transform="translate(152.43 389.31) rotate(45)" />
        <rect id="forma-06" x="-33.5" y="-33.5" width="67" height="67" rx="33.5" ry="33.5" fill={cLight} opacity="1" transform="translate(484.07 484.07) rotate(-45)" />
        <rect id="forma-07" x="-33.5" y="-201" width="67" height="402" rx="33.5" ry="33.5" fill={cLight} opacity="1" transform="translate(389.31 673.57) rotate(-45)" />
        <rect id="forma-09" x="-33.5" y="-201" width="67" height="402" rx="33.5" ry="33.5" fill={cDark} opacity="1" transform="translate(673.57 436.69) rotate(45)" />
        <rect id="forma-10" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill={cDark} opacity="1" transform="translate(270.87 413.01) rotate(45)" />
        <rect id="forma-11" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill={cLight} opacity="1" transform="translate(412.99 270.87) rotate(-45)" />
        <rect id="forma-12" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill={cDark} opacity="1" transform="translate(413.01 555.13) rotate(-45)" />
        <rect id="forma-13" x="-33.5" y="-201" width="67" height="402" rx="33.5" ry="33.5" fill={cDark} opacity="1" transform="translate(436.69 152.43) rotate(-45)" />
        <rect id="forma-03" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill={cLight} opacity="1" transform="translate(293.4 354.95) rotate(-105)" />
        <rect id="forma-05" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill={cDark} opacity="1" transform="translate(257.86 319.42) rotate(15)" />
        <rect id="forma-01" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill={cLight} opacity="1" transform="translate(448.53 235.34) rotate(45)" />
        <rect id="forma-04" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill={cDark} opacity="1" transform="translate(306.41 519.6) rotate(45)" />
        <rect id="forma-02" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill={cLight} opacity="1" transform="translate(377.47 590.66) rotate(45)" />
      </g>
    </svg>
  );
};

// Canonical Static Isotype for any of the 12 Services (viewBox 0 0 980 826)
export const CanonicalServiceIsotype: React.FC<{
  serviceId: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}> = ({ serviceId, width = '100%', height = '100%', className = '' }) => {
  switch (serviceId) {
    case 'heritage':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 826" width={width} height={height} className={className} aria-label="HMA HERITAGE">
          <g id="hma-isotype" data-service="HMA HERITAGE">
            <rect id="forma-01" x="-33.5" y="-201" width="67" height="402" rx="33.5" ry="33.5" fill="#315629" transform="translate(379.5 279) rotate(90)" />
            <rect id="forma-02" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill="#315629" transform="translate(279 195.25) rotate(180)" />
            <rect id="forma-03" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill="#315629" transform="translate(413 362.75) rotate(0)" />
            <rect id="forma-04" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill="#1B3315" transform="translate(262.25 111.5) rotate(-90)" />
            <rect id="forma-05" x="-33.5" y="-201" width="67" height="402" rx="33.5" ry="33.5" fill="#1B3315" transform="translate(496.75 446.5) rotate(90)" />
            <rect id="forma-06" x="-33.5" y="-33.5" width="67" height="67" rx="33.5" ry="33.5" fill="#315629" transform="translate(580.5 111.5) rotate(0)" />
            <rect id="forma-07" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#1B3315" transform="translate(161.75 647.5) rotate(0)" />
            <rect id="forma-08" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#1B3315" transform="translate(262.25 647.5) rotate(0)" />
            <rect id="forma-09" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#315629" transform="translate(362.75 647.5) rotate(0)" />
            <rect id="forma-11" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#1B3315" transform="translate(463.25 647.5) rotate(0)" />
            <rect id="forma-10" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#315629" transform="translate(415.87 627.88) rotate(45)" />
            <rect id="forma-12" x="-33.5" y="-107.2" width="67" height="214.4" rx="33.5" ry="33.5" fill="#1B3315" transform="translate(639.04 645.24) rotate(-20)" />
            <rect id="forma-13" x="-33.5" y="-107.2" width="67" height="214.4" rx="33.5" ry="33.5" fill="#315629" transform="translate(588.96 645.24) rotate(20)" />
          </g>
        </svg>
      );
    case 'melody':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 826" width={width} height={height} className={className} aria-label="HMA MELODY">
          <g id="hma-isotype" data-service="HMA MELODY">
            <rect id="forma-01" x="-33.5" y="-201" width="67" height="402" rx="33.5" ry="33.5" fill="#108591" transform="translate(362.75 279) rotate(0)" />
            <rect id="forma-02" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill="#074349" transform="translate(463.25 346) rotate(0)" />
            <rect id="forma-03" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill="#108591" transform="translate(262.25 346) rotate(0)" />
            <rect id="forma-04" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill="#074349" transform="translate(161.75 396.25) rotate(0)" />
            <rect id="forma-05" x="-33.5" y="-67" width="67" height="134" rx="33.5" ry="33.5" fill="#108591" transform="translate(563.75 413) rotate(0)" />
            <rect id="forma-06" x="-33.5" y="-33.5" width="67" height="67" rx="33.5" ry="33.5" fill="#108591" transform="translate(664.25 446.5) rotate(0)" />
            <rect id="forma-07" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#074349" transform="translate(161.75 647.5) rotate(0)" />
            <rect id="forma-08" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#074349" transform="translate(262.25 647.5) rotate(0)" />
            <rect id="forma-09" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#108591" transform="translate(362.75 647.5) rotate(0)" />
            <rect id="forma-11" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#074349" transform="translate(463.25 647.5) rotate(0)" />
            <rect id="forma-10" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#108591" transform="translate(415.87 627.88) rotate(45)" />
            <rect id="forma-12" x="-33.5" y="-107.2" width="67" height="214.4" rx="33.5" ry="33.5" fill="#074349" transform="translate(639.04 645.24) rotate(-20)" />
            <rect id="forma-13" x="-33.5" y="-107.2" width="67" height="214.4" rx="33.5" ry="33.5" fill="#108591" transform="translate(588.96 645.24) rotate(20)" />
          </g>
        </svg>
      );
    case 'architecture':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 826" width={width} height={height} className={className} aria-label="HMA ARCHITECTURE">
          <g id="hma-isotype" data-service="HMA ARCHITECTURE">
            <rect id="forma-01" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill="#7D77B0" transform="translate(413 346) rotate(90)" />
            <rect id="forma-02" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill="#7D77B0" transform="translate(212 446.5) rotate(-90)" />
            <rect id="forma-03" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill="#7D77B0" transform="translate(614 446.5) rotate(90)" />
            <rect id="forma-04" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill="#514B7D" transform="translate(413 446.5) rotate(90)" />
            <rect id="forma-05" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill="#514B7D" transform="translate(413 195.25) rotate(0)" />
            <rect id="forma-06" x="-33.5" y="-33.5" width="67" height="67" rx="33.5" ry="33.5" fill="#7D77B0" transform="translate(413 94.75) rotate(0)" />
            <rect id="forma-07" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#514B7D" transform="translate(161.75 647.5) rotate(0)" />
            <rect id="forma-08" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#514B7D" transform="translate(262.25 647.5) rotate(0)" />
            <rect id="forma-09" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#7D77B0" transform="translate(362.75 647.5) rotate(0)" />
            <rect id="forma-11" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#514B7D" transform="translate(463.25 647.5) rotate(0)" />
            <rect id="forma-10" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#7D77B0" transform="translate(415.87 627.88) rotate(45)" />
            <rect id="forma-12" x="-33.5" y="-107.2" width="67" height="214.4" rx="33.5" ry="33.5" fill="#514B7D" transform="translate(639.04 645.24) rotate(-20)" />
            <rect id="forma-13" x="-33.5" y="-107.2" width="67" height="214.4" rx="33.5" ry="33.5" fill="#7D77B0" transform="translate(588.96 645.24) rotate(20)" />
          </g>
        </svg>
      );
    case 'imagination':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 826" width={width} height={height} className={className} aria-label="HMA IMAGINATION">
          <g id="hma-isotype" data-service="HMA IMAGINATION">
            <rect id="forma-01" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill="#3D80FD" transform="translate(522.75 197.25) rotate(-35)" />
            <rect id="forma-02" x="-33.5" y="-67" width="67" height="134" rx="33.5" ry="33.5" fill="#3D80FD" transform="translate(362.75 413) rotate(0)" />
            <rect id="forma-03" x="-33.5" y="-67" width="67" height="134" rx="33.5" ry="33.5" fill="#3D80FD" transform="translate(362.75 145) rotate(0)" />
            <rect id="forma-04" x="-33.5" y="-201" width="67" height="402" rx="33.5" ry="33.5" fill="#2D60C1" transform="translate(262.25 279) rotate(0)" />
            <rect id="forma-05" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill="#2D60C1" transform="translate(523 362) rotate(35)" />
            <rect id="forma-06" x="-33.5" y="-33.5" width="67" height="67" rx="33.5" ry="33.5" fill="#3D80FD" transform="translate(362.75 279) rotate(0)" />
            <rect id="forma-07" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#2D60C1" transform="translate(161.75 647.5) rotate(0)" />
            <rect id="forma-08" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#2D60C1" transform="translate(262.25 647.5) rotate(0)" />
            <rect id="forma-09" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#3D80FD" transform="translate(362.75 647.5) rotate(0)" />
            <rect id="forma-11" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#2D60C1" transform="translate(463.25 647.5) rotate(0)" />
            <rect id="forma-10" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#3D80FD" transform="translate(415.87 627.88) rotate(45)" />
            <rect id="forma-12" x="-33.5" y="-107.2" width="67" height="214.4" rx="33.5" ry="33.5" fill="#2D60C1" transform="translate(639.04 645.24) rotate(-20)" />
            <rect id="forma-13" x="-33.5" y="-107.2" width="67" height="214.4" rx="33.5" ry="33.5" fill="#3D80FD" transform="translate(588.96 645.24) rotate(20)" />
          </g>
        </svg>
      );
    case 'narratives':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 826" width={width} height={height} className={className} aria-label="HMA NARRATIVES">
          <g id="hma-isotype" data-service="HMA NARRATIVES">
            <rect id="forma-01" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill="#C5A367" transform="translate(413 446.5) rotate(90)" />
            <rect id="forma-02" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill="#C5A367" transform="translate(232.81 350.06) rotate(-45)" />
            <rect id="forma-03" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill="#C5A367" transform="translate(593.19 350.06) rotate(45)" />
            <rect id="forma-04" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill="#82600A" transform="translate(291.69 274.94) rotate(-45)" />
            <rect id="forma-05" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill="#82600A" transform="translate(534.31 274.94) rotate(45)" />
            <rect id="forma-06" x="-33.5" y="-33.5" width="67" height="67" rx="33.5" ry="33.5" fill="#C5A367" transform="translate(413 145) rotate(90)" />
            <rect id="forma-07" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#82600A" transform="translate(161.75 647.5) rotate(0)" />
            <rect id="forma-08" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#82600A" transform="translate(262.25 647.5) rotate(0)" />
            <rect id="forma-09" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#C5A367" transform="translate(362.75 647.5) rotate(0)" />
            <rect id="forma-11" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#82600A" transform="translate(463.25 647.5) rotate(0)" />
            <rect id="forma-10" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#C5A367" transform="translate(415.87 627.88) rotate(45)" />
            <rect id="forma-12" x="-33.5" y="-107.2" width="67" height="214.4" rx="33.5" ry="33.5" fill="#82600A" transform="translate(639.04 645.24) rotate(-20)" />
            <rect id="forma-13" x="-33.5" y="-107.2" width="67" height="214.4" rx="33.5" ry="33.5" fill="#C5A367" transform="translate(588.96 645.24) rotate(20)" />
          </g>
        </svg>
      );
    case 'lenses':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 826" width={width} height={height} className={className} aria-label="HMA LENSES">
          <g id="hma-isotype" data-service="HMA LENSES">
            <rect id="forma-01" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill="#052D63" transform="translate(413 279) rotate(90)" />
            <rect id="forma-02" x="-33.5" y="-201" width="67" height="402" rx="33.5" ry="33.5" fill="#052D63" transform="translate(496.75 446.5) rotate(90)" />
            <rect id="forma-03" x="-33.5" y="-201" width="67" height="402" rx="33.5" ry="33.5" fill="#052D63" transform="translate(664.25 279) rotate(0)" />
            <rect id="forma-04" x="-33.5" y="-201" width="67" height="402" rx="33.5" ry="33.5" fill="#031C3D" transform="translate(161.75 279) rotate(0)" />
            <rect id="forma-05" x="-33.5" y="-201" width="67" height="402" rx="33.5" ry="33.5" fill="#031C3D" transform="translate(329.25 111.5) rotate(90)" />
            <rect id="forma-06" x="-33.5" y="-33.5" width="67" height="67" rx="33.5" ry="33.5" fill="#052D63" transform="translate(563.75 195.25) rotate(0)" />
            <rect id="forma-07" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#031C3D" transform="translate(161.75 647.5) rotate(0)" />
            <rect id="forma-08" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#031C3D" transform="translate(262.25 647.5) rotate(0)" />
            <rect id="forma-09" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#052D63" transform="translate(362.75 647.5) rotate(0)" />
            <rect id="forma-11" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#031C3D" transform="translate(463.25 647.5) rotate(0)" />
            <rect id="forma-10" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#052D63" transform="translate(415.87 627.88) rotate(45)" />
            <rect id="forma-12" x="-33.5" y="-107.2" width="67" height="214.4" rx="33.5" ry="33.5" fill="#031C3D" transform="translate(639.04 645.24) rotate(-20)" />
            <rect id="forma-13" x="-33.5" y="-107.2" width="67" height="214.4" rx="33.5" ry="33.5" fill="#052D63" transform="translate(588.96 645.24) rotate(20)" />
          </g>
        </svg>
      );
    case 'underline':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 826" width={width} height={height} className={className} aria-label="HMA UNDERLINE">
          <g id="hma-isotype" data-service="HMA UNDERLINE">
            <rect id="forma-01" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill="#D96B43" transform="translate(664.25 161.75) rotate(0)" />
            <rect id="forma-02" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill="#D96B43" transform="translate(161.75 396.25) rotate(0)" />
            <rect id="forma-03" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill="#D96B43" transform="translate(664.25 396.25) rotate(0)" />
            <rect id="forma-04" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill="#964222" transform="translate(161.75 161.75) rotate(0)" />
            <rect id="forma-05" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill="#964222" transform="translate(413 329.25) rotate(90)" />
            <rect id="forma-06" x="-33.5" y="-33.5" width="67" height="67" rx="33.5" ry="33.5" fill="#D96B43" transform="translate(413 228.75) rotate(0)" />
            <rect id="forma-07" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#964222" transform="translate(161.75 647.5) rotate(0)" />
            <rect id="forma-08" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#964222" transform="translate(262.25 647.5) rotate(0)" />
            <rect id="forma-09" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#D96B43" transform="translate(362.75 647.5) rotate(0)" />
            <rect id="forma-11" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#964222" transform="translate(463.25 647.5) rotate(0)" />
            <rect id="forma-10" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#D96B43" transform="translate(415.87 627.88) rotate(45)" />
            <rect id="forma-12" x="-33.5" y="-107.2" width="67" height="214.4" rx="33.5" ry="33.5" fill="#964222" transform="translate(639.04 645.24) rotate(-20)" />
            <rect id="forma-13" x="-33.5" y="-107.2" width="67" height="214.4" rx="33.5" ry="33.5" fill="#D96B43" transform="translate(588.96 645.24) rotate(20)" />
          </g>
        </svg>
      );
    case 'merchandise':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 826" width={width} height={height} className={className} aria-label="HMA MERCHANDISE">
          <g id="hma-isotype" data-service="HMA MERCHANDISE">
            <rect id="forma-03" x="-33.5" y="-67" width="67" height="134" rx="33.5" ry="33.5" fill="#D7BB11" transform="translate(362.75 195.25) rotate(0)" />
            <rect id="forma-05" x="-33.5" y="-67" width="67" height="134" rx="33.5" ry="33.5" fill="#D7BB11" transform="translate(463.25 195.25) rotate(0)" />
            <rect id="forma-01" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill="#D7BB11" transform="translate(413 346) rotate(90)" />
            <rect id="forma-02" x="-33.5" y="-201" width="67" height="402" rx="33.5" ry="33.5" fill="#8C7907" transform="translate(413 245.5) rotate(90)" />
            <rect id="forma-04" x="-33.5" y="-201" width="67" height="402" rx="33.5" ry="33.5" fill="#8C7907" transform="translate(413 446.5) rotate(-90)" />
            <rect id="forma-06" x="-33.5" y="-33.5" width="67" height="67" rx="33.5" ry="33.5" fill="#D7BB11" transform="translate(413 111.5) rotate(0)" />
            <rect id="forma-07" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#8C7907" transform="translate(161.75 647.5) rotate(0)" />
            <rect id="forma-08" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#8C7907" transform="translate(262.25 647.5) rotate(0)" />
            <rect id="forma-09" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#D7BB11" transform="translate(362.75 647.5) rotate(0)" />
            <rect id="forma-11" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#8C7907" transform="translate(463.25 647.5) rotate(0)" />
            <rect id="forma-12" x="-33.5" y="-107.2" width="67" height="214.4" rx="33.5" ry="33.5" fill="#8C7907" transform="translate(639.04 645.24) rotate(-20)" />
            <rect id="forma-13" x="-33.5" y="-107.2" width="67" height="214.4" rx="33.5" ry="33.5" fill="#D7BB11" transform="translate(588.96 645.24) rotate(20)" />
            <rect id="forma-10" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#D7BB11" transform="translate(415.87 627.88) rotate(45)" />
          </g>
        </svg>
      );
    case 'experiences':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 826" width={width} height={height} className={className} aria-label="HMA EXPERIENCES">
          <g id="hma-isotype" data-service="HMA EXPERIENCES">
            <rect id="forma-01" x="-33.5" y="-201" width="67" height="402" rx="33.5" ry="33.5" fill="#1D5B8F" transform="translate(329.25 111.5) rotate(90)" />
            <rect id="forma-02" x="-33.5" y="-201" width="67" height="402" rx="33.5" ry="33.5" fill="#1B3F67" transform="translate(329.25 446.5) rotate(90)" />
            <rect id="forma-03" x="-33.5" y="-201" width="67" height="402" rx="33.5" ry="33.5" fill="#1B3F67" transform="translate(161.75 279) rotate(0)" />
            <rect id="forma-04" x="-33.5" y="-67" width="67" height="134" rx="33.5" ry="33.5" fill="#1D5B8F" transform="translate(639.66 300.53) rotate(-50)" />
            <rect id="forma-05" x="-33.5" y="-67" width="67" height="134" rx="33.5" ry="33.5" fill="#1D5B8F" transform="translate(637.69 255.31) rotate(-135)" />
            <rect id="forma-06" x="-33.5" y="-33.5" width="67" height="67" rx="33.5" ry="33.5" fill="#1D5B8F" transform="translate(513.5 279) rotate(0)" />
            <rect id="forma-07" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#1B3F67" transform="translate(161.75 647.5) rotate(0)" />
            <rect id="forma-08" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#1B3F67" transform="translate(262.25 647.5) rotate(0)" />
            <rect id="forma-09" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#1D5B8F" transform="translate(362.75 647.5) rotate(0)" />
            <rect id="forma-11" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#1B3F67" transform="translate(463.25 647.5) rotate(0)" />
            <rect id="forma-10" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#1D5B8F" transform="translate(415.87 627.88) rotate(45)" />
            <rect id="forma-12" x="-33.5" y="-107.2" width="67" height="214.4" rx="33.5" ry="33.5" fill="#1B3F67" transform="translate(639.04 645.24) rotate(-20)" />
            <rect id="forma-13" x="-33.5" y="-107.2" width="67" height="214.4" rx="33.5" ry="33.5" fill="#1D5B8F" transform="translate(588.96 645.24) rotate(20)" />
          </g>
        </svg>
      );
    case 'network':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 826" width={width} height={height} className={className} aria-label="HMA NETWORK">
          <g id="hma-isotype" data-service="HMA NETWORK">
            <rect id="forma-01" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill="#11D7B6" transform="translate(534.31 182.56) rotate(-45)" />
            <rect id="forma-02" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill="#0A826E" transform="translate(534.31 375.44) rotate(45)" />
            <rect id="forma-03" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill="#11D7B6" transform="translate(413 279) rotate(0)" />
            <rect id="forma-04" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill="#0A826E" transform="translate(291.69 182.56) rotate(45)" />
            <rect id="forma-05" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill="#11D7B6" transform="translate(291.69 375.44) rotate(-45)" />
            <rect id="forma-06" x="-33.5" y="-33.5" width="67" height="67" rx="33.5" ry="33.5" fill="#11D7B6" transform="translate(664.25 446.5) rotate(0)" />
            <rect id="forma-07" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#0A826E" transform="translate(161.75 647.5) rotate(0)" />
            <rect id="forma-08" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#0A826E" transform="translate(262.25 647.5) rotate(0)" />
            <rect id="forma-09" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#11D7B6" transform="translate(362.75 647.5) rotate(0)" />
            <rect id="forma-11" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#0A826E" transform="translate(463.25 647.5) rotate(0)" />
            <rect id="forma-10" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#11D7B6" transform="translate(415.87 627.88) rotate(45)" />
            <rect id="forma-12" x="-33.5" y="-107.2" width="67" height="214.4" rx="33.5" ry="33.5" fill="#0A826E" transform="translate(639.04 645.24) rotate(-20)" />
            <rect id="forma-13" x="-33.5" y="-107.2" width="67" height="214.4" rx="33.5" ry="33.5" fill="#11D7B6" transform="translate(588.96 645.24) rotate(20)" />
          </g>
        </svg>
      );
    case 'alphabets':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 826" width={width} height={height} className={className} aria-label="HMA ALPHABETS">
          <g id="hma-isotype" data-service="HMA ALPHABETS">
            <rect id="forma-01" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill="#77454A" transform="translate(378.63 222.69) rotate(20)" />
            <rect id="forma-02" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill="#AE7176" transform="translate(447.37 222.69) rotate(-20)" />
            <rect id="forma-03" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill="#77454A" transform="translate(245.5 262.25) rotate(0)" />
            <rect id="forma-04" x="-33.5" y="-201" width="67" height="402" rx="33.5" ry="33.5" fill="#77454A" transform="translate(413 446.5) rotate(-90)" />
            <rect id="forma-05" x="-33.5" y="-33.5" width="67" height="67" rx="33.5" ry="33.5" fill="#AE7176" transform="translate(580.5 312.5) rotate(90)" />
            <rect id="forma-06" x="-33.5" y="-67" width="67" height="134" rx="33.5" ry="33.5" fill="#AE7176" transform="translate(410 295.8) rotate(90)" />
            <rect id="forma-07" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#77454A" transform="translate(161.75 647.5) rotate(0)" />
            <rect id="forma-08" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#77454A" transform="translate(262.25 647.5) rotate(0)" />
            <rect id="forma-09" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#AE7176" transform="translate(362.75 647.5) rotate(0)" />
            <rect id="forma-11" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#77454A" transform="translate(463.25 647.5) rotate(0)" />
            <rect id="forma-10" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#AE7176" transform="translate(415.87 627.88) rotate(45)" />
            <rect id="forma-12" x="-33.5" y="-107.2" width="67" height="214.4" rx="33.5" ry="33.5" fill="#77454A" transform="translate(639.04 645.24) rotate(-20)" />
            <rect id="forma-13" x="-33.5" y="-107.2" width="67" height="214.4" rx="33.5" ry="33.5" fill="#AE7176" transform="translate(588.96 645.24) rotate(20)" />
          </g>
        </svg>
      );
    case 'illustrations':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 826" width={width} height={height} className={className} aria-label="HMA ILLUSTRATIONS">
          <g id="hma-isotype" data-service="HMA ILLUSTRATIONS">
            <rect id="forma-01" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill="#75C962" transform="translate(384.18 271.34) rotate(-35)" />
            <rect id="forma-02" x="-33.5" y="-201" width="67" height="402" rx="33.5" ry="33.5" fill="#75C962" transform="translate(161.75 279) rotate(0)" />
            <rect id="forma-03" x="-33.5" y="-201" width="67" height="402" rx="33.5" ry="33.5" fill="#75C962" transform="translate(664.25 279) rotate(0)" />
            <rect id="forma-04" x="-33.5" y="-134" width="67" height="268" rx="33.5" ry="33.5" fill="#4B893C" transform="translate(413 446.5) rotate(90)" />
            <rect id="forma-05" x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" ry="33.5" fill="#4B893C" transform="translate(441.82 271.34) rotate(35)" />
            <rect id="forma-06" x="-33.5" y="-33.5" width="67" height="67" rx="33.5" ry="33.5" fill="#75C962" transform="translate(547 145) rotate(0)" />
            <rect id="forma-07" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#4B893C" transform="translate(161.75 647.5) rotate(0)" />
            <rect id="forma-08" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#4B893C" transform="translate(262.25 647.5) rotate(0)" />
            <rect id="forma-09" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#75C962" transform="translate(362.75 647.5) rotate(0)" />
            <rect id="forma-11" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#4B893C" transform="translate(463.25 647.5) rotate(0)" />
            <rect id="forma-10" x="-33.5" y="-100.5" width="67" height="201" rx="33.5" ry="33.5" fill="#75C962" transform="translate(415.87 627.88) rotate(45)" />
            <rect id="forma-12" x="-33.5" y="-107.2" width="67" height="214.4" rx="33.5" ry="33.5" fill="#4B893C" transform="translate(639.04 645.24) rotate(-20)" />
            <rect id="forma-13" x="-33.5" y="-107.2" width="67" height="214.4" rx="33.5" ry="33.5" fill="#75C962" transform="translate(588.96 645.24) rotate(20)" />
          </g>
        </svg>
      );
    default:
      return null;
  }
};

export const HistoricalLogoRender: React.FC<{
  type: string;
  className?: string;
  size?: number;
}> = ({ type, className = '', size = 80 }) => {
  switch (type) {
    case 'h16':
      return (
        <svg viewBox="0 0 820 974" width={size} height={size * 1.18} className={className} fill="currentColor">
          <rect x="48" y="0" width="63" height="974" />
          <path d="M376.74 582.33 736.01 236.05 771.39 272.76 412.13 619.04Z" fillRule="evenodd" />
          <rect x="279" y="351" width="283" height="45" />
          <rect x="720" y="0" width="59" height="974" />
          <path d="M94.33 248.19 443.41 564.1 405.73 605.73 56.66 289.82Z" fillRule="evenodd" />
          <rect x="720" y="912" width="100" height="62" />
          <rect x="0" y="912" width="101" height="62" />
          <rect x="720" y="0" width="100" height="58" />
          <rect x="0" y="0" width="100" height="58" />
        </svg>
      );
    case 'h17':
      return (
        <svg viewBox="0 0 584 651" width={size} height={size * 1.11} className={className} stroke="currentColor" fill="none">
          <path d="M386 267 201.4 267.4 171.3 238.8 413 238.4Z" strokeWidth="27.5" strokeMiterlimit="8" fill="none" fillRule="evenodd" />
          <path d="M14 637 111.5 637C110.7 507.2 109.9 377.4 109.1 247.6L293 420.9 474.8 245.6 472.4 637 570 637 570 596.1 523.6 596.1 523.6 62.6 570 62.6 570 14 470 14 472.4 193 294.5 362.5 111 193 106.6 14 14 14 14 58.7 57.8 58.7C58.7 236.5 59.5 414.4 60.3 592.2L14 592.2 14 637Z" strokeWidth="27.5" strokeMiterlimit="8" fill="none" fillRule="evenodd" />
        </svg>
      );
    case 'h18':
      return (
        <svg viewBox="0 0 706.6 905.8" width={size} height={size * 1.28} className={className} fill="currentColor">
          <path d="m0,860.7c9.1,0,18.2-.1,27.3,0,2.4,0,2.9-.7,2.9-3,0-268.8,0-537.5,0-806.3,0-2.3-.6-3.1-2.9-3-9.1.2-18.2.1-27.3.2v-18.7c10.9,0,21.7,0,32.6-.1,5,0,9.9.1,14.9,0,2.4,0,3.2.8,2.9,3,0,.3,0,.6,0,1,0,280.4,0,560.8,0,841.2,0,2.3-.6,3-2.9,3-14.8-.1-29.6,0-44.4,0-1,0-2.1.1-3.1.2,0-5.8,0-11.5,0-17.3Z" />
          <path d="m610.6,359c-3.3,2.4-6,4.3-8.6,6.3-20.4,14.9-40.7,29.9-61,44.8-13.8,10.1-27.5,20.4-41.3,30.5-17.4,12.8-34.9,25.4-52.3,38.2-15,11-30,22.1-45,33.2-15.1,11.1-30.2,22.2-45.3,33.2-1,.7-1.9,1.5-3.4.4-4.8-3.5-9.8-6.7-14.7-10.2-9.8-7-19.4-14.1-29.1-21.2-7.2-5.3-14.3-10.6-21.5-15.9-17.5-12.8-34.9-25.6-52.4-38.4-14.5-10.6-28.9-21.2-43.3-31.8-14.6-10.7-29.2-21.4-43.7-32.1-14.6-10.7-29.1-21.4-43.7-32.1-3.7-2.7-7.3-5.3-11-8-1.2-.9-1.8-.4-1.9.9,0,.8,0,1.6,0,2.4,0,166.1,0,332.1,0,498.2q0,3.2,3.1,3.2c9.3,0,18.5,0,27.8,0,2,0,2.7.5,2.6,2.6-.1,4.1-.1,8.2,0,12.2,0,1.7-.5,2.4-2.3,2.4-16.4,0-32.8,0-49.2,0-1.8,0-2.4-.7-2.3-2.4.1-1.4,0-2.7,0-4.1,0-279.6,0-559.2,0-838.8,0-2.2.6-2.9,2.8-2.9,16.1,0,32.1,0,48.2,0,2.1,0,2.8.6,2.7,2.7-.1,4.5-.1,9,0,13.4,0,2-.6,2.7-2.6,2.6-9.4,0-18.9,0-28.3,0-2.1,0-2.8.5-2.8,2.7,0,94.4,0,188.9,0,283.3,0,1.7.5,2.9,1.9,3.9,12.4,9,24.7,18.1,37,27.1,14.6,10.7,29.3,21.5,43.9,32.3,11.7,8.6,23.5,17.3,35.2,25.9,13.5,9.9,27.1,19.9,40.6,29.8,16.2,11.9,32.4,23.7,48.6,35.6,14.6,10.7,29.2,21.3,43.8,32,3.1,2.3,6.3,4.6,9.4,7,1.2.9,2.4,1.1,3.7.1,9.8-7.2,19.7-14.4,29.5-21.6,9.6-7.1,19.2-14.2,28.9-21.2,15.2-11.2,30.4-22.4,45.6-33.5,14.6-10.7,29.3-21.5,43.9-32.2,20.2-14.9,40.4-29.7,60.6-44.6,14.4-10.6,28.9-21.2,43.4-31.7,1.8-1.3,2.7-2.7,2.7-5.1,0-95.5,0-191.1,0-286.6,0-2.3-.6-3-3-3-8.2.1-16.5,0-24.7,0-2,0-2.7-.6-2.6-2.6.1-4.6,0-9.3,0-13.9,0-1.6.5-2.3,2.2-2.3,14.8,0,29.6,0,44.4,0,1.5,0,2.2.5,2.1,2.1,0,.7,0,1.4,0,2.2,0,280.3,0,560.6,0,841,0,2.4-.7,3-3,2.9-14.3,0-28.6,0-42.9,0-2.3,0-2.9-.7-2.8-2.9.2-4,.1-8,0-12,0-1.8.6-2.4,2.4-2.4,8.3,0,16.6,0,24.9,0,2.3,0,3-.6,3-3,0-164.5,0-329.1,0-493.6,0-1.4-.2-2.9-.3-5Z" />
          <path d="m706.4,860.6v17.1c-1.1,0-2.2,0-3.2,0-15.8,0-31.7,0-47.5,0-2.3,0-3-.6-3-3,0-279.7,0-559.5,0-839.2q0-5.9,5.9-5.9c14.8,0,29.6,0,44.4,0h3.3v18.7c-.9,0-1.9,0-2.8,0-9.3,0-18.5,0-27.8,0-2.2,0-2.8.7-2.8,2.9,0,268.9,0,537.7,0,806.6,0,2.2.6,2.9,2.8,2.9,9.2-.1,18.4,0,27.6,0,.9,0,1.9,0,3.1,0Z" />
        </svg>
      );
    case 'h19':
      return (
        <svg viewBox="0 0 653 833" width={size} height={size * 1.27} className={className} fill="currentColor">
          <path d="M93 396 94.9 396 315.5 574 536 396 538 396 538 832 93 832Z" fillRule="evenodd" />
          <rect x="93" y="0" width="445" height="338" />
          <path d="M452 386 315.5 500 179 386Z" fillRule="evenodd" />
          <rect x="613" y="0" width="40" height="833" />
          <rect x="0" y="0" width="23" height="833" />
        </svg>
      );
    case 'h20':
      return (
        <svg viewBox="0 0 907.3 789.4" width={size} height={size * 0.87} className={className} fill="currentColor">
          <path d="m86.8,162.2c0-.2,0-.5,0-.7,1.2-3,1-3.6-1.7-5.9-5-4.2-10.1-8.2-14.9-12.6-6.9-6.5-13.5-13.2-20.3-19.9-2.9-2.8-6.2-5.4-8.8-8.5-2.8-3.3-6.9-5.8-7.7-10.7,0-.5-.6-.9-1.1-1.2-3.4-2.6-6.9-5.1-10.4-7.6-.6-.4-1.5-.4-2.2-.4-3.1-.2-6.2-.2-9.2-.7-1.4-.2-2.9-1.2-3.8-2.3-2.8-3.4-5.6-6.9-6.6-11.5-1.4-6.4,2.9-13.7,9.1-15.7,5.7-1.9,10.5-.3,14.9,3.2.5.4,1.1.7,1.6.9,2.4,1,4,2.8,4.5,5.3.6,2.6.5,5.4,1,8,.3,1.5.8,3,1.6,4.2,1.5,2.1,3.4,3.8,5,5.8,1.7,2,3.6,3.5,6.3,4.5,2.5.9,4.6,3,6.8,4.8,2.5,2.1,4.9,4.4,7.3,6.5,2.6,2.2,5.2,4.4,7.9,6.6,2.7,2.3,5.6,4.5,8.1,6.9,7.6,7.3,15,14.7,22.5,22.1,1.5,1.5,3.1,2.5,5.3,1.2.4-.2,1.8.4,2,.9,1.2,3,5,6,8,5.1,1.9-.6,3.6-2.8,4.7-4.6.8-1.3.6-3.2.7-4.9.2-2.2,0-4.5.4-6.7.6-3.2,1.4-6.4,4.8-8.1,1.3-.6,2.3-1.7,3.5-2.5,4.1-2.9,10.6-3.5,15.7,1.3,4.5,4.3,3.9,8.9,3.7,13.9-.2,5.9-3.3,11-5.1,16.4-.4,1.2-3.1,1.6-3.9,2.9-1.1,1.7-1.9,2.9-4.1,2.3-.4,0-.9-.2-1.2,0-1.4,1-2.9,1.9-3.8,3.3-.3.5.6,2.3,1.4,3,3.2,3.3,6.6,6.4,10,9.6,4.1,4,8.2,8,12.3,12,5.3,5.2,10.7,10.3,16,15.5,4.9,4.8,9.6,9.7,14.6,14.4,7.6,7.3,15.5,14.5,23.1,21.8,4.7,4.5,9.2,9.3,13.9,13.9,5.3,5.1,10.7,10,16,15.1,5.9,5.7,11.7,11.5,17.6,17.3,4.2,4.1,8.5,8.1,12.8,12.2,4.1,4,8.3,7.9,12.4,11.9,6.3,6.2,12.4,12.5,18.7,18.7,2.9,2.8,6,5.4,8.9,8.3,2.5,2.5,4.8,5.2,7.3,7.8,2.1,2.1,4.3,4,6.5,6,4.7,4.5,9.5,8.9,14.2,13.5,4.7,4.7,9.3,9.6,14,14.2,4,3.9,8.1,7.6,12.1,11.5,5.3,5.2,10.6,10.5,15.9,15.7,1.8,1.8,3.7,3.5,5.6,5.3,6.3,5.9,12.6,11.8,18.7,17.8,7.4,7.2,14.6,14.5,22,21.7,6.1,6,12.3,11.8,18.4,17.7,3.4,3.3,6.7,6.7,10.1,10,2.8,2.7,5.8,5.2,8.5,8,5.8,6,11.9,11.7,17.1,18.2,3.3,4.2,5.2,9.6,7.5,14.6.8,1.8-.4,2-1.9,1.6-5.5-1.5-10.9-3.5-15.3-7.1-5.8-4.7-11.5-9.6-17.1-14.5-4.6-4-9.2-8.1-13.7-12.2-6.3-5.8-12.6-11.7-18.9-17.6-5.5-5.1-10.9-10.2-16.4-15.3-4.8-4.5-9.7-8.9-14.6-13.4-6.7-6.3-13.3-12.6-20-18.8-7-6.5-14.1-13-21.1-19.5-3.2-3-6.3-6.1-9.5-9.1-3.1-2.8-6.4-5.5-9.5-8.3-4.5-4.1-8.9-8.4-13.4-12.6-3.1-2.9-6.4-5.8-9.5-8.7-7.8-7.2-15.6-14.4-23.3-21.7-5.4-5-10.8-10.1-16.2-15.2-6.2-5.8-12.3-11.6-18.5-17.3-6.7-6.1-13.6-12-20.3-18.2-7.9-7.3-15.6-14.8-23.5-22.1-4.4-4.1-9-7.8-13.4-11.9-4.8-4.4-9.4-9-14.1-13.5-2-1.9-4.1-3.8-6.2-5.6-11.3-10.3-22.6-20.6-33.9-30.9-5.9-5.4-11.7-10.8-17.6-16.2-1.8-1.7-3.4-3.5-5.2-5.2-1.3-1.2-2.6-.9-3.3.7-.6,1.4-.9,2.8-1.4,4.3-.5,1.3-.9,2.6-1.5,3.8-.8,1.4-1.6,3.3-2.9,3.9-5.5,2.5-10.7,5.7-16.9,6.2-2,.1-4,.4-6,.4-6.8,0-12.4-5.6-12.3-12.3,0-1.8.9-3.7,1.8-5.4,1.7-3.1,3.2-6.5,6.8-7.8,2.9-1,6-1.5,9-2.2,2.1-.5,4.3-.7,6.3-1.3,3.2-1,4.6-4,3.5-7.2-.4-1.3-.7-2.8-1.5-3.7-1.1-1.3-2.7-2.2-4-3.2-.2,0-.4.2-.6.3Z" />
        </svg>
      );
    case 'h21':
      return (
        <svg viewBox="0 0 557 836" width={size} height={size * 1.5} className={className} fill="currentColor">
          <rect x="0" y="52" width="111" height="736" rx="55.5" />
          <rect x="446" y="52" width="111" height="736" rx="55.5" />
          <rect x="18" y="374" width="497" height="60" rx="30" />
          <path d="m18 418 218 216c21 21 56 21 77 0l4-4c21-21 21-56 0-77L99 337c-21-21-56-21-77 0l-4 4c-21 21-21 56 0 77Z" />
          <path d="m457 418-218 216c-21 21-56 21-77 0l-4-4c-21-21-21-56 0-77l218-216c21-21 56-21 77 0l4 4c21 21 21 56 0 77Z" />
        </svg>
      );
    case 'h26':
    default:
      return (
        <svg viewBox="0 0 807 1178" width={size} height={size * 1.45} className={className} fill="none">
          <rect x="0" y="70" width="141" height="1038" rx="70" fill="#2D60C1" />
          <rect x="666" y="70" width="141" height="1038" rx="70" fill="#3D80FD" />
          <rect x="500" y="535" width="56" height="197" rx="28" fill="#3D80FD" />
          <rect x="584" y="535" width="57" height="196" rx="28" fill="#2D60C1" />
          <rect x="500" y="507" width="141" height="56" rx="28" fill="#2D60C1" />
          <rect x="500" y="591" width="141" height="57" rx="28" fill="#3D80FD" />
          <rect x="167" y="535" width="56" height="197" rx="28" fill="#3D80FD" />
          <rect x="251" y="535" width="56" height="197" rx="28" fill="#2D60C1" />
          <rect x="195" y="591" width="83" height="57" rx="28" fill="#3D80FD" />
          <rect x="333" y="535" width="56" height="197" rx="28" fill="#3D80FD" />
          <rect x="417" y="535" width="57" height="196" rx="28" fill="#2D60C1" />
          <path d="M427 622 369 521c-13-23-43-31-66-18l-1 1c-23 13-31 43-18 66l58 101c13 23 43 31 66 18l1-1c23-13 31-43 18-66Z" fill="#3D80FD" />
          <path d="M336 548 394 649c13 23 43 31 66 18l1-1c23-13 31-43 18-66l-58-101c-13-23-43-31-66-18l-1 1c-23 13-31 43-18 66Z" fill="#2D60C1" />
        </svg>
      );
  }
};
