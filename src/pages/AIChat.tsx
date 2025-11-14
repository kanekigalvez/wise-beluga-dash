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
          <h2 className="text-2xl font-bold mb-4 text-primary">Asistente IA Gemini especializado en Diagzone</h2>
          <p className="mb-4 text-muted-foreground">
            Nuestro chatbot es el único asistente de inteligencia artificial entrenado para interpretar 
            códigos DTC, OEM, errores de conectores, compatibilidad con dispositivos Launch, 
            Diagzone PRO V2, TD1, ED 3.0, M-Diag, MaxGo, TOPDON, ED V2.0, HD III, HD IV y más.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-secondary">¿Qué puede hacer?</h3>
          <ul className="list-disc list-inside space-y-1 mb-4 ml-4 text-muted-foreground">
            <li>Explicar cualquier código DTC u OEM</li>
            <li>Comprobar compatibilidad mediante número de serie de 12 dígitos</li>
            <li>Indicar errores de firmware y actualizaciones</li>
            <li>Recomendar software apropiado para cada conector</li>
            <li>Detectar riesgos de bloqueo y errores comunes</li>
          </ul>

          <p className="text-muted-foreground">
            Diagzone.IO es el primer agente IA especializado en diagnóstico automotriz con IA Gemini 
            en toda la red, ofreciendo análisis preciso, respuestas instantáneas y soporte técnico avanzado.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIChatPage;