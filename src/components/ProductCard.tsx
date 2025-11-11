import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditableProductDetails } from "./EditableProductDetails";
import { slugify } from "@/lib/utils";

interface ProductCardProps {
  image: string;
  name: string;
  description: string;
}

export const ProductCard = ({ image, name, description }: ProductCardProps) => {
  const softwareId = slugify(name);

  return (
    <Dialog>
      <Card className="group overflow-hidden bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-primary">
        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden bg-transparent">
            <img src={image} alt={name} className="w-full h-full object-contain p-8 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-2 text-gradient-primary">- {name}</h3>
            <p className="text-muted-foreground text-sm mb-4 min-h-[3rem]">{description}</p>
            <DialogTrigger asChild>
              <Button className="w-full bg-primary/90 hover:bg-primary text-primary-foreground transition-all hover:shadow-glow-primary">
                <Info className="mr-2 h-4 w-4" />
                Ver / Editar Detalles
              </Button>
            </DialogTrigger>
          </div>
        </CardContent>
      </Card>
      <DialogContent className="max-w-4xl w-full bg-background/80 backdrop-blur-md border-primary/50">
        <EditableProductDetails softwareId={softwareId} productName={name} />
      </DialogContent>
    </Dialog>
  );
};