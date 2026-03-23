import { Navbar } from '@/features/portfolio/components/Navbar';
import { HeroSection } from '@/features/portfolio/components/HeroSection';
// import { AboutSection } from '@/features/portfolio/components/AboutSection';
import { AboutSection } from '@/features/about/components/about';
import { SkillsSection } from '@/features/portfolio/components/SkillsSection';
import { ProjectsSection } from '@/features/portfolio/components/ProjectsSection';
import { ContactCTA } from '@/features/portfolio/components/ContactCTA';
import { Footer } from '@/features/portfolio/components/Footer';

export default async function Home() {
  // ลด delay เพื่อให้เห็นหน้า Loading Skeleton (เอาออกได้เมื่อมี API จริง)
  await new Promise((resolve) => setTimeout(resolve, 800));

  return (
    <div className="relative overflow-hidden w-full">
      <Navbar />

      <main className="flex flex-col w-full relative z-10 pt-10">
        {/* We add a pt-10 to offset any sticky header if needed, though Hero has min-h-screen */}
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactCTA />
      </main>

      <Footer />
    </div>
  );
}
