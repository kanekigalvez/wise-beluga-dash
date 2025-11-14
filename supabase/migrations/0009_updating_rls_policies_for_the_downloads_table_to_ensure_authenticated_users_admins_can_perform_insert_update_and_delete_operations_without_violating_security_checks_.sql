-- Drop existing policies for modification
DROP POLICY IF EXISTS "Authenticated users can insert downloads" ON public.downloads;
DROP POLICY IF EXISTS "Authenticated users can update downloads" ON public.downloads;
DROP POLICY IF EXISTS "Authenticated users can delete downloads" ON public.downloads;

-- Policy: Authenticated users can insert downloads
CREATE POLICY "Authenticated users can insert downloads" ON public.downloads 
FOR INSERT TO authenticated WITH CHECK (true);

-- Policy: Authenticated users can update downloads
CREATE POLICY "Authenticated users can update downloads" ON public.downloads 
FOR UPDATE TO authenticated USING (true);

-- Policy: Authenticated users can delete downloads
CREATE POLICY "Authenticated users can delete downloads" ON public.downloads 
FOR DELETE TO authenticated USING (true);