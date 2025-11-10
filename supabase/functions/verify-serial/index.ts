/// <reference types="https://deno.land/x/deno/cli/types/deno.d.ts" />

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function parseDiagzoneHtml(html: string, serialNumber: string): string {
  // Se intentan varios patrones para encontrar los datos del resultado,
  // ya que la estructura de la web de DiagZone puede variar.

  // Patrón 1: Buscar contenedores de resultados comunes
  const resultPatterns = [
    /<div class="result-info">([\s\S]*?)<\/div>/i,
    /<div class="device-details">([\s\S]*?)<\/div>/i,
    /<div class="search-results">([\s\S]*?)<\/div>/i,
    /<div class="product-data">([\s\S]*?)<\/div>/i,
  ];

  for (const pattern of resultPatterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      const cleanedResult = match[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      if (cleanedResult.length > 10) { // Comprobación básica de que hay contenido
        return cleanedResult;
      }
    }
  }

  // Patrón 2: Buscar una tabla que contenga el número de serie
  const tableMatch = html.match(/<table[^>]*>([\s\S]*?)<\/table>/i);
  if (tableMatch && tableMatch[1] && tableMatch[1].includes(serialNumber)) {
    const cleanedResult = tableMatch[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return `Información encontrada: ${cleanedResult}`;
  }

  // Patrón 3: Buscar mensajes de error conocidos
  const errorPatterns = [
    /serial number not found/i,
    /no results/i,
    /invalid serial/i,
    /not valid/i,
  ];

  for (const pattern of errorPatterns) {
    if (html.match(pattern)) {
      return `El número de serie "${serialNumber}" no fue encontrado o no es válido.`;
    }
  }

  // Fallback: Si nada de lo anterior funciona
  return "No se pudo extraer la información específica del servidor de DiagZone. La estructura de la página puede haber cambiado. Por favor, intente verificar directamente en el sitio de DiagZone o contacte a soporte.";
}

Deno.serve(async (req) => {
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

    const targetUrl = `https://www.diagzone.com/en/search/${serialNumber}`;

    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
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