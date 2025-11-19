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
  title: "URL Shortener - Bitly Clone",
  description: "Create and manage shortened URLs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="border-t border-gray-200 mt-12 py-6">
          <div className="container mx-auto px-4 max-w-7xl text-center text-sm text-gray-600">
            <p>URL Shortener © {new Date().getFullYear()}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
