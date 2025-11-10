// @ts-ignore - This is a Deno-specific URL import that the local TypeScript server doesn't understand.
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function parseDiagzoneHtml(html: string, serialNumber: string): string {
  const searchResultsMatch = html.match(/<div class="search-results">([\s\S]*?)<\/div>/i);
  
  if (!searchResultsMatch || !searchResultsMatch[1]) {
    console.error("DEBUG: No se encontró el div 'search-results'. HTML recibido (primeros 500 caracteres):", html.substring(0, 500));
    return "No se pudo obtener una respuesta válida del servidor de DiagZone. Es posible que la página esté temporalmente inaccesible o haya bloqueado la solicitud. Por favor, intente de nuevo más tarde.";
  }

  const resultsHtml = searchResultsMatch[1];

  const errorMatch = resultsHtml.match(/<p>([\s\S]*?)<\/p>/i);
  if (errorMatch && errorMatch[1]) {
    const errorMessage = errorMatch[1].trim();
    if (errorMessage.toLowerCase().includes("does not exist")) {
      return `El número de serie "${serialNumber}" no existe. Por favor, verifíquelo e intente de nuevo.`;
    }
    return errorMessage;
  }

  const tableMatch = resultsHtml.match(/<table[^>]*><tbody>([\s\S]*?)<\/tbody><\/table>/i);
  if (tableMatch && tableMatch[1]) {
    const tableRowsHtml = tableMatch[1];
    const rows = tableRowsHtml.matchAll(/<tr>\s*<th>([\s\S]*?)<\/th>\s*<td>([\s\S]*?)<\/td>\s*<\/tr>/gi);
    
    const details = [];
    for (const row of rows) {
      const key = row[1].trim().replace(':', '');
      const value = row[2].trim();
      if (key && value) {
        details.push(`<strong>${key}:</strong> ${value}`);
      }
    }

    if (details.length > 0) {
      return `Información del dispositivo encontrada: <br/><br/> ${details.join('<br/>')}`;
    }
  }

  return "No se pudo extraer la información específica del servidor de DiagZone. La estructura de la página puede haber cambiado. Por favor, intente verificar directamente en el sitio de DiagZone o contacte a soporte.";
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
    const errorMessage = `Error interno en la función de verificación: ${error.message}. Esto puede ocurrir si el sitio de DiagZone ha cambiado o está bloqueando solicitudes.`;
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});