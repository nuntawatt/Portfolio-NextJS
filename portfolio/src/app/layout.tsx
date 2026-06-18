import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./providers";
import { AuthProvider } from "@/shared/providers/AuthProvider";
import { siteConfig } from "@/config/site";
import { AudioProvider } from "@/feature/audio";

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
    <html lang="en" className={cn("scroll-smooth dark", "font-sans", geist.variable)} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                try {
                  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen flex flex-col antialiased selection:bg-orange-500/30 transition-colors duration-300",
          "continuous-mesh-bg",
          "text-foreground"
        )}
      >
        <div className="noise-overlay" />
        <AudioProvider>
          <AuthProvider>
            <Providers>
              {children}
            </Providers>
          </AuthProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
