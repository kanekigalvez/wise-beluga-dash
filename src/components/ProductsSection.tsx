import { products } from "@/lib/products";
import { ProductCard } from "./ProductCard";

export const ProductsSection = () => {
  return (
    <section id="productos" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Conectores</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explora nuestra gama de herramientas de diagnóstico profesionales.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};