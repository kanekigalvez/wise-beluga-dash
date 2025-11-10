import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-[700px] flex items-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://i.ibb.co/DPXHHFmK/descarga.jpg)` }}
    >
      <div className="container relative z-10 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            DIAGZONE PRO
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Verifique el modelo y versión, ingrese el número de serie (SN) de 12 dígitos impreso en la toma OBD2 de su conector o escáner.
          </p>
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8 shadow-hover">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                className="flex-1 h-12 text-lg bg-background"
                placeholder="Ingrese el número de serie (12 dígitos)"
                maxLength={12}
              />
              <Button className="h-12 px-8 shadow-soft hover:shadow-hover transition-shadow rounded-md">
                <Search className="mr-2 h-5 w-5" />
                VERIFICAR
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};