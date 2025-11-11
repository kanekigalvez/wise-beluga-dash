import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";
import { VerificationResult } from "./VerificationResult";
import { showError } from "@/utils/toast";
import { fetchAndParseCompatibilityData } from "@/lib/compatibility-parser";

type VerificationData = {
  product_name: string;
  data: string;
} | null;

export const HeroSection = () => {
  const [serial, setSerial] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationData | undefined>(undefined);

  const handleVerify = async () => {
    if (serial.length < 5) {
      showError("El número de serie debe tener al menos 5 dígitos.");
      return;
    }
    setLoading(true);
    setResult(undefined);
    const prefix = serial.substring(0, 5);

    const data = await fetchAndParseCompatibilityData(prefix);

    if (!data) {
      console.error("Verification error: Prefix not found");
      setResult(null);
    } else {
      setResult(data);
    }
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
          <div className="max-w-4xl mx-auto mt-8 bg-background p-6 rounded-lg shadow-lg">
            <VerificationResult result={result} />
          </div>
        )}
      </div>
    </section>
  );
};