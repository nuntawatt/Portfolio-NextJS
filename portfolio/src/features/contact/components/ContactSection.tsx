'use client';

import React from 'react';
import { ContactForm } from './ContactForm';

export function ContactSection() {
  return (
    <div className="relative w-full flex-1 flex flex-col justify-center">
      {/* Main Container */}
      <div className="flex flex-col items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <ContactForm />
      </div>
    </div>
  );
}
