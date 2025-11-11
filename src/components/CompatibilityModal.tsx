import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CircleUserRound, Send } from "lucide-react";

interface CompatibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string | null;
}

export const CompatibilityModal = ({ isOpen, onClose, productName }: CompatibilityModalProps) => {
  if (!isOpen || !productName) {
    return null;
  }

  const whatsappLink = "https://wa.me/51933353382";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <DialogHeader className="bg-[#075E54] text-white p-4 flex-row items-center space-x-4">
          <CircleUserRound className="h-10 w-10" />
          <div className="flex flex-col">
            <DialogTitle className="text-white">Soporte DiagZone</DialogTitle>
            <p className="text-xs text-white/80">en línea</p>
          </div>
        </DialogHeader>
        <div className="p-6 bg-gray-100" style={{ backgroundImage: "url('https://i.ibb.co/7zB0mY5/whatsapp-bg.png')" }}>
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-lg shadow-sm max-w-xs">
              <p className="font-bold text-primary mb-1">¡Felicitaciones!</p>
              <p className="text-sm text-gray-800">
                Su equipo es compatible. El modelo es: <strong className="font-semibold">{productName}</strong>.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                ¿Necesitas ayuda o quieres comprar el software? ¡Chatea con nosotros!
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-100 border-t">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <div className="flex items-center gap-2 bg-white rounded-full p-2 cursor-pointer hover:bg-gray-50 transition-colors">
              <span className="text-gray-500 flex-grow px-2">Escribe un mensaje aquí</span>
              <Button size="icon" className="rounded-full bg-[#128C7E] hover:bg-[#075E54]">
                <Send className="h-5 w-5 text-white" />
              </Button>
            </div>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};