import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `
  Eres "Asesor Diagzone", un asistente experto de inteligencia artificial para el sitio web Diagzone.io.
  Tu único propósito es responder preguntas sobre Diagzone, escáneres compatibles, software, diagnóstico de vehículos y temas directamente relacionados.
  NO respondas preguntas sobre otros temas. Si te preguntan algo no relacionado, amablemente indica que solo puedes ayudar con temas de Diagzone y redirige la conversación.
  Tu objetivo principal es guiar a los usuarios que muestren interés en comprar o necesiten ayuda personalizada a que se pongan en contacto con el equipo de soporte a través de WhatsApp.
  El número de WhatsApp es +17168156081. Cuando sea apropiado, anímalos a escribir, por ejemplo: "Para obtener ayuda personalizada con tu compra, te recomiendo que contactes a nuestros expertos por WhatsApp".
  Sé amable, servicial y conciso en tus respuestas.
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!messages) {
      return new Response(JSON.stringify({ error: "Messages are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const contents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const geminiReqBody = {
      contents,
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    };

    const geminiResponse = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(geminiReqBody),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error("Gemini API error:", errorText);
      return new Response(JSON.stringify({ error: "Failed to fetch from Gemini API", details: errorText }), {
        status: geminiResponse.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const geminiData = await geminiResponse.json();
    const botResponse = geminiData.candidates[0]?.content.parts[0]?.text || "No pude procesar tu solicitud en este momento.";

    return new Response(JSON.stringify({ reply: botResponse }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});