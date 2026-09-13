export interface EvolutionEraItem {
  year: string;
  yearCode: string; // e.g. '16', '17', etc.
  brandName: string;
  title: string;
  description: string;
  continuity: string;
  category: string;
  hCode: string;
  hmaCode: string;
  accentColor: string;
  stage?: string;
  concept?: string;
  geometry?: string;
  meaning?: string;
  isProjection?: boolean;
}

export type EvolutionEra = EvolutionEraItem;

export const DEFAULT_EVOLUTION_ERAS: EvolutionEraItem[] = [
  {
    year: '2016',
    yearCode: '16',
    brandName: 'HMA Diseños',
    title: 'El Génesis del Taller Gráfico',
    description: 'Nacimiento de la vocación visual en Nicaragua. Primeros trazos de taller, identidad para proyectos familiares, papelería y rotulación artesanal.',
    continuity: 'Durante diez años, cada cambio de nombre ha respondido a una expansión real de capacidades técnicas (editorial, paramétrica, audiovisual y finalmente IA), manteniendo la misma ética de honestidad y perseverancia.',
    category: 'Fundacional',
    hCode: '#H16',
    hmaCode: '#HMA16',
    accentColor: '#315629'
  },
  {
    year: '2017',
    yearCode: '17',
    brandName: 'HMA Creatividad',
    title: 'Ampliación de Cobertura Gráfica',
    description: 'Incorporación de diseño para congregaciones religiosas y primeros clientes del sector comercial local en Managua y departamentos.',
    continuity: 'Durante diez años, cada cambio de nombre ha respondido a una expansión real de capacidades técnicas (editorial, paramétrica, audiovisual y finalmente IA), manteniendo la misma ética de honestidad y perseverancia.',
    category: 'Expansión',
    hCode: '#H17',
    hmaCode: '#HMA17',
    accentColor: '#315629'
  },
  {
    year: '2018',
    yearCode: '18',
    brandName: 'HMA Creatividad',
    title: 'Formalización y Nuevos Clientes',
    description: 'Transición hacia HMA Creations: desarrollo de marcas comerciales, manuales de aplicación iniciales y diversificación hacia soporte editorial y publicitario.',
    continuity: 'Durante diez años, cada cambio de nombre ha respondido a una expansión real de capacidades técnicas (editorial, paramétrica, audiovisual y finalmente IA), manteniendo la misma ética de honestidad y perseverancia.',
    category: 'Consolidación',
    hCode: '#H18',
    hmaCode: '#HMA18',
    accentColor: '#074349'
  },
  {
    year: '2019',
    yearCode: '19',
    brandName: 'HMA Diseños',
    title: 'Resiliencia y Compromiso de Oficio',
    description: 'Afianzamiento de relaciones de confianza con clientes institucionales, producción para eventos masivos y profundización en el diseño como servicio perseverante.',
    continuity: 'Durante diez años, cada cambio de nombre ha respondido a una expansión real de capacidades técnicas (editorial, paramétrica, audiovisual y finalmente IA), manteniendo la misma ética de honestidad y perseverancia.',
    category: 'Resiliencia',
    hCode: '#H19',
    hmaCode: '#HMA19',
    accentColor: '#074349'
  },
  {
    year: '2020',
    yearCode: '20',
    brandName: 'HMA Creations',
    title: 'Diseño en Tiempos de Cambio',
    description: 'Respuesta creativa al contexto de aislamiento global: fortalecimiento de branding digital, diseño de empaques, comunicación comunitaria y apoyo a iniciativas de fe.',
    continuity: 'Durante diez años, cada cambio de nombre ha respondido a una expansión real de capacidades técnicas (editorial, paramétrica, audiovisual y finalmente IA), manteniendo la misma ética de honestidad y perseverancia.',
    category: 'Adaptabilidad',
    hCode: '#H20',
    hmaCode: '#HMA20',
    accentColor: '#82600A'
  },
  {
    year: '2021',
    yearCode: '21',
    brandName: 'HMA Creations',
    title: 'Bases de la Marca Modular',
    description: 'Primeras investigaciones de diseño paramétrico, retícula modular matemática y la concepción de un símbolo compuesto por piezas polivalentes.',
    continuity: 'Durante diez años, cada cambio de nombre ha respondido a una expansión real de capacidades técnicas (editorial, paramétrica, audiovisual y finalmente IA), manteniendo la misma ética de honestidad y perseverancia.',
    category: 'Innovación',
    hCode: '#H21',
    hmaCode: '#HMA21',
    accentColor: '#2D60C1'
  },
  {
    year: '2022',
    yearCode: '22',
    brandName: 'HMA Creations',
    title: 'Sistematización Paramétrica',
    description: 'Evolución formal hacia HMA Creativity: formalización de trazos vectoriales, tipografías hermanadas y geometrías equilibradas con precisión milimétrica.',
    continuity: 'Durante diez años, cada cambio de nombre ha respondido a una expansión real de capacidades técnicas (editorial, paramétrica, audiovisual y finalmente IA), manteniendo la misma ética de honestidad y perseverancia.',
    category: 'Geometría',
    hCode: '#H22',
    hmaCode: '#HMA22',
    accentColor: '#514B7D'
  },
  {
    year: '2023',
    yearCode: '23',
    brandName: 'HMA Creativity',
    title: 'Apertura hacia el Ecosistema',
    description: 'Incursión en diseño para arquitectura de templos, confección textil especializada, producción musical y laboratorio de experimentación transversal.',
    continuity: 'Durante diez años, cada cambio de nombre ha respondido a una expansión real de capacidades técnicas (editorial, paramétrica, audiovisual y finalmente IA), manteniendo la misma ética de honestidad y perseverancia.',
    category: 'Laboratorio',
    hCode: '#H23',
    hmaCode: '#HMA23',
    accentColor: '#052D63'
  },
  {
    year: '2024',
    yearCode: '24',
    brandName: 'HMA Creativity',
    title: 'Convergencia de Fe y Técnica',
    description: 'Reafirmación del propósito fundacional: "La Creatividad es un Regalo de Dios". Maduración conceptual previa a la integración de 12 ramas de oficio.',
    continuity: 'Durante diez años, cada cambio de nombre ha respondido a una expansión real de capacidades técnicas (editorial, paramétrica, audiovisual y finalmente IA), manteniendo la misma ética de honestidad y perseverancia.',
    category: 'Propósito',
    hCode: '#H24',
    hmaCode: '#HMA24',
    accentColor: '#964222'
  },
  {
    year: '2025',
    yearCode: '25',
    brandName: 'HMA Inspiration',
    title: 'Maduración Sistémica & IA',
    description: 'Desarrollo definitivo del sistema de 13 formas canónicas, ensamblaje paramétrico y preparación de los modelos de inteligencia artificial propios.',
    continuity: 'Durante diez años, cada cambio de nombre ha respondido a una expansión real de capacidades técnicas (editorial, paramétrica, audiovisual y finalmente IA), manteniendo la misma ética de honestidad y perseverancia.',
    category: 'Sistémica',
    hCode: '#H25',
    hmaCode: '#HMA25',
    accentColor: '#3D80FD'
  },
  {
    year: '2026',
    yearCode: '26',
    brandName: 'HMA INLUMENAI',
    title: 'Madurez de la Marca Matrix',
    description: 'Celebración de 10 años ininterrumpidos: una Marca Madre que integra 12 servicios autónomos bajo el estándar de excelencia, luz e integridad creativa.',
    continuity: 'Durante diez años, cada cambio de nombre ha respondido a una expansión real de capacidades técnicas (editorial, paramétrica, audiovisual y finalmente IA), manteniendo la misma ética de honestidad y perseverancia.',
    category: 'Plenitud',
    hCode: '#H26',
    hmaCode: '#HMA26',
    accentColor: '#3D80FD'
  },
  {
    year: '2027',
    yearCode: '27',
    brandName: 'HMA INLUMENAI',
    title: 'Proyección Hispanoamericana',
    description: 'Horizonte de proyección continental: arquitectura biofílica, tipografías hispanas patentadas y expansión de la plataforma de diseño aumentado con IA.',
    continuity: 'Durante diez años, cada cambio de nombre ha respondido a una expansión real de capacidades técnicas (editorial, paramétrica, audiovisual y finalmente IA), manteniendo la misma ética de honestidad y perseverancia.',
    category: 'Visión Futura',
    hCode: '#H27',
    hmaCode: '#HMA27',
    accentColor: '#2D60C1'
  }
];


export const EVOLUTION_ERAS = typeof window !== 'undefined' && localStorage.getItem('hma_eras') ? JSON.parse(localStorage.getItem('hma_eras') as string) : DEFAULT_EVOLUTION_ERAS;
