import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";
import type { SerialInfo } from "../data/serialDatabase.ts";

interface VerificationResultProps {
  result: SerialInfo | "not_found" | null;
}

export const VerificationResult = ({ result }: VerificationResultProps) => {
  if (!result) {
    return null;
  }

  if (result === "not_found") {
    return (
      <Alert variant="destructive" className="mt-6 text-left">
        <XCircle className="h-4 w-4" />
        <AlertTitle>No Compatible</AlertTitle>
        <AlertDescription>
          El número de serie ingresado no se encuentra en nuestra base de datos. Por favor, verifique el número e intente de nuevo.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="mt-6">
      <Alert className="mb-4 border-green-500 text-green-700 text-left">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <AlertTitle className="text-green-700">¡Compatible!</AlertTitle>
        <AlertDescription className="text-green-600">
          Hemos encontrado el siguiente software compatible para tu dispositivo:
        </AlertDescription>
      </Alert>
      <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-semibold">{result.software}</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 text-left">
              {result.details.map((detail) => (
                <li key={detail.label} className="flex justify-between">
                  <span className="text-muted-foreground">{detail.label}:</span>
                  <span className="font-medium">{detail.value}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};