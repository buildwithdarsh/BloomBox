"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { siteData } from "@/lib/mock-data";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-primary/10 rounded-2xl ${className ?? ""}`}
    />
  );
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i < count ? "text-amber-400" : "text-border"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 900);
    return () => clearTimeout(timer);
  }, []);

  const { testimonials } = siteData;

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-16 px-5 sm:px-6">
          <p className="text-xs sm:text-sm tracking-[0.25em] uppercase text-primary mb-3 font-medium">
            Love Notes
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-foreground">
            What Our Customers Say
          </h2>
        </div>

        {loaded ? (
          <>
            {/* Mobile: horizontal scroll carousel */}
            <div className="sm:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 pb-4 scrollbar-none">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="flex-none w-[85vw] snap-center bg-card rounded-2xl border border-border p-6 flex flex-col gap-3"
                >
                  <StarRating count={t.rating} />
                  <p className="text-muted-foreground leading-relaxed text-sm italic flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-3 border-t border-border">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {t.name}
                      </p>
                      <Badge
                        variant="secondary"
                        className="text-[10px] font-normal"
                      >
                        {t.occasion}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: grid */}
            <div className="hidden sm:grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="bg-card rounded-2xl border border-border p-8 flex flex-col gap-4 hover:shadow-md transition-shadow"
                >
                  <StarRating count={t.rating} />
                  <p className="text-muted-foreground leading-relaxed text-sm italic flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {t.name}
                      </p>
                      <Badge
                        variant="secondary"
                        className="text-[10px] font-normal"
                      >
                        {t.occasion}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="px-5 sm:px-6">
            {/* Mobile skeleton */}
            <div className="flex sm:hidden gap-4 overflow-hidden">
              {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="flex-none w-[85vw] h-52" />
              ))}
            </div>
            {/* Desktop skeleton */}
            <div className="hidden sm:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-56" />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
