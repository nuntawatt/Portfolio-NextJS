'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useAuthStore } from '@/shared/auth/use-auth-store';
import { setAuthToken } from '@/shared/auth/auth-service';

// Custom Hook สำหรับประมวลผลการตอบกลับจากหน้าเข้าสู่ระบบผ่านผู้ให้บริการภายนอก (OAuth Callback)
export function useAuthCallback() {
  // ดึง router สำหรับนำทางหน้าเว็บ
  const router = useRouter();
  // ดึงข้อมูล Query Parameters จาก URL
  const searchParams = useSearchParams();
  // สถานะสำหรับเก็บข้อความแสดงข้อผิดพลาด (ถ้ามี)
  const [error, setError] = useState<string | null>(null);
  // ฟังก์ชันในการบันทึกสถานะการล็อกอินลงใน Auth Store
  const setAuth = useAuthStore((state) => state.setAuth);

  // ทำการดึงและตรวจสอบข้อมูลที่รับกลับมาจากเซิร์ฟเวอร์หลังทำการยืนยันตัวตนด้วย OAuth สำเร็จ
  useEffect(() => {
    // ฟังก์ชันภายในสำหรับประมวลผลข้อมูล Callback
    const processCallback = async () => {
      const dataParam = searchParams.get('data');
      if (!dataParam) {
        setError('No authentication data received from server.');
        return;
      }

      try {
        const parsedData = JSON.parse(dataParam);
        const { user, token } = parsedData;

        // บันทึก JWT Token ลงใน Local Storage เพื่อให้ apiClient สามารถเรียกใช้ได้
        setAuthToken(token.accessToken);
        // บันทึกข้อมูลผู้ใช้เข้าสู่ระบบลงใน Client-side Auth Store (Zustand)
        setAuth({
          id: user.id,
          email: user.email,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          token: token.accessToken,
          avatar: user.avatar || '',
        });

        // ล็อกอินเข้าสู่ระบบ (Sign In) ฝั่ง NextAuth Client ด้วย CredentialsProvider
        const result = await signIn('credentials', {
          redirect: false,
          token: token.accessToken,
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        router.push('/');
      } catch (err) {
        console.error('Failed to process OAuth callback:', err);
        setError('Failed to securely log you in. Please try again.');
      }
    };

    processCallback();
  }, [searchParams, router, setAuth]);

  return { error, router };
}
