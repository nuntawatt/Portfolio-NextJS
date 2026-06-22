import { useState, useCallback } from 'react';

// คัสตอมฮุกสำหรับการทำเอฟเฟกต์แสงไฟส่อง (Spotlight Effect) ตามการขยับเมาส์ของผู้ใช้
export function useSpotlight() {
  // เก็บพิกัดตำแหน่ง x และ y ของเมาส์ สัมพันธ์กับพื้นที่ของคอมโพเนนต์
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  // เก็บสถานะว่าเมาส์กำลังชี้อยู่บนพื้นที่ของคอมโพเนนต์หรือไม่
  const [hovered, setHovered] = useState(false);

  // ฟังก์ชันคำนวณตำแหน่งเมาส์เมื่อเลื่อนเมาส์บนคอมโพเนนต์
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  // ฟังก์ชันเปิดสถานะ hovered เมื่อเมาส์เข้ามาในพื้นที่
  const handleMouseEnter = useCallback(() => setHovered(true), []);
  // ฟังก์ชันปิดสถานะ hovered เมื่อเมาส์ออกไปจากพื้นที่
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  return {
    coords,
    hovered,
    spotlightHandlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    }
  };
}
