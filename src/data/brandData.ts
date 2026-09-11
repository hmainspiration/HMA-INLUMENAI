import { HistoryEra, ServiceItem, ShapeDefinition } from '../types';

// =========================================================================
// HMA INLUMENAI — COLOR (ISOTIPO BASE)
// Luz: #3D80FD | Profundo: #2D60C1
// =========================================================================
export const MASTER_SHAPES: ShapeDefinition[] = [
  { id: 'forma-08', length: 402, width: 67, x: 279.43, y: 516.31, rotation: 45, color: '#3D80FD', displayName: 'Poste Lateral' },
  { id: 'forma-06', length: 67, width: 67, x: 611.07, y: 611.07, rotation: -45, color: '#3D80FD', displayName: 'Círculo Eje (Forma #13)' },
  { id: 'forma-07', length: 402, width: 67, x: 516.31, y: 800.57, rotation: -45, color: '#3D80FD', displayName: 'Base Inferior Izq' },
  { id: 'forma-09', length: 402, width: 67, x: 800.57, y: 563.69, rotation: 45, color: '#2D60C1', displayName: 'Poste Derecho' },
  { id: 'forma-10', length: 268, width: 67, x: 397.87, y: 540.01, rotation: 45, color: '#2D60C1', displayName: 'Brazo Lateral Izq' },
  { id: 'forma-11', length: 268, width: 67, x: 539.99, y: 397.87, rotation: -45, color: '#3D80FD', displayName: 'Viga Central Superior' },
  { id: 'forma-12', length: 268, width: 67, x: 540.01, y: 682.13, rotation: -45, color: '#2D60C1', displayName: 'Viga Central Inferior' },
  { id: 'forma-13', length: 402, width: 67, x: 563.69, y: 279.43, rotation: -45, color: '#2D60C1', displayName: 'Diagonal Superior' },
  { id: 'forma-03', length: 167.5, width: 67, x: 420.4, y: 481.95, rotation: -105, color: '#3D80FD', displayName: 'Guía Orbital' },
  { id: 'forma-05', length: 167.5, width: 67, x: 384.86, y: 446.42, rotation: 15, color: '#2D60C1', displayName: 'Segmento Inflexión' },
  { id: 'forma-01', length: 167.5, width: 67, x: 575.53, y: 362.34, rotation: 45, color: '#3D80FD', displayName: 'Pilar Conector' },
  { id: 'forma-04', length: 167.5, width: 67, x: 433.41, y: 646.6, rotation: 45, color: '#2D60C1', displayName: 'Apoyo Angular' },
  { id: 'forma-02', length: 167.5, width: 67, x: 504.47, y: 717.66, rotation: 45, color: '#3D80FD', displayName: 'Puntal de Base' }
];

export const MASTER_SHAPES_POSITIVO_NEGATIVO: ShapeDefinition[] = MASTER_SHAPES.map(s => ({
  ...s,
  color: s.color === '#3D80FD' ? '#FEFAE8' : '#060C04'
}));

// =========================================================================
// 01 #HMA HERITAGE (Luz: #315629 | Profundo: #1B3315)
// =========================================================================
export const HERITAGE_SHAPES: ShapeDefinition[] = [
  { id: 'forma-01', length: 402, width: 67, x: 506.5, y: 406, rotation: 90, color: '#315629', displayName: 'Prisma Trascendente' },
  { id: 'forma-02', length: 167.5, width: 67, x: 406, y: 322.25, rotation: 180, color: '#315629', displayName: 'Vector Espiritual Izq' },
  { id: 'forma-03', length: 167.5, width: 67, x: 540, y: 489.75, rotation: 0, color: '#315629', displayName: 'Vector Espiritual Der' },
  { id: 'forma-04', length: 268, width: 67, x: 389.25, y: 238.5, rotation: -90, color: '#1B3315', displayName: 'Raíz Cósmica Izq' },
  { id: 'forma-05', length: 402, width: 67, x: 623.75, y: 573.5, rotation: 90, color: '#1B3315', displayName: 'Raíz Cósmica Der' },
  { id: 'forma-06', length: 67, width: 67, x: 707.5, y: 238.5, rotation: 0, color: '#315629', displayName: 'Punto Éter (Forma #13)' },
  { id: 'forma-07', length: 201, width: 67, x: 288.75, y: 774.5, rotation: 0, color: '#1B3315', displayName: 'H-Poste Izquierdo' },
  { id: 'forma-08', length: 201, width: 67, x: 389.25, y: 774.5, rotation: 0, color: '#1B3315', displayName: 'H-Poste Derecho' },
  { id: 'forma-09', length: 201, width: 67, x: 489.75, y: 774.5, rotation: 0, color: '#315629', displayName: 'M-Poste Izquierdo' },
  { id: 'forma-11', length: 201, width: 67, x: 590.25, y: 774.5, rotation: 0, color: '#1B3315', displayName: 'M-Poste Derecho' },
  { id: 'forma-10', length: 201, width: 67, x: 542.87, y: 754.88, rotation: 45, color: '#315629', displayName: 'M-Diagonal Central' },
  { id: 'forma-12', length: 214.4, width: 67, x: 766.04, y: 772.24, rotation: -20, color: '#1B3315', displayName: 'A-Puntal Izquierdo' },
  { id: 'forma-13', length: 214.4, width: 67, x: 715.96, y: 772.24, rotation: 20, color: '#315629', displayName: 'A-Puntal Derecho' }
];

// =========================================================================
// 02 #HMA MELODY (Luz: #108591 | Profundo: #074349)
// =========================================================================
export const MELODY_SHAPES: ShapeDefinition[] = [
  { id: 'forma-01', length: 402, width: 67, x: 489.75, y: 406, rotation: 0, color: '#108591' },
  { id: 'forma-02', length: 268, width: 67, x: 590.25, y: 473, rotation: 0, color: '#074349' },
  { id: 'forma-03', length: 268, width: 67, x: 389.25, y: 473, rotation: 0, color: '#108591' },
  { id: 'forma-04', length: 167.5, width: 67, x: 288.75, y: 523.25, rotation: 0, color: '#074349' },
  { id: 'forma-05', length: 134, width: 67, x: 690.75, y: 540, rotation: 0, color: '#108591' },
  { id: 'forma-06', length: 67, width: 67, x: 791.25, y: 573.5, rotation: 0, color: '#108591' },
  { id: 'forma-07', length: 201, width: 67, x: 288.75, y: 774.5, rotation: 0, color: '#074349' },
  { id: 'forma-08', length: 201, width: 67, x: 389.25, y: 774.5, rotation: 0, color: '#074349' },
  { id: 'forma-09', length: 201, width: 67, x: 489.75, y: 774.5, rotation: 0, color: '#108591' },
  { id: 'forma-11', length: 201, width: 67, x: 590.25, y: 774.5, rotation: 0, color: '#074349' },
  { id: 'forma-10', length: 201, width: 67, x: 542.87, y: 754.88, rotation: 45, color: '#108591' },
  { id: 'forma-12', length: 214.4, width: 67, x: 766.04, y: 772.24, rotation: -20, color: '#074349' },
  { id: 'forma-13', length: 214.4, width: 67, x: 715.96, y: 772.24, rotation: 20, color: '#108591' }
];

// =========================================================================
// 03 #HMA ARCHITECTURE (Luz: #7D77B0 | Profundo: #514B7D)
// =========================================================================
export const ARCHITECTURE_SHAPES: ShapeDefinition[] = [
  { id: 'forma-01', length: 268, width: 67, x: 540, y: 473, rotation: 90, color: '#7D77B0' },
  { id: 'forma-02', length: 167.5, width: 67, x: 339, y: 573.5, rotation: -90, color: '#7D77B0' },
  { id: 'forma-03', length: 167.5, width: 67, x: 741, y: 573.5, rotation: 90, color: '#7D77B0' },
  { id: 'forma-04', length: 268, width: 67, x: 540, y: 573.5, rotation: 90, color: '#514B7D' },
  { id: 'forma-05', length: 167.5, width: 67, x: 540, y: 322.25, rotation: 0, color: '#514B7D' },
  { id: 'forma-06', length: 67, width: 67, x: 540, y: 221.75, rotation: 0, color: '#7D77B0' },
  { id: 'forma-07', length: 201, width: 67, x: 288.75, y: 774.5, rotation: 0, color: '#514B7D' },
  { id: 'forma-08', length: 201, width: 67, x: 389.25, y: 774.5, rotation: 0, color: '#514B7D' },
  { id: 'forma-09', length: 201, width: 67, x: 489.75, y: 774.5, rotation: 0, color: '#7D77B0' },
  { id: 'forma-11', length: 201, width: 67, x: 590.25, y: 774.5, rotation: 0, color: '#514B7D' },
  { id: 'forma-10', length: 201, width: 67, x: 542.87, y: 754.88, rotation: 45, color: '#7D77B0' },
  { id: 'forma-12', length: 214.4, width: 67, x: 766.04, y: 772.24, rotation: -20, color: '#514B7D' },
  { id: 'forma-13', length: 214.4, width: 67, x: 715.96, y: 772.24, rotation: 20, color: '#7D77B0' }
];

// =========================================================================
// 04 #HMA IMAGINATION (Luz: #3D80FD | Profundo: #2D60C1)
// =========================================================================
export const IMAGINATION_SHAPES: ShapeDefinition[] = [
  { id: 'forma-01', length: 268, width: 67, x: 649.75, y: 324.25, rotation: -35, color: '#3D80FD' },
  { id: 'forma-02', length: 134, width: 67, x: 489.75, y: 540, rotation: 0, color: '#3D80FD' },
  { id: 'forma-03', length: 134, width: 67, x: 489.75, y: 272, rotation: 0, color: '#3D80FD' },
  { id: 'forma-04', length: 402, width: 67, x: 389.25, y: 406, rotation: 0, color: '#2D60C1' },
  { id: 'forma-05', length: 268, width: 67, x: 650, y: 489, rotation: 35, color: '#2D60C1' },
  { id: 'forma-06', length: 67, width: 67, x: 489.75, y: 406, rotation: 0, color: '#3D80FD' },
  { id: 'forma-07', length: 201, width: 67, x: 288.75, y: 774.5, rotation: 0, color: '#2D60C1' },
  { id: 'forma-08', length: 201, width: 67, x: 389.25, y: 774.5, rotation: 0, color: '#2D60C1' },
  { id: 'forma-09', length: 201, width: 67, x: 489.75, y: 774.5, rotation: 0, color: '#3D80FD' },
  { id: 'forma-11', length: 201, width: 67, x: 590.25, y: 774.5, rotation: 0, color: '#2D60C1' },
  { id: 'forma-10', length: 201, width: 67, x: 542.87, y: 754.88, rotation: 45, color: '#3D80FD' },
  { id: 'forma-12', length: 214.4, width: 67, x: 766.04, y: 772.24, rotation: -20, color: '#2D60C1' },
  { id: 'forma-13', length: 214.4, width: 67, x: 715.96, y: 772.24, rotation: 20, color: '#3D80FD' }
];

// =========================================================================
// 05 #HMA NARRATIVES (Luz: #C5A367 | Profundo: #82600A)
// =========================================================================
export const NARRATIVES_SHAPES: ShapeDefinition[] = [
  { id: 'forma-01', length: 167.5, width: 67, x: 540, y: 573.5, rotation: 90, color: '#C5A367' },
  { id: 'forma-02', length: 268, width: 67, x: 359.81, y: 477.06, rotation: -45, color: '#C5A367' },
  { id: 'forma-03', length: 268, width: 67, x: 720.19, y: 477.06, rotation: 45, color: '#C5A367' },
  { id: 'forma-04', length: 268, width: 67, x: 418.69, y: 401.94, rotation: -45, color: '#82600A' },
  { id: 'forma-05', length: 268, width: 67, x: 661.31, y: 401.94, rotation: 45, color: '#82600A' },
  { id: 'forma-06', length: 67, width: 67, x: 540, y: 272, rotation: 90, color: '#C5A367' },
  { id: 'forma-07', length: 201, width: 67, x: 288.75, y: 774.5, rotation: 0, color: '#82600A' },
  { id: 'forma-08', length: 201, width: 67, x: 389.25, y: 774.5, rotation: 0, color: '#82600A' },
  { id: 'forma-09', length: 201, width: 67, x: 489.75, y: 774.5, rotation: 0, color: '#C5A367' },
  { id: 'forma-11', length: 201, width: 67, x: 590.25, y: 774.5, rotation: 0, color: '#82600A' },
  { id: 'forma-10', length: 201, width: 67, x: 542.87, y: 754.88, rotation: 45, color: '#C5A367' },
  { id: 'forma-12', length: 214.4, width: 67, x: 766.04, y: 772.24, rotation: -20, color: '#82600A' },
  { id: 'forma-13', length: 214.4, width: 67, x: 715.96, y: 772.24, rotation: 20, color: '#C5A367' }
];

// =========================================================================
// 06 #HMA LENSES (Luz: #052D63 | Profundo: #031C3D)
// =========================================================================
export const LENSES_SHAPES: ShapeDefinition[] = [
  { id: 'forma-01', length: 167.5, width: 67, x: 540, y: 406, rotation: 90, color: '#052D63' },
  { id: 'forma-02', length: 402, width: 67, x: 623.75, y: 573.5, rotation: 90, color: '#052D63' },
  { id: 'forma-03', length: 402, width: 67, x: 791.25, y: 406, rotation: 0, color: '#052D63' },
  { id: 'forma-04', length: 402, width: 67, x: 288.75, y: 406, rotation: 0, color: '#031C3D' },
  { id: 'forma-05', length: 402, width: 67, x: 456.25, y: 238.5, rotation: 90, color: '#031C3D' },
  { id: 'forma-06', length: 67, width: 67, x: 690.75, y: 322.25, rotation: 0, color: '#052D63' },
  { id: 'forma-07', length: 201, width: 67, x: 288.75, y: 774.5, rotation: 0, color: '#031C3D' },
  { id: 'forma-08', length: 201, width: 67, x: 389.25, y: 774.5, rotation: 0, color: '#031C3D' },
  { id: 'forma-09', length: 201, width: 67, x: 489.75, y: 774.5, rotation: 0, color: '#052D63' },
  { id: 'forma-11', length: 201, width: 67, x: 590.25, y: 774.5, rotation: 0, color: '#031C3D' },
  { id: 'forma-10', length: 201, width: 67, x: 542.87, y: 754.88, rotation: 45, color: '#052D63' },
  { id: 'forma-12', length: 214.4, width: 67, x: 766.04, y: 772.24, rotation: -20, color: '#031C3D' },
  { id: 'forma-13', length: 214.4, width: 67, x: 715.96, y: 772.24, rotation: 20, color: '#052D63' }
];

// =========================================================================
// 07 #HMA UNDERLINE (Luz: #D96B43 | Profundo: #964222)
// =========================================================================
export const UNDERLINE_SHAPES: ShapeDefinition[] = [
  { id: 'forma-01', length: 167.5, width: 67, x: 791.25, y: 288.75, rotation: 0, color: '#D96B43', displayName: 'Sello Relieve Diamante' },
  { id: 'forma-02', length: 167.5, width: 67, x: 288.75, y: 523.25, rotation: 0, color: '#D96B43', displayName: 'Marca de Agua Izq' },
  { id: 'forma-03', length: 167.5, width: 67, x: 791.25, y: 523.25, rotation: 0, color: '#D96B43', displayName: 'Marca de Agua Der' },
  { id: 'forma-04', length: 167.5, width: 67, x: 288.75, y: 288.75, rotation: 0, color: '#964222', displayName: 'Filigrana Flanco Izq' },
  { id: 'forma-05', length: 167.5, width: 67, x: 540, y: 456.25, rotation: 90, color: '#964222', displayName: 'Filigrana Flanco Der' },
  { id: 'forma-06', length: 67, width: 67, x: 540, y: 355.75, rotation: 0, color: '#D96B43', displayName: 'Micro-impresión Núcleo (Forma #13)' },
  { id: 'forma-07', length: 201, width: 67, x: 288.75, y: 774.5, rotation: 0, color: '#964222', displayName: 'H-Poste Izquierdo' },
  { id: 'forma-08', length: 201, width: 67, x: 389.25, y: 774.5, rotation: 0, color: '#964222', displayName: 'H-Poste Derecho' },
  { id: 'forma-09', length: 201, width: 67, x: 489.75, y: 774.5, rotation: 0, color: '#D96B43', displayName: 'M-Poste Izquierdo' },
  { id: 'forma-11', length: 201, width: 67, x: 590.25, y: 774.5, rotation: 0, color: '#964222', displayName: 'M-Poste Derecho' },
  { id: 'forma-10', length: 201, width: 67, x: 542.87, y: 754.88, rotation: 45, color: '#D96B43', displayName: 'M-Diagonal Central' },
  { id: 'forma-12', length: 214.4, width: 67, x: 766.04, y: 772.24, rotation: -20, color: '#964222', displayName: 'A-Puntal Izquierdo' },
  { id: 'forma-13', length: 214.4, width: 67, x: 715.96, y: 772.24, rotation: 20, color: '#D96B43', displayName: 'A-Puntal Derecho' }
];

// =========================================================================
// 08 #HMA MERCHANDISE (Luz: #D7BB11 | Profundo: #8C7907)
// =========================================================================
export const MERCHANDISE_SHAPES: ShapeDefinition[] = [
  { id: 'forma-01', length: 268, width: 67, x: 540, y: 473, rotation: 90, color: '#D7BB11', displayName: 'Cilindro de Impresión' },
  { id: 'forma-02', length: 402, width: 67, x: 540, y: 372.5, rotation: 90, color: '#8C7907', displayName: 'Cruz Registro Izq' },
  { id: 'forma-03', length: 134, width: 67, x: 489.75, y: 322.25, rotation: 0, color: '#D7BB11', displayName: 'Cruz Registro Der' },
  { id: 'forma-04', length: 402, width: 67, x: 540, y: 573.5, rotation: -90, color: '#8C7907', displayName: 'Trama Semitono Izq' },
  { id: 'forma-05', length: 134, width: 67, x: 590.25, y: 322.25, rotation: 0, color: '#D7BB11', displayName: 'Trama Semitono Der' },
  { id: 'forma-06', length: 67, width: 67, x: 540, y: 238.5, rotation: 0, color: '#D7BB11', displayName: 'Punto Registro (Forma #13)' },
  { id: 'forma-07', length: 201, width: 67, x: 288.75, y: 774.5, rotation: 0, color: '#8C7907' },
  { id: 'forma-08', length: 201, width: 67, x: 389.25, y: 774.5, rotation: 0, color: '#8C7907' },
  { id: 'forma-09', length: 201, width: 67, x: 489.75, y: 774.5, rotation: 0, color: '#D7BB11' },
  { id: 'forma-11', length: 201, width: 67, x: 590.25, y: 774.5, rotation: 0, color: '#8C7907' },
  { id: 'forma-10', length: 201, width: 67, x: 542.87, y: 754.88, rotation: 45, color: '#D7BB11' },
  { id: 'forma-12', length: 214.4, width: 67, x: 766.04, y: 772.24, rotation: -20, color: '#8C7907' },
  { id: 'forma-13', length: 214.4, width: 67, x: 715.96, y: 772.24, rotation: 20, color: '#D7BB11' }
];

// =========================================================================
// 09 #HMA EXPERIENCES (Luz: #1D5B8F | Profundo: #1B3F67)
// =========================================================================
export const EXPERIENCES_SHAPES: ShapeDefinition[] = [
  { id: 'forma-01', length: 402, width: 67, x: 456.25, y: 238.5, rotation: 90, color: '#1D5B8F' },
  { id: 'forma-02', length: 402, width: 67, x: 456.25, y: 573.5, rotation: 90, color: '#1B3F67' },
  { id: 'forma-03', length: 402, width: 67, x: 288.75, y: 406, rotation: 0, color: '#1B3F67' },
  { id: 'forma-04', length: 134, width: 67, x: 766.66, y: 427.53, rotation: -50, color: '#1D5B8F' },
  { id: 'forma-05', length: 134, width: 67, x: 764.69, y: 382.31, rotation: -135, color: '#1D5B8F' },
  { id: 'forma-06', length: 67, width: 67, x: 640.5, y: 406, rotation: 0, color: '#1D5B8F' },
  { id: 'forma-07', length: 201, width: 67, x: 288.75, y: 774.5, rotation: 0, color: '#1B3F67' },
  { id: 'forma-08', length: 201, width: 67, x: 389.25, y: 774.5, rotation: 0, color: '#1B3F67' },
  { id: 'forma-09', length: 201, width: 67, x: 489.75, y: 774.5, rotation: 0, color: '#1D5B8F' },
  { id: 'forma-11', length: 201, width: 67, x: 590.25, y: 774.5, rotation: 0, color: '#1B3F67' },
  { id: 'forma-10', length: 201, width: 67, x: 542.87, y: 754.88, rotation: 45, color: '#1D5B8F' },
  { id: 'forma-12', length: 214.4, width: 67, x: 766.04, y: 772.24, rotation: -20, color: '#1B3F67' },
  { id: 'forma-13', length: 214.4, width: 67, x: 715.96, y: 772.24, rotation: 20, color: '#1D5B8F' }
];

// =========================================================================
// 10 #HMA NETWORK (Luz: #11D7B6 | Profundo: #0A826E)
// =========================================================================
export const NETWORK_SHAPES: ShapeDefinition[] = [
  { id: 'forma-01', length: 268, width: 67, x: 661.31, y: 309.56, rotation: -45, color: '#11D7B6', displayName: 'Tronco Algorítmico' },
  { id: 'forma-02', length: 268, width: 67, x: 661.31, y: 502.44, rotation: 45, color: '#0A826E', displayName: 'Branch Lógico Izq' },
  { id: 'forma-03', length: 167.5, width: 67, x: 540, y: 406, rotation: 0, color: '#11D7B6', displayName: 'Branch Lógico Der' },
  { id: 'forma-04', length: 268, width: 67, x: 418.69, y: 309.56, rotation: 45, color: '#0A826E', displayName: 'Puntero Matriz Izq' },
  { id: 'forma-05', length: 268, width: 67, x: 418.69, y: 502.44, rotation: -45, color: '#11D7B6', displayName: 'Puntero Matriz Der' },
  { id: 'forma-06', length: 67, width: 67, x: 791.25, y: 573.5, rotation: 0, color: '#11D7B6', displayName: 'Byte Foco (Forma #13)' },
  { id: 'forma-07', length: 201, width: 67, x: 288.75, y: 774.5, rotation: 0, color: '#0A826E' },
  { id: 'forma-08', length: 201, width: 67, x: 389.25, y: 774.5, rotation: 0, color: '#0A826E' },
  { id: 'forma-09', length: 201, width: 67, x: 489.75, y: 774.5, rotation: 0, color: '#11D7B6' },
  { id: 'forma-11', length: 201, width: 67, x: 590.25, y: 774.5, rotation: 0, color: '#0A826E' },
  { id: 'forma-10', length: 201, width: 67, x: 542.87, y: 754.88, rotation: 45, color: '#11D7B6' },
  { id: 'forma-12', length: 214.4, width: 67, x: 766.04, y: 772.24, rotation: -20, color: '#0A826E' },
  { id: 'forma-13', length: 214.4, width: 67, x: 715.96, y: 772.24, rotation: 20, color: '#11D7B6' }
];

// =========================================================================
// 11 #HMA ALPHABETS (Luz: #AE7176 | Profundo: #77454A)
// =========================================================================
export const ALPHABETS_SHAPES: ShapeDefinition[] = [
  { id: 'forma-01', length: 268, width: 67, x: 505.63, y: 349.69, rotation: 20, color: '#77454A' },
  { id: 'forma-02', length: 268, width: 67, x: 574.37, y: 349.69, rotation: -20, color: '#AE7176' },
  { id: 'forma-03', length: 167.5, width: 67, x: 372.5, y: 389.25, rotation: 0, color: '#77454A' },
  { id: 'forma-04', length: 402, width: 67, x: 540, y: 573.5, rotation: -90, color: '#77454A' },
  { id: 'forma-05', length: 67, width: 67, x: 707.5, y: 439.5, rotation: 90, color: '#AE7176' },
  { id: 'forma-06', length: 134, width: 67, x: 537, y: 422.8, rotation: 90, color: '#AE7176' },
  { id: 'forma-07', length: 201, width: 67, x: 288.75, y: 774.5, rotation: 0, color: '#77454A' },
  { id: 'forma-08', length: 201, width: 67, x: 389.25, y: 774.5, rotation: 0, color: '#77454A' },
  { id: 'forma-09', length: 201, width: 67, x: 489.75, y: 774.5, rotation: 0, color: '#AE7176' },
  { id: 'forma-11', length: 201, width: 67, x: 590.25, y: 774.5, rotation: 0, color: '#77454A' },
  { id: 'forma-10', length: 201, width: 67, x: 542.87, y: 754.88, rotation: 45, color: '#AE7176' },
  { id: 'forma-12', length: 214.4, width: 67, x: 766.04, y: 772.24, rotation: -20, color: '#77454A' },
  { id: 'forma-13', length: 214.4, width: 67, x: 715.96, y: 772.24, rotation: 20, color: '#AE7176' }
];

// =========================================================================
// 12 #HMA ILLUSTRATIONS (Luz: #75C962 | Profundo: #4B893C)
// =========================================================================
export const ILLUSTRATIONS_SHAPES: ShapeDefinition[] = [
  { id: 'forma-01', length: 167.5, width: 67, x: 511.18, y: 398.34, rotation: -35, color: '#75C962' },
  { id: 'forma-02', length: 402, width: 67, x: 288.75, y: 406, rotation: 0, color: '#75C962' },
  { id: 'forma-03', length: 402, width: 67, x: 791.25, y: 406, rotation: 0, color: '#75C962' },
  { id: 'forma-04', length: 268, width: 67, x: 540, y: 573.5, rotation: 90, color: '#4B893C' },
  { id: 'forma-05', length: 167.5, width: 67, x: 568.82, y: 398.34, rotation: 35, color: '#4B893C' },
  { id: 'forma-06', length: 67, width: 67, x: 674, y: 272, rotation: 0, color: '#75C962' },
  { id: 'forma-07', length: 201, width: 67, x: 288.75, y: 774.5, rotation: 0, color: '#4B893C' },
  { id: 'forma-08', length: 201, width: 67, x: 389.25, y: 774.5, rotation: 0, color: '#4B893C' },
  { id: 'forma-09', length: 201, width: 67, x: 489.75, y: 774.5, rotation: 0, color: '#75C962' },
  { id: 'forma-11', length: 201, width: 67, x: 590.25, y: 774.5, rotation: 0, color: '#4B893C' },
  { id: 'forma-10', length: 201, width: 67, x: 542.87, y: 754.88, rotation: 45, color: '#75C962' },
  { id: 'forma-12', length: 214.4, width: 67, x: 766.04, y: 772.24, rotation: -20, color: '#4B893C' },
  { id: 'forma-13', length: 214.4, width: 67, x: 715.96, y: 772.24, rotation: 20, color: '#75C962' }
];

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'heritage',
    letter: 'H',
    index: 1,
    name: 'Heritage',
    fullServiceName: 'HMA HERITAGE',
    tagline: 'Trascendencia, memoria y legado documental.',
    description: 'Archivo y preservación histórica para negocios, comunidades y organizaciones. Conservación documental, líneas de tiempo y memorias con rigor estético.',
    cluster: 'Clúster 03 — Fe & Legado',
    luzColor: '#315629',
    profundoColor: '#1B3315',
    deliverables: [
      'Archivo histórico y cronología corporativa',
      'Libro de memoria y trayectoria conmemorativa',
      'Curaduría y restauración de acervos documentales'
    ],
    capabilities: [
      'Digitalización y preservación histórica',
      'Líneas de tiempo arquitectónicas',
      'Gestión de legado de marca de 10+ años'
    ],
    shapes: HERITAGE_SHAPES
  },
  {
    id: 'melody',
    letter: 'M',
    index: 2,
    name: 'Melody',
    fullServiceName: 'HMA MELODY',
    tagline: 'Composición musical asistida por Inteligencia Artificial.',
    description: 'Producción de pistas sonoras personalizadas, ambientación auditiva de espacios, diseño de carátulas discográficas y videos lyric cinematográficos.',
    cluster: 'Clúster 02 — Sonido & Narrativa',
    luzColor: '#108591',
    profundoColor: '#074349',
    deliverables: [
      'Pistas musicales y jingles originales con IA',
      'Videos lyric adaptados para YouTube y Reels',
      'Arte de tapa y paquetización musical'
    ],
    capabilities: [
      'Generación sonora paramétrica',
      'Sincronización rítmica y mezcla digital',
      'Identidad sonora de marca (audio branding)'
    ],
    shapes: MELODY_SHAPES
  },
  {
    id: 'architecture',
    letter: 'A',
    index: 3,
    name: 'Architecture',
    fullServiceName: 'HMA ARCHITECTURE',
    tagline: 'Diseño arquitectónico de templos y espacios comunitarios.',
    description: 'De bocetos a renders 3D de alta precisión. Propuestas de fachada, volumetría, iluminación y distribución espacial para recintos religiosos y corporativos.',
    cluster: 'Clúster 03 — Fe & Legado',
    luzColor: '#7D77B0',
    profundoColor: '#514B7D',
    deliverables: [
      'Renders fotorrealistas de fachadas e interiores',
      'Modelado 3D volumétrico y estudios de asoleamiento',
      'Planos de concepto arquitectónico y materialidad'
    ],
    capabilities: [
      'Diseño especializado en templos y auditorios',
      'Cálculo visual de iluminación natural',
      'Recorridos virtuales y vistas axonométricas'
    ],
    shapes: ARCHITECTURE_SHAPES
  },
  {
    id: 'imagination',
    letter: 'I',
    index: 4,
    name: 'Imagination',
    fullServiceName: 'HMA IMAGINATION',
    tagline: 'Diseño gráfico estratégico, logotipos y vectorización.',
    description: 'La cuna del sistema visual. Creación de identidades de marca sólidas, diseño de logotipos, vectorización de precisión y piezas para canales digitales y prensa.',
    cluster: 'Clúster 01 — Identidad & Arte',
    luzColor: '#3D80FD',
    profundoColor: '#2D60C1',
    deliverables: [
      'Sistemas de identidad corporativa y manuales',
      'Logotipos, isotipos y tipografías asociadas',
      'Kits de plantillas vectoriales para redes sociales'
    ],
    capabilities: [
      'Vectorización milimétrica geométrica',
      'Armonización de color accesible WCAG',
      'Sistemas de retícula modular 11×11'
    ],
    shapes: IMAGINATION_SHAPES
  },
  {
    id: 'narratives',
    letter: 'N',
    index: 5,
    name: 'Narratives',
    fullServiceName: 'HMA NARRATIVES',
    tagline: 'Documentos, diseño editorial y textos de alta jerarquía.',
    description: 'Maquetación de libros, portadas conmemorativas, poemas, citas bíblicas, dedicatorias y documentos oficiales preparados para imprenta o lectura digital.',
    cluster: 'Clúster 02 — Sonido & Narrativa',
    luzColor: '#C5A367',
    profundoColor: '#82600A',
    deliverables: [
      'Diseño de portadas y diagramación de libros',
      'Edición de documentos conmemorativos y diplomas',
      'Composición tipográfica editorial de alta lectura'
    ],
    capabilities: [
      'Lectura extendida con tipografía Newsreader',
      'Preparación de archivos para prensa Offset',
      'Curaduría textual y jerarquías literarias'
    ],
    shapes: NARRATIVES_SHAPES
  },
  {
    id: 'lenses',
    letter: 'L',
    index: 6,
    name: 'Lenses',
    fullServiceName: 'HMA LENSES',
    tagline: 'Fotografía profesional, revelado y edición estética.',
    description: 'Dirección fotográfica de luz natural con contraste geométrico. Toma, revelado digital, preparación para impresión en gran formato y optimización para redes.',
    cluster: 'Clúster 01 — Identidad & Arte',
    luzColor: '#052D63',
    profundoColor: '#031C3D',
    deliverables: [
      'Retoque fotográfico de producto e institucional',
      'Sesiones fotográficas de espacios e instalaciones',
      'Perfiles de color para impresión Fine Art'
    ],
    capabilities: [
      'Luz lateral y tres cuartos sin flash plano',
      'Espacio negativo generoso y balance tonal',
      'Corrección cromática neutra-fría'
    ],
    shapes: LENSES_SHAPES
  },
  {
    id: 'underline',
    letter: 'U',
    index: 7,
    name: 'Underline',
    fullServiceName: 'HMA UNDERLINE',
    tagline: 'Marcos digitales, firmas visuales y marcas de agua.',
    description: 'Marcos de fotos digitales y físicos para eventos conmemorativos, marcas de agua personalizadas para fotógrafos, retratos ilustrados y firmas visuales.',
    cluster: 'Clúster 04 — Tecnología & Producción',
    luzColor: '#D96B43',
    profundoColor: '#964222',
    deliverables: [
      'Marcos decorativos digitales para redes y eventos',
      'Marcas de agua vectoriales de protección',
      'Firmas gráficas y sellos de autor'
    ],
    capabilities: [
      'Protección de propiedad visual en línea',
      'Diseño de passepartout y enmarcado digital',
      'Caligrafía vectorial estilizada'
    ],
    shapes: UNDERLINE_SHAPES
  },
  {
    id: 'merchandise',
    letter: 'M',
    index: 8,
    name: 'Merchandise',
    fullServiceName: 'HMA MERCHANDISE',
    tagline: 'Sublimación, estampados y productos personalizados.',
    description: 'Producción de mercancía física con estándar de diseño: gorras, tazas, camisetas, papelería y artículos promocionales con estampado duradero de alta fidelidad.',
    cluster: 'Clúster 04 — Tecnología & Producción',
    luzColor: '#D7BB11',
    profundoColor: '#8C7907',
    deliverables: [
      'Camisetas y textiles sublimados/serigrafiados',
      'Tazas cerámicas y termos térmicos grabados',
      'Gorras estructuradas y accesorios corporativos'
    ],
    capabilities: [
      'Gestión de matrices de color CMYK/Pantone',
      'Resistencia a lavado y durabilidad de estampados',
      'Tirajes para pequeños emprendedores y empresas'
    ],
    shapes: MERCHANDISE_SHAPES
  },
  {
    id: 'experiences',
    letter: 'E',
    index: 9,
    name: 'Experiences',
    fullServiceName: 'HMA EXPERIENCES',
    tagline: 'Producción audiovisual, reels e intros dinámicas.',
    description: 'Video cinematográfico para plataformas digitales, intros animadas, reels de impacto, edición para canales de YouTube y cobertura audiovisual de eventos.',
    cluster: 'Clúster 02 — Sonido & Narrativa',
    luzColor: '#1D5B8F',
    profundoColor: '#1B3F67',
    deliverables: [
      'Reels y videos cortos para Instagram y TikTok',
      'Intros animadas de logotipo y cabeceras de canal',
      'Videos corporativos y testimoniales de impacto'
    ],
    capabilities: [
      'Edición con ritmo narrativo y color grading',
      'Motion graphics integrados con la marca madre',
      'Formatos optimizados para retención móvil'
    ],
    shapes: EXPERIENCES_SHAPES
  },
  {
    id: 'network',
    letter: 'N',
    index: 10,
    name: 'Network',
    fullServiceName: 'HMA NETWORK',
    tagline: 'Desarrollo web moderno y aplicaciones apoyadas en IA.',
    description: 'Ingeniería de software web, landing pages de alto rendimiento, plataformas interactivas y aplicaciones digitales con integración de modelos de inteligencia artificial.',
    cluster: 'Clúster 04 — Tecnología & Producción',
    luzColor: '#11D7B6',
    profundoColor: '#0A826E',
    deliverables: [
      'Sitios web corporativos responsive de alta velocidad',
      'Aplicaciones web interactivas con React y TypeScript',
      'Integraciones con APIs de Inteligencia Artificial'
    ],
    capabilities: [
      'Arquitectura web full-stack de bajo consumo',
      'Rendimiento 60fps con animaciones aceleradas GPU',
      'Accesibilidad estricta WCAG AA'
    ],
    shapes: NETWORK_SHAPES
  },
  {
    id: 'alphabets',
    letter: 'A',
    index: 11,
    name: 'Alphabets',
    fullServiceName: 'HMA ALPHABETS',
    tagline: 'Tipografías exclusivas y diseño de fuentes a medida.',
    description: 'Diseño tipográfico a medida para marcas que buscan una voz propia indiscutible. Creación de alfabetos completos, glifos numéricos y fuentes corporativas.',
    cluster: 'Clúster 01 — Identidad & Arte',
    luzColor: '#AE7176',
    profundoColor: '#77454A',
    deliverables: [
      'Fuentes tipográficas OpenType/WOFF2 a medida',
      'Juegos de caracteres con soporte de tildes y signos hispanos',
      'Manuales de aplicación y emparejamiento tipográfico'
    ],
    capabilities: [
      'Dibujo vectorial Bézier de ultra-precisión',
      'Kerning, tracking y espaciado óptico',
      'Licenciamiento exclusivo para clientes'
    ],
    shapes: ALPHABETS_SHAPES
  },
  {
    id: 'illustrations',
    letter: 'I',
    index: 12,
    name: 'Illustrations',
    fullServiceName: 'HMA ILLUSTRATIONS',
    tagline: 'Fondos de pantalla personalizados y biblioteca artística.',
    description: 'Ilustración digital estilizada, fondos de pantalla para dispositivos móviles y de escritorio, texturas vectoriales y biblioteca visual propia.',
    cluster: 'Clúster 01 — Identidad & Arte',
    luzColor: '#75C962',
    profundoColor: '#4B893C',
    deliverables: [
      'Wallpapers en resolución 4K para móvil y escritorio',
      'Ilustraciones vectoriales temáticas y decorativas',
      'Acceso a biblioteca de recursos gráficos exclusivos'
    ],
    capabilities: [
      'Geometría vectorial equilibrada con luz natural',
      'Formatos escalables sin pérdida de resolución',
      'Paletas de contraste calibradas para descanso visual'
    ],
    shapes: ILLUSTRATIONS_SHAPES
  }
];

export const HISTORY_ERAS: HistoryEra[] = [
  {
    year: '2016',
    period: '2016',
    name: 'HMA Diseños',
    subtitle: 'El Génesis de la Travesía',
    badge: 'Era Fundacional',
    description: 'Inicio de la actividad creativa con foco en diseño gráfico básico, papelería y servicios visuales para organizaciones y emprendedores locales en Nicaragua.',
    svgType: 'h16'
  },
  {
    year: '2017',
    period: '2017',
    name: 'HMA Creations',
    subtitle: 'Expansión de Disciplinas',
    badge: 'Exploración y Crecimiento',
    description: 'Incorporación de nuevas herramientas técnicas, diseño editorial para eventos y primeros proyectos de identidad para congregaciones y negocios familiares.',
    svgType: 'h17'
  },
  {
    year: '2018',
    period: '2018',
    name: 'HMA Creativity',
    subtitle: 'Consolidación Metodológica',
    badge: 'Identidad & Rigor',
    description: 'Reestructuración geométrica y formal. Nace el interés por sistematizar el símbolo de marca y establecer una metodología de diseño basada en principios y retícula.',
    svgType: 'h18'
  },
  {
    year: '2019-2020',
    period: '2019–2020',
    name: 'HMA Inspiration',
    subtitle: 'Resiliencia y Propósito',
    badge: 'Evolución de Fe y Arte',
    description: 'Una etapa de profunda maduración conceptual y espiritual. La creatividad entendida no como mera técnica comercial, sino como un don al servicio de la comunidad.',
    svgType: 'h19'
  },
  {
    year: '2021-2025',
    period: '2021–2025',
    name: 'Evolución Paramétrica',
    subtitle: 'Hacia el Ecosistema Multifacético',
    badge: 'Maduración Sistémica',
    description: 'Desarrollo de las 13 formas fundamentales y experimentación con tipografías propias, arquitectura de templos y primeros pilotos de inteligencia artificial aplicada.',
    svgType: 'h21'
  },
  {
    year: '2026',
    period: '2026',
    name: 'HMA INLUMENAI',
    subtitle: 'En la Luz de Cada Idea',
    badge: 'Marca Matrix Actual',
    description: 'La culminación de 10 años de trayectoria: una Marca Madre que articula 12 servicios autónomos bajo un mismo estándar de excelencia tecnológica, estética e integridad.',
    svgType: 'h26'
  }
];


export const SERVICES = typeof window !== 'undefined' && localStorage.getItem('hma_services') ? JSON.parse(localStorage.getItem('hma_services') as string) : DEFAULT_SERVICES;
