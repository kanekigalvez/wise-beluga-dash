import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { showError, showSuccess, showLoading, dismissToast } from "@/utils/toast";
import { Pencil, Save } from "lucide-react";

interface EditableProductDetailsProps {
  softwareId: string;
  productName: string;
}

export const EditableProductDetails = ({ softwareId, productName }: EditableProductDetailsProps) => {
  const [description, setDescription] = useState("");
  const [initialDescription, setInitialDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("product_details")
        .select("description")
        .eq("slug", softwareId)
        .single();

      if (data?.description) {
        setDescription(data.description);
        setInitialDescription(data.description);
      } else {
        setDescription("");
        setInitialDescription("");
      }
      setLoading(false);
    };

    fetchDetails();
  }, [softwareId]);

  const handleSave = async () => {
    const toastId = showLoading("Guardando...");
    const { error } = await supabase
      .from("product_details")
      .upsert({ slug: softwareId, description: description });

    dismissToast(toastId);

    if (error) {
      showError("Error: Para guardar cambios, necesitas iniciar sesión.");
    } else {
      showSuccess("¡Guardado con éxito!");
      setInitialDescription(description);
      setIsEditing(false);
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

  return (
    <div className="p-6 w-full h-[70vh] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{productName} - Características</h2>
        {!isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => {
              setDescription(initialDescription);
              setIsEditing(false);
            }}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Guardar
            </Button>
          </div>
        )}
      </div>
      {isEditing ? (
        <Textarea
          className="flex-grow text-base"
          placeholder="Agrega aquí las características, compatibilidad y otros detalles del producto..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      ) : (
        <div className="prose prose-sm max-w-none flex-grow rounded-md border p-4 bg-muted/50 overflow-y-auto">
          {description ? (
            <p style={{ whiteSpace: 'pre-wrap' }}>{description}</p>
          ) : (
            <p className="text-muted-foreground">Aún no se han agregado características para este producto. Haz clic en "Editar" para comenzar.</p>
          )}
        </div>
      )}
       <p className="text-xs text-muted-foreground mt-4">
        Nota: Para guardar los cambios es necesario iniciar sesión.
      </p>
    </div>
  );
};