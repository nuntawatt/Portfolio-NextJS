'use client';

import React from 'react';
import { Navbar, Footer } from '@/features/navigation';
import { ContactSection } from '@/features/contact';

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden w-full min-h-screen flex flex-col justify-between">
      <Navbar />
      <ContactSection />
      <Footer />
    </div>
  );
}
