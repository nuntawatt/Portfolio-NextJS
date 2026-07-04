'use client';

import { BioCard } from './BioCard';
import { EducationCard } from './EducationCard';
import { StatCard } from './StatCard';
import { STATS } from '../constants/data';
import { useTranslation } from '@/shared/providers/LanguageProvider';
import { ScrollReveal } from '@/shared/ui';

// AboutSection: คอมโพเนนต์หลักสำหรับส่วน "เกี่ยวกับฉัน" (About Section) แสดงข้อมูลประวัติ ค่าสถิติ และการศึกษา
export function AboutSection() {
    // ดึงฟังก์ชันแปลภาษาสำหรับรองรับการแสดงผลหลายภาษา
    const { t } = useTranslation();

    return (
        <section
            id="about"
            className="relative scroll-mt-24 py-16 md:py-24 lg:py-28 overflow-hidden bg-transparent transition-colors duration-300"
        >
            {/* ── Background: static texture, no motion ── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="about-wash" />

            </div>

            {/* ── Content ── */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Row: Title + Pull Quote */}
                <ScrollReveal direction="up">
                <div className="grid lg:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-center mb-12 lg:mb-20">
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
                    <div className="w-full relative border-l-2 border-orange-500 pl-6 sm:pl-8">
                        <p className="text-xl md:text-2xl font-light text-foreground/95 leading-relaxed">
                            {t('about.pull_quote')}
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                            <span className="w-8 h-px bg-border" />
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground" style={{ letterSpacing: '0.12em' }}>{t('about.philosophy')}</p>
                        </div>
                    </div>
                </div>
                </ScrollReveal>

                {/* Content Row: Bio + Stats */}
                <ScrollReveal direction="up" delay={0.15}>
                <div className="grid lg:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-start mb-16 lg:mb-24">
                    <BioCard />

                    <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-2 gap-4">
                            {STATS.map((stat, index) => (
                                <StatCard key={stat.label} stat={stat} index={index} />
                            ))}
                        </div>
                        <EducationCard />
                    </div>
                </div>
                </ScrollReveal>
            </div>
        </section>
    );
}