import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { GoogleGenAI } from "https://esm.sh/@google/genai@0.15.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Initialize GoogleGenAI client using the secret environment variable
const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
if (!GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY not set.");
}
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// System instruction to guide the AI's behavior
const systemInstruction = `Eres un asistente de diagnóstico automotriz experto y amigable para Diagzone.io. Tu objetivo es ayudar a los usuarios a resolver dudas sobre:
1. Compatibilidad de conectores OBD2 (como Golo ED+, iDiag, Mucar BT200, Thinkdiag) con el software Diagzone.
2. Funciones de diagnóstico (lectura de códigos, reseteos, calibraciones) que Diagzone puede realizar en marcas específicas (ej: Toyota, BMW, Ford).
3. Solución de errores comunes al usar la aplicación Diagzone.
4. Información sobre licencias (Básica vs Pro).

Tu respuesta debe ser concisa, profesional y enfocada en la información que Diagzone.io ofrece. NO debes dar consejos de reparación mecánica directa, sino guiar al usuario sobre cómo usar la herramienta de diagnóstico.

Ejemplo de respuesta: "Sí, el Mucar BT200 es compatible con Diagzone. Para tu Toyota Hilux 2018, Diagzone Pro te permitirá acceder a módulos de motor, ABS y transmisión, además de funciones de reseteo de servicio."`;

serve(async (req) => {
  // Handle CORS OPTIONS request
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, history } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Missing message" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemInstruction,
      },
      history: history,
    });

    const response = await chat.sendMessage({ message: message });
    const reply = response.text;

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("AI Chat Error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error or AI processing failed.",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});