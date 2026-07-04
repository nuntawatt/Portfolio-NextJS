import { useState, useRef, useMemo } from 'react';

// คัสตอมฮุกสำหรับการทำเอฟเฟกต์แสงไฟส่อง (Spotlight Effect) ตามการขยับเมาส์ของผู้ใช้
export function useSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  // เก็บสถานะว่าเมาส์กำลังชี้อยู่บนพื้นที่ของคอมโพเนนต์หรือไม่
  const [hovered, setHovered] = useState(false);

  const spotlightHandlers = useMemo(() => ({
    onMouseMove: (e: React.MouseEvent<HTMLElement>) => {
      if (!spotlightRef.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotlightRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(249,115,22,0.06), transparent 80%)`;
      spotlightRef.current.style.opacity = '1';
    },
    // ฟังก์ชันเปิดสถานะ hovered เมื่อเมาส์เข้ามาในพื้นที่
    onMouseEnter: () => setHovered(true),
    // ฟังก์ชันปิดสถานะ hovered เมื่อเมาส์ออกไปจากพื้นที่
    onMouseLeave: () => {
      setHovered(false);
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '0';
      }
    },
  }), []);

  return { spotlightRef, hovered, spotlightHandlers };
}
