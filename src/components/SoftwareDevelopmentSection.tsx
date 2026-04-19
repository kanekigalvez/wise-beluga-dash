"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Code2, Globe, Cpu } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SoftwareDevelopmentSection = () => {
  const { t } = useTranslation();

  return (
    <section id="software-dev" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            {t('software_section.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('software_section.subtitle')}
          </p>
          <div className="w-24 h-px bg-primary/50 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all">
            <div className="mb-4 p-3 bg-primary/10 rounded-full text-primary">
              <Cpu className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">{t('software_section.title')}</h3>
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

          <div className="flex flex-col items-center p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all">
            <div className="mb-4 p-3 bg-primary/10 rounded-full text-primary">
              <Code2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">{t('software_section.free_software')}</h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Apoyamos y creamos soluciones basadas en tecnologías abiertas y colaborativas.
            </p>
            <Button variant="secondary" className="w-full">
              Saber más
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};