// @ts-ignore - This is a Deno-specific URL import
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function parseDiagzoneHtml(html: string, serialNumber: string): string {
  if (html.toLowerCase().includes("does not exist")) {
    return `<p>El número de serie <strong>${serialNumber}</strong> no existe en la base de datos de DiagZone. Por favor, verifíquelo e intente de nuevo.</p>`;
  }

  const tableMatch = html.match(/<table[^>]*>([\sS]*?)<\/table>/i);
  if (tableMatch && tableMatch[0]) {
    // Añadimos estilos básicos para mejorar la presentación de la tabla
    let styledTable = tableMatch[0].replace('<table', '<table style="width: 100%; border-collapse: collapse;"');
    styledTable = styledTable.replace(/<th/g, '<th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;"');
    styledTable = styledTable.replace(/<td/g, '<td style="border: 1px solid #ddd; padding: 8px;"');
    return styledTable;
  }

  console.error("DEBUG: No se encontró tabla de resultados ni el texto 'does not exist'. HTML recibido:", html.substring(0, 500));
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

    // @ts-ignore - Deno is available in the Supabase Edge Function environment
    const apiKey = Deno.env.get("SCRAPINGBEE_API_KEY");
    if (!apiKey) {
      throw new Error("La API Key de ScrapingBee no está configurada en los secretos de Supabase.");
    }

    const targetUrl = "https://www.diagzone.com/en/search/";
    const scrapingBeeUrl = `https://app.scrapingbee.com/api/v1/?api_key=${apiKey}`;

    // Estrategia directa: Simular el envío del formulario con una petición POST.
    const payload = {
      url: targetUrl,
      method: "POST",
      // Estos son los datos que el formulario envía. 'sn' es el nombre del campo de entrada.
      data: `sn=${serialNumber}`, 
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": "https://www.diagzone.com/en/search/", // Simular que venimos de la página de búsqueda
      },
      // Mantenemos un renderizado de JS por si la página lo necesita para procesar el resultado
      render_js: true, 
    };

    const beeResponse = await fetch(scrapingBeeUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!beeResponse.ok) {
      const errorBody = await beeResponse.text();
      throw new Error(`Error de ScrapingBee: ${beeResponse.statusText} - ${errorBody}`);
    }

    const htmlResult = await beeResponse.text();
    const result = parseDiagzoneHtml(htmlResult, serialNumber);

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