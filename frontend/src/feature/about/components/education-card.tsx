'use client';

import React from 'react';
import { GraduationCap } from '../icons/icon';
import { useTranslation } from '@/shared/providers/LanguageProvider';
import { useSpotlight } from '@/shared/hooks/use-spotlight';

// EducationCard: คอมโพเนนต์การ์ดแสดงข้อมูลประวัติการศึกษา พร้อมเอฟเฟกต์ Spotlight เมื่อเมาส์ชี้ผ่าน
export function EducationCard() {
    // ดึงฟังก์ชันแปลภาษา
    const { t } = useTranslation();
    // ดึงข้อมูลพิกัดการเคลื่อนที่ของเมาส์สำหรับเอฟเฟกต์ Spotlight
    const { coords, hovered, spotlightHandlers } = useSpotlight();

    return (
        <div
            className="relative rounded-[20px] p-5 overflow-hidden bg-card/60 border border-border backdrop-blur-xl transition-all duration-300 group cursor-pointer"
            {...spotlightHandlers}
        >
            {/* spotlight overlay */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 ease-out"
                style={{
                    opacity: hovered ? 1 : 0,
                    background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(249,115,22,0.08), transparent 80%)`,
                }}
            />

            <div className="relative z-10 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border border-border bg-card text-muted-foreground transition-colors group-hover:text-foreground group-hover:border-foreground/30">
                    <GraduationCap />
                </div>

                <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-0.5 text-orange-500"
                        style={{ letterSpacing: '0.12em' }}
                    >
                        {t('about.education.title')}
                    </p>
                    <p className="font-bold text-sm text-foreground leading-snug transition-colors">
                        {t('about.education.degree')}
                    </p>
                    <p className="text-xs mt-0.5 text-muted-foreground transition-colors">
                        {t('about.education.university')}
                    </p>
                </div>
            </div>
        </div>
    );
}