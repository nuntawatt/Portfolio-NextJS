import { Navbar, Footer } from '@/feature/navigation';
import { HeroSection } from '@/feature/hero';
import { AboutSection } from '@/feature/about';
import { SkillsSection } from '@/feature/skill';

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
