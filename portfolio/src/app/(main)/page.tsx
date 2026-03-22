import AboutPreviewSection from "@/features/portfolio/components/AboutPreviewSection";
import ContactCtaSection from "@/features/portfolio/components/ContactCtaSection";
import HeroSection from "@/features/portfolio/components/HeroSection";
import ProjectsPreviewSection from "@/features/portfolio/components/ProjectsPreviewSection";
import SkillsSection from "@/features/portfolio/components/SkillsSection";
import { featuredProjects } from "@/features/portfolio/data/projects";
import { skillGroups } from "@/features/portfolio/data/skills";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50">
      <main className="flex-1">
        <HeroSection
          name="Mg"
          role="Backend Developer / Fullstack"
          description="I build reliable backends, clean UIs, and pragmatic systems that ship fast and scale."
        />

        <AboutPreviewSection description="I&apos;m a developer focused on building maintainable products with clean architecture, strong DX, and great performance." />

        <SkillsSection groups={skillGroups} />

        <ProjectsPreviewSection projects={featuredProjects} />

        <ContactCtaSection description="Have a project in mind or want to collaborate? Let&apos;s talk." />
      </main>
    </div>
  );
}
