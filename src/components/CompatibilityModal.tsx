import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CircleUserRound, Send, Sparkles, CheckCheck } from "lucide-react";

interface CompatibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string | null;
}

export const CompatibilityModal = ({ isOpen, onClose, productName }: CompatibilityModalProps) => {
  if (!isOpen || !productName) {
    return null;
  }

  const whatsappLink = `https://wa.me/51933353382?text=Hola,%20mi%20equipo%20es%20compatible%20con%20el%20modelo%20${encodeURIComponent(productName)}.%20Quisiera%20más%20información.`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm p-0 gap-0 border-none shadow-2xl rounded-xl overflow-hidden data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
        <DialogHeader className="bg-gradient-to-b from-[#075E54] to-[#128C7E] text-white p-4 flex-row items-center space-x-4">
          <CircleUserRound className="h-10 w-10" />
          <div className="flex flex-col">
            <DialogTitle className="text-white font-bold">Soporte DiagZone</DialogTitle>
            <p className="text-xs text-white/80">en línea</p>
          </div>
        </DialogHeader>
        <div className="p-4 bg-gray-100" style={{ backgroundImage: "url('https://i.ibb.co/7zB0mY5/whatsapp-bg.png')" }}>
          <div className="flex justify-start">
            <div className="relative bg-gradient-to-br from-white to-[#E0FDCF] p-3 rounded-lg rounded-tl-none shadow-md max-w-xs">
              <p className="font-bold text-primary mb-2 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                ¡Felicitaciones!
              </p>
              <p className="text-sm text-gray-800 mb-2">
                Tu equipo es compatible. El modelo es: <strong className="font-semibold text-black">{productName}</strong>.
              </p>
              <p className="text-sm text-gray-600">
                ¿Necesitas ayuda o quieres comprar el software? ¡Chatea con nosotros!
              </p>
              <div className="text-xs text-right text-gray-400 mt-2 flex items-center justify-end gap-1">
                <span>10:30 AM</span>
                <CheckCheck className="h-4 w-4 text-blue-500" />
              </div>
              <div className="absolute -left-2 top-0 w-2 h-2">
                <div className="w-full h-full bg-white transform -skew-x-[45deg] origin-bottom-right"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 bg-gray-100 border-t">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <div className="flex items-center gap-2 bg-white rounded-full p-2 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm">
              <span className="text-gray-500 flex-grow px-2">Escribe un mensaje aquí</span>
              <Button size="icon" className="rounded-full bg-gradient-to-br from-[#128C7E] to-[#25D366] hover:scale-110 transition-transform">
                <Send className="h-5 w-5 text-white" />
              </Button>
            </div>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};