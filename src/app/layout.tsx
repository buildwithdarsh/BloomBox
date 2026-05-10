import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JsonLd } from "@/components/seo/json-ld";
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
  metadataBase: new URL("https://bloombox.in"),
  title: {
    default: "BloomBox — Handcrafted Blooms, Delivered Fresh in Bangalore",
    template: "%s — BloomBox",
  },
  description:
    "Fresh bouquets, wedding florals, corporate arrangements, and flower subscriptions — handcrafted by verified Bangalore florists and delivered same-day to your doorstep.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://bloombox.in",
    siteName: "BloomBox",
    title: "BloomBox — Handcrafted Blooms, Delivered Fresh in Bangalore",
    description:
      "Fresh bouquets, wedding florals, corporate arrangements, and flower subscriptions — handcrafted by verified Bangalore florists and delivered same-day to your doorstep.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "BloomBox — Fresh floral arrangements handcrafted in Bangalore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BloomBox — Handcrafted Blooms, Delivered Fresh in Bangalore",
    description:
      "Fresh bouquets, wedding florals, corporate arrangements, and flower subscriptions — handcrafted by verified Bangalore florists.",
    images: [
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1200&h=630&fit=crop",
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://bloombox.in",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BloomBox",
  url: "https://bloombox.in",
  logo: "https://bloombox.in/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-98765-43210",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: "English",
  },
  sameAs: [
    "https://instagram.com/bloombox.in",
    "https://facebook.com/bloombox.in",
    "https://pinterest.com/bloombox_in",
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Florist",
  name: "BloomBox",
  url: "https://bloombox.in",
  telephone: "+91-98765-43210",
  email: "hello@bloombox.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "42, Lotus Lane, Koramangala 5th Block",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560095",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 12.9352,
    longitude: 77.6167,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "07:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "08:00",
      closes: "20:00",
    },
  ],
  image:
    "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1200&h=630&fit=crop",
  priceRange: "₹₹",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "BloomBox",
  url: "https://bloombox.in",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://bloombox.in/shop?search={search_term_string}",
    "query-input": "required name=search_term_string",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationSchema} />
        <JsonLd data={localBusinessSchema} />
        <JsonLd data={websiteSchema} />
        {children}
      </body>
    </html>
  );
}
