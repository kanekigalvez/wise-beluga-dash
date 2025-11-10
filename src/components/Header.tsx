import { Button } from "@/components/ui/button";
import { Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold">
            <Link to="/">
              <span className="text-primary">DIAG</span>
              <span className="text-secondary-foreground">ZONE</span>
              <span className="text-xs font-normal text-muted-foreground ml-1">PRO</span>
            </Link>
          </h1>
          <nav className="hidden md:flex gap-6">
            <a href="/#inicio" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Inicio</a>
            <a href="/#productos" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Conectores</a>
            <a href="/#buscar" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Buscar DTC</a>
            <a href="/#compatibilidad" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Compatibilidad</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};