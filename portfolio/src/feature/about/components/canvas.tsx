'use client';

import { useEffect, useRef } from 'react';
import type { ParticleData } from '../types/about';
import { PARTICLE_COLORS } from '../constants/data';

const FOV = 700;
const COUNT = 70;
const LINK_DIST = 90;
const MOUSE_FORCE = 0.00012;

function project(
    nx: number,
    ny: number,
    z: number,
    w: number,
    h: number,
): { px: number; py: number; scale: number } {
    const scale = FOV / (FOV + z);
    return {
        px: (nx - 0.5) * w * scale + w / 2,
        py: (ny - 0.5) * h * scale + h / 2,
        scale,
    };
}

function createParticles(): ParticleData[] {
    return Array.from({ length: COUNT }, () => ({
        x: Math.random(),
        y: Math.random(),
        z: Math.random() * 900 + 100,
        vx: (Math.random() - 0.5) * 0.0003,
        vy: (Math.random() - 0.5) * 0.0003,
        vz: (Math.random() - 0.5) * 1.1,
        size: Math.random() * 2.5 + 0.8,
        opacity: Math.random() * 0.7 + 0.2,
        colorIdx: Math.floor(Math.random() * PARTICLE_COLORS.length),
    }));
}

export function ParticleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d')!;
        const particles = createParticles();
        const mouse = { x: 0.5, y: 0.5 };
        let rafId = 0;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();

        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        const onMouseMove = (e: MouseEvent) => {
            const r = canvas.getBoundingClientRect();
            mouse.x = (e.clientX - r.left) / r.width;
            mouse.y = (e.clientY - r.top) / r.height;
        };
        window.addEventListener('mousemove', onMouseMove);

        const frame = () => {
            const { width: w, height: h } = canvas;
            ctx.clearRect(0, 0, w, h);

            const fx = (mouse.x - 0.5) * MOUSE_FORCE;
            const fy = (mouse.y - 0.5) * MOUSE_FORCE;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                p.x = ((p.x + p.vx + fx) + 1) % 1;
                p.y = ((p.y + p.vy + fy) + 1) % 1;
                p.z = ((p.z + p.vz) + 1000) % 1000;

                const { px, py, scale } = project(p.x, p.y, p.z, w, h);

                // draw connection lines
                for (let j = i + 1; j < particles.length; j++) {
                    const q = particles[j];
                    const { px: qx, py: qy } = project(q.x, q.y, q.z, w, h);
                    const dist = Math.hypot(px - qx, py - qy);

                    if (dist < LINK_DIST) {
                        ctx.beginPath();
                        ctx.moveTo(px, py);
                        ctx.lineTo(qx, qy);
                        ctx.strokeStyle = 'rgba(249,115,22,1)';
                        ctx.globalAlpha = (1 - dist / LINK_DIST) * 0.1 * scale;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }

                // draw particle dot
                ctx.beginPath();
                ctx.arc(px, py, p.size * scale, 0, Math.PI * 2);
                ctx.fillStyle = PARTICLE_COLORS[p.colorIdx];
                ctx.globalAlpha = p.opacity * scale;
                ctx.fill();
            }

            ctx.globalAlpha = 1;
            rafId = requestAnimationFrame(frame);
        };

        frame();

        return () => {
            cancelAnimationFrame(rafId);
            ro.disconnect();
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
        />
    );
}