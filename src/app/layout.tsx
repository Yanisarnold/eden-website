import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EnquiryModal } from "@/components/EnquiryModal";
import { TeamModal } from "@/components/TeamModal";
import { BUSINESS } from "@/data/business";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const SITE_URL = BUSINESS.siteUrl;
const SITE_TITLE =
  "Eden Childcare Group | Nurseries in Streatham, Croydon, Rochester & Tunbridge Wells";
const SITE_DESCRIPTION =
  "Eden Childcare Group offers toddler and pre-school care in Streatham, Croydon, Rochester and Southborough near Tunbridge Wells. Explore nursery locations, age groups, opening hours, funding and current availability.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "nursery Streatham",
    "Ofsted registered nursery SW16",
    "day nursery South London",
    "childcare Streatham",
    "French speaking nursery London",
    "Arabic speaking nursery London",
    "30 funded hours Lambeth",
    "inclusive nursery SEN",
    "Eden Childcare Group",
    "Edenchildcare Streatham",
  ],
  authors: [{ name: "Philomena Sadia" }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    url: SITE_URL,
    siteName: "Eden Childcare Group",
    locale: "en_GB",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Eden Childcare Group — Ofsted-registered day nursery in Streatham",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-charcoal">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <EnquiryModal />
        <TeamModal />
      </body>
    </html>
  );
}
