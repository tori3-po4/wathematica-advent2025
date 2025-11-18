import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wathematica Advent Calendar 2025",
  description: "Wathematica Advent Calendar 2025の公式サイトです。",
  icons: {
    icon: "/wathematica_logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="fixed top-4 left-4 z-50">
          <a
            href="https://wathematica.github.io/"
            className="block transition-all duration-300 hover:scale-110 active:rotate-12 active:scale-95">
            <Image src="/wathematica_logo.png" alt="ロゴ"
              width={48} height={48}
              className="h-12 w-12 rounded-full shadow-md hover:shadow-xl duration-300" />
          </a>
        </header>
        {children}
        <footer className="text-center mt-12 mb-4 text-sm text-gray-500">
          <div className="mb-2 ml-4">
            <Link href="/privacy" className="hover:underline mr-4">プライバシーポリシー</Link>
          </div>
          @Wathematica 2025
        </footer>
        <GoogleAnalytics gaId={process.env.GA_ID || ""} />
      </body>
    </html>
  );
}
