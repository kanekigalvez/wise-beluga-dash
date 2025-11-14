-- Drop policies first
DROP POLICY IF EXISTS "Public can read downloads" ON public.downloads;
DROP POLICY IF EXISTS "Authenticated users can insert downloads" ON public.downloads;
DROP POLICY IF EXISTS "Authenticated users can update downloads" ON public.downloads;
DROP POLICY IF EXISTS "Authenticated users can delete downloads" ON public.downloads;

-- Drop comments
COMMENT ON TABLE public.downloads IS NULL;
COMMENT ON COLUMN public.downloads.category IS NULL;

-- Drop the table
DROP TABLE public.downloads;