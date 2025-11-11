export interface SerialInfo {
  prefix: string;
  software: string;
  details: { label: string; value: string }[];
}

export const serialDatabase: SerialInfo[] = [
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
    prefix: "97986",
    software: "X-PRO5",
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
    prefix: "96859",
    software: "MUCAR BT200",
    details: [
      { label: "Marcas", value: "150+" },
      { label: "Funciones Especiales", value: "15" },
      { label: "Actualización", value: "1 año" },
      { label: "Precio", value: "$80 USD" },
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
];