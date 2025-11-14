import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react"; // Import useEffect

const formSchema = z.object({
  title: z.string().min(1, "El título es requerido."),
  version: z.string().min(1, "La versión es requerida."),
  file_url: z.string().url("Debe ser una URL válida."),
  file_name: z.string().min(1, "El nombre del archivo es requerido."),
  category: z.enum(["diagzone", "xpro", "xdiag"], {
    required_error: "La categoría es requerida.",
  }),
});

export type Download = {
  id: string; // ID is now mandatory for local management
  title: string;
  version: string;
  file_url: string;
  file_name: string;
  category: 'diagzone' | 'xpro' | 'xdiag';
};

interface DownloadFormProps {
  download?: Download;
  onSave: (values: z.infer<typeof formSchema>) => void;
  children: React.ReactNode;
}

export const DownloadForm = ({ download, onSave, children }: DownloadFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isEditing = !!download;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: download?.title || "",
      version: download?.version || "",
      file_url: download?.file_url || "",
      file_name: download?.file_name || "",
      category: download?.category || "diagzone",
    },
  });

  // Effect to set default value for file_url when the dialog opens
  useEffect(() => {
    if (isOpen && !isEditing && !form.getValues("file_url")) {
      form.setValue("file_url", "https://", { shouldValidate: false });
    }
  }, [isOpen, isEditing, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSave(values);
    setIsOpen(false);
    if (!isEditing) form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Descarga" : "Agregar Nueva Descarga"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="VERSIÓN ESTABLE" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="version"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Versión</FormLabel>
                  <FormControl>
                    <Input placeholder="DIAGZONE_PRO_V2_200027" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL del Archivo</FormLabel>
                  <FormControl>
                    <Input placeholder="https://mediafire.com/archivo.apk" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Archivo</FormLabel>
                  <FormControl>
                    <Input placeholder="DIAGZONE_PRO.apk" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="diagzone">DiagZone</SelectItem>
                      <SelectItem value="xpro">X-PRO</SelectItem>
                      <SelectItem value="xdiag">X-DIAG</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};