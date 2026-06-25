'use client';

import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/shared/ui';
import { ProfileImage } from './profile-image';
import { siteConfig } from '@/shared/config/site';
import { useTranslation } from '@/shared/providers/LanguageProvider';

// HeroSection: คอมโพเนนต์หน้าแรก (Hero Section) แสดงการทักทาย ชื่อตำแหน่งประวัติย่อ และปุ่มเปิด CV
export function HeroSection() {
  // ดึงฟังก์ชันแปลภาษา
  const { t } = useTranslation();
  // ดึงข้อมูลบทบาทหน้าที่และจัดรูปแบบตัวอักษรให้อยู่ในรูปข้อความคั่นด้วยเครื่องหมาย "/"
  const roles = t('hero.roles');
  const rolesText = Array.isArray(roles) ? roles.join(' / ') : roles;

  return (
    <section id="home" className="pt-28 md:pt-36 pb-16 md:pb-24 lg:pb-28 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* Left Column - Text */}
          <div className="z-10 order-2 lg:order-1 px-4 md:px-12 lg:px-0">
            <div className="text-center lg:text-left mb-8 lg:mb-10">
              <p className="text-orange-500 font-semibold tracking-widest uppercase text-xs sm:text-sm flex items-center justify-center lg:justify-start gap-3 lg:gap-4 mb-4">
                <span className="w-8 lg:w-12 h-[2px] bg-orange-500 inline-block drop-shadow-sm"></span>
                {t('hero.greeting')}
              </p>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tight leading-tight transition-colors mb-5">
                {t('hero.name')}
              </h1>

              <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light tracking-wide transition-colors mb-8">
                {rolesText}
              </h2>

              <p className="max-w-lg lg:max-w-xl mx-auto lg:mx-0 text-foreground/80 text-base md:text-lg lg:text-[1.125rem] font-normal leading-relaxed transition-colors">
                {t('hero.description')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8 lg:mb-10">
              <Button variant="outline" className="w-full sm:w-auto text-base lg:text-lg px-8 py-3.5 lg:py-4" onClick={() => window.open(siteConfig.links.cv, "_blank")}>
                {t('hero.cta.cv')} <Download className="w-4 h-4 ml-2" />
              </Button>
            </div>

          </div>
          <ProfileImage />
        </div>
      </div>
    </section>
  );
}
