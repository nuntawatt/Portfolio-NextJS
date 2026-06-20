import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Kanit, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./providers";
import { siteConfig } from "@/config/site";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-en' });
const kanit = Kanit({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin', 'thai'], variable: '--font-kanit' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: "/images/avatar.png",
  },
};

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
