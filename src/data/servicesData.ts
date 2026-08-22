import { ClusterInfo, ServiceItem } from '../types';
import { getMediaForService } from './mediaData';

export const CLUSTERS: Record<string, ClusterInfo> = {
  '01': {
    id: '01',
    number: '01',
    name: 'Identidad & Arte',
    shortName: 'Identidad & Arte',
    description: 'Diseño gráfico, branding, tipografías exclusivas y arte digital en ultra alta definición.',
    lightColor: '#40C7E2',
    mainColor: '#00B4D8',
    darkColor: '#007F98',
    glowClass: 'glow-cyan',
    bgLightClass: 'bg-[#E0F7FC]',
    badgeBg: 'bg-[#00B4D8]/10 text-[#007F98] border-[#00B4D8]/30',
  },
  '02': {
    id: '02',
    number: '02',
    name: 'Audiovisual & Sonido',
    shortName: 'Audiovisual & Sonido',
    description: 'Fotografía profesional, producción musical con voces IA, video cinematográfico y motion graphics.',
    lightColor: '#9C61CF',
    mainColor: '#7B2CBF',
    darkColor: '#581F87',
    glowClass: 'glow-violet',
    bgLightClass: 'bg-[#F3E8FA]',
    badgeBg: 'bg-[#7B2CBF]/10 text-[#581F87] border-[#7B2CBF]/30',
  },
  '03': {
    id: '03',
    number: '03',
    name: 'Fe, Palabra & Legado',
    shortName: 'Fe, Palabra & Legado',
    description: 'Ilustración arquitectónica sagrada, maquetación editorial solemne y memoria histórica de marca.',
    lightColor: '#F8BC5A',
    mainColor: '#F5A623',
    darkColor: '#B97808',
    glowClass: 'glow-gold',
    bgLightClass: 'bg-[#FEF5E7]',
    badgeBg: 'bg-[#F5A623]/10 text-[#B97808] border-[#F5A623]/30',
  },
  '04': {
    id: '04',
    number: '04',
    name: 'Tecnología & Producción Física',
    shortName: 'Tecnología & Producción',
    description: 'Protección visual de autor, desarrollo de sitios y apps con IA, y merchandising textil.',
    lightColor: '#4CCAA0',
    mainColor: '#10B981',
    darkColor: '#087A57',
    glowClass: 'glow-emerald',
    bgLightClass: 'bg-[#E6F8F2]',
    badgeBg: 'bg-[#10B981]/10 text-[#087A57] border-[#10B981]/30',
  },
};

const BASE_SERVICES: ServiceItem[] = [
  // ==========================================
  // CLÚSTER 1: IDENTIDAD & ARTE (Cyan #00B4D8)
  // ==========================================
  {
    id: 'design',
    serviceNumber: '01',
    clusterId: '01',
    nameEn: 'HMA DESIGN',
    nameEs: 'Diseño Gráfico, Branding y Publicidad',
    tagline: 'Diseño Gráfico, Branding y Publicidad.',
    description: 'Diseño de identidad visual, branding estratégico, creación de logotipos memorables, manuales de marca y piezas publicitarias de alto impacto para destacar en medios digitales e impresos.',
    features: [
      'Identidad visual completa, logotipo e isotipos vectoriales',
      'Manual de marca con especificación de paletas y usos',
      'Piezas publicitarias para campañas impresas y digitales',
      'Diseño de portadas y banners optimizados para redes sociales',
      'Entregables en alta resolución (SVG, PNG, PDF y AI)'
    ],
    iconType: 'design',
    isPopular: true,
    defaultWhatsAppMessage: 'Hola HMA Inlumenai, me interesa cotizar el servicio de 01. HMA DESIGN (Diseño Gráfico, Branding y Publicidad).',
  },
  {
    id: 'type',
    serviceNumber: '06',
    clusterId: '01',
    nameEn: 'HMA TYPE',
    nameEs: 'Diseño y Venta de Fuentes Tipográficas',
    tagline: 'Diseño y Venta de Fuentes Tipográficas.',
    description: 'Creación, personalización y distribución de fuentes tipográficas exclusivas, display y editoriales, concebidas para dotar de personalidad, distinción y jerarquía única a cada proyecto.',
    features: [
      'Fuentes tipográficas exclusivas en formatos OTF, TTF y WOFF2',
      'Catálogo de estilos display, serif, sans-serif y caligráficos',
      'Kerning óptico, conjunto completo de glifos y acentos latinos',
      'Licencias para uso comercial, editorial y plataformas web',
      'Asesoría personalizada en jerarquía y combinación tipográfica'
    ],
    iconType: 'type',
    defaultWhatsAppMessage: 'Hola HMA Inlumenai, me interesa cotizar el servicio de 06. HMA TYPE (Diseño y Venta de Fuentes Tipográficas).',
  },
  {
    id: 'visuals',
    serviceNumber: '09',
    clusterId: '01',
    nameEn: 'HMA VISUALS',
    nameEs: 'Wallpapers y Arte Digital HD/4K',
    tagline: 'Wallpapers y Arte Digital HD/4K.',
    description: 'Creación de fondos de pantalla, wallpapers temáticos, arte conceptual y composiciones visuales en ultra alta definición (HD, 2K y 4K) calibradas para dispositivos móviles, monitores y pantallas OLED.',
    features: [
      'Wallpapers exclusivos para celulares y monitores en resolución 4K',
      'Ilustraciones digitales temáticas con iluminación volumétrica',
      'Colecciones inspiracionales y conmemorativas de alta fidelidad',
      'Adaptación perfecta para pantallas OLED, Retina y ultra panorámicas',
      'Descargas directas en máxima resolución sin pérdida de calidad'
    ],
    iconType: 'visuals',
    defaultWhatsAppMessage: 'Hola HMA Inlumenai, me interesa cotizar el servicio de 09. HMA VISUALS (Wallpapers y Arte Digital HD/4K).',
  },

  // ===============================================
  // CLÚSTER 2: AUDIOVISUAL & SONIDO (Violeta #7B2CBF)
  // ===============================================
  {
    id: 'photography',
    serviceNumber: '02',
    clusterId: '02',
    nameEn: 'HMA PHOTOGRAPHY',
    nameEs: 'Fotografía Profesional y Edición IA',
    tagline: 'Fotografía Profesional y Edición IA.',
    description: 'Sesiones fotográficas, retoque digital de alta gama, restauración de imágenes y mejora de detalle potenciada con Inteligencia Artificial para retratos, eventos y catálogos institucionales.',
    features: [
      'Fotografía de retrato, cobertura de eventos y corporativa',
      'Retoque profesional de piel, iluminación y micro-contrastes',
      'Restauración, eliminación de imperfecciones y escalado con IA',
      'Gradación de color y etalonaje cinematográfico',
      'Galería digital privada con entrega en máxima resolución'
    ],
    iconType: 'photography',
    defaultWhatsAppMessage: 'Hola HMA Inlumenai, me interesa cotizar el servicio de 02. HMA PHOTOGRAPHY (Fotografía Profesional y Edición IA).',
  },
  {
    id: 'music',
    serviceNumber: '05',
    clusterId: '02',
    nameEn: 'HMA MUSIC',
    nameEs: 'Producción Musical, Canciones y Voces IA',
    tagline: 'Producción Musical, Canciones y Voces IA.',
    description: 'Composición y producción musical de piezas originales, bandas sonoras, canciones, coros, arreglos instrumentales y síntesis vocal avanzada asistida por Inteligencia Artificial para proyectos memorables.',
    features: [
      'Composición de canciones y temas instrumentales exclusivos',
      'Producción y síntesis de voces con Inteligencia Artificial avanzada',
      'Arreglos orquestales y acústicos para eventos solemnes',
      'Mezcla y masterización con estándar LUFS broadcast',
      'Entrega en pistas separadas (stems) y archivos WAV / FLAC / MP3'
    ],
    iconType: 'music',
    isPopular: true,
    defaultWhatsAppMessage: 'Hola HMA Inlumenai, me interesa cotizar el servicio de 05. HMA MUSIC (Producción Musical, Canciones y Voces IA).',
  },
  {
    id: 'cinema',
    serviceNumber: '08',
    clusterId: '02',
    nameEn: 'HMA CINEMA',
    nameEs: 'Producción Audiovisual, Motion Graphics y Video',
    tagline: 'Producción Audiovisual, Motion Graphics y Video.',
    description: 'Dirección y producción de video cinematográfico, animación de logotipos 2D y 3D, motion graphics, cápsulas publicitarias y reels dinámicos diseñados para cautivar a la audiencia.',
    features: [
      'Animación 2D/3D de logotipos e introducciones de video (Logo Stings)',
      'Edición y montaje de videos promocionales y cápsulas conmemorativas',
      'Motion graphics con tipografía cinética y transiciones rítmicas',
      'Visualizadores de audio para música y programas sonoros',
      'Exportación en formatos verticales (9:16) y panorámicos (16:9 4K)'
    ],
    iconType: 'cinema',
    defaultWhatsAppMessage: 'Hola HMA Inlumenai, me interesa cotizar el servicio de 08. HMA CINEMA (Producción Audiovisual, Motion Graphics y Video).',
  },

  // ============================================
  // CLÚSTER 3: FE, PALABRA & LEGADO (Oro #F5A623)
  // ============================================
  {
    id: 'temples',
    serviceNumber: '03',
    clusterId: '03',
    nameEn: 'HMA TEMPLES',
    nameEs: 'Ilustración Arquitectónica y Logos de Templos',
    tagline: 'Ilustración Arquitectónica y Logos de Templos.',
    description: 'Diseño e ilustración artística de alta precisión para recintos sagrados, templos, logotipos eclesiásticos e iconografía conmemorativa solemne tratada con la máxima reverencia y estética.',
    features: [
      'Ilustraciones vectoriales detalladas de templos y recintos solemnes',
      'Diseño de logotipos institucionales y sellos eclesiásticos',
      'Láminas conmemorativas y posters artísticos de colección',
      'Modelado conceptual 2D y 3D de estructuras y fachadas',
      'Archivos vectoriales escalables para impresión monumental'
    ],
    iconType: 'temples',
    isPopular: true,
    defaultWhatsAppMessage: 'Hola HMA Inlumenai, me interesa cotizar el servicio de 03. HMA TEMPLES (Ilustración Arquitectónica y Logos de Templos).',
  },
  {
    id: 'publishing',
    serviceNumber: '04',
    clusterId: '03',
    nameEn: 'HMA PUBLISHING',
    nameEs: 'Maquetación de Libros, Documentos Bíblicos y Poemas',
    tagline: 'Maquetación de Libros, Documentos Bíblicos y Poemas.',
    description: 'Maquetación editorial profesional, diseño de portadas artísticas y diagramación tipográfica fina de libros, devocionales, poemarios, guías de estudio y documentos bíblicos solemnes.',
    features: [
      'Maquetación editorial de libros, poemarios y cuadernos devocionales',
      'Diseño de portadas artísticas, lomo y contraportada con acabados finos',
      'Jerarquía y maquetación especializada para citas y textos bíblicos',
      'Preparación de archivos para imprenta offset (CMYK con sangrías)',
      'Versiones interactivas digitales en formatos PDF y eBook (EPUB)'
    ],
    iconType: 'publishing',
    defaultWhatsAppMessage: 'Hola HMA Inlumenai, me interesa cotizar el servicio de 04. HMA PUBLISHING (Maquetación de Libros, Documentos Bíblicos y Poemas).',
  },
  {
    id: 'transcendence',
    serviceNumber: '07',
    clusterId: '03',
    nameEn: 'HMA TRANSCENDENCE',
    nameEs: 'Historia, Biografía y Línea de Tiempo de Marca',
    tagline: 'Historia, Biografía y Línea de Tiempo de Marca.',
    description: 'Preservación de memoria y trayectoria: creación de líneas de tiempo visuales, anuarios conmemorativos, biografías institucionales y narrativas de marca que perduran en el tiempo.',
    features: [
      'Líneas de tiempo históricas e infografías de hitos conmemorativos',
      'Libros digitales de memorias, testimonios y biografías de trayectoria',
      'Curaduría, restauración y ordenamiento de archivos fotográficos',
      'Narrativa institucional y storytelling con propósito',
      'Estructuración de cronologías digitales interactivas'
    ],
    iconType: 'transcendence',
    defaultWhatsAppMessage: 'Hola HMA Inlumenai, me interesa cotizar el servicio de 07. HMA TRANSCENDENCE (Historia, Biografía y Línea de Tiempo de Marca).',
  },

  // ==========================================================
  // CLÚSTER 4: TECNOLOGÍA & PRODUCCIÓN FÍSICA (Esmeralda #10B981)
  // ==========================================================
  {
    id: 'watermark',
    serviceNumber: '10',
    clusterId: '04',
    nameEn: 'HMA WATERMARK',
    nameEs: 'Marcos Digitales y Protección Visual de Autor',
    tagline: 'Marcos Digitales y Protección Visual de Autor.',
    description: 'Creación de marcos personalizados para fotos de perfil en redes sociales, sellos de agua transparentes para creadores y fotógrafos, y marcos temáticos para eventos y campañas.',
    features: [
      'Marcos personalizados para fotos de perfil en redes (WhatsApp, FB, IG)',
      'Sellos de agua con transparencia para protección y firma de autor',
      'Marcos conmemorativos dinámicos para campañas y aniversarios',
      'Plantillas editables y reutilizables para Canva e Illustrator',
      'Archivos PNG transparentes optimizados de alta resolución'
    ],
    iconType: 'watermark',
    isPopular: true,
    defaultWhatsAppMessage: 'Hola HMA Inlumenai, me interesa cotizar el servicio de 10. HMA WATERMARK (Marcos Digitales y Protección Visual de Autor).',
  },
  {
    id: 'software',
    serviceNumber: '11',
    clusterId: '04',
    nameEn: 'HMA SOFTWARE',
    nameEs: 'Desarrollo de Sitios Web y Apps Android con IA',
    tagline: 'Desarrollo de Sitios Web y Apps Android con IA.',
    description: 'Desarrollo de sitios web interactivos de alta velocidad, plataformas responsivas, aplicaciones Android nativas y sistemas automatizados potenciados con Inteligencia Artificial.',
    features: [
      'Sitios web modernos y responsivos de carga ultrarrápida (React / Vite)',
      'Desarrollo de aplicaciones móviles para Android con IA integrada',
      'Integración con bases de datos en la nube y pasarelas de contacto',
      'Flujos automatizados y conexión directa a WhatsApp para ventas',
      'Despliegue continuo seguro en la nube (Vercel, Supabase y Firebase)'
    ],
    iconType: 'software',
    defaultWhatsAppMessage: 'Hola HMA Inlumenai, me interesa cotizar el servicio de 11. HMA SOFTWARE (Desarrollo de Sitios Web y Apps Android con IA).',
  },
  {
    id: 'print',
    serviceNumber: '12',
    clusterId: '04',
    nameEn: 'HMA PRINT',
    nameEs: 'Sublimación, Merchandising y Textiles',
    tagline: 'Sublimación, Merchandising y Textiles.',
    description: 'Producción física de merchandising conmemorativo, sublimación de textiles, camisetas, tazas, gorras, pendones y artículos personalizados con acabados duraderos y de alta calidad.',
    features: [
      'Sublimación de camisetas y prendas textiles con tintas duraderas',
      'Tazas conmemorativas, termos y artículos personalizados de colección',
      'Gorras estampadas y bordadas con identidad de marca',
      'Banners, pendones y gigantografías para eventos solemnes',
      'Kits de merchandising integral para aniversarios y congregaciones'
    ],
    iconType: 'print',
    defaultWhatsAppMessage: 'Hola HMA Inlumenai, me interesa cotizar el servicio de 12. HMA PRINT (Sublimación, Merchandising y Textiles).',
  },
];

export const SERVICES: ServiceItem[] = BASE_SERVICES.map((service): ServiceItem => ({
  ...service,
  mediaItems: getMediaForService(service.id),
}));
