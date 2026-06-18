import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./providers";
import { siteConfig } from "@/config/site";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth", "font-sans", geist.variable)} data-scroll-behavior="smooth" suppressHydrationWarning>
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
