'use client';

import { useState } from 'react';
import { TiltCard } from './TiltCard';
import { Briefcase, Rocket } from '../icons/Icon';
import { useInView } from '../hooks/useInView';
import type { ExperienceItem } from '../types/about';

interface TimelineItemProps {
    experience: ExperienceItem;
    index: number;
}

export function TimelineItem({ experience, index }: TimelineItemProps) {
    const [ref, inView] = useInView<HTMLDivElement>(0.15);
    const [hovered, setHovered] = useState(false);

    const Icon = experience.type === 'internship' ? Briefcase : Rocket;

    return (
        <div
            ref={ref}
            className="relative md:ml-14"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateX(-20px)',
                transition: `opacity 0.55s ${index * 0.1}s ease, transform 0.55s ${index * 0.1}s ease`,
            }}
        >
            {/* timeline dot */}
            <div
                className="absolute -left-[3.1rem] top-5 hidden md:flex items-center justify-center w-4 h-4 rounded-full z-10"
                style={{
                    background: 'linear-gradient(135deg, #f97316, #ea580c)',
                    boxShadow: '0 0 14px rgba(249,115,22,0.55)',
                }}
            >
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>

            <TiltCard
                className={`relative rounded-2xl p-5 overflow-hidden backdrop-blur-xl transition-all duration-300 ${
                    hovered
                        ? 'bg-orange-50/80 dark:bg-orange-500/[0.05] border border-orange-300/60 dark:border-orange-500/30'
                        : 'bg-white/60 dark:bg-white/[0.025] border border-gray-200/60 dark:border-white/[0.07]'
                }`}
                onMouseMove={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* header row */}
                <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg flex-shrink-0 bg-orange-100 dark:bg-orange-500/10 text-orange-500 transition-colors">
                            <Icon />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm leading-snug transition-colors">{experience.title}</h4>
                            <p className="text-xs mt-0.5 text-gray-500 dark:text-gray-400 transition-colors">{experience.company}</p>
                        </div>
                    </div>

                    <span className="text-xs font-bold px-3 py-1 rounded-full flex-shrink-0 bg-orange-100 dark:bg-orange-500/[0.12] border border-orange-300/50 dark:border-orange-500/25 text-orange-600 dark:text-orange-400 transition-colors"
                        style={{ letterSpacing: '0.05em' }}
                    >
                        {experience.period}
                    </span>
                </div>

                {/* description */}
                <p className="text-sm leading-relaxed mb-3 text-gray-600 dark:text-gray-400 transition-colors"
                    style={{ paddingLeft: '2.75rem' }}
                >
                    {experience.desc}
                </p>

                {/* tags */}
                <div className="flex gap-2 flex-wrap" style={{ paddingLeft: '2.75rem' }}>
                    {experience.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs font-medium px-2 py-0.5 rounded-md text-orange-600 dark:text-orange-400 bg-orange-100/80 dark:bg-orange-500/[0.08] border border-orange-200/60 dark:border-orange-500/[0.18] transition-colors"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </TiltCard>
        </div>
    );
}