import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { CLUSTERS } from '../data/servicesData';
import { Sparkles, ArrowRight } from 'lucide-react';

interface PortfolioSectionProps {
  onSelectServiceRequest?: (serviceName: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectServiceRequest }) => {
  const { portfolioItems } = useData();
  const [selectedCluster, setSelectedCluster] = useState<string>('all');

  const filteredItems = portfolioItems.filter((item) => {
    return selectedCluster === 'all' || item.clusterId === selectedCluster;
  });

  return (
    <section id="portafolio" className="py-20 bg-white dark:bg-[#0B0F19] relative border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7B2CBF]/10 dark:bg-[#7B2CBF]/20 text-[#581F87] dark:text-[#9C61CF] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#7B2CBF] dark:text-[#9C61CF]" />
              Galería de Trabajos
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] dark:text-white font-heading tracking-tight">
              Portafolio & Proyectos
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mt-2 max-w-2xl">
              Muestras representativas de piezas gráficas, producciones de audio, publicaciones conmemorativas y soluciones digitales.
            </p>
          </div>

          {/* Cluster Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCluster('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCluster === 'all'
                  ? 'bg-[#111827] dark:bg-white text-white dark:text-gray-900 shadow-xs'
                  : 'bg-gray-100 dark:bg-[#151D2C] text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              Todos
            </button>
            {Object.values(CLUSTERS).map((cluster) => (
              <button
                key={cluster.id}
                onClick={() => setSelectedCluster(cluster.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCluster === cluster.id
                    ? 'bg-[#111827] dark:bg-white text-white dark:text-gray-900 shadow-xs'
                    : 'bg-gray-100 dark:bg-[#151D2C] text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
              >
                <span>{cluster.number} · {cluster.shortName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const cluster = CLUSTERS[item.clusterId];
            const whatsappProjectUrl = `https://wa.me/?text=${encodeURIComponent(
              `Hola HMA Inlumenai, me llamó la atención su proyecto de "${item.title}" y quisiera cotizar algo similar.`
            )}`;

            return (
              <div
                key={item.id}
                className="bg-[#FAFAFC] dark:bg-[#151D2C] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
              >
                <div>
                  {/* Category & Year */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="text-[10px] font-extrabold px-2.5 py-1 rounded-md border font-heading"
                      style={{
                        backgroundColor: `${cluster.mainColor}15`,
                        color: cluster.darkColor,
                        borderColor: `${cluster.mainColor}35`,
                      }}
                    >
                      {item.category}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-gray-400">
                      {item.year}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-black text-[#111827] dark:text-white font-heading tracking-tight group-hover:text-[#00B4D8] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Deliverables */}
                  <div className="mb-4 pt-3 border-t border-gray-200/60 dark:border-gray-800">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2 block">
                      Entregables
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.deliverables.map((del, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium"
                        >
                          {del}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-gray-200/60 dark:border-gray-800 flex flex-col gap-2">
                  {item.externalLink && (
                    <a
                      href={item.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#00B4D8] hover:bg-[#0096B4] text-white text-xs font-bold transition-colors"
                    >
                      <span>Ver Proyecto en Álbum</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href={whatsappProjectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white dark:bg-[#1E293B] hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-800 dark:text-gray-200 transition-colors"
                  >
                    <span>Quiero algo similar</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#00B4D8]" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
