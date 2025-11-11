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
];