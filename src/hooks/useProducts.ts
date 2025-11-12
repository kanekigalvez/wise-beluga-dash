import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { slugify } from "@/lib/utils";

interface Product {
  name: string;
  description: string;
  image: string;
}

const defaultProducts: Omit<Product, 'image'>[] = [
    { name: "Golo ED+", description: "Escáner OBD2 bluetooth de alta precisión" },
    { name: "iDiag for Android", description: "Módulo de diagnóstico para dispositivos Android" },
    { name: "TD1", description: "Conector de diagnóstico avanzado" },
    { name: "ED 3.0", description: "Interfaz de diagnóstico de tercera generación" },
    { name: "BT200", description: "Herramienta de diagnóstico Bluetooth compacta" },
    { name: "ED V2.0", description: "Interfaz de diagnóstico de segunda generación" },
    { name: "V", description: "Conector de diagnóstico estándar" },
    { name: "V Plus", description: "Conector de diagnóstico con funciones mejoradas" },
    { name: "TOPDON", description: "Escáner de diagnóstico multimarca" },
    { name: "MaxGo", description: "Herramienta de diagnóstico portátil" },
    { name: "HD IV", description: "Interfaz de diagnóstico para vehículos pesados" },
    { name: "HD III", description: "Interfaz de diagnóstico de tercera gen para camiones" },
    { name: "M-Diag", description: "Herramienta de diagnóstico móvil" },
    { name: "PRO4 D3", description: "Escáner de nivel profesional" },
    { name: "PAD2 D3", description: "Tableta de diagnóstico avanzada" },
];

const generateDefaultImage = (name: string) => `https://placehold.co/400x225/1a1a1a/d4af37?text=${encodeURIComponent(name)}`;

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data: details, error } = await supabase
        .from("product_details")
        .select("slug, image_url");

      if (error) {
        console.error("Error fetching product details:", error);
      }

      const detailsMap = new Map(details?.map(d => [d.slug, d.image_url]));

      const mergedProducts = defaultProducts.map(p => {
        const slug = slugify(p.name);
        const imageUrl = detailsMap.get(slug);
        return {
          ...p,
          image: imageUrl || generateDefaultImage(p.name),
        };
      });

      setProducts(mergedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return { products, loading };
};