import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { CompatibilityAccordion } from "./CompatibilityAccordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

interface SoftwareDetailsProps {
  prefix: string;
  productName: string;
}

export const SoftwareDetails = ({ prefix, productName }: SoftwareDetailsProps) => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      const { data: result, error: dbError } = await supabase
        .from("product_compatibility")
        .select("data")
        .eq("prefix", prefix)
        .single();

      if (dbError) {
        console.error("Error fetching details:", dbError);
        setError("No se pudieron cargar los detalles para este producto.");
      } else if (result) {
        setData(result.data);
      } else {
        setError("No se encontraron detalles para este producto.");
      }
      setLoading(false);
    };

    fetchDetails();
  }, [prefix]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="ml-4">Cargando detalles...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[80vh] bg-background rounded-lg overflow-hidden flex flex-col p-4 gap-4">
      <div>
        <h2 className="text-2xl font-bold">Detalles de Compatibilidad</h2>
        <p className="text-lg text-muted-foreground">
          Mostrando software para: <span className="font-semibold text-primary">{productName}</span>
        </p>
      </div>
      <div className="flex-grow overflow-y-auto pr-2">
        {error && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {data && <CompatibilityAccordion data={data} />}
      </div>
    </div>
  );
};