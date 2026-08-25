export type ClusterId = '01' | '02' | '03' | '04';

export type MediaType = 'video' | 'audio' | 'image' | 'link';

export interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  description?: string;
  // For video (YouTube URL or Direct MP4), for audio (MP3 URL or preview), for image (JPG/PNG URL), for link (External URL)
  url: string;
  thumbnail?: string;
  duration?: string;
  author?: string;
  serviceId: string;
  clusterId: ClusterId;
}

export interface ClusterInfo {
  id: ClusterId;
  number: string;
  name: string;
  shortName: string;
  description: string;
  lightColor: string;
  mainColor: string;
  darkColor: string;
  glowClass: string;
  bgLightClass: string;
  badgeBg: string;
}

export interface ServiceItem {
  id: string;
  serviceNumber: string; // e.g. "01", "02", ... "12"
  clusterId: ClusterId;
  nameEn: string;
  nameEs: string;
  tagline: string;
  description: string;
  features: string[];
  iconType: 
    | 'design'
    | 'type'
    | 'visuals'
    | 'photography'
    | 'music'
    | 'cinema'
    | 'temples'
    | 'publishing'
    | 'transcendence'
    | 'watermark'
    | 'software'
    | 'print'
    | string;
  isPopular?: boolean;
  defaultWhatsAppMessage: string;
  mediaItems?: MediaItem[];
  // Ficha técnica de color y geometría
  colorHex?: string;
  colorPosition?: string;
  colorName?: string;
  rgb?: string;
  cmyk?: string;
  concept?: string;
  quadrant?: string;
}

export interface ClockHourMilestone {
  hour: number; // 1 to 12
  clockDisplay: string; // e.g. "1:00"
  year: string; // e.g. "2016"
  title: string;
  summary: string;
  details: string;
  milestones: string[];
  clusterId?: ClusterId;
  highlightTag: string;
  logoPath?: string; // Path to SVG logo when added (e.g., "/logos/period-1.svg")
  logoType?: string; // e.g. "10-anos" for hardcoded SVG components
}

export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  clusterId: ClusterId;
  category: string;
  year: string;
  description: string;
  deliverables: string[];
  badgeColor: string;
  externalLink?: string; // Link to Facebook albums, Behance, etc.
}
