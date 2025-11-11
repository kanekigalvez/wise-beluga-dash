-- Drop all existing public tables to start fresh
DROP TABLE IF EXISTS public.contact_submissions CASCADE;
DROP TABLE IF EXISTS public.product_compatibility CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.subscriptions CASCADE;
DROP TABLE IF EXISTS public.plans CASCADE;
DROP TABLE IF EXISTS public.organization_members CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.organizations CASCADE;

-- Create a new table to store notes for each product
CREATE TABLE public.product_notes (
  product_slug TEXT PRIMARY KEY,
  notes TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Function to automatically update the 'updated_at' timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to execute the function on update
CREATE TRIGGER update_product_notes_updated_at
BEFORE UPDATE ON public.product_notes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Row Level Security on the new table
ALTER TABLE public.product_notes ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read and write access
CREATE POLICY "Public can view notes" ON public.product_notes
FOR SELECT USING (true);

CREATE POLICY "Public can create notes" ON public.product_notes
FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can update notes" ON public.product_notes
FOR UPDATE USING (true);