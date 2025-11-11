export interface ProductCompatibilityInfo {
  product_name: string;
  data: string;
}

// This regex will find lines like "Product Name (96919xxxxx)"
// It captures the product name and the prefix.
const HEADER_REGEX = /^(.*?)\s*\((\d{5,}[xX]*)\)/;

export async function fetchAndParseCompatibilityData(prefix: string): Promise<ProductCompatibilityInfo | null> {
  try {
    const response = await fetch('/base de datos productos.txt');
    if (!response.ok) {
      throw new Error('Failed to fetch compatibility data');
    }
    const text = await response.text();
    const lines = text.split('\n');

    let productData: { name: string; startIndex: number } | null = null;
    let nextProductStartIndex: number | null = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(HEADER_REGEX);

      if (match) {
        const linePrefix = match[2].substring(0, 5);
        const productName = match[1].trim();

        if (linePrefix === prefix) {
          productData = { name: productName, startIndex: i };
        } else if (productData && !nextProductStartIndex) {
          // We found the start of the *next* product
          nextProductStartIndex = i;
          break; // Stop searching once we have what we need
        }
      }
    }

    if (!productData) {
      return null; // Product prefix not found
    }

    const start = productData.startIndex + 1;
    const end = nextProductStartIndex !== null ? nextProductStartIndex : lines.length;
    const dataLines = lines.slice(start, end);
    
    // Filter out any potential empty lines at the end
    while (dataLines.length > 0 && dataLines[dataLines.length - 1].trim() === '') {
      dataLines.pop();
    }

    const data = dataLines.join('\n');

    return {
      product_name: productData.name,
      data: data,
    };
  } catch (error) {
    console.error("Error parsing compatibility data:", error);
    return null;
  }
}