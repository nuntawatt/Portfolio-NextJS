import React from 'react';
import { Card } from '@/shared/components/Card';
import { Monitor, Database, Palette, Cpu, Wrench, Users } from 'lucide-react';

const skills = [
  {
    title: 'Frontend',
    icon: <Monitor className="w-6 h-6 text-orange-500" />,
    items: ['NextJs', 'TypeScript', 'React', 'HTML5', 'CSS3', 'JavaScript', 'Vite', 'Tailwind CSS']
  },
  {
    title: 'UX/UI Design',
    icon: <Palette className="w-6 h-6 text-orange-500" />,
    items: ['UX/UI Basics', 'Wireframe', 'Figma']
  },
  {
    title: 'Backend',
    icon: <Cpu className="w-6 h-6 text-orange-500" />,
    items: ['NestJS', 'Node.js', 'RESTful API', 'Auth (JWT / Session)', 'WebSocket', 'gRPC', 'RabbitMQ', 'Docker']
  },
  {
    title: 'Database & Cloud',
    icon: <Database className="w-6 h-6 text-orange-500" />,
    items: ['PostgreSQL', 'MongoDB', 'Firebase', 'Google Cloud']
  },
  {
    title: 'Tools & Workflow',
    icon: <Wrench className="w-6 h-6 text-orange-500" />,
    items: ['GitHub', 'Visual Studio Code', 'Postman']
  },
  {
    title: 'Soft Skills',
    icon: <Users className="w-6 h-6 text-orange-500" />,
    items: ['ปรับตัวเข้ากับคนอื่นได้ดี', 'ชอบเรียนรู้สิ่งใหม่ ๆ']
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
