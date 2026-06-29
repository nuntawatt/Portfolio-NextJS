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

// ตรวจจับตำแหน่งสกรอลล์เพื่ออัปเดตสถานะเมนูที่กำลัง Active ด้วย IntersectionObserver
export function useActiveSectionObserver(
  sections: string[],
  pathname: string,
  isClickScrollingRef: RefObject<boolean>,
  setActiveHash: (hash: string) => void
) {
  useEffect(() => {
    if (pathname === '/contact') return;

    let rafId: number | null = null;

    // บังคับลิงก์ Active เป็น Home เมื่ออยู่ใกล้จุดสูงสุดของหน้าจอ (พร้อมทำ Throttling ป้องกันการรันถี่เกิน)
    const checkScrollTop = () => {
      if (isClickScrollingRef.current) return;
      if (rafId !== null) return;

      rafId = globalThis.requestAnimationFrame(() => {
        rafId = null;
        if (globalThis.window !== undefined && globalThis.window.scrollY < 120) {
          setActiveHash('/#home');
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrollingRef.current) return;

        // หากอยู่ชิดด้านบนของหน้าจอ ให้คงสถานะเป็น Home เสมอ
        if (globalThis.window !== undefined && globalThis.window.scrollY < 120) {
          setActiveHash('/#home');
          return;
        }

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`/#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: '-30% 0px -65% 0px',
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // ลงทะเบียนดักจับเหตุการณ์สกรอลล์เพื่อคำนวณตำแหน่งด้านบน
    globalThis.window?.addEventListener('scroll', checkScrollTop, { passive: true });
    checkScrollTop();

    return () => {
      observer.disconnect();
      globalThis.window?.removeEventListener('scroll', checkScrollTop);
      if (rafId !== null) {
        globalThis.cancelAnimationFrame(rafId);
      }
    };
  }, [pathname, sections, isClickScrollingRef, setActiveHash]);
}
