import { softwareDetailsData } from "@/data/softwareDetails";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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

      if (!trimmedLine.match(/(\d+\.\d+)|(\d+\s+(months|meses|semanas|weeks))/)) {
        if (currentCategory) {
          categories.push(currentCategory);
        }
        currentCategory = { title: trimmedLine, items: [] };
        continue;
      }
      
      if (currentCategory) {
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

interface SoftwareDetailsProps {
  softwareId: string;
}

export const SoftwareDetails = ({ softwareId }: SoftwareDetailsProps) => {
  const softwareData = softwareId ? softwareDetailsData[softwareId] : undefined;

  if (!softwareData) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Software no encontrado</h2>
        <p className="text-muted-foreground">No pudimos encontrar los detalles para el software solicitado.</p>
      </div>
    );
  }

  const parsedData = parseSoftwareData(softwareData);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Cobertura de Software</h2>
        <p className="text-lg text-muted-foreground">
          Detalles para: <span className="font-semibold text-primary">{softwareId?.replace(/-/g, ' ').toUpperCase()}</span>
        </p>
      </div>

      <div className="max-h-[60vh] overflow-y-auto pr-6 space-y-6">
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
      
      <div className="pt-6 border-t">
        <h3 className="text-xl font-semibold mb-4">Contacto</h3>
        <p className="text-muted-foreground mb-4">Si tienes alguna pregunta o necesitas más información, déjanos un mensaje.</p>
        <Textarea placeholder="Escribe tu mensaje aquí..." className="mb-4" rows={4} />
        <Button>Enviar Mensaje</Button>
      </div>
    </div>
  );
};