import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { showError, showSuccess, showLoading, dismissToast } from "@/utils/toast";
import { useState, useEffect } from "react";
import { slugify } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres."),
  slug: z.string().min(3, "El slug debe tener al menos 3 caracteres."),
  description: z.string().min(10, "La descripción es muy corta.").max(200, "La descripción es muy larga."),
  content: z.string().min(50, "El contenido es muy corto."),
});

export type Post = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  content: string;
};

interface BlogFormProps {
  post?: Post;
  onSuccess: () => void;
  children: React.ReactNode;
}

export const BlogForm = ({ post, onSuccess, children }: BlogFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isEditing = !!post;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: post || {
      title: "",
      slug: "",
      description: "",
      content: "",
    },
  });

  const titleValue = form.watch("title");
  useEffect(() => {
    if (!isEditing && titleValue) {
      form.setValue("slug", slugify(titleValue), { shouldValidate: true });
    }
  }, [titleValue, isEditing, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toastId = showLoading(isEditing ? "Actualizando post..." : "Creando post...");
    
    const { error } = isEditing
      ? await supabase.from("posts").update(values).eq("id", post.id)
      : await supabase.from("posts").insert(values);

    dismissToast(toastId);

    if (error) {
      showError(`Error: ${error.message}`);
    } else {
      showSuccess(isEditing ? "¡Post actualizado!" : "¡Post creado!");
      onSuccess();
      setIsOpen(false);
      if (!isEditing) form.reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Post" : "Agregar Nuevo Post"}</DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto pr-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="¿Qué es Diagzone y para qué sirve?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug (URL)</FormLabel>
                    <FormControl>
                      <Input placeholder="que-es-diagzone" {...field} disabled={isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción Corta</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Una guía detallada sobre el software Diagzone..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contenido (Markdown)</FormLabel>
                    <FormControl>
                      <Textarea className="min-h-[300px] font-mono" placeholder="# Título principal..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="sticky bottom-0 bg-background py-4">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">Cancelar</Button>
                </DialogClose>
                <Button type="submit">Guardar</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};