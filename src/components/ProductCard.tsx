import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="mb-2 text-xl">{product.name}</CardTitle>
        <p className="text-muted-foreground mb-4 text-sm">{product.description}</p>
        <Button className="w-full">Ver detalles</Button>
      </CardContent>
    </Card>
  );
};