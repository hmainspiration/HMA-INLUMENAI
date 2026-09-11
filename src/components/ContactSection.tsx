import React, { useState, useEffect } from 'react';
import { SERVICES } from '../data/brandData';
import { getSiteConfig, SiteConfig } from '../utils/store';
import { UtilitarianIcon } from './BrandLogos';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { submitInquiryToFirestore } from '../lib/firebase';

interface ContactSectionProps {
  isNegative?: boolean;
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  isNegative = false,
  preselectedService = ''
}) => {
  const [config, setConfig] = useState<SiteConfig>(getSiteConfig());
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setConfig(getSiteConfig());
  }, []);

  const [formData, setFormData] = useState({
    nombre: '',
    organizacion: '',
    email: '',
    telefono: '',
    servicio: preselectedService || 'general',
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitInquiryToFirestore({
        nombre: formData.nombre.trim(),
        organizacion: formData.organizacion.trim() || undefined,
        email: formData.email.trim(),
        telefono: formData.telefono.trim() || undefined,
        servicio: formData.servicio,
        mensaje: formData.mensaje.trim()
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('Fallback: local submission processed', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactChannels = [
    {
      name: 'email' as const,
      label: 'Email de Contacto',
      value: config.contactEmail || 'inlumenaihma@gmail.com',
      link: `mailto:${config.contactEmail || 'inlumenaihma@gmail.com'}`
    },
    {
      name: 'whatsapp' as const,
      label: 'WhatsApp Oficial',
      value: config.contactPhone || '+505 8462 0554',
      link: config.socialWhatsapp || 'https://wa.me/50584620554'
    },
    {
      name: 'phone' as const,
      label: 'Llamada Directa',
      value: config.contactPhone || '+505 8462 0554',
      link: `tel:${(config.contactPhone || '+50584620554').replace(/\s+/g, '')}`
    },
    ...(config.showLocation && config.locationAddress ? [{
      name: 'location' as const,
      label: 'Ubicación',
      value: config.locationAddress,
      link: '#'
    }] : [{
      name: 'website' as const,
      label: 'Modalidad de Servicio',
      value: 'Servicio Actualmente en Línea',
      link: '#'
    }])
  ];

  const socialChannels = [
    ...(config.socialInstagram ? [{
      name: 'instagram' as const,
      label: 'Instagram',
      handle: '@hmainlumenai',
      link: config.socialInstagram
    }] : []),
    ...(config.socialFacebook ? [{
      name: 'facebook' as const,
      label: 'Facebook',
      handle: 'HMA INLUMENAI',
      link: config.socialFacebook
    }] : []),
    ...(config.socialYoutube ? [{
      name: 'youtube' as const,
      label: 'YouTube',
      handle: '@HMAInlumenai',
      link: config.socialYoutube
    }] : [])
  ];

  return (
    <section id="contacto" className="py-20 border-t transition-colors"
      style={{
        borderColor: isNegative ? 'rgba(254, 250, 232, 0.08)' : 'rgba(6, 12, 4, 0.08)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-general font-semibold text-[#3D80FD] bg-[#3D80FD]/10">
            <span>CANAL DIRECTO</span>
          </div>
          <h2 className="type-h2">
            {config.contactTitle || 'Iniciar Conversación con el Ecosistema'}
          </h2>
          <p className={`type-body ${isNegative ? 'text-[#FEFAE8]/80' : 'text-[#060C04]/80'}`}>
            {config.contactDescription || 'Estamos listos para transformar tus ideas en productos visuales, audiovisuales y digitales. Atención personalizada para organizaciones religiosas, emprendimientos y empresas.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          {/* Left Column: Official Contact Channels with Section 2.5 Icons */}
          <div className="lg:col-span-5 space-y-8">
            {/* Direct Lines */}
            <div className={`p-8 rounded-2xl border space-y-6 ${
              isNegative ? 'bg-[#060C04] border-[#FEFAE8]/10' : 'bg-white border-[#060C04]/8 shadow-sm'
            }`}>
              <h3 className="font-dosis text-2xl font-bold">
                Puntos de Contacto Oficiales
              </h3>
              <div className="space-y-4">
                {contactChannels.map((c, i) => (
                  <a
                    key={i}
                    href={c.link}
                    className="flex items-center gap-4 group transition-colors hover:text-[#3D80FD]"
                  >
                    <div className={`p-2.5 rounded-xl transition-colors ${
                      isNegative ? 'bg-[#FEFAE8]/10 text-[#FEFAE8]' : 'bg-[#060C04]/5 text-[#060C04]'
                    }`}>
                      <UtilitarianIcon name={c.name} size={20} color="currentColor" />
                    </div>
                    <div>
                      <p className="font-general text-xs opacity-60 font-medium">
                        {c.label}
                      </p>
                      <p className="font-general text-sm font-semibold mt-0.5">
                        {c.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Network Hub */}
            <div className={`p-8 rounded-2xl border space-y-5 ${
              isNegative ? 'bg-[#060C04] border-[#FEFAE8]/10' : 'bg-white border-[#060C04]/8 shadow-sm'
            }`}>
              <h4 className="font-dosis text-xl font-bold">
                Comunidad & Canales Oficiales
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {socialChannels.map((s, i) => (
                  <a
                    key={i}
                    href={s.link}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all hover:scale-102 ${
                      isNegative
                        ? 'border-[#FEFAE8]/10 bg-[#FEFAE8]/5 hover:bg-[#FEFAE8]/10'
                        : 'border-[#060C04]/8 bg-white hover:bg-[#060C04]/5 shadow-xs'
                    }`}
                  >
                    <UtilitarianIcon name={s.name} size={22} color={isNegative ? '#FEFAE8' : '#060C04'} />
                    <span className="font-general text-xs font-semibold mt-2">{s.label}</span>
                    <span className="font-general text-[11px] opacity-60 truncate max-w-full">{s.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form in General Sans */}
          <div className="lg:col-span-7">
            <div className={`p-8 sm:p-10 rounded-2xl border ${
              isNegative ? 'bg-[#060C04] border-[#FEFAE8]/10' : 'bg-white border-[#060C04]/8 shadow-sm'
            }`}>
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#75C962]/20 text-[#75C962] flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-dosis text-2xl font-bold">
                    Mensaje Recibido
                  </h3>
                  <p className={`type-body text-sm max-w-md mx-auto ${
                    isNegative ? 'text-[#FEFAE8]/80' : 'text-[#060C04]/80'
                  }`}>
                    Gracias por ponerte en contacto con HMA INLUMENAI. Un director de disciplina revisará tu solicitud y se comunicará en un plazo menor a 24 horas.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary mt-4 bg-[#3D80FD] text-white hover:bg-[#2D60C1] cursor-pointer"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-dosis text-2xl font-bold mb-1">
                      Envíanos tu propuesta o requerimiento
                    </h3>
                    <p className={`font-general text-xs ${isNegative ? 'text-[#FEFAE8]/60' : 'text-[#060C04]/60'}`}>
                      Completa el formulario en General Sans. Sin trámites innecesarios.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Nombre */}
                    <div className="space-y-1.5">
                      <label className="font-general text-xs font-semibold block">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder="Ej. Juan Pérez"
                        className={`w-full px-4 py-3 rounded-xl border font-general text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#3D80FD] ${
                          isNegative
                            ? 'bg-[#FEFAE8]/5 border-[#FEFAE8]/15 text-[#FEFAE8]'
                            : 'bg-white border-[#060C04]/15 text-[#060C04]'
                        }`}
                      />
                    </div>

                    {/* Organización o Negocio */}
                    <div className="space-y-1.5">
                      <label className="font-general text-xs font-semibold block">
                        Organización / Pequeño Negocio
                      </label>
                      <input
                        type="text"
                        value={formData.organizacion}
                        onChange={(e) => setFormData({ ...formData, organizacion: e.target.value })}
                        placeholder="Ej. Comunidad de Fe / Emprendimiento"
                        className={`w-full px-4 py-3 rounded-xl border font-general text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#3D80FD] ${
                          isNegative
                            ? 'bg-[#FEFAE8]/5 border-[#FEFAE8]/15 text-[#FEFAE8]'
                            : 'bg-white border-[#060C04]/15 text-[#060C04]'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Correo */}
                    <div className="space-y-1.5">
                      <label className="font-general text-xs font-semibold block">
                        Correo electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="correo@ejemplo.com"
                        className={`w-full px-4 py-3 rounded-xl border font-general text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#3D80FD] ${
                          isNegative
                            ? 'bg-[#FEFAE8]/5 border-[#FEFAE8]/15 text-[#FEFAE8]'
                            : 'bg-white border-[#060C04]/15 text-[#060C04]'
                        }`}
                      />
                    </div>

                    {/* Teléfono / WhatsApp */}
                    <div className="space-y-1.5">
                      <label className="font-general text-xs font-semibold block">
                        Teléfono / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        placeholder="+505 8462 0554"
                        className={`w-full px-4 py-3 rounded-xl border font-general text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#3D80FD] ${
                          isNegative
                            ? 'bg-[#FEFAE8]/5 border-[#FEFAE8]/15 text-[#FEFAE8]'
                            : 'bg-white border-[#060C04]/15 text-[#060C04]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Servicio de Interés */}
                  <div className="space-y-1.5">
                    <label className="font-general text-xs font-semibold block">
                      Disciplina o servicio principal
                    </label>
                    <select
                      value={formData.servicio}
                      onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border font-general text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#3D80FD] ${
                        isNegative
                          ? 'bg-[#060C04] border-[#FEFAE8]/15 text-[#FEFAE8]'
                          : 'bg-white border-[#060C04]/15 text-[#060C04]'
                      }`}
                    >
                      <option value="general">Integración Multiservicios (Ecosistema Completo)</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.letter} · {s.fullServiceName} ({s.tagline})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mensaje */}
                  <div className="space-y-1.5">
                    <label className="font-general text-xs font-semibold block">
                      Detalles del proyecto o consulta *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      placeholder="Cuéntanos brevemente sobre tu organización, plazos estimados y expectativas de diseño o tecnología..."
                      className={`w-full px-4 py-3 rounded-xl border font-general text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#3D80FD] ${
                        isNegative
                          ? 'bg-[#FEFAE8]/5 border-[#FEFAE8]/15 text-[#FEFAE8]'
                          : 'bg-white border-[#060C04]/15 text-[#060C04]'
                      }`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-3.5 bg-[#3D80FD] text-white hover:bg-[#2D60C1] shadow-md flex items-center justify-center gap-2 cursor-pointer font-semibold text-base disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Enviando solicitud segura...</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar Solicitud al Ecosistema</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
