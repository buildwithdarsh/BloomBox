"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/mock/products";
import type { Product } from "@/lib/types";

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-primary/10 rounded-2xl ${className ?? ""}`} />;
}

const categories = [
  { value: "", label: "All" },
  { value: "bouquets", label: "Bouquets" },
  { value: "vase-arrangements", label: "Vase" },
  { value: "box-arrangements", label: "Box" },
  { value: "indoor-plants", label: "Plants" },
  { value: "succulents", label: "Succulents" },
  { value: "dried-flowers", label: "Dried" },
  { value: "combos", label: "Combos" },
  { value: "religious", label: "Religious" },
];

const sortOptions = [
  { value: "popular", label: "Popular" },
  { value: "price-low", label: "Price: Low" },
  { value: "price-high", label: "Price: High" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

export function ShopContent() {
  const searchParams = useSearchParams();
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [sort, setSort] = useState("popular");

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setCategory(cat);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }
    if (category) {
      result = result.filter((p) => p.category === category);
    }
    const occasion = searchParams.get("occasion");
    if (occasion) {
      result = result.filter((p) => p.occasions.includes(occasion as Product["occasions"][number]));
    }
    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.sizes[0].price - b.sizes[0].price);
        break;
      case "price-high":
        result.sort((a, b) => b.sizes[0].price - a.sizes[0].price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return result;
  }, [search, category, sort, searchParams]);

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-light text-foreground mb-6">Shop Arrangements</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Input
          placeholder="Search flowers, bouquets, plants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-xs"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none mb-8">
        {categories.map((cat) => (
          <Button
            key={cat.value}
            variant={category === cat.value ? "default" : "outline"}
            size="sm"
            className="rounded-full whitespace-nowrap"
            onClick={() => setCategory(cat.value)}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        {filtered.length} arrangement{filtered.length !== 1 ? "s" : ""} found
      </p>

      {loaded ? (
        filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((p) => (
              <Link key={p.id} href={`/shop/${p.slug}`} className="group">
                <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {p.isBestseller && <Badge className="bg-primary/90 text-[10px]">Bestseller</Badge>}
                      {p.isNew && <Badge className="bg-accent text-accent-foreground text-[10px]">New</Badge>}
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="font-medium text-foreground text-sm mb-1 truncate">{p.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{p.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">₹{p.sizes[0].price.toLocaleString("en-IN")}</span>
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs text-muted-foreground">{p.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground mb-2">No arrangements found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[3/4]" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
