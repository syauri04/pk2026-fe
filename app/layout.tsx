import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inclusive_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const souvenir = localFont({
  src: [
    {
      path: "../fonts/Souvenir.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/SouvenirB.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-souvenir",
  display: "swap",
});

const inclusiveSans = Inclusive_Sans({
  variable: "--font-inclusive-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pasar Kolaboraya",
  description: "Coming Soon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${souvenir.variable} ${inclusiveSans.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
