'use client';

import React from 'react';
import { Facebook, Github, Linkedin, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/shared/components/Button';
import { ProfileImage } from './img';
import { siteConfig } from '@/config/site';

export function HeroSection() {
  return (
    <section id="home" className="pt-28 md:pt-36 pb-16 md:pb-24 lg:pb-28 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* Left Column - Text */}
          <div className="z-10 order-2 lg:order-1 px-4 md:px-12 lg:px-0">
            <div className="text-center lg:text-left mb-8 lg:mb-10">
              <h2 className="text-orange-500 font-semibold tracking-widest uppercase text-xs sm:text-sm flex items-center justify-center lg:justify-start gap-3 lg:gap-4 mb-4">
                <span className="w-8 lg:w-12 h-[2px] bg-orange-500 inline-block drop-shadow-sm"></span>
                Hello, Welcome
              </h2>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tight leading-[1.15] transition-colors mb-3">
                I&apos;m <span className="text-orange-500">Morgorn</span>
              </h1>

              <h3 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light tracking-tight transition-colors mb-6">
                Fullstack Developer
              </h3>

              <p className="max-w-lg lg:max-w-xl mx-auto lg:mx-0 text-foreground/80 text-base md:text-lg lg:text-[1.125rem] font-normal leading-relaxed transition-colors">
                I architect highly scalable backend services and responsive frontend applications, focusing on clean code, robust system design, and delivering production software.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8 lg:mb-10">
              <Button variant="primary" className="w-full sm:w-auto text-base lg:text-lg px-8 py-3.5 lg:py-4" onClick={() => window.open(siteConfig.links.project, "_blank")}>
                View Project <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <Button variant="outline" className="w-full sm:w-auto text-base lg:text-lg px-8 py-3.5 lg:py-4" onClick={() => window.open(siteConfig.links.cv, "_blank")}>
                Download CV <Download className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6">
              <SocialLink href={siteConfig.links.github} icon={<Github className="w-5 h-5 lg:w-6 lg:h-6" />} />
              <SocialLink href={siteConfig.links.linkedin} icon={<Linkedin className="w-5 h-5 lg:w-6 lg:h-6" />} />
              <SocialLink href={siteConfig.links.facebook} icon={<Facebook className="w-5 h-5 lg:w-6 lg:h-6" />} />
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
      className="text-muted-foreground hover:text-orange-500 transition-colors p-2.5 lg:p-3 bg-card/60 backdrop-blur-sm border border-border rounded-full shadow-sm hover:border-orange-500/30"
    >
      {icon}
    </a>
  );
}
