import { Card, CardContent } from "@/components/ui/card";
import { Settings, Shield, Smartphone, Gauge } from "lucide-react";

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <Card className="border-border bg-card hover:border-primary/50 transition-colors">
    <CardContent className="p-6 text-center">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export const FeaturesSection = () => {
  const features = [
    { icon: <Settings className="h-6 w-6" />, title: "42+ Funciones Especiales", description: "Calibración ADAS, IMMO, TPMS PROG y más." },
    { icon: <Shield className="h-6 w-6" />, title: "Diagnóstico Profesional", description: "Lectura y borrado de códigos en todos los sistemas." },
    { icon: <Smartphone className="h-6 w-6" />, title: "Conectividad Bluetooth", description: "Conexión inalámbrica con tu dispositivo móvil." },
    { icon: <Gauge className="h-6 w-6" />, title: "Datos en Tiempo Real", description: "Monitoreo de parámetros del motor en vivo." },
  ];

  return (
    <section className="py-20 bg-muted/20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Funcionalidades Profesionales</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Herramientas avanzadas para diagnóstico y reparación automotriz.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(f => <FeatureCard key={f.title} {...f} />)}
        </div>
      </div>
    </section>
  );
};