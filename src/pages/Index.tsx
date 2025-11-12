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
import { AIChatModal } from "@/components/AIChatModal"; // Import the new modal

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
      {/* Floating button to open the AI Chat Modal */}
      <div className="fixed bottom-8 left-8 z-50 hidden md:block">
        <AIChatModal />
      </div>
    </div>
  );
};

export default Index;