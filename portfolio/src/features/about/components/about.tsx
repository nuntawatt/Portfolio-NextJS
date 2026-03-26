'use client';

import { ParticleCanvas } from './ParticleCanvas';
import { BioCard } from './BioCard';
import { EducationCard } from './EducationCard';
import { StatCard } from './StatCard';
import { SkillPill } from './SkillPill';
import { SectionLabel } from './SectionLabel';
import { TimelineItem } from './TimelineItem';
import { useInView } from '../hooks/useInView';
import { STATS, SKILLS, EXPERIENCES } from '../constants/data';
import { motion } from 'motion/react';
import { TypingTerminal } from '@/animation/ui/TypingTerminal';

// ─── Background: floating blurred orbs ───────────────────────────────────────
const ORBS = [
    { w: 500, h: 500, x: '-8%', y: '-10%', color: 'rgba(249,115,22,1)', d: '7s', delay: '0s' },
    { w: 380, h: 380, x: '72%', y: '40%', color: 'rgba(234,88,12,1)', d: '9s', delay: '2s' },
    { w: 280, h: 280, x: '40%', y: '78%', color: 'rgba(253,186,116,1)', d: '11s', delay: '4s' },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────
export function AboutSection() {
    const [headerRef, headerInView] = useInView<HTMLDivElement>(0.2);

    return (
        <>
            <style>{`
        @keyframes orb-drift {
            0%   { transform: translate(0, 0) scale(1);          opacity: .15; }
            50%  { transform: translate(20px, -30px) scale(1.08); opacity: .22; }
            100% { transform: translate(-10px, 15px) scale(.95);  opacity: .12; }
        }
        @keyframes slide-up {
            from { opacity: 0; transform: translateY(32px); }
            to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes dot-breathe {
            0%, 100% { box-shadow: 0 0 0 0   rgba(249,115,22,0.5); }
            50%      { box-shadow: 0 0 0 6px rgba(249,115,22,0);   }
        }

        .about-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(60px);
            pointer-events: none;
            opacity: 0.15;
            animation: orb-drift ease-in-out infinite alternate;
        }
        .about-slide-up {
            animation: slide-up 0.75s cubic-bezier(0.22,1,0.36,1) both;
        }
        .about-status-dot {
            animation: dot-breathe 2s ease-in-out infinite;
        }
        `}</style>

            <section
                id="about"
                className="relative scroll-mt-24 py-28 overflow-hidden bg-gray-50 dark:bg-[#080808] transition-colors duration-300"
            >
                {/* ── Background ── */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    <ParticleCanvas />
                    {ORBS.map((orb) => (
                        <div
                            key={orb.x}
                            className="about-orb"
                            style={{
                                width: orb.w,
                                height: orb.h,
                                left: orb.x,
                                top: orb.y,
                                background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
                                animationDuration: orb.d,
                                animationDelay: orb.delay,
                            }}
                        />
                    ))}
                    {/* subtle dot-grid */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: [
                                'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)',
                                'linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
                            ].join(', '),
                            backgroundSize: '60px 60px',
                        }}
                    />
                    {/* dark mode overlay for grid */}
                    <div
                        className="absolute inset-0 hidden dark:block"
                        style={{
                            backgroundImage: [
                                'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)',
                                'linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
                            ].join(', '),
                            backgroundSize: '60px 60px',
                        }}
                    />
                </div>

                {/* ── Content ── */}
                <div 
                    className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 about-slide-up"
                    style={{ opacity: headerInView ? undefined : 0 }}
                >
                    {/* Header Row: Title + Terminal */}
                    <div ref={headerRef} className="grid lg:grid-cols-[1fr_480px] gap-16 items-center mb-12">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest mb-5 flex items-center gap-3 text-orange-500"
                                style={{ letterSpacing: '0.2em' }}
                            >
                                <span className="block w-8 h-px bg-orange-500" />
                                Who I Am
                            </p>
                            <h2
                                className="font-black leading-none tracking-tight text-gray-900 dark:text-gray-50"
                                style={{
                                    fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                                    letterSpacing: '-0.03em',
                                }}
                            >
                                About{' '}
                                <em className="not-italic text-gradient">
                                    Me.
                                </em>
                            </h2>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 40, scale: 0.95 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ 
                                delay: 0.4, 
                                duration: 0.8, 
                                ease: [0.16, 1, 0.3, 1] 
                            }}
                            viewport={{ once: true }}
                            className="w-full relative group"
                        >
                            <div className="absolute -inset-4 bg-orange-500/10 dark:bg-orange-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                            
                            <TypingTerminal 
                                key={6} 
                                lines={[
                                    "Fetching technical_stack.json... [OK]",
                                    "import { Creativity, Logic } from 'morgorn-dev';",
                                    "const name = 'Morgorn';",
                                    "const role = 'Fullstack Developer';",
                                    "console.log('Welcome to my portfolio!');",
                                    "console.log('Ready to build something amazing?');",
                                ]} 
                            />
                        </motion.div>
                    </div>

                    {/* Content Row: Bio + Stats */}
                    <div className="grid lg:grid-cols-[1fr_480px] gap-16 items-start mb-24">
                        <BioCard />

                        <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-2 gap-4">
                                {STATS.map((stat) => (
                                    <StatCard key={stat.label} stat={stat} />
                                ))}
                            </div>
                            <EducationCard />
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="mt-12">
                        <SectionLabel>Technical Skills</SectionLabel>
                        <div
                            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5"
                            role="list"
                            aria-label="Skills list"
                        >
                            {SKILLS.map((skill, i) => (
                                <SkillPill key={skill.label} skill={skill} index={i} />
                            ))}
                        </div>
                    </div>

                    {/* Experience */}
                    <div>
                        <SectionLabel>Experience &amp; Projects</SectionLabel>
                        <div className="relative">
                            {/* timeline spine */}
                            <div
                                className="absolute left-6 top-2 bottom-2 w-px hidden md:block"
                                style={{
                                    background: 'linear-gradient(to bottom, transparent, rgba(249,115,22,0.5) 15%, rgba(234,88,12,0.5) 85%, transparent)',
                                }}
                                aria-hidden="true"
                            />
                            <div className="space-y-4">
                                {EXPERIENCES.map((exp, i) => (
                                    <TimelineItem key={exp.title} experience={exp} index={i} />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}