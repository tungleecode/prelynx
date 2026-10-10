import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalNavbar from "../components/GlobalNavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SunStudy - Nền Tảng Học Tập Thông Minh",
  description: "Nền tảng học tập thông minh SunStudy - Cùng bạn đạt điểm số mơ ước",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "SunStudy - Nền Tảng Học Tập Thông Minh",
    description: "Nền tảng học tập thông minh SunStudy - Cùng bạn đạt điểm số mơ ước",
    url: "https://pre.sunstudy.app",
    siteName: "SunStudy",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SunStudy Preview",
      }
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SunStudy - Nền Tảng Học Tập Thông Minh",
    description: "Nền tảng học tập thông minh SunStudy - Cùng bạn đạt điểm số mơ ước",
    images: ["/og-image.png"],
  },
};

import AuthProvider from "../components/AuthProvider";
import NextTopLoader from 'nextjs-toploader';
import BottomNav from "../components/BottomNav";
import AntiScrape from "../components/AntiScrape";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative pb-24 md:pb-0">
        <AntiScrape />
        <NextTopLoader color="#c1a063" showSpinner={false} shadow="0 0 10px #c1a063,0 0 5px #c1a063" />
        <AuthProvider>
          <GlobalNavbar />
          {children}
          <BottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
