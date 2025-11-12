import { Button } from "@/components/ui/button";
import { MessageSquareText, X } from "lucide-react";
import { AIChatWidget } from "./AIChatWidget";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const AIChatFixedWidget = () => {
  const [isOpen, setIsOpen] = useState(true); // Start open by default
  const { t } = useTranslation();

  if (!isOpen) {
    return (
      <Button
        size="icon"
        className={cn(
          "fixed bottom-8 left-8 z-50 h-16 w-16 rounded-full text-white shadow-lg transition-transform hover:scale-110",
          "bg-blue-600 hover:bg-blue-700 shadow-blue-600/50 hover:shadow-blue-600/70",
        )}
        aria-label="Abrir Asistente de Chat"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquareText className="h-8 w-8" />
      </Button>
    );
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 z-50 w-full max-w-sm h-[80vh] md:h-[600px] md:max-w-[400px] flex flex-col bg-card border border-border shadow-2xl rounded-t-xl md:rounded-xl overflow-hidden transition-all duration-300",
        "md:bottom-8 md:left-8"
      )}
    >
      <header className="p-4 border-b border-border flex justify-between items-center bg-card/90 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white"
            style={{ background: "radial-gradient(circle at 30% 20%, #22d3ee, #0f766e)", boxShadow: "0 0 8px rgba(45, 212, 191, 0.5)" }}
          >
            DZ
          </div>
          <div>
            <h1 className="text-base font-bold text-primary m-0">Asistente Diagzone</h1>
            <p className="text-xs text-muted-foreground m-0">Pregúntale sobre compatibilidad.</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </header>
      {/* AIChatWidget content is rendered here, taking up the remaining height */}
      <AIChatWidget isModal={true} />
    </div>
  );
};