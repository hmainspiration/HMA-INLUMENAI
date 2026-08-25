import React, { useRef } from 'react';
import { useData } from '../../context/DataContext';
import { Sparkles, Save, Image as ImageIcon, Trash2 } from 'lucide-react';

export const AdminTimelineTab: React.FC = () => {
  const { siteConfig, updateSiteConfig, timelineMilestones, updateTimelineMilestone } = useData();

  const handleLogoUpload = (hour: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      updateTimelineMilestone(hour, { customLogo: result });
    };
    reader.readAsDataURL(file);
  };

  const handleCenterLogoUpload = (hour: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      updateTimelineMilestone(hour, { centerLogo: result });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = (hour: number) => {
    updateTimelineMilestone(hour, { customLogo: undefined });
  };

  const handleRemoveCenterLogo = (hour: number) => {
    updateTimelineMilestone(hour, { centerLogo: undefined });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in pb-12">
      
      {/* General Configuration */}
      <div className="bg-[#0F172A] p-6 rounded-3xl border border-gray-800 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-[#00B4D8]" />
          <h3 className="text-lg font-black font-heading text-white">
            Configuración General: El Reloj de las 12 Horas
          </h3>
        </div>

        <div className="flex items-center gap-3 py-2 border-b border-gray-800">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={siteConfig.showAnniversaryClock !== false}
              onChange={(e) => updateSiteConfig({ showAnniversaryClock: e.target.checked })}
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00B4D8]"></div>
          </label>
          <span className="text-sm font-bold text-gray-200">
            Mostrar Módulo Conmemorativo (10 Años) al Público
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-300 mb-1">Título del Módulo</label>
            <input
              type="text"
              value={siteConfig.anniversarySectionTitle || ''}
              onChange={(e) => updateSiteConfig({ anniversarySectionTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-300 mb-1">Subtítulo (Descripción Corta)</label>
            <input
              type="text"
              value={siteConfig.anniversarySectionSubtitle || ''}
              onChange={(e) => updateSiteConfig({ anniversarySectionSubtitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-300 mb-1">Insignia (Badge Top)</label>
            <input
              type="text"
              value={siteConfig.anniversarySectionBadge || ''}
              onChange={(e) => updateSiteConfig({ anniversarySectionBadge: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
            />
          </div>
        </div>
      </div>

      {/* 12 Hours Configuration */}
      <div className="bg-[#0F172A] p-6 rounded-3xl border border-gray-800 space-y-4">
        <h3 className="text-lg font-black font-heading text-white border-b border-gray-800 pb-2">
          Milestones: Las 12 Horas del Reloj
        </h3>
        
        <div className="space-y-6">
          {timelineMilestones.map((milestone) => (
            <div key={milestone.hour} className="bg-[#141E33] p-5 rounded-2xl border border-gray-700 flex flex-col md:flex-row gap-6">
              
              {/* Hour Indicator & Logos */}
              <div className="flex flex-col items-center gap-3 w-full md:w-1/3 shrink-0">
                <div className="text-4xl font-heading font-black text-white bg-gray-800/50 w-full text-center py-2 rounded-xl">
                  {milestone.hour}
                </div>
                
                <div className="grid grid-cols-2 gap-2 w-full">
                  {/* Custom Logo (Tarjeta) */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold text-gray-400 text-center uppercase">Logo (Tarjeta)</span>
                    <div className="w-full aspect-square bg-[#0B1323] border border-dashed border-gray-700 rounded-xl flex items-center justify-center relative overflow-hidden group">
                      {milestone.customLogo ? (
                        <img src={milestone.customLogo} alt={`Logo H${milestone.hour}`} className="w-full h-full object-contain p-2" />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-600">
                          <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                          <span className="text-[9px] uppercase font-bold text-center px-1 leading-tight">Sin Logo</span>
                        </div>
                      )}
                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-sm">
                        <label className="cursor-pointer bg-[#00B4D8] text-white px-2 py-1 rounded text-[10px] font-bold hover:bg-[#0096B4] text-center w-3/4">
                          Subir
                          <input type="file" accept="image/png, image/svg+xml, image/jpeg" className="hidden" onChange={(e) => handleLogoUpload(milestone.hour, e)} />
                        </label>
                        {milestone.customLogo && (
                          <button onClick={() => handleRemoveLogo(milestone.hour)} className="bg-red-900/80 text-white px-2 py-1 rounded text-[10px] font-bold hover:bg-red-800 flex items-center justify-center gap-1 w-3/4">
                            <Trash2 className="w-3 h-3" /> Quitar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Center Logo (Reloj) */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold text-gray-400 text-center uppercase">Submarca (Reloj)</span>
                    <div className="w-full aspect-square bg-[#0B1323] border border-dashed border-gray-700 rounded-xl flex items-center justify-center relative overflow-hidden group">
                      {milestone.centerLogo ? (
                        <img src={milestone.centerLogo} alt={`Submarca H${milestone.hour}`} className="w-full h-full object-contain p-2" />
                      ) : milestone.logoPath ? (
                        <img src={milestone.logoPath} alt={`Submarca H${milestone.hour}`} className="w-full h-full object-contain p-2 opacity-50 grayscale" />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-600">
                          <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                          <span className="text-[9px] uppercase font-bold text-center px-1 leading-tight">Sin Logo</span>
                        </div>
                      )}
                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-sm">
                        <label className="cursor-pointer bg-[#00B4D8] text-white px-2 py-1 rounded text-[10px] font-bold hover:bg-[#0096B4] text-center w-3/4">
                          Subir
                          <input type="file" accept="image/png, image/svg+xml, image/jpeg" className="hidden" onChange={(e) => handleCenterLogoUpload(milestone.hour, e)} />
                        </label>
                        {milestone.centerLogo && (
                          <button onClick={() => handleRemoveCenterLogo(milestone.hour)} className="bg-red-900/80 text-white px-2 py-1 rounded text-[10px] font-bold hover:bg-red-800 flex items-center justify-center gap-1 w-3/4">
                            <Trash2 className="w-3 h-3" /> Quitar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-[9px] text-gray-500 text-center uppercase tracking-wider">Formatos: SVG, PNG (Transparente)</p>
              </div>

              {/* Data Form */}
              <div className="w-full md:w-2/3 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Título / Concepto</label>
                    <input
                      type="text"
                      value={milestone.title}
                      onChange={(e) => updateTimelineMilestone(milestone.hour, { title: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#090F1E] border border-gray-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#00B4D8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Rango de Año(s)</label>
                    <input
                      type="text"
                      value={milestone.yearRange}
                      onChange={(e) => updateTimelineMilestone(milestone.hour, { yearRange: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#090F1E] border border-gray-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#00B4D8]"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Etiqueta Destacada (Highlight Tag)</label>
                  <input
                    type="text"
                    value={milestone.highlightTag}
                    onChange={(e) => updateTimelineMilestone(milestone.hour, { highlightTag: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#090F1E] border border-gray-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#00B4D8]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Descripción de la etapa</label>
                  <textarea
                    rows={3}
                    value={milestone.description}
                    onChange={(e) => updateTimelineMilestone(milestone.hour, { description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#090F1E] border border-gray-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#00B4D8] resize-none"
                  />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
