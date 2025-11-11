import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('https://i.ibb.co/DPXHHFmK/descarga.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container relative z-10 py-20 md:py-36">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-white">
            Diagzone - Tienda Online
          </h1>
          <p className="text-lg text-white/80 mb-8">
            Tu plataforma profesional para el diagnóstico automotriz. Busca códigos de error y explora nuestras herramientas.
          </p>
          <div className="max-w-xl mx-auto">
            <div className="flex gap-4 bg-white p-2 rounded-lg shadow-lg">
              <Input
                className="flex-1 h-12 text-lg border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Ingrese su número de serie (ej: 978981...)"
              />
              <Button className="px-8 h-12 shadow-soft hover:shadow-hover transition-shadow">
                <Search className="mr-2 h-5 w-5" />
                Verificar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};