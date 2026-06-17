import { Card } from '@/shared/components/Card';
import { Github } from 'lucide-react';

const projects = [
  {
    title: 'Face Attendance System',
    description: 'Developed an AI-based face recognition attendance system for automated attendance tracking. Implemented real-time face detection and recognition workflows using OpenCV and computer vision techniques. Designed backend APIs and database operations for attendance management and user records.',
    tags: ['Python', 'OpenCV', 'FastAPI', 'PostgreSQL', 'Docker', 'Minio'],
    githubUrl: 'https://github.com/nuntawatt?tab=repositories',
    liveUrl: '#'
  },
  {
    title: 'WeGo Event Platform',
    description: 'Developed a full-stack web platform for event participation and social interaction. Implemented REST APIs, business logic, and database operations for core system functionalities. Designed responsive frontend interfaces and managed application deployment.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'WebSocket'],
    githubUrl: 'https://github.com/nuntawatt?tab=repositories',
    liveUrl: '#'
  },
  {
    title: 'E-Commerce Shopping Cart',
    description: 'Developed a responsive e-commerce shopping cart interface with product listing and checkout features. Built reusable frontend components and interactive user interfaces. Implemented responsive layouts and client-side state management using modern frontend technologies.',
    tags: ['Next.js', 'React', 'State Management'],
    githubUrl: 'https://github.com/nuntawatt?tab=repositories',
    liveUrl: '#'
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-24 py-16 md:py-24 lg:py-28 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} hoverEffect={true} className="flex flex-col h-full group">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6 font-medium transition-colors">
                  {project.description}
                </p>
              </div>

              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs font-bold text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-5 pt-4 border-t border-gray-200 dark:border-white/10 transition-colors">
                  <a href={project.githubUrl} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2 text-sm font-bold">
                    <Github className="w-4 h-4" />
                    Source
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
