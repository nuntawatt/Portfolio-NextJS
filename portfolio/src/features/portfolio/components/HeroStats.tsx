type Stat = {
  label: string;
  value: string;
};

type HeroStatsProps = {
  stats: Stat[];
};

export default function HeroStats({ stats }: HeroStatsProps) {
  return (
    <div className="grid w-full gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur sm:grid-cols-3">
      {stats.map((s) => (
        <div key={s.label} className="space-y-1">
          <div className="text-lg font-semibold text-white">{s.value}</div>
          <div className="text-xs text-white/60">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
