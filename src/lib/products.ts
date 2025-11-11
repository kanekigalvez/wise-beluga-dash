export interface Product {
  name: string;
  prefix: string;
  description: string;
  image: string;
  htmlFile: string;
}

export const products: Product[] = [
  { name: "Golo ED+", prefix: "96919", description: "Escáner OBD2 bluetooth de alta precisión", image: "https://placehold.co/400x400/007bff/white?text=Golo+ED%2B", htmlFile: "Golo-ED-Plus.html" },
  { name: "iDiag for Android", prefix: "96859", description: "Módulo de diagnóstico para dispositivos Android", image: "https://placehold.co/400x400/28a745/white?text=iDiag", htmlFile: "iDiag-for-Android.html" },
  { name: "TD1", prefix: "96909", description: "Conector de diagnóstico avanzado", image: "https://placehold.co/400x400/dc3545/white?text=TD1", htmlFile: "TD1.html" },
  { name: "ED 3.0", prefix: "97989", description: "Interfaz de diagnóstico de tercera generación", image: "https://placehold.co/400x400/ffc107/black?text=ED+3.0", htmlFile: "ED-3.0.html" },
  { name: "BT200", prefix: "98952", description: "Herramienta de diagnóstico Bluetooth compacta", image: "https://placehold.co/400x400/17a2b8/white?text=BT200", htmlFile: "BT200.html" },
  { name: "ED V2.0", prefix: "96679", description: "Interfaz de diagnóstico de segunda generación", image: "https://placehold.co/400x400/6f42c1/white?text=ED+V2.0", htmlFile: "ED-V2.0.html" },
  { name: "V", prefix: "96819", description: "Conector de diagnóstico estándar", image: "https://placehold.co/400x400/fd7e14/black?text=V", htmlFile: "V.html" },
  { name: "V Plus", prefix: "97809", description: "Conector de diagnóstico con funciones mejoradas", image: "https://placehold.co/400x400/20c997/white?text=V%2B", htmlFile: "V-Plus.html" },
  { name: "TOPDON", prefix: "98549", description: "Escáner de diagnóstico multimarca", image: "https://placehold.co/400x400/6610f2/white?text=TOPDON", htmlFile: "TOPDON.html" },
  { name: "MaxGo", prefix: "98519", description: "Herramienta de diagnóstico portátil", image: "https://placehold.co/400x400/e83e8c/white?text=MaxGo", htmlFile: "MaxGo.html" },
  { name: "HD IV", prefix: "98829", description: "Interfaz de diagnóstico para vehículos pesados", image: "https://placehold.co/400x400/6c757d/white?text=HD+IV", htmlFile: "HD-IV.html" },
  { name: "HD III", prefix: "98629", description: "Interfaz de diagnóstico de tercera gen para camiones", image: "https://placehold.co/400x400/343a40/white?text=HD+III", htmlFile: "HD-III.html" },
  { name: "M-Diag", prefix: "98639", description: "Herramienta de diagnóstico móvil", image: "https://placehold.co/400x400/007bff/white?text=M-Diag", htmlFile: "M-Diag.html" },
  { name: "PRO4 D3", prefix: "98989", description: "Escáner de nivel profesional", image: "https://placehold.co/400x400/28a745/white?text=PRO4+D3", htmlFile: "PRO4-D3.html" },
  { name: "PAD2 D3", prefix: "98999", description: "Tableta de diagnóstico avanzada", image: "https://placehold.co/400x400/dc3545/white?text=PAD2+D3", htmlFile: "PAD2-D3.html" },
];

export const findProductByPrefix = (prefix: string): Product | undefined => {
  return products.find(p => p.prefix === prefix);
};