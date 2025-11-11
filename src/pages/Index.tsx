import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CompatibilitySection } from "@/components/CompatibilitySection";
import { DtcSearchSection } from "@/components/DtcSearchSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import { VideoHeader } from "@/components/VideoHeader";
import { ProductsSection } from "@/components/ProductsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <VideoHeader />
      <main>
        <HeroSection />
        <ProductsSection />
        <CompatibilitySection />
        <DtcSearchSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;