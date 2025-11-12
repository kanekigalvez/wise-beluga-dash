import { Card, CardContent } from "@/components/ui/card";
import { Car, Truck, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

const StatCard = ({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) => (
  <Card className="border-border bg-card hover:border-primary/50 transition-colors">
    <CardContent className="p-6 text-center">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-3xl font-bold text-primary">{value}</h3>
      <p className="text-sm text-muted-foreground">{label}</p>
    </CardContent>
  </Card>
);

export const CompatibilitySection = () => {
  const { t } = useTranslation();
  return (
    <section id="compatibilidad" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">{t('compatibility.title')}</h2>
          <div className="w-24 h-px bg-primary/50 mx-auto"></div>
        </div>
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-muted-foreground text-lg text-center leading-relaxed">
            En DiagZone.io contamos con una gran gama de escáneres y módulos bluetooth del mercado, tanto para conectores de vehículos de <strong className="text-primary font-medium">12 Voltios</strong>, módulos conversores de autobuses y camiones de <strong className="text-primary font-medium">24 Voltios (HD)</strong> y para conectores de coches <strong className="text-primary font-medium">Eléctricos (EV)</strong>.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <StatCard icon={<Car className="h-6 w-6" />} value="+240" label="Marcas de vehículos de 12V" />
          <StatCard icon={<Truck className="h-6 w-6" />} value="+80" label="Marcas de autobuses, camiones y maquinaria 24V" />
          <StatCard icon={<Zap className="h-6 w-6" />} value="+60" label="Marcas de coches Eléctricos (EV)" />
        </div>
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Además de soportar más de <strong className="text-primary font-medium">42 funciones especiales</strong> de taller, calibración de sistemas <strong className="text-primary font-medium">ADAS</strong>, Sistemas <strong className="text-primary font-medium">IMMO</strong> y <strong className="text-primary font-medium">TPMS PROG.</strong>
          </p>
        </div>
      </div>
    </section>
  );
};