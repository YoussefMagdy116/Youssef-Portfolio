import type { Metadata, Viewport } from "next";
import {
  Inter,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import BackgroundFx from "@/components/BackgroundFx";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { profile } from "@/data/portfolio";

// TODO: point metadataBase at the real deployed domain for correct OG URLs.
const siteUrl = new URL("https://youssef-cyber-portfolio.vercel.app");

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Youssef Mohamed Abdelmaksoud | Cybersecurity Analyst",
  description:
    "Cybersecurity Analyst portfolio focused on SOC operations, SIEM, incident response, networking, and security infrastructure.",
  keywords: [
    "Cybersecurity Analyst",
    "SOC Operations",
    "SIEM",
    "Incident Response",
    "Threat Detection",
    "Networking",
    "Portfolio",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: "Youssef Mohamed Abdelmaksoud | Cybersecurity Analyst",
    description:
      "Cybersecurity Analyst portfolio focused on SOC operations, SIEM, incident response, networking, and security infrastructure.",
    type: "website",
    locale: "en_US",
    siteName: "Youssef Mohamed Abdelmaksoud — Cybersecurity Analyst",
  },
  twitter: {
    card: "summary",
    title: "Youssef Mohamed Abdelmaksoud | Cybersecurity Analyst",
    description:
      "Cybersecurity Analyst portfolio focused on SOC operations, SIEM, incident response, networking, and security infrastructure.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#04070d",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Giza",
    addressCountry: "EG",
  },
  knowsAbout: [
    "SOC Operations",
    "SIEM",
    "Incident Response",
    "Threat Detection",
    "Networking",
    "Firewalls",
    "Active Directory",
    "Windows Server",
    "Python Network Automation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-cyber-base font-sans text-slate-200 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:border focus:border-cyan-400/40 focus:bg-cyber-panel focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-cyan-200"
        >
          Skip to content
        </a>
        <BackgroundFx />
        <Navbar />
        <main id="main" className="relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
