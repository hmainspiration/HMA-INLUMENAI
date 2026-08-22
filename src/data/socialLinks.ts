export interface SocialLink {
  id: string;
  name: string;
  url: string;
  hoverColor: string;
  bgLight: string;
  ariaLabel: string;
}

export const WHATSAPP_PHONE = '50584620554';
export const WHATSAPP_DISPLAY = '+505 8462 0554';

export const getWhatsAppUrl = (message?: string) => {
  const text = message || 'Hola HMA Inlumenai, me gustaría solicitar información y cotización sobre sus servicios.';
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
};

export const SOCIAL_LINKS: Record<string, SocialLink> = {
  whatsapp: {
    id: 'whatsapp',
    name: 'WhatsApp',
    url: `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hola HMA Inlumenai, me gustaría solicitar información y cotización sobre sus servicios.')}`,
    hoverColor: '#25D366',
    bgLight: 'rgba(37, 211, 102, 0.1)',
    ariaLabel: 'Contactar por WhatsApp (+505 8462 0554)',
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://www.facebook.com/HMAInlumenai/',
    hoverColor: '#1877F2',
    bgLight: 'rgba(24, 119, 242, 0.1)',
    ariaLabel: 'Página Oficial de Facebook HMA Inlumenai',
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/hmainlumenai/',
    hoverColor: '#E4405F',
    bgLight: 'rgba(228, 64, 95, 0.1)',
    ariaLabel: 'Perfil Oficial de Instagram @hmainlumenai',
  },
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://www.youtube.com/@HMAInlumenai',
    hoverColor: '#FF0000',
    bgLight: 'rgba(255, 0, 0, 0.1)',
    ariaLabel: 'Canal Oficial de YouTube @HMAInlumenai',
  },
};
