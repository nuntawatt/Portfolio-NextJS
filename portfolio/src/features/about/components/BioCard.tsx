'use client';

import { TiltCard } from './TiltCard';
import { GitHub, Mail, MapPin, Phone } from '../icons/Icon';

const CONTACT_LINKS = [
    { href: 'https://github.com/nuntawatt', icon: <GitHub />, label: 'GitHub', variant: 'primary' as const },
    { href: 'mailto:nanthawat.s@kkumail.com', icon: <Mail />, label: 'Contact', variant: 'ghost' as const },
] as const;

const PROFILE_META = [
    { icon: <MapPin />, text: 'Khon Kaen, Thailand' },
    { icon: <Phone />, text: '062-520-6392' },
] as const;

export function BioCard() {
    return (
        <TiltCard
            className="relative rounded-3xl p-8 overflow-hidden"
            style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(24px)',
            }}
        >
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
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(135deg, #f97316, #ea580c)',
                            boxShadow: '0 0 28px rgba(249,115,22,0.5)',
                            color: '#fff',
                        }}
                    >
                        {/* Generic dev icon */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="m18 16 4-4-4-4" />
                            <path d="m6 8-4 4 4 4" />
                            <path d="m14.5 4-5 16" />
                        </svg>
                    </div>

                    {/* online indicator */}
                    <span
                        className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500"
                        style={{ border: '2px solid #080808' }}
                        aria-label="Available for work"
                    />
                </div>

                <div>
                    <h3
                        style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: '1.6rem',
                            fontWeight: 900,
                            color: '#f9fafb',
                            letterSpacing: '-0.02em',
                            lineHeight: 1.1,
                        }}
                    >
                        Nuntawat Sae-Huam
                    </h3>
                    <p className="text-sm font-semibold mt-1" style={{ color: '#fb923c' }}>
                        Full-Stack Engineer · AI Enthusiast
                    </p>
                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                        {PROFILE_META.map(({ icon, text }) => (
                            <span key={text} className="flex items-center gap-1.5 text-xs" style={{ color: '#6b7280' }}>
                                {icon}
                                {text}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* divider */}
            <div
                className="mb-6 h-px"
                style={{ background: 'linear-gradient(to right, rgba(249,115,22,0.3), transparent)' }}
            />

            {/* bio copy */}
            <p className="leading-loose mb-4" style={{ color: '#d1d5db', fontSize: '0.9375rem' }}>
                Computer and Information Science student at{' '}
                <span style={{ color: '#fb923c', fontWeight: 700 }}>Khon Kaen University</span>{' '}
                (Expected May 2026, GPAX 3.21), focused on architecting scalable backend systems,
                full-stack web applications, and machine learning–driven solutions.
            </p>
            <p className="leading-loose mb-7" style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                From building real-time CCTV detection pipelines with{' '}
                <span style={{ color: '#fb923c' }}>YOLOv5</span> to shipping e-commerce platforms—I
                obsess over clean architecture, performance, and code that is maintainable long after
                handoff. Fluent in Thai, conversational in English.
            </p>

            {/* CTA buttons */}
            <div className="flex gap-3 flex-wrap">
                {CONTACT_LINKS.map(({ href, icon, label, variant }) => (
                    <a
                        key={label}
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold"
                        style={
                            variant === 'primary'
                                ? {
                                    background: 'linear-gradient(135deg, #f97316, #ea580c)',
                                    color: '#fff',
                                    boxShadow: '0 4px 18px rgba(249,115,22,0.35)',
                                    textDecoration: 'none',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                }
                                : {
                                    background: 'rgba(249,115,22,0.08)',
                                    border: '1px solid rgba(249,115,22,0.3)',
                                    color: '#fb923c',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s',
                                }
                        }
                        onMouseEnter={(e) => {
                            const el = e.currentTarget;
                            el.style.transform = 'scale(1.05)';
                            if (variant === 'primary') el.style.boxShadow = '0 8px 28px rgba(249,115,22,0.5)';
                            else el.style.background = 'rgba(249,115,22,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget;
                            el.style.transform = 'scale(1)';
                            if (variant === 'primary') el.style.boxShadow = '0 4px 18px rgba(249,115,22,0.35)';
                            else el.style.background = 'rgba(249,115,22,0.08)';
                        }}
                    >
                        {icon}
                        {label}
                    </a>
                ))}
            </div>
        </TiltCard>
    );
}