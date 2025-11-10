import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        <iframe
          src="https://player.vimeo.com/video/1135513085?background=1&autoplay=1&loop=1&muted=1"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          style={{ position: 'absolute', top: '50%', left: '50%', width: '100vw', height: '56.25vw', minHeight: '100%', minWidth: '177.77vh', transform: 'translate(-50%, -50%)' }}
          title="Background Video"
        ></iframe>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            DIAGZONE PRO
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Verifique el modelo y versión, ingrese el número de serie (SN) de 12 dígitos impreso en la toma OBD2 de su conector o escáner.
          </p>
          <Card className="shadow-soft bg-background/90 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  className="flex-1 h-12 text-lg bg-white"
                  placeholder="Ingrese el número de serie (12 dígitos)"
                  maxLength={12}
                />
                <Button className="h-12 px-8 shadow-soft hover:shadow-hover transition-shadow rounded-md">
                  <Search className="mr-2 h-5 w-5" />
                  VERIFICAR
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};