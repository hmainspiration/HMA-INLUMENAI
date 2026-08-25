import React, { useState } from 'react';
import { ServiceItem } from '../../types';
import { CLUSTERS } from '../../data/servicesData';
import { ServiceIcon } from '../ServiceIcons';
import { 
  X, 
  Save, 
  Plus, 
  Trash2, 
  Check, 
  Sparkles, 
  Eye, 
  Code, 
  Palette, 
  RotateCcw, 
  AlertTriangle 
} from 'lucide-react';

interface AdminServiceEditModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSave: (id: string, updated: Partial<ServiceItem>) => void;
}

export const AdminServiceEditModal: React.FC<AdminServiceEditModalProps> = ({
  service,
  onClose,
  onSave,
}) => {
  if (!service) return null;

  const cluster = CLUSTERS[service.clusterId] || CLUSTERS['01'];

  // Form State
  const [nameEn, setNameEn] = useState(service.nameEn);
  const [nameEs, setNameEs] = useState(service.nameEs);
  const [tagline, setTagline] = useState(service.tagline);
  const [description, setDescription] = useState(service.description);
  const [features, setFeatures] = useState<string[]>([...service.features]);
  const [newFeature, setNewFeature] = useState('');
  const [isActive, setIsActive] = useState<boolean>(service.isActive !== false);
  const [underConstructionMessage, setUnderConstructionMessage] = useState(
    service.underConstructionMessage ||
      'Este servicio se encuentra actualmente en fase de actualización y mejoras. Próximamente disponible para cotizaciones.'
  );
  const [colorHex, setColorHex] = useState(service.colorHex || cluster.mainColor);
  const [colorName, setColorName] = useState(service.colorName || '');
  const [rgb, setRgb] = useState(service.rgb || '');
  const [cmyk, setCmyk] = useState(service.cmyk || '');
  const [concept, setConcept] = useState(service.concept || '');
  const [defaultWhatsAppMessage, setDefaultWhatsAppMessage] = useState(service.defaultWhatsAppMessage);
  const [customSvg, setCustomSvg] = useState(service.customSvg || '');
  const [isSvgPreviewValid, setIsSvgPreviewValid] = useState(true);
  const [activeTab, setActiveTab] = useState<'general' | 'design' | 'svg' | 'whatsapp'>('general');

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, idx) => idx !== index));
  };

  const handleSvgChange = (val: string) => {
    setCustomSvg(val);
    if (!val || val.trim().startsWith('<svg')) {
      setIsSvgPreviewValid(true);
    } else {
      setIsSvgPreviewValid(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(service.id, {
      nameEn,
      nameEs,
      tagline,
      description,
      features,
      isActive,
      underConstructionMessage,
      colorHex,
      colorName,
      rgb,
      cmyk,
      concept,
      defaultWhatsAppMessage,
      customSvg: customSvg.trim() ? customSvg.trim() : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <div className="bg-[#0F172A] text-gray-100 rounded-3xl border border-gray-800 max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#152033] px-6 py-4 border-b border-gray-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-black text-white text-sm"
              style={{ backgroundColor: colorHex }}
            >
              {service.serviceNumber}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white font-heading">
                  Editar Módulo {service.serviceNumber} · {service.nameEn}
                </h3>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}
                >
                  {isActive ? '● En Línea / Activo' : '🚧 En Construcción'}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Clúster {cluster.number} · {cluster.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="bg-[#0B1323] px-6 py-2 border-b border-gray-800 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'general'
                ? 'bg-[#00B4D8] text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            1. Textos & Entregables
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('design')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'design'
                ? 'bg-[#00B4D8] text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            2. Color & Ficha Técnica
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('svg')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'svg'
                ? 'bg-[#00B4D8] text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            3. Logotipo / SVG Personalizado
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('whatsapp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'whatsapp'
                ? 'bg-[#00B4D8] text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            4. Mensaje WhatsApp
          </button>
        </div>

        {/* Form Body (Scrollable) */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Active / Inactive Status Switch */}
          <div className="bg-[#141E33] p-4 rounded-2xl border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase text-gray-400 block mb-0.5">
                Estado del Servicio para Clientes
              </span>
              <p className="text-sm font-semibold text-white">
                {isActive ? 'Servicio Activo (Visible para cotizar)' : 'Servicio Deshabilitado (Muestra aviso "En Construcción")'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/30'
                  : 'bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-900/30'
              }`}
            >
              <span>{isActive ? 'Servicio: Habilitado (ON)' : 'Servicio: En Construcción (OFF)'}</span>
            </button>
          </div>

          {!isActive && (
            <div className="bg-amber-950/30 border border-amber-800/60 p-4 rounded-2xl animate-in fade-in">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Mensaje mostrado al cliente cuando este servicio está en construcción:</span>
              </div>
              <textarea
                rows={2}
                value={underConstructionMessage}
                onChange={(e) => setUnderConstructionMessage(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#090F1E] border border-amber-800/80 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          )}

          {/* TAB 1: Textos & Entregables */}
          {activeTab === 'general' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Nombre en Inglés (Oficial):
                  </label>
                  <input
                    type="text"
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Nombre en Español (Comercial):
                  </label>
                  <input
                    type="text"
                    value={nameEs}
                    onChange={(e) => setNameEs(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Lema / Tagline del Servicio:
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Descripción Completa:
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                />
              </div>

              {/* Features / Deliverables List */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-gray-300 mb-2">
                  Lista de Características / Entregables:
                </label>
                
                <div className="space-y-2 mb-3">
                  {features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-[#141E33] px-3 py-2 rounded-xl border border-gray-800">
                      <Check className="w-3.5 h-3.5 text-[#00B4D8] shrink-0" />
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => {
                          const updated = [...features];
                          updated[idx] = e.target.value;
                          setFeatures(updated);
                        }}
                        className="flex-1 bg-transparent text-xs text-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-gray-400 hover:text-red-400 transition-colors p-1 cursor-pointer"
                        title="Eliminar entregable"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Escribe una nueva característica (ej. Manual de marca PDF)..."
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-[#090F1E] border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Color & Ficha Técnica */}
          {activeTab === 'design' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="bg-[#141E33] p-4 rounded-2xl border border-gray-800 flex items-center gap-4">
                <input
                  type="color"
                  value={colorHex}
                  onChange={(e) => setColorHex(e.target.value)}
                  className="w-14 h-14 rounded-xl cursor-pointer border-0 p-0 bg-transparent"
                />
                <div>
                  <span className="text-xs font-bold text-gray-300 block">Color de Marca Oficial (HEX):</span>
                  <input
                    type="text"
                    value={colorHex}
                    onChange={(e) => setColorHex(e.target.value)}
                    className="font-mono text-sm font-bold text-white bg-[#090F1E] border border-gray-700 px-3 py-1.5 rounded-lg mt-1 w-36 uppercase focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                  />
                </div>
                <div 
                  className="ml-auto w-20 h-10 rounded-xl border border-white/20 shadow-inner flex items-center justify-center text-xs font-mono font-bold text-white"
                  style={{ backgroundColor: colorHex }}
                >
                  Muestra
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Nombre del Color:
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Cyan Celestial"
                    value={colorName}
                    onChange={(e) => setColorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Concepto Geométrico:
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Líneas de luz y vectores"
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Valores RGB:
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. 34, 128, 172"
                    value={rgb}
                    onChange={(e) => setRgb(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Valores CMYK:
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. 80, 26, 0, 33"
                    value={cmyk}
                    onChange={(e) => setCmyk(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Logotipo / SVG Personalizado */}
          {activeTab === 'svg' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="bg-[#141E33] p-4 rounded-2xl border border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#40C7E2] flex items-center gap-1.5">
                    <Code className="w-4 h-4" />
                    <span>Pegar Código Vectorial SVG:</span>
                  </span>

                  {customSvg && (
                    <button
                      type="button"
                      onClick={() => handleSvgChange('')}
                      className="text-[11px] text-gray-400 hover:text-amber-400 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Restablecer SVG Original</span>
                    </button>
                  )}
                </div>

                <p className="text-xs text-gray-400 mb-3">
                  Puedes abrir tu archivo .svg con el bloc de notas, copiar el código completo que empieza con <code>&lt;svg ...&gt;</code> y pegarlo aquí abajo para reemplazar el icono de este servicio.
                </p>

                <textarea
                  rows={6}
                  placeholder="<svg viewBox='0 0 100 100' ...> <path .../> </svg>"
                  value={customSvg}
                  onChange={(e) => handleSvgChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-emerald-400 text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                />
              </div>

              {/* Live Preview Box */}
              <div>
                <span className="text-xs font-bold text-gray-300 block mb-2">
                  Vista Previa del Isotipo en Tiempo Real:
                </span>

                <div className="grid grid-cols-2 gap-4">
                  {/* Dark Mode Preview */}
                  <div className="bg-[#060C04] p-6 rounded-2xl border border-gray-800 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                      En Fondo Oscuro
                    </span>
                    <div className="w-20 h-20 flex items-center justify-center">
                      <ServiceIcon
                        type={service.iconType}
                        color={colorHex}
                        customSvg={customSvg}
                        className="w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Light Mode Preview */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col items-center justify-center text-center text-gray-800">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                      En Fondo Claro
                    </span>
                    <div className="w-20 h-20 flex items-center justify-center">
                      <ServiceIcon
                        type={service.iconType}
                        color={colorHex}
                        customSvg={customSvg}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WhatsApp Message */}
          {activeTab === 'whatsapp' && (
            <div className="space-y-4 animate-in fade-in">
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Mensaje predeterminado para el enlace de WhatsApp:
              </label>
              <textarea
                rows={4}
                value={defaultWhatsAppMessage}
                onChange={(e) => setDefaultWhatsAppMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
              />
              <p className="text-[11px] text-gray-400">
                Este mensaje se cargará automáticamente cuando el cliente haga clic en el botón de WhatsApp de este servicio.
              </p>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-gray-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-700 text-xs font-bold text-gray-300 hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#00B4D8] hover:bg-[#0096B4] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-[#00B4D8]/20 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Cambios</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
