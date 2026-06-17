import { Facebook, Github, Linkedin } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { routes } from '@/config/routes';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-white/5 bg-white dark:bg-[#050505] pt-12 pb-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="flex-shrink-0">
            <a href={routes.home} className="text-2xl font-bold text-gray-900 dark:text-white tracking-tighter transition-colors">
              Mor<span className="text-orange-500">gorn</span>
            </a>
          </div>

          <div className="flex items-center gap-6">
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 transition-colors p-2 bg-gray-100 dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10 hover:border-orange-200 dark:hover:border-transparent">
              <span className="sr-only">GitHub</span>
              <Github className="w-4 h-4" />
            </a>
            <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 transition-colors p-2 bg-gray-100 dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10 hover:border-orange-200 dark:hover:border-transparent">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={siteConfig.links.facebook} target="_blank" rel="noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 transition-colors p-2 bg-gray-100 dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10 hover:border-orange-200 dark:hover:border-transparent">
              <span className="sr-only">Facebook</span>
              <Facebook className="w-4 h-4" />
            </a>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left transition-colors">
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            &copy; {currentYear} Morgorn. All rights reserved.
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm flex items-center justify-center gap-1">
            Crafted with <span className="text-orange-500">Next.js</span> & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
