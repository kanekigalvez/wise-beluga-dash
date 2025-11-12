import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquareText, X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AIChatWidget } from "./AIChatWidget";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export const AIChatFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      {/* Floating Button */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className={cn(
              "fixed bottom-8 left-8 z-50 h-16 w-16 rounded-full text-white shadow-lg transition-transform hover:scale-110",
              "bg-blue-600 hover:bg-blue-700 shadow-blue-600/50 hover:shadow-blue-600/70",
            )}
            aria-label="Abrir Asistente de Chat"
          >
            <MessageSquareText className="h-8 w-8" />
          </Button>
        </DialogTrigger>
        
        {/* Dialog Content (The Chat Window) */}
        <DialogContent className="max-w-4xl w-full h-[80vh] p-0 border-none shadow-2xl rounded-xl overflow-hidden">
          <div className="flex flex-col h-full">
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
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </header>
            {/* AIChatWidget content is rendered here, taking up the remaining height */}
            <AIChatWidget isModal={true} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};