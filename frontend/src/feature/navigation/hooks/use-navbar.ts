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
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
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

    const observer = new IntersectionObserver(
      (entries) => {
        // บล็อกไม่ให้ Observer ทำงานชั่วขณะหากผู้ใช้คลิกเลื่อนหน้าจอเอง
        if (isClickScrollingRef.current) return;
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

    return () => observer.disconnect();
  }, [pathname, sections, isClickScrollingRef, setActiveHash]);
}
