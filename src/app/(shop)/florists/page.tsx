import type { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { florists } from "@/lib/mock/florists";

export const metadata: Metadata = {
  title: "Verified Florists in Bangalore",
  description:
    "Handpicked artisan florists in Bangalore — each verified for quality, freshness, and craftsmanship. Browse 6 florists with ratings, specialties, and delivery zones.",
  alternates: {
    canonical: "https://bloombox.in/florists",
  },
  openGraph: {
    title: "Verified Florists in Bangalore — BloomBox",
    description:
      "Handpicked artisan florists verified for quality, freshness, and craftsmanship.",
    url: "https://bloombox.in/florists",
  },
};

export default function FloristsPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-light text-foreground mb-2">Our Florists</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Handpicked artisan florists in Bangalore — each verified for quality, freshness, and craftsmanship.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {florists.map((f) => (
          <div key={f.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all">
            <div className="relative h-40 overflow-hidden">
              <Image src={f.coverImage} alt={`${f.name} studio in ${f.area}, ${f.city}`} fill className="object-cover" loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <Image src={f.image} alt={`${f.name} logo`} width={48} height={48} className="rounded-full border-2 border-white object-cover" />
                <div>
                  <h2 className="text-base font-medium text-white">{f.name}</h2>
                  <p className="text-xs text-white/70">{f.area}, {f.city}</p>
                </div>
              </div>
              {f.isVerified && (
                <Badge className="absolute top-3 right-3 bg-white/20 text-white border-white/30 text-[10px]">
                  Verified
                </Badge>
              )}
            </div>
            <div className="p-5">
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{f.description}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium text-foreground">{f.rating}</span>
                  <span>({f.reviewCount})</span>
                </div>
                <span>·</span>
                <span>{f.productCount} arrangements</span>
                <span>·</span>
                <span>{f.deliveryTime}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {f.specialties.map((s) => (
                  <Badge key={s} variant="secondary" className="text-[10px] font-normal">{s}</Badge>
                ))}
              </div>
              <div className="text-xs text-muted-foreground">
                Delivers to: {f.deliveryZones.join(", ")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
