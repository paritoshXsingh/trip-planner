import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";

import "./globals.css";

import { cn } from "@/lib/utils";

import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TripPilot | Your AI Travel Co-Pilot",
  description:
    "Generate personalized travel itineraries, budget estimates, hotel recommendations, and packing lists using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        figtree.variable,
        "font-sans"
      )}
    >
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />

        <Toaster richColors />
      </body>
    </html>
  );
}