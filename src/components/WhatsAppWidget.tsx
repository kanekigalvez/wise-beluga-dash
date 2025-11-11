import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageSquare } from "lucide-react";

export const WhatsAppWidget = () => {
  const whatsappLink = "https://wa.me/51933353382";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            size="icon"
            className="rounded-full h-16 w-16 bg-green-500 hover:bg-green-600 text-white shadow-lg transition-transform hover:scale-110"
          >
            <MessageSquare className="h-8 w-8" />
          </Button>
        </a>
      </TooltipTrigger>
      <TooltipContent>
        <p>Chatea con nosotros</p>
      </TooltipContent>
    </Tooltip>
  );
};