import React from 'react';
import { Button } from '@/shared/components/Button';
import { ArrowRight } from 'lucide-react';

export function ContactCTA() {
  return (
    <section id="contact" className="scroll-mt-24 py-16 md:py-20 relative overflow-hidden bg-gray-100 dark:bg-white/[0.01] transition-colors duration-300">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange-500/10 dark:bg-orange-600/10 blur-[150px] rounded-full -z-10 pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-7 transition-colors">
          Let's Build Something <span className="text-gradient">Amazing</span> Together
        </h2>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed transition-colors">
          Whether you have a project in mind or just want to chat about architecture and code, feel free to reach out. I'm currently open for new opportunities.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button variant="primary" className="text-lg px-8 py-4 tracking-wide w-full sm:w-auto">
            Get in touch <ArrowRight className="ml-3 w-5 h-5" />
          </Button>
          <Button variant="outline" className="text-lg px-8 py-4 text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400 transition-colors w-full sm:w-auto">
            nanthawat.s@kkumail.com
          </Button>
        </div>
      </div>
    </section>
  );
}
