import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/shared/components/Button';
import { ProfileImage } from './ProfileImage';

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-24 md:pt-28 pb-16 md:pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* Left Column - Text */}
          <div className="space-y-10 z-10 order-2 lg:order-1">
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-orange-500 font-semibold tracking-widest uppercase text-sm md:text-base flex items-center justify-center lg:justify-start gap-4">
                <span className="w-12 h-[2px] bg-orange-500 inline-block drop-shadow-sm"></span> 
                Hello, Welcome
              </h2>
              
              <h1 className="text-6xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.1] transition-colors">
                I'm <span className="text-orange-500 drop-shadow-md">Morgorn</span>
              </h1>
              
              <h3 className="text-2xl md:text-3xl lg:text-4xl text-gray-700 dark:text-gray-300 font-semibold transition-colors">
                Backend Developer
                {/* Backend Developer & Fullstack */}
              </h3>
              
              <p className="max-w-lg mx-auto lg:mx-0 text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed transition-colors">
                I build well-structured backend systems and have a strong background in frontend development.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-6 pt-2">
              <Button variant="primary" className="w-full sm:w-auto text-lg px-8 py-4">View Projects</Button>
              <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-4">Download CV</Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 pt-8">
              <SocialLink href="https://github.com" icon={<Github className="w-6 h-6" />} />
              <SocialLink href="https://linkedin.com" icon={<Linkedin className="w-6 h-6" />} />
              <SocialLink href="mailto:hello@example.com" icon={<Mail className="w-6 h-6" />} />
            </div>
          </div>

          <ProfileImage />
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer" 
      className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors hover:-translate-y-1 transform duration-300 p-3 bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-full shadow-sm hover:shadow-orange-500/20"
    >
      {icon}
    </a>
  );
}
