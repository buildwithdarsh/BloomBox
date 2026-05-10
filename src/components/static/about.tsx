"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { siteData } from "@/lib/mock-data";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-primary/10 rounded-lg ${className ?? ""}`}
    />
  );
}

export function About() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const { about, stats } = siteData;

  return (
    <section id="about" className="py-16 sm:py-24 px-5 sm:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-14 sm:mb-20">
          {loaded
            ? stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 sm:p-6 rounded-2xl bg-card border border-border"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-light text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))
            : Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20 sm:h-24" />
              ))}
        </div>

        {/* About content */}
        <div className="grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
          {/* Image first on mobile for visual impact */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl order-first md:order-last">
            {loaded ? (
              <Image
                src={about.image}
                alt="BloomBox floral studio workspace"
                fill
                className="object-cover"
              />
            ) : (
              <Skeleton className="w-full h-full" />
            )}
          </div>
          <div>
            {loaded ? (
              <>
                <p className="text-xs sm:text-sm tracking-[0.25em] uppercase text-primary mb-3 font-medium">
                  About Us
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-foreground mb-6 sm:mb-8 leading-snug">
                  {about.title}
                </h2>
                <div className="space-y-4 sm:space-y-5">
                  {about.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
