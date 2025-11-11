export interface SerialInfo {
  prefix: string;
  software: string;
  details: { label: string; value: string }[];
}

// Plantilla estándar para detalles cuando se menciona "Diagzone"
const diagzoneDetailsTemplate = [
  { label: "Software Compatible", value: "Diagzone PRO" },
  { label: "Actualización", value: "2 años" },
];

// Plantilla genérica para otros
const genericDetailsTemplate = [
  { label: "Actualización", value: "Consultar" },
];

export const serialDatabase: SerialInfo[] = [];