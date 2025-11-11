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
          <p className="text-lg text-white/80 mb-2">
            Vendemos software para equipos de diagnóstico.
          </p>
          <p className="text-lg text-white/80 mb-8">
            Explora nuestros conectores y productos compatibles.
          </p>
        </div>
      </div>
    </section>
  );
};