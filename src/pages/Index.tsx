import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CompatibilitySection } from "@/components/CompatibilitySection";
import { ProductsSection } from "@/components/ProductsSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import { VideoHeader } from "@/components/VideoHeader";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";
import { CompatibilityModal } from "@/components/CompatibilityModal";
import { AIChatFloatingButton } from "@/components/AIChatFloatingButton"; // Import the new floating button

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [compatibleProduct, setCompatibleProduct] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <Header />
      <VideoHeader />
      <main>
        <HeroSection 
          setIsModalOpen={setIsModalOpen}
          setCompatibleProduct={setCompatibleProduct}
        />
        <CompatibilitySection />
        <ProductsSection />
        <FeaturesSection />
      </main>
      <Footer />
      {!isModalOpen && <WhatsAppWidget />}
      <CompatibilityModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={compatibleProduct}
      />
      <AIChatFloatingButton />
    </div>
  );
};

export default Index;