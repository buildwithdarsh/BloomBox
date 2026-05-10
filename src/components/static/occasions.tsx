"use client";

import { useEffect, useState } from "react";
import { siteData } from "@/lib/mock-data";
import { PiChurch, PiCake, PiHeartHalf, PiBuildingOffice, PiBird, PiFireSimple, PiHouse, PiHeartStraight } from "react-icons/pi";
import type { IconType } from "react-icons";

const occasionIcons: Record<string, IconType> = {
  wedding: PiChurch,
  birthday: PiCake,
  anniversary: PiHeartHalf,
  corporate: PiBuildingOffice,
  sympathy: PiBird,
  festival: PiFireSimple,
  housewarming: PiHouse,
  valentine: PiHeartStraight,
};

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-primary/10 rounded-2xl ${className ?? ""}`}
    />
  );
}

export function Occasions() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const { occasions } = siteData;

  return (
    <section id="occasions" className="py-16 sm:py-24 px-5 sm:px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-xs sm:text-sm tracking-[0.25em] uppercase text-primary mb-3 font-medium">
            We Cater To
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-foreground">
            Every Occasion, Blooming
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {loaded
            ? occasions.map((occ) => {
                const Icon = occasionIcons[occ.icon];
                return (
                  <div
                    key={occ.name}
                    className="flex flex-col items-center gap-2 sm:gap-3 p-5 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-default active:scale-[0.97]"
                  >
                    {Icon && (
                      <Icon className="w-7 h-7 sm:w-9 sm:h-9 text-primary" />
                    )}
                    <span className="text-xs sm:text-sm font-medium text-foreground text-center leading-tight">
                      {occ.name}
                    </span>
                  </div>
                );
              })
            : Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-24 sm:h-28" />
              ))}
        </div>
      </div>
    </section>
  );
}
