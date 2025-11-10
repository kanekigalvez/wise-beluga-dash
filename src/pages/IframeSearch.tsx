import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const IframeSearchPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 md:py-20 bg-muted/20">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Búsqueda Directa en DiagZone</h1>
            <p className="text-muted-foreground mt-2">
              A continuación se muestra la herramienta de búsqueda oficial de DiagZone.com.
            </p>
          </div>

          <Alert className="mb-8">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Nota Importante</AlertTitle>
            <AlertDescription>
              Si el recuadro de abajo aparece en blanco o muestra un error, significa que DiagZone.com está bloqueando activamente su contenido para que no se muestre en otros sitios web por razones de seguridad.
            </AlertDescription>
          </Alert>

          <div className="aspect-w-16 aspect-h-9 border rounded-lg overflow-hidden shadow-soft">
            <iframe
              src="https://www.diagzone.com/en/search/"
              className="w-full h-[70vh]"
              title="Búsqueda de DiagZone"
            ></iframe>
          </div>

          <div className="text-center mt-8">
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

export default IframeSearchPage;