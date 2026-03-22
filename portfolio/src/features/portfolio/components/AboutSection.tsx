import React from 'react';
import { Card } from '@/shared/components/Card';

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 py-16 md:py-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
        </div>

        <Card className="max-w-4xl mx-auto">
          <div className="prose md:prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed mb-6 font-medium transition-colors">
              I am a software engineer specializing in architecting scalable backend systems and robust full-stack applications. I leverage clean architecture patterns and modern technologies to deliver high-performance, maintainable solutions that drive immediate business value.
            </p>
            <div className="mt-8 flex flex-wrap gap-2 sm:gap-4 items-center">
              <a href="#projects" className="text-orange-600 dark:text-orange-500 font-bold hover:text-orange-700 dark:hover:text-orange-400 transition-colors flex items-center gap-2 whitespace-nowrap">
                See my work in action
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <a href="/resume.pdf" target="_blank" className="text-gray-600 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-white transition-colors">
                Download Resume
              </a>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
