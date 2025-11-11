import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type CompatibilityData = {
  [category: string]: {
    [subCategory: string]: string[];
  };
};

interface CompatibilityAccordionProps {
  data: string;
}

const parseData = (rawData: string): CompatibilityData => {
  const lines = rawData.split('\n').filter(line => line.trim() !== '');
  const structuredData: CompatibilityData = {};
  let currentCategory = '';
  let currentSubCategory = '';

  for (const line of lines) {
    if (line.startsWith('-> ')) {
      currentCategory = line.substring(3).trim();
      structuredData[currentCategory] = {};
    } else if (line.startsWith('\t') && !line.startsWith('\t\t')) {
      currentSubCategory = line.trim();
      if (currentCategory) {
        structuredData[currentCategory][currentSubCategory] = [];
      }
    } else if (line.startsWith('\t\t')) {
      if (currentCategory && currentSubCategory) {
        structuredData[currentCategory][currentSubCategory].push(line.trim());
      }
    }
  }
  return structuredData;
};

export const CompatibilityAccordion = ({ data }: CompatibilityAccordionProps) => {
  const structuredData = parseData(data);

  return (
    <Accordion type="multiple" className="w-full">
      {Object.entries(structuredData).map(([category, subCategories], catIndex) => (
        <AccordionItem value={`category-${catIndex}`} key={catIndex}>
          <AccordionTrigger className="text-lg font-semibold bg-muted/50 px-4 rounded-md">
            {category}
          </AccordionTrigger>
          <AccordionContent className="pt-2">
            <Accordion type="multiple" className="w-full space-y-2">
              {Object.entries(subCategories).map(([subCategory, items], subCatIndex) => (
                <AccordionItem value={`subcategory-${catIndex}-${subCatIndex}`} key={subCatIndex} className="border rounded-md px-4">
                  <AccordionTrigger>{subCategory}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm">{item.replace(/\s+/g, ' ')}</li>
                      ))}
                    </ul>
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