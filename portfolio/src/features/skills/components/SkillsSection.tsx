import { Card } from '@/shared/components/Card';
import { Monitor, Database, Palette, Cpu, Wrench, Users } from 'lucide-react';

const skills = [
  {
    title: 'Frontend',
    icon: <Monitor className="w-6 h-6 text-orange-500" />,
    items: ['Next.js', 'React.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3']
  },
  {
    title: 'Backend',
    icon: <Cpu className="w-6 h-6 text-orange-500" />,
    items: ['Node.js', 'NestJS', 'FastAPI', 'Go']
  },
  {
    title: 'Database',
    icon: <Database className="w-6 h-6 text-orange-500" />,
    items: ['PostgreSQL', 'MongoDB', 'Redis (caching)']
  },
  {
    title: 'DevOps & Cloud',
    icon: <Wrench className="w-6 h-6 text-orange-500" />,
    items: ['Docker', 'CI/CD (GitHub Action)', 'Apisix', 'Nginx', 'Portainer', 'AWS', 'Cloudflare']
  },
  {
    title: 'Tools & Workflow',
    icon: <Palette className="w-6 h-6 text-orange-500" />,
    items: ['Git', 'GitHub', 'Postman', 'VS Code', 'Figma']
  },
  {
    title: 'Languages & Soft Skills',
    icon: <Users className="w-6 h-6 text-orange-500" />,
    items: ['Thai (Native)', 'English (Intermediate)', 'Adaptability', 'Continuous Learning']
  }
];

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24 py-16 md:py-24 lg:py-28 bg-gray-50 dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
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
