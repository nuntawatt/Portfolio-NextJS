"use client";

import { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/shared/auth/useAuthStore";
import { authApi } from "@/shared/auth/AuthService";
import { AuthProvider } from "@/shared/auth/AuthProvider";
import { AudioProvider } from "@/features/audio";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/shared/providers/LanguageProvider";
import dynamic from "next/dynamic";

const ReactQueryDevtools = process.env.NODE_ENV === "development"
  ? dynamic(
      () => import("@tanstack/react-query-devtools").then((d) => d.ReactQueryDevtools),
      { ssr: false }
    )
  : () => null;

// Root Provider Component ของแอปพลิเคชัน ทำหน้าที่ห่อหุ้มคอมโพเนนต์ลูกด้วย Context Providers ต่างๆ (Theme, Language, React Query, Auth, Audio)
export default function Providers({ children }: Readonly<{ children: ReactNode }>) {
  // สร้าง QueryClient สำหรับการจัดการ Cache และสถานะการดึงข้อมูลด้วย React Query
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
  );

  // ดึงฟังก์ชันสำหรับตั้งค่าและลงชื่อออก (Logout) จาก Auth Store
  const setAuth = useAuthStore((state) => state.setAuth);
  const logout = useAuthStore((state) => state.logout);

  // คืนค่าเซสชันการใช้งาน (Restore User Session) เมื่อ Component ถูก Mount หากยังมี Token บันทึกอยู่ใน localStorage
  useEffect(() => {
    const restoreSession = async () => {
      if (typeof globalThis.window === "undefined") return;
      
      const token = localStorage.getItem("auth_token");
      if (!token) return;

      try {
        const payload = await authApi.getProfile();
        setAuth({
          id: payload.user.id,
          email: payload.user.email,
          firstName: payload.user.firstName || "",
          lastName: payload.user.lastName || "",
          token: token,
        });
      } catch {
        // หากดึงโปรไฟล์ล้มเหลว (เช่น Token หมดอายุหรือไม่ถูกต้อง) ให้ล้างข้อมูลเซสชัน
        localStorage.removeItem("auth_token");
        logout();
      }
    };

    restoreSession();
  }, [setAuth, logout]);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AudioProvider>
              {children}
            </AudioProvider>
          </AuthProvider>
          {process.env.NODE_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}