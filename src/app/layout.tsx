import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";
import Nav from "@/components/ui/Nav";
import ProgressBar from "@/components/ui/ProgressBar";
import Preloader from "@/components/ui/Preloader";
import { getSiteUrl } from "@/lib/siteUrl";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "700"],
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Tushar Khanna — Technical Lead, Full-stack & Applied AI",
  description:
    "14 years building enterprise web products — the last 6 leading frontend and platform architecture for an HCM suite used by 200+ customers, now shipping AI directly into the product.",
  openGraph: {
    title: "Tushar Khanna — Technical Lead, Full-stack & Applied AI",
    description:
      "14 years building enterprise web products, now shipping AI directly into a product used by 200+ customers.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Tushar Khanna — Technical Lead, Full-stack & Applied AI",
    description: "14 years building enterprise web products, now shipping AI into the product.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <Preloader />
        <ProgressBar />
        <Nav />
        <SmoothScroller>{children}</SmoothScroller>
      </body>
    </html>
  );
}
