import { useEffect, useState, ChangeEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { showError, showSuccess, showLoading, dismissToast } from "@/utils/toast";
import { Pencil, Save, Upload } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAdmin } from "@/contexts/AdminContext";

interface EditableProductDetailsProps {
  softwareId: string;
  productName: string;
  currentImageUrl: string;
  onSuccess?: () => void;
}

export const EditableProductDetails = ({ softwareId, productName, currentImageUrl, onSuccess }: EditableProductDetailsProps) => {
  const { isAdmin } = useAdmin();
  const [description, setDescription] = useState("");
  const [initialDescription, setInitialDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("product_details")
        .select("description, image_url")
        .eq("slug", softwareId)
        .single();

      const desc = data?.description || "";
      setDescription(desc);
      setInitialDescription(desc);
      setImagePreview(data?.image_url || currentImageUrl);
      
      setLoading(false);
    };

    fetchDetails();
  }, [softwareId, currentImageUrl]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    const toastId = showLoading("Guardando...");
    let newImageUrl: string | null = null;

    if (imageFile) {
      const filePath = `${softwareId}-${Date.now()}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("product_images")
        .upload(filePath, imageFile);

      if (uploadError) {
        dismissToast(toastId);
        showError("Error al subir la imagen: " + uploadError.message);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("product_images")
        .getPublicUrl(uploadData.path);
      
      newImageUrl = urlData.publicUrl;
    }

    const upsertData: { slug: string; description: string; image_url?: string } = {
      slug: softwareId,
      description: description,
    };

    if (newImageUrl) {
      upsertData.image_url = newImageUrl;
    }

    const { error: dbError } = await supabase
      .from("product_details")
      .upsert(upsertData, { onConflict: 'slug' });

    dismissToast(toastId);

    if (dbError) {
      showError("Error al guardar los detalles: " + dbError.message);
    } else {
      showSuccess("¡Guardado con éxito!");
      setInitialDescription(description);
      setIsEditing(false);
      onSuccess?.();
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  const renderEditControls = () => {
    if (!isEditing && !isAdmin) return null;
    if (!isEditing && isAdmin) {
      return (
        <Button variant="outline" onClick={() => setIsEditing(true)}>
          <Pencil className="mr-2 h-4 w-4" />
          Editar
        </Button>
      );
    }

    return (
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => {
          setDescription(initialDescription);
          setIsEditing(false);
          setImageFile(null);
          setImagePreview(currentImageUrl);
        }}>
          Cancelar
        </Button>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Guardar
        </Button>
      </div>
    );
  };

  const renderDescription = () => {
    if (productName === "iDiag for Android" && description) {
      const sections = description.split('\n\n').map((section, index) => {
        const lines = section.trim().split('\n');
        const title = lines[0];
        const content = lines.slice(1).join('\n');
        if (!title) return null;
        return { id: `item-${index}`, title, content };
      }).filter(Boolean);

      if (sections.length > 0) {
        return (
          <div className="flex-grow rounded-md border bg-muted/50 overflow-y-auto">
            <Accordion type="multiple" className="w-full p-4">
              {sections.map(section => (
                section && (
                  <AccordionItem value={section.id} key={section.id}>
                    <AccordionTrigger>{section.title}</AccordionTrigger>
                    <AccordionContent>
                      <p className="prose prose-sm max-w-none" style={{ whiteSpace: 'pre-wrap' }}>{section.content}</p>
                    </AccordionContent>
                  </AccordionItem>
                )
              ))}
            </Accordion>
          </div>
        );
      }
    }

    return (
      <div className="prose prose-sm max-w-none flex-grow rounded-md border p-4 bg-muted/50 overflow-y-auto">
        {description ? (
          <p style={{ whiteSpace: 'pre-wrap' }}>{description}</p>
        ) : (
          <p className="text-muted-foreground">Aún no se han agregado características para este producto. Haz clic en "Editar" para comenzar.</p>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 w-full h-[80vh] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{productName} - Características</h2>
        {renderEditControls()}
      </div>
      {isEditing ? (
        <>
          {isAdmin && (
            <div className="mb-4 p-4 border rounded-md bg-muted/50">
              <h3 className="font-semibold mb-2">Modo Administrador: Cambiar Imagen</h3>
              {imagePreview && (
                <div className="mb-2 flex justify-center">
                  <img src={imagePreview} alt="Vista previa" className="max-h-40 rounded-md object-contain" />
                </div>
              )}
              <div className="flex items-center gap-2">
                <label htmlFor="image-upload" className="flex-grow">
                  <Button asChild variant="outline" className="w-full cursor-pointer">
                    <span>
                      <Upload className="mr-2 h-4 w-4" />
                      Seleccionar Imagen
                    </span>
                  </Button>
                </label>
                <Input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          )}
          <Textarea
            className="flex-grow text-base"
            placeholder={
              productName === "iDiag for Android"
                ? "Escribe un título, deja una línea en blanco y luego el contenido. Repite para cada sección para crear el menú plegable."
                : "Agrega aquí las características, compatibilidad y otros detalles del producto..."
            }
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </>
      ) : (
        renderDescription()
      )}
    </div>
  );
};