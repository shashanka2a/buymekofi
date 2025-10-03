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
  title: "Payment Gateway",
  description: "Unified payment gateway supporting PayPal, UPI, CashApp, Zelle, and Crypto.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Payment Gateway",
    description: "Pay securely via PayPal, UPI, CashApp, Zelle, or Crypto.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Support My Work",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/icon.svg", media: "(prefers-color-scheme: light)" },
      { url: "/icon.svg", media: "(prefers-color-scheme: dark)" },
    ],
  },
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
      </body>
    </html>
  );
}
