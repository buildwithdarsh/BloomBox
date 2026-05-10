import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopContent } from "./shop-content";

export const metadata: Metadata = {
  title: "Shop Bouquets, Plants & Arrangements",
  description:
    "Browse 50+ handcrafted flower arrangements — bouquets, vase arrangements, indoor plants, dried flowers, and gift combos. Same-day delivery in Bangalore. Starting from ₹149.",
  alternates: {
    canonical: "https://bloombox.in/shop",
  },
  openGraph: {
    title: "Shop Bouquets, Plants & Arrangements — BloomBox",
    description:
      "Browse 50+ handcrafted flower arrangements with same-day delivery in Bangalore. Starting from ₹149.",
    url: "https://bloombox.in/shop",
  },
};

function ShopSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 sm:py-12">
      <div className="animate-pulse bg-primary/10 rounded-2xl h-8 w-48 mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="animate-pulse bg-primary/10 rounded-2xl aspect-[3/4]" />
            <div className="animate-pulse bg-primary/10 rounded-2xl h-4 w-3/4" />
            <div className="animate-pulse bg-primary/10 rounded-2xl h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopContent />
    </Suspense>
  );
}
