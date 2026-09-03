import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/constants";
import { constructMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { ChatWidget } from "@/components/chat/chat-widget";
import "./globals.css";

const monaSans = localFont({
  src: "./fonts/Mona-Sans.woff2",
  variable: "--font-mona-sans",
  weight: "200 900",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={monaSans.variable} suppressHydrationWarning>
      <head>
        <link rel="canonical" href={siteConfig.url} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <JsonLd />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          {children}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
