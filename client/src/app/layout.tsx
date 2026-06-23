import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";

import "./globals.css";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

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
  title: "Trao AI Travel Planner",
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
        "font-sans",
      )}
    >
      <body className="min-h-full flex flex-col">
        {children}

        <Toaster richColors />
      </body>
    </html>
  );
}
