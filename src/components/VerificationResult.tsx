import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { SerialInfo } from "../data/serialDatabase.ts";
import { slugify } from "@/lib/utils";

interface VerificationResultProps {
  result: SerialInfo | "not_found" | null;
}

export const VerificationResult = ({ result }: VerificationResultProps) => {
  if (!result) {
    return null;
  }

  if (result === "not_found") {
    return (
      <Alert variant="destructive" className="text-left">
        <XCircle className="h-4 w-4" />
        <AlertTitle>No Compatible</AlertTitle>
        <AlertDescription>
          El número de serie ingresado no se encuentra en nuestra base de datos. Por favor, verifique el número e intente de nuevo.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="text-left space-y-4">
      <Alert className="border-green-500 text-green-700">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <AlertTitle className="text-green-700">¡Compatible!</AlertTitle>
        <AlertDescription className="text-green-600">
          Tu dispositivo es compatible con el software: <span className="font-bold">{result.software}</span>.
        </AlertDescription>
      </Alert>
      <div>
        <p className="text-sm text-muted-foreground mb-2">
          Haz clic en el botón para ver la lista completa de marcas y funciones cubiertas.
        </p>
        <Button asChild className="w-full group">
          <Link to={`/software-details/${slugify(result.software)}`}>
            Ver Cobertura Completa
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
};