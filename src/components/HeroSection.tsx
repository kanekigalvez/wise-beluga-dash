import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { showError } from "@/utils/toast";
import { serialDatabase, type SerialInfo } from "../data/serialDatabase.ts";
import { VerificationResult } from "./VerificationResult";

export const HeroSection = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [result, setResult] = useState<SerialInfo | "not_found" | null>(null);

  const handleVerificationClick = () => {
    if (serialNumber.length < 5) {
      showError("Por favor, ingrese al menos 5 dígitos del número de serie.");
      return;
    }
    
    const prefix = serialNumber.substring(0, 5);
    const found = serialDatabase.find(item => item.prefix === prefix);
    
    setResult(found || "not_found");
  };

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('https://i.ibb.co/DPXHHFmK/descarga.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-white">
            Diagzone - Tienda Online
          </h1>
          <p className="text-lg text-white/80 mb-2">
            Vendemos software para equipos de diagnóstico.
          </p>
          <p className="text-lg text-white/80 mb-8">
            Para verificar la compatibilidad, ingrese el número de serie del dispositivo a continuación.
          </p>
          <Card className="shadow-soft bg-background/90 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  className="flex-1 h-12 text-lg bg-white"
                  placeholder="Ingrese el número de serie"
                  value={serialNumber}
                  onChange={(e) => {
                    setSerialNumber(e.target.value);
                    setResult(null); // Reset result when typing
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerificationClick()}
                />
                <Button 
                  className="h-12 px-8 shadow-soft hover:shadow-hover transition-shadow rounded-md"
                  onClick={handleVerificationClick}
                >
                  <Search className="mr-2 h-5 w-5" />
                  VERIFICAR
                </Button>
              </div>
              <VerificationResult result={result} />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};