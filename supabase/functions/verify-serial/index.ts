// @ts-ignore - This is a Deno-specific URL import that the local TypeScript server doesn't understand.
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function parseDiagzoneHtml(html: string, serialNumber: string): string {
  // Prioridad 1: Buscar el mensaje de error de "no existe" en cualquier parte del HTML.
  // Esto es más robusto que buscarlo dentro de una etiqueta <p> específica.
  if (html.toLowerCase().includes("does not exist")) {
    return `El número de serie "${serialNumber}" no existe. Por favor, verifíquelo e intente de nuevo.`;
  }

  // Prioridad 2: Buscar la primera tabla que aparezca en la página.
  // Este enfoque es más simple y menos propenso a romperse si cambian las clases o la estructura.
  const tableMatch = html.match(/<table[^>]*>([\s\S]*?)<\/table>/i);
  if (tableMatch && tableMatch[0]) {
    // Devolvemos la tabla completa.
    return tableMatch[0];
  }

  // Fallback: Si no encontramos ni tabla ni el mensaje de error, algo fundamental ha cambiado.
  console.error("DEBUG: No se encontró ni tabla de resultados ni el texto 'does not exist'. HTML recibido (primeros 500 caracteres):", html.substring(0, 500));
  return "No se pudo obtener una respuesta válida del servidor de DiagZone. Es posible que la página esté temporalmente inaccesible o haya bloqueado la solicitud. Por favor, intente de nuevo más tarde.";
}

serve(async (req) => {
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

    const targetUrl = `https://www.diagzone.com/en/search/`;
    
    const initialResponse = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Language": "en-US,en;q=0.9",
      }
    });

    const cookies = initialResponse.headers.get("set-cookie");
    
    const formData = new URLSearchParams();
    formData.append('sn', serialNumber);

    const postHeaders: HeadersInit = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      "Content-Type": "application/x-www-form-urlencoded",
      "Referer": "https://www.diagzone.com/en/search/",
      "Origin": "https://www.diagzone.com",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Language": "en-US,en;q=0.9",
    };

    if (cookies) {
      postHeaders["Cookie"] = cookies;
    }

    const searchResponse = await fetch(targetUrl, {
      method: "POST",
      headers: postHeaders,
      body: formData.toString(),
    });

    if (!searchResponse.ok) {
      throw new Error(`Error al contactar DiagZone: ${searchResponse.statusText}`);
    }

    const html = await searchResponse.text();
    const result = parseDiagzoneHtml(html, serialNumber);

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error en la función verify-serial:", error);
    const errorMessage = `Error interno en la función de verificación: ${error.message}.`;
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});