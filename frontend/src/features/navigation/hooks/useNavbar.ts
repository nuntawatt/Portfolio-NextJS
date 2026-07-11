import { useEffect, RefObject } from 'react';

// Custom smooth scroll ที่ bypass CSS scroll-behavior: smooth ของ <html>
// ใช้ requestAnimationFrame + ease-out cubic สำหรับความลื่นไหลและรวดเร็ว
// ป้องกันอาการ "หน่วง" จาก native smooth scroll ที่ใช้เวลานานเกินไปสำหรับระยะไกล
export function smoothScrollToElement(element: HTMLElement, duration = 500): void {
  const start = window.scrollY;
  const scrollMarginTop = Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
  const target = element.getBoundingClientRect().top + start - scrollMarginTop;
  const distance = target - start;

  if (Math.abs(distance) < 1) return;

  const startTime = performance.now();

  // ปิด CSS scroll-behavior ชั่วคราวเพื่อไม่ให้ browser ใส่ smooth ซ้อนทับ window.scrollTo ของเรา
  const htmlEl = document.documentElement;
  const prevBehavior = htmlEl.style.scrollBehavior;
  htmlEl.style.scrollBehavior = 'auto';

  function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + distance * easeOutCubic(progress));

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      // คืนค่า scroll-behavior กลับ
      htmlEl.style.scrollBehavior = prevBehavior;
    }
  }

  requestAnimationFrame(step);
}

// คอยล้างค่า Timeout เมื่อปิด Component ป้องกันปัญหา Memory Leak
export function useTimeoutCleanup(timeoutRef: RefObject<NodeJS.Timeout | null>) {
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [timeoutRef]);
}

// จัดการล็อกสกรอลล์หน้าจอหลักขณะเปิดเมนูมือถือ
export function useBodyScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
}

// ตรวจจับปุ่ม Escape เพื่อกดปิดเมนูมือถือ
export function useEscapeKey(onEscape: () => void, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onEscape();
    };
    globalThis.addEventListener('keydown', handleEsc);
    return () => globalThis.removeEventListener('keydown', handleEsc);
  }, [onEscape, enabled]);
}

// ตรวจจับตำแหน่งสกรอลล์เพื่ออัปเดตสถานะเมนูที่กำลัง Active (จูนสปีดด้วย requestAnimationFrame และจุดเช็ก 35% Viewport)
export function useActiveSectionObserver(
  sections: string[],
  pathname: string,
  isClickScrollingRef: RefObject<boolean>,
  setActiveHash: (hash: string) => void
) {
  useEffect(() => {
    if (pathname === '/contact') return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (isClickScrollingRef.current) return;
      if (rafId !== null) return;

      rafId = globalThis.requestAnimationFrame(() => {
        rafId = null;
        if (globalThis.window === undefined) return;

        const scrollY = globalThis.window.scrollY;
        
        // 1. เช็กขอบบนสุดของหน้าจอ ให้คงสถานะเมนูตัวแรก (Home) เสมอ
        if (scrollY < 100) {
          setActiveHash('/#home');
          return;
        }

        const innerHeight = globalThis.window.innerHeight;
        const scrollHeight = document.documentElement.scrollHeight;

        // 2. เช็กขอบล่างสุดของหน้าจอ เพื่อให้แสดงเมนูตัวสุดท้าย (เช่น Skills หรือ Contact) เสมอเมื่อสกรอลล์ลงสุด
        if (scrollY + innerHeight >= scrollHeight - 50) {
          setActiveHash(`/#${sections.at(-1)}`);
          return;
        }

        // 3. คำนวณหา Section ที่ข้ามจุดกึ่งกลางระดับสายตา (35% จากขอบบนของจอ)
        const triggerLine = innerHeight * 0.35;
        let currentActive = '/#home';

        for (const id of sections) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            // เช็กขอบเขตตำแหน่งสัมพัทธ์ของ Element ใน Viewport
            if (rect.top <= triggerLine && rect.bottom > triggerLine) {
              currentActive = `/#${id}`;
              break;
            }
          }
        }

        setActiveHash(currentActive);
      });
    };

    // ติดตามการสกรอลล์ของหน้าจอ
    globalThis.window?.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      globalThis.window?.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        globalThis.cancelAnimationFrame(rafId);
      }
    };
  }, [pathname, sections, isClickScrollingRef, setActiveHash]);
}
