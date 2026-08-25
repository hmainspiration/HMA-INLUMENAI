import React, { useState, useEffect, useRef } from 'react';
import { HmaLogo } from '../HmaLogo';
import { ShieldCheck, Lock, ArrowLeft, KeyRound, AlertCircle, Sparkles } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const CORRECT_PIN = '291520';

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onCancel }) => {
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (error) setError(false);
    
    // Only accept numeric digit
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned && value !== '') return;

    const newPin = [...pin];
    newPin[index] = cleaned ? cleaned[cleaned.length - 1] : '';
    setPin(newPin);

    // Auto move to next input
    if (cleaned && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // If all 6 digits are entered, auto-verify
    const completePin = newPin.join('');
    if (completePin.length === 6) {
      verifyPin(completePin);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData) {
      const newPin = [...pin];
      for (let i = 0; i < 6; i++) {
        newPin[i] = pastedData[i] || '';
      }
      setPin(newPin);
      if (pastedData.length === 6) {
        verifyPin(pastedData);
      } else {
        inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
      }
    }
  };

  const verifyPin = (enteredPin: string) => {
    if (enteredPin === CORRECT_PIN) {
      setError(false);
      sessionStorage.setItem('HMA_ADMIN_AUTH', 'true');
      onSuccess();
    } else {
      setError(true);
      setErrorMessage('Código de 6 dígitos incorrecto. Por favor verifícalo.');
      // Shake and clear after slight delay
      setTimeout(() => {
        setPin(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }, 700);
    }
  };

  const handleNumpadClick = (digit: string) => {
    if (digit === 'del') {
      const lastIndex = pin.map(p => Boolean(p)).lastIndexOf(true);
      if (lastIndex >= 0) {
        const newPin = [...pin];
        newPin[lastIndex] = '';
        setPin(newPin);
        inputRefs.current[lastIndex]?.focus();
      }
      return;
    }

    const firstEmptyIndex = pin.findIndex((p) => p === '');
    if (firstEmptyIndex !== -1) {
      handleChange(firstEmptyIndex, digit);
    }
  };

  return (
    <div className="min-h-screen bg-[#070D18] flex flex-col items-center justify-center p-4 relative overflow-hidden text-white font-sans selection:bg-[#00B4D8] selection:text-white">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#00B4D8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#7B2CBF]/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Subtle Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <HmaLogo variant="monochrome" color="#FFFFFF" className="w-[600px] h-[600px]" />
      </div>

      {/* Main Card */}
      <div className={`w-full max-w-md bg-[#0F172A]/90 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl relative z-10 transition-all duration-300 ${error ? 'animate-shake border-red-500/50 ring-2 ring-red-500/30' : ''}`}>
        
        {/* Top Back Button */}
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white mb-6 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Volver al Sitio Público</span>
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#00B4D8]/10 border border-[#00B4D8]/30 flex items-center justify-center mb-4 shadow-lg shadow-[#00B4D8]/10">
            <HmaLogo variant="monochrome" color="#00B4D8" className="w-10 h-10" />
          </div>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-[#40C7E2] text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
            <Lock className="w-3 h-3" />
            <span>Acceso Administrativo Seguro</span>
          </div>

          <h1 className="text-2xl font-black font-heading text-white tracking-tight">
            Panel de Control HMA
          </h1>
          <p className="text-xs text-gray-400 mt-1 max-w-xs">
            Ingresa tu código PIN de 6 dígitos para administrar los módulos, enlaces, muestras y colores.
          </p>
        </div>

        {/* PIN Inputs Strip */}
        <div className="mb-6">
          <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
            {pin.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold font-mono rounded-xl border bg-[#090F1E] text-white focus:outline-none transition-all ${
                  error
                    ? 'border-red-500 bg-red-950/20 text-red-400'
                    : digit
                    ? 'border-[#00B4D8] ring-2 ring-[#00B4D8]/30 shadow-md shadow-[#00B4D8]/10'
                    : 'border-gray-700 hover:border-gray-500'
                }`}
              />
            ))}
          </div>

          {error && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-red-400 mt-3 font-semibold animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Virtual Numeric Keypad for Touch / Convenience */}
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mb-6">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleNumpadClick(num)}
              className="py-3 rounded-xl bg-[#141E33] hover:bg-[#1E2D4A] active:scale-95 text-base font-bold text-gray-200 border border-gray-700/60 transition-all cursor-pointer"
            >
              {num}
            </button>
          ))}
          <div />
          <button
            type="button"
            onClick={() => handleNumpadClick('0')}
            className="py-3 rounded-xl bg-[#141E33] hover:bg-[#1E2D4A] active:scale-95 text-base font-bold text-gray-200 border border-gray-700/60 transition-all cursor-pointer"
          >
            0
          </button>
          <button
            type="button"
            onClick={() => handleNumpadClick('del')}
            className="py-3 rounded-xl bg-[#141E33] hover:bg-red-950/40 active:scale-95 text-xs font-bold text-gray-400 hover:text-red-400 border border-gray-700/60 transition-all cursor-pointer flex items-center justify-center"
          >
            Borrar
          </button>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-gray-800 text-center">
          <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sistema Protegido · HMA INLUMENAI v1.19.0</span>
          </p>
        </div>

      </div>

    </div>
  );
};
