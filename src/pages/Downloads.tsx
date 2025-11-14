import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DownloadCard } from "@/components/DownloadCard";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { DownloadForm, type Download } from "@/components/DownloadForm";
import { showError, showSuccess, showLoading, dismissToast } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DownloadsByCategory = {
  diagzone: Download[];
  xpro: Download[];
  xdiag: Download[];
};

const DownloadsPage = () => {
  const { t } = useTranslation();
  const { isAdmin } = useAdmin();
  const [allDownloads, setAllDownloads] = useState<Download[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchDownloads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("downloads")
      .select("*")
      .order("category")
      .order("created_at", { ascending: false });

    if (error) {
      showError("No se pudieron cargar los enlaces de descarga.");
      console.error(error);
      setAllDownloads([]);
    } else {
      // Ensure data conforms to Download type, especially the ID
      setAllDownloads(data as Download[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDownloads();
  }, []);

  const groupDownloads = (downloads: Download[]): DownloadsByCategory => {
    return downloads.reduce((acc, item) => {
      const category = item.category as keyof DownloadsByCategory;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, { diagzone: [], xpro: [], xdiag: [] } as DownloadsByCategory);
  };

  const downloads = groupDownloads(allDownloads);

  const handleSave = async (values: Omit<Download, 'id'>, existingId?: string) => {
    const toastId = showLoading(existingId ? "Actualizando descarga..." : "Agregando descarga...");
    
    const { error } = existingId
      ? await supabase.from("downloads").update(values).eq("id", existingId)
      : await supabase.from("downloads").insert(values);

    dismissToast(toastId);

    if (error) {
      showError(`Error: ${error.message}`);
    } else {
      showSuccess(existingId ? "¡Actualizado con éxito!" : "¡Guardado con éxito!");
      fetchDownloads(); // Refetch data to update UI globally
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const toastId = showLoading("Eliminando descarga...");
    const { error } = await supabase.from("downloads").delete().eq("id", deleteId);
    dismissToast(toastId);
    if (error) {
      showError(`Error al eliminar: ${error.message}`);
    } else {
      showSuccess("¡Eliminado con éxito!");
      fetchDownloads(); // Refetch data to update UI globally
    }
    setDeleteId(null);
  };

  const renderSection = (titleKey: string, downloadsList: Download[]) => {
    const title = t(titleKey);
    return (
      <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-secondary">{title}</h2>
        <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
          {loading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="w-full sm:w-80 p-8 space-y-4 bg-card border rounded-lg">
                <Skeleton className="h-6 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))
          ) : (
            downloadsList.map((download) => (
              <DownloadCard
                key={download.id}
                download={download}
                isAdmin={isAdmin}
                onEdit={(values) => handleSave(values, download.id)}
                onDelete={() => setDeleteId(download.id)}
              />
            ))
          )}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 md:py-20 bg-muted/30">
        <div className="container">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">{t('downloads_page.title')}</h1>
            <p className="text-lg text-muted-foreground">{t('downloads_page.subtitle')}</p>
            {isAdmin && (
              <div className="mt-6">
                <DownloadForm onSave={handleSave}>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Agregar Nueva Descarga
                  </Button>
                </DownloadForm>
              </div>
            )}
          </div>
          
          <div className="space-y-16">
            {renderSection('downloads_page.diagzone_section', downloads.diagzone)}
            {renderSection('downloads_page.xpro_section', downloads.xpro)}
            {renderSection('downloads_page.xdiag_section', downloads.xdiag)}
          </div>
        </div>
      </main>
      <Footer />
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente el archivo de descarga.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DownloadsPage;