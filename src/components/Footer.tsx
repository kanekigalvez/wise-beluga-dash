import { MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/40 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">
              <span className="text-primary">DIAG</span>
              <span className="text-foreground">ZONE</span>
              <span className="text-xs font-normal text-secondary ml-1">PRO</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Plataforma profesional de diagnóstico automotriz con soporte para más de 240 marcas de vehículos.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-secondary">Contacto</h4>
            <div className="space-y-4">
              <a href="https://wa.me/17168156081" target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button className="bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg transition-shadow">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chatea con nosotros
                </Button>
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Servicio Internacional</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 DiagZone Pro. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Términos de servicio</a>
              <a href="#" className="hover:text-primary transition-colors">Política de privacidad</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};