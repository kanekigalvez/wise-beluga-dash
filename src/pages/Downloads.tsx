import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DownloadCard } from "@/components/DownloadCard";

const downloads = [
  {
    title: "APK ESTABLE",
    version: "DIAGZONE_PRO_V2_200027",
    fileUrl: "/diagzone_stable.apk",
    fileName: "diagzone_stable.apk",
    buttonClass: "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600",
    titleClass: "text-indigo-500",
  },
  {
    title: "ÚLTIMA VERSIÓN DE APK",
    version: "DIAGZONE VERSIÓN 2.00.0033",
    fileUrl: "/diagzone_latest.apk",
    fileName: "diagzone_latest.apk",
    buttonClass: "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600",
    titleClass: "text-green-500",
  },
  {
    title: "BASE DE DIAGNÓSTICO",
    version: "DIAGBASESERVICE_APP_V1_00_010_ES_DZPRO",
    fileUrl: "/diagzone_diagbase.apk",
    fileName: "diagzone_diagbase.apk",
    buttonClass: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
    titleClass: "text-amber-500",
  },
  {
    title: "RECONOCIMIENTO DEL VIN",
    version: "VERSIÓN 1.00.005",
    fileUrl: "/diagzone_vin_recognition.apk",
    fileName: "diagzone_vin_recognition.apk",
    buttonClass: "bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600",
    titleClass: "text-red-500",
  },
];

const DownloadsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 md:py-20 bg-muted/30">
        <div className="container">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Descargas de Aplicaciones</h1>
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