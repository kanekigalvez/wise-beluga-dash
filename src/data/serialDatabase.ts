export interface SerialInfo {
  prefix: string;
  software: string;
  details: { label: string; value: string }[];
}

// Plantilla estándar para detalles cuando se menciona "Diagzone"
const diagzoneDetailsTemplate = [
  { label: "Software Compatible", value: "Diagzone PRO" },
  { label: "Actualización", value: "2 años" },
  { label: "Precio", value: "$120 USD" },
];

// Plantilla genérica para otros
const genericDetailsTemplate = [
  { label: "Actualización", value: "Consultar" },
  { label: "Precio", value: "Consultar" },
];

export const serialDatabase: SerialInfo[] = [
  // --- Entradas originales que no se reemplazan ---
  {
    prefix: "98539",
    software: "X-DIAG PRO3",
    details: [
      { label: "Marcas", value: "240+" },
      { label: "Funciones Especiales", value: "42" },
      { label: "Actualización", value: "2 años" },
      { label: "Precio", value: "$120 USD" },
    ],
  },
  {
    prefix: "98639",
    software: "DIAGZONE PRO",
    details: [
      { label: "Marcas", value: "240+" },
      { label: "Funciones Especiales", value: "42" },
      { label: "Actualización", value: "2 años" },
      { label: "Precio", value: "$120 USD" },
    ],
  },
  {
    prefix: "98986",
    software: "THINKDIAG 2",
    details: [
      { label: "Marcas", value: "200+" },
      { label: "Funciones Especiales", value: "30" },
      { label: "Actualización", value: "1 año" },
      { label: "Precio", value: "$100 USD" },
    ],
  },
  {
    prefix: "98729",
    software: "KINGBOLEN S500",
    details: [
      { label: "Marcas", value: "180+" },
      { label: "Funciones Especiales", value: "25" },
      { label: "Actualización", value: "2 años" },
      { label: "Precio", value: "$110 USD" },
    ],
  },
  {
    prefix: "98888",
    software: "AUTEL AP200",
    details: [
      { label: "Marcas", value: "190+" },
      { label: "Funciones Especiales", value: "28" },
      { label: "Actualización", value: "1 año" },
      { label: "Precio", value: "$95 USD" },
    ],
  },
  {
    prefix: "98999",
    software: "LAUNCH X431",
    details: [
      { label: "Marcas", value: "250+" },
      { label: "Funciones Especiales", value: "50" },
      { label: "Actualización", value: "3 años" },
      { label: "Precio", value: "$150 USD" },
    ],
  },
  {
    prefix: "96789",
    software: "TOPDON ArtiDiag",
    details: [
      { label: "Marcas", value: "210+" },
      { label: "Funciones Especiales", value: "35" },
      { label: "Actualización", value: "2 años" },
      { label: "Precio", value: "$130 USD" },
    ],
  },
  {
    prefix: "98123",
    software: "iCarsoft CR Pro",
    details: [
      { label: "Marcas", value: "220+" },
      { label: "Funciones Especiales", value: "40" },
      { label: "Actualización", value: "2 años" },
      { label: "Precio", value: "$125 USD" },
    ],
  },

  // --- Entradas nuevas y actualizadas ---
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
    prefix: "97986", // Actualizado de X-PRO5
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
    prefix: "96859", // Actualizado de MUCAR BT200
    software: "ED V2.0",
    details: genericDetailsTemplate,
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
    details: genericDetailsTemplate,
  },
  {
    prefix: "98843",
    software: "TD 2",
    details: genericDetailsTemplate,
  },
];