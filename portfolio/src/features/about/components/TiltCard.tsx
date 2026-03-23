'use client';

import { useCallback, useRef } from 'react';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    maxDeg?: number;
    onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseLeave?: () => void;
}

// A reusable card component that applies a 3D tilt effect on mouse movement.
export function TiltCard({ children, className, style, maxDeg = 12, onMouseMove: externalOnMouseMove, onMouseLeave: externalOnMouseLeave }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const el = ref.current;
            if (!el) return;

            const { left, top, width, height } = el.getBoundingClientRect();
            const x = ((e.clientX - left) / width - 0.5) * maxDeg;
            const y = ((e.clientY - top) / height - 0.5) * maxDeg;

            el.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.025,1.025,1.025)`;
            el.style.transition = 'transform 0.05s linear';
            
            // Call external handler if provided
            if (externalOnMouseMove) {
                externalOnMouseMove(e);
            }
        },
        [maxDeg, externalOnMouseMove],
    );

    const handleMouseLeave = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
        el.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)';
        
        // Call external handler if provided
        if (externalOnMouseLeave) {
            externalOnMouseLeave();
        }
    }, [externalOnMouseLeave]);

    return (
        <div
            ref={ref}
            className={className}
            style={{ ...style, transformStyle: 'preserve-3d', willChange: 'transform' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    );
}