import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products, subscriptionPlans } from "@/lib/mock/products";
import { florists } from "@/lib/mock/florists";
import {
  PiCake,
  PiHeartHalf,
  PiHeartStraight,
  PiChurch,
  PiBird,
  PiFireSimple,
  PiHandsPraying,
  PiBuildingOffice,
} from "react-icons/pi";
import type { IconType } from "react-icons";
import { BestsellersSection, TrendingSection } from "./home-client";

export const metadata: Metadata = {
  title: "Shop Fresh Flowers Online — Same-Day Delivery in Bangalore",
  description:
    "Order handcrafted bouquets, roses, orchids, and indoor plants from verified Bangalore florists. Same-day delivery, freshness guaranteed. Starting from ₹149.",
  alternates: {
    canonical: "https://bloombox.in/home",
  },
  openGraph: {
    title: "Shop Fresh Flowers Online — Same-Day Delivery in Bangalore",
    description:
      "Order handcrafted bouquets, roses, orchids, and indoor plants from verified Bangalore florists. Same-day delivery, freshness guaranteed.",
    url: "https://bloombox.in/home",
  },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span className="text-xs text-muted-foreground">{rating}</span>
    </div>
  );
}

const occasions: { name: string; icon: IconType; href: string }[] = [
  { name: "Birthday", icon: PiCake, href: "/shop?occasion=birthday" },
  { name: "Anniversary", icon: PiHeartHalf, href: "/shop?occasion=anniversary" },
  { name: "Valentine's", icon: PiHeartStraight, href: "/shop?occasion=valentine" },
  { name: "Wedding", icon: PiChurch, href: "/shop?occasion=wedding" },
  { name: "Sympathy", icon: PiBird, href: "/shop?occasion=sympathy" },
  { name: "Diwali", icon: PiFireSimple, href: "/shop?occasion=diwali" },
  { name: "Thank You", icon: PiHandsPraying, href: "/shop?occasion=thank-you" },
  { name: "Corporate", icon: PiBuildingOffice, href: "/shop?occasion=corporate" },
];

export default function HomePage() {
  const bestsellers = products.filter((p) => p.isBestseller);
  const trending = products.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1920&h=1080&fit=crop"
          alt="Fresh floral arrangement with pink roses and greenery"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 w-full">
          <div className="max-w-lg">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              Fresh Daily from Local Farms
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-4 leading-tight">
              Blooms That
              <br />
              <span className="italic font-normal">Speak Volumes</span>
            </h1>
            <p className="text-white/80 text-base sm:text-lg mb-8 max-w-md leading-relaxed">
              Handcrafted arrangements from Bangalore&apos;s verified florists, delivered fresh to your doorstep.
            </p>
            <div className="flex gap-3">
              <Link href="/shop">
                <Button size="lg" className="rounded-full px-8">
                  Shop Now
                </Button>
              </Link>
              <Link href="/subscriptions">
                <Button size="lg" variant="outline" className="rounded-full px-8 bg-white/20 border-white/60 text-white backdrop-blur-sm hover:bg-white/30 hover:text-white">
                  Subscriptions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="py-12 sm:py-16 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-light text-foreground mb-6">Shop by Occasion</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-4 md:grid-cols-8 sm:gap-4">
            {occasions.map((occ) => {
              const Icon = occ.icon;
              return (
                <Link
                  key={occ.name}
                  href={occ.href}
                  className="flex-none sm:flex-auto flex flex-col items-center gap-2 p-4 sm:p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-sm transition-all"
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  <span className="text-xs font-medium text-foreground whitespace-nowrap">{occ.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-12 sm:py-16 px-5 sm:px-6 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-light text-foreground">Bestsellers</h2>
            <Link href="/shop" className="text-sm text-primary hover:underline">View all bouquets</Link>
          </div>
          <BestsellersSection products={bestsellers} />
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="py-12 sm:py-16 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-primary/5 border border-primary/10">
            <div className="grid md:grid-cols-2 gap-8 p-8 sm:p-12">
              <div className="flex flex-col justify-center">
                <Badge variant="secondary" className="w-fit mb-4">New</Badge>
                <h2 className="text-2xl sm:text-3xl font-light text-foreground mb-4">
                  Fresh Flowers,<br />Every Week
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Subscribe and never miss a bloom. Starting at just ₹{subscriptionPlans[0].pricePerDelivery}/delivery with free shipping.
                </p>
                <Link href="/subscriptions">
                  <Button className="rounded-full px-8 w-fit">Explore Plans</Button>
                </Link>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&h=600&fit=crop"
                  alt="Weekly flower subscription arrangement with mixed seasonal blooms"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending / New Arrivals */}
      <section className="py-12 sm:py-16 px-5 sm:px-6 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-light text-foreground">Trending Now</h2>
            <Link href="/shop" className="text-sm text-primary hover:underline">View all trending</Link>
          </div>
          <TrendingSection products={trending} />
        </div>
      </section>

      {/* Featured Florists */}
      <section className="py-12 sm:py-16 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-light text-foreground">Featured Florists</h2>
            <Link href="/florists" className="text-sm text-primary hover:underline">View all florists</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none sm:grid sm:grid-cols-3 sm:gap-6">
            {florists.slice(0, 3).map((f) => (
              <Link key={f.id} href="/florists" className="flex-none w-[80vw] sm:w-auto">
                <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-all">
                  <div className="relative h-32 sm:h-40 overflow-hidden">
                    <Image src={f.coverImage} alt={`${f.name} floral studio in ${f.area}`} fill className="object-cover" loading="lazy" sizes="(max-width: 640px) 80vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <Image src={f.image} alt={`${f.name} logo`} width={40} height={40} className="rounded-full border-2 border-white object-cover" />
                      <div>
                        <h3 className="text-sm font-medium text-white">{f.name}</h3>
                        <p className="text-xs text-white/70">{f.area}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <StarRating rating={f.rating} />
                      <span>{f.reviewCount} reviews</span>
                      <span className="ml-auto">{f.deliveryTime}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {f.specialties.map((s) => (
                        <Badge key={s} variant="secondary" className="text-[10px] font-normal">{s}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
