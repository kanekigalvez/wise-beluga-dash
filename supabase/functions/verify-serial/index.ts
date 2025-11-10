import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// Headers CORS para permitir que tu web se comunique con esta función
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Función para extraer la información relevante del HTML de la página de DiagZone
function parseDiagzoneHtml(html: string): string {
  // Esta es una función de ejemplo. La lógica real para extraer los datos
  // dependerá de la estructura HTML de la página de resultados de diagzone.com.
  // Por ahora, buscaremos un patrón simple.
  // Esto necesitará ser ajustado una vez que veamos un resultado real.
  
  // Intenta encontrar un div de resultados. Esto es una suposición.
  const resultMatch = html.match(/<div class="search-result-info">([\s\S]*?)<\/div>/);
  if (resultMatch && resultMatch[1]) {
    // Limpia el HTML para devolver solo el texto
    return resultMatch[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  // Si no encuentra un resultado específico, busca un mensaje de "no encontrado"
  const notFoundMatch = html.match(/(serial number not found|no results)/i);
  if (notFoundMatch) {
    return "El número de serie no fue encontrado o no es válido.";
  }

  return "No se pudo obtener una respuesta clara del servidor de DiagZone. Inténtelo de nuevo más tarde.";
}

serve(async (req) => {
  // Manejo de la solicitud pre-vuelo CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { serialNumber } = await req.json();

    if (!serialNumber || serialNumber.length !== 12) {
      return new Response(JSON.stringify({ error: "Número de serie inválido." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // URL de búsqueda de DiagZone (esto es una suposición y puede necesitar ajuste)
    const targetUrl = `https://www.diagzone.com/en/search/${serialNumber}`;

    const response = await fetch(targetUrl, {
      headers: {
        // Simula una solicitud de navegador para evitar bloqueos
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al contactar DiagZone: ${response.statusText}`);
    }

    const html = await response.text();
    const result = parseDiagzoneHtml(html);

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});