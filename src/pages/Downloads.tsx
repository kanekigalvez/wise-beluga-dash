import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DownloadCard } from "@/components/DownloadCard";

const downloads = [
  {
    title: "VERSIÓN ESTABLE",
    version: "DIAGZONE_PRO_V2_200027",
    fileUrl: "https://download1510.mediafire.com/0021abypkgrgfGYNnDKNeXnb4mtbtlhnvI4f2JBzQTnaVd6ZAy45fxHY-Z9y_oUw8731FPU07zEDO9xHnHwj2FkoJmqoVvGt5I3hK223ZXZYQff4rG74Piy1ZHwuXc1FfUgxGqyFI3zIym5Wd09ip1mqu4S9wlV-iHSK-uAt1Vk/qoy4blfb41b13hg/DIAGZONE_PRO_V2_200027+%282%29.apk",
    fileName: "DIAGZONE_PRO_V2_200027.apk",
  },
  {
    title: "ÚLTIMA VERSIÓN",
    version: "DIAGZONE_PRO_V2_200030",
    fileUrl: "https://download2302.mediafire.com/jnlyrpvs6dmgEJX8Be2Wb0SKjtlJxdUHViDZo4m6-pl4pRJ6Dwr97CjtUZuQvOiEJc17tbSqs5JtdQ8MiIMmV7vL5VdE2p9Fadwy4iWqORvasQ0NGhbVvTSNyGCuvx8hy-F9Lw2kqHmMAmO6lhK13ykQzbTC3IpjAo1RhvYfFQs/ku5m4i4qwug0s3i/DIAGZONE_PRO_V2_200030.apk",
    fileName: "DIAGZONE_PRO_V2_200030.apk",
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