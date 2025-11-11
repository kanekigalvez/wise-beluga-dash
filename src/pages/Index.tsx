import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CompatibilitySection } from "@/components/CompatibilitySection";
import { ProductsSection } from "@/components/ProductsSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import { VideoHeader } from "@/components/VideoHeader";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <VideoHeader />
      <main>
        <HeroSection />
        <CompatibilitySection />
        <ProductsSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;