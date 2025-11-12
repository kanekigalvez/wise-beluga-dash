import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";

const AIChatPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow flex justify-center items-center p-4 md:p-8">
        <AIChatWidget />
      </main>
      <Footer />
    </div>
  );
};

export default AIChatPage;