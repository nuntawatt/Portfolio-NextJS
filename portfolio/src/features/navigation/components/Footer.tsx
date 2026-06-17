import { Facebook, Github, Linkedin } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { routes } from '@/config/routes';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-transparent pt-12 pb-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="flex-shrink-0">
            <a href={routes.home} className="text-2xl font-bold text-foreground tracking-tighter transition-colors">
              Mor<span className="text-orange-500">gorn</span>
            </a>
          </div>

          <div className="flex items-center gap-6">
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-orange-500 transition-colors p-2 bg-card rounded-full border border-border hover:border-orange-500/30">
              <span className="sr-only">GitHub</span>
              <Github className="w-4 h-4" />
            </a>
            <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-orange-500 transition-colors p-2 bg-card rounded-full border border-border hover:border-orange-500/30">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={siteConfig.links.facebook} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-orange-500 transition-colors p-2 bg-card rounded-full border border-border hover:border-orange-500/30">
              <span className="sr-only">Facebook</span>
              <Facebook className="w-4 h-4" />
            </a>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left transition-colors">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} Morgorn. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
            Crafted with <span className="text-orange-500">Next.js</span> & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
