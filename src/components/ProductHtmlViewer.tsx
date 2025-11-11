import { Loader2 } from "lucide-react";
import { useState } from "react";

interface ProductHtmlViewerProps {
  productName: string;
  htmlFile: string;
}

export const ProductHtmlViewer = ({ productName, htmlFile }: ProductHtmlViewerProps) => {
  const [loading, setLoading] = useState(true);
  const src = `/product-details/${htmlFile}`;

  return (
    <div className="w-full h-[80vh] bg-background rounded-lg overflow-hidden flex flex-col pt-4 gap-4">
      <div className="px-4">
        <h2 className="text-2xl font-bold">Detalles de Compatibilidad</h2>
        <p className="text-lg text-muted-foreground">
          Mostrando software para: <span className="font-semibold text-primary">{productName}</span>
        </p>
      </div>
      <div className="relative flex-grow border rounded-md overflow-hidden">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="ml-4">Cargando detalles...</p>
          </div>
        )}
        <iframe
          src={src}
          title={`Detalles de ${productName}`}
          className={`w-full h-full transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </div>
    </div>
  );
};