import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ฟังก์ชันช่วยผสานคลาสของ Tailwind CSS (Tailwind Class Merger)
// โดยจัดการกับ Class ที่ซ้ำซ้อนหรือขัดแย้งกันอย่างถูกต้องด้วย clsx และ tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
