import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

export const ProductsSection = () => {
  const { products, loading } = useProducts();
  const featuredProducts = products.slice(0, 3);
  const { t } = useTranslation();

  return (
    <section id="productos" className="py-20 bg-muted/20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">{t('products_section.title')}</h2>
          <div className="w-24 h-px bg-primary/50 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : (
            featuredProducts.map(p => <ProductCard key={p.name} {...p} />)
          )}
        </div>
        <div className="text-center">
          <Button asChild variant="outline" className="h-11 rounded-md px-8 group border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:shadow-glow-primary">
            <Link to="/connectors">
              {t('products_section.view_all_button')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};