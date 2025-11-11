export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  serial_numbers: string[];
}

export const products: Product[] = [
  {
    id: "golo-pro",
    name: "Golo PRO",
    description: "Conector de diagnóstico avanzado para talleres profesionales.",
    imageUrl: "/placeholder.svg",
    serial_numbers: ["978981XXXXXX", "978982XXXXXX"],
  },
  {
    id: "easydiag",
    name: "Easydiag 3.0",
    description: "Herramienta de diagnóstico personal, potente y versátil.",
    imageUrl: "/placeholder.svg",
    serial_numbers: ["968590XXXXXX"],
  },
  {
    id: "thinkdiag",
    name: "Thinkdiag",
    description: "Escáner OBD2 con conectividad Bluetooth para todos los sistemas.",
    imageUrl: "/placeholder.svg",
    serial_numbers: ["979860XXXXXX"],
  },
];