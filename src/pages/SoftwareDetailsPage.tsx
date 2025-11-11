import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { softwareDetailsData } from "@/data/softwareDetails";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface SoftwareItem {
  name: string;
  version: string;
  issueDate: string;
  duration: string;
}

interface Category {
  title: string;
  items: SoftwareItem[];
}

interface Section {
  title: string;
  categories: Category[];
}

const parseSoftwareData = (data: string): Section[] => {
  const sections = data.split(/(?=Passenger cars|Electric cars|Heavy Duty Truck|IMMO|Automóviles de pasajeros|Turismos \+ Vehículos eléctricos|coches eléctricos|Camión de servicio pesado|Suscripción)/g).filter(s => s.trim());
  
  return sections.map(sectionText => {
    const lines = sectionText.trim().split('\n');
    const sectionTitle = lines.shift()?.replace(/\d+\s*\$?(\s*dólares)?/g, '').trim() || "Detalles";
    
    const categories: Category[] = [];
    let currentCategory: Category | null = null;

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;

      // Check if it's a category title (e.g., "System", "Popular", "Other")
      if (!trimmedLine.match(/(\d+\.\d+)|(\d+\s+(months|meses|semanas|weeks))/)) {
        if (currentCategory) {
          categories.push(currentCategory);
        }
        currentCategory = { title: trimmedLine, items: [] };
        continue;
      }
      
      if (currentCategory) {
        // It's a software item line
        const parts = trimmedLine.split(/\s+/);
        const dateKeywordIndex = parts.findIndex(p => /^(issue|edición|número)$/i.test(p));

        if (dateKeywordIndex > -1 && dateKeywordIndex > 0) {
            const version = parts[dateKeywordIndex - 1];
            const name = parts.slice(0, dateKeywordIndex - 1).join(' ');
            
            const durationUnitIndex = parts.findIndex(p => ['months', 'meses', 'semanas', 'weeks'].includes(p.toLowerCase()));
            
            if (durationUnitIndex > -1) {
                const date = parts.slice(dateKeywordIndex, durationUnitIndex - 1).join(' ').replace(/issue|Edición del|Edición|Número/ig, '').trim();
                const duration = `${parts[durationUnitIndex - 1]} ${parts[durationUnitIndex]}`;

                currentCategory.items.push({
                    name,
                    version,
                    issueDate: date,
                    duration,
                });
            }
        }
      }
    }
    if (currentCategory) {
      categories.push(currentCategory);
    }

    return { title: sectionTitle, categories };
  });
};


const SoftwareDetailsPage = () => {
  const { softwareId } = useParams<{ softwareId: string }>();
  const softwareData = softwareId ? softwareDetailsData[softwareId] : undefined;

  if (!softwareData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Software no encontrado</h1>
          <p className="text-muted-foreground mb-8">No pudimos encontrar los detalles para el software solicitado.</p>
          <Button asChild>
            <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Volver al Inicio</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const parsedData = parseSoftwareData(softwareData);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-12">
        <div className="mb-8">
          <Button asChild variant="outline">
            <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Volver</Link>
          </Button>
        </div>
        <h1 className="text-4xl font-bold mb-2">Cobertura de Software</h1>
        <p className="text-lg text-muted-foreground mb-8">Detalles para: <span className="font-semibold text-primary">{softwareId?.replace(/-/g, ' ').toUpperCase()}</span></p>

        <div className="space-y-8">
          {parsedData.map((section, sectionIndex) => (
            <Card key={sectionIndex}>
              <CardHeader>
                <CardTitle className="text-2xl">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {section.categories.map((category, catIndex) => (
                  <div key={catIndex}>
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2">{category.title}</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Marca/Software</TableHead>
                          <TableHead>Versión</TableHead>
                          <TableHead>Fecha</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {category.items.map((item, itemIndex) => (
                          <TableRow key={itemIndex}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.version}</TableCell>
                            <TableCell>{item.issueDate}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SoftwareDetailsPage;