import { useEffect, useState, useRef } from 'react';

// useCountUp: Hook สำหรับนับตัวเลขจาก 0 ขึ้นไปจนถึงค่าเป้าหมาย (target) แบบมีแอนิเมชัน (Ease-Out-Quart) เมื่อถูกกระตุ้นการทำงาน (active)
export function useCountUp(
  target: number,
  active: boolean,
  duration = 1800,
): number {
  // value: เก็บค่าปัจจุบันที่กำลังถูกนับขึ้น
  const [value, setValue] = useState(0);
  const rafRef = useRef(0);

  // เริ่มทำการนับเลขขึ้นเมื่อ active และมีเป้าหมายที่ต้องนับ
  useEffect(() => {
    if (!active || !target) return;

    let startTime = 0;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 4); // ease-out-quart

      setValue(Math.round(eased * target));

      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, duration]);

  return value;
}