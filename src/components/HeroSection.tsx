import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { showSuccess, showError } from "@/utils/toast";

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

export const HeroSection = () => {
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
      showSuccess(`¡Compatible! Su número de serie corresponde al modelo: ${productName}.`);
    } else {
      showError("El número de serie no es compatible o no se encuentra.");
    }
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
          <p className="text-lg text-white/80 mb-8">
            Vendemos software para equipos de diagnóstico. Explore nuestros conectores y verifique la compatibilidad.
          </p>
          
          <div className="max-w-xl mx-auto mb-8">
            <div className="flex gap-2 p-2 bg-white/20 backdrop-blur-sm rounded-lg">
              <Input
                type="text"
                placeholder="Ingrese su número de serie para verificar"
                className="flex-1 h-12 text-lg bg-white/80 text-gray-800 placeholder:text-gray-500 border-0 focus-visible:ring-2 focus-visible:ring-primary"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
              />
              <Button 
                className="px-8 h-12 shadow-soft hover:shadow-hover transition-shadow"
                onClick={handleSearch}
              >
                <Search className="mr-2 h-5 w-5" />
                Verificar
              </Button>
            </div>
          </div>

          <Button asChild className="h-12 px-8 shadow-soft hover:shadow-hover transition-shadow rounded-md">
            <a href="/#productos">Ver Productos</a>
          </Button>
        </div>
      </div>
    </section>
  );
};