'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { AuthService } from '../core/lib';

// Custom Hook สำหรับประมวลผลการยืนยันอีเมล (Verify Email Process)
export function useVerifyEmail() {
  // ดึง Token จาก Parameter ของ URL
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  // สถานะเก็บความคืบหน้าการทำงาน (กำลังโหลด, สำเร็จ, เกิดข้อผิดพลาด)
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(() =>
    token ? 'loading' : 'error'
  );
  // ข้อความแสดงคำชี้แจงสถานะของผลลัพธ์
  const [message, setMessage] = useState(() =>
    token ? 'Verifying your email address...' : 'No verification token provided.'
  );
  // ใช้ useRef เพื่อตรวจสอบไม่ให้ส่งคำขอซ้ำในสภาวะ React Strict Mode
  const hasVerified = useRef(false);

  // ส่งคำขอตรวจยืนยันอีเมลไปยังเซิร์ฟเวอร์
  useEffect(() => {
    if (!token || hasVerified.current) return;
    hasVerified.current = true;

    AuthService.verifyEmail(token)
      .then((res) => {
        setStatus('success');
        setMessage(res.message || 'Email verified successfully!');
      })
      .catch((err) => {
        setStatus('error');
        setMessage(err.message || 'Invalid or expired verification token.');
      });
  }, [token]);

  return {
    status,
    message,
    token,
  };
}
