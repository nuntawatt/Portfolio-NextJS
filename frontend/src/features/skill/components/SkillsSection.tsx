'use client';

import React from 'react';
import { Monitor, Cpu, Database, Wrench, Palette, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from '@/shared/providers/LanguageProvider';
import { useSpotlight } from '@/shared/lib';
import { ScrollReveal } from '@/shared/ui';

// SkillCard: คอมโพเนนต์การ์ดแสดงแต่ละกลุ่มทักษะความสามารถ พร้อมเอฟเฟกต์แสงไฟ Spotlight ตามเมาส์
function SkillCard({ children, title, subtitle, icon }: { children: React.ReactNode; title: string; subtitle: string; icon: React.ReactNode }) {
  // ดึงข้อมูลการเลื่อนเมาส์และพิกัดสำหรับเอฟเฟกต์ Spotlight
  const { coords, hovered, spotlightHandlers } = useSpotlight();

  return (
    <div
      className="relative bg-card/40 border border-border rounded-[24px] p-6 overflow-hidden transition-all duration-300 hover:shadow-md dark:hover:shadow-orange-500/5 group cursor-pointer flex flex-col justify-between"
      {...spotlightHandlers}
    >
      {/* spotlight cursor glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out z-0"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, rgba(249,115,22,0.07), transparent 85%)`,
        }}
      />

      {/* Eyebrow Header */}
      <div className="relative z-10 flex items-center justify-between pb-3 mb-5 border-b border-border select-none">
        <span className="font-mono text-xs text-muted-foreground tracking-wider uppercase font-semibold">
          {subtitle}
        </span>
      </div>

      {/* Main card body */}
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        {/* Title & Icon Header */}
        <div className="flex items-center gap-3 mb-5 select-none">
          {icon}
          <h3 className="text-lg font-bold text-foreground font-heading">
            {title}
          </h3>
        </div>

        {/* Custom Inner Widget Area */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

// TagRow: คอมโพเนนต์ย่อยสำหรับแสดงป้ายกำกับ (Tags) ของทักษะแต่ละหัวข้อ
function TagRow({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span key={item} className="px-2.5 py-1 text-xs font-semibold text-foreground bg-secondary border border-border rounded-md">
          {item}
        </span>
      ))}
    </div>
  );
}

// SkillsSection: คอมโพเนนต์หลักสำหรับส่วน "ทักษะความเชี่ยวชาญ" (Skills Section) แสดงผลทักษะต่างๆ แยกตามประเภท
export function SkillsSection() {
  // ดึงฟังก์ชันแปลภาษาสำหรับการแสดงผลหลายภาษา
  const { t } = useTranslation();

  return (
    <section id="skills" className="scroll-mt-20 py-12 md:py-20 min-h-[calc(100vh-5rem)] flex items-center bg-transparent transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Main Grid Wrapper */}
        <div className="relative">

          {/* Headline */}
          <ScrollReveal direction="up">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 transition-colors font-heading tracking-tight">
              {t('skills.title_prefix')} <span className="text-orange-500">{t('skills.title_highlight')}</span>
            </h2>
            <div className="w-20 h-0.5 bg-orange-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-sm text-muted-foreground max-w-md mx-auto">
              {t('skills.description')}
            </p>
          </div>
          </ScrollReveal>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* 1. Backend - request flow diagram */}
            <ScrollReveal direction="up" delay={0.08 * 0}>
            <SkillCard
              title={t('skills.cat1.title') as string}
              subtitle={t('skills.cat1.subtitle') as string}
              icon={<Cpu className="w-5 h-5 text-foreground/70" strokeWidth={1.5} />}
            >
              <div className="flex flex-col h-full justify-between">
                <div className="mb-6 select-none">
                  <div className="flex items-center gap-1.5">
                    {[
                      t('skills.cat1.node.request') as string,
                      t('skills.cat1.node.response') as string,
                      t('skills.cat1.node.database') as string
                    ].map((node, i, arr) => (
                      <React.Fragment key={node}>
                        <div className="flex-1 text-center py-2.5 px-1 rounded-lg border border-border bg-card text-[11px] font-semibold text-foreground/80 truncate">
                          {node}
                        </div>
                        {i < arr.length - 1 && (
                          <span className="text-border text-xs" aria-hidden="true">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <p className="mt-3 text-[11px] text-muted-foreground text-center">
                    {t('skills.cat1.architecture')}
                  </p>
                </div>
                <TagRow items={['Node.js', 'NestJS', 'FastAPI', 'Go']} />
              </div>
            </SkillCard>
            </ScrollReveal>

            {/* 2. Frontend - component tree, not code */}
            <ScrollReveal direction="up" delay={0.08 * 1}>
            <SkillCard
              title={t('skills.cat2.title') as string}
              subtitle={t('skills.cat2.subtitle') as string}
              icon={<Monitor className="w-5 h-5 text-foreground/70" strokeWidth={1.5} />}
            >
              <div className="flex flex-col h-full justify-between">
                <div className="mb-6 select-none text-xs font-medium text-foreground/75 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span className="font-semibold text-foreground">App</span>
                  </div>
                  <div className="ml-3.5 pl-3 border-l border-border space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-border" />
                      <span>{t('skills.cat2.layout')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-border" />
                      <span>{t('skills.cat2.routes')}</span>
                    </div>
                    <div className="ml-3.5 pl-3 border-l border-border">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-border" />
                        <span>{t('skills.cat2.components')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <TagRow items={['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS']} />
              </div>
            </SkillCard>
            </ScrollReveal>

            {/* 3. Database - comparative mini bar chart */}
            <ScrollReveal direction="up" delay={0.08 * 2}>
            <SkillCard
              title={t('skills.cat3.title') as string}
              subtitle={t('skills.cat3.subtitle') as string}
              icon={<Database className="w-5 h-5 text-foreground/70" strokeWidth={1.5} />}
            >
              <div className="flex flex-col h-full justify-between">
                <div className="mb-6 select-none space-y-3">
                  {[
                    { name: 'PostgreSQL', noteKey: 'skills.cat3.relational', width: '70%' },
                    { name: 'MongoDB', noteKey: 'skills.cat3.documents', width: '55%' },
                    { name: 'Redis', noteKey: 'skills.cat3.cache', width: '92%' },
                  ].map((row) => (
                    <div key={row.name}>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-xs font-semibold text-foreground/85">{row.name}</span>
                        <span className="text-[10px] text-muted-foreground">{t(row.noteKey)}</span>
                      </div>
                      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                        <motion.div className="h-full bg-orange-500 rounded-full" initial={{ width: '0%' }} whileInView={{ width: row.width }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }} />
                      </div>
                    </div>
                  ))}
                </div>
                <TagRow items={['PostgreSQL', 'MongoDB', 'Redis (caching)']} />
              </div>
            </SkillCard>
            </ScrollReveal>

            {/* 4. DevOps - pipeline stepper, dots not fake-log */}
            <ScrollReveal direction="up" delay={0.08 * 3}>
            <SkillCard
              title={t('skills.cat4.title') as string}
              subtitle={t('skills.cat4.subtitle') as string}
              icon={<Wrench className="w-5 h-5 text-foreground/70" strokeWidth={1.5} />}
            >
              <div className="flex flex-col h-full justify-between">
                <div className="mb-6 select-none">
                  <div className="flex items-center">
                    {[
                      { name: 'Build', key: 'skills.cat4.build' },
                      { name: 'Containerize', key: 'skills.cat4.containerize' },
                      { name: 'Deploy', key: 'skills.cat4.deploy' }
                    ].map((stage, i, arr) => (
                      <React.Fragment key={stage.name}>
                        <div className="flex flex-col items-center gap-1.5 flex-1">
                          <span className={`w-2.5 h-2.5 rounded-full ${i === arr.length - 1 ? 'bg-orange-500' : 'bg-foreground/30'}`} />
                          <span className="text-[10px] font-medium text-muted-foreground text-center">{t(stage.key)}</span>
                        </div>
                        {i < arr.length - 1 && (
                          <span className="flex-1 h-px bg-border -mt-4" aria-hidden="true" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <p className="mt-3 text-[11px] text-muted-foreground text-center">
                    {t('skills.cat4.desc')}
                  </p>
                </div>
                <TagRow items={['Docker', 'CI/CD', 'AWS', 'Gateway']} />
              </div>
            </SkillCard>
            </ScrollReveal>

            {/* 5. Tools - grid mockup kept, it's already not code */}
            <ScrollReveal direction="up" delay={0.08 * 4}>
            <SkillCard
              title={t('skills.cat5.title') as string}
              subtitle={t('skills.cat5.subtitle') as string}
              icon={<Palette className="w-5 h-5 text-foreground/70" strokeWidth={1.5} />}
            >
              <div className="flex flex-col h-full justify-between">
                <div className="grid grid-cols-2 gap-2 mb-6 select-none text-center">
                  <div className="p-2 bg-secondary rounded-xl border border-border font-semibold text-xs text-foreground/80">
                    {t('skills.cat5.git')}
                  </div>
                  <div className="p-2 bg-secondary rounded-xl border border-border font-semibold text-xs text-foreground/80">
                    {t('skills.cat5.postman')}
                  </div>
                  <div className="p-2 bg-secondary rounded-xl border border-border font-semibold text-xs text-foreground/80">
                    {t('skills.cat5.vscode')}
                  </div>
                  <div className="p-2 bg-secondary rounded-xl border border-border font-semibold text-xs text-foreground/80">
                    {t('skills.cat5.figma')}
                  </div>
                </div>
                <TagRow items={['Git', 'Postman', 'VS Code', 'Figma']} />
              </div>
            </SkillCard>
            </ScrollReveal>

            {/* 6. Languages & soft skills - one orange accent, on Native only */}
            <ScrollReveal direction="up" delay={0.08 * 5}>
            <SkillCard
              title={t('skills.cat6.title') as string}
              subtitle={t('skills.cat6.subtitle') as string}
              icon={<Users className="w-5 h-5 text-foreground/70" strokeWidth={1.5} />}
            >
              <div className="flex flex-col h-full justify-between">
                <div className="space-y-4 mb-6 select-none font-medium text-sm">
                  <div className="flex justify-between items-center border-b border-border/50 pb-2">
                    <span className="text-foreground/90">{t('skills.cat6.thai')}</span>
                    <span className="text-xs font-bold text-orange-500">{t('skills.cat6.native')}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border/50 pb-2">
                    <span className="text-foreground/90">{t('skills.cat6.english')}</span>
                    <span className="text-xs font-semibold text-muted-foreground">{t('skills.cat6.professional')}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border/50 pb-2">
                    <span className="text-foreground/90">{t('skills.cat6.adapt')}</span>
                    <span className="text-xs font-semibold text-muted-foreground">{t('skills.cat6.adaptive')}</span>
                  </div>
                </div>
                <TagRow items={['Thai', 'English', 'Adaptability', 'Learning']} />
              </div>
            </SkillCard>
            </ScrollReveal>

          </div>
        </div>
      </div>
    </section>
  );
}
