import React, { useState } from 'react';
import { PortfolioItem, ClusterId } from '../../types';
import { CLUSTERS } from '../../data/servicesData';
import { X, Save, Plus, Trash2, FolderGit2 } from 'lucide-react';

interface AdminPortfolioEditModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onSave: (data: Omit<PortfolioItem, 'id'>, id?: string) => void;
}

export const AdminPortfolioEditModal: React.FC<AdminPortfolioEditModalProps> = ({
  item,
  onClose,
  onSave,
}) => {
  const isEditing = Boolean(item);

  const [title, setTitle] = useState(item?.title || '');
  const [subtitle, setSubtitle] = useState(item?.subtitle || '');
  const [clusterId, setClusterId] = useState<ClusterId>(item?.clusterId || '01');
  const [category, setCategory] = useState(item?.category || 'Identidad & Arte');
  const [year, setYear] = useState(item?.year || '2026');
  const [description, setDescription] = useState(item?.description || '');
  const [deliverables, setDeliverables] = useState<string[]>(item?.deliverables ? [...item.deliverables] : []);
  const [newDeliverable, setNewDeliverable] = useState('');
  const [externalLink, setExternalLink] = useState(item?.externalLink || '');

  const handleAddDeliverable = () => {
    if (newDeliverable.trim()) {
      setDeliverables([...deliverables, newDeliverable.trim()]);
      setNewDeliverable('');
    }
  };

  const handleRemoveDeliverable = (index: number) => {
    setDeliverables(deliverables.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const cluster = CLUSTERS[clusterId];
    const badgeColor = `bg-[${cluster.mainColor}]/10 text-[${cluster.darkColor}] border-[${cluster.mainColor}]/30`;

    const portfolioData: Omit<PortfolioItem, 'id'> = {
      title: title.trim(),
      subtitle: subtitle.trim(),
      clusterId,
      category: category.trim(),
      year: year.trim(),
      description: description.trim(),
      deliverables,
      badgeColor,
      externalLink: externalLink.trim() || undefined,
    };

    onSave(portfolioData, item?.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="bg-[#0F172A] text-gray-100 rounded-3xl border border-gray-800 max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#152033] px-6 py-4 border-b border-gray-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#7B2CBF]/20 flex items-center justify-center text-[#9C61CF]">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-white font-heading">
                {isEditing ? 'Editar Proyecto del Portafolio' : 'Nuevo Proyecto para el Portafolio'}
              </h3>
              <p className="text-[11px] text-gray-400">
                Gestiona las tarjetas y muestras del portafolio.
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Título del Proyecto:
            </label>
            <input
              type="text"
              placeholder="Ej. Identidad Conmemorativa HMA 10 Años"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Subtítulo / Disciplina:
            </label>
            <input
              type="text"
              placeholder="Ej. Branding & Sistema Visual Integral"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Clúster:
              </label>
              <select
                value={clusterId}
                onChange={(e) => setClusterId(e.target.value as ClusterId)}
                className="w-full px-3 py-2 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
              >
                {Object.values(CLUSTERS).map((cl) => (
                  <option key={cl.id} value={cl.id}>
                    {cl.number} · {cl.shortName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Categoría:
              </label>
              <input
                type="text"
                placeholder="Ej. Identidad & Arte"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Año:
              </label>
              <input
                type="text"
                placeholder="Ej. 2026"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Descripción del Proyecto:
            </label>
            <textarea
              rows={3}
              placeholder="Detalla en qué consistió el proyecto..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
            />
          </div>

          {/* Deliverables List */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5">
              Entregables / Piezas Desarrolladas:
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {deliverables.map((del, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141E33] border border-gray-700 text-xs text-white"
                >
                  <span>{del}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDeliverable(idx)}
                    className="text-gray-400 hover:text-red-400 p-0.5 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ej. Isologo vectorial, Manual PDF..."
                value={newDeliverable}
                onChange={(e) => setNewDeliverable(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddDeliverable();
                  }
                }}
                className="flex-1 px-3 py-2 rounded-xl bg-[#090F1E] border border-gray-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
              />
              <button
                type="button"
                onClick={handleAddDeliverable}
                className="px-3.5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir</span>
              </button>
            </div>
          </div>

          {/* External link to Facebook/Behance */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Enlace Externo al Álbum o Proyecto (Facebook / Behance):
            </label>
            <input
              type="url"
              placeholder="https://www.facebook.com/media/set/?set=..."
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#090F1E] border border-gray-700 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
            />
          </div>

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
              className="px-6 py-2.5 rounded-xl bg-[#7B2CBF] hover:bg-[#6820A3] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-[#7B2CBF]/20 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Guardar Proyecto' : 'Crear Proyecto'}</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
