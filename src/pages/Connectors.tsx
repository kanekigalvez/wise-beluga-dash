import { Header } from "@/components/Header";
import { ProductsSection } from "@/components/ProductsSection";
import { Footer } from "@/components/Footer";

const Connectors = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ProductsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Connectors;