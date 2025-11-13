import { cn } from "@/lib/utils";

interface ImageHeaderProps {
  className?: string;
}

export const ImageHeader = ({ className }: ImageHeaderProps) => {
  return (
    <section className={cn("w-full py-2", className)}>
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="overflow-hidden rounded-lg shadow-xl border border-border/50">
            <img
              src="/diagzone-promo.jpeg"
              alt="DiagZone Pro Distribuidor Autorizado"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};