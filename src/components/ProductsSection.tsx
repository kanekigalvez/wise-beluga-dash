import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Info, ArrowRight } from "lucide-react";

const ProductCard = ({ image, name, description }: { image: string, name: string, description: string }) => (
  <Card className="group overflow-hidden border-border/50 hover:shadow-hover transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
    <CardContent className="p-0">
      <div className="aspect-square overflow-hidden bg-background">
        <img src={image} alt={name} className="w-full h-full object-contain p-8 transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold mb-2">- {name}</h3>
        <p className="text-muted-foreground text-sm mb-4 min-h-[3rem]">{description}</p>
        <Button className="w-full shadow-soft hover:shadow-hover transition-shadow">
          <Info className="mr-2 h-4 w-4" />
          Ver compatibilidad
        </Button>
      </div>
    </CardContent>
  </Card>
);

export const ProductsSection = () => {
  const products = [
    { name: "GOLO", description: "Escáner OBD2 bluetooth de alta precisión con cobertura multimarca", image: "/placeholder.svg" },
    { name: "THINKDIAG", description: "Módulo profesional con funciones avanzadas de diagnóstico", image: "/placeholder.svg" },
    { name: "EASYDIAG 2.0", description: "Conector de fácil uso con interfaz intuitiva y potente", image: "/placeholder.svg" },
  ];

  return (
    <section id="productos" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Conectores Y Escáner Compatibles</h2>
          <div className="w-24 h-1 bg-gradient-secondary mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map(p => <ProductCard key={p.name} {...p} />)}
        </div>
        <div className="text-center">
          <Button variant="outline" className="h-11 rounded-md px-8 group">
            Ver todos los conectores
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};