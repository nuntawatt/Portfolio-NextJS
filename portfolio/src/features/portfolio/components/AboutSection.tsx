import React from 'react';
import { Card } from '@/shared/components/Card';

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
        </div>

        <Card className="max-w-4xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 transition-colors">
              I am a passionate software engineer specializing in backend development and fullstack solutions. With a strong foundation in modern web technologies, I focus on building scalable, performant, and maintainable systems.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 transition-colors">
              My approach combines clean architecture principles with pragmatic problem-solving. I thrive in environments where I can tackle complex technical challenges while delivering exceptional user experiences.
            </p>
            <div className="mt-8">
              <button className="text-orange-600 dark:text-orange-500 font-medium hover:text-orange-700 dark:hover:text-orange-400 transition-colors flex items-center gap-2">
                Learn more about my journey
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
