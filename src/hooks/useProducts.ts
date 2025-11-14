import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

interface Product {
  slug: string;
  name: string;
  description: string;
  db_description?: string | null;
  image: string;
}

const productSlugs = [
  "golo-ed", "idiag-for-android", "td1", "ed-30", "bt200", "ed-v20", "v",
  "v-plus", "topdon", "maxgo", "hd-iv", "hd-iii", "m-diag", "pro4-d3", "pad2-d3"
];

const generateDefaultImage = (name: string) => `https://placehold.co/400x225/1a1a1a/d4af37?text=${encodeURIComponent(name)}`;

export const useProducts = () => {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const { data: details, error } = await supabase
      .from("product_details")
      .select("slug, image_url, description");

    if (error) {
      console.error("Error fetching product details:", error);
    }

    const detailsMap = new Map(details?.map(d => [d.slug, { imageUrl: d.image_url, description: d.description }]));

    const translatedProducts = productSlugs.map(slug => {
      const name = t(`products.${slug}.name`);
      const detailData = detailsMap.get(slug);
      return {
        slug: slug,
        name: name,
        description: t(`products.${slug}.description`),
        image: detailData?.imageUrl || generateDefaultImage(name),
        db_description: detailData?.description,
      };
    });

    setProducts(translatedProducts);
    setLoading(false);
  }, [t, i18n.language]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, refetchProducts: fetchProducts };
};