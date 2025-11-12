import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MessageSquareText } from "lucide-react";
import { AIChatWidget } from "./AIChatWidget";
import { useTranslation } from "react-i18next";

export const AIChatModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="h-11 px-8 group border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:shadow-glow-primary"
        >
          <MessageSquareText className="mr-2 h-4 w-4" />
          {t('header.ai_assistant')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 border-none bg-transparent shadow-none">
        <div className="w-full h-full">
          <AIChatWidget isModal={true} />
        </div>
      </DialogContent>
    </Dialog>
  );
};