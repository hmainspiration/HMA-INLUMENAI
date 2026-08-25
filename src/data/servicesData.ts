import { ClusterInfo, ServiceItem } from '../types';
import { getMediaForService } from './mediaData';

export const CLUSTERS: Record<string, ClusterInfo> = {
  '01': {
    id: '01',
    number: '01',
    name: 'Identidad & Arte',
    shortName: 'Identidad & Arte',
    description: 'Diseño gráfico, branding, tipografías exclusivas y arte digital en ultra alta definición.',
    lightColor: '#38A3D0',
    mainColor: '#2280AC',
    darkColor: '#175977',
    glowClass: 'glow-cyan',
    bgLightClass: 'bg-[#EBF5FB]',
    badgeBg: 'bg-[#2280AC]/10 text-[#175977] dark:text-[#38A3D0] border-[#2280AC]/30',
  },
  '02': {
    id: '02',
    number: '02',
    name: 'Audiovisual & Sonido',
    shortName: 'Audiovisual & Sonido',
    description: 'Fotografía profesional, producción musical con voces IA, video cinematográfico y motion graphics.',
    lightColor: '#6098FE',
    mainColor: '#3D80FD',
    darkColor: '#2D60C1',
    glowClass: 'glow-violet',
    bgLightClass: 'bg-[#EEF4FF]',
    badgeBg: 'bg-[#3D80FD]/10 text-[#2D60C1] dark:text-[#6098FE] border-[#3D80FD]/30',
  },
  '03': {
    id: '03',
    number: '03',
    name: 'Fe, Palabra & Legado',
    shortName: 'Fe, Palabra & Legado',
    description: 'Ilustración arquitectónica sagrada, maquetación editorial solemne y memoria histórica de marca.',
    lightColor: '#E4CC33',
    mainColor: '#D7BB11',
    darkColor: '#8C7700',
    glowClass: 'glow-gold',
    bgLightClass: 'bg-[#FEFCE8]',
    badgeBg: 'bg-[#D7BB11]/10 text-[#8C7700] dark:text-[#E4CC33] border-[#D7BB11]/30',
  },
  '04': {
    id: '04',
    number: '04',
    name: 'Tecnología & Producción Física',
    shortName: 'Tecnología & Producción',
    description: 'Protección visual de autor, desarrollo de sitios y apps con IA, y merchandising textil.',
    lightColor: '#3EE7CD',
    mainColor: '#11D7B6',
    darkColor: '#0C947D',
    glowClass: 'glow-emerald',
    bgLightClass: 'bg-[#E8FAF7]',
    badgeBg: 'bg-[#11D7B6]/10 text-[#0C947D] dark:text-[#3EE7CD] border-[#11D7B6]/30',
  },
};

export const TECHNICAL_PALETTE = {
  N: { code: 'N', hex: '#060C04', rgb: '6, 12, 4', cmyk: '50, 0, 67, 95', role: 'Neutro oscuro — base del sistema', name: 'Obsidian Noir' },
  '1': { code: '1', hex: '#315629', rgb: '49, 86, 41', cmyk: '43, 0, 52, 66', role: 'Categoría de producto (HMA TRANSCENDENCE)', name: 'Verde Bosque / Forest Moss' },
  '2': { code: '2', hex: '#75C962', rgb: '117, 201, 98', cmyk: '42, 0, 51, 21', role: 'Categoría de producto (HMA WATERMARK)', name: 'Verde Lima / Apple Green' },
  '3': { code: '3', hex: '#11D7B6', rgb: '17, 215, 182', cmyk: '92, 0, 15, 16', role: 'Categoría de producto (HMA SOFTWARE)', name: 'Turquesa Eléctrico / Electric Mint' },
  '4': { code: '4', hex: '#16A097', rgb: '22, 160, 151', cmyk: '86, 0, 6, 37', role: 'Categoría de producto (HMA MUSIC)', name: 'Verde Azulado / Petrol Teal' },
  '5': { code: '5', hex: '#2280AC', rgb: '34, 128, 172', cmyk: '80, 26, 0, 33', role: 'Categoría de producto (HMA DESIGN)', name: 'Azul Océano / Deep Cobalt' },
  '6': { code: '6', hex: '#2D60C1', rgb: '45, 96, 193', cmyk: '77, 50, 0, 24', role: 'Color matriz — marca principal (1/2) y Categoría (HMA CINEMA)', name: 'Azul Matriz InLumenAI 1/2' },
  '7': { code: '7', hex: '#3D80FD', rgb: '61, 128, 253', cmyk: '76, 49, 0, 1', role: 'Color matriz — marca principal (2/2) y Categoría (HMA PHOTOGRAPHY)', name: 'Azul Matriz InLumenAI 2/2' },
  '8': { code: '8', hex: '#7D77B0', rgb: '125, 119, 176', cmyk: '29, 32, 0, 31', role: 'Categoría de producto (HMA TEMPLES)', name: 'Lavanda Sacra / Holy Violet' },
  '9': { code: '9', hex: '#AE7176', rgb: '174, 113, 118', cmyk: '0, 35, 32, 32', role: 'Categoría de producto (HMA TYPE)', name: 'Rosa Antiguo / Mauve Terra' },
  '10': { code: '10', hex: '#D96B43', rgb: '217, 107, 67', cmyk: '0, 51, 69, 15', role: 'Coral — pareja cromática fija y Categoría (HMA VISUALS)', name: 'Coral Clay / Pareja Fija' },
  '11': { code: '11', hex: '#C99700', rgb: '201, 151, 0', cmyk: '0, 25, 100, 21', role: 'Categoría de producto (HMA PRINT)', name: 'Ocre Señal / Signal Ochre' },
  '12': { code: '12', hex: '#D7BB11', rgb: '215, 187, 17', cmyk: '0, 13, 92, 16', role: 'Categoría de producto (HMA PUBLISHING)', name: 'Oro Vivo / Vivid Gold' },
  B: { code: 'B', hex: '#FEFAE8', rgb: '254, 250, 232', cmyk: '0, 2, 9, 0', role: 'Neutro claro — base del sistema', name: 'Alabaster Paper' },
};

const BASE_SERVICES: ServiceItem[] = [
  // ==========================================
  // 01 — HMA DESIGN (Matriz Posición 5 · #2280AC)
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
    colorHex: '#2280AC',
    colorPosition: '5',
    colorName: 'Azul Océano / Deep Cobalt',
    rgb: '34, 128, 172',
    cmyk: '80, 26, 0, 33',
    concept: 'Punta de pluma / Vector Bézier',
    quadrant: '1 (Identidad & Arte)',
  },

  // ==========================================
  // 02 — HMA PHOTOGRAPHY (Matriz Posición 7 · #3D80FD)
  // ==========================================
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
    colorHex: '#3D80FD',
    colorPosition: '7',
    colorName: 'Azul Matriz InLumenAI (2/2)',
    rgb: '61, 128, 253',
    cmyk: '76, 49, 0, 1',
    concept: 'Diafragma de obturación',
    quadrant: '2 (Audiovisual & Sonido)',
  },

  // ==========================================
  // 03 — HMA TEMPLES (Matriz Posición 8 · #7D77B0)
  // ==========================================
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
    colorHex: '#7D77B0',
    colorPosition: '8',
    colorName: 'Lavanda Sacra / Holy Violet',
    rgb: '125, 119, 176',
    cmyk: '29, 32, 0, 31',
    concept: 'Frontón / Fachada',
    quadrant: '3 (Fe, Palabra & Legado)',
  },

  // ==========================================
  // 04 — HMA PUBLISHING (Matriz Posición 12 · #D7BB11)
  // ==========================================
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
    colorHex: '#D7BB11',
    colorPosition: '12',
    colorName: 'Oro Vivo / Vivid Gold',
    rgb: '215, 187, 17',
    cmyk: '0, 13, 92, 16',
    concept: 'Libro abierto / Expansión',
    quadrant: '3 (Fe, Palabra & Legado)',
  },

  // ==========================================
  // 05 — HMA MUSIC (Matriz Posición 4 · #16A097)
  // ==========================================
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
    colorHex: '#16A097',
    colorPosition: '4',
    colorName: 'Verde Azulado / Petrol Teal',
    rgb: '22, 160, 151',
    cmyk: '86, 0, 6, 37',
    concept: 'Espectrograma / Ecualizador',
    quadrant: '2 (Audiovisual & Sonido)',
  },

  // ==========================================
  // 06 — HMA TYPE (Matriz Posición 9 · #AE7176)
  // ==========================================
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
    colorHex: '#AE7176',
    colorPosition: '9',
    colorName: 'Rosa Antiguo / Mauve Terra',
    rgb: '174, 113, 118',
    cmyk: '0, 35, 32, 32',
    concept: "Glifo maestro 'A'",
    quadrant: '1 (Identidad & Arte)',
  },

  // ==========================================
  // 07 — HMA TRANSCENDENCE (Matriz Posición 1 · #315629)
  // ==========================================
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
    colorHex: '#315629',
    colorPosition: '1',
    colorName: 'Verde Bosque / Forest Moss',
    rgb: '49, 86, 41',
    cmyk: '43, 0, 52, 66',
    concept: 'Línea de tiempo / Capas',
    quadrant: '3 (Fe, Palabra & Legado)',
  },

  // ==========================================
  // 08 — HMA CINEMA (Matriz Posición 6 · #2D60C1)
  // ==========================================
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
    colorHex: '#2D60C1',
    colorPosition: '6',
    colorName: 'Azul Matriz InLumenAI (1/2)',
    rgb: '45, 96, 193',
    cmyk: '77, 50, 0, 24',
    concept: 'Triángulo Play / Motion',
    quadrant: '2 (Audiovisual & Sonido)',
  },

  // ==========================================
  // 09 — HMA VISUALS (Matriz Posición 10 · #D96B43)
  // ==========================================
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
    colorHex: '#D96B43',
    colorPosition: '10',
    colorName: 'Coral Clay / Pareja Fija',
    rgb: '217, 107, 67',
    cmyk: '0, 51, 69, 15',
    concept: 'Lienzo / Horizonte',
    quadrant: '1 (Identidad & Arte)',
  },

  // ==========================================
  // 10 — HMA WATERMARK (Matriz Posición 2 · #75C962)
  // ==========================================
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
    colorHex: '#75C962',
    colorPosition: '2',
    colorName: 'Verde Lima / Apple Green',
    rgb: '117, 201, 98',
    cmyk: '42, 0, 51, 21',
    concept: "Guías de encuadre en 'L'",
    quadrant: '4 (Tecnología & Producción)',
  },

  // ==========================================
  // 11 — HMA SOFTWARE (Matriz Posición 3 · #11D7B6)
  // ==========================================
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
    colorHex: '#11D7B6',
    colorPosition: '3',
    colorName: 'Turquesa Eléctrico / Electric Mint',
    rgb: '17, 215, 182',
    cmyk: '92, 0, 15, 16',
    concept: 'Corchetes </>',
    quadrant: '4 (Tecnología & Producción)',
  },

  // ==========================================
  // 12 — HMA PRINT (Matriz Posición 11 · #C99700)
  // ==========================================
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
    colorHex: '#C99700',
    colorPosition: '11',
    colorName: 'Ocre Señal / Signal Ochre',
    rgb: '201, 151, 0',
    cmyk: '0, 25, 100, 21',
    concept: 'Prensa térmica / Capas',
    quadrant: '4 (Tecnología & Producción)',
  },
];

export const SERVICES: ServiceItem[] = BASE_SERVICES.map((service): ServiceItem => ({
  ...service,
  mediaItems: getMediaForService(service.id),
}));
