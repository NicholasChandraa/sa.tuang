import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SA.TUANG Coffee Shop",
  description:
    "Signature coffee mocktail dan manual brew terbaik di Tangerang. 2 cabang: Banjar Wijaya & MT. Haryono. Buka setiap hari 09.00–23.00.",
  openGraph: {
    title: "SA.TUANG Coffee Shop",
    description:
      "Signature coffee mocktail dan premium manual brew. 2 cabang di Tangerang — Banjar Wijaya & MT. Haryono.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${manrope.variable} h-full`}>
      <head>
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap"
        />
      </head>
      <body className="min-h-full antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
