import { MediaItem } from '../types';

export const MEDIA_ITEMS: MediaItem[] = [
  // ==========================================
  // CLÚSTER 1: IDENTIDAD & ARTE
  // ==========================================
  // 01 — HMA DESIGN
  {
    id: 'media-design-1',
    serviceId: 'design',
    clusterId: '01',
    type: 'image',
    title: 'Identidad Visual & Monograma HMA 3D',
    description: 'Composición isométrica en vectores limpios con iluminación volumétrica.',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'media-design-2',
    serviceId: 'design',
    clusterId: '01',
    type: 'image',
    title: 'Kit de Banners para Redes Sociales',
    description: 'Formatos adaptativos de alta fidelidad para YouTube, Facebook y X.',
    url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop&q=80',
  },

  // 06 — HMA TYPE
  {
    id: 'media-type-1',
    serviceId: 'type',
    clusterId: '01',
    type: 'image',
    title: 'Muestra Tipográfica Display "Inlumenai Sans"',
    description: 'Espécimen tipográfico con glifos geométricos, ligaduras estilizadas y números solemnes.',
    url: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=1200&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=600&auto=format&fit=crop&q=80',
  },

  // 09 — HMA VISUALS
  {
    id: 'media-visuals-1',
    serviceId: 'visuals',
    clusterId: '01',
    type: 'image',
    title: 'Wallpaper 4K · Geometría & Luz Sagrada',
    description: 'Fondo de pantalla en ultra alta definición con efectos de gradiente oscuro y brillo solar.',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'media-visuals-2',
    serviceId: 'visuals',
    clusterId: '01',
    type: 'image',
    title: 'Wallpaper Móvil · Destello Cyan Eléctrico',
    description: 'Arte digital optimizado para pantallas OLED de teléfonos móviles.',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=80',
  },

  // ===============================================
  // CLÚSTER 2: AUDIOVISUAL & SONIDO
  // ===============================================
  // 02 — HMA PHOTOGRAPHY
  {
    id: 'media-photo-1',
    serviceId: 'photography',
    clusterId: '02',
    type: 'link',
    title: 'HMA Photography · Retrato 1',
    description: 'Muestra de fotografía y edición de alta gama en Facebook.',
    url: 'https://www.facebook.com/photo.php?fbid=924430318426415&set=pb.100031402306321.-2207520000&type=3',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'media-photo-2',
    serviceId: 'photography',
    clusterId: '02',
    type: 'link',
    title: 'HMA Photography · Retrato 2',
    description: 'Muestra de fotografía y edición de alta gama en Facebook.',
    url: 'https://www.facebook.com/photo/?fbid=924430328426414&set=pb.100031402306321.-2207520000',
    thumbnail: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'media-photo-3',
    serviceId: 'photography',
    clusterId: '02',
    type: 'link',
    title: 'HMA Photography · Retrato 3',
    description: 'Muestra de fotografía y edición de alta gama en Facebook.',
    url: 'https://www.facebook.com/photo/?fbid=924430365093077&set=pb.100031402306321.-2207520000',
    thumbnail: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'media-photo-4',
    serviceId: 'photography',
    clusterId: '02',
    type: 'link',
    title: 'HMA Photography · Retrato 4',
    description: 'Muestra de fotografía y edición de alta gama en Facebook.',
    url: 'https://www.facebook.com/photo/?fbid=924431418426305&set=pb.100031402306321.-2207520000',
    thumbnail: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
  },

  // 05 — HMA MUSIC
  {
    id: 'media-music-video-1',
    serviceId: 'music',
    clusterId: '02',
    type: 'video',
    title: 'Es Una Lluvia de Gracia · Video 01',
    description: 'Producción musical y audiovisual "Es Una Lluvia de Gracia" — HMA Music & Producción.',
    duration: 'YouTube',
    author: 'HMA Music Studio',
    url: 'https://www.youtube.com/watch?v=8xsLa_bv_Xc',
    thumbnail: 'https://img.youtube.com/vi/8xsLa_bv_Xc/hqdefault.jpg',
  },
  {
    id: 'media-music-video-2',
    serviceId: 'music',
    clusterId: '02',
    type: 'video',
    title: 'Es Una Lluvia de Gracia · Video 02',
    description: 'Producción musical y audiovisual "Es Una Lluvia de Gracia" — HMA Music & Producción.',
    duration: 'YouTube',
    author: 'HMA Music Studio',
    url: 'https://www.youtube.com/watch?v=r8NFf1LBvT8',
    thumbnail: 'https://img.youtube.com/vi/r8NFf1LBvT8/hqdefault.jpg',
  },
  {
    id: 'media-music-video-3',
    serviceId: 'music',
    clusterId: '02',
    type: 'video',
    title: 'Es Una Lluvia de Gracia · Video 03',
    description: 'Producción musical y audiovisual "Es Una Lluvia de Gracia" — HMA Music & Producción.',
    duration: 'YouTube',
    author: 'HMA Music Studio',
    url: 'https://www.youtube.com/watch?v=ekBoN7qQ4Go',
    thumbnail: 'https://img.youtube.com/vi/ekBoN7qQ4Go/hqdefault.jpg',
  },
  {
    id: 'media-music-video-4',
    serviceId: 'music',
    clusterId: '02',
    type: 'video',
    title: 'Es Una Lluvia de Gracia · Video 04',
    description: 'Producción musical y audiovisual "Es Una Lluvia de Gracia" — HMA Music & Producción.',
    duration: 'YouTube',
    author: 'HMA Music Studio',
    url: 'https://www.youtube.com/watch?v=qF4-ysi8KH4',
    thumbnail: 'https://img.youtube.com/vi/qF4-ysi8KH4/hqdefault.jpg',
  },
  {
    id: 'media-music-video-5',
    serviceId: 'music',
    clusterId: '02',
    type: 'video',
    title: 'Es Una Lluvia de Gracia · Video 05',
    description: 'Producción musical y audiovisual "Es Una Lluvia de Gracia" — HMA Music & Producción.',
    duration: 'YouTube',
    author: 'HMA Music Studio',
    url: 'https://www.youtube.com/watch?v=5laT-5v7idU',
    thumbnail: 'https://img.youtube.com/vi/5laT-5v7idU/hqdefault.jpg',
  },
  {
    id: 'media-music-video-6',
    serviceId: 'music',
    clusterId: '02',
    type: 'video',
    title: 'Es Una Lluvia de Gracia · Video 06',
    description: 'Producción musical y audiovisual "Es Una Lluvia de Gracia" — HMA Music & Producción.',
    duration: 'YouTube',
    author: 'HMA Music Studio',
    url: 'https://www.youtube.com/watch?v=bg7l2YqUwqs',
    thumbnail: 'https://img.youtube.com/vi/bg7l2YqUwqs/hqdefault.jpg',
  },

  // 08 — HMA CINEMA
  {
    id: 'media-cinema-1',
    serviceId: 'cinema',
    clusterId: '02',
    type: 'link',
    title: 'HMA Cinema · Reel 1',
    description: 'Ver proyecto completo en Facebook Reels.',
    duration: 'Reel',
    url: 'https://www.facebook.com/reel/3264244620425550',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'media-cinema-2',
    serviceId: 'cinema',
    clusterId: '02',
    type: 'link',
    title: 'HMA Cinema · Reel 2',
    description: 'Ver proyecto completo en Facebook Reels.',
    duration: 'Reel',
    url: 'https://www.facebook.com/reel/1469626650946257',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80',
  },

  // ============================================
  // CLÚSTER 3: FE, PALABRA & LEGADO
  // ============================================
  // 03 — HMA TEMPLES
  {
    id: 'media-temples-1',
    serviceId: 'temples',
    clusterId: '03',
    type: 'link',
    title: 'Ilustración Monumental · Galería 1',
    description: 'Visita la galería de Facebook para ver el proceso y resultado de ilustración de arquitectura sagrada.',
    url: 'https://www.facebook.com/photo/?fbid=918552962347484&set=a.918552352347545',
    thumbnail: 'https://images.unsplash.com/photo-1548625361-1959779df50e?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'media-temples-2',
    serviceId: 'temples',
    clusterId: '03',
    type: 'link',
    title: 'Ilustración Monumental · Galería 2',
    description: 'Explora detalles y trazos solemnes en nuestra galería de Facebook.',
    url: 'https://www.facebook.com/photo/?fbid=918553022347478&set=a.918552352347545',
    thumbnail: 'https://images.unsplash.com/photo-1548625361-1959779df50e?w=600&auto=format&fit=crop&q=80',
  },

  // 04 — HMA PUBLISHING
  {
    id: 'media-publishing-1',
    serviceId: 'publishing',
    clusterId: '03',
    type: 'link',
    title: 'HMA Publishing · Galería 1',
    description: 'Explora nuestro trabajo de maquetación y diseño editorial en Facebook.',
    url: 'https://www.facebook.com/photo/?fbid=704023683987702&set=pb.100031402306321.-2207520000',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'media-publishing-2',
    serviceId: 'publishing',
    clusterId: '03',
    type: 'link',
    title: 'HMA Publishing · Galería 2',
    description: 'Revisa los acabados y jerarquía tipográfica en nuestra galería de Facebook.',
    url: 'https://www.facebook.com/photo.php?fbid=704023643987706&set=pb.100031402306321.-2207520000&type=3',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
  },

  // 07 — HMA TRANSCENDENCE
  {
    id: 'media-transcendence-1',
    serviceId: 'transcendence',
    clusterId: '03',
    type: 'video',
    title: 'Video Documental · Trayectoria 10 Años (2016-2026)',
    description: 'Recorrido histórico audiovisual de los hitos fundacionales y la visión comunitaria.',
    duration: '4:20',
    url: 'https://www.youtube.com/embed/jfKfPfyJRdk',
    thumbnail: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&auto=format&fit=crop&q=80',
  },

  // ==========================================================
  // CLÚSTER 4: TECNOLOGÍA & PRODUCCIÓN FÍSICA
  // ==========================================================
  // 10 — HMA WATERMARK
  {
    id: 'media-watermark-1',
    serviceId: 'watermark',
    clusterId: '04',
    type: 'image',
    title: 'Marco Conmemorativo para Fotos de Perfil',
    description: 'Diseño con transparencia PNG con estética circular y detalles cromáticos.',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'media-watermark-2',
    serviceId: 'watermark',
    clusterId: '04',
    type: 'image',
    title: 'Sello de Agua Tipográfico para Fotografía',
    description: 'Firma digital transparente con protección visual para creadores.',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=80',
  },

  // 11 — HMA SOFTWARE
  {
    id: 'media-software-1',
    serviceId: 'software',
    clusterId: '04',
    type: 'image',
    title: 'Plataforma Web Responsiva de Alta Velocidad',
    description: 'Ecosistema digital desarrollado con React, Tailwind y Vite con tiempos de carga de 0.8s.',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
  },

  // 12 — HMA PRINT
  {
    id: 'media-print-1',
    serviceId: 'print',
    clusterId: '04',
    type: 'image',
    title: 'Merchandising Conmemorativo & Textil',
    description: 'Prendas con sublimación de alta durabilidad, tazas y artículos conmemorativos.',
    url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1200&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
  },
];

export function getMediaForService(serviceId: string): MediaItem[] {
  return MEDIA_ITEMS.filter((item) => item.serviceId === serviceId);
}

export function getMediaByCluster(clusterId: string): MediaItem[] {
  return MEDIA_ITEMS.filter((item) => item.clusterId === clusterId);
}
