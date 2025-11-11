import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DownloadCard } from "@/components/DownloadCard";

const downloads = [
  {
    title: "APK ESTABLE",
    version: "DIAGZONE_PRO_V2_200027",
    fileUrl: "/diagzone_stable.apk",
    fileName: "diagzone_stable.apk",
  },
  {
    title: "ÚLTIMA VERSIÓN DE APK",
    version: "DIAGZONE VERSIÓN 2.00.0033",
    fileUrl: "/diagzone_latest.apk",
    fileName: "diagzone_latest.apk",
  },
  {
    title: "BASE DE DIAGNÓSTICO",
    version: "DIAGBASESERVICE_APP_V1_00_010_ES_DZPRO",
    fileUrl: "/diagzone_diagbase.apk",
    fileName: "diagzone_diagbase.apk",
  },
  {
    title: "RECONOCIMIENTO DEL VIN",
    version: "VERSIÓN 1.00.005",
    fileUrl: "/diagzone_vin_recognition.apk",
    fileName: "diagzone_vin_recognition.apk",
  },
];

const DownloadsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 md:py-20 bg-muted/30">
        <div className="container">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Descargas de Aplicaciones</h1>
            <p className="text-lg text-muted-foreground">Descargue las últimas versiones de nuestro software.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {downloads.map((download) => (
              <DownloadCard key={download.title} {...download} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DownloadsPage;