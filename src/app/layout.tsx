import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LUNEX TECH — Technology & Product Studio",
    template: "%s",
  },
  description:
    "LUNEX TECH is a technology-driven creative studio — from idea to impact. We design, build, and ship digital products, web apps, and AI systems.",
  openGraph: {
    type: "website",
    siteName: "LUNEX TECH",
    title: "LUNEX TECH — Technology & Product Studio",
    description: "From idea to impact. We design, build, and ship digital products, web apps, and AI systems.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUNEX TECH — Technology & Product Studio",
    description: "From idea to impact. We design, build, and ship digital products, web apps, and AI systems.",
  },
};

// No logo image or social profile links exist in public/ or Footer yet
// (Footer's social section is an explicit "Coming soon" placeholder) — omit
// `logo`/`sameAs` rather than point Organization schema at assets that
// don't exist.
const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LUNEX TECH",
  url: SITE_URL,
  description: "A technology-driven creative studio — from idea to impact.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${orbitron.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-carbon text-soft-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        {children}
      </body>
    </html>
  );
}
