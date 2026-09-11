import fs from 'fs';

let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf-8');

const newFormContent = `
              <form onSubmit={handleSaveConfig} className="space-y-8">
                
                {/* 1. SECCIONES VISIBILIDAD */}
                <div className="bg-black/5 dark:bg-white/5 p-6 rounded-xl border border-black/10 dark:border-white/10 space-y-4">
                  <h3 className="text-lg font-bold">Visibilidad de Secciones</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['showHero', 'showArchitecture', 'showServices', 'showDifferentiators', 'showTimeline', 'showContact'].map(key => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={siteConfig[key as keyof typeof siteConfig] as boolean} onChange={e => setSiteConfig({...siteConfig, [key]: e.target.checked})} className="w-4 h-4 accent-[#3D80FD]" />
                        <span className="text-sm font-medium">{key.replace('show', '')}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 2. CONTACTO Y REDES SOCIALES */}
                <div className="bg-black/5 dark:bg-white/5 p-6 rounded-xl border border-black/10 dark:border-white/10 space-y-6">
                  <h3 className="text-lg font-bold">Contacto y Redes Sociales</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase font-bold tracking-wider opacity-60">Email de Contacto</label>
                      <input type="email" value={siteConfig.contactEmail} onChange={e => setSiteConfig({...siteConfig, contactEmail: e.target.value})} className={\`px-4 py-2 rounded-lg text-sm outline-none \${isNegative ? 'bg-black/50' : 'bg-white'}\`} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase font-bold tracking-wider opacity-60">Teléfono</label>
                      <input type="text" value={siteConfig.contactPhone} onChange={e => setSiteConfig({...siteConfig, contactPhone: e.target.value})} className={\`px-4 py-2 rounded-lg text-sm outline-none \${isNegative ? 'bg-black/50' : 'bg-white'}\`} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs uppercase font-bold tracking-wider opacity-60">Ubicación</label>
                        <label className="flex items-center gap-1 cursor-pointer"><input type="checkbox" checked={siteConfig.showLocation} onChange={e => setSiteConfig({...siteConfig, showLocation: e.target.checked})} className="accent-[#3D80FD]"/><span className="text-xs">Mostrar</span></label>
                      </div>
                      <input type="text" value={siteConfig.locationAddress} onChange={e => setSiteConfig({...siteConfig, locationAddress: e.target.value})} className={\`px-4 py-2 rounded-lg text-sm outline-none \${isNegative ? 'bg-black/50' : 'bg-white'}\`} />
                    </div>
                  </div>
                  
                  <div className="border-t border-inherit pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-sm">Enlaces Sociales</h4>
                      <label className="flex items-center gap-1 cursor-pointer"><input type="checkbox" checked={siteConfig.showSocials} onChange={e => setSiteConfig({...siteConfig, showSocials: e.target.checked})} className="accent-[#3D80FD]"/><span className="text-xs font-bold">Mostrar Iconos Sociales</span></label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs opacity-60">Instagram URL</label>
                        <input type="text" value={siteConfig.socialInstagram} onChange={e => setSiteConfig({...siteConfig, socialInstagram: e.target.value})} className={\`px-4 py-2 rounded-lg text-sm outline-none \${isNegative ? 'bg-black/50' : 'bg-white'}\`} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs opacity-60">Facebook URL</label>
                        <input type="text" value={siteConfig.socialFacebook} onChange={e => setSiteConfig({...siteConfig, socialFacebook: e.target.value})} className={\`px-4 py-2 rounded-lg text-sm outline-none \${isNegative ? 'bg-black/50' : 'bg-white'}\`} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs opacity-60">LinkedIn URL</label>
                        <input type="text" value={siteConfig.socialLinkedin} onChange={e => setSiteConfig({...siteConfig, socialLinkedin: e.target.value})} className={\`px-4 py-2 rounded-lg text-sm outline-none \${isNegative ? 'bg-black/50' : 'bg-white'}\`} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs opacity-60">YouTube URL</label>
                        <input type="text" value={siteConfig.socialYoutube} onChange={e => setSiteConfig({...siteConfig, socialYoutube: e.target.value})} className={\`px-4 py-2 rounded-lg text-sm outline-none \${isNegative ? 'bg-black/50' : 'bg-white'}\`} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs opacity-60">WhatsApp URL</label>
                        <input type="text" value={siteConfig.socialWhatsapp} onChange={e => setSiteConfig({...siteConfig, socialWhatsapp: e.target.value})} className={\`px-4 py-2 rounded-lg text-sm outline-none \${isNegative ? 'bg-black/50' : 'bg-white'}\`} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. HERO (Textos y Tarjetas) */}
                <div className="bg-black/5 dark:bg-white/5 p-6 rounded-xl border border-black/10 dark:border-white/10 space-y-6">
                  <h3 className="text-lg font-bold">Inicio (Hero)</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase font-bold tracking-wider opacity-60">Título Principal</label>
                      <input type="text" value={siteConfig.heroTitle} onChange={e => setSiteConfig({...siteConfig, heroTitle: e.target.value})} className={\`px-4 py-2 rounded-lg text-sm outline-none \${isNegative ? 'bg-black/50' : 'bg-white'}\`} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase font-bold tracking-wider opacity-60">Palabra Resaltada (Azul)</label>
                      <input type="text" value={siteConfig.heroHighlight} onChange={e => setSiteConfig({...siteConfig, heroHighlight: e.target.value})} className={\`px-4 py-2 rounded-lg text-sm outline-none \${isNegative ? 'bg-black/50' : 'bg-white'}\`} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase font-bold tracking-wider opacity-60">Descripción Corta</label>
                      <textarea value={siteConfig.heroDescription} onChange={e => setSiteConfig({...siteConfig, heroDescription: e.target.value})} className={\`px-4 py-2 rounded-lg text-sm h-20 resize-none outline-none \${isNegative ? 'bg-black/50' : 'bg-white'}\`} />
                    </div>
                  </div>

                  <div className="border-t border-inherit pt-4">
                    <h4 className="font-bold text-sm mb-4">Tarjetas de Presentación (Métricas del Hero)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Tarjeta 1 */}
                      <div className="flex flex-col gap-2 p-3 border border-inherit rounded-lg">
                        <label className="text-xs opacity-60">Métrica 1</label>
                        <input type="text" value={siteConfig.heroMetric1Value} onChange={e => setSiteConfig({...siteConfig, heroMetric1Value: e.target.value})} placeholder="Ej. 10" className={\`px-3 py-1.5 rounded-md text-sm outline-none \${isNegative ? 'bg-black/50' : 'bg-white'}\`} />
                        <input type="text" value={siteConfig.heroMetric1Label} onChange={e => setSiteConfig({...siteConfig, heroMetric1Label: e.target.value})} placeholder="Años de evolución" className={\`px-3 py-1.5 rounded-md text-sm outline-none \${isNegative ? 'bg-black/50' : 'bg-white'}\`} />
                      </div>
                      {/* Tarjeta 2 */}
                      <div className="flex flex-col gap-2 p-3 border border-inherit rounded-lg">
                        <label className="text-xs opacity-60">Métrica 2</label>
                        <input type="text" value={siteConfig.heroMetric2Value} onChange={e => setSiteConfig({...siteConfig, heroMetric2Value: e.target.value})} placeholder="Ej. 12" className={\`px-3 py-1.5 rounded-md text-sm outline-none \${isNegative ? 'bg-black/50' : 'bg-white'}\`} />
                        <input type="text" value={siteConfig.heroMetric2Label} onChange={e => setSiteConfig({...siteConfig, heroMetric2Label: e.target.value})} placeholder="Servicios" className={\`px-3 py-1.5 rounded-md text-sm outline-none \${isNegative ? 'bg-black/50' : 'bg-white'}\`} />
                      </div>
                      {/* Tarjeta 3 */}
                      <div className="flex flex-col gap-2 p-3 border border-inherit rounded-lg">
                        <label className="text-xs opacity-60">Métrica 3</label>
                        <input type="text" value={siteConfig.heroMetric3Value} onChange={e => setSiteConfig({...siteConfig, heroMetric3Value: e.target.value})} placeholder="Ej. 13" className={\`px-3 py-1.5 rounded-md text-sm outline-none \${isNegative ? 'bg-black/50' : 'bg-white'}\`} />
                        <input type="text" value={siteConfig.heroMetric3Label} onChange={e => setSiteConfig({...siteConfig, heroMetric3Label: e.target.value})} placeholder="Formas" className={\`px-3 py-1.5 rounded-md text-sm outline-none \${isNegative ? 'bg-black/50' : 'bg-white'}\`} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button type="submit" className="px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm bg-[#3D80FD] text-white hover:bg-blue-600">
                    Guardar Configuración
                  </button>
                </div>
              </form>
`;

const regex = /<form onSubmit={handleSaveConfig}[\s\S]*?<\/form>/;
content = content.replace(regex, newFormContent);

fs.writeFileSync('src/components/AdminPanel.tsx', content, 'utf-8');
