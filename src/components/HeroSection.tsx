import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="bg-gradient-hero"
    >
      <div className="container py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
            DIAGZONE PRO
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Verifique el modelo y versión, ingrese el número de serie (SN) de 12 dígitos impreso en la toma OBD2 de su conector o escáner.
          </p>
          <Card className="shadow-soft">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  className="flex-1 h-12 text-lg"
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