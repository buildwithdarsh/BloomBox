"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-svh flex items-center justify-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1920&h=1080&fit=crop"
        alt="Beautiful floral arrangement in soft pink tones"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
      <div className="relative z-10 text-center px-5 sm:px-6 max-w-3xl mx-auto">
        <p className="text-white/80 text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 font-medium">
          Bangalore&apos;s Handcrafted Floral Studio — Est. 2015
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-white mb-4 sm:mb-6 leading-[1.15] tracking-tight">
          Handcrafted Blooms
          <br />
          <span className="italic font-normal">for Every Moment</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-white/85 mb-8 sm:mb-10 font-light leading-relaxed max-w-xl mx-auto">
          Fresh, seasonal flowers arranged with love — from intimate bouquets to
          grand wedding florals, delivered to your doorstep.
        </p>
        <Button
          onClick={scrollToContact}
          size="lg"
          className="bg-white text-stone-800 hover:bg-white/90 px-8 sm:px-10 py-5 sm:py-6 text-sm sm:text-base tracking-wide rounded-full shadow-lg transition-all hover:shadow-xl active:scale-[0.97]"
        >
          Send an Inquiry
        </Button>
      </div>
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-white/60"
          fill="none"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
