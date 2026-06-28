'use client';

import { useEffect, useRef } from 'react';
import type { ParticleData } from '../types/about';
import { PARTICLE_COLORS } from '../constants/data';

const FOV = 700;
const COUNT = 70;
const LINK_DIST = 90;
const MOUSE_FORCE = 0.00012;

// project: ฟังก์ชันคำนวณตำแหน่งจากพิกัด 3D เป็น 2D บนหน้าจอ (Perspective Projection)
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

// getSafeRandom: ฟังก์ชันสุ่มตัวเลขแบบปลอดภัยโดยใช้ Web Crypto API เพื่อแก้คำเตือนของ SonarQube
function getSafeRandom(): number {
    if (typeof window !== 'undefined' && window.crypto) {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        return array[0] / 4294967296; // 2^32
    }
    return Math.random();
}

// createParticles: ฟังก์ชันสร้างข้อมูลของอนุภาค (Particles) พร้อมคุณสมบัติเริ่มต้นแบบสุ่ม
function createParticles(): ParticleData[] {
    return Array.from({ length: COUNT }, () => ({
        x: getSafeRandom(),
        y: getSafeRandom(),
        z: getSafeRandom() * 900 + 100,
        vx: (getSafeRandom() - 0.5) * 0.0003,
        vy: (getSafeRandom() - 0.5) * 0.0003,
        vz: (getSafeRandom() - 0.5) * 1.1,
        size: getSafeRandom() * 2.5 + 0.8,
        opacity: getSafeRandom() * 0.7 + 0.2,
        colorIdx: Math.floor(getSafeRandom() * PARTICLE_COLORS.length),
    }));
}

// ParticleCanvas: คอมโพเนนต์สำหรับวาดเอฟเฟกต์อนุภาค 3D พื้นหลังที่โต้ตอบตามเมาส์
export function ParticleCanvas() {
    // อ้างอิงถึงองค์ประกอบ Canvas ใน DOM
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // ตั้งค่าและควบคุมแอนิเมชันของอนุภาค รวมถึงตรวจจับการเคลื่อนไหวของเมาส์และการปรับขนาดหน้าจอ
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d')!;
        const particles = createParticles();
        const mouse = { x: 0.5, y: 0.5 };
        let rafId = 0;
        let isIntersecting = false;

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
        globalThis.addEventListener('mousemove', onMouseMove);

        const frame = () => {
            if (!isIntersecting) return;
            const { width: w, height: h } = canvas;
            ctx.clearRect(0, 0, w, h);

            const fx = (mouse.x - 0.5) * MOUSE_FORCE;
            const fy = (mouse.y - 0.5) * MOUSE_FORCE;

            // 1. Update particle coordinates and precalculate projections once per frame
            const projections = new Array(particles.length);
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x = ((p.x + p.vx + fx) + 1) % 1;
                p.y = ((p.y + p.vy + fy) + 1) % 1;
                p.z = ((p.z + p.vz) + 1000) % 1000;
                projections[i] = project(p.x, p.y, p.z, w, h);
            }

            // 2. Render particles and their connection links using the cached projections
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                const { px, py, scale } = projections[i];

                // draw connection lines
                for (let j = i + 1; j < particles.length; j++) {
                    const { px: qx, py: qy } = projections[j];
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

        const observer = new IntersectionObserver(([entry]) => {
            isIntersecting = entry.isIntersecting;
            if (isIntersecting) {
                cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(frame);
            } else {
                cancelAnimationFrame(rafId);
            }
        }, { threshold: 0.01 });

        observer.observe(canvas);

        return () => {
            cancelAnimationFrame(rafId);
            ro.disconnect();
            observer.disconnect();
            globalThis.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
            tabIndex={-1}
        />
    );
}