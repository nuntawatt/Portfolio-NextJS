import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Kanit, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/shared/lib/utils";
import Providers from "./providers";
import { siteConfig } from "@/shared/config/site";

// ตั้งค่าฟอนต์ภาษาไทยและภาษาอังกฤษ (Plus Jakarta Sans, Kanit, Outfit) จาก Google Fonts
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-en' });
const kanit = Kanit({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin', 'thai'], variable: '--font-kanit' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

// ข้อมูลสำหรับแท็ก Meta (SEO) ระดับ Root
export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: "/images/avatar.png",
  },
};

// Root Layout Component หลักของระบบ ทำหน้าที่กำหนดโครงสร้าง HTML พื้นฐาน โหลดฟอนต์ และใส่ Global Providers
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth", plusJakarta.variable, kanit.variable, outfit.variable)} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen flex flex-col antialiased selection:bg-orange-500/30 transition-colors duration-300",
          "continuous-mesh-bg",
          "text-foreground"
        )}
      >
        <div className="noise-overlay" />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

