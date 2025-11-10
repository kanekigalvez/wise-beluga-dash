// @ts-ignore - This is a Deno-specific URL import that the local TypeScript server doesn't understand.
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function parseDiagzoneHtml(html: string, serialNumber: string): string {
  // 1. Buscar el contenedor principal de resultados
  const searchResultsMatch = html.match(/<div class="search-results">([\s\S]*?)<\/div>/i);
  
  if (!searchResultsMatch || !searchResultsMatch[1]) {
    return "No se pudo obtener una respuesta válida del servidor de DiagZone. Es posible que la página esté temporalmente inaccesible o haya bloqueado la solicitud.";
  }

  const resultsHtml = searchResultsMatch[1];

  // 2. Buscar un mensaje de error explícito
  const errorMatch = resultsHtml.match(/<p>([\s\S]*?)<\/p>/i);
  if (errorMatch && errorMatch[1]) {
    const errorMessage = errorMatch[1].trim();
    if (errorMessage.toLowerCase().includes("does not exist")) {
      return `El número de serie "${serialNumber}" no existe. Por favor, verifíquelo e intente de nuevo.`;
    }
    return errorMessage; // Devolver el mensaje de error del sitio
  }

  // 3. Buscar y procesar la tabla de resultados
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

  // 4. Fallback si la estructura es inesperada
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
    const formData = new URLSearchParams();
    formData.append('sn', serialNumber);

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": "https://www.diagzone.com/en/search/",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error(`Error al contactar DiagZone: ${response.statusText}`);
    }

    const html = await response.text();
    const result = parseDiagzoneHtml(html, serialNumber);

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