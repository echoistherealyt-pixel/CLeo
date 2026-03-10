import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cleo — Digital Creative Studio",
  description: "We don't build websites. We build experiences.",
  keywords: ["digital studio", "motion design", "animations", "websites", "UI/UX", "creative"],
  authors: [{ name: "Cleo Studio" }],
  creator: "Cleo Studio",
  openGraph: {
    title: "Cleo — Digital Creative Studio",
    description: "We don't build websites. We build experiences.",
    type: "website",
    locale: "en_US",
    siteName: "Cleo Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cleo — Digital Creative Studio",
    description: "We don't build websites. We build experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        {/* Favicon placeholder */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}