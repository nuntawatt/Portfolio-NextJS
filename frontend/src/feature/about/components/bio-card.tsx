'use client';

import { GitHub, MapPin, Phone } from '../icons/icon';
import { useTranslation } from '@/shared/LanguageProvider';
import { useSpotlight } from '@/shared/use-spotlight';

const CONTACT_LINKS = [
    { href: 'https://github.com/nuntawatt', icon: <GitHub />, label: 'GitHub', variant: 'primary' as const },
] as const;

// BioCard: คอมโพเนนต์การ์ดแสดงข้อมูลประวัติย่อ (ชื่อ, บทบาท, สถานที่, ช่องทางติดต่อ) พร้อมเอฟเฟกต์ Spotlight ตามการเลื่อนเมาส์
export function BioCard() {
    // ดึงฟังก์ชันแปลภาษา
    const { t } = useTranslation();
    // ดึงข้อมูลพิกัดและการเลื่อนเมาส์สำหรับเอฟเฟกต์ Spotlight
    const { coords, hovered, spotlightHandlers } = useSpotlight();

    const PROFILE_META = [
        { icon: <MapPin />, text: t('about.location') },
        { icon: <Phone />, text: t('about.phone') },
    ] as const;

    return (
        <div
            className="relative rounded-[24px] p-6 sm:p-8 overflow-hidden bg-card/80 border border-border backdrop-blur-2xl transition-all duration-300 group cursor-pointer"
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

            {/* corner glow */}
            <div
                className="absolute top-0 right-0 w-56 h-56 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 70% 30%, rgba(249,115,22,0.12), transparent 65%)',
                }}
            />

            {/* identity row */}
            <div className="flex items-start gap-5 mb-7">
                <div className="relative flex-shrink-0">
                    <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center border border-border bg-card text-foreground"
                    >
                        {/* Generic dev icon */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="m18 16 4-4-4-4" />
                            <path d="m6 8-4 4 4 4" />
                            <path d="m14.5 4-5 16" />
                        </svg>
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl font-black text-foreground tracking-tight leading-tight transition-colors">
                        {t('about.name')}
                    </h3>
                    <p className="text-sm font-semibold mt-1 text-orange-500">
                        {t('about.role')}
                    </p>
                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                        {PROFILE_META.map(({ icon, text }) => (
                            <span key={text as string} className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors">
                                {icon}
                                {text}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* divider */}
            <div
                className="mb-6 h-px bg-border"
            />

            {/* bio copy */}
            <p className="leading-loose mb-7 text-[0.9375rem] text-foreground/90 transition-colors">
                {t('about.bio1')}
            </p>

            {/* CTA buttons */}
            <div className="flex gap-3 flex-wrap">
                {CONTACT_LINKS.map(({ href, icon, label, variant }) => (
                    <a
                        key={label}
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${variant === 'primary'
                            ? 'border border-border text-foreground hover:bg-secondary bg-transparent hover:shadow-sm'
                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary bg-transparent'
                            }`}
                    >
                        {icon}
                        {label}
                    </a>
                ))}
            </div>
        </div>
    );
}