export type ThemeMode = 'luz' | 'profundo';

export type ServiceLetter = 'H' | 'M' | 'A' | 'I' | 'N' | 'L' | 'U' | 'E';

export type ServiceId =
  | 'heritage'
  | 'melody'
  | 'architecture'
  | 'imagination'
  | 'narratives'
  | 'lenses'
  | 'underline'
  | 'merchandise'
  | 'experiences'
  | 'network'
  | 'alphabets'
  | 'illustrations';

export interface ShapeDefinition {
  id: string;
  displayName?: string;
  length: number;
  width: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
}

export interface ServiceItem {
  id: ServiceId;
  letter: string;
  index: number;
  name: string;
  fullServiceName: string;
  tagline: string;
  description: string;
  cluster: string;
  luzColor: string;
  profundoColor: string;
  deliverables: string[];
  capabilities: string[];
  shapes: ShapeDefinition[];
}

export interface HistoryEra {
  year: string;
  name: string;
  period: string;
  subtitle: string;
  description: string;
  badge: string;
  svgType: 'h16' | 'h17' | 'h18' | 'h19' | 'h20' | 'h21' | 'h22' | 'h23' | 'h24' | 'h25' | 'h26';
}

export type ActivePage =
  | { type: 'home' }
  | { type: 'service'; serviceId: ServiceId }
  | { type: 'trajectory' }
  | { type: 'contact' }
  | { type: 'colors' }
  | { type: 'admin' };
