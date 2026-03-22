import type { SkillGroup } from "../types/portfolio.type";
import SkillList from "./SkillList";

type SkillsSectionProps = {
  groups: SkillGroup[];
};

export default function SkillsSection({ groups }: SkillsSectionProps) {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-zinc-950">Skills</h2>
            <p className="text-sm leading-6 text-zinc-600 sm:text-base">
              A quick snapshot of what I use to build and ship products.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((g) => (
              <div key={g.id} className="rounded-xl border border-black/10 bg-white p-6">
                <div className="mb-4 text-sm font-medium text-zinc-950">{g.title}</div>
                <SkillList skills={g.skills} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
