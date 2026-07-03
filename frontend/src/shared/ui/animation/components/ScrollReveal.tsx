'use client';

import React, { useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { Variant } from 'motion/react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade';

interface ScrollRevealProps {
  children: React.ReactNode;
  /** ทิศทางการเลื่อนเข้า (default: 'up') */
  direction?: Direction;
  /** หน่วงเวลาก่อนเริ่ม animation ในวินาที (default: 0) */
  delay?: number;
  /** ระยะเวลา animation ในวินาที (default: 0.6) */
  duration?: number;
  /** ระยะทางเลื่อนเข้าเป็น px (default: 40) */
  distance?: number;
  /** animate แค่ครั้งเดียวหรือทุกครั้งที่เข้ามุมมอง (default: true) */
  once?: boolean;
  /** สัดส่วนของ element ที่ต้องเห็นก่อน trigger (default: 0.15) */
  amount?: number;
  /** className เพิ่มเติม */
  className?: string;
  /** HTML tag ที่จะ render (default: 'div') */
  as?: keyof typeof motion;
}

// คำนวณ offset ตาม direction
function getInitialOffset(direction: Direction, distance: number): { x: number; y: number } {
  switch (direction) {
    case 'up': return { x: 0, y: distance };
    case 'down': return { x: 0, y: -distance };
    case 'left': return { x: distance, y: 0 };
    case 'right': return { x: -distance, y: 0 };
    case 'fade': return { x: 0, y: 0 };
  }
}

/**
 * ScrollReveal — Reusable scroll-triggered entrance animation wrapper.
 *
 * ใช้ `motion/react` whileInView สำหรับ scroll-reveal พร้อม performance optimization:
 * - viewport: { once: true } → ไม่คำนวณซ้ำหลัง animate แล้ว
 * - ใช้เฉพาะ transform + opacity (GPU compositing)
 * - รองรับ prefers-reduced-motion → แสดงทันทีไม่มี animation
 * - ลบ will-change หลัง animation จบ
 */
export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 40,
  once = true,
  amount = 0.15,
  className,
  as = 'div',
}: Readonly<ScrollRevealProps>) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // ลบ will-change หลัง animation จบเพื่อ free GPU memory
  const handleAnimationComplete = useCallback(() => {
    if (ref.current) {
      ref.current.style.willChange = 'auto';
    }
  }, []);

  // ถ้า user ตั้งค่า reduced motion → render children ตรงๆ ไม่มี animation
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = getInitialOffset(direction, distance);

  const hidden: Variant = {
    opacity: 0,
    x: offset.x,
    y: offset.y,
  };

  const visible: Variant = {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.25, 0.1, 0.25, 1] as const, // cubic-bezier ที่นุ่มนวลเป็นธรรมชาติ
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionComponent = (motion as any)[as];

  return (
    <MotionComponent
      ref={ref}
      initial={hidden}
      whileInView={visible}
      viewport={{ once, amount }}
      onAnimationComplete={handleAnimationComplete}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </MotionComponent>
  );
}
