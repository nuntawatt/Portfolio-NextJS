import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/shared/components/Button';
import { ProfileImage } from './ProfileImage';

export function HeroSection() {
  return (
    <section id="home" className="pt-28 md:pt-36 pb-20 md:pb-28 lg:pb-36 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* Left Column - Text */}
          <div className="space-y-8 lg:space-y-10 z-10 order-2 lg:order-1 px-4 md:px-12 lg:px-0">
            <div className="space-y-5 lg:space-y-6 text-center lg:text-left">
              <h2 className="text-orange-500 font-semibold tracking-widest uppercase text-xs sm:text-sm flex items-center justify-center lg:justify-start gap-3 lg:gap-4">
                <span className="w-8 lg:w-12 h-[2px] bg-orange-500 inline-block drop-shadow-sm"></span>
                Hello, Welcome
              </h2>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.1] transition-colors">
                I'm <span className="text-orange-500 drop-shadow-md">Morgorn</span>
              </h1>

              <h3 className="text-xl md:text-2xl lg:text-4xl text-gray-700 dark:text-gray-300 font-semibold transition-colors">
                Backend Developer
              </h3>

              <p className="max-w-lg lg:max-w-xl mx-auto lg:mx-0 text-gray-800 dark:text-gray-300 text-base md:text-lg lg:text-xl font-medium leading-relaxed transition-colors">
                I architect highly scalable backend services and responsive frontend applications, focusing on clean code, robust system design, and delivering production-ready software.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4 lg:pt-2">
              <Button variant="primary" className="w-full sm:w-auto text-base lg:text-lg px-8 py-3.5 lg:py-4">View Projects</Button>
              <Button variant="outline" className="w-full sm:w-auto text-base lg:text-lg px-8 py-3.5 lg:py-4">Download CV</Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 lg:pt-8">
              <SocialLink href="https://github.com/nuntawatt?tab=repositories" icon={<Github className="w-5 h-5 lg:w-6 lg:h-6" />} />
              <SocialLink href="https://linkedin.com" icon={<Linkedin className="w-5 h-5 lg:w-6 lg:h-6" />} />
              <SocialLink href="mailto:hello@example.com" icon={<Mail className="w-5 h-5 lg:w-6 lg:h-6" />} />
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
      className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors hover:-translate-y-1 transform duration-300 p-2.5 lg:p-3 bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-full shadow-sm hover:shadow-orange-500/20"
    >
      {icon}
    </a>
  );
}
