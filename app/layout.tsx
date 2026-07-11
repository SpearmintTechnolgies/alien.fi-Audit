import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { CustomCursor } from "@/components/CustomCursor";
import "./globals.css"; // Import global styles

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: "Alien", template: "%s | Alien" },
  description: "Alien - AI Consulting & Solutions for the companies building what's next.",
  icons: {
    icon: "/assets/logo/favicon.png",
    shortcut: "/assets/logo/favicon.png",
    apple: "/assets/logo/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <CustomCursor />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
