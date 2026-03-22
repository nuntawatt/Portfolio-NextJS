import React from 'react';
import { Card } from '@/shared/components/Card';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Scalable E-Commerce Microservices',
    description: 'Architected a distributed e-commerce backend utilizing NestJS and RabbitMQ to process high-volume transactions concurrently. Improved order processing speed and system resilience through decoupled event-driven services and strict PostgreSQL data modeling.',
    tags: ['NestJS', 'RabbitMQ', 'PostgreSQL', 'Microservices', 'Docker'],
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    title: 'Real-Time Telemetry Dashboard',
    description: 'Engineered a highly responsive enterprise dashboard using Next.js and WebSockets to deliver live analytic streams. Optimized data aggregation caching with Redis, reducing database load by 60% and guaranteeing sub-second UI update latency.',
    tags: ['Next.js', 'TypeScript', 'Redis', 'Socket.io', 'System Optimization'],
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    title: 'Enterprise Workflow API',
    description: 'Developed a secure, production-ready REST API featuring granular Role-Based Access Control (RBAC) and automated background notification workers. Ensured zero-downtime deployments and 100% data integrity through comprehensive testing and logging.',
    tags: ['Node.js', 'Express', 'MongoDB', 'RBAC', 'Workers'],
    githubUrl: '#',
    liveUrl: '#'
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-24 py-16 md:py-20 transition-colors duration-300">
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
