-- Drop the old, complex table
DROP TABLE IF EXISTS public.product_compatibility;

-- Create a new, simpler table for editable product details
CREATE TABLE public.product_details (
  slug TEXT PRIMARY KEY,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on the new table
ALTER TABLE public.product_details ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow anyone to read the product descriptions
CREATE POLICY "Public read access for product details"
ON public.product_details
FOR SELECT
USING (true);

-- RLS Policy: Only allow authenticated (logged-in) users to add or change descriptions
CREATE POLICY "Authenticated users can upsert details"
ON public.product_details
FOR ALL
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);