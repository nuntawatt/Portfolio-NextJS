import { Navbar, Footer } from '@/features/navigation';
import { HeroSection } from '@/features/hero';
import { AboutSection } from '@/features/about/components/about';
import { SkillsSection } from '@/features/skills';

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
