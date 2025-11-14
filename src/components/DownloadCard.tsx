import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { DownloadForm, type Download as DownloadType } from "./DownloadForm";

interface DownloadCardProps {
  download: DownloadType;
  isAdmin: boolean;
  onEditSuccess: () => void;
  onDelete: (id: string) => void;
}

export const DownloadCard = ({ download, isAdmin, onEditSuccess, onDelete }: DownloadCardProps) => {
  const { t } = useTranslation();
  const { id, title, version, file_url, file_name } = download;

  return (
    <Card className="text-center overflow-hidden bg-card border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 w-full sm:w-80">
      <CardContent className="p-8">
        <h3 className={cn("text-lg font-bold uppercase mb-2 text-primary")}>{title}</h3>
        <p className="text-sm text-muted-foreground mb-6 min-h-[2.5rem]">{version}</p>
        <Button asChild className={cn("w-full shadow-soft hover:shadow-hover transition-shadow bg-primary text-primary-foreground hover:bg-primary/90")}>
          <a href={file_url} download={file_name}>
            <Download className="mr-2 h-4 w-4" />
            {t('downloads_page.download_button')}
          </a>
        </Button>
        {isAdmin && id && (
          <div className="flex gap-2 mt-4">
            <DownloadForm download={download} onSuccess={onEditSuccess}>
              <Button variant="outline" size="sm" className="flex-1">
                <Pencil className="h-4 w-4 mr-2" />
                Editar
              </Button>
            </DownloadForm>
            <Button variant="destructive" size="sm" className="flex-1" onClick={() => onDelete(id)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};