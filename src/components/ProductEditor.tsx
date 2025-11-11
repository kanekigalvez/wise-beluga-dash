import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { showSuccess, showError, showLoading, dismissToast } from "@/utils/toast";

interface ProductEditorProps {
  productSlug: string;
  productName: string;
}

export const ProductEditor = ({ productSlug, productName }: ProductEditorProps) => {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("product_notes")
        .select("notes")
        .eq("product_slug", productSlug)
        .single();

      if (data?.notes) {
        setNotes(data.notes);
      } else {
        setNotes(""); // Start with a blank sheet if no notes exist
      }
      
      if (error && error.code !== 'PGRST116') { // PGRST116: single row not found, which is fine
        console.error("Error fetching notes:", error);
        showError("No se pudieron cargar las notas.");
      }

      setLoading(false);
    };

    fetchNotes();
  }, [productSlug]);

  const handleSave = async () => {
    setSaving(true);
    const toastId = showLoading("Guardando...");

    const { error } = await supabase
      .from("product_notes")
      .upsert({ product_slug: productSlug, notes: notes });

    dismissToast(toastId);
    setSaving(false);

    if (error) {
      console.error("Error saving notes:", error);
      showError("Error al guardar las notas.");
    } else {
      showSuccess("Notas guardadas correctamente.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="w-full h-[80vh] bg-background rounded-lg overflow-hidden flex flex-col p-4 gap-4">
      <div>
        <h2 className="text-2xl font-bold">Editor de Producto</h2>
        <p className="text-lg text-muted-foreground">
          Editando notas para: <span className="font-semibold text-primary">{productName}</span>
        </p>
      </div>
      <Textarea
        placeholder="Escribe aquí..."
        className="flex-grow resize-none text-base"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Guardar
        </Button>
      </div>
    </div>
  );
};