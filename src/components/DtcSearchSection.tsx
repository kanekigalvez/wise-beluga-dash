import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

export const DtcSearchSection = () => {
  const popularCodes = ["P0300", "P0420", "P0171", "P0340", "P0011", "P1000", "P0087", "P0016", "P0101", "P0301", "P0442", "P0401", "P0299", "P0335", "P3000", "P0705", "P0174", "U3000"];

  return (
    <section id="buscar" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Buscar DTC</h2>
          <p className="text-muted-foreground text-lg">Busca códigos de diagnóstico OBD2 o códigos OEM específicos del fabricante</p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="obd2" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="obd2" className="text-lg">Códigos OBD2</TabsTrigger>
              <TabsTrigger value="oem" className="text-lg">Códigos OEM</TabsTrigger>
            </TabsList>
            <TabsContent value="obd2" className="space-y-6">
              <div className="flex gap-4">
                <Input className="flex-1 h-12 text-lg" placeholder="Código de ingreso DTC (ej: P0300)" />
                <Button className="px-8 h-12 shadow-soft hover:shadow-hover transition-shadow">
                  <Search className="mr-2 h-5 w-5" />
                  Buscar
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Códigos más buscados</h3>
                <div className="flex flex-wrap gap-2">
                  {popularCodes.map(code => (
                    <Badge key={code} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2 text-sm">{code}</Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="oem" className="space-y-6">
              <p className="text-center text-muted-foreground">Búsqueda de códigos OEM próximamente.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};