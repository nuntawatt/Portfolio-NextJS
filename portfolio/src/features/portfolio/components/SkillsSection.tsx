import React from 'react';
import { Card } from '@/shared/components/Card';
import { Layers, Server, Wrench } from 'lucide-react';

const skills = [
  {
    title: 'Backend',
    icon: <Server className="w-6 h-6 text-orange-500" />,
    items: ['Node.js', 'Express', 'NestJS', 'PostgreSQL', 'MongoDB', 'Redis']
  },
  {
    title: 'Frontend',
    icon: <Layers className="w-6 h-6 text-orange-500" />,
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'Zustand']
  },
  {
    title: 'Tools & DevOps',
    icon: <Wrench className="w-6 h-6 text-orange-500" />,
    items: ['Git', 'Docker', 'AWS', 'CI/CD', 'Jest', 'Linux']
  }
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-20 bg-gray-50 dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
            Technical <span className="text-gradient">Skills</span>
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
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg hover:border-orange-500/50 dark:hover:border-orange-500/50 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
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
