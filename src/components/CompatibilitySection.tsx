import { Card, CardContent } from "@/components/ui/card";
import { Car, Truck, Zap } from "lucide-react";

const StatCard = ({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) => (
  <Card className="border-border/50 hover:shadow-hover transition-all hover:border-primary/50">
    <CardContent className="p-6 pt-8 text-center">
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-primary">
        {icon}
      </div>
      <h3 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">{value}</h3>
      <p className="text-sm text-muted-foreground">{label}</p>
    </CardContent>
  </Card>
);

export const CompatibilitySection = () => {
  return (
    <section id="compatibilidad" className="pt-20 pb-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">ALTA COMPATIBILIDAD</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8"></div>
        </div>
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-muted-foreground text-lg text-center leading-relaxed">
            En DiagZone.pro contamos con una gran gama de escáneres y módulos bluetooth del mercado, tanto para conectores de vehículos de <strong className="text-primary">12 Voltios</strong>, módulos conversores de autobuses y camiones de <strong className="text-primary">24 Voltios (HD)</strong> y para conectores de coches <strong className="text-primary">Eléctricos (EV)</strong>.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <StatCard icon={<Car className="h-8 w-8 text-primary-foreground" />} value="+240" label="Marcas de vehículos de 12V" />
          <StatCard icon={<Truck className="h-8 w-8 text-primary-foreground" />} value="+80" label="Marcas de autobuses, camiones y maquinaria 24V" />
          <StatCard icon={<Zap className="h-8 w-8 text-primary-foreground" />} value="+60" label="Marcas de coches Eléctricos (EV)" />
        </div>
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Además de soportar más de <strong className="text-primary">42 funciones especiales</strong> de taller, calibración de sistemas <strong className="text-primary">ADAS</strong>, Sistemas <strong className="text-primary">IMMO</strong> y <strong className="text-primary">TPMS PROG.</strong>
          </p>
        </div>
      </div>
    </section>
  );
};