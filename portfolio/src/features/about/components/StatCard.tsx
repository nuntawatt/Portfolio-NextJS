'use client';

import { TiltCard } from './TiltCard';
import { ICON_MAP } from '../icons/Icon';
import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';
import type { StatItem } from '../types/about';

interface StatCardProps {
    stat: StatItem;
}

export function StatCard({ stat }: StatCardProps) {
    const [ref, inView] = useInView<HTMLDivElement>(0.4);
    const count = useCountUp(stat.value, inView);
    const Icon = ICON_MAP[stat.iconKey];

    return (
        <TiltCard
            className="relative rounded-2xl p-6 flex flex-col items-center gap-3 overflow-hidden bg-white/60 dark:bg-white/[0.032] border border-orange-200/60 dark:border-orange-500/[0.18] backdrop-blur-xl transition-colors duration-300"
        >
            {/* icon badge */}
            {Icon && (
                <div className="p-2.5 rounded-xl bg-orange-100 dark:bg-orange-500/[0.12] text-orange-500 transition-colors">
                    <Icon />
                </div>
            )}

            {/* animated number */}
            <div ref={ref} className="text-center">
                <p className="font-black leading-none text-4xl text-gradient">
                    {count}
                    {stat.suffix}
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest mt-1 text-gray-500 dark:text-gray-500 transition-colors"
                    style={{ letterSpacing: '0.12em' }}
                >
                    {stat.label}
                </p>
            </div>

            {/* hover glow */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(249,115,22,0.08) 0%, transparent 65%)' }}
            />
        </TiltCard>
    );
}