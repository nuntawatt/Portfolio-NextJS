'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

// คัสตอมฮุกสำหรับจัดการและควบคุมการแสดงผลธีม (Light Mode / Dark Mode)
export function useTheme() {
  // สถานะเก็บธีมปัจจุบัน โดยตรวจสอบค่าเริ่มต้นจาก localStorage หรือการตั้งค่าของระบบปฏิบัติการ
  const [theme, setTheme] = useState<Theme>(() => {
    if (globalThis.window !== undefined) {
      const stored = localStorage.getItem('theme') as Theme | null;
      if (stored) return stored;
      const systemPrefersDark = globalThis.window.matchMedia('(prefers-color-scheme: dark)').matches;
      return systemPrefersDark ? 'dark' : 'light';
    }
    return 'dark';
  });
  // สถานะเพื่อระบุว่าคอมโพเนนต์เรนเดอร์และเมาท์เสร็จสมบูรณ์ฝั่งไคลเอนต์แล้ว (ช่วยป้องกันปัญหา Hydration Mismatch)
  const [mounted, setMounted] = useState(false);

  // เริ่มต้นเมาท์คลาสธีมเมื่อตัวจัดการพร้อมทำงานฝั่งไคลเอนต์
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // ฟังก์ชันสลับธีมสีของเว็บไซต์
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return { theme, toggleTheme, mounted };
}
