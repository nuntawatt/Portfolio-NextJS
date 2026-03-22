import type { Skill } from "../types/portfolio.type";

export default function SkillList({ skills }: { skills: Skill[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((s) => (
        <span key={s.id} className="rounded-full border border-black/10 px-3 py-1 text-sm">
          {s.name}
        </span>
      ))}
    </div>
  );
}
