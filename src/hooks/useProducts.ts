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
  "dbscar", "dbscar-ds201", "dbscar-ds301",
  "easydiag", "easydiag-20", "easydiag-30",
  "icarscan", "idiag",
  "golo-easydiag", "golo-30", "golo-carcare",
  "diagun-iv",
  "x431-pad-vii", "x431-pro", "x431-pro-3", "x431-pro-5", "x431-pro-gt",
  "x431-immo-pro", "x431-immo-pro-v2",
  "x431-pro-lite", "x431-pro-lite-20", "x431-pro-lite-30", "x431-pro-v5-prog3",
  "x431-hd-box", "x431-hd-box-v2", "x431-hd-box-ii", "x431-hd-box-iii",
  "crp-329", "crp-339", "crp-919"
];

const slugToImage: Record<string, string> = {
  "dbscar": "/images/products/DBScar.png",
  "dbscar-ds201": "/images/products/DBScar%202%20%28DS%20201%29.png",
  "dbscar-ds301": "/images/products/DBScar%203%20%28DS%20301%29.png",
  "easydiag": "/images/products/Easydiag.png",
  "easydiag-20": "/images/products/Easydiag%202.0.png",
  "easydiag-30": "/images/products/Easydiag%203.0.png",
  "icarscan": "/images/products/iCarScan.png",
  "idiag": "/images/products/iDiag.png",
  "golo-easydiag": "/images/products/Golo%20Easydiag.png",
  "golo-30": "/images/products/Golo%203.0.png",
  "golo-carcare": "/images/products/Golo%20CarCare%201.png",
  "diagun-iv": "/images/products/DIAGUN%204%20%28IV%29.png",
  "x431-pad-vii": "/images/products/X431%20PAD%20VII.png",
  "x431-pro": "/images/products/X431%20PRO.png",
  "x431-pro-3": "/images/products/X431%20PRO%203.png",
  "x431-pro-5": "/images/products/X431%20PRO%205.png",
  "x431-pro-gt": "/images/products/X431%20PRO%20GT.png",
  "x431-immo-pro": "/images/products/X431%20IMMO%20PRO.png",
  "x431-immo-pro-v2": "/images/products/X431%20IMMO%20PRO%20%28v2%29.png",
  "x431-pro-lite": "/images/products/X431%20PRO%20Lite.png",
  "x431-pro-lite-20": "/images/products/X431%20PRO%20Lite%202.0.png",
  "x431-pro-lite-30": "/images/products/X431%20PRO%20Lite%203.0.png",
  "x431-pro-v5-prog3": "/images/products/X431%20PRO%20V5.0%20PROG3.png",
  "x431-hd-box": "/images/products/X431%20HD%20BOX.png",
  "x431-hd-box-v2": "/images/products/X431%20HD%20BOX%20%28v2%29.png",
  "x431-hd-box-ii": "/images/products/X431%20HD%20BOX%20II.png",
  "x431-hd-box-iii": "/images/products/X431%20HD%20BOX%20III.png",
  "crp-329": "/images/products/CRP%20329.png",
  "crp-339": "/images/products/CRP%20339.png",
  "crp-919": "/images/products/CRP%20919.png",
};

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
        image: detailData?.imageUrl || slugToImage[slug],
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
