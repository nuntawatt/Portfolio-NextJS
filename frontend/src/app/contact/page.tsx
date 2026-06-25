'use client';

import { Navbar, Footer } from '@/features/navigation';
import { ContactSection } from '@/features/contact';

// หน้าเพจติดต่อ (Contact Page) ประกอบด้วยแถบนำทาง (Navbar), ส่วนฟอร์มติดต่อ (ContactSection) และส่วนท้ายเว็บ (Footer)
export default function ContactPage() {
  return (
    <div className="relative overflow-hidden w-full min-h-screen flex flex-col justify-between">
      <Navbar />
      <ContactSection />
      <Footer />
    </div>
  );
}

