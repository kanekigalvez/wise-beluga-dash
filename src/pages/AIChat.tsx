import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";

const AIChatPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow flex justify-center items-center p-4 md:p-8">
        {/* Render the widget in a standalone container, ensuring it takes up space */}
        <div className="w-full max-w-4xl mx-auto h-[80vh] flex flex-col bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
          <header className="p-4 border-b border-border flex justify-between items-center bg-card/90 backdrop-blur-sm flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white"
                style={{ background: "radial-gradient(circle at 30% 20%, #22d3ee, #0f766e)", boxShadow: "0 0 12px rgba(45, 212, 191, 0.5)" }}
              >
                DZ
              </div>
              <div>
                <h1 className="text-lg font-bold text-primary m-0">Asistente Diagzone</h1>
                <p className="text-xs text-muted-foreground m-0">Pregúntale sobre compatibilidad, conectores y diagnóstico.</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-green-300 bg-green-900/30">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></span>
              IA activa
            </div>
          </header>
          <AIChatWidget isModal={true} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIChatPage;