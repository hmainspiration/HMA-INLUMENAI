// =========================================================================
// HMA INLUMENAI — BASE DE DATOS CROMÁTICA MAESTRA (26 VALORES CERRADOS)
// =========================================================================

export interface ColorData {
  servicio: string;
  sub: string;
  tono: 'Luz' | 'Profundo';
  hex: string;
  rgb: string;
  cmyk: string;
  pantone: string;
  contrasteLuz: string;
  contrasteProfundo: string;
  uso: string;
  dagger: boolean;
}

export const COLOR_DATABASE: Record<string, ColorData> = {
  "#3D80FD": {
    servicio: "Imagination / INLUMENAI",
    sub: "marca madre",
    tono: "Luz",
    hex: "#3D80FD",
    rgb: "61, 128, 253",
    cmyk: "76, 49, 0, 1",
    pantone: "2726 C",
    contrasteLuz: "3.52:1",
    contrasteProfundo: "5.37:1",
    uso: "Fondo Profundo — #060C04",
    dagger: false
  },
  "#2D60C1": {
    servicio: "Imagination / INLUMENAI",
    sub: "marca madre",
    tono: "Profundo",
    hex: "#2D60C1",
    rgb: "45, 96, 193",
    cmyk: "77, 50, 0, 24",
    pantone: "2125 C",
    contrasteLuz: "5.64:1",
    contrasteProfundo: "3.35:1",
    uso: "Fondo Luz — #FEFAE8",
    dagger: false
  },
  "#AE7176": {
    servicio: "Alphabets",
    sub: "categoría temática",
    tono: "Luz",
    hex: "#AE7176",
    rgb: "174, 113, 118",
    cmyk: "0, 35, 32, 32",
    pantone: "2447 C",
    contrasteLuz: "3.70:1",
    contrasteProfundo: "5.11:1",
    uso: "Fondo Profundo — #060C04",
    dagger: false
  },
  "#77454A": {
    servicio: "Alphabets",
    sub: "categoría temática",
    tono: "Profundo",
    hex: "#77454A",
    rgb: "119, 69, 74",
    cmyk: "0, 42, 38, 53",
    pantone: "4096 C",
    contrasteLuz: "7.33:1",
    contrasteProfundo: "2.57:1",
    uso: "Fondo Luz — #FEFAE8",
    dagger: false
  },
  "#D96B43": {
    servicio: "Underline",
    sub: "categoría temática",
    tono: "Luz",
    hex: "#D96B43",
    rgb: "217, 107, 67",
    cmyk: "0, 51, 69, 15",
    pantone: "4011 C",
    contrasteLuz: "3.27:1",
    contrasteProfundo: "5.78:1",
    uso: "Fondo Profundo — #060C04",
    dagger: false
  },
  "#964222": {
    servicio: "Underline",
    sub: "categoría temática",
    tono: "Profundo",
    hex: "#964222",
    rgb: "150, 66, 34",
    cmyk: "0, 56, 77, 41",
    pantone: "7526 C",
    contrasteLuz: "6.47:1",
    contrasteProfundo: "2.92:1",
    uso: "Fondo Luz — #FEFAE8",
    dagger: false
  },
  "#052D63": {
    servicio: "Lenses",
    sub: "categoría temática",
    tono: "Luz",
    hex: "#052D63",
    rgb: "5, 45, 99",
    cmyk: "95, 55, 0, 61",
    pantone: "2119 C",
    contrasteLuz: "12.84:1",
    contrasteProfundo: "1.47:1",
    uso: "Fondo Luz — #FEFAE8",
    dagger: false
  },
  "#031C3D": {
    servicio: "Lenses",
    sub: "categoría temática",
    tono: "Profundo",
    hex: "#031C3D",
    rgb: "3, 28, 61",
    cmyk: "95, 54, 0, 76",
    pantone: "282 C",
    contrasteLuz: "16.21:1",
    contrasteProfundo: "1.17:1",
    uso: "Fondo Luz — #FEFAE8",
    dagger: false
  },
  "#108591": {
    servicio: "Melody",
    sub: "categoría temática",
    tono: "Luz",
    hex: "#108591",
    rgb: "16, 133, 145",
    cmyk: "90, 8, 0, 44*",
    pantone: "314 C",
    contrasteLuz: "4.19:1",
    contrasteProfundo: "4.51:1",
    uso: "Fondo Profundo — #060C04",
    dagger: true
  },
  "#074349": {
    servicio: "Melody",
    sub: "categoría temática",
    tono: "Profundo",
    hex: "#074349",
    rgb: "7, 67, 73",
    cmyk: "90, 8, 0, 71",
    pantone: "2217 C",
    contrasteLuz: "10.51:1",
    contrasteProfundo: "1.80:1",
    uso: "Fondo Luz — #FEFAE8",
    dagger: false
  },
  "#1D5B8F": {
    servicio: "Experiences",
    sub: "categoría temática",
    tono: "Luz",
    hex: "#1D5B8F",
    rgb: "29, 91, 143",
    cmyk: "80, 36, 0, 44",
    pantone: "8184 C",
    contrasteLuz: "6.81:1",
    contrasteProfundo: "2.77:1",
    uso: "Fondo Luz — #FEFAE8",
    dagger: false
  },
  "#1B3F67": {
    servicio: "Experiences",
    sub: "categoría temática",
    tono: "Profundo",
    hex: "#1B3F67",
    rgb: "27, 63, 103",
    cmyk: "74, 39, 0, 60",
    pantone: "534 C",
    contrasteLuz: "10.27:1",
    contrasteProfundo: "1.84:1",
    uso: "Fondo Luz — #FEFAE8",
    dagger: false
  },
  "#7D77B0": {
    servicio: "Architecture",
    sub: "categoría temática",
    tono: "Luz",
    hex: "#7D77B0",
    rgb: "125, 119, 176",
    cmyk: "29, 32, 0, 31",
    pantone: "10215 C",
    contrasteLuz: "3.90:1",
    contrasteProfundo: "4.84:1",
    uso: "Fondo Profundo — #060C04",
    dagger: false
  },
  "#514B7D": {
    servicio: "Architecture",
    sub: "categoría temática",
    tono: "Profundo",
    hex: "#514B7D",
    rgb: "81, 75, 125",
    cmyk: "35, 40, 0, 51",
    pantone: "7447 C",
    contrasteLuz: "7.56:1",
    contrasteProfundo: "2.50:1",
    uso: "Fondo Luz — #FEFAE8",
    dagger: false
  },
  "#C5A367": {
    servicio: "Narratives",
    sub: "categoría temática",
    tono: "Luz",
    hex: "#C5A367",
    rgb: "197, 163, 103",
    cmyk: "0, 17, 48, 23",
    pantone: "7562 C",
    contrasteLuz: "2.28:1",
    contrasteProfundo: "8.29:1",
    uso: "Fondo Profundo — #060C04",
    dagger: false
  },
  "#82600A": {
    servicio: "Narratives",
    sub: "categoría temática",
    tono: "Profundo",
    hex: "#82600A",
    rgb: "130, 96, 10",
    cmyk: "0, 26, 92, 49",
    pantone: "1265 C",
    contrasteLuz: "5.53:1",
    contrasteProfundo: "3.41:1",
    uso: "Fondo Luz — #FEFAE8",
    dagger: false
  },
  "#315629": {
    servicio: "Heritage",
    sub: "categoría temática",
    tono: "Luz",
    hex: "#315629",
    rgb: "49, 86, 41",
    cmyk: "43, 0, 52, 66",
    pantone: "2266 C",
    contrasteLuz: "8.04:1",
    contrasteProfundo: "2.35:1",
    uso: "Fondo Luz — #FEFAE8",
    dagger: false
  },
  "#1B3315": {
    servicio: "Heritage",
    sub: "categoría temática",
    tono: "Profundo",
    hex: "#1B3315",
    rgb: "27, 51, 21",
    cmyk: "47, 0, 59, 80",
    pantone: "2411 C",
    contrasteLuz: "13.10:1",
    contrasteProfundo: "1.44:1",
    uso: "Fondo Luz — #FEFAE8",
    dagger: false
  },
  "#75C962": {
    servicio: "Illustrations",
    sub: "categoría temática",
    tono: "Luz",
    hex: "#75C962",
    rgb: "117, 201, 98",
    cmyk: "42, 0, 51, 21",
    pantone: "2269 C",
    contrasteLuz: "1.95:1",
    contrasteProfundo: "9.69:1",
    uso: "Fondo Profundo — #060C04",
    dagger: false
  },
  "#4B893C": {
    servicio: "Illustrations",
    sub: "categoría temática",
    tono: "Profundo",
    hex: "#4B893C",
    rgb: "75, 137, 60",
    cmyk: "45, 0, 56, 46",
    pantone: "7741 C",
    contrasteLuz: "4.06:1",
    contrasteProfundo: "4.65:1",
    uso: "Fondo Profundo — #060C04",
    dagger: true
  },
  "#11D7B6": {
    servicio: "Network",
    sub: "categoría temática",
    tono: "Luz",
    hex: "#11D7B6",
    rgb: "17, 215, 182",
    cmyk: "92, 0, 15, 16",
    pantone: "2239 C",
    contrasteLuz: "1.76:1",
    contrasteProfundo: "10.75:1",
    uso: "Fondo Profundo — #060C04",
    dagger: false
  },
  "#0A826E": {
    servicio: "Network",
    sub: "categoría temática",
    tono: "Profundo",
    hex: "#0A826E",
    rgb: "10, 130, 110",
    cmyk: "92, 0, 16, 48*",
    pantone: "327 C",
    contrasteLuz: "4.53:1",
    contrasteProfundo: "4.17:1",
    uso: "Fondo Luz — #FEFAE8",
    dagger: true
  },
  "#D7BB11": {
    servicio: "Merchandise",
    sub: "categoría temática",
    tono: "Luz",
    hex: "#D7BB11",
    rgb: "215, 187, 17",
    cmyk: "0, 13, 92, 16",
    pantone: "7758 C",
    contrasteLuz: "1.82:1",
    contrasteProfundo: "10.36:1",
    uso: "Fondo Profundo — #060C04",
    dagger: false
  },
  "#8C7907": {
    servicio: "Merchandise",
    sub: "categoría temática",
    tono: "Profundo",
    hex: "#8C7907",
    rgb: "140, 121, 7",
    cmyk: "0, 14, 95, 45",
    pantone: "392 C",
    contrasteLuz: "4.13:1",
    contrasteProfundo: "4.57:1",
    uso: "Fondo Profundo — #060C04",
    dagger: true
  },
  "#FEFAE8": {
    servicio: "Positivo / Negativo",
    sub: "isotipo base",
    tono: "Luz",
    hex: "#FEFAE8",
    rgb: "254, 250, 232",
    cmyk: "0, 2, 9, 0",
    pantone: "9064 C",
    contrasteLuz: "1.00:1",
    contrasteProfundo: "18.88:1",
    uso: "Fondo Profundo — #060C04",
    dagger: false
  },
  "#060C04": {
    servicio: "Positivo / Negativo",
    sub: "isotipo base",
    tono: "Profundo",
    hex: "#060C04",
    rgb: "6, 12, 4",
    cmyk: "50, 0, 67, 95",
    pantone: "Black 6 C",
    contrasteLuz: "18.88:1",
    contrasteProfundo: "1.00:1",
    uso: "Fondo Luz — #FEFAE8",
    dagger: false
  }
};

// =========================================================================
// TIRA DE TONOS (13 Columnas x 2 Filas)
// =========================================================================
export const STRIP_ROW_1_LUZ: string[] = [
  "#315629", "#75C962", "#11D7B6", "#108591", "#052D63", "#1D5B8F", 
  "#3D80FD", "#7D77B0", "#AE7176", "#D96B43", "#C5A367", "#D7BB11", "#FEFAE8"
];

export const STRIP_ROW_2_PROFUNDO: string[] = [
  "#1B3315", "#4B893C", "#0A826E", "#074349", "#031C3D", "#1B3F67", 
  "#2D60C1", "#514B7D", "#77454A", "#964222", "#82600A", "#8C7907", "#060C04"
];

// =========================================================================
// MATRIZ 11x11 DEL ISOTIPO DINÁMICO (PINWHEEL PIXELS)
// =========================================================================
export interface PixelCoord {
  r: number;
  c: number;
  hex: string;
}

export const PINWHEEL_PIXELS: PixelCoord[] = [
  // Brazo Superior
  { r: 0, c: 7, hex: "#1B3315" },
  { r: 1, c: 7, hex: "#315629" },
  { r: 2, c: 7, hex: "#4B893C" },

  // Brazo Izquierdo y Fila 3
  { r: 3, c: 1, hex: "#031C3D" },
  { r: 3, c: 2, hex: "#1D5B8F" },
  { r: 3, c: 3, hex: "#2D60C1" },
  { r: 3, c: 4, hex: "#3D80FD" },
  { r: 3, c: 5, hex: "#052D63" },
  { r: 3, c: 6, hex: "#11D7B6" },
  { r: 3, c: 7, hex: "#315629" },

  // Fila 4
  { r: 4, c: 3, hex: "#AE7176" },
  { r: 4, c: 4, hex: "#074349" },
  { r: 4, c: 5, hex: "#031C3D" },
  { r: 4, c: 6, hex: "#0A826E" },
  { r: 4, c: 7, hex: "#75C962" },

  // Fila 5 (Centro)
  { r: 5, c: 3, hex: "#77454A" },
  { r: 5, c: 4, hex: "#3D80FD" },
  { r: 5, c: 5, hex: "#060C04" },
  { r: 5, c: 6, hex: "#108591" },
  { r: 5, c: 7, hex: "#FEFAE8" },

  // Fila 6
  { r: 6, c: 3, hex: "#82600A" },
  { r: 6, c: 4, hex: "#D96B43" },
  { r: 6, c: 5, hex: "#964222" },

  // Fila 7 y Brazo Derecho
  { r: 7, c: 3, hex: "#C5A367" },
  { r: 7, c: 4, hex: "#D7BB11" },
  { r: 7, c: 5, hex: "#514B7D" },
  { r: 7, c: 6, hex: "#7D77B0" },
  { r: 7, c: 7, hex: "#7D77B0" },
  { r: 7, c: 8, hex: "#7D77B0" },
  { r: 7, c: 9, hex: "#514B7D" },

  // Brazo Inferior
  { r: 8, c: 3, hex: "#8C7907" },
  { r: 9, c: 3, hex: "#D7BB11" }
];
