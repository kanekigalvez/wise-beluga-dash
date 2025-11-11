import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import type { SerialInfo } from "../data/serialDatabase.ts";
import { slugify } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SoftwareDetails } from "./SoftwareDetails";

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

  const softwareId = slugify(result.software);

  return (
    <Dialog>
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
          <DialogTrigger asChild>
            <Button className="w-full group">
              Ver Cobertura Completa
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </DialogTrigger>
        </div>
      </div>
      <DialogContent className="max-w-4xl w-full">
        <SoftwareDetails softwareId={softwareId} />
      </DialogContent>
    </Dialog>
  );
};