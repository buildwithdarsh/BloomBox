"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/types";

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-primary/10 rounded-2xl ${className ?? ""}`} />;
}

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

export function BestsellersSection({ products }: { products: Product[] }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return loaded ? (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
      {products.map((p) => (
        <Link key={p.id} href={`/shop/${p.slug}`} className="flex-none w-[72vw] sm:w-auto group">
          <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 72vw, (max-width: 1024px) 50vw, 25vw" />
              {p.isBestseller && (
                <Badge className="absolute top-3 left-3 bg-primary/90">Bestseller</Badge>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium text-foreground text-sm mb-1 truncate">{p.name}</h3>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{p.shortDescription}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  from ₹{p.sizes[0].price.toLocaleString("en-IN")}
                </span>
                <StarRating rating={p.rating} />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div className="flex gap-4 overflow-hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex-none w-[72vw] sm:w-auto space-y-3">
          <Skeleton className="aspect-[3/4]" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}

export function TrendingSection({ products }: { products: Product[] }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return loaded ? (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
      {products.map((p) => (
        <Link key={p.id} href={`/shop/${p.slug}`} className="group">
          <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-all">
            <div className="relative aspect-square overflow-hidden">
              <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 33vw" />
              {p.isNew && <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">New</Badge>}
            </div>
            <div className="p-3 sm:p-4">
              <h3 className="font-medium text-foreground text-sm mb-1 truncate">{p.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">₹{p.sizes[0].price.toLocaleString("en-IN")}</span>
                <StarRating rating={p.rating} />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-square" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}
