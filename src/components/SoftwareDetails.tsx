import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompatibilityAccordion } from "./CompatibilityAccordion";
import { Skeleton } from "@/components/ui/skeleton";

interface SoftwareDetailsProps {
  softwareId: string;
}

interface ProductData {
  name: string;
  data: string;
}

export const SoftwareDetails = ({ softwareId }: SoftwareDetailsProps) => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("product_compatibility")
        .select("name, data")
        .eq("slug", softwareId)
        .single();

      if (error || !data) {
        console.error("Error fetching product data:", error);
        setError("Producto no encontrado.");
        setProduct(null);
      } else {
        setProduct(data);
      }
      setLoading(false);
    };

    if (softwareId) {
      fetchProductData();
    }
  }, [softwareId]);

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-6 w-1/3" />
        <div className="space-y-2 pt-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Producto no encontrado</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {error || "No pudimos encontrar los detalles para el producto solicitado."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full h-[80vh] bg-background rounded-lg overflow-hidden flex flex-col">
       <div className="p-4 border-b flex-shrink-0">
        <h2 className="text-2xl font-bold">Cobertura de Software</h2>
        <p className="text-lg text-muted-foreground">
          Mostrando detalles para: <span className="font-semibold text-primary">{product.name}</span>
        </p>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        <CompatibilityAccordion rawData={product.data} />
      </div>
    </div>
  );
};