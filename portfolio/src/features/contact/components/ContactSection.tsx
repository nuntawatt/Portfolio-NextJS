'use client';

import React from 'react';
import { ContactForm } from './ContactForm';

export function ContactSection() {
  return (
    <div className="relative w-full flex-1 flex flex-col justify-center">
      {/* Background Grid Overlays matching Home Page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        {/* light mode grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: '60px 60px',
          }}
        />
        {/* dark mode grid */}
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage: [
              'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Main Container */}
      <div className="flex flex-col items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <ContactForm />
      </div>
    </div>
  );
}
