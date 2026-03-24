'use client';

import { useState } from 'react';
import { Code2 } from '../icons/Icon';
import { TECH_ICON_MAP } from '../icons/TechIcons';
import { useInView } from '../hooks/useInView';
import type { SkillItem } from '../types/about';

interface SkillPillProps {
    skill: SkillItem;
    index: number;
}

const DOT_COUNT = 5;

export function SkillPill({ skill, index }: SkillPillProps) {
    const [ref, inView] = useInView<HTMLDivElement>(0.1);
    const [hovered, setHovered] = useState(false);

    const TechIcon = TECH_ICON_MAP[skill.label];

    return (
        <div
            ref={ref}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(16px)',
                transition: `opacity 0.45s ${index * 0.04}s ease, transform 0.45s ${index * 0.04}s ease`,
            }}
        >
            <div
                role="listitem"
                className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl cursor-default select-none overflow-hidden transition-all duration-300 ${
                    hovered
                        ? 'bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/50 shadow-lg shadow-orange-500/25 scale-[1.04]'
                        : 'bg-white/60 dark:bg-white/[0.04] border border-gray-200/60 dark:border-white/[0.08]'
                }`}
                style={{
                    transform: hovered
                        ? 'perspective(300px) translateZ(10px) scale(1.04)'
                        : 'perspective(300px) translateZ(0px) scale(1)',
                    transition: 'all 0.28s cubic-bezier(0.34,1.56,0.64,1)',
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* tech icon or generic fallback */}
                <span className={`transition-colors duration-250 ${hovered ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>
                    {TechIcon ? <TechIcon /> : <Code2 size={14} />}
                </span>

                {/* label */}
                <span className={`text-sm font-semibold transition-colors duration-250 ${
                    hovered ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                }`}>
                    {skill.label}
                </span>

                {/* proficiency dots */}
                <span className="ml-auto flex gap-0.5" aria-label={`Proficiency: ${skill.level} of ${DOT_COUNT}`}>
                    {Array.from({ length: DOT_COUNT }, (_, i) => (
                        <span
                            key={i}
                            className={`block w-1 h-1 rounded-full transition-colors duration-250 ${
                                i < skill.level
                                    ? hovered ? 'bg-orange-500' : 'bg-orange-500/70'
                                    : 'bg-gray-300/40 dark:bg-white/[0.12]'
                            }`}
                        />
                    ))}
                </span>
            </div>
        </div>
    );
}