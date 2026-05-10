"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { siteData } from "@/lib/mock-data";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-primary/10 rounded-2xl ${className ?? ""}`}
    />
  );
}

export function Collections() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const { collections } = siteData;
  const gridItems = collections.slice(0, 6);
  const bannerItem = collections[6];

  return (
    <section id="collections" className="py-16 sm:py-24 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-16 px-5 sm:px-6">
          <p className="text-xs sm:text-sm tracking-[0.25em] uppercase text-primary mb-3 font-medium">
            What We Create
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-foreground">
            Our Collections
          </h2>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        {loaded ? (
          <div className="sm:px-6">
            {/* Mobile: horizontal scroll */}
            <div className="flex sm:hidden gap-4 overflow-x-auto snap-x snap-mandatory px-5 pb-4 -mx-0 scrollbar-none">
              {gridItems.map((item) => (
                <div
                  key={item.id}
                  className="flex-none w-[75vw] snap-center group relative bg-card rounded-2xl overflow-hidden border border-border shadow-sm"
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-medium text-foreground mb-1.5">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: grid */}
            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-8">
              {gridItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="px-5 sm:px-6">
            {/* Mobile skeleton: horizontal row */}
            <div className="flex sm:hidden gap-4 overflow-hidden">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex-none w-[75vw] space-y-3">
                  <Skeleton className="aspect-[3/2]" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
            {/* Desktop skeleton */}
            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-[3/2]" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wide banner for 7th collection */}
        {loaded && bannerItem && (
          <div className="mt-6 sm:mt-8 mx-5 sm:mx-6 group relative bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[3/2] md:aspect-auto overflow-hidden">
                <Image
                  src={bannerItem.image}
                  alt={bannerItem.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 sm:p-10 flex flex-col justify-center">
                <h3 className="text-xl sm:text-2xl font-light text-foreground mb-2 sm:mb-3">
                  {bannerItem.name}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {bannerItem.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
