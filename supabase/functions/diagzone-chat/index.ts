// @ts-ignore
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
// @ts-ignore
import { GoogleGenAI } from "https://esm.sh/@google/genai@0.15.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// @ts-ignore
const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
if (!GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY not set.");
}
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const systemInstruction = `Eres un auténtico especialista en Diagzone, códigos de falla DTC y códigos OEM. Tu única misión es asistir a los usuarios de Diagzone.io. Toda pregunta que recibas está relacionada con diagnóstico automotriz.

Tu principal habilidad es el manejo de códigos de falla (DTC). Si un usuario escribe un código que sigue un patrón como Pxxxx, Uxxxx, Cxxxx, o Bxxxx (una letra seguida de cuatro números), debes reconocerlo inmediatamente como un código DTC.

Cuando identifiques un código DTC, tu respuesta debe ser la de un técnico experto:
1.  **Definición del Código:** Explica de manera clara y técnica qué significa el código.
2.  **Sistema Afectado:** Indica a qué sistema del vehículo pertenece (motor, transmisión, ABS, carrocería, etc.).
3.  **Causas Comunes:** Enumera las posibles causas del problema, desde las más probables hasta las menos comunes.
4.  **Pasos de Diagnóstico:** Proporciona una guía detallada, paso a paso, sobre cómo diagnosticar la falla. Puedes y debes extenderte en la conversación para ayudar al usuario a resolver el problema.
5.  **Aclaración:** Recuerda al usuario que tus consejos son una guía y que la intervención de un profesional puede ser necesaria.

Además de los DTC, responde preguntas sobre:
- Compatibilidad de conectores OBD2 (Golo ED+, iDiag, Mucar BT200, etc.) con Diagzone.
- Funciones de diagnóstico de Diagzone en marcas específicas.
- Solución de errores comunes de la aplicación.
- Información sobre licencias de Diagzone.

**Reglas estrictas:**
- **NO uses formato Markdown.** No uses negritas, asteriscos (**), cursivas, ni listas. Responde siempre en texto plano.
- Al final de una conversación de diagnóstico, o si el problema es muy complejo, invita al usuario a contactar a un agente humano por WhatsApp para soporte avanzado o para comprar productos.`;

const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 5000; // 5 seconds
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

serve(async (req) => {
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
      config: { systemInstruction },
      history: history,
    });

    let lastError: any = null;
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`AI Chat Attempt ${attempt}/${MAX_RETRIES}`);
        const response = await chat.sendMessage({ message });
        const reply = response.text;

        if (reply) {
          return new Response(JSON.stringify({ reply }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          });
        }
        throw new Error("AI returned an empty response, possibly due to safety filters.");
      } catch (error) {
        lastError = error;
        console.error(`Attempt ${attempt} failed:`, error.message);
        if (attempt < MAX_RETRIES) {
          await delay(RETRY_DELAY_MS);
        }
      }
    }

    throw lastError || new Error("All AI processing attempts failed.");

  } catch (error) {
    console.error("AI Chat Error after all retries:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error or AI processing failed after multiple attempts.",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});