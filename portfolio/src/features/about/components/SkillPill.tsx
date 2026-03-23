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
                className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl cursor-default select-none overflow-hidden"
                style={{
                    background: hovered
                        ? 'linear-gradient(135deg, rgba(249,115,22,0.2), rgba(234,88,12,0.12))'
                        : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${hovered ? 'rgba(249,115,22,0.5)' : 'rgba(255,255,255,0.08)'}`,
                    transform: hovered
                        ? 'perspective(300px) translateZ(10px) scale(1.04)'
                        : 'perspective(300px) translateZ(0px) scale(1)',
                    boxShadow: hovered ? '0 8px 24px rgba(249,115,22,0.25)' : 'none',
                    transition: 'all 0.28s cubic-bezier(0.34,1.56,0.64,1)',
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* tech icon or generic fallback */}
                <span style={{ color: hovered ? '#fb923c' : '#9ca3af', transition: 'color 0.25s ease' }}>
                    {TechIcon ? <TechIcon /> : <Code2 size={14} />}
                </span>

                {/* label */}
                <span
                    className="text-sm font-semibold"
                    style={{ color: hovered ? '#fff' : '#d1d5db', transition: 'color 0.25s ease' }}
                >
                    {skill.label}
                </span>

                {/* proficiency dots */}
                <span className="ml-auto flex gap-0.5" aria-label={`Proficiency: ${skill.level} of ${DOT_COUNT}`}>
                    {Array.from({ length: DOT_COUNT }, (_, i) => (
                        <span
                            key={i}
                            className="block w-1 h-1 rounded-full"
                            style={{
                                background: i < skill.level
                                    ? hovered ? '#f97316' : 'rgba(249,115,22,0.7)'
                                    : 'rgba(255,255,255,0.12)',
                                transition: 'background 0.25s ease',
                            }}
                        />
                    ))}
                </span>
            </div>
        </div>
    );
}