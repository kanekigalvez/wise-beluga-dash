-- Eliminando la política de seguridad existente que requiere iniciar sesión
DROP POLICY IF EXISTS "Authenticated users can upsert details" ON public.product_details;

-- Creando una nueva política temporal que permite a cualquiera editar
CREATE POLICY "Public can upsert details" ON public.product_details
FOR ALL
USING (true)
WITH CHECK (true);