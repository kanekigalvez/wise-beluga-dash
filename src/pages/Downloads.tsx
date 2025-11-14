import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DownloadCard } from "@/components/DownloadCard";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { DownloadForm, type Download } from "@/components/DownloadForm";
import { showError, showSuccess, showLoading, dismissToast } from "@/utils/toast";
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
  const [downloads, setDownloads] = useState<DownloadsByCategory>({ diagzone: [], xpro: [], xdiag: [] });
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchDownloads = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("downloads").select("*").order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching downloads:", error);
      showError("No se pudieron cargar las descargas.");
    } else {
      const grouped = data.reduce((acc, item) => {
        const category = item.category as keyof DownloadsByCategory;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(item);
        return acc;
      }, {} as DownloadsByCategory);
      setDownloads({
        diagzone: grouped.diagzone || [],
        xpro: grouped.xpro || [],
        xdiag: grouped.xdiag || [],
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDownloads();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    const toastId = showLoading("Eliminando...");
    const { error } = await supabase.from("downloads").delete().eq("id", deleteId);
    dismissToast(toastId);
    if (error) {
      showError(`Error al eliminar: ${error.message}`);
    } else {
      showSuccess("¡Eliminado con éxito!");
      fetchDownloads();
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
                onEditSuccess={fetchDownloads}
                onDelete={() => setDeleteId(download.id!)}
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
                <DownloadForm onSuccess={fetchDownloads}>
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