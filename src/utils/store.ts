
import type { EvolutionEraItem } from '../data/evolutionEras';
import { DEFAULT_EVOLUTION_ERAS } from '../data/evolutionEras';

export interface CustomHtmlEntry {
  id: string;
  name: string;
  html: string;
  timestamp: number;
}

export interface HeroMotionConfig {
  enabled: boolean;
  intensity: number; // 0.1 to 1.0
  speed: number; // 0.5 to 2.0
  showDeepOrb: boolean;
  showLightOrb: boolean;
  showGridPattern: boolean;
}

export interface SiteConfig {
  // General Contact & Details
  contactEmail: string;
  contactPhone: string;
  locationAddress: string;
  showLocation: boolean;
  
  // Social Links
  socialInstagram: string;
  socialFacebook: string;
  socialLinkedin: string;
  socialYoutube: string;
  socialWhatsapp: string;
  showSocials: boolean;
  
  // Hero section texts
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  
  // Hero Metrics Cards
  heroMetric1Value: string;
  heroMetric1Label: string;
  heroMetric2Value: string;
  heroMetric2Label: string;
  heroMetric3Value: string;
  heroMetric3Label: string;

  // Hero Custom HTML Integrations
  customHtmlHistory?: CustomHtmlEntry[];
  activeBackgroundHtmlId?: string | null;
  activeForegroundHtmlId?: string | null;

  // Hero Background Motion Matrix
  heroMotionBackground: HeroMotionConfig;
  heroMotionForeground: HeroMotionConfig;

  // Architecture Section
  archTitle: string;
  archDescription: string;
  archCard1Title: string;
  archCard1Desc: string;
  archCard1Sub: string;
  archCard2Title: string;
  archCard2Desc: string;
  archCard2Sub: string;
  archCard3Title: string;
  archCard3Desc: string;
  archCard3Sub: string;

  // Services Grid Section
  servicesTitle: string;
  servicesDescription: string;
  servicesRuleText: string;

  // Differentiators Section
  diffTitle: string;
  diffDescription: string;
  diffCard1Title: string;
  diffCard1Desc: string;
  diffCard2Title: string;
  diffCard2Desc: string;
  diffCard3Title: string;
  diffCard3Desc: string;
  diffCard4Title: string;
  diffCard4Desc: string;

  // Timeline Section
  timelineTitle: string;
  timelineDescription: string;
  timelinePrincipleTitle: string;
  timelinePrincipleText: string;
  timelinePrincipleSub: string;
  timelineAlertText: string;
  showTimelineAlert: boolean;
  showTimelinePrinciple: boolean;

  // Contact Section
  contactTitle: string;
  contactDescription: string;
  
  // Section Visibility Toggles (Global)
  showHero: boolean;
  showArchitecture: boolean;
  showServices: boolean;
  showDifferentiators: boolean;
  showTimeline: boolean;
  showColors?: boolean;
  showContact: boolean;

  // Kill Switch for Contact Forms
  enableInquiries: boolean;
  disabledServicesInquiries?: string[];

  // Visual container toggle for animated isotypes
  showIsotipoContainer?: boolean;

  // Editable timeline eras
  evolutionEras?: EvolutionEraItem[];

  // Custom Matrix HTML (Integración con Marca Matrix en todos los servicios y Hero)
  customMatrixHtml?: string;
  customMatrixHtmlName?: string;
  applyMatrixHtmlToServices?: boolean;
  applyMatrixHtmlToHero?: boolean;
  matrixHtmlHistory?: CustomHtmlEntry[];
}

export const getDefaultConfig = (): SiteConfig => ({
  contactEmail: 'inlumenaihma@gmail.com',
  contactPhone: '+505 8462 0554',
  locationAddress: 'Servicio Actualmente en Línea',
  showLocation: false,
  showIsotipoContainer: false,

  // Custom Matrix HTML defaults
  customMatrixHtml: '',
  customMatrixHtmlName: '',
  applyMatrixHtmlToServices: true,
  applyMatrixHtmlToHero: false,
  matrixHtmlHistory: [],
  
  socialInstagram: 'https://www.instagram.com/hmainlumenai/',
  socialFacebook: 'https://www.facebook.com/HMAInlumenai/',
  socialLinkedin: '',
  socialYoutube: 'https://www.youtube.com/@HMAInlumenai',
  socialWhatsapp: 'https://wa.me/50584620554',
  showSocials: true,
  
  heroTitle: 'La Creatividad es un',
  heroHighlight: 'Regalo de Dios',
  heroDescription: 'HMA INLUMENAI es una Marca Matrix multiservicios: un ecosistema integral que articula diseño gráfico, arquitectura sacra, composición musical con IA, tipografía exclusiva y desarrollo de software bajo una misma coherencia visual.',
  
  heroMetric1Value: '10',
  heroMetric1Label: 'Años de evolución',
  heroMetric2Value: '12',
  heroMetric2Label: 'Servicios autónomos',
  heroMetric3Value: '13',
  heroMetric3Label: 'Formas / 1 Eje Central',

  customHtmlHistory: [],
  activeBackgroundHtmlId: null,
  activeForegroundHtmlId: null,

  heroMotionBackground: {
    enabled: true,
    intensity: 0.35,
    speed: 1.0,
    showDeepOrb: true,
    showLightOrb: true,
    showGridPattern: true
  },
  heroMotionForeground: {
    enabled: true,
    intensity: 0.35,
    speed: 1.0,
    showDeepOrb: true,
    showLightOrb: true,
    showGridPattern: true
  },

  archTitle: 'La Arquitectura de la Luz',
  archDescription: 'HMA no es una suma dispersa de servicios: es una disciplina geométrica y conceptual. Un único sistema matricial que da respuesta a las necesidades creativas y tecnológicas modernas.',
  archCard1Title: '1 Marca Matrix',
  archCard1Desc: 'HMA INLUMENAI es el núcleo que sostiene la filosofía, el aseguramiento de calidad y la coherencia de todo el ecosistema. Reduce radicalmente la dispersión de contratar múltiples agencias.',
  archCard1Sub: '"Un ecosistema, no una lista de proveedores."',
  archCard2Title: '12 Servicios',
  archCard2Desc: 'Cada servicio inicia con una letra consecutiva del nombre HMAINLUMENAI. Cada uno posee su propio par cromático certificado y su propia morfología de isotipo derivado.',
  archCard2Sub: 'De Heritage (H) a Illustrations (I)',
  archCard3Title: '13 Formas Geométricas',
  archCard3Desc: '12 rectángulos redondeados que representan la multiplicidad del sistema + 1 Círculo Central Constante (Forma #13) que actúa como eje inmóvil y jamás se separa ni se oculta.',
  archCard3Sub: 'Forma #13: Proporción 1:1 invariable',

  servicesTitle: 'Los 12 Servicios Especializados',
  servicesDescription: 'Cada disciplina opera con autonomía técnica, integrada orgánicamente bajo el rigor de la Marca Matrix.',
  servicesRuleText: 'Regla de identidad 2.2: peso visual equitativo con acento de subpaleta contenido.',

  diffTitle: 'Por qué el Ecosistema HMA',
  diffDescription: 'Principios fundacionales que nos diferencian de agencias genéricas y plataformas automatizadas sin criterio humano.',
  diffCard1Title: 'Un ecosistema, no una lista de proveedores',
  diffCard1Desc: 'Resolver un proyecto de marca hoy requiere agencias de diseño, productoras audiovisuales, programadores y consultores de imprenta. HMA INLUMENAI integra todas las disciplinas bajo una misma dirección artística y de calidad.',
  diffCard2Title: 'Combinaciones que nadie más ofrece juntas',
  diffCard2Desc: 'Diseño y render de templos religiosos (Architecture), creación de fuentes tipográficas exclusivas (Alphabets), generación de música con IA (Melody) y conservación documental (Heritage). Todo en un solo equipo.',
  diffCard3Title: 'Diez años de evolución, no una marca improvisada',
  diffCard3Desc: 'Una trayectoria iniciada en 2016 con HMA Diseños hasta la consolidación como Marca Matrix en 2026. No somos un experimento de fin de semana: contamos con una década de metodología comprobable.',
  diffCard4Title: 'Cercanía real con el mercado hispanohablante',
  diffCard4Desc: 'Nacida en Nicaragua con proyección hispanoamericana. Entendemos las dinámicas culturales, la sensibilidad de las comunidades de fe, y las realidades de costos de emprendedores y pequeñas empresas locales.',

  timelineTitle: 'Diez Años en la Luz (2016 — 2026)',
  timelineDescription: 'Una década continua de geometría, propósito y evolución gráfica. Cada año articula de forma coherente su Monograma H con su Isotipo HMA complementario (2016 hasta 2026, proyectando 2027).',
  timelinePrincipleTitle: 'DECLARACIÓN DE PRINCIPIO',
  timelinePrincipleText: '"La Creatividad es un Regalo de Dios."',
  timelinePrincipleSub: 'Base de fe, honestidad y respeto que preserva la memoria viva de la marca.',
  timelineAlertText: 'Todos los trazos vectoriales y proporciones geométricas han sido recalculados y estandarizados para que no sufran cortes ni deformaciones. Puedes pulsar en "Inspeccionar" sobre cualquier año para ver los dos isotipos en alta escala. Si deseas afinar o sustituir algún año específico con un SVG particular, indícamelo y lo ajustaremos al milímetro.',
  showTimelineAlert: true,
  showTimelinePrinciple: true,

  contactTitle: 'Iniciar Conversación con el Ecosistema',
  contactDescription: 'Estamos listos para transformar tus ideas en productos visuales, audiovisuales y digitales. Atención personalizada para organizaciones religiosas, emprendimientos y empresas.',
  
  showHero: true,
  showArchitecture: true,
  showServices: true,
  showDifferentiators: true,
  showTimeline: true,
  showColors: true,
  showContact: true,
  enableInquiries: true,
  disabledServicesInquiries: [],
  evolutionEras: DEFAULT_EVOLUTION_ERAS
});

export const getSiteConfig = (): SiteConfig => {
  if (typeof window === 'undefined') return getDefaultConfig();
  const stored = localStorage.getItem('hma_site_config_v2');
  return stored ? { ...getDefaultConfig(), ...JSON.parse(stored) } : getDefaultConfig();
};

export const saveSiteConfig = (config: SiteConfig) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('hma_site_config_v2', JSON.stringify(config));
  }
  // Also save to Firestore in the background
  import('../lib/firebase').then(({ saveSiteConfigToFirestore }) => {
    saveSiteConfigToFirestore(config);
  }).catch((err) => {
    console.warn('Firebase store sync error:', err);
  });
};

export interface PortfolioMedia {
  id: string;
  type: 'youtube' | 'image' | 'audio';
  url: string;
  coverUrl?: string;
  title?: string;
}

export interface ServicePortfolioConfig {
  isPublished: boolean;
  customMedia: PortfolioMedia[];
}

export const getPortfolioConfig = (): Record<string, ServicePortfolioConfig> => {
  if (typeof window === 'undefined') return {};
  const stored = localStorage.getItem('hma_portfolio_config');
  return stored ? JSON.parse(stored) : {};
};

export const savePortfolioConfig = (config: Record<string, ServicePortfolioConfig>) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('hma_portfolio_config', JSON.stringify(config));
  }
  // Also save to Firestore in the background
  import('../lib/firebase').then(({ savePortfolioConfigToFirestore }) => {
    savePortfolioConfigToFirestore(config);
  }).catch((err) => {
    console.warn('Firebase portfolio sync error:', err);
  });
};

/**
 * Normaliza y formatea cualquier código HTML/SVG para que se ajuste con
 * precisión matemática y sin desbordes dentro de su contenedor interactivo.
 */
export const formatMatrixHtmlDoc = (rawHtml: string, isNegative?: boolean): string => {
  if (!rawHtml || !rawHtml.trim()) return '';
  const trimmed = rawHtml.trim();

  const resetStyles = `
    * {
      box-sizing: border-box;
    }
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
    }
    svg {
      max-width: 100%;
      max-height: 100%;
      width: 100%;
      height: 100%;
      display: block;
      margin: auto;
      object-fit: contain;
    }
  `;

  if (trimmed.toLowerCase().includes('<!doctype') || trimmed.toLowerCase().includes('<html')) {
    // Inject reset style before </head> or at start
    if (trimmed.includes('</head>')) {
      return trimmed.replace('</head>', `<style>${resetStyles}</style></head>`);
    }
    return `<style>${resetStyles}</style>` + trimmed;
  }

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    ${resetStyles}
  </style>
</head>
<body>
  ${trimmed}
</body>
</html>`;
};


