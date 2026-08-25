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
    description: 'Composición isométrica en vectores limpios con iluminación volumétrica y paleta oficial.',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'media-design-2',
    serviceId: 'design',
    clusterId: '01',
    type: 'image',
    title: 'Kit de Banners para Redes Sociales & Streaming',
    description: 'Formatos adaptativos de alta fidelidad para YouTube, Facebook, Instagram y X.',
    url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1600&auto=format&fit=crop&q=85',
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
    url: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=1600&auto=format&fit=crop&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=600&auto=format&fit=crop&q=80',
  },

  // 09 — HMA VISUALS
  {
    id: 'media-visuals-1',
    serviceId: 'visuals',
    clusterId: '01',
    type: 'image',
    title: 'Wallpaper 4K · Geometría & Luz Sagrada',
    description: 'Fondo de pantalla en ultra alta definición con efectos de gradiente oscuro y destello solar.',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'media-visuals-2',
    serviceId: 'visuals',
    clusterId: '01',
    type: 'image',
    title: 'Wallpaper Móvil · Destello Cyan Eléctrico',
    description: 'Arte digital optimizado para pantallas OLED y fondos dinámicos de smartphones.',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1600&auto=format&fit=crop&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=80',
  },

  // ===============================================
  // CLÚSTER 2: AUDIOVISUAL & SONIDO
  // ===============================================
  // 02 — HMA PHOTOGRAPHY (Imágenes directas y nítidas de alta resolución)
  {
    id: 'media-photo-1',
    serviceId: 'photography',
    clusterId: '02',
    type: 'image',
    title: 'Retrato de Estudio & Corrección de Color',
    description: 'Fotografía profesional con iluminación de tres puntos y revelado digital cinematográfico.',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&auto=format&fit=crop&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'media-photo-2',
    serviceId: 'photography',
    clusterId: '02',
    type: 'image',
    title: 'Fotografía de Eventos Solemnes & Ceremonias',
    description: 'Captura de momentos clave, enfoque selectivo y ambientación con luz natural.',
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&auto=format&fit=crop&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'media-photo-3',
    serviceId: 'photography',
    clusterId: '02',
    type: 'image',
    title: 'Retrato Editorial en Exteriores',
    description: 'Composición con fondo desenfocado (bokeh suave) y tratamiento de textura en piel con IA.',
    url: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=1600&auto=format&fit=crop&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'media-photo-4',
    serviceId: 'photography',
    clusterId: '02',
    type: 'image',
    title: 'Edición Fotográfica & Composición de Alta Gama',
    description: 'Graduación de color profesional con tonos cálidos y equilibrio de contrastes profundos.',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1600&auto=format&fit=crop&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
  },

  // 05 — HMA MUSIC (Tanto pistas de Audio MP3 directo como Videos de YouTube)
  {
    id: 'media-music-audio-1',
    serviceId: 'music',
    clusterId: '02',
    type: 'audio',
    title: 'Arreglo Solemne · Melodía Inspiracional',
    description: 'Pista orquestal y coral producida por HMA Music con mezcla y masterización a 24-bit.',
    duration: '1:45',
    author: 'HMA Music Studio',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'media-music-audio-2',
    serviceId: 'music',
    clusterId: '02',
    type: 'audio',
    title: 'Composición Coral · Voces & Armonía IA',
    description: 'Demostración de síntesis de voces armónicas y corales para eventos conmemorativos.',
    duration: '2:12',
    author: 'HMA Music Studio',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80',
  },
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

  // 08 — HMA CINEMA
  {
    id: 'media-cinema-1',
    serviceId: 'cinema',
    clusterId: '02',
    type: 'video',
    title: 'Reel Cinematográfico · Color Grading & Motion',
    description: 'Muestra de edición de video en 4K, transiciones rítmicas y corrección de color profesional.',
    duration: '1:15',
    url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'media-cinema-2',
    serviceId: 'cinema',
    clusterId: '02',
    type: 'video',
    title: 'Animación de Logotipo & Intro Conmemorativa',
    description: 'Motion Graphics con efectos de partículas doradas, iluminación volumétrica y sonido surround.',
    duration: '0:30',
    url: 'https://www.youtube.com/watch?v=8xsLa_bv_Xc',
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
    type: 'image',
    title: 'Ilustración Monumental · Fachada Principal',
    description: 'Ilustración vectorial detallada de arquitectura sagrada con perspectiva axial y trazado fino.',
    url: 'https://images.unsplash.com/photo-1548625361-1959779df50e?w=1600&auto=format&fit=crop&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1548625361-1959779df50e?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'media-temples-2',
    serviceId: 'temples',
    clusterId: '03',
    type: 'image',
    title: 'Perspectiva Isométrica & Detalles de Acabados',
    description: 'Composición arquitectónica solemne con iluminación dorada y precisión estructural.',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600&auto=format&fit=crop&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
  },

  // 04 — HMA PUBLISHING
  {
    id: 'media-publishing-1',
    serviceId: 'publishing',
    clusterId: '03',
    type: 'image',
    title: 'Maquetación Editorial de Libro Conmemorativo',
    description: 'Diagramación con retícula clásica, capitulares ornamentadas y tipografía de lectura óptima.',
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1600&auto=format&fit=crop&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'media-publishing-2',
    serviceId: 'publishing',
    clusterId: '03',
    type: 'image',
    title: 'Diseño de Portada con Acabados en Foil Dorado',
    description: 'Encuadernación de lujo con estampado solemne y composición simétrica.',
    url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1600&auto=format&fit=crop&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
  },

  // 07 — HMA TRANSCENDENCE
  {
    id: 'media-transcendence-1',
    serviceId: 'transcendence',
    clusterId: '03',
    type: 'video',
    title: 'Video Documental · Trayectoria 10 Años (2016-2026)',
    description: 'Recorrido histórico audiovisual de los hitos fundacionales y la visión comunitaria.',
    duration: 'YouTube',
    url: 'https://www.youtube.com/watch?v=8xsLa_bv_Xc',
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
    description: 'Diseño con transparencia PNG de alta fidelidad, estética circular y detalles cromáticos.',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1600&auto=format&fit=crop&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'media-watermark-2',
    serviceId: 'watermark',
    clusterId: '04',
    type: 'image',
    title: 'Sello de Agua Tipográfico para Fotografía & Video',
    description: 'Firma digital transparente con protección visual de autor para creadores de contenido.',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1600&auto=format&fit=crop&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=80',
  },

  // 11 — HMA SOFTWARE
  {
    id: 'media-software-1',
    serviceId: 'software',
    clusterId: '04',
    type: 'image',
    title: 'Plataforma Web Responsiva de Alta Velocidad',
    description: 'Ecosistema digital desarrollado con React, Tailwind y Vite con optimización total para móviles.',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&auto=format&fit=crop&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
  },

  // 12 — HMA PRINT
  {
    id: 'media-print-1',
    serviceId: 'print',
    clusterId: '04',
    type: 'image',
    title: 'Merchandising Conmemorativo & Textil',
    description: 'Prendas con sublimación de alta durabilidad, tazas de cerámica y artículos personalizados de colección.',
    url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1600&auto=format&fit=crop&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
  },
];

export function getMediaForService(serviceId: string): MediaItem[] {
  return MEDIA_ITEMS.filter((item) => item.serviceId === serviceId);
}

export function getMediaByCluster(clusterId: string): MediaItem[] {
  return MEDIA_ITEMS.filter((item) => item.clusterId === clusterId);
}
