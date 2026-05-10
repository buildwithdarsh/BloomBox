import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";
import { PiSun, PiPalette, PiMusicNotes, PiChurch, PiConfetti } from "react-icons/pi";
import type { IconType } from "react-icons";

export const metadata: Metadata = {
  title: "Wedding & Event Floral Design — End-to-End Service",
  description:
    "From consultation to execution — wedding mandap, bridal bouquets, reception centerpieces, and event decor. 4 packages starting at ₹50,000. Serving Bangalore.",
  alternates: {
    canonical: "https://bloombox.in/events",
  },
  openGraph: {
    title: "Wedding & Event Floral Design — BloomBox",
    description:
      "End-to-end wedding and event floral design in Bangalore. 4 packages starting at ₹50,000.",
    url: "https://bloombox.in/events",
  },
};

const weddingFunctions: { name: string; desc: string; icon: IconType }[] = [
  { name: "Haldi", desc: "Marigold garlands, yellow palette, turmeric-friendly florals", icon: PiSun },
  { name: "Mehendi", desc: "Vibrant mixed flowers, lotus, colorful decor", icon: PiPalette },
  { name: "Sangeet", desc: "Stage backdrop florals, dance floor arrangements", icon: PiMusicNotes },
  { name: "Wedding", desc: "Mandap, aisle, centerpieces, bridal bouquet", icon: PiChurch },
  { name: "Reception", desc: "Grand entrance, table arrangements, stage decor", icon: PiConfetti },
];

const packages = [
  { name: "Intimate", guests: "Up to 50", price: "₹50,000", features: ["Bridal bouquet", "2 centerpieces", "Small mandap decoration", "Aisle flowers"] },
  { name: "Standard", guests: "Up to 150", price: "₹1,50,000", features: ["Bridal + bridesmaid bouquets", "6 centerpieces", "Full mandap", "Aisle + entrance", "Stage decoration"], popular: true },
  { name: "Grand", guests: "Up to 300", price: "₹3,50,000", features: ["Full bridal party flowers", "12 centerpieces", "Grand mandap + stage", "Photo booth florals", "Guest table flowers", "Flower jewelry"] },
  { name: "Royal", guests: "500+", price: "₹5,00,000+", features: ["Everything in Grand", "Multiple functions covered", "Luxury imported flowers", "On-site coordinator", "Drone floral drop", "Custom installations"] },
];

const process = [
  { step: "1", title: "Submit Inquiry", desc: "Share your date, venue, budget, and theme — we'll match you with designers." },
  { step: "2", title: "Consultation", desc: "Virtual or in-person meeting with 2–3 matched designers to discuss your vision." },
  { step: "3", title: "Mood Board", desc: "Your designer creates a digital mood board with flowers, colors, and styling references." },
  { step: "4", title: "Mock Arrangements", desc: "Sample centerpiece and bouquet created for your approval — up to 2 revision rounds." },
  { step: "5", title: "Event Day", desc: "Our team handles procurement, setup, real-time coordination, and teardown." },
];

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How Wedding Floral Design Works at BloomBox",
  description:
    "A 5-step process from inquiry to event-day execution for wedding and event floral design.",
  step: process.map((p) => ({
    "@type": "HowToStep",
    name: p.title,
    text: p.desc,
    position: Number(p.step),
  })),
};

export default function EventsPage() {
  return (
    <div>
      <JsonLd data={howToSchema} />

      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&h=600&fit=crop"
          alt="Wedding floral decoration with white and pastel flowers"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">End-to-End Service</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 max-w-lg leading-tight">
            Wedding & Event<br />
            <span className="italic font-normal">Floral Design</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-md mb-6">
            From consultation to execution — we make every celebration bloom beautifully.
          </p>
          <Link href="/static#contact">
            <Button size="lg" className="rounded-full px-8 bg-white text-stone-800 hover:bg-white/90">
              Send an Inquiry
            </Button>
          </Link>
        </div>
      </section>

      {/* Wedding Functions */}
      <section className="py-12 sm:py-16 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-light text-foreground mb-8 text-center">Every Function, Covered</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {weddingFunctions.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.name} className="text-center p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all">
                  <Icon className="w-7 h-7 text-primary mx-auto mb-2" />
                  <h3 className="text-sm font-medium text-foreground mb-1">{f.name}</h3>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-12 sm:py-16 px-5 sm:px-6 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-light text-foreground mb-8 text-center">Event Packages</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <Card key={pkg.name} className={`relative ${pkg.popular ? "border-primary shadow-md" : ""}`}>
                {pkg.popular && <Badge className="absolute top-4 right-4 bg-primary">Popular</Badge>}
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium text-foreground">{pkg.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{pkg.guests} guests</p>
                  <p className="text-2xl font-light text-foreground mb-4">Starting {pkg.price}</p>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full rounded-full" variant={pkg.popular ? "default" : "outline"}>
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 sm:py-16 px-5 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-light text-foreground mb-8 text-center">How It Works</h2>
          <div className="space-y-6">
            {process.map((p) => (
              <div key={p.step} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center shrink-0">
                  {p.step}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
