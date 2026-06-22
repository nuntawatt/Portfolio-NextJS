'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';

// คอมโพเนนต์ให้บริการบริบทสำหรับระบบยืนยันตัวตน (Authentication Provider)
// ห่อหุ้มแอปพลิเคชันด้วย SessionProvider เพื่อให้คอมโพเนนต์ย่อยสามารถเข้าถึงข้อมูลเซสชันล็อกอินได้
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
