import { serialDatabase } from "@/data/serialDatabase";
import { slugify } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SoftwareDetailsProps {
  softwareId: string;
}

export const SoftwareDetails = ({ softwareId }: SoftwareDetailsProps) => {
  const product = serialDatabase.find(
    (item) => slugify(item.software) === softwareId,
  );

  if (!product) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Producto no encontrado</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No pudimos encontrar los detalles para el producto solicitado.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full h-[80vh] bg-background rounded-lg overflow-hidden">
       <div className="p-4 border-b">
        <h2 className="text-2xl font-bold">Cobertura de Software</h2>
        <p className="text-lg text-muted-foreground">
          Mostrando detalles para: <span className="font-semibold text-primary">{product.software}</span>
        </p>
      </div>
      <iframe
        src={product.url}
        title={`Detalles de ${product.software}`}
        className="w-full h-full border-0"
      />
    </div>
  );
};