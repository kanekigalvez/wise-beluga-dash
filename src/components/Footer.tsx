import { Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/40 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
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
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Verificar Conector</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Buscar código DTC</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Conectores compatibles</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Soporte Técnico</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@diagzone.pro" className="hover:text-primary transition-colors">info@diagzone.pro</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 555-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Servicio Internacional</span>
              </li>
            </ul>
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