import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { blogPosts } from "../blog/posts";
import NotFound from "./NotFound";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <NotFound />;
  }

  const PostComponent = post.component;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 md:py-20 bg-muted/30">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <Button asChild variant="outline">
              <Link to="/blogs" className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Blog
              </Link>
            </Button>
          </div>
          <div className="bg-card p-6 sm:p-8 md:p-12 rounded-lg border border-border">
            <PostComponent />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;