-- Create the downloads table
CREATE TABLE public.downloads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  version TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (REQUIRED for security)
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;

-- Policy: Public read access (everyone can see the download links)
CREATE POLICY "Public read access for downloads" ON public.downloads 
FOR SELECT USING (true);

-- Policy: Authenticated users can insert downloads (assuming admin is authenticated)
CREATE POLICY "Authenticated users can insert downloads" ON public.downloads 
FOR INSERT TO authenticated WITH CHECK (true);

-- Policy: Authenticated users can update downloads
CREATE POLICY "Authenticated users can update downloads" ON public.downloads 
FOR UPDATE TO authenticated USING (true);

-- Policy: Authenticated users can delete downloads
CREATE POLICY "Authenticated users can delete downloads" ON public.downloads 
FOR DELETE TO authenticated USING (true);

-- Seed initial data
INSERT INTO public.downloads (title, version, file_url, file_name, category) VALUES
('VERSIÓN ESTABLE', 'DIAGZONE_PRO_V2_200027', 'https://download1510.mediafire.com/0021abypkgrgfGYNnDKNeXnb4mtbtlhnvI4f2JBzQTnaVd6ZAy45fxHY-Z9y_oUw8731FPU07zEDO9xHnHwj2FkoJmqoVvGt5I3hK223ZXZYQff4rG74Piy1ZHwuXc1FfUgxGqyFI3zIym5Wd09ip1mqu4S9wlV-iHSK-uAt1Vk/qoy4blfb41b13hg/DIAGZONE_PRO_V2_200027+%282%29.apk', 'DIAGZONE_PRO_V2_200027.apk', 'diagzone'),
('ÚLTIMA VERSIÓN', 'DIAGZONE_PRO_V2_200030', 'https://download2302.mediafire.com/jnlyrpvs6dmgEJX8Be2Wb0SKjtlJxdUHViDZo4m6-pl4pRJ6Dwr97CjtUZuQvOiEJc17tbSqs5JtdQ8MiIMmV7vL5VdE2p9Fadwy4iWqORvasQ0NGhbVvTSNyGCuvx8hy-F9Lw2kqHmMAmO6lhK13ykQzbTC3IpjAo1RhvYfFQs/ku5m4i4qwug0s3i/DIAGZONE_PRO_V2_200030.apk', 'DIAGZONE_PRO_V2_200030.apk', 'diagzone'),
('X-PRO5', 'X-pro5_213_auth', 'https://download851.mediafire.com/7lmqvcppz0mgAKeIa_9JCtxQBvD_4qzcgaXYB4myTdwC6jqW1HCNV3aictmz3kZJhzZCnOZCBJo7l047FQqk-jZum3Pgn8rTeL2QqzysnJ_sZQZxLtvuQVZtqzsHmeIMJ6zKYwH1IiOlCghaaPhTQkAzJ1NE1aopWA26NwT4mcQ/4b48lx0ra6z3gop/X-pro5_213_auth.apk', 'X-pro5_213_auth.apk', 'xpro'),
('PRODIAG', 'X431PRO3SPLUS_APP_V8_00_236_EN', 'https://download937.mediafire.com/10wnl43ccywgwAPCuSWsG4xRPgMEaDowY98Stdnb-0QvgivknCLQ6fbeP41H3t8wskZl_nOtkx0RGQO4cmVBolkM_ui-4ZOzYAugiLvXokH4z_TF8AaDJMY-NThLiyALj2KdrnBZb6UXajUgXr8ePJgEuJJ_HA9ibp0vyzEVaxo/tu4wlhb6uvj23ma/X431PRO3SPLUS_APP_V8_00_236_EN.apk', 'X431PRO3SPLUS_APP_V8_00_236_EN.apk', 'xpro'),
('X-DIAG', 'X-DIAG_V7.00.012-release', 'https://download1527.mediafire.com/h4r73k7ieksgJwOvN2dTWhi0E4AYIu22E7ZLfVgO2snrLmegixsuQJstrHGiMhK_VaUGNh0Emjpui1i8uG_ML8K2zH1zSz3-lfg-wEDmYDVx1VU9zlAs25ZbuJ0x8534BjkFCsW80jMewirPtT4dGBNVsQV28POMHPQ21xXvG1k/rz96qycgkbvvsrb/X-DIAG_V7.00.012-release.apk', 'X-DIAG_V7.00.012-release.apk', 'xdiag');