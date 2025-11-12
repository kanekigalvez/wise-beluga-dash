import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Search, Car, Download, Home, Wrench, Package, X, Newspaper } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { slugify } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

const allProducts = [
    { name: "Golo ED+" }, { name: "iDiag for Android" }, { name: "TD1" },
    { name: "ED 3.0" }, { name: "BT200" }, { name: "ED V2.0" }, { name: "V" },
    { name: "V Plus" }, { name: "TOPDON" }, { name: "MaxGo" }, { name: "HD IV" },
    { name: "HD III" }, { name: "M-Diag" }, { name: "PRO4 D3" }, { name: "PAD2 D3" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navLinks = [
    { href: "/#inicio", text: t('header.home'), icon: <Home className="mr-2 h-4 w-4" /> },
    { href: "/#productos", text: t('header.connectors'), icon: <Package className="mr-2 h-4 w-4" /> },
    { href: "/#compatibilidad", text: t('header.compatibility'), icon: <Wrench className="mr-2 h-4 w-4" /> },
    { href: "/downloads", text: t('header.downloads'), isLink: true, icon: <Download className="mr-2 h-4 w-4" /> },
    { href: "/blogs", text: t('header.blogs'), isLink: true, icon: <Newspaper className="mr-2 h-4 w-4" /> },
  ];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down as EventListener);
    return () => document.removeEventListener("keydown", down as EventListener);
  }, []);

  const handleNavigation = (path: string) => {
    setIsSearchOpen(false);
    setIsMenuOpen(false);
    navigate(path);
  };

  const renderNavLink = (link: typeof navLinks[0], isMobile = false) => {
    const className = isMobile
      ? "flex items-center w-full p-2 rounded-md text-lg font-medium text-muted-foreground hover:bg-muted hover:text-primary"
      : "text-sm font-medium text-muted-foreground hover:text-primary transition-colors";

    if (link.isLink) {
      return (
        <Link to={link.href} onClick={() => setIsMenuOpen(false)} className={className}>
          {isMobile && link.icon} {link.text}
        </Link>
      );
    }
    return (
      <a href={link.href} onClick={() => setIsMenuOpen(false)} className={className}>
        {isMobile && link.icon} {link.text}
      </a>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/">
              <img src="/logo.jpg" alt="DiagZone Pro Logo" className="h-10" />
            </Link>
            <nav className="hidden md:flex gap-6">
              {navLinks.map(link => renderNavLink(link))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="relative h-9 w-auto justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:w-40 lg:w-64"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4 mr-2" />
              <span className="hidden lg:inline-block">{t('header.search')}</span>
              <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
            <LanguageSwitcher />
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground hover:text-primary">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs">
                <div className="flex items-center justify-between">
                  <Link to="/" onClick={() => setIsMenuOpen(false)}>
                    <img src="/logo.jpg" alt="DiagZone Pro Logo" className="h-10" />
                  </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-2 mt-8">
                  {navLinks.map(link => (
                    <SheetClose asChild key={link.text}>
                      {renderNavLink(link, true)}
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput placeholder="Escribe un comando o busca..." />
        <CommandList>
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          <CommandGroup heading="Navegación">
            {navLinks.map(link => (
              <CommandItem key={link.href} onSelect={() => handleNavigation(link.href)}>
                {link.icon}
                <span>{link.text}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Conectores">
            {allProducts.map(product => (
              <CommandItem key={product.name} onSelect={() => handleNavigation(`/connectors#${slugify(product.name)}`)}>
                <Car className="mr-2 h-4 w-4" />
                <span>{product.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};