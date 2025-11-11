import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMemo } from "react";

interface CompatibilityAccordionProps {
  rawData: string;
}

interface ParsedItem {
  name: string;
  version: string;
  date: string;
  duration: string;
}

interface ParsedSubCategory {
  name: string;
  items: ParsedItem[];
}

interface ParsedCategory {
  name: string;
  subCategories: ParsedSubCategory[];
}

const parseRawData = (data: string): ParsedCategory[] => {
  const lines = data.trim().split('\n');
  const categories: ParsedCategory[] = [];
  let currentCategory: ParsedCategory | null = null;
  let currentSubCategory: ParsedSubCategory | null = null;

  lines.forEach(line => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;

    const indentLevel = line.search(/\S|$/);

    if (trimmedLine.startsWith('->')) {
      currentCategory = { name: trimmedLine.substring(2).trim(), subCategories: [] };
      categories.push(currentCategory);
      currentSubCategory = null;
    } else if (currentCategory && indentLevel < 8 && indentLevel > 0) { 
      currentSubCategory = { name: trimmedLine, items: [] };
      currentCategory.subCategories.push(currentSubCategory);
    } else if (currentSubCategory && indentLevel >= 8) {
      const parts = trimmedLine.split('\t').map(p => p.trim()).filter(Boolean);
      if (parts.length >= 4) {
        currentSubCategory.items.push({
          name: parts[0],
          version: parts[1],
          date: parts[2],
          duration: parts[3],
        });
      }
    }
  });

  return categories;
};


export const CompatibilityAccordion = ({ rawData }: CompatibilityAccordionProps) => {
  const parsedData = useMemo(() => parseRawData(rawData), [rawData]);

  if (parsedData.length === 0) {
    return <p>No hay datos de compatibilidad disponibles.</p>;
  }

  return (
    <Accordion type="multiple" className="w-full">
      {parsedData.map((category, catIndex) => (
        <AccordionItem value={`category-${catIndex}`} key={catIndex}>
          <AccordionTrigger className="text-lg font-semibold hover:no-underline">
            {category.name}
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type="multiple" className="w-full pl-4 border-l">
              {category.subCategories.map((subCategory, subIndex) => (
                <AccordionItem value={`subcategory-${catIndex}-${subIndex}`} key={subIndex}>
                  <AccordionTrigger className="font-medium">{subCategory.name}</AccordionTrigger>
                  <AccordionContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                          <tr>
                            <th scope="col" className="px-6 py-3">Marca</th>
                            <th scope="col" className="px-6 py-3">Versión</th>
                            <th scope="col" className="px-6 py-3">Fecha</th>
                            <th scope="col" className="px-6 py-3">Duración</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subCategory.items.map((item, itemIndex) => (
                            <tr key={itemIndex} className="border-b">
                              <td className="px-6 py-4 font-medium whitespace-nowrap">{item.name}</td>
                              <td className="px-6 py-4">{item.version}</td>
                              <td className="px-6 py-4">{item.date}</td>
                              <td className="px-6 py-4">{item.duration}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};