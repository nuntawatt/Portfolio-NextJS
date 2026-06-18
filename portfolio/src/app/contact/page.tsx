'use client';

import { Navbar, Footer } from '@/feature/navigation';
import { ContactSection } from '@/feature/contact';

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden w-full min-h-screen flex flex-col justify-between">
      <Navbar />
      <ContactSection />
      <Footer />
    </div>
  );
}
