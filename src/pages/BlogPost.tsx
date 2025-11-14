import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import NotFound from "./NotFound";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BlogForm, type Post } from "@/components/BlogForm";
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
import { showError, showSuccess, showLoading, dismissToast } from "@/utils/toast";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const fetchPost = async () => {
    if (!slug) {
      setNotFound(true);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).single();
    if (error || !data) {
      console.error(error);
      setNotFound(true);
    } else {
      setPost(data as Post);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const handleDelete = async () => {
    if (!post?.id) return;
    const toastId = showLoading("Eliminando post...");
    const { error } = await supabase.from("posts").delete().eq("id", post.id);
    dismissToast(toastId);
    if (error) {
      showError(`Error al eliminar: ${error.message}`);
    } else {
      showSuccess("¡Post eliminado!");
      navigate("/blogs");
    }
    setIsDeleteDialogOpen(false);
  };

  if (notFound) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 md:py-20 bg-muted/30">
        <div className="container max-w-4xl">
          <div className="mb-8 flex justify-between items-center">
            <Button asChild variant="outline">
              <Link to="/blogs" className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Blog
              </Link>
            </Button>
            {isAdmin && post && (
              <div className="flex gap-2">
                <BlogForm post={post} onSuccess={fetchPost}>
                  <Button variant="outline">
                    <Pencil className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                </BlogForm>
                <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </Button>
              </div>
            )}
          </div>
          <div className="bg-card p-6 sm:p-8 md:p-12 rounded-lg border border-border">
            {loading ? (
              <div className="space-y-6">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <br />
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              post && (
                <article className="prose prose-sm sm:prose-base max-w-none prose-invert prose-headings:text-primary prose-a:text-secondary hover:prose-a:text-primary">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {post.content}
                  </ReactMarkdown>
                </article>
              )
            )}
          </div>
        </div>
      </main>
      <Footer />
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente la entrada del blog.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogPostPage;