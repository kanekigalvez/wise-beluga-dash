export interface SerialInfo {
  prefix: string;
  software: string;
  details: { label: string; value: string }[];
}

// Plantilla estándar para detalles
const diagzoneDetailsTemplate = [
  { label: "Software Compatible", value: "Diagzone PRO" },
  { label: "Actualización", value: "Consultar" },
];

export const serialDatabase: SerialInfo[] = [
  {
    prefix: "96919",
    software: "Golo ED+",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "96579",
    software: "iDiag for Android",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "97986",
    software: "TD1",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "97699",
    software: "ED 3.0",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "98914",
    software: "BT200",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "96859",
    software: "ED V2.0",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "70001", // Prefijo temporal asignado
    software: "V",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "98374",
    software: "V+",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "97189",
    software: "TOPDON",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "96883",
    software: "MaxGo",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "98689",
    software: "HD IV",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "98649",
    software: "HD III",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "97619",
    software: "M-Diag",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "98609",
    software: "PRO4 D3",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "98579",
    software: "PAD2 D3",
    details: diagzoneDetailsTemplate,
  },
];