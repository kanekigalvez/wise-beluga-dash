import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { blogPosts } from "../blog/posts";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const BlogsPage = () => {
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.slug} className="flex flex-col justify-between bg-card border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-primary">{post.title}</CardTitle>
                  <CardDescription>
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <div className="p-6 pt-0">
                  <Button asChild variant="outline" className="w-full group border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground">
                    <Link to={`/blogs/${post.slug}`}>
                      Leer más
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogsPage;