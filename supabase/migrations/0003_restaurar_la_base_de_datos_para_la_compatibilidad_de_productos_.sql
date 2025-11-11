-- Eliminar la tabla de notas de producto y sus funciones asociadas
DROP TABLE IF EXISTS public.product_notes CASCADE;
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;

-- Crear la tabla para almacenar la compatibilidad de software por producto
CREATE TABLE public.product_compatibility (
  prefix TEXT PRIMARY KEY,
  product_name TEXT NOT NULL,
  data TEXT
);

-- Habilitar Seguridad a Nivel de Fila (RLS)
ALTER TABLE public.product_compatibility ENABLE ROW LEVEL SECURITY;

-- Permitir acceso público de lectura a los datos de compatibilidad
CREATE POLICY "Public can view product compatibility" ON public.product_compatibility
FOR SELECT USING (true);

-- Insertar los datos de compatibilidad para el producto Golo ED+ (prefijo 96919)
INSERT INTO public.product_compatibility (prefix, product_name, data) VALUES
('96919', 'Golo ED+', $$-> Passenger cars (1 year)
	System
		DiagBaseService	1.00.012	issue 17.03.2023		12 months
		Diagzone PRO V2	2.00.033	issue 08.03.2025		12 months
		Firmware	11.99	issue 15.02.2021		12 months
		VIN Recognition App	1.01.006	issue 02.05.2024		12 months
	Popular
		Aston Martin	11.00	issue 20.08.2025		12 months
		Audi	29.17	issue 10.07.2025		12 months
		Bentley	12.00	issue 20.08.2025		12 months
		BMW	51.50	issue 10.07.2025		12 months
		Bugatti	11.00	issue 20.08.2025		12 months
		Chrysler	41.30	issue 10.07.2025		12 months
		Citroen	42.50	issue 10.07.2025		12 months
		Ferrari	12.00	issue 20.08.2025		12 months
		Fiat	40.00	issue 10.07.2025		12 months
		Ford Europe	49.00	issue 10.07.2025		12 months
		GM	51.50	issue 10.07.2025		12 months
		Honda	49.00	issue 10.07.2025		12 months
		Hyundai	52.00	issue 10.07.2025		12 months
		Jaguar	13.00	issue 20.08.2025		12 months
		Kia	46.00	issue 10.07.2025		12 months
		Lamborghini	11.00	issue 20.08.2025		12 months
		Lancia	40.00	issue 10.07.2025		12 months
		Land Rover	39.00	issue 10.07.2025		12 months
		Maserati	12.00	issue 20.08.2025		12 months
		Maybach	11.00	issue 20.08.2025		12 months
		Mazda	45.00	issue 10.07.2025		12 months
		Mercedes-Benz	49.90	issue 10.07.2025		12 months
		Mini	51.50	issue 10.07.2025		12 months
		Mitsubishi	36.00	issue 10.07.2025		12 months
		Nissan	46.00	issue 10.07.2025		12 months
		Opel	44.00	issue 10.07.2025		12 months
		Peugeot	45.00	issue 10.07.2025		12 months
		Porsche	24.00	issue 10.07.2025		12 months
		Renault	45.00	issue 10.07.2025		12 months
		Rolls-Royce	12.00	issue 20.08.2025		12 months
		Romeo	40.00	issue 10.07.2025		12 months
		Rover	12.00	issue 20.08.2025		12 months
		Saab	12.00	issue 20.08.2025		12 months
		Seat	29.17	issue 10.07.2025		12 months
		Skoda	29.17	issue 10.07.2025		12 months
		Smart	12.00	issue 20.08.2025		12 months
		Subaru	25.00	issue 10.07.2025		12 months
		Suzuki	38.00	issue 10.07.2025		12 months
		Toyota	51.00	issue 10.07.2025		12 months
		Vauxhall	44.00	issue 10.07.2025		12 months
		Volvo	45.00	issue 10.07.2025		12 months
		VW	29.17	issue 10.07.2025		12 months
	America
		Ford USA	49.50	issue 10.07.2025		12 months
	Asia
		Acura	49.00	issue 10.07.2025		12 months
		Daewoo	12.00	issue 20.08.2025		12 months
		Daihatsu	22.00	issue 10.07.2025		12 months
		Infiniti	46.00	issue 10.07.2025		12 months
		Isuzu	23.00	issue 10.07.2025		12 months
		Lexus	51.00	issue 10.07.2025		12 months
		Mahindra	12.00	issue 20.08.2025		12 months
		Maruti	12.00	issue 20.08.2025		12 months
		Perodua	12.00	issue 20.08.2025		12 months
		Proton	12.00	issue 20.08.2025		12 months
		SsangYong	20.00	issue 10.07.2025		12 months
		Tata	12.00	issue 20.08.2025		12 months
	Australia
		Ford Australia	29.00	issue 10.07.2025		12 months
		Holden	44.00	issue 10.07.2025		12 months
	Brazil
		Fiat Brazil	26.00	issue 10.07.2025		12 months
		GM Brazil	26.00	issue 10.07.2025		12 months
	China
		Brilliance	12.00	issue 20.08.2025		12 months
		BYD	12.00	issue 20.08.2025		12 months
		Changan	12.00	issue 20.08.2025		12 months
		Changhe	12.00	issue 20.08.2025		12 months
		Chery	12.00	issue 20.08.2025		12 months
		Foton	12.00	issue 20.08.2025		12 months
		Geely	12.00	issue 20.08.2025		12 months
		Gonow	12.00	issue 20.08.2025		12 months
		Great Wall	12.00	issue 20.08.2025		12 months
		Hafei	12.00	issue 20.08.2025		12 months
		JAC	12.00	issue 20.08.2025		12 months
		Jiangling	12.00	issue 20.08.2025		12 months
		Tianjin FAW	12.00	issue 20.08.2025		12 months
		Weili	12.00	issue 20.08.2025		12 months
		Xiamen Golden	12.00	issue 20.08.2025		12 months
		XinKai	12.00	issue 20.08.2025		12 months
		ZhongShun	12.00	issue 20.08.2025		12 months
		Zhongxing	12.00	issue 20.08.2025		12 months
		Zotye	12.00	issue 20.08.2025		12 months
	Russia
		GAZ	12.00	issue 20.08.2025		12 months
		VAZ	12.00	issue 20.08.2025		12 months
	Special
		Immobilizer	51.00	issue 10.07.2025		12 months
		Injector	51.00	issue 10.07.2025		12 months
		Odometer	51.00	issue 10.07.2025		12 months
		Reset Airbag	51.00	issue 10.07.2025		12 months
		Reset Airfuel	51.00	issue 10.07.2025		12 months
		Reset Bleeding	51.00	issue 10.07.2025		12 months
		Reset BMS	51.00	issue 10.07.2025		12 months
		Reset BOX	51.00	issue 10.07.2025		12 months
		Reset Brake	51.00	issue 10.07.2025		12 months
		Reset Coolant	51.00	issue 10.07.2025		12 months
		Reset DPF	51.00	issue 10.07.2025		12 months
		Reset EGR	51.00	issue 10.07.2025		12 months
		Reset ETS	51.00	issue 10.07.2025		12 months
		Reset GEAR	51.00	issue 10.07.2025		12 months
		Reset IMMO	51.00	issue 10.07.2025		12 months
		Reset Oil	51.00	issue 10.07.2025		12 months
		Reset SAS	51.00	issue 10.07.2025		12 months
		Reset SUN	51.00	issue 10.07.2025		12 months
		Reset SUS	51.00	issue 10.07.2025		12 months
		Reset TPMS	51.00	issue 10.07.2025		12 months
		Reset Transport	51.00	issue 10.07.2025		12 months
		Reset Windows	51.00	issue 10.07.2025		12 months
-> Electric cars (1 year)
	Popular
		Audi	29.17	issue 10.07.2025		12 months
		BMW	51.50	issue 10.07.2025		12 months
		Chrysler	41.30	issue 10.07.2025		12 months
		Citroen	42.50	issue 10.07.2025		12 months
		Ferrari	12.00	issue 20.08.2025		12 months
		Fiat	40.00	issue 10.07.2025		12 months
		Ford Europe	49.00	issue 10.07.2025		12 months
		GM	51.50	issue 10.07.2025		12 months
		Honda	49.00	issue 10.07.2025		12 months
		Hyundai	52.00	issue 10.07.2025		12 months
		Jaguar	13.00	issue 20.08.2025		12 months
		Kia	46.00	issue 10.07.2025		12 months
		Land Rover	39.00	issue 10.07.2025		12 months
		Maserati	12.00	issue 20.08.2025		12 months
		Mazda	45.00	issue 10.07.2025		12 months
		Mercedes-Benz	49.90	issue 10.07.2025		12 months
		Mini	51.50	issue 10.07.2025		12 months
		Mitsubishi	36.00	issue 10.07.2025		12 months
		Nissan	46.00	issue 10.07.2025		12 months
		Opel	44.00	issue 10.07.2025		12 months
		Peugeot	45.00	issue 10.07.2025		12 months
		Porsche	24.00	issue 10.07.2025		12 months
		Renault	45.00	issue 10.07.2025		12 months
		Seat	29.17	issue 10.07.2025		12 months
		Skoda	29.17	issue 10.07.2025		12 months
		Subaru	25.00	issue 10.07.2025		12 months
		Suzuki	38.00	issue 10.07.2025		12 months
		Toyota	51.00	issue 10.07.2025		12 months
		Vauxhall	44.00	issue 10.07.2025		12 months
		Volvo	45.00	issue 10.07.2025		12 months
		VW	29.17	issue 10.07.2025		12 months
	America
		Ford USA	49.50	issue 10.07.2025		12 months
	Asia
		Acura	49.00	issue 10.07.2025		12 months
		Isuzu	23.00	issue 10.07.2025		12 months
		Lexus	51.00	issue 10.07.2025		12 months
	China
		BYD	12.00	issue 20.08.2025		12 months
		Changan	12.00	issue 20.08.2025		12 months
		Chery	12.00	issue 20.08.2025		12 months
		Geely	12.00	issue 20.08.2025		12 months
		Great Wall	12.00	issue 20.08.2025		12 months
		JAC	12.00	issue 20.08.2025		12 months
-> Heavy Duty (1 year)
	Popular
		Allison	11.00	issue 20.08.2025		12 months
		Bendix	11.00	issue 20.08.2025		12 months
		Bosch	11.00	issue 20.08.2025		12 months
		Caterpillar	11.00	issue 20.08.2025		12 months
		Cummins	11.00	issue 20.08.2025		12 months
		DAF	11.00	issue 20.08.2025		12 months
		Detroit	11.00	issue 20.08.2025		12 months
		Eaton	11.00	issue 20.08.2025		12 months
		Freightliner	11.00	issue 20.08.2025		12 months
		Hino	11.00	issue 20.08.2025		12 months
		Hyundai	11.00	issue 20.08.2025		12 months
		International	11.00	issue 20.08.2025		12 months
		Isuzu	11.00	issue 20.08.2025		12 months
		Iveco	11.00	issue 20.08.2025		12 months
		Kenworth	11.00	issue 20.08.2025		12 months
		Mack	11.00	issue 20.08.2025		12 months
		MAN	11.00	issue 20.08.2025		12 months
		MaxxForce	11.00	issue 20.08.2025		12 months
		Mercedes-Benz	11.00	issue 20.08.2025		12 months
		Paccar	11.00	issue 20.08.2025		12 months
		Peterbilt	11.00	issue 20.08.2025		12 months
		Renault	11.00	issue 20.08.2025		12 months
		Scania	11.00	issue 20.08.2025		12 months
		Sterling	11.00	issue 20.08.2025		12 months
		Toyota	11.00	issue 20.08.2025		12 months
		UD	11.00	issue 20.08.2025		12 months
		Volvo	11.00	issue 20.08.2025		12 months
		Wabco	11.00	issue 20.08.2025		12 months
		Wabash	11.00	issue 20.08.2025		12 months
		Western Star	11.00	issue 20.08.2025		12 months
	China
		Dongfeng	11.00	issue 20.08.2025		12 months
		FAW	11.00	issue 20.08.2025		12 months
		Foton	11.00	issue 20.08.2025		12 months
		JAC	11.00	issue 20.08.2025		12 months
		Sinotruk	11.00	issue 20.08.2025		12 months
$$)
ON CONFLICT (prefix) DO UPDATE SET
  product_name = EXCLUDED.product_name,
  data = EXCLUDED.data;