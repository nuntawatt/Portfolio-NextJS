'use client';

import React, { useState } from 'react';
import { Monitor, Cpu, Database, Wrench, Palette, Users } from 'lucide-react';
import { useTranslation } from '@/shared/providers/LanguageProvider';

// Reusable card shell — spotlight hover stays, but icon treatment now varies
// per card below instead of every card sharing the same boxed-icon container.
function SkillCard({ children, title, subtitle, icon }: { children: React.ReactNode; title: string; subtitle: string; icon: React.ReactNode }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="relative bg-card/40 border border-border rounded-[24px] p-6 overflow-hidden transition-all duration-300 hover:shadow-md dark:hover:shadow-orange-500/5 group cursor-pointer flex flex-col justify-between"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
        <span className="font-mono text-[9px] text-muted-foreground/80 tracking-widest uppercase font-semibold">
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

// Shared tag pill, unchanged in spirit — just no orange unless a tag is the single
// most relevant one for that category (handled per-card, not globally).
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

export function SkillsSection() {
  const { t } = useTranslation();

  return (
    <section id="skills" className="scroll-mt-24 py-16 md:py-24 lg:py-28 bg-transparent transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Grid Wrapper */}
        <div className="relative bg-card/40 border border-border rounded-[24px] p-6 sm:p-8 backdrop-blur-md">

          {/* Headline */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 transition-colors font-heading tracking-tight">
              {t('skills.title_prefix')} <span className="text-orange-500">{t('skills.title_highlight')}</span>
            </h2>
            <div className="w-20 h-0.5 bg-orange-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-sm text-muted-foreground max-w-md mx-auto">
              {t('skills.description')}
            </p>
          </div>

          {/* Handcrafted Widgets Grid — each card gets a visual native to its
              own domain instead of all six reusing the same fake-terminal block. */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* 1. Backend — request flow diagram */}
            <SkillCard
              title={t('skills.cat1.title') as string}
              subtitle={t('skills.cat1.subtitle') as string}
              icon={<Cpu className="w-5 h-5 text-foreground/70" strokeWidth={1.5} />}
            >
              <div className="flex flex-col h-full justify-between">
                <div className="mb-6 select-none">
                  <div className="flex items-center gap-1.5">
                    {['Request', 'NestJS', 'FastAPI'].map((node, i, arr) => (
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
                    Go runtime · p99 latency under 2ms
                  </p>
                </div>
                <TagRow items={['Node.js', 'NestJS', 'FastAPI', 'Go']} />
              </div>
            </SkillCard>

            {/* 2. Frontend — component tree, not code */}
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
                      <span>Layout · responsive</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-border" />
                      <span>Routes · Next.js</span>
                    </div>
                    <div className="ml-3.5 pl-3 border-l border-border">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-border" />
                        <span>Components · TypeScript</span>
                      </div>
                    </div>
                  </div>
                </div>
                <TagRow items={['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS']} />
              </div>
            </SkillCard>

            {/* 3. Database — comparative mini bar chart */}
            <SkillCard
              title={t('skills.cat3.title') as string}
              subtitle={t('skills.cat3.subtitle') as string}
              icon={<Database className="w-5 h-5 text-foreground/70" strokeWidth={1.5} />}
            >
              <div className="flex flex-col h-full justify-between">
                <div className="mb-6 select-none space-y-3">
                  {[
                    { name: 'PostgreSQL', note: 'Relational', width: '70%' },
                    { name: 'MongoDB', note: 'Documents', width: '55%' },
                    { name: 'Redis', note: 'In-memory cache', width: '92%' },
                  ].map((row) => (
                    <div key={row.name}>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-xs font-semibold text-foreground/85">{row.name}</span>
                        <span className="text-[10px] text-muted-foreground">{row.note}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full rounded-full bg-foreground/30"
                          style={{ width: row.width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <TagRow items={['PostgreSQL', 'MongoDB', 'Redis (caching)']} />
              </div>
            </SkillCard>

            {/* 4. DevOps — pipeline stepper, dots not fake-log */}
            <SkillCard
              title={t('skills.cat4.title') as string}
              subtitle={t('skills.cat4.subtitle') as string}
              icon={<Wrench className="w-5 h-5 text-foreground/70" strokeWidth={1.5} />}
            >
              <div className="flex flex-col h-full justify-between">
                <div className="mb-6 select-none">
                  <div className="flex items-center">
                    {['Build', 'Containerize', 'Deploy'].map((stage, i, arr) => (
                      <React.Fragment key={stage}>
                        <div className="flex flex-col items-center gap-1.5 flex-1">
                          <span className={`w-2.5 h-2.5 rounded-full ${i === arr.length - 1 ? 'bg-orange-500' : 'bg-foreground/30'}`} />
                          <span className="text-[10px] font-medium text-muted-foreground text-center">{stage}</span>
                        </div>
                        {i < arr.length - 1 && (
                          <span className="flex-1 h-px bg-border -mt-4" aria-hidden="true" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <p className="mt-3 text-[11px] text-muted-foreground text-center">
                    Docker · APISIX/Nginx · AWS
                  </p>
                </div>
                <TagRow items={['Docker', 'CI/CD', 'AWS', 'Gateway']} />
              </div>
            </SkillCard>

            {/* 5. Tools — grid mockup kept, it's already not code */}
            <SkillCard
              title={t('skills.cat5.title') as string}
              subtitle={t('skills.cat5.subtitle') as string}
              icon={<Palette className="w-5 h-5 text-foreground/70" strokeWidth={1.5} />}
            >
              <div className="flex flex-col h-full justify-between">
                <div className="grid grid-cols-2 gap-2 mb-6 select-none text-center">
                  <div className="p-2 bg-secondary rounded-xl border border-border font-semibold text-xs text-foreground/80">
                    GitHub / VCS
                  </div>
                  <div className="p-2 bg-secondary rounded-xl border border-border font-semibold text-xs text-foreground/80">
                    Postman / API
                  </div>
                  <div className="p-2 bg-secondary rounded-xl border border-border font-semibold text-xs text-foreground/80">
                    VS Code / Editor
                  </div>
                  <div className="p-2 bg-secondary rounded-xl border border-border font-semibold text-xs text-foreground/80">
                    Figma / Design
                  </div>
                </div>
                <TagRow items={['Git', 'Postman', 'VS Code', 'Figma']} />
              </div>
            </SkillCard>

            {/* 6. Languages & soft skills — one orange accent, on Native only */}
            <SkillCard
              title={t('skills.cat6.title') as string}
              subtitle={t('skills.cat6.subtitle') as string}
              icon={<Users className="w-5 h-5 text-foreground/70" strokeWidth={1.5} />}
            >
              <div className="flex flex-col h-full justify-between">
                <div className="space-y-4 mb-6 select-none font-medium text-sm">
                  <div className="flex justify-between items-center border-b border-border/50 pb-2">
                    <span className="text-foreground/90">Thai</span>
                    <span className="text-xs font-bold text-orange-500">Native</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border/50 pb-2">
                    <span className="text-foreground/90">English</span>
                    <span className="text-xs font-semibold text-muted-foreground">Professional</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border/50 pb-2">
                    <span className="text-foreground/90">Adaptability</span>
                    <span className="text-xs font-semibold text-muted-foreground">Highly adaptive</span>
                  </div>
                </div>
                <TagRow items={['Thai', 'English', 'Adaptability', 'Learning']} />
              </div>
            </SkillCard>

          </div>
        </div>
      </div>
    </section>
  );
}
