'use client';

import React, { useState } from 'react';
import { Monitor, Cpu, Database, Wrench, Palette, Users, Code2, Layers, GitBranch, Terminal } from 'lucide-react';

// Reusable card container with elegant borders and spotlight coordinates tracking
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
      className="relative bg-card/60 border border-border rounded-[24px] p-6 overflow-hidden transition-all duration-300 hover:shadow-md dark:hover:shadow-orange-500/5 group cursor-pointer flex flex-col justify-between"
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
          <div className="p-2 border border-border bg-card text-muted-foreground rounded-lg transition-colors group-hover:text-foreground group-hover:border-foreground/30">
            {icon}
          </div>
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

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24 py-16 md:py-24 lg:py-28 bg-transparent transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid Wrapper */}
        <div className="relative bg-card/40 border border-border rounded-[24px] p-6 sm:p-8 backdrop-blur-md">
          
          {/* Headline */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 transition-colors font-heading tracking-tight">
              Technical <span className="text-gradient">Expertise</span>
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-sm text-muted-foreground max-w-md mx-auto">
              A breakdown of languages, systems, and toolkits I use to design high-performance applications.
            </p>
          </div>

          {/* Handcrafted Widgets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* 1. Backend Widget */}
            <SkillCard title="Backend Development" subtitle="BACKEND SERVICES" icon={<Cpu className="w-5 h-5" />}>
              <div className="flex flex-col h-full justify-between">
                {/* Mock Server Config log */}
                <div className="bg-card border border-border rounded-xl p-3.5 font-mono text-[11px] text-foreground/80 space-y-1 mb-5 select-none">
                  <div className="flex items-center justify-between text-[9px] text-muted-foreground pb-1.5 border-b border-border mb-1.5">
                    <span className="flex items-center gap-1"><Terminal className="w-2.5 h-2.5" /> runtime_config.yaml</span>
                    <span className="text-orange-500 font-bold">READY</span>
                  </div>
                  <div>engine: Node.js (V8)</div>
                  <div>framework: NestJS Microservices</div>
                  <div>endpoints: FastAPI Router (port: 8000)</div>
                  <div className="text-muted-foreground">latency: Go compiler optimized (p99 &lt; 2ms)</div>
                </div>
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {['Node.js', 'NestJS', 'FastAPI', 'Go'].map((item) => (
                    <span key={item} className="px-2.5 py-1 text-xs font-semibold text-foreground bg-secondary border border-border rounded-md">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </SkillCard>

            {/* 2. Frontend Widget */}
            <SkillCard title="Frontend Development" subtitle="FRONTEND INTERFACES" icon={<Monitor className="w-5 h-5" />}>
              <div className="flex flex-col h-full justify-between">
                {/* Mock Code Editor */}
                <div className="bg-card border border-border rounded-xl p-3.5 font-mono text-[11px] text-foreground/70 space-y-1.5 mb-5 select-none">
                  <div className="text-[9px] text-muted-foreground pb-1.5 border-b border-border mb-1.5 flex items-center gap-1">
                    <Code2 className="w-2.5 h-2.5" /> workspace.tsx
                  </div>
                  <div><span className="text-orange-500">import</span> &#123; NextJS, React &#125; <span className="text-orange-500">from</span> <span className="text-muted-foreground">&apos;frontend&apos;</span>;</div>
                  <div><span className="text-muted-foreground">const</span> <span className="text-foreground">App</span> = () =&gt; (</div>
                  <div className="pl-3">&lt;<span className="text-orange-500">View</span> layout=<span className="text-muted-foreground">&apos;responsive&apos;</span> /&gt;</div>
                  <div>);</div>
                </div>
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS'].map((item) => (
                    <span key={item} className="px-2.5 py-1 text-xs font-semibold text-foreground bg-secondary border border-border rounded-md">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </SkillCard>

            {/* 3. Database Widget */}
            <SkillCard title="Databases & Caching" subtitle="DATA SYSTEMS" icon={<Database className="w-5 h-5" />}>
              <div className="flex flex-col h-full justify-between">
                {/* Mock relational schema */}
                <div className="bg-card border border-border rounded-xl p-3.5 font-mono text-[11px] text-foreground/80 space-y-2 mb-5 select-none">
                  <div className="flex items-center justify-between text-[9px] text-muted-foreground pb-1.5 border-b border-border">
                    <span className="flex items-center gap-1"><Layers className="w-2.5 h-2.5" /> schema_manifest</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-foreground">PostgreSQL</span>
                    <span className="text-[10px] text-muted-foreground">Relational / SQL</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-foreground">MongoDB</span>
                    <span className="text-[10px] text-muted-foreground">NoSQL Documents</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-foreground">Redis</span>
                    <span className="text-[10px] text-orange-500 font-semibold">In-Memory Cache</span>
                  </div>
                </div>
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {['PostgreSQL', 'MongoDB', 'Redis (caching)'].map((item) => (
                    <span key={item} className="px-2.5 py-1 text-xs font-semibold text-foreground bg-secondary border border-border rounded-md">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </SkillCard>

            {/* 4. DevOps Widget */}
            <SkillCard title="DevOps & Deployment" subtitle="INFRASTRUCTURE" icon={<Wrench className="w-5 h-5" />}>
              <div className="flex flex-col h-full justify-between">
                {/* Visual flowchart pipeline */}
                <div className="bg-card border border-border rounded-xl p-4 mb-5 select-none flex flex-col justify-center gap-2">
                  <div className="flex items-center justify-between text-[9px] font-mono text-muted-foreground pb-1.5 border-b border-border mb-1">
                    <span className="flex items-center gap-1"><GitBranch className="w-2.5 h-2.5" /> deployment_pipeline</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold px-2 py-1 bg-secondary rounded-md">
                    <span className="text-muted-foreground">Docker</span>
                    <span className="text-foreground/80">Containerized</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold px-2 py-1 bg-secondary rounded-md">
                    <span className="text-muted-foreground">APISIX / Nginx</span>
                    <span className="text-foreground/80">API Gateway</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold px-2 py-1 bg-secondary rounded-md">
                    <span className="text-muted-foreground">AWS / Cloud</span>
                    <span className="text-orange-500 font-medium">Production</span>
                  </div>
                </div>
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {['Docker', 'CI/CD', 'AWS', 'Gateway'].map((item) => (
                    <span key={item} className="px-2.5 py-1 text-xs font-semibold text-foreground bg-secondary border border-border rounded-md">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </SkillCard>

            {/* 5. Tools Widget */}
            <SkillCard title="Workbench Tools" subtitle="DEVELOPMENT TOOLKIT" icon={<Palette className="w-5 h-5" />}>
              <div className="flex flex-col h-full justify-between">
                {/* Interactive Grid Mockup */}
                <div className="grid grid-cols-2 gap-2 mb-5 select-none text-center">
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
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {['Git', 'Postman', 'VS Code', 'Figma'].map((item) => (
                    <span key={item} className="px-2.5 py-1 text-xs font-semibold text-foreground bg-secondary border border-border rounded-md">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </SkillCard>

            {/* 6. Languages Widget */}
            <SkillCard title="Languages & Soft Skills" subtitle="COMMUNICATION & LEARNING" icon={<Users className="w-5 h-5" />}>
              <div className="flex flex-col h-full justify-between">
                {/* Textual descriptions */}
                <div className="space-y-4 mb-6 select-none font-medium text-sm">
                  <div className="flex justify-between items-center border-b border-border/50 pb-2">
                    <span className="text-foreground/90">Thai</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-500 bg-orange-500/5 px-2.5 py-0.5 rounded-full">Native Language</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border/50 pb-2">
                    <span className="text-foreground/90">English</span>
                    <span className="text-xs font-semibold text-muted-foreground">Professional Working Proficiency</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border/50 pb-2">
                    <span className="text-foreground/90">Adaptability</span>
                    <span className="text-xs font-semibold text-muted-foreground">Highly Adaptive & Continuous Learner</span>
                  </div>
                </div>
                {/* Soft skills list */}
                <div className="flex flex-wrap gap-1.5">
                  {['Thai', 'English', 'Adaptability', 'Learning'].map((item) => (
                    <span key={item} className="px-2.5 py-1 text-xs font-semibold text-foreground bg-secondary border border-border rounded-md">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </SkillCard>

          </div>
        </div>
      </div>
    </section>
  );
}
