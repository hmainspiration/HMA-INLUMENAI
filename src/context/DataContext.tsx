import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceItem, MediaItem, PortfolioItem, SiteConfig, ClockHourMilestone } from '../types';
import { SERVICES as DEFAULT_SERVICES, CLUSTERS } from '../data/servicesData';
import { MEDIA_ITEMS as DEFAULT_MEDIA } from '../data/mediaData';
import { PORTFOLIO_ITEMS as DEFAULT_PORTFOLIO } from '../data/portfolioData';
import { TIMELINE_MILESTONES as DEFAULT_TIMELINE } from '../data/timelineData';
import { SOCIAL_LINKS, WHATSAPP_PHONE, WHATSAPP_DISPLAY } from '../data/socialLinks';

const STORAGE_KEY = 'HMA_INLUMENAI_STORE_V2';

const DEFAULT_CONFIG: SiteConfig = {
  motto: 'La Creatividad es Un Regalo de Dios · Ecosistema HMA',
  whatsappPhone: WHATSAPP_PHONE,
  whatsappDisplay: WHATSAPP_DISPLAY,
  facebookUrl: SOCIAL_LINKS.facebook.url,
  instagramUrl: SOCIAL_LINKS.instagram.url,
  youtubeUrl: SOCIAL_LINKS.youtube.url,
  version: '2.3.0',
  showAnniversaryClock: true,
  anniversarySectionTitle: 'El Reloj de las 12 Horas',
  anniversarySectionSubtitle: 'Cada hora en el reloj representa un capítulo trascendental en la historia y evolución creativa de HMA INLUMENAI.',
  anniversarySectionBadge: 'Edición Conmemorativa Especial · 10 Años (2016 – 2026)',
};

interface DataContextType {
  services: ServiceItem[];
  mediaItems: MediaItem[];
  portfolioItems: PortfolioItem[];
  timelineMilestones: ClockHourMilestone[];
  siteConfig: SiteConfig;
  // Service management
  updateService: (id: string, updated: Partial<ServiceItem>) => void;
  toggleServiceActive: (id: string) => void;
  // Media management
  addMediaItem: (item: Omit<MediaItem, 'id'>) => string;
  updateMediaItem: (id: string, updated: Partial<MediaItem>) => void;
  deleteMediaItem: (id: string) => void;
  // Portfolio management
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => string;
  updatePortfolioItem: (id: string, updated: Partial<PortfolioItem>) => void;
  deletePortfolioItem: (id: string) => void;
  // Timeline/Clock management
  updateTimelineMilestone: (hour: number, updated: Partial<ClockHourMilestone>) => void;
  resetTimelineToDefaults: () => void;
  // Config & Backup
  updateSiteConfig: (config: Partial<SiteConfig>) => void;
  resetAllToDefaults: () => void;
  exportDataToJson: () => string;
  importDataFromJson: (jsonStr: string) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Attach default dynamic media & active flags to default services
const getHydratedDefaultServices = (): ServiceItem[] => {
  return DEFAULT_SERVICES.map((svc) => ({
    ...svc,
    isActive: svc.isActive !== undefined ? svc.isActive : true,
    underConstructionMessage:
      svc.underConstructionMessage ||
      'Este servicio se encuentra actualmente en fase de actualización y mejoras. Próximamente disponible para cotizaciones.',
    mediaItems: DEFAULT_MEDIA.filter((m) => m.serviceId === svc.id),
  }));
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_SERVICES`);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading services from localStorage:', e);
    }
    return getHydratedDefaultServices();
  });

  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_MEDIA`);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading media from localStorage:', e);
    }
    return DEFAULT_MEDIA;
  });

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_PORTFOLIO`);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading portfolio from localStorage:', e);
    }
    return DEFAULT_PORTFOLIO;
  });

  const [timelineMilestones, setTimelineMilestones] = useState<ClockHourMilestone[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_TIMELINE`);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading timeline from localStorage:', e);
    }
    return DEFAULT_TIMELINE;
  });

  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_CONFIG`);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading config from localStorage:', e);
    }
    return DEFAULT_CONFIG;
  });

  // Synchronize media items into services automatically
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_SERVICES`, JSON.stringify(services));
    } catch (e) {
      console.error('Error saving services to localStorage:', e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_MEDIA`, JSON.stringify(mediaItems));
    } catch (e) {
      console.error('Error saving media to localStorage:', e);
    }

    // Keep services' mediaItems in sync with mediaItems collection
    setServices((prevServices) =>
      prevServices.map((svc) => ({
        ...svc,
        mediaItems: mediaItems.filter((m) => m.serviceId === svc.id),
      }))
    );
  }, [mediaItems]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_PORTFOLIO`, JSON.stringify(portfolioItems));
    } catch (e) {
      console.error('Error saving portfolio to localStorage:', e);
    }
  }, [portfolioItems]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_TIMELINE`, JSON.stringify(timelineMilestones));
    } catch (e) {
      console.error('Error saving timeline to localStorage:', e);
    }
  }, [timelineMilestones]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_CONFIG`, JSON.stringify(siteConfig));
    } catch (e) {
      console.error('Error saving config to localStorage:', e);
    }
  }, [siteConfig]);

  // Service operations
  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
    );
  };

  const toggleServiceActive = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: s.isActive === false ? true : false } : s))
    );
  };

  // Media operations
  const addMediaItem = (item: Omit<MediaItem, 'id'>): string => {
    const newId = `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newItem: MediaItem = { ...item, id: newId };
    setMediaItems((prev) => [newItem, ...prev]);
    return newId;
  };

  const updateMediaItem = (id: string, updated: Partial<MediaItem>) => {
    setMediaItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updated } : m))
    );
  };

  const deleteMediaItem = (id: string) => {
    setMediaItems((prev) => prev.filter((m) => m.id !== id));
  };

  // Portfolio operations
  const addPortfolioItem = (item: Omit<PortfolioItem, 'id'>): string => {
    const newId = `port-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newItem: PortfolioItem = { ...item, id: newId };
    setPortfolioItems((prev) => [newItem, ...prev]);
    return newId;
  };

  const updatePortfolioItem = (id: string, updated: Partial<PortfolioItem>) => {
    setPortfolioItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deletePortfolioItem = (id: string) => {
    setPortfolioItems((prev) => prev.filter((p) => p.id !== id));
  };

  // Timeline operations
  const updateTimelineMilestone = (hour: number, updated: Partial<ClockHourMilestone>) => {
    setTimelineMilestones((prev) =>
      prev.map((m) => (m.hour === hour ? { ...m, ...updated } : m))
    );
  };

  const resetTimelineToDefaults = () => {
    localStorage.removeItem(`${STORAGE_KEY}_TIMELINE`);
    setTimelineMilestones(DEFAULT_TIMELINE);
  };

  // Config operations
  const updateSiteConfig = (updated: Partial<SiteConfig>) => {
    setSiteConfig((prev) => ({ ...prev, ...updated }));
  };

  const resetAllToDefaults = () => {
    localStorage.removeItem(`${STORAGE_KEY}_SERVICES`);
    localStorage.removeItem(`${STORAGE_KEY}_MEDIA`);
    localStorage.removeItem(`${STORAGE_KEY}_PORTFOLIO`);
    localStorage.removeItem(`${STORAGE_KEY}_TIMELINE`);
    localStorage.removeItem(`${STORAGE_KEY}_CONFIG`);

    setServices(getHydratedDefaultServices());
    setMediaItems(DEFAULT_MEDIA);
    setPortfolioItems(DEFAULT_PORTFOLIO);
    setTimelineMilestones(DEFAULT_TIMELINE);
    setSiteConfig(DEFAULT_CONFIG);
  };

  const exportDataToJson = (): string => {
    const data = {
      services,
      mediaItems,
      portfolioItems,
      timelineMilestones,
      siteConfig,
      exportedAt: new Date().toISOString(),
      app: 'HMA INLUMENAI',
    };
    return JSON.stringify(data, null, 2);
  };

  const importDataFromJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.services && Array.isArray(parsed.services)) {
        setServices(parsed.services);
      }
      if (parsed.mediaItems && Array.isArray(parsed.mediaItems)) {
        setMediaItems(parsed.mediaItems);
      }
      if (parsed.portfolioItems && Array.isArray(parsed.portfolioItems)) {
        setPortfolioItems(parsed.portfolioItems);
      }
      if (parsed.timelineMilestones && Array.isArray(parsed.timelineMilestones)) {
        setTimelineMilestones(parsed.timelineMilestones);
      }
      if (parsed.siteConfig && typeof parsed.siteConfig === 'object') {
        setSiteConfig(parsed.siteConfig);
      }
      return true;
    } catch (e) {
      console.error('Error parsing imported JSON:', e);
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        services,
        mediaItems,
        portfolioItems,
        timelineMilestones,
        siteConfig,
        updateService,
        toggleServiceActive,
        addMediaItem,
        updateMediaItem,
        deleteMediaItem,
        addPortfolioItem,
        updatePortfolioItem,
        deletePortfolioItem,
        updateTimelineMilestone,
        resetTimelineToDefaults,
        updateSiteConfig,
        resetAllToDefaults,
        exportDataToJson,
        importDataFromJson,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
