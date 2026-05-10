"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useUser } from "@/hooks/use-user";
import type { Product, Florist, Review, ArrangementSize } from "@/lib/types";

export function ProductClient({
  product,
  florist,
  reviews,
}: {
  product: Product;
  florist?: Florist;
  reviews: Review[];
}) {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useUser();

  const [selectedSize, setSelectedSize] = useState<ArrangementSize>(
    product.sizes.length > 1 ? "M" : product.sizes[0].size
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  const currentSize = product.sizes.find((s) => s.size === selectedSize) ?? product.sizes[0];
  const wishlisted = isInWishlist(product.id);

  function handleAddToCart() {
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
        <Link href="/shop" className="hover:text-primary">Shop</Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
        {/* Images */}
        <div>
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3">
            <Image src={product.images[selectedImage]} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            {product.isBestseller && <Badge className="absolute top-4 left-4 bg-primary/90">Bestseller</Badge>}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <svg
                className={`w-5 h-5 ${wishlisted ? "text-red-500 fill-red-500" : "text-foreground"}`}
                fill={wishlisted ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === i ? "border-primary" : "border-transparent"}`}
                >
                  <Image src={img} alt={`${product.name} view ${i + 1}`} fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-light text-foreground mb-2">{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>
            <Badge variant="secondary" className="text-[10px]">
              Fresh for {product.freshnessDays} days
            </Badge>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

          {/* Sizes */}
          <div className="mb-6">
            <h2 className="text-sm font-medium text-foreground mb-3">Size</h2>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  onClick={() => setSelectedSize(s.size)}
                  className={`px-4 py-2 rounded-xl text-sm border transition-colors ${
                    selectedSize === s.size
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <span className="font-medium">{s.label}</span>
                  {s.stemCount && <span className="text-xs text-muted-foreground ml-1.5">· {s.stemCount}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Price + Add to Cart */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-2xl font-medium text-foreground">
              ₹{currentSize.price.toLocaleString("en-IN")}
            </span>
            <Button
              onClick={handleAddToCart}
              className="rounded-full px-8 flex-1 sm:flex-none"
              disabled={added}
            >
              {added ? "Added!" : "Add to Cart"}
            </Button>
          </div>

          {/* Florist */}
          {florist && (
            <div className="p-4 bg-muted/50 rounded-xl mb-6">
              <div className="flex items-center gap-3">
                <Image src={florist.image} alt={`${florist.name} florist`} width={40} height={40} className="rounded-full object-cover" />
                <div>
                  <p className="text-sm font-medium text-foreground">{florist.name}</p>
                  <p className="text-xs text-muted-foreground">{florist.area} · {florist.deliveryTime} delivery</p>
                </div>
                {florist.isVerified && (
                  <Badge variant="secondary" className="ml-auto text-[10px]">Verified</Badge>
                )}
              </div>
            </div>
          )}

          {/* Flower composition */}
          {product.flowerComposition.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-medium text-foreground mb-3">Flower Composition</h2>
              <div className="space-y-1">
                {product.flowerComposition.map((f, i) => (
                  <div key={i} className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{f.flower}</span>
                    <span>{f.color} · {f.count} stems</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {reviews.length > 0 && (
            <div>
              <h2 className="text-sm font-medium text-foreground mb-3">Reviews</h2>
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.id} className="p-4 bg-card border border-border rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      {r.userAvatar && (
                        <Image src={r.userAvatar} alt={`${r.userName} avatar`} width={24} height={24} className="rounded-full object-cover" />
                      )}
                      <span className="text-sm font-medium">{r.userName}</span>
                      <div className="flex gap-0.5 ml-auto">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} className={`w-3 h-3 ${i < r.rating ? "text-amber-400" : "text-border"}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{r.text}</p>
                    {r.floristResponse && (
                      <div className="mt-2 p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">Florist reply:</span> {r.floristResponse}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
