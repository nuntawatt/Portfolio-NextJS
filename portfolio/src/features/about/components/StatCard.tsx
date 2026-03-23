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
            className="relative rounded-2xl p-6 flex flex-col items-center gap-3 overflow-hidden"
            style={{
                background: 'rgba(255,255,255,0.032)',
                border: '1px solid rgba(249,115,22,0.18)',
                backdropFilter: 'blur(16px)',
            }}
        >
            {/* icon badge */}
            {Icon && (
                <div
                    className="p-2.5 rounded-xl"
                    style={{ background: 'rgba(249,115,22,0.12)', color: '#f97316' }}
                >
                    <Icon />
                </div>
            )}

            {/* animated number */}
            <div ref={ref} className="text-center">
                <p
                    className="font-black leading-none"
                    style={{
                        fontSize: '2.25rem',
                        fontFamily: "'Playfair Display', Georgia, serif",
                        background: 'linear-gradient(135deg, #fb923c, #ea580c)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    {count}
                    {stat.suffix}
                </p>
                <p
                    className="text-xs font-semibold uppercase tracking-widest mt-1"
                    style={{ color: '#6b7280', letterSpacing: '0.12em' }}
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