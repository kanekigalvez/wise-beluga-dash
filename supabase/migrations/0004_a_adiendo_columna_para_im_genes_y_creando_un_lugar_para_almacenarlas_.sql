-- Add a column to store image URLs for products
ALTER TABLE public.product_details ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Create a storage bucket for product images if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
SELECT 'product_images', 'product_images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']
WHERE NOT EXISTS (
  SELECT 1 FROM storage.buckets WHERE id = 'product_images'
);

-- Add security policies for the new storage bucket
-- Allow public read access to images
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
CREATE POLICY "Public Read Access" ON storage.objects FOR SELECT USING (bucket_id = 'product_images');

-- Allow public upload of images (necessary for admin mode without user login)
DROP POLICY IF EXISTS "Allow Public Upload" ON storage.objects;
CREATE POLICY "Allow Public Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product_images');

-- Allow public update of images
DROP POLICY IF EXISTS "Allow Public Update" ON storage.objects;
CREATE POLICY "Allow Public Update" ON storage.objects FOR UPDATE USING (bucket_id = 'product_images');