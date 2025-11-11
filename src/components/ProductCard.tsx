import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SoftwareDetails } from "./SoftwareDetails";
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
      <Card className="group overflow-hidden border-border/50 hover:shadow-hover transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden bg-background">
            <img src={image} alt={name} className="w-full h-full object-contain p-8 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">- {name}</h3>
            <p className="text-muted-foreground text-sm mb-4 min-h-[3rem]">{description}</p>
            <DialogTrigger asChild>
              <Button className="w-full shadow-soft hover:shadow-hover transition-shadow">
                <Info className="mr-2 h-4 w-4" />
                Ver compatibilidad
              </Button>
            </DialogTrigger>
          </div>
        </CardContent>
      </Card>
      <DialogContent className="max-w-4xl w-full">
        <SoftwareDetails softwareId={softwareId} />
      </DialogContent>
    </Dialog>
  );
};