import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
            className="block transition-all duration-300 hover:scale-110 active:rotate-12 active:scale-95" >
            <img src="/wathematica_logo.png" alt="ロゴ" className="h-12 w-12 rounded-full shadow-md hover:shadow-xl duration-300" />
          </a>
        </header>
        {children}
        <footer className="text-center mt-12 mb-4 text-sm text-gray-500">
          @Wathematica 2025
        </footer>
      </body>
    </html>
  );
}
