import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Link } from "react-router-dom";

export const ProductsSection = () => {
  const products = [
    { name: "Golo ED+", description: "Escáner OBD2 bluetooth de alta precisión", image: "https://placehold.co/400x225/1a1a1a/d4af37?text=Golo+ED%2B" },
    { name: "iDiag for Android", description: "Módulo profesional con funciones avanzadas", image: "https://placehold.co/400x225/1a1a1a/d4af37?text=iDiag" },
    { name: "TD1", description: "Conector de fácil uso con interfaz intuitiva", image: "https://placehold.co/400x225/1a1a1a/d4af37?text=TD1" },
  ];

  return (
    <section id="productos" className="py-20 bg-muted/20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Conectores Y Escáner Compatibles</h2>
          <div className="w-24 h-px bg-primary/50 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map(p => <ProductCard key={p.name} {...p} />)}
        </div>
        <div className="text-center">
          <Button asChild variant="outline" className="h-11 rounded-md px-8 group border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:shadow-glow-primary">
            <Link to="/connectors">
              Ver todos los conectores
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};