import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full z-[-1] overflow-hidden">
        <iframe
          src="https://player.vimeo.com/video/1135508272?background=1&autoplay=1&loop=1&muted=1"
          frameBorder="0"
          allow="autoplay; fullscreen"
          className="absolute top-1/2 left-1/2 w-auto min-w-full min-h-full max-w-none -translate-x-1/2 -translate-y-1/2"
          title="Background Video"
        ></iframe>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="container relative z-10 py-32">
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