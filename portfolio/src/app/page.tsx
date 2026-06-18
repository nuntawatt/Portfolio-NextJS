import dynamic from 'next/dynamic';
import { Navbar, Footer } from '@/feature/navigation';
import { HeroSection } from '@/feature/hero';

const AboutSection = dynamic(
  () => import('@/feature/about').then((mod) => mod.AboutSection)
);

const SkillsSection = dynamic(
  () => import('@/feature/skill').then((mod) => mod.SkillsSection)
);

export default async function Home() {
  return (
    <div className="relative overflow-hidden w-full">
      <Navbar />

      <main className="flex flex-col w-full relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
      </main>

      <Footer />
    </div>
  );
}
