import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { subscriptionPlans } from "@/lib/mock/products";

export const metadata: Metadata = {
  title: "Flower Subscription Plans — Save up to 25%",
  description:
    "Subscribe to weekly or bi-weekly fresh flower deliveries in Bangalore. 6 plans from ₹79/delivery. Free shipping, skip or pause anytime. Freshness guaranteed.",
  alternates: {
    canonical: "https://bloombox.in/subscriptions",
  },
  openGraph: {
    title: "Flower Subscription Plans — Save up to 25% — BloomBox",
    description:
      "Subscribe to weekly fresh flower deliveries in Bangalore. 6 plans from ₹79/delivery. Free shipping.",
    url: "https://bloombox.in/subscriptions",
  },
};

const features = [
  { title: "Seasonal Variety", desc: "Different flowers each delivery — never the same bouquet twice" },
  { title: "Free Delivery", desc: "All subscription deliveries ship free, every time" },
  { title: "Skip or Pause", desc: "Going on vacation? Skip a delivery or pause anytime" },
  { title: "Freshness Guarantee", desc: "Photo-verified freshness with every delivery" },
];

export default function SubscriptionsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=1920&h=600&fit=crop"
          alt="Fresh flower subscription arrangement with seasonal blooms"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">Save up to 25%</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 max-w-lg leading-tight">
            Fresh Flowers,<br />
            <span className="italic font-normal">Delivered on Schedule</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-md mb-2">
            Subscribe once, enjoy blooms weekly. Starting from just ₹79/delivery.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-12 sm:py-16 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-light text-foreground mb-8 text-center">Choose Your Plan</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative overflow-hidden ${plan.popular ? "border-primary shadow-md" : ""}`}
              >
                {plan.popular && (
                  <Badge className="absolute top-4 right-4 bg-primary">Most Popular</Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-lg font-medium">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-3xl font-light text-foreground">₹{plan.pricePerDelivery}</span>
                    <span className="text-sm text-muted-foreground">/delivery</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{plan.contents}</p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {plan.frequencies.map((f) => (
                      <Badge key={f} variant="secondary" className="text-[10px]">{f}</Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">Ideal for: {plan.targetCustomer}</p>
                  <Button className="w-full rounded-full" variant={plan.popular ? "default" : "outline"}>
                    Subscribe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 px-5 sm:px-6 bg-muted/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-light text-foreground mb-8 text-center">Why Subscribe?</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 bg-card rounded-2xl border border-border">
                <h3 className="text-sm font-medium text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
