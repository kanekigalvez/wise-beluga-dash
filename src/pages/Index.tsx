import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CompatibilitySection } from "@/components/CompatibilitySection";
import { ProductsSection } from "@/components/ProductsSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { SoftwareDevelopmentSection } from "@/components/SoftwareDevelopmentSection";
import { Footer } from "@/components/Footer";
import { VideoHeader } from "@/components/VideoHeader";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";
import { CompatibilityModal } from "@/components/CompatibilityModal";
import { AIChatWidget } from "@/components/AIChatWidget";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [compatibleProduct, setCompatibleProduct] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <Header />
      <VideoHeader />
      <section className="py-12 md:py-20 bg-muted/20">
        <div className="container">
          <AIChatWidget />
        </div>
      </section>
      <main>
        <HeroSection 
          setIsModalOpen={setIsModalOpen}
          setCompatibleProduct={setCompatibleProduct}
        />
        <CompatibilitySection />
        <ProductsSection />
        <SoftwareDevelopmentSection />
        <FeaturesSection />
      </main>
      <Footer />
      {!isModalOpen && <WhatsAppWidget />}
      <CompatibilityModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={compatibleProduct}
      />
    </div>
  );
};

export default Index;