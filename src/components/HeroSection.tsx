import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('https://i.ibb.co/DPXHHFmK/descarga.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-white">
            Diagzone - Tienda Online
          </h1>
          <p className="text-lg text-white/80 mb-8">
            Vendemos software para equipos de diagnóstico. Explore nuestros conectores y verifique la compatibilidad.
          </p>
          <Button asChild className="h-12 px-8 shadow-soft hover:shadow-hover transition-shadow rounded-md">
            <a href="/#productos">Ver Productos</a>
          </Button>
        </div>
      </div>
    </section>
  );
};