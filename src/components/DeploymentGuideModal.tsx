import React, { useState } from 'react';
import { X, Github, Globe, Database, Terminal, CheckCircle2, Copy, CheckCheck, ExternalLink, Lightbulb, ShieldCheck } from 'lucide-react';

interface DeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentGuideModal: React.FC<DeploymentGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'workflow' | 'github' | 'vercel' | 'database'>('workflow');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#151D2C] rounded-3xl border border-gray-200 dark:border-gray-800 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col transition-colors">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 dark:bg-[#151D2C]/95 backdrop-blur-md px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00B4D8]/10 dark:bg-[#00B4D8]/20 text-[#007F98] dark:text-[#40C7E2] flex items-center justify-center font-bold">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-black text-[#111827] dark:text-white font-heading">
                Guía Paso a Paso para Desplegar tu Web
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Diseñada especialmente para no programadores · Flujo HMA INLUMENAI
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 px-6 bg-gray-50/50 dark:bg-[#0F172A] gap-2 pt-2">
          <button
            onClick={() => setActiveTab('workflow')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'workflow'
                ? 'border-[#00B4D8] text-[#007F98] dark:text-[#40C7E2] bg-white dark:bg-[#151D2C] rounded-t-lg'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            1. Resumen del Flujo
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'github'
                ? 'border-[#00B4D8] text-[#007F98] dark:text-[#40C7E2] bg-white dark:bg-[#151D2C] rounded-t-lg'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            2. GitHub
          </button>
          <button
            onClick={() => setActiveTab('vercel')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'vercel'
                ? 'border-[#00B4D8] text-[#007F98] dark:text-[#40C7E2] bg-white dark:bg-[#151D2C] rounded-t-lg'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            3. Vercel
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'database'
                ? 'border-[#00B4D8] text-[#007F98] dark:text-[#40C7E2] bg-white dark:bg-[#151D2C] rounded-t-lg'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            4. Base de Datos
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 flex-1 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          
          {activeTab === 'workflow' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-200 mb-1">Tu aplicación está 100% lista para producción</h4>
                  <p className="text-emerald-800 dark:text-emerald-300 text-xs">
                    Todo el código está optimizado con Vite, React y Tailwind CSS, y cuenta con modo oscuro y claro integrado.
                  </p>
                </div>
              </div>

              <h4 className="font-black text-gray-900 dark:text-white font-heading text-sm uppercase tracking-wider">
                El Flujo en 3 Pasos Simples:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-800">
                  <span className="w-6 h-6 rounded-full bg-[#111827] dark:bg-white text-white dark:text-gray-900 flex items-center justify-center text-xs font-black mb-2">1</span>
                  <strong className="block text-gray-900 dark:text-white font-bold mb-1">Exportar a GitHub</strong>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Guarda el código fuente de forma segura en tu cuenta personal de GitHub.</p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-800">
                  <span className="w-6 h-6 rounded-full bg-[#00B4D8] text-white flex items-center justify-center text-xs font-black mb-2">2</span>
                  <strong className="block text-gray-900 dark:text-white font-bold mb-1">Conectar con Vercel</strong>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Importa el repositorio con 1 solo clic. Vercel creará tu enlace web público gratis.</p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-800">
                  <span className="w-6 h-6 rounded-full bg-[#7B2CBF] text-white flex items-center justify-center text-xs font-black mb-2">3</span>
                  <strong className="block text-gray-900 dark:text-white font-bold mb-1">Dominio Propio</strong>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Conecta tu dominio (ej. hmainlumenai.com) o usa el enlace gratuito .vercel.app.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'github' && (
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 dark:text-white">Paso 1: Exportar tu código a GitHub</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Ve al menú superior de Google AI Studio y haz clic en <strong>Export</strong> o <strong>Settings &gt; Export to GitHub</strong>.</li>
                <li>Conecta tu cuenta de GitHub (o descarga el ZIP si prefieres).</li>
                <li>Nombra tu repositorio como <code>hma-inlumenai-web</code>.</li>
              </ol>
            </div>
          )}

          {activeTab === 'vercel' && (
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 dark:text-white">Paso 2: Despliegue en Vercel (Gratis)</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Entra a <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#00B4D8] font-bold hover:underline">vercel.com</a> e inicia sesión con tu cuenta de GitHub.</li>
                <li>Haz clic en <strong>Add New... &gt; Project</strong>.</li>
                <li>Selecciona tu repositorio <code>hma-inlumenai-web</code> y haz clic en <strong>Deploy</strong>.</li>
                <li>En menos de 60 segundos tu sitio web estará publicado en internet con certificado SSL (candado verde) gratuito.</li>
              </ol>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 dark:text-white">Opción de Base de Datos</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Tu catálogo actualmente funciona de manera ultra rápida con datos estructurados y enlaces multimedia directos. Si en el futuro necesitas un panel administrativo multi-usuario, puedes activar Firebase o Supabase con solo pedirlo en cualquier momento.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 dark:bg-[#0F172A] border-t border-gray-100 dark:border-gray-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#111827] dark:bg-white hover:bg-black dark:hover:bg-gray-100 text-white dark:text-gray-900 text-xs font-bold transition-colors cursor-pointer"
          >
            Cerrar Guía
          </button>
        </div>

      </div>
    </div>
  );
};
