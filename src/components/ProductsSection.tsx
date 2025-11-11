import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Link } from "react-router-dom";

export const ProductsSection = () => {
  const products = [
    { name: "GOLO", description: "Escáner OBD2 bluetooth de alta precisión con cobertura multimarca", image: "https://placehold.co/400x400/007bff/white?text=GOLO" },
    { name: "THINKDIAG", description: "Módulo profesional con funciones avanzadas de diagnóstico", image: "https://placehold.co/400x400/28a745/white?text=THINKDIAG" },
    { name: "EASYDIAG 2.0", description: "Conector de fácil uso con interfaz intuitiva y potente", image: "https://placehold.co/400x400/dc3545/white?text=EASYDIAG" },
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
          <Button asChild variant="outline" className="h-11 rounded-md px-8 group">
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