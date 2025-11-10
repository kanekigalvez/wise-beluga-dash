import { useLocation, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const VerificationResultPage = () => {
  const location = useLocation();
  const { result, serialNumber } = location.state || { result: null, serialNumber: null };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 md:py-20 bg-muted/20">
        <div className="container max-w-4xl mx-auto">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-2xl">Resultado de la Verificación</CardTitle>
              {serialNumber && (
                <CardDescription>
                  Resultados para el número de serie: <strong>{serialNumber}</strong>
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="prose max-w-none text-muted-foreground">
                  <p>{result}</p>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No se encontraron resultados. Por favor, regrese e intente con otro número de serie.
                </p>
              )}
            </CardContent>
          </Card>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/" className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VerificationResultPage;