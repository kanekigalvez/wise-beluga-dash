import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export const HeroSection = () => {
  const [serialNumber, setSerialNumber] = useState("");

  const handleSearch = () => {
    // Por ahora, esto es un marcador de posición.
    alert(`La funcionalidad de búsqueda para "${serialNumber}" se implementará próximamente.`);
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