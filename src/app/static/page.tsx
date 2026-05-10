import type { Metadata } from "next";
import { Nav } from "@/components/static/nav";
import { Hero } from "@/components/static/hero";
import { About } from "@/components/static/about";
import { Collections } from "@/components/static/collections";
import { Occasions } from "@/components/static/occasions";
import { Gallery } from "@/components/static/gallery";
import { Testimonials } from "@/components/static/testimonials";
import { FAQ } from "@/components/static/faq";
import { Contact } from "@/components/static/contact";
import { Footer } from "@/components/static/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { siteData } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "About BloomBox — Bangalore's Handcrafted Floral Studio Since 2015",
  description:
    "Fresh bouquets, wedding florals, corporate arrangements, subscriptions, and more. 10+ years, 5,000+ bouquets delivered. Send an inquiry today.",
  alternates: {
    canonical: "https://bloombox.in/static",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: siteData.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function StaticPage() {
  return (
    <main className="min-h-screen">
      <JsonLd data={faqSchema} />
      <Nav />
      <Hero />
      <About />
      <Collections />
      <Occasions />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
