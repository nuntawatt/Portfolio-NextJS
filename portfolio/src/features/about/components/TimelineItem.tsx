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
                className="relative rounded-2xl p-5 overflow-hidden"
                style={{
                    background: hovered ? 'rgba(249,115,22,0.05)' : 'rgba(255,255,255,0.025)',
                    border: `1px solid ${hovered ? 'rgba(249,115,22,0.3)' : 'rgba(255,255,255,0.07)'}`,
                    backdropFilter: 'blur(12px)',
                    transition: 'background 0.3s ease, border-color 0.3s ease',
                }}
                onMouseMove={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* header row */}
                <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                    <div className="flex items-center gap-3">
                        <div
                            className="p-2 rounded-lg flex-shrink-0"
                            style={{ background: 'rgba(249,115,22,0.1)', color: '#f97316' }}
                        >
                            <Icon />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-sm leading-snug">{experience.title}</h4>
                            <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>{experience.company}</p>
                        </div>
                    </div>

                    <span
                        className="text-xs font-bold px-3 py-1 rounded-full flex-shrink-0"
                        style={{
                            background: 'rgba(249,115,22,0.12)',
                            border: '1px solid rgba(249,115,22,0.25)',
                            color: '#fb923c',
                            letterSpacing: '0.05em',
                        }}
                    >
                        {experience.period}
                    </span>
                </div>

                {/* description */}
                <p
                    className="text-sm leading-relaxed mb-3"
                    style={{ color: '#9ca3af', paddingLeft: '2.75rem' }}
                >
                    {experience.desc}
                </p>

                {/* tags */}
                <div className="flex gap-2 flex-wrap" style={{ paddingLeft: '2.75rem' }}>
                    {experience.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs font-medium px-2 py-0.5 rounded-md"
                            style={{
                                color: '#fb923c',
                                background: 'rgba(249,115,22,0.08)',
                                border: '1px solid rgba(249,115,22,0.18)',
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </TiltCard>
        </div>
    );
}