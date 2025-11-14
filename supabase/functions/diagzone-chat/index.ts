// @ts-ignore
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
// @ts-ignore
import { GoogleGenAI } from "https://esm.sh/@google/genai@0.15.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Initialize GoogleGenAI client using the secret environment variable
// @ts-ignore
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

Nueva capacidad importante: Si un usuario te proporciona un código de falla (DTC), como P0300 o U0101, tu tarea es actuar como un experto en diagnóstico. Debes:
a. Buscar en tu base de conocimientos información detallada sobre ese código DTC específico.
b. Explicar qué significa el código, a qué sistema del vehículo afecta (motor, transmisión, ABS, etc.).
c. Listar las causas más comunes que provocan ese código de falla.
d. Proporcionar una guía de pasos de diagnóstico que un técnico seguiría para identificar y resolver el problema. Puedes extenderte en la conversación para ayudar al cliente a solucionar el problema paso a paso.
e. Aclara que tus sugerencias son una guía y que un diagnóstico profesional puede ser necesario.

Tu respuesta debe ser técnica, detallada y útil. Es crucial que NO utilices ningún tipo de formato Markdown, como negritas, cursivas, listas o asteriscos (**). Responde en texto plano.

Al final de una conversación de diagnóstico exitosa, o si el problema es muy complejo, guía al usuario a contactar a un agente humano por WhatsApp para obtener soporte avanzado o para comprar productos.

Ejemplo de respuesta para un DTC: "El código P0420 indica 'Eficiencia del sistema catalítico por debajo del umbral (Banco 1)'. Esto significa que la computadora del motor ha detectado que el convertidor catalítico no está funcionando como debería. Las causas comunes incluyen un sensor de oxígeno defectuoso, fugas en el escape, o un convertidor catalítico dañado. Para diagnosticarlo, primero revisaría si hay fugas en el sistema de escape. Luego, usaría un escáner para comparar las lecturas de los sensores de oxígeno antes y después del catalizador. Si necesitas ayuda más avanzada o quieres comprar un escáner compatible, haz clic en el botón 'Chatea por WhatsApp' para hablar con un agente."`;

serve(async (req) => {
  // Handle CORS OPTIONS request
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders })
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