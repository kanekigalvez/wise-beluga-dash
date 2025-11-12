import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DownloadCard } from "@/components/DownloadCard";

const diagzoneDownloads = [
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

const xproDownloads = [
  {
    title: "X-PRO5",
    version: "X-pro5_213_auth",
    fileUrl: "https://download851.mediafire.com/7lmqvcppz0mgAKeIa_9JCtxQBvD_4qzcgaXYB4myTdwC6jqW1HCNV3aictmz3kZJhzZCnOZCBJo7l047FQqk-jZum3Pgn8rTeL2QqzysnJ_sZQZxLtvuQVZtqzsHmeIMJ6zKYwH1IiOlCghaaPhTQkAzJ1NE1aopWA26NwT4mcQ/4b48lx0ra6z3gop/X-pro5_213_auth.apk",
    fileName: "X-pro5_213_auth.apk",
  },
  {
    title: "PRODIAG",
    version: "X431PRO3SPLUS_APP_V8_00_236_EN",
    fileUrl: "https://download937.mediafire.com/10wnl43ccywgwAPCuSWsG4xRPgMEaDowY98Stdnb-0QvgivknCLQ6fbeP41H3t8wskZl_nOtkx0RGQO4cmVBolkM_ui-4ZOzYAugiLvXokH4z_TF8AaDJMY-NThLiyALj2KdrnBZb6UXajUgXr8ePJgEuJJ_HA9ibp0vyzEVaxo/tu4wlhb6uvj23ma/X431PRO3SPLUS_APP_V8_00_236_EN.apk",
    fileName: "X431PRO3SPLUS_APP_V8_00_236_EN.apk",
  },
];

const xdiagDownloads = [
  {
    title: "X-DIAG",
    version: "X-DIAG_V7.00.012-release",
    fileUrl: "https://download1527.mediafire.com/h4r73k7ieksgJwOvN2dTWhi0E4AYIu22E7ZLfVgO2snrLmegixsuQJstrHGiMhK_VaUGNh0Emjpui1i8uG_ML8K2zH1zSz3-lfg-wEDmYDVx1VU9zlAs25ZbuJ0x8534BjkFCsW80jMewirPtT4dGBNVsQV28POMHPQ21xXvG1k/rz96qycgkbvvsrb/X-DIAG_V7.00.012-release.apk",
    fileName: "X-DIAG_V7.00.012-release.apk",
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
          
          <div className="space-y-16">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-secondary">DiagZone</h2>
              <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
                {diagzoneDownloads.map((download) => (
                  <DownloadCard key={download.title} {...download} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-secondary">X-PRO</h2>
              <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
                {xproDownloads.map((download) => (
                  <DownloadCard key={download.title} {...download} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-secondary">X-DIAG</h2>
              <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
                {xdiagDownloads.map((download) => (
                  <DownloadCard key={download.title} {...download} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DownloadsPage;