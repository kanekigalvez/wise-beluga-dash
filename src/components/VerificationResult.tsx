import { CompatibilityAccordion } from "./CompatibilityAccordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";

interface VerificationResultProps {
  result: {
    product_name: string;
    data: string;
  } | null;
}

export const VerificationResult = ({ result }: VerificationResultProps) => {
  if (!result) {
    return (
      <Alert variant="destructive" className="mt-6">
        <XCircle className="h-4 w-4" />
        <AlertTitle>Verificación Fallida</AlertTitle>
        <AlertDescription>
          El número de serie no es válido o no se encontró en nuestra base de datos. Por favor, inténtalo de nuevo.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="mt-8">
      <Alert variant="default" className="bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200 mb-6">
        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertTitle className="font-semibold">¡Verificación Exitosa!</AlertTitle>
        <AlertDescription>
          Software encontrado para: <span className="font-bold">{result.product_name}</span>
        </AlertDescription>
      </Alert>
      <CompatibilityAccordion data={result.data} />
    </div>
  );
};