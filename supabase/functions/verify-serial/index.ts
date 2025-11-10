// @ts-ignore - This is a Deno-specific URL import
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// La lógica para analizar el HTML de DiagZone sigue siendo la misma y es robusta.
function parseDiagzoneHtml(html: string, serialNumber: string): string {
  if (html.toLowerCase().includes("does not exist")) {
    return `El número de serie "${serialNumber}" no existe. Por favor, verifíquelo e intente de nuevo.`;
  }

  const tableMatch = html.match(/<table[^>]*>([\s\S]*?)<\/table>/i);
  if (tableMatch && tableMatch[0]) {
    return tableMatch[0];
  }

  console.error("DEBUG: No se encontró ni tabla de resultados ni el texto 'does not exist'.");
  return "No se pudo obtener una respuesta válida del servidor de DiagZone. Es posible que la página esté temporalmente inaccesible o haya bloqueado la solicitud. Por favor, intente de nuevo más tarde.";
}

// Forzar redespliegue para cargar secretos actualizados.
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

    // Paso 1: Obtener la API Key de los secretos de Supabase.
    // @ts-ignore - Deno is available in the Supabase Edge Function environment
    const apiKey = Deno.env.get("SCRAPINGBEE_API_KEY");
    if (!apiKey) {
      throw new Error("La API Key de ScrapingBee no está configurada en los secretos de Supabase.");
    }

    // Paso 2: Configurar la petición a ScrapingBee para que actúe como un usuario.
    const scrapingBeeUrl = "https://app.scrapingbee.com/api/v1/";
    const payload = {
      api_key: apiKey,
      url: "https://www.diagzone.com/en/search/",
      block_resources: false,
      js_scenario: {
        instructions: [
          // Espera a que el campo de texto esté listo
          { wait_for: "input[name=sn]" },
          // Escribe el número de serie en el campo
          { type: ["input[name=sn]", serialNumber] },
          // Haz clic en el botón de enviar del formulario
          { click: "form button[type=submit]" },
          // Espera a que la página de resultados cargue
          { wait_for_navigation: true },
        ],
      },
    };

    // Paso 3: Enviar la tarea a ScrapingBee.
    const beeResponse = await fetch(scrapingBeeUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!beeResponse.ok) {
      const errorBody = await beeResponse.text();
      throw new Error(`Error de ScrapingBee: ${beeResponse.statusText} - ${errorBody}`);
    }

    // Paso 4: ScrapingBee nos devuelve el HTML de la página de resultados.
    const htmlResult = await beeResponse.text();
    
    // Paso 5: Usamos nuestra función de siempre para extraer la información útil.
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