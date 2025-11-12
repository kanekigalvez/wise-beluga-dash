import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditableProductDetails } from "./EditableProductDetails";
import { useAdmin } from "@/contexts/AdminContext";
import { useTranslation } from "react-i18next";

interface ProductCardProps {
  slug: string;
  image: string;
  name: string;
  description: string;
  db_description?: string | null;
}

export const ProductCard = ({ slug, image, name, description, db_description }: ProductCardProps) => {
  const { isAdmin } = useAdmin();
  const { t } = useTranslation();
  const hasDetails = db_description && db_description.trim() !== "";

  const renderButton = () => {
    if (isAdmin) {
      return (
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground">
            <Info className="mr-2 h-4 w-4" />
            {t('product_card.view_edit_details_button')}
          </Button>
        </DialogTrigger>
      );
    }

    if (hasDetails) {
      return (
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground">
            <Info className="mr-2 h-4 w-4" />
            {t('product_card.view_details_button')}
          </Button>
        </DialogTrigger>
      );
    }

    // Placeholder to keep card height consistent
    return <div className="h-10 w-full" />;
  };

  return (
    <Dialog>
      <Card id={slug} className="group overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-primary scroll-mt-20">
        <CardContent className="p-0">
          <div className="aspect-video overflow-hidden bg-black">
            <img src={image} alt={name} className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold mb-1 text-primary">{name}</h3>
            <p className="text-muted-foreground text-sm mb-4">{description}</p>
            {renderButton()}
          </div>
        </CardContent>
      </Card>
      <DialogContent className="max-w-4xl w-full bg-background/80 backdrop-blur-md border-primary/50">
        <EditableProductDetails softwareId={slug} productName={name} currentImageUrl={image} />
      </DialogContent>
    </Dialog>
  );
};