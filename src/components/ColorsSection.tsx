import React, { useState, useRef } from 'react';
import {
  COLOR_DATABASE,
  ColorData,
  PINWHEEL_PIXELS,
  STRIP_ROW_1_LUZ,
  STRIP_ROW_2_PROFUNDO
} from '../data/colorPaletteData';
import {
  Sliders,
  RotateCw,
  Copy,
  Check,
  Sparkles,
  Info,
  AlertTriangle,
  Sun,
  Moon,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ColorsSectionProps {
  isNegative: boolean;
}

export const ColorsSection: React.FC<ColorsSectionProps> = ({ isNegative }) => {
  const [currentHex, setCurrentHex] = useState<string>('#3D80FD');
  const [rotation, setRotation] = useState<number>(-45);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [showAnglePanel, setShowAnglePanel] = useState<boolean>(false);
  const [stageTheme, setStageTheme] = useState<'sync' | 'light' | 'dark'>('sync');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Resolved stage theme
  const effectiveStageDark = stageTheme === 'sync' ? isNegative : stageTheme === 'dark';

  const activeColor: ColorData = COLOR_DATABASE[currentHex.toUpperCase()] || COLOR_DATABASE['#3D80FD'];

  // Accessible text color for the active swatch
  const getContrastTextColor = (hex: string): string => {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return lum > 0.58 ? '#060C04' : '#FEFAE8';
  };

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  const handleCopyHex = (hex: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(hex);
      showToast(`HEX ${hex} copiado al portapapeles`);
    }
  };

  const handleSelectColor = (hex: string, fromStrip = false) => {
    const upper = hex.toUpperCase();
    setCurrentHex(upper);

    if (fromStrip) {
      // Rotate +90° dynamically with elastic bounce
      setIsSpinning(true);
      setRotation((prev) => prev + 90);
      setTimeout(() => {
        setIsSpinning(false);
      }, 750);
    }
  };

  const handlePresetAngle = (deg: number) => {
    setRotation(deg);
  };

  const handleResetAngle = () => {
    setRotation(-45);
  };

  return (
    <section
      id="colores"
      className={`relative py-20 lg:py-28 transition-colors duration-300 ${
        isNegative ? 'bg-[#060C04]' : 'bg-[#FEFAE8]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-[#3D80FD]/30 bg-[#3D80FD]/10 text-[#3D80FD]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sistema Cromático Oficial • 26 Tonos</span>
          </div>

          <h2 className="font-aeonik text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Paleta Maestra &amp; Isotipo Dinámico
          </h2>

          <p className="font-general text-sm sm:text-base opacity-75 max-w-2xl mx-auto leading-relaxed">
            Predeterminado a -45°. Pulsa cualquier tono para ver su ficha técnica (RGB, CMYK, Pantone y contraste WCAG 2.1) o interactúa con la tira de la paleta para rotar dinámicamente la composición.
          </p>
        </div>

        {/* Main Grid: Left Stage (60%) + Right Technical Card (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Lado Izquierdo: Escenario Interactivo */}
          <div
            className={`lg:col-span-7 rounded-3xl p-6 sm:p-8 border backdrop-blur-md transition-all duration-300 shadow-xl relative flex flex-col items-center ${
              effectiveStageDark
                ? 'bg-black/30 border-white/10 text-[#FEFAE8]'
                : 'bg-white/70 border-black/10 text-[#060C04]'
            }`}
          >
            {/* Stage Bar: Title, Angle Indicator & Panel Trigger */}
            <div className="w-full flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-inherit/40 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3D80FD] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                  Isotipo Base — Composición Geométrica
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Stage Theme Toggle */}
                <button
                  type="button"
                  onClick={() =>
                    setStageTheme((prev) =>
                      prev === 'sync' ? (isNegative ? 'light' : 'dark') : prev === 'light' ? 'dark' : 'sync'
                    )
                  }
                  title="Cambiar fondo del escenario"
                  className={`p-2 rounded-xl text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
                    effectiveStageDark
                      ? 'border-white/15 bg-white/5 hover:bg-white/10 text-amber-300'
                      : 'border-black/15 bg-black/5 hover:bg-black/10 text-blue-600'
                  }`}
                >
                  {effectiveStageDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline text-[11px]">
                    {stageTheme === 'sync' ? 'Auto' : effectiveStageDark ? 'Oscuro' : 'Claro'}
                  </span>
                </button>

                {/* Angle Badge */}
                <span className="font-mono text-xs font-bold px-2.5 py-1.5 rounded-lg border border-[#3D80FD]/30 bg-[#3D80FD]/10 text-[#3D80FD]">
                  {rotation}°
                </span>

                {/* Toggle Angle Panel */}
                <button
                  type="button"
                  onClick={() => setShowAnglePanel(!showAnglePanel)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                    showAnglePanel
                      ? 'bg-[#3D80FD] text-white border-[#3D80FD]'
                      : effectiveStageDark
                      ? 'border-white/15 bg-white/5 hover:bg-white/10'
                      : 'border-black/15 bg-black/5 hover:bg-black/10'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Ángulo</span>
                  {showAnglePanel ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>
            </div>

            {/* Panel Desplegable de Ajuste de Grados */}
            {showAnglePanel && (
              <div
                className={`w-full rounded-2xl p-4 sm:p-5 border mb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200 shadow-lg ${
                  effectiveStageDark
                    ? 'bg-[#0c160a] border-white/15 text-[#FEFAE8]'
                    : 'bg-[#f4efd5] border-black/15 text-[#060C04]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                    Control de Inclinación:
                  </span>
                  <div className="flex items-center gap-3 flex-1 max-w-md">
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={rotation}
                      onChange={(e) => setRotation(parseInt(e.target.value, 10))}
                      className="flex-1 accent-[#3D80FD] cursor-pointer"
                    />
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="-360"
                        max="360"
                        value={rotation}
                        onChange={(e) => setRotation(parseInt(e.target.value, 10) || 0)}
                        className={`w-16 px-2 py-1 rounded-lg text-xs font-mono font-bold text-center border outline-none ${
                          effectiveStageDark
                            ? 'bg-black/40 border-white/20 text-white'
                            : 'bg-white border-black/20 text-black'
                        }`}
                      />
                      <span className="text-xs font-mono opacity-70">°</span>
                    </div>
                  </div>
                </div>

                {/* Preset shortcuts */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-inherit/30">
                  <span className="text-[11px] font-bold uppercase tracking-wider opacity-60 mr-1">
                    Atajos:
                  </span>
                  {[-45, 0, 45, 90, 180].map((deg) => (
                    <button
                      key={deg}
                      type="button"
                      onClick={() => handlePresetAngle(deg)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border ${
                        rotation === deg
                          ? 'bg-[#3D80FD] text-white border-[#3D80FD] shadow-sm'
                          : effectiveStageDark
                          ? 'bg-white/5 border-white/10 hover:bg-white/10'
                          : 'bg-black/5 border-black/10 hover:bg-black/10'
                      }`}
                    >
                      {deg}°{deg === -45 && ' (Pred.)'}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={handleResetAngle}
                    className="ml-auto px-2.5 py-1 rounded-lg text-xs font-bold text-[#3D80FD] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCw className="w-3 h-3" />
                    <span>Restablecer</span>
                  </button>
                </div>
              </div>
            )}

            {/* Pinwheel Viewport (Rotating Container) */}
            <div className="w-full min-h-[360px] sm:min-h-[420px] flex items-center justify-center relative overflow-visible my-4">
              <div
                style={{
                  gridTemplateColumns: 'repeat(11, minmax(0, 1fr))',
                  gridTemplateRows: 'repeat(11, minmax(0, 1fr))',
                  transform: `rotate(${rotation}deg) scale(${isSpinning ? 1.08 : 1})`,
                  transition: 'transform 0.75s cubic-bezier(0.34, 1.45, 0.64, 1)',
                  filter: isSpinning ? 'drop-shadow(0 0 26px rgba(61, 128, 253, 0.5))' : 'none'
                }}
                className="grid gap-0 w-[280px] h-[280px] sm:w-[352px] sm:h-[352px] origin-center relative select-none"
              >
                {/* 11x11 Grid of Cells */}
                {Array.from({ length: 11 }).map((_, r) =>
                  Array.from({ length: 11 }).map((_, c) => {
                    const pixel = PINWHEEL_PIXELS.find((p) => p.r === r && p.c === c);
                    if (!pixel) {
                      return <div key={`${r}-${c}`} className="w-full h-full" />;
                    }

                    const isSelected = pixel.hex.toUpperCase() === currentHex.toUpperCase();

                    return (
                      <button
                        key={`${r}-${c}`}
                        type="button"
                        onClick={() => handleSelectColor(pixel.hex, false)}
                        title={`${pixel.hex} (Fila ${r + 1}, Columna ${c + 1})`}
                        style={{ backgroundColor: pixel.hex }}
                        className={`w-full h-full transition-all duration-150 cursor-pointer relative ${
                          isSelected
                            ? 'scale-[1.26] z-20 rounded-sm ring-2 ring-white shadow-[0_0_16px_rgba(255,255,255,0.85)]'
                            : 'hover:scale-[1.22] hover:z-10 hover:rounded-sm hover:shadow-lg'
                        }`}
                      />
                    );
                  })
                )}
              </div>
            </div>

            {/* Bottom Palette Strip (26 Tones) */}
            <div className="w-full mt-6 pt-5 border-t border-inherit/30 space-y-3">
              <div className="flex items-center justify-between text-xs opacity-75">
                <span className="font-bold uppercase tracking-wider">Paleta Global (26 variantes)</span>
                <span className="font-mono text-[11px]">Fila 1: Luz • Fila 2: Profundo</span>
              </div>

              {/* 13 columns x 2 rows grid */}
              <div
                style={{ gridTemplateColumns: 'repeat(13, minmax(0, 1fr))' }}
                className={`grid gap-1 p-2 rounded-xl border ${
                  effectiveStageDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                }`}
              >
                {/* Fila 1: Luz */}
                {STRIP_ROW_1_LUZ.map((hex) => {
                  const isSelected = hex.toUpperCase() === currentHex.toUpperCase();
                  return (
                    <button
                      key={`luz-${hex}`}
                      type="button"
                      onClick={() => handleSelectColor(hex, true)}
                      title={`Luz: ${hex} (clic para rotar)`}
                      style={{ backgroundColor: hex }}
                      className={`h-7 sm:h-9 rounded-md transition-all cursor-pointer ${
                        isSelected
                          ? 'scale-110 z-10 ring-2 ring-[#3D80FD] shadow-md'
                          : 'hover:scale-105 hover:shadow'
                      }`}
                    />
                  );
                })}

                {/* Fila 2: Profundo */}
                {STRIP_ROW_2_PROFUNDO.map((hex) => {
                  const isSelected = hex.toUpperCase() === currentHex.toUpperCase();
                  return (
                    <button
                      key={`prof-${hex}`}
                      type="button"
                      onClick={() => handleSelectColor(hex, true)}
                      title={`Profundo: ${hex} (clic para rotar)`}
                      style={{ backgroundColor: hex }}
                      className={`h-7 sm:h-9 rounded-md transition-all cursor-pointer ${
                        isSelected
                          ? 'scale-110 z-10 ring-2 ring-[#3D80FD] shadow-md'
                          : 'hover:scale-105 hover:shadow'
                      }`}
                    />
                  );
                })}
              </div>

              <div className="flex items-center gap-2 text-xs opacity-60 pt-1">
                <Info className="w-3.5 h-3.5 text-[#3D80FD] shrink-0" />
                <span>Pulsa en las filas de la paleta para inspeccionar el color y girar la figura dinámicamente +90°.</span>
              </div>
            </div>
          </div>

          {/* Lado Derecho: Ficha Técnica (Info Card) */}
          <div
            className={`lg:col-span-5 rounded-3xl p-6 sm:p-7 border backdrop-blur-md transition-all duration-300 shadow-xl space-y-6 lg:sticky lg:top-28 ${
              isNegative
                ? 'bg-black/40 border-white/10 text-[#FEFAE8]'
                : 'bg-white/80 border-black/10 text-[#060C04]'
            }`}
          >
            {/* Card Header: Service name & Tone badge */}
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-inherit/40">
              <div>
                <h3 className="font-aeonik text-xl sm:text-2xl font-bold tracking-tight">
                  {activeColor.servicio}
                </h3>
                <p className="font-general text-xs uppercase tracking-wider opacity-60 mt-0.5">
                  {activeColor.sub}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                  activeColor.tono === 'Luz'
                    ? 'bg-[#FEFAE8]/20 border-white/20 text-[#FEFAE8]'
                    : 'bg-[#3D80FD]/20 border-[#3D80FD]/40 text-[#3D80FD]'
                }`}
              >
                {activeColor.tono}
              </span>
            </div>

            {/* Big Swatch Banner */}
            <div
              style={{
                backgroundColor: activeColor.hex,
                color: getContrastTextColor(activeColor.hex)
              }}
              className="h-24 sm:h-28 rounded-2xl p-5 flex items-center justify-between shadow-lg transition-colors duration-200 border border-white/20"
            >
              <span className="font-mono text-2xl sm:text-3xl font-extrabold tracking-wider">
                {activeColor.hex}
              </span>

              <button
                type="button"
                onClick={() => handleCopyHex(activeColor.hex)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm border border-white/30 transition-all flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar HEX</span>
              </button>
            </div>

            {/* Technical Specs Grid (RGB, CMYK, Pantone, Uso) */}
            <div className="grid grid-cols-2 gap-3">
              <div
                className={`p-3 rounded-xl border ${
                  isNegative ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                }`}
              >
                <span className="block text-[10px] font-bold uppercase tracking-wider opacity-60">RGB</span>
                <span className="font-mono text-sm font-semibold">{activeColor.rgb}</span>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isNegative ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                }`}
              >
                <span className="block text-[10px] font-bold uppercase tracking-wider opacity-60">CMYK</span>
                <span className="font-mono text-sm font-semibold">{activeColor.cmyk}</span>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isNegative ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                }`}
              >
                <span className="block text-[10px] font-bold uppercase tracking-wider opacity-60">Pantone</span>
                <span className="font-mono text-sm font-semibold">{activeColor.pantone}</span>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isNegative ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                }`}
              >
                <span className="block text-[10px] font-bold uppercase tracking-wider opacity-60">Uso Sugerido</span>
                <span className="font-general text-xs font-bold truncate block">{activeColor.uso}</span>
              </div>
            </div>

            {/* WCAG 2.1 Contrast Box */}
            <div
              className={`p-4 rounded-2xl border space-y-3 ${
                isNegative ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
              }`}
            >
              <span className="block text-xs font-bold uppercase tracking-wider opacity-75">
                Contrastes WCAG 2.1
              </span>

              <div className="flex items-center justify-between text-xs pt-1">
                <span>vs. Fondo Luz (<code>#FEFAE8</code>)</span>
                <span className="font-mono font-bold px-2 py-0.5 rounded bg-black/10 dark:bg-white/10">
                  {activeColor.contrasteLuz}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span>vs. Fondo Profundo (<code>#060C04</code>)</span>
                <span className="font-mono font-bold px-2 py-0.5 rounded bg-black/10 dark:bg-white/10">
                  {activeColor.contrasteProfundo}
                </span>
              </div>
            </div>

            {/* Visual Readability Simulator Tiles */}
            <div className="space-y-2">
              <span className="block text-xs font-bold uppercase tracking-wider opacity-75">
                Validación Visual WCAG 2.1
              </span>

              <div className="grid grid-cols-2 gap-3">
                {/* On Light Background */}
                <div className="h-16 rounded-xl bg-[#FEFAE8] border border-black/15 p-2.5 flex flex-col justify-between relative shadow-sm">
                  <span
                    style={{ color: activeColor.hex }}
                    className="font-general font-bold text-xs"
                  >
                    Texto Muestra
                  </span>
                  {!activeColor.uso.includes('#060C04') && (
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-emerald-600 text-white">
                      Óptimo
                    </span>
                  )}
                  <span className="text-[10px] text-[#060C04]/60 font-mono">Fondo Luz</span>
                </div>

                {/* On Dark Background */}
                <div className="h-16 rounded-xl bg-[#060C04] border border-white/15 p-2.5 flex flex-col justify-between relative shadow-sm">
                  <span
                    style={{ color: activeColor.hex }}
                    className="font-general font-bold text-xs"
                  >
                    Texto Muestra
                  </span>
                  {activeColor.uso.includes('#060C04') && (
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-emerald-600 text-white">
                      Óptimo
                    </span>
                  )}
                  <span className="text-[10px] text-[#FEFAE8]/60 font-mono">Fondo Profundo</span>
                </div>
              </div>
            </div>

            {/* Conditional Dagger † Alert */}
            {activeColor.dagger && (
              <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs flex items-start gap-2.5 leading-relaxed">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>† Atención AA:</strong> El contraste recomendado queda cerca del umbral mínimo 4.5:1. Validar en pantalla e impresión antes de utilizar en textos pequeños o trazos delgados.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="px-5 py-2.5 rounded-full bg-[#3D80FD] text-white font-general text-xs font-bold shadow-2xl flex items-center gap-2 border border-white/20">
            <Check className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </section>
  );
};
