import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { showError } from "@/utils/toast";

export const HeroSection = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVerificationClick = () => {
    if (serialNumber.length !== 12) {
      showError("Por favor, ingrese un número de serie válido de 12 dígitos.");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
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
              Para verificar la compatibilidad, ingrese el número de serie de 12 dígitos del dispositivo a continuación.
            </p>
            <Card className="shadow-soft bg-background/90 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    className="flex-1 h-12 text-lg bg-white"
                    placeholder="Ingrese el número de serie (12 dígitos)"
                    maxLength={12}
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
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
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Verificación en el Sitio Oficial</DialogTitle>
            <DialogDescription>
              Para garantizar la información más precisa, la verificación se realiza directamente en el sitio web oficial de DiagZone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-2">
              1. Copia tu número de serie:
            </p>
            <div className="flex items-center space-x-2">
              <Input
                id="serial-to-copy"
                value={serialNumber}
                readOnly
                className="font-mono"
              />
              <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(serialNumber)}>
                Copiar
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              2. Haz clic en el botón de abajo para ir a la página de verificación y pega tu número de serie allí.
            </p>
          </div>
          <DialogFooter>
            <Button asChild className="w-full">
              <a href="https://www.diagzone.com/" target="_blank" rel="noopener noreferrer">
                Ir a diagzone.com
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};