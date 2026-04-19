"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Code2, Globe, Cpu } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SoftwareDevelopmentSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* Custom Software Section */}
        <div id="software-custom" className="text-center mb-12 scroll-mt-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            {t('software_section.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('software_section.subtitle')}
          </p>
          <div className="w-24 h-px bg-primary/50 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          <div className="flex flex-col items-center p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all">
            <div className="mb-4 p-3 bg-primary/10 rounded-full text-primary">
              <Cpu className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">Software a Medida</h3>
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <a href="https://novatechvirtualwebs.vercel.app" target="_blank" rel="noopener noreferrer">
                {t('software_section.custom_button')}
              </a>
            </Button>
          </div>

          <div className="flex flex-col items-center p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all">
            <div className="mb-4 p-3 bg-primary/10 rounded-full text-primary">
              <Globe className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">Desarrollo Web Profesional</h3>
            <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
              <a href="https://formganador.vercel.app/" target="_blank" rel="noopener noreferrer">
                {t('software_section.web_button')}
              </a>
            </Button>
          </div>
        </div>

        {/* Free Software Section */}
        <div id="software-free" className="text-center mb-12 scroll-mt-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">
            {t('software_section.free_software')}
          </h2>
          <div className="w-24 h-px bg-secondary/50 mx-auto mt-4"></div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center p-8 bg-card border border-border rounded-xl hover:border-secondary/50 transition-all text-center">
            <div className="mb-4 p-3 bg-secondary/10 rounded-full text-secondary">
              <Code2 className="h-8 w-8" />
            </div>
            <p className="text-muted-foreground mb-6">
              Apoyamos y creamos soluciones basadas en tecnologías abiertas y colaborativas para democratizar el acceso al software de calidad.
            </p>
            <Button variant="secondary" className="px-8">
              Explorar Proyectos Libres
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};