import { create } from 'zustand';
import { AuthUser } from '@/shared/auth-types';

// กำหนดประเภทข้อมูลสถานะ (State) และการกระทำ (Actions) ใน Auth Store
interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setAuth: (user: AuthUser) => void;
  logout: () => void;
}

// สร้าง Zustand Store สำหรับจัดการข้อมูลสถานะการเข้าสู่ระบบฝั่ง Client-side
export const useAuthStore = create<AuthState>((set) => ({
  // ข้อมูลโปรไฟล์ผู้ใช้ปัจจุบัน
  user: null,
  // สถานะตรวจสอบการล็อกอิน
  isAuthenticated: false,
  
  // ฟังก์ชันบันทึกข้อมูลล็อกอินผู้ใช้
  setAuth: (user) => set({ 
    user, 
    isAuthenticated: true 
  }),
  
  // ฟังก์ชันออกจากระบบและล้างข้อมูลทั้งหมด
  logout: () => set({ 
    user: null, 
    isAuthenticated: false 
  }),
}));
