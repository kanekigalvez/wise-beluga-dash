import { MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-card border-t border-border/40 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <img src="/logo.jpg" alt="DiagZone Pro Logo" className="h-10 mb-4" />
            <p className="text-sm text-muted-foreground">
              {t('footer.description')}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-secondary">{t('footer.contact')}</h4>
            <div className="space-y-4">
              <a href="https://wa.me/17168156081" target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button className="bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg transition-shadow">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {t('footer.chat_button')}
                </Button>
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{t('footer.location')}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>{t('footer.copyright')}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">{t('footer.terms')}</a>
              <a href="#" className="hover:text-primary transition-colors">{t('footer.privacy')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};