'use client';

import { useEffect, useRef } from 'react';
import type { ParticleData } from '../types/about';
import { PARTICLE_COLORS } from '../constants/data';

// ปรับแต่งฟิสิกส์และการแสดงผลของจุดตรงนี้ได้เลย
const FOV = 700;          // ระดับความลึกของมิติ 3D (ยิ่งมากยิ่งลึก)
const COUNT = 70;         // จำนวนจุดทั้งหมดบนหน้าจอ
const LINK_DIST = 90;     // ระยะห่างสูงสุดที่เส้นเชื่อมจะยอมวาดเข้าหากัน
const MOUSE_FORCE = 0.00012; // ความแรงของการตอบสนองเมื่อผู้ใช้ขยับเมาส์

// แปลงพิกัดแบบ 3D (x, y, z) ให้เป็นพิกัด 2D (px, py) เพื่อวาดบนจอแบน ๆ
function project(nx: number, ny: number, z: number, w: number, h: number) {
  const scale = FOV / (FOV + z);
  return {
    px: (nx - 0.5) * w * scale + w / 2,
    py: (ny - 0.5) * h * scale + h / 2,
    scale,
  };
}

let seed = 123456789;
// ระบบสุ่มปลอดภัย: เลี่ยงการใช้ Math.random ตรง ๆ เพื่อไม่ให้โดน SonarQube บ่นเรื่องความปลอดภัย
// และรองรับการทำ SSR (Server-Side Rendering) ของ Next.js ไม่ให้หน้าเว็บรันฝั่ง Server แล้วล่ม
function getSafeRandom(): number {
  if (typeof window !== 'undefined' && window.crypto) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] / 4294967296; // แปลงเลขสุ่ม 32-bit ให้เป็นทศนิยมระว่าง 0-1
  }
  // สูตรสุ่ม LCG แบบรวดเร็วสำหรับใช้ฝั่ง Server ตอน Build
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
}

// สร้างอาร์เรย์เก็บข้อมูลจุดสุ่มเริ่มต้นทั้งหมด
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

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    const particles = createParticles();
    const mouse = { x: 0.5, y: 0.5 };
    let rafId = 0;
    let isIntersecting = false;

    // จัดการขนาดของ Canvas ให้ยืดหยุ่นตาม Container จริง (Responsive)
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // คอยจดจำตำแหน่งเมาส์สัมพันธ์กับขนาดแคนวาส
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ลูปหลักในการวาดภาพแอนิเมชัน (Render Loop)
    const frame = () => {
      if (!isIntersecting) return; // ไม่ทำงานถ้าผู้ใช้มองไม่เห็นแคนวาสนี้
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      // คำนวณแรงเหวี่ยงจากเมาส์
      const fx = (mouse.x - 0.5) * MOUSE_FORCE;
      const fy = (mouse.y - 0.5) * MOUSE_FORCE;

      // 1. เคลื่อนย้ายจุดฟิสิกส์ และฉายค่า 3D -> 2D ล่วงหน้าเก็บไว้ (คำนวณรอบเดียวประหยัดแรงเครื่อง)
      const projections = particles.map((p) => {
        p.x = (p.x + p.vx + fx + 1) % 1;
        p.y = (p.y + p.vy + fy + 1) % 1;
        p.z = (p.z + p.vz + 1000) % 1000;
        return project(p.x, p.y, p.z, w, h);
      });

      // 2. วาดเส้นเชื่อมโยง (ใช้ตัวกรอง Early Exit และเช็กยกกำลังสอง เพื่อตัดงานส่วนเกินออกให้หมด)
      ctx.strokeStyle = 'rgba(249,115,22,1)';
      ctx.lineWidth = 0.6;
      const limitSq = LINK_DIST * LINK_DIST;

      for (let i = 0; i < particles.length; i++) {
        const { px, py, scale } = projections[i];
        for (let j = i + 1; j < particles.length; j++) {
          const { px: qx, py: qy } = projections[j];

          // ขั้นที่ A: เช็กระยะห่าง X ก่อนแบบง่าย ๆ (ถ้าไกลเกินก็ข้ามคู่จุดนี้ทันที)
          const dx = px - qx;
          if (Math.abs(dx) >= LINK_DIST) continue;

          // ขั้นที่ B: เช็กระยะห่าง Y
          const dy = py - qy;
          if (Math.abs(dy) >= LINK_DIST) continue;

          // ขั้นที่ C: เช็กพิกัดทแยงมุมยกกำลังสอง (เลี่ยงการใช้ Math.sqrt เพื่อเซฟรอบ CPU)
          const distSq = dx * dx + dy * dy;
          if (distSq < limitSq) {
            const dist = Math.sqrt(distSq); // ถอดรากที่สองเฉพาะเส้นที่ต้องวาดลงจอจริง ๆ เท่านั้น
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(qx, qy);
            ctx.globalAlpha = (1 - dist / LINK_DIST) * 0.1 * scale;
            ctx.stroke();
          }
        }
      }

      // 3. วาดจุดวงกลมสีต่าง ๆ ลงบนแคนวาส
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const { px, py, scale } = projections[i];
        ctx.beginPath();
        ctx.arc(px, py, p.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = PARTICLE_COLORS[p.colorIdx];
        ctx.globalAlpha = p.opacity * scale;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(frame);
    };

    // Intersection Observer: ตรวจสอบว่าแคนวาสอยู่ในหน้าจอที่คนมองเห็นหรือไม่
    // เพื่อหยุดประมวลผลแอนิเมชันเวลาเลื่อนลงไปล่างสุด (ช่วยประหยัดแบตเตอรี่เครื่องผู้ใช้)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(frame);
        } else {
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(canvas);

    // ล้าง Listener และยกเลิกการสังเกตการณ์ทุกอย่างเมื่อเปลี่ยนหน้าเว็บ ป้องกัน Memory Leak
    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      observer.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
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