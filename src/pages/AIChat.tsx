import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";

const AIChatPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow flex flex-col items-center p-4 md:p-8">
        <AIChatWidget />
        
        {/* SEO Content Block */}
        <div className="w-full max-w-4xl mx-auto mt-10 p-6 bg-card border border-border rounded-xl shadow-2xl text-foreground">
          <h2 className="text-2xl font-bold mb-4 text-primary">Asesor IA Gratuito y Especializado en Diagzone</h2>
          <p className="mb-4 text-muted-foreground">
            Cualquier técnico que use Diagzone quedará encantado de probar nuestro asesor IA. Es una herramienta gratuita, disponible 24/7, entrenada para interpretar códigos DTC, OEM, errores de conectores y compatibilidad con dispositivos Launch (Diagzone PRO V2, TD1, ED 3.0, etc.).
          </p>

          <h3 className="text-xl font-semibold mb-3 text-secondary">¿Qué puede hacer por ti?</h3>
          <ul className="list-disc list-inside space-y-1 mb-4 ml-4 text-muted-foreground">
            <li>Explicar cualquier código DTC u OEM al instante.</li>
            <li>Comprobar compatibilidad de tu escáner.</li>
            <li>Guiarte en errores de firmware y actualizaciones.</li>
            <li>Recomendar el software correcto para tu conector.</li>
            <li>Ayudarte a evitar riesgos de bloqueo y errores comunes.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 text-secondary">También Vendemos Licencias Diagzone</h3>
          <p className="text-muted-foreground">
            Además de este potente asesor gratuito, somos tu proveedor de confianza para comprar o renovar licencias Diagzone. Obtén el software que necesitas con el mejor soporte del mercado.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIChatPage;