'use client';

import React, { useState } from 'react';
import { Monitor, Cpu, Database, Wrench, Palette, Users, Play, Code2, Layers, GitBranch, Terminal } from 'lucide-react';

// Reusable card container with mock-OS window decorations and mouse spotlight coordinates tracking
function SkillCard({ children, title, icon }: { children: React.ReactNode; title: string; icon: React.ReactNode }) {
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
      className="relative blocks-glass-card rounded-[24px] p-6 overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-lg dark:hover:shadow-orange-500/5 group cursor-pointer flex flex-col justify-between"
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

      {/* Card Window Header */}
      <div className="relative z-10 flex items-center justify-between pb-3 mb-5 border-b border-black/5 dark:border-white/5 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-black/10 dark:bg-white/10 group-hover:bg-red-400/80 transition-colors" />
          <span className="w-2 h-2 rounded-full bg-black/10 dark:bg-white/10 group-hover:bg-yellow-400/80 transition-colors" />
          <span className="w-2 h-2 rounded-full bg-black/10 dark:bg-white/10 group-hover:bg-green-400/80 transition-colors" />
        </div>
        <span className="font-mono text-[9px] text-black/35 dark:text-white/35 tracking-wider font-bold">
          {title}
        </span>
      </div>

      {/* Main card body */}
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        {/* Title & Icon Header */}
        <div className="flex items-center gap-3 mb-5 select-none">
          <div className="p-2 bg-orange-100 dark:bg-orange-500/10 text-orange-500 rounded-lg">
            {icon}
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white font-heading">
            {title.split(' // ')[0]}
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
    <section id="skills" className="scroll-mt-24 py-16 md:py-24 lg:py-28 bg-gray-50 dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid Wrapper */}
        <div className="relative blocks-glass-card rounded-[24px] p-6 sm:p-8">
          <div className="ambient-glow -top-24 -right-24" />

          {/* Window Header */}
          <div className="flex items-center justify-between pb-4 mb-8 border-b border-black/5 dark:border-white/5 select-none">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-black/10 dark:bg-white/10 hover:bg-red-400/80 transition-colors" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/10 dark:bg-white/10 hover:bg-yellow-400/80 transition-colors" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/10 dark:bg-white/10 hover:bg-green-400/80 transition-colors" />
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[10px] text-black/45 dark:text-white/45 tracking-widest font-bold">
                EXPERTISE // ONLINE
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors font-heading">
              Technical <span className="text-gradient">Expertise</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              A breakdown of languages, systems, and toolkits I use to design high-performance applications.
            </p>
          </div>

          {/* Handcrafted Widgets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* 1. Backend Widget */}
            <SkillCard title="Backend // CONSOLE" icon={<Cpu className="w-5 h-5" />}>
              <div className="flex flex-col h-full justify-between">
                {/* Mock Server Console log */}
                <div className="bg-black/90 dark:bg-black/90 rounded-xl p-3.5 font-mono text-[11px] text-orange-400 border border-white/5 space-y-1 mb-5 select-none shadow-inner">
                  <div className="flex items-center justify-between text-[9px] text-gray-500 pb-1.5 border-b border-white/5 mb-1.5">
                    <span className="flex items-center gap-1"><Terminal className="w-2.5 h-2.5" /> server_logs.log</span>
                    <span className="text-emerald-400">ACTIVE</span>
                  </div>
                  <div>$ init_server_core.sh</div>
                  <div className="text-emerald-400">[OK] Node.js engine loaded</div>
                  <div className="text-emerald-400">[OK] NestJS microservice running</div>
                  <div className="text-emerald-400">[OK] FastAPI process port:8000</div>
                  <div className="text-gray-500">➜ Go runtime ready (p99: &lt; 2ms)</div>
                </div>
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {['Node.js', 'NestJS', 'FastAPI', 'Go'].map((item) => (
                    <span key={item} className="px-2.5 py-1 text-xs font-bold text-gray-800 dark:text-gray-200 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-md">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </SkillCard>

            {/* 2. Frontend Widget */}
            <SkillCard title="Frontend // WORKSPACE" icon={<Monitor className="w-5 h-5" />}>
              <div className="flex flex-col h-full justify-between">
                {/* Mock Code Editor */}
                <div className="bg-neutral-900 rounded-xl p-3.5 font-mono text-[11px] text-gray-400 border border-white/5 space-y-1.5 mb-5 select-none shadow-inner">
                  <div className="text-[9px] text-gray-500 pb-1.5 border-b border-white/5 mb-1.5 flex items-center gap-1">
                    <Code2 className="w-2.5 h-2.5" /> Component.tsx
                  </div>
                  <div><span className="text-purple-400">import</span> &#123; NextJS, React &#125; <span className="text-purple-400">from</span> <span className="text-green-300">&apos;web&apos;</span>;</div>
                  <div><span className="text-blue-300">const</span> <span className="text-yellow-300">Workspace</span> = () =&gt; (</div>
                  <div className="pl-3">&lt;<span className="text-orange-400">UI</span> <span className="text-blue-300">type</span>=<span className="text-green-300">&apos;responsive&apos;</span> /&gt;</div>
                  <div>);</div>
                </div>
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS'].map((item) => (
                    <span key={item} className="px-2.5 py-1 text-xs font-bold text-gray-800 dark:text-gray-200 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-md">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </SkillCard>

            {/* 3. Database Widget */}
            <SkillCard title="Database // SCHEMA" icon={<Database className="w-5 h-5" />}>
              <div className="flex flex-col h-full justify-between">
                {/* Mock relational schema */}
                <div className="bg-white/50 dark:bg-neutral-900 rounded-xl p-3.5 font-mono text-[11px] text-gray-500 dark:text-gray-400 border border-black/5 dark:border-white/5 space-y-2 mb-5 select-none shadow-sm">
                  <div className="flex items-center justify-between text-[9px] text-gray-500 pb-1.5 border-b border-black/5 dark:border-white/5">
                    <span className="flex items-center gap-1"><Layers className="w-2.5 h-2.5" /> db_schemas</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-orange-500 font-bold">PostgreSQL</span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">Relations</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-orange-500 font-bold">MongoDB</span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">Documents</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-orange-500 font-bold">Redis</span>
                    <span className="text-[10px] text-emerald-500 font-bold">Cache Hit</span>
                  </div>
                </div>
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {['PostgreSQL', 'MongoDB', 'Redis (caching)'].map((item) => (
                    <span key={item} className="px-2.5 py-1 text-xs font-bold text-gray-800 dark:text-gray-200 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-md">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </SkillCard>

            {/* 4. DevOps Widget */}
            <SkillCard title="DevOps // PIPELINE" icon={<Wrench className="w-5 h-5" />}>
              <div className="flex flex-col h-full justify-between">
                {/* Visual flowchart pipeline */}
                <div className="bg-white/50 dark:bg-neutral-900 rounded-xl p-4 border border-black/5 dark:border-white/5 mb-5 select-none shadow-sm flex flex-col justify-center gap-2">
                  <div className="flex items-center justify-between text-[9px] font-mono text-gray-500 pb-1.5 border-b border-black/5 dark:border-white/5 mb-1">
                    <span className="flex items-center gap-1"><GitBranch className="w-2.5 h-2.5" /> deploy_run</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold px-2 py-1 bg-black/5 dark:bg-white/5 rounded-md">
                    <span className="text-gray-500">Docker</span>
                    <span className="text-emerald-500">Containerized</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold px-2 py-1 bg-black/5 dark:bg-white/5 rounded-md">
                    <span className="text-gray-500">APISIX / Nginx</span>
                    <span className="text-emerald-500">Gateway</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold px-2 py-1 bg-black/5 dark:bg-white/5 rounded-md">
                    <span className="text-gray-500">AWS / Cloud</span>
                    <span className="text-orange-500">Live</span>
                  </div>
                </div>
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {['Docker', 'CI/CD', 'AWS', 'Gateway'].map((item) => (
                    <span key={item} className="px-2.5 py-1 text-xs font-bold text-gray-800 dark:text-gray-200 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-md">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </SkillCard>

            {/* 5. Tools Widget */}
            <SkillCard title="Workbench // WORKFLOW" icon={<Palette className="w-5 h-5" />}>
              <div className="flex flex-col h-full justify-between">
                {/* Interactive Grid Mockup */}
                <div className="grid grid-cols-2 gap-2 mb-5 select-none text-center">
                  <div className="p-2 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5 font-semibold text-xs text-gray-700 dark:text-gray-300">
                    GitHub / VCS
                  </div>
                  <div className="p-2 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5 font-semibold text-xs text-gray-700 dark:text-gray-300">
                    Postman / API
                  </div>
                  <div className="p-2 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5 font-semibold text-xs text-gray-700 dark:text-gray-300">
                    VS Code / Editor
                  </div>
                  <div className="p-2 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5 font-semibold text-xs text-gray-700 dark:text-gray-300">
                    Figma / Design
                  </div>
                </div>
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {['Git', 'Postman', 'VS Code', 'Figma'].map((item) => (
                    <span key={item} className="px-2.5 py-1 text-xs font-bold text-gray-800 dark:text-gray-200 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-md">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </SkillCard>

            {/* 6. Languages Widget */}
            <SkillCard title="Metrics // LANGUAGES" icon={<Users className="w-5 h-5" />}>
              <div className="flex flex-col h-full justify-between">
                {/* Stats indicators */}
                <div className="space-y-2.5 mb-5 select-none font-semibold text-xs">
                  <div>
                    <div className="flex justify-between mb-1 text-gray-500">
                      <span>Thai</span>
                      <span className="text-orange-500">Native (100%)</span>
                    </div>
                    <div className="w-full bg-black/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full w-full rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-gray-500">
                      <span>English</span>
                      <span className="text-orange-500">Intermediate (70%)</span>
                    </div>
                    <div className="w-full bg-black/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full w-[70%] rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-gray-500">
                      <span>Adaptability &amp; Continuous Learning</span>
                      <span className="text-emerald-500 font-bold">Excellent</span>
                    </div>
                    <div className="w-full bg-black/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[95%] rounded-full" />
                    </div>
                  </div>
                </div>
                {/* Soft skills list */}
                <div className="flex flex-wrap gap-1.5">
                  {['Thai', 'English', 'Adaptability', 'Learning'].map((item) => (
                    <span key={item} className="px-2.5 py-1 text-xs font-bold text-gray-800 dark:text-gray-200 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-md">
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
