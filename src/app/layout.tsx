import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { Figtree, Syne } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { isUsingMockData } from "@/lib/tmdb/client";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const figtree = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Kinora — Stream movies & TV",
    template: "%s · Kinora",
  },
  description:
    "Kinora is a cinematic streaming site powered by TMDb metadata and VidSrc playback embeds.",
};

function HeaderFallback() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-white/5 bg-[#07080c]/70 backdrop-blur-xl" />
  );
}

async function HeaderSlot() {
  await connection();
  return <SiteHeader demoMode={isUsingMockData()} />;
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${figtree.variable} dark h-full`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Suspense fallback={<HeaderFallback />}>
          <HeaderSlot />
        </Suspense>
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
