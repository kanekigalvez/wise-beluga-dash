import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('https://i.ibb.co/DPXHHFmK/descarga.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
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