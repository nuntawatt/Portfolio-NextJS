import { HeroSection } from "@/features/portfolio/components/HeroSection";
import { SkillsSection } from "@/features/portfolio/components/SkillsSection";
import { ProjectsSection } from "@/features/portfolio/components/ProjectsSection";
import { ContactCTA } from "@/features/portfolio/components/ContactCTA";
import { TiltCard } from "@/features/about/components/TiltCard";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col bg-transparent">
      <main className="flex-1">
        <HeroSection />
        <TiltCard>
          <SkillsSection />
        </TiltCard>
        <ProjectsSection />
        <ContactCTA />
      </main>
    </div>
  );
}
