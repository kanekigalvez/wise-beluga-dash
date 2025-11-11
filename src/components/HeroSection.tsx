import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search, CheckCircle, XCircle } from "lucide-react";
import { showError } from "@/utils/toast";
import { findProductByPrefix, Product } from "@/lib/products";
import { ProductHtmlViewer } from "./ProductHtmlViewer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const HeroSection = () => {
  const [serial, setSerial] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Product | null | undefined>(undefined);

  const handleVerify = async () => {
    if (serial.length < 5) {
      showError("El número de serie debe tener al menos 5 dígitos.");
      return;
    }
    setLoading(true);
    setResult(undefined);
    const prefix = serial.substring(0, 5);

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));

    const product = findProductByPrefix(prefix);
    setResult(product || null);
    setLoading(false);
  };

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('https://i.ibb.co/DPXHHFmK/descarga.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container relative z-10 py-20 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-white">
            Diagzone - Tienda Online
          </h1>
          <p className="text-lg text-white/80 mb-8">
            Verifica tu número de serie para encontrar el software compatible o explora nuestros productos.
          </p>
          <div className="max-w-xl mx-auto bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
            <div className="flex gap-4">
              <Input
                className="flex-1 h-12 text-lg"
                placeholder="Ingresa tu número de serie (ej: 96919...)"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              />
              <Button
                className="px-8 h-12 shadow-soft hover:shadow-hover transition-shadow"
                onClick={handleVerify}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Search className="mr-2 h-5 w-5" />
                )}
                Verificar
              </Button>
            </div>
          </div>
        </div>
        {result !== undefined && (
          <div className="max-w-5xl mx-auto mt-8 bg-background p-6 rounded-lg shadow-lg">
            {result ? (
              <>
                <Alert variant="default" className="bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200 mb-6">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertTitle className="font-semibold">¡Verificación Exitosa!</AlertTitle>
                  <AlertDescription>
                    Software encontrado para: <span className="font-bold">{result.name}</span>
                  </AlertDescription>
                </Alert>
                <ProductHtmlViewer productName={result.name} htmlFile={result.htmlFile} />
              </>
            ) : (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Verificación Fallida</AlertTitle>
                <AlertDescription>
                  El número de serie no es válido o no se encontró en nuestra base de datos. Por favor, inténtalo de nuevo.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>
    </section>
  );
};