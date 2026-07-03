import { useEffect, RefObject } from 'react';

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
