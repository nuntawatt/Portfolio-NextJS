import React, { useState } from 'react';
import { GraduationCap } from '../icons/Icon';

export function EducationCard() {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCoords({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        if (!hovered) setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <div
            className="relative rounded-[20px] p-5 overflow-hidden bg-card/60 border border-border backdrop-blur-xl transition-all duration-300 group cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
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
                        Education
                    </p>
                    <p className="font-bold text-sm text-foreground leading-snug transition-colors">
                        B.Sc. Computer &amp; Information Science
                    </p>
                    <p className="text-xs mt-0.5 text-muted-foreground transition-colors">
                        Khon Kaen University · GPAX 3.26 · May 2026
                    </p>
                </div>
            </div>
        </div>
    );
}