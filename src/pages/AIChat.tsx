import React, { useState, useRef, useEffect, FormEvent } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"; // Import Button

// Supabase Project ID: uvghvyrvrsmyydpnobkl
const SUPABASE_PROJECT_ID = "uvghvyrvrsmyydpnobkl";
const API_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/diagzone-chat`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIChatPage = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hola, soy el asistente IA de Diagzone. Dime qué conector usas (EasyDiag, Golo, Mucar BT200, etc.), la marca y año del vehículo, y qué problema tienes, y te orientaré paso a paso.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          // Gemini expects history in a specific format, which matches our Message interface
          history: newHistory.map(msg => ({ role: msg.role === 'assistant' ? 'model' : 'user', parts: [{ text: msg.content }] })),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const msg =
          errorData.error ||
          "Ocurrió un error al contactar con la IA. Intenta de nuevo más tarde.";
        setMessages((prev) => [...prev, { role: "assistant", content: msg }]);
        return;
      }

      const data = await res.json();
      const reply = data.reply || "No recibí una respuesta clara de la IA.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
      const msg =
        "Error de conexión con el servidor de IA. Verifica tu internet o inténtalo más tarde.";
      setMessages((prev) => [...prev, { role: "assistant", content: msg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (msg: Message, index: number) => {
    const isUser = msg.role === "user";
    return (
      <div
        key={index}
        className={cn("flex gap-3 items-start", isUser && "flex-row-reverse")}
      >
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0",
            isUser
              ? "bg-green-600 text-white"
              : "bg-blue-600 text-white",
          )}
          style={{
            background: isUser
              ? "radial-gradient(circle at 30% 20%, #22c55e, #166534)"
              : "radial-gradient(circle at 30% 20%, #38bdf8, #4f46e5)",
          }}
        >
          {isUser ? "Tú" : "IA"}
        </div>
        <div
          className={cn(
            "max-w-[82%] p-3 rounded-xl text-sm leading-relaxed border",
            isUser
              ? "bg-green-900/20 border-green-600/50 rounded-br-none"
              : "bg-card border-border rounded-tl-none",
          )}
        >
          <p style={{ whiteSpace: "pre-wrap" }}>{msg.content}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow flex justify-center items-center p-4 md:p-8">
        <div className="w-full max-w-4xl h-[80vh] flex flex-col bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
          {/* Header Chat */}
          <header className="p-4 border-b border-border flex justify-between items-center bg-card/90 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white"
                style={{ background: "radial-gradient(circle at 30% 20%, #22d3ee, #0f766e)", boxShadow: "0 0 12px rgba(45, 212, 191, 0.5)" }}
              >
                DZ
              </div>
              <div>
                <h1 className="text-lg font-bold text-primary m-0">Asistente IA Diagzone</h1>
                <p className="text-xs text-muted-foreground m-0">Pregúntale sobre compatibilidad, conectores y diagnóstico.</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-green-300 bg-green-900/30">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></span>
              IA activa
            </div>
          </header>

          {/* Chat Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
            {messages.map(renderMessage)}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <footer className="p-4 border-t border-border bg-card">
            <form onSubmit={handleSubmit} className="flex gap-3 items-end">
              <textarea
                id="user-input"
                rows={2}
                className="flex-1 resize-none rounded-lg border border-input bg-muted/50 p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none"
                placeholder="Ejemplo: ¿Mi Mucar BT200 funciona con Diagzone para una Toyota Hilux 2018?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || input.trim() === ""}
                className="h-10 px-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/30"
              >
                {isLoading ? "Pensando..." : "Enviar"}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2 ml-1">
              Consejo: menciona <strong>conector</strong>, <strong>marca</strong>, <strong>año</strong> y <strong>problema</strong> para una mejor respuesta.
            </p>
          </footer>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIChatPage;