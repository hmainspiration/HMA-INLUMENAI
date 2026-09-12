import { ActivePage, ServiceId } from '../types';
import { SERVICES } from '../data/brandData';

export const getServiceUrl = (serviceId: ServiceId): string => {
  return `/hma-${serviceId}`;
};

export const getPageUrl = (page: ActivePage): string => {
  switch (page.type) {
    case 'home':
      return '/';
    case 'admin':
      return '/admin';
    case 'trajectory':
      return '/trayectoria';
    case 'colors':
      return '/colores';
    case 'contact':
      return '/contacto';
    case 'service':
      return getServiceUrl(page.serviceId);
    default:
      return '/';
  }
};

export const parsePathToPage = (pathname: string): ActivePage => {
  const cleanPath = pathname.toLowerCase().replace(/\/$/, '');
  
  if (cleanPath === '' || cleanPath === '/') {
    return { type: 'home' };
  }
  
  if (cleanPath === '/admin') {
    return { type: 'admin' };
  }
  
  if (cleanPath === '/trayectoria' || cleanPath === '/heritage-timeline') {
    return { type: 'trajectory' };
  }
  
  if (cleanPath === '/colores' || cleanPath === '/colors') {
    return { type: 'colors' };
  }
  
  if (cleanPath === '/contacto' || cleanPath === '/contact') {
    return { type: 'contact' };
  }
  
  // Check /hma-[service] or /servicios/[service] or /[service]
  for (const s of SERVICES) {
    if (
      cleanPath === `/hma-${s.id}` ||
      cleanPath === `/servicios/${s.id}` ||
      cleanPath === `/${s.id}`
    ) {
      return { type: 'service', serviceId: s.id };
    }
  }
  
  return { type: 'home' };
};
