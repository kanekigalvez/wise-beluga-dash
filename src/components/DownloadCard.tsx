import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface DownloadCardProps {
  title: string;
  version: string;
  fileUrl: string;
  fileName: string;
}

export const DownloadCard = ({ title, version, fileUrl, fileName }: DownloadCardProps) => {
  return (
    <Card className="text-center overflow-hidden bg-card border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
      <CardContent className="p-8">
        <h3 className={cn("text-lg font-bold uppercase mb-2 text-primary")}>{title}</h3>
        <p className="text-sm text-muted-foreground mb-6 min-h-[2.5rem]">{version}</p>
        <Button asChild className={cn("w-full shadow-soft hover:shadow-hover transition-shadow bg-primary text-primary-foreground hover:bg-primary/90")}>
          <a href={fileUrl} download={fileName}>
            <Download className="mr-2 h-4 w-4" />
            Descargar
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};