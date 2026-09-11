import fs from 'fs';

const storeContent = `
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
  
  // Section Visibility Toggles (Global)
  showHero: boolean;
  showArchitecture: boolean;
  showServices: boolean;
  showDifferentiators: boolean;
  showTimeline: boolean;
  showContact: boolean;
}

export const getDefaultConfig = (): SiteConfig => ({
  contactEmail: 'hsalldm95@gmail.com',
  contactPhone: '+505 0000 0000',
  locationAddress: 'Managua, Nicaragua',
  showLocation: true,
  
  socialInstagram: 'https://instagram.com/',
  socialFacebook: 'https://facebook.com/',
  socialLinkedin: 'https://linkedin.com/',
  socialYoutube: 'https://youtube.com/',
  socialWhatsapp: 'https://wa.me/50500000000',
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
  
  showHero: true,
  showArchitecture: true,
  showServices: true,
  showDifferentiators: true,
  showTimeline: true,
  showContact: true
});

export const getSiteConfig = (): SiteConfig => {
  if (typeof window === 'undefined') return getDefaultConfig();
  const stored = localStorage.getItem('hma_site_config_v2');
  return stored ? { ...getDefaultConfig(), ...JSON.parse(stored) } : getDefaultConfig();
};

export const saveSiteConfig = (config: SiteConfig) => {
  localStorage.setItem('hma_site_config_v2', JSON.stringify(config));
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
  localStorage.setItem('hma_portfolio_config', JSON.stringify(config));
};
`;

fs.writeFileSync('src/utils/store.ts', storeContent, 'utf-8');
