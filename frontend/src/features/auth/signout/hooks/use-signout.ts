'use client';

import { signOut as nextAuthSignOut } from 'next-auth/react';
import { useAuthStore } from '@/shared/auth/use-auth-store';
import { setAuthToken } from '@/shared/auth/auth-service';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Custom Hook สำหรับกระบวนการออกจากระบบ (Sign Out)
export function useSignOut() {
  const router = useRouter();
  // ดึงฟังก์ชันเคลียร์สถานะล็อกอินจาก Zustand Store
  const logout = useAuthStore((state) => state.logout);
  // สถานะเก็บการโหลดเพื่อป้องกันการกดย้ำซ้ำๆ
  const [isLoading, setIsLoading] = useState(false);

  // ฟังก์ชันดำเนินการออกจากระบบ
  const signOut = async () => {
    setIsLoading(true);
    try {
      // 1. ล้าง Token ล็อกอินที่ตั้งค่าไว้ใน apiClient
      setAuthToken('');
      // 2. เคลียร์ข้อมูลผู้ใช้ทั้งหมดใน Client-side Store (Zustand)
      logout();
      // 3. เรียกใช้การ Sign Out ของ NextAuth เพื่อเคลียร์ session cookie ฝั่งไคลเอนต์และเซิร์ฟเวอร์
      await nextAuthSignOut({ redirect: false });
      // 4. เปลี่ยนหน้ากลับไปยังหน้าหลัก (Home Page) และรีเฟรชหน้าเพื่ออัปเดตสถานะการแสดงผล
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Sign out failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { signOut, isLoading };
}
