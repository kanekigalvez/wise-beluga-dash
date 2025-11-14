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
import { showError, showSuccess } from "@/utils/toast";
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

const DOWNLOADS_STORAGE_KEY = "diagzone_downloads";

// Initial data for local state management
const initialDownloads: Download[] = [
  { id: "1", title: "VERSIÓN ESTABLE", version: "DIAGZONE_PRO_V2_200027", file_url: "https://download1510.mediafire.com/0021abypkgrgfGYNnDKNeXnb4mtbtlhnvI4f2JBzQTnaVd6ZAy45fxHY-Z9y_oUw8731FPU07zEDO9xHnHwj2FkoJmqoVvGt5I3hK223ZXZYQff4rG74Piy1ZHwuXc1FfUgxGqyFI3zIym5Wd09ip1mqu4S9wlV-iHSK-uAt1Vk/qoy4blfb41b13hg/DIAGZONE_PRO_V2_200027+%282%29.apk", file_name: "DIAGZONE_PRO_V2_200027.apk", category: 'diagzone' },
  { id: "2", title: "ÚLTIMA VERSIÓN", version: "DIAGZONE_PRO_V2_200030", file_url: "https://download2302.mediafire.com/jnlyrpvs6dmgEJX8Be2Wb0SKjtlJxdUHViDZo4m6-pl4pRJ6Dwr97CjtUZuQvOiEJc17tbSqs5JtdQ8MiIMmV7vL5VdE2p9Fadwy4iWqORvasQ0NGhbVvTSNyGCuvx8hy-F9Lw2kqHmMAmO6lhK13ykQzbTC3IpjAo1RhvYfFQs/ku5m4i4qwug0s3i/DIAGZONE_PRO_V2_200030.apk", file_name: "DIAGZONE_PRO_V2_200030.apk", category: 'diagzone' },
  { id: "3", title: "X-PRO5", version: "X-pro5_213_auth", file_url: "https://download851.mediafire.com/7lmqvcppz0mgAKeIa_9JCtxQBvD_4qzcgaXYB4myTdwC6jqW1HCNV3aictmz3kZJhzZCnOZCBJo7l047FQqk-jZum3Pgn8rTeL2QqzysnJ_sZQZxLtvuQVZtqzsHmeIMJ6zKYwH1IiOlCghaaPhTQkAzJ1NE1aopWA26NwT4mcQ/4b48lx0ra6z3gop/X-pro5_213_auth.apk", file_name: "X-pro5_213_auth.apk", category: 'xpro' },
  { id: "4", title: "PRODIAG", version: "X431PRO3SPLUS_APP_V8_00_236_EN", file_url: "https://download937.mediafire.com/10wnl43ccywgwAPCuSWsG4xRPgMEaDowY98Stdnb-0QvgivknCLQ6fbeP41H3t8wskZl_nOtkx0RGQO4cmVBolkM_ui-4ZOzYAugiLvXokH4z_TF8AaDJMY-NThLiyALj2KdrnBZb6UXajUgXr8ePJgEuJJ_HA9ibp0vyzEVaxo/tu4wlhb6uvj23ma/X431PRO3SPLUS_APP_V8_00_236_EN.apk", file_name: "X431PRO3SPLUS_APP_V8_00_236_EN.apk", category: 'xpro' },
  { id: "5", title: "X-DIAG", version: "X-DIAG_V7.00.012-release", file_url: "https://download1527.mediafire.com/h4r73k7ieksgJwOvN2dTWhi0E4AYIu22E7ZLfVgO2snrLmegixsuQJstrHGiMhK_VaUGNh0Emjpui1i8uG_ML8K2zH1zSz3-lfg-wEDmYDVx1VU9zlAs25ZbuJ0x8534BjkFCsW80jMewirPtT4dGBNVsQV28POMHPQ21xXvG1k/rz96qycgkbvvsrb/X-DIAG_V7.00.012-release.apk", file_name: "X-DIAG_V7.00.012-release.apk", category: 'xdiag' },
];

// Function to initialize state from localStorage or default data
const initializeDownloads = (): Download[] => {
  try {
    const storedDownloads = localStorage.getItem(DOWNLOADS_STORAGE_KEY);
    if (storedDownloads) {
      return JSON.parse(storedDownloads);
    }
  } catch (error) {
    console.error("Error reading downloads from localStorage:", error);
  }
  // If no data or error, use initial data and save it
  try {
    localStorage.setItem(DOWNLOADS_STORAGE_KEY, JSON.stringify(initialDownloads));
  } catch (error) {
    console.error("Error writing initial downloads to localStorage:", error);
  }
  return initialDownloads;
};

const DownloadsPage = () => {
  const { t } = useTranslation();
  const { isAdmin } = useAdmin();
  const [allDownloads, setAllDownloads] = useState<Download[]>(initializeDownloads);
  const [loading, setLoading] = useState(false); // Keep loading state for consistency, though not strictly needed for local data
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Helper to update state and localStorage
  const updateDownloads = (newDownloads: Download[]) => {
    setAllDownloads(newDownloads);
    try {
      localStorage.setItem(DOWNLOADS_STORAGE_KEY, JSON.stringify(newDownloads));
    } catch (error) {
      showError("Error al guardar los cambios en el navegador.");
      console.error("Error saving downloads to localStorage:", error);
    }
  };

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

  const handleSave = (values: Omit<Download, 'id'>, existingId?: string) => {
    if (existingId) {
      // Edit existing download
      const newDownloads = allDownloads.map(d => d.id === existingId ? { ...d, ...values } : d);
      updateDownloads(newDownloads);
      showSuccess("¡Actualizado con éxito!");
    } else {
      // Add new download
      const newDownload: Download = {
        ...values,
        // Generate a unique ID based on current timestamp for new items
        id: Date.now().toString(), 
      };
      updateDownloads([...allDownloads, newDownload]);
      showSuccess("¡Guardado con éxito!");
    }
  };

  const handleDelete = () => {
    if (!deleteId) return;
    const newDownloads = allDownloads.filter(d => d.id !== deleteId);
    updateDownloads(newDownloads);
    showSuccess("¡Eliminado con éxito!");
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