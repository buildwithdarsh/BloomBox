"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { siteData } from "@/lib/mock-data";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-primary/10 rounded-2xl ${className ?? ""}`}
    />
  );
}

type GalleryImage = { src: string; alt: string };

const tabs = [
  { value: "bouquets", label: "Bouquets" },
  { value: "weddings", label: "Weddings" },
  { value: "events", label: "Events" },
  { value: "seasonal", label: "Seasonal" },
] as const;

type TabKey = (typeof tabs)[number]["value"];

export function Gallery() {
  const [loaded, setLoaded] = useState(false);
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  const openLightbox = useCallback((img: GalleryImage) => {
    setLightbox(img);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  const { gallery } = siteData;

  const renderGrid = (images: GalleryImage[]) => (
    <div className="columns-2 md:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
      {images.map((img, i) => (
        <button
          key={i}
          onClick={() => openLightbox(img)}
          className="block w-full rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-zoom-in break-inside-avoid active:scale-[0.98] active:opacity-90"
        >
          <Image
            src={img.src}
            alt={img.alt}
            width={500}
            height={400 + (i % 3) * 100}
            className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300"
          />
        </button>
      ))}
    </div>
  );

  return (
    <section id="gallery" className="py-16 sm:py-24 px-5 sm:px-6 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-xs sm:text-sm tracking-[0.25em] uppercase text-primary mb-3 font-medium">
            Our Work
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-foreground">
            Gallery
          </h2>
        </div>

        {loaded ? (
          <Tabs defaultValue="bouquets" className="w-full">
            {/* Scrollable tabs on mobile */}
            <div className="overflow-x-auto scrollbar-none -mx-5 px-5 sm:mx-0 sm:px-0 mb-8 sm:mb-10">
              <TabsList className="mx-auto flex w-fit bg-card border border-border">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="px-4 sm:px-6 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                {renderGrid(gallery[tab.value as TabKey])}
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div>
            <div className="flex justify-center gap-2 mb-10">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-20 sm:w-24" />
              ))}
            </div>
            <div className="columns-2 md:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className={`w-full break-inside-avoid ${
                    i % 3 === 0 ? "h-48 sm:h-64" : i % 3 === 1 ? "h-36 sm:h-48" : "h-40 sm:h-56"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox — full-screen on mobile */}
      <Dialog open={!!lightbox} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-[95vw] sm:max-w-4xl p-1 sm:p-2 bg-black/95 border-none rounded-xl">
          <VisuallyHidden>
            <DialogTitle>{lightbox?.alt ?? "Gallery image"}</DialogTitle>
          </VisuallyHidden>
          <DialogClose className="absolute top-3 right-3 z-20 text-white/80 hover:text-white bg-black/40 rounded-full p-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </DialogClose>
          {lightbox && (
            <div className="relative w-full aspect-[3/4] sm:aspect-[4/3]">
              <Image
                src={lightbox.src.replace(
                  /w=\d+&h=\d+/,
                  "w=1200&h=900"
                )}
                alt={lightbox.alt}
                fill
                className="object-contain rounded-lg"
              />
            </div>
          )}
          {lightbox && (
            <p className="text-center text-white/70 text-xs sm:text-sm py-2">
              {lightbox.alt}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
