import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlusCircle, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import { Skeleton } from "@/components/ui/skeleton";
import { BlogForm, type Post } from "@/components/BlogForm";
import { showError, showSuccess, showLoading, dismissToast } from "@/utils/toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const BlogsPage = () => {
  const { isAdmin } = useAdmin();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    if (error) {
      showError("No se pudieron cargar las entradas del blog.");
      console.error(error);
    } else {
      setPosts(data as Post[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    const toastId = showLoading("Eliminando post...");
    const { error } = await supabase.from("posts").delete().eq("id", deleteId);
    dismissToast(toastId);
    if (error) {
      showError(`Error al eliminar: ${error.message}`);
    } else {
      showSuccess("¡Post eliminado!");
      fetchPosts();
    }
    setDeleteId(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 md:py-20 bg-muted/30">
        <div className="container">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Nuestro Blog</h1>
            <p className="text-lg text-muted-foreground">
              Guías, tutoriales y noticias del mundo del diagnóstico automotriz.
            </p>
            {isAdmin && (
              <div className="mt-6">
                <BlogForm onSuccess={fetchPosts}>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Agregar Nuevo Post
                  </Button>
                </BlogForm>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-5/6" />
                  </CardHeader>
                  <CardFooter>
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              ))
            ) : (
              posts.map((post) => (
                <Card key={post.slug} className="flex flex-col justify-between bg-card border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-primary">{post.title}</CardTitle>
                    <CardDescription>{post.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex flex-col items-stretch gap-2">
                    <Button asChild variant="outline" className="w-full group border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground">
                      <Link to={`/blogs/${post.slug}`}>
                        Leer más
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    {isAdmin && (
                      <div className="flex gap-2">
                        <BlogForm post={post} onSuccess={fetchPosts}>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Pencil className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                        </BlogForm>
                        <Button variant="destructive" size="sm" className="flex-1" onClick={() => setDeleteId(post.id!)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </Button>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente la entrada del blog.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogsPage;