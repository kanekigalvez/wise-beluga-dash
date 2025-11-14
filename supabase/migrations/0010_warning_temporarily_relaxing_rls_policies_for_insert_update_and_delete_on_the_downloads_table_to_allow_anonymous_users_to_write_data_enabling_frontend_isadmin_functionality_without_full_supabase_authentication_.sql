-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can insert downloads" ON public.downloads;
DROP POLICY IF EXISTS "Authenticated users can update downloads" ON public.downloads;
DROP POLICY IF EXISTS "Authenticated users can delete downloads" ON public.downloads;
DROP POLICY IF EXISTS "Public read access for downloads" ON public.downloads;

-- Policy: Public read access (everyone can see the download links)
CREATE POLICY "Public read access for downloads" ON public.downloads 
FOR SELECT USING (true);

-- Policy: Public write access (Allows anonymous users to insert, update, and delete. ONLY use this if the frontend controls access via 'isAdmin' state.)
CREATE POLICY "Public write access for downloads" ON public.downloads 
FOR ALL USING (true) WITH CHECK (true);