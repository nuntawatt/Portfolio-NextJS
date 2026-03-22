import React from 'react';
import { Card } from '@/shared/components/Card';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Microservices',
    description: 'A scalable e-commerce backend built with NestJS, RabbitMQ, and PostgreSQL. Features include inventory management, order processing, and payment gateway integration.',
    tags: ['NestJS', 'Microservices', 'PostgreSQL', 'RabbitMQ', 'Docker'],
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    title: 'Real-time Analytics Dashboard',
    description: 'Interactive dashboard for monitoring real-time user metrics. Built with Next.js App Router, combining SSR for fast initial loads and WebSockets for live updates.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Socket.io', 'Redis'],
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    title: 'Task Management API',
    description: 'RESTful API for robust task management with role-based access control, automated email notifications, and detailed activity logging.',
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'SendGrid'],
    githubUrl: '#',
    liveUrl: '#'
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12 md:mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-orange-600 dark:text-orange-500 font-medium hover:text-orange-700 dark:hover:text-orange-400 transition-colors">
            View All
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} hoverEffect={true} className="flex flex-col h-full group">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 transition-colors">
                  {project.description}
                </p>
              </div>
              
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-500/10 px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-white/10 transition-colors">
                  <a href={project.githubUrl} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                  <a href={project.liveUrl} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <a href="#" className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-500 font-medium hover:text-orange-700 dark:hover:text-orange-400 transition-colors">
            View All Projects
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
