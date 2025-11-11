import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ConnectorsPage = () => {
  const allProducts = [
    { name: "Golo ED+", description: "Escáner OBD2 bluetooth de alta precisión", image: "https://placehold.co/400x400/007bff/white?text=Golo+ED%2B" },
    { name: "iDiag for Android", description: "Módulo de diagnóstico para dispositivos Android", image: "https://placehold.co/400x400/28a745/white?text=iDiag" },
    { name: "TD1", description: "Conector de diagnóstico avanzado", image: "https://placehold.co/400x400/dc3545/white?text=TD1" },
    { name: "ED 3.0", description: "Interfaz de diagnóstico de tercera generación", image: "https://placehold.co/400x400/ffc107/black?text=ED+3.0" },
    { name: "BT200", description: "Herramienta de diagnóstico Bluetooth compacta", image: "https://placehold.co/400x400/17a2b8/white?text=BT200" },
    { name: "ED V2.0", description: "Interfaz de diagnóstico de segunda generación", image: "https://placehold.co/400x400/6f42c1/white?text=ED+V2.0" },
    { name: "V", description: "Conector de diagnóstico estándar", image: "https://placehold.co/400x400/fd7e14/black?text=V" },
    { name: "V+", description: "Conector de diagnóstico con funciones mejoradas", image: "https://placehold.co/400x400/20c997/white?text=V%2B" },
    { name: "TOPDON", description: "Escáner de diagnóstico multimarca", image: "https://placehold.co/400x400/6610f2/white?text=TOPDON" },
    { name: "MaxGo", description: "Herramienta de diagnóstico portátil", image: "https://placehold.co/400x400/e83e8c/white?text=MaxGo" },
    { name: "HD IV", description: "Interfaz de diagnóstico para vehículos pesados", image: "https://placehold.co/400x400/6c757d/white?text=HD+IV" },
    { name: "HD III", description: "Interfaz de diagnóstico de tercera gen para camiones", image: "https://placehold.co/400x400/343a40/white?text=HD+III" },
    { name: "M-Diag", description: "Herramienta de diagnóstico móvil", image: "https://placehold.co/400x400/007bff/white?text=M-Diag" },
    { name: "PRO4 D3", description: "Escáner de nivel profesional", image: "https://placehold.co/400x400/28a745/white?text=PRO4+D3" },
    { name: "PAD2 D3", description: "Tableta de diagnóstico avanzada", image: "https://placehold.co/400x400/dc3545/white?text=PAD2+D3" },
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