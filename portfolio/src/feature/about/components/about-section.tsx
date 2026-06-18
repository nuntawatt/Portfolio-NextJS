'use client';

import { ParticleCanvas } from './particle-canvas';
import { BioCard } from './bio-card';
import { EducationCard } from './education-card';
import { StatCard } from './stat-card';
import { useInView } from '../hooks/use-in-view';
import { STATS } from '../constants/data';
import { motion } from 'motion/react';
import { useTranslation } from '@/shared/providers/LanguageProvider';

// ─── Component ────────────────────────────────────────────────────────────────
export function AboutSection() {
    const [headerRef, headerInView] = useInView<HTMLDivElement>(0.2);
    const { t } = useTranslation();

    return (
        <>
            <style>{`
        @keyframes slide-up {
            from { opacity: 0; transform: translateY(32px); }
            to   { opacity: 1; transform: translateY(0);    }
        }
        .about-slide-up {
            animation: slide-up 0.75s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* Static grain texture — replaces the animated floating orbs.
           A single fixed noise layer keeps the section calm and tactile
           instead of "alive", matching the rest of the page's quiet motion budget. */
        .about-grain {
            position: absolute;
            inset: 0;
            pointer-events: none;
            opacity: 0.5;
            mix-blend-mode: multiply;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        @media (prefers-color-scheme: dark) {
            .about-grain { mix-blend-mode: screen; opacity: 0.35; }
        }

        /* One quiet, fixed wash of brand color in the corner — not animated,
           not multiplied. Reads as a deliberate accent, not ambient decoration. */
        .about-wash {
            position: absolute;
            top: -120px;
            right: -160px;
            width: 560px;
            height: 560px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(249,115,22,0.10), transparent 70%);
            pointer-events: none;
        }
        `}</style>

            <section
                id="about"
                className="relative scroll-mt-24 py-16 md:py-24 lg:py-28 overflow-hidden bg-transparent transition-colors duration-300"
            >
                {/* ── Background: static texture, no motion ── */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    <ParticleCanvas />
                    <div className="about-wash" />
                    <div className="about-grain" />
                </div>

                {/* ── Content ── */}
                <div
                    className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 about-slide-up"
                    style={{ opacity: headerInView ? undefined : 0 }}
                >
                    {/* Header Row: Title + Pull Quote */}
                    <div ref={headerRef} className="grid lg:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-center mb-12 lg:mb-20">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest mb-4 sm:mb-5 flex items-center gap-3 text-muted-foreground"
                                style={{ letterSpacing: '0.2em' }}
                            >
                                <span className="block w-6 sm:w-8 h-px bg-orange-500" />
                                {t('about.eyebrow')}
                            </p>
                            <h2
                                className="font-black leading-tight tracking-tight text-foreground"
                                style={{
                                    fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                                    letterSpacing: '-0.03em',
                                }}
                            >
                                {t('about.title_prefix')}
                                <em className="not-italic text-orange-500">
                                    {t('about.title_highlight')}
                                </em>
                            </h2>
                        </div>

                        {/* Editorial pull-quote — replaces the fake-terminal/macOS-window mockup.
                            Large-set serif-weight statement, single rule, no chrome. */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.3,
                                duration: 0.7,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            viewport={{ once: true }}
                            className="w-full relative border-l-2 border-orange-500 pl-6 sm:pl-8"
                        >
                            <p className="text-xl md:text-2xl font-light text-foreground/95 leading-relaxed">
                                {t('about.pull_quote')}
                            </p>
                            <div className="mt-6 flex items-center gap-3">
                                <span className="w-8 h-px bg-border" />
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground" style={{ letterSpacing: '0.12em' }}>{t('about.philosophy')}</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Content Row: Bio + Stats */}
                    <div className="grid lg:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-start mb-16 lg:mb-24">
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


                </div>
            </section>
        </>
    );
}