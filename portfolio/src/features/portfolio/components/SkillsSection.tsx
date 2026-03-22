import React from 'react';
import { Card } from '@/shared/components/Card';
import { Database, Layers, Network, Server, ShieldCheck, TerminalSquare } from 'lucide-react';

const skills = [
  {
    title: 'System Architecture',
    icon: <Network className="w-6 h-6 text-orange-500" />,
    items: ['Microservices', 'REST APIs', 'System Design', 'Event-Driven Arch', 'Caching']
  },
  {
    title: 'Core Backend',
    icon: <Server className="w-6 h-6 text-orange-500" />,
    items: ['Node.js', 'NestJS', 'Express', 'TypeScript', 'WebSockets']
  },
  {
    title: 'Data & State',
    icon: <Database className="w-6 h-6 text-orange-500" />,
    items: ['PostgreSQL', 'Redis', 'MongoDB', 'Prisma', 'TypeORM']
  },
  {
    title: 'Frontend Ecosystem',
    icon: <Layers className="w-6 h-6 text-orange-500" />,
    items: ['React', 'Next.js', 'Tailwind CSS', 'Redux', 'Zustand']
  },
  {
    title: 'Security & Quality',
    icon: <ShieldCheck className="w-6 h-6 text-orange-500" />,
    items: ['OAuth 2.0', 'RBAC', 'Jest', 'Clean Code', 'SOLID Principles']
  },
  {
    title: 'Infrastructure',
    icon: <TerminalSquare className="w-6 h-6 text-orange-500" />,
    items: ['Docker', 'AWS', 'CI/CD Pipelines', 'Git', 'Linux']
  }
];

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24 py-16 md:py-20 bg-gray-50 dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
            Technical <span className="text-gradient">Expertise</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillGroup, index) => (
            <Card key={index} hoverEffect={true} className="flex flex-col h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-orange-100 dark:bg-orange-500/10 rounded-xl">
                  {skillGroup.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors">
                  {skillGroup.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item, itemIndex) => (
                  <span
                    key={itemIndex}
                    className="px-3 py-1.5 text-sm font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
