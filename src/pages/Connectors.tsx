import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ConnectorsPage = () => {
  const allProducts = [
    { name: "GOLO", description: "Escáner OBD2 bluetooth de alta precisión con cobertura multimarca", image: "https://placehold.co/400x400/007bff/white?text=GOLO" },
    { name: "THINKDIAG", description: "Módulo profesional con funciones avanzadas de diagnóstico", image: "https://placehold.co/400x400/28a745/white?text=THINKDIAG" },
    { name: "EASYDIAG 2.0", description: "Conector de fácil uso con interfaz intuitiva y potente", image: "https://placehold.co/400x400/dc3545/white?text=EASYDIAG" },
    { name: "MUCAR BT200", description: "Herramienta de diagnóstico económica y potente para entusiastas", image: "https://placehold.co/400x400/ffc107/black?text=MUCAR" },
    { name: "KINGBOLEN S500", description: "Escáner de sistema completo con funciones de servicio", image: "https://placehold.co/400x400/17a2b8/white?text=KINGBOLEN" },
    { name: "AUTEL AP200", description: "Adaptador Bluetooth OBD2 compacto con diagnóstico completo", image: "https://placehold.co/400x400/6f42c1/white?text=AUTEL" },
    { name: "LAUNCH X431", description: "Herramienta de diagnóstico de nivel profesional con amplia cobertura", image: "https://placehold.co/400x400/fd7e14/black?text=LAUNCH" },
    { name: "TOPDON ArtiDiag", description: "Escáner OBD2 con funciones de diagnóstico para todos los sistemas", image: "https://placehold.co/400x400/20c997/white?text=TOPDON" },
    { name: "iCarsoft CR Pro", description: "Escáner multimarca para diagnóstico de sistemas completos", image: "https://placehold.co/400x400/6610f2/white?text=iCarsoft" },
    { name: "FOXWELL NT510", description: "Escáner de servicio y diagnóstico para marcas específicas", image: "https://placehold.co/400x400/e83e8c/white?text=FOXWELL" },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-12 md:py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Todos los Conectores</h1>
            <p className="text-lg text-muted-foreground">Explore nuestra gama completa de escáneres compatibles.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {allProducts.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>
          <div className="text-center mt-16">
            <Button asChild variant="outline">
              <Link to="/" className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Inicio
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConnectorsPage;