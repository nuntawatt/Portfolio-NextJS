"use client";

import { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "../feature/auth/store/store";
import { authApi } from "../feature/auth/core/lib";

export default function Providers({ children }: { children: ReactNode }) {
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

  const setAuth = useAuthStore((state) => state.setAuth);
  const logout = useAuthStore((state) => state.logout);

  // Restore user session on mount if token exists in localStorage
  useEffect(() => {
    const restoreSession = async () => {
      if (typeof window === "undefined") return;
      
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
      } catch (err) {
        // If profile fetch fails (token invalid or expired), clear session
        localStorage.removeItem("auth_token");
        logout();
      }
    };

    restoreSession();
  }, [setAuth, logout]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}