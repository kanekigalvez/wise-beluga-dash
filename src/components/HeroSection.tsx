import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { showError } from "@/utils/toast";

const compatibleSerials: Record<string, string> = {
  "96919": "Golo ED+",
  "96579": "iDiag for Android",
  "97986": "TD1",
  "96859": "ED V2.0",
  "98914": "BT200",
  "98374": "V+",
  "97329": "TOPDON",
  "98619": "MaxGo",
  "98689": "HD IV",
  "98649": "HD III",
  "97619": "M-Diag",
  "98609": "PRO4 D3",
  "98579": "PAD2 D3",
};

interface HeroSectionProps {
  setIsModalOpen: (isOpen: boolean) => void;
  setCompatibleProduct: (product: string | null) => void;
}

export const HeroSection = ({ setIsModalOpen, setCompatibleProduct }: HeroSectionProps) => {
  const [serialNumber, setSerialNumber] = useState("");

  const handleSearch = () => {
    const trimmedSerial = serialNumber.trim();

    if (trimmedSerial.length < 5) {
      showError("Por favor, ingrese un número de serie válido.");
      return;
    }

    const prefix = trimmedSerial.substring(0, 5);
    const productName = compatibleSerials[prefix];

    if (productName) {
      setCompatibleProduct(productName);
      setIsModalOpen(true);
    } else {
      showError("El número de serie no es compatible o no se encuentra.");
    }
  };

  return (
    <section
      id="inicio"
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-background/50"></div>
      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-gradient-primary">
            Diagzone - Tienda Online
          </h1>
          <p className="text-lg text-white/80 mb-8">
            Vendemos software para equipos de diagnóstico. Explore nuestros conectores y verifique la compatibilidad.
          </p>
          
          <div className="max-w-xl mx-auto mb-8">
            <div className="flex gap-2 p-1 bg-black/30 backdrop-blur-sm rounded-lg border border-primary/20">
              <Input
                type="text"
                placeholder="Ingrese su número de serie..."
                className="flex-1 h-12 text-lg bg-transparent text-white placeholder:text-gray-500 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
              />
              <Button 
                className="px-6 h-12 bg-primary/90 hover:bg-primary text-primary-foreground transition-all hover:shadow-glow-primary"
                onClick={handleSearch}
              >
                <Search className="mr-2 h-5 w-5" />
                Verificar
              </Button>
            </div>
          </div>

          <Button asChild className="h-12 px-8 bg-secondary/90 hover:bg-secondary text-secondary-foreground transition-all hover:shadow-glow-secondary rounded-md">
            <a href="/#productos">Ver Productos</a>
          </Button>
        </div>
      </div>
    </section>
  );
};