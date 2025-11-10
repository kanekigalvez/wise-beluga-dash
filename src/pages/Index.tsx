import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CompatibilitySection } from "@/components/CompatibilitySection";
import { DtcSearchSection } from "@/components/DtcSearchSection";
import { ProductsSection } from "@/components/ProductsSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import { VideoHeader } from "@/components/VideoHeader";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <VideoHeader />
        <HeroSection />
        <CompatibilitySection />
        <DtcSearchSection />
        <ProductsSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;