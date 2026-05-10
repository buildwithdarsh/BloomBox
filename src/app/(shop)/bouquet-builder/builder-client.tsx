"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/hooks/use-cart";
import type { Product, ArrangementSize } from "@/lib/types";

const flowers = [
  { id: "f-rose-red", name: "Red Rose", color: "Red", price: 35, image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=120&h=120&fit=crop", available: true },
  { id: "f-rose-pink", name: "Pink Rose", color: "Pink", price: 35, image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=120&h=120&fit=crop", available: true },
  { id: "f-lily", name: "White Lily", color: "White", price: 55, image: "https://images.unsplash.com/photo-1495231916356-a86217efff12?w=120&h=120&fit=crop", available: true },
  { id: "f-sunflower", name: "Sunflower", color: "Yellow", price: 45, image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=120&h=120&fit=crop", available: true },
  { id: "f-carnation", name: "Carnation", color: "Mixed", price: 25, image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=120&h=120&fit=crop", available: true },
  { id: "f-orchid", name: "Orchid", color: "White", price: 85, image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=120&h=120&fit=crop", available: true },
  { id: "f-tulip", name: "Tulip", color: "Pink", price: 65, image: "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=120&h=120&fit=crop", available: false },
  { id: "f-gerbera", name: "Gerbera", color: "Orange", price: 30, image: "https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?w=120&h=120&fit=crop", available: true },
];

const wrappings = [
  { id: "w-kraft", name: "Kraft Paper", price: 0, eco: true },
  { id: "w-tissue", name: "Tissue Paper", price: 49, eco: false },
  { id: "w-jute", name: "Jute Wrap", price: 79, eco: true },
  { id: "w-vase", name: "Glass Vase", price: 299, eco: false },
  { id: "w-hatbox", name: "Hat Box", price: 399, eco: false },
];

const steps = ["Select Flowers", "Wrapping", "Message Card", "Preview"];

export function BouquetBuilderClient() {
  const { addItem } = useCart();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [wrapping, setWrapping] = useState("w-kraft");
  const [cardMessage, setCardMessage] = useState("");
  const [added, setAdded] = useState(false);

  const totalStems = useMemo(() => Object.values(selected).reduce((a, b) => a + b, 0), [selected]);
  const flowerCost = useMemo(() => {
    return Object.entries(selected).reduce((sum, [id, qty]) => {
      const f = flowers.find((fl) => fl.id === id);
      return sum + (f?.price ?? 0) * qty;
    }, 0);
  }, [selected]);
  const wrappingCost = wrappings.find((w) => w.id === wrapping)?.price ?? 0;
  const totalPrice = flowerCost + wrappingCost + (cardMessage ? 49 : 0);

  function adjustQty(id: string, delta: number) {
    setSelected((prev) => {
      const curr = prev[id] ?? 0;
      const next = Math.max(0, curr + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  }

  function handleAddToCart() {
    const customProduct: Product = {
      id: `custom-${Date.now()}`,
      slug: `custom-bouquet-${Date.now()}`,
      name: "Custom Bouquet",
      description: "Your personally designed bouquet",
      shortDescription: `${totalStems} stems, custom arrangement`,
      images: ["https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&h=1000&fit=crop"],
      category: "bouquets",
      occasions: [],
      flowerTypes: ["mixed"],
      colorScheme: "mixed",
      sizes: [{ size: "M" as ArrangementSize, label: "Custom", price: totalPrice }],
      flowerComposition: Object.entries(selected).map(([id, qty]) => {
        const f = flowers.find((fl) => fl.id === id)!;
        return { flower: f.name, color: f.color, count: qty };
      }),
      freshnessDays: 7,
      rating: 0,
      reviewCount: 0,
      floristId: "florist-001",
      tags: ["custom"],
    };
    addItem(customProduct, "M");
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-6 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-light text-foreground mb-2">Build Your Own Bouquet</h1>
      <p className="text-sm text-muted-foreground mb-8">Select flowers, choose wrapping, add a message — made just for you.</p>

      {/* Step indicator */}
      <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-none">
        {steps.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(i)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
              step === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <span className="w-5 h-5 rounded-full border text-xs flex items-center justify-center">{i + 1}</span>
            {s}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main area */}
        <div className="md:col-span-2">
          {step === 0 && (
            <div>
              <h2 className="text-lg font-medium mb-4">Choose Your Flowers</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {flowers.map((f) => (
                  <div
                    key={f.id}
                    className={`p-3 rounded-xl border transition-all ${
                      !f.available ? "opacity-50 pointer-events-none" : (selected[f.id] ?? 0) > 0 ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
                      <Image src={f.image} alt={`${f.name} — ${f.color}`} fill className="object-cover" sizes="(max-width: 640px) 50vw, 33vw" />
                      {!f.available && (
                        <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                          <Badge variant="secondary">Out of season</Badge>
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm font-medium">{f.name}</h3>
                    <p className="text-xs text-muted-foreground">₹{f.price}/stem · {f.color}</p>
                    {f.available && (
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => adjustQty(f.id, -1)} className="w-7 h-7 rounded-full border border-border text-sm hover:bg-muted" aria-label={`Remove one ${f.name}`}>-</button>
                        <span className="text-sm w-6 text-center">{selected[f.id] ?? 0}</span>
                        <button onClick={() => adjustQty(f.id, 1)} className="w-7 h-7 rounded-full border border-border text-sm hover:bg-muted" aria-label={`Add one ${f.name}`}>+</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-lg font-medium mb-4">Choose Wrapping</h2>
              <div className="space-y-3">
                {wrappings.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setWrapping(w.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-colors text-left ${
                      wrapping === w.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div>
                      <span className="text-sm font-medium">{w.name}</span>
                      {w.eco && <Badge variant="secondary" className="ml-2 text-[10px]">Eco-friendly</Badge>}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {w.price === 0 ? "Free" : `+₹${w.price}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-lg font-medium mb-4">Add a Message Card</h2>
              <p className="text-sm text-muted-foreground mb-4">Optional — add a personalized note (₹49 for premium card)</p>
              <Textarea
                placeholder="Write your message here (up to 200 characters)..."
                value={cardMessage}
                onChange={(e) => setCardMessage(e.target.value.slice(0, 200))}
                rows={4}
              />
              <p className="text-xs text-muted-foreground mt-2">{cardMessage.length}/200</p>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-lg font-medium mb-4">Your Custom Bouquet</h2>
              {totalStems === 0 ? (
                <p className="text-muted-foreground">No flowers selected. Go back and pick some!</p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(selected).map(([id, qty]) => {
                    const f = flowers.find((fl) => fl.id === id)!;
                    return (
                      <div key={id} className="flex items-center justify-between text-sm">
                        <span>{f.name} ({f.color})</span>
                        <span>{qty} stems · ₹{f.price * qty}</span>
                      </div>
                    );
                  })}
                  <div className="border-t border-border pt-3 flex items-center justify-between text-sm">
                    <span>Wrapping: {wrappings.find((w) => w.id === wrapping)?.name}</span>
                    <span>{wrappingCost === 0 ? "Free" : `₹${wrappingCost}`}</span>
                  </div>
                  {cardMessage && (
                    <div className="flex items-center justify-between text-sm">
                      <span>Message Card</span>
                      <span>₹49</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar — price summary */}
        <div className="md:col-span-1">
          <div className="sticky top-20 p-5 bg-card rounded-2xl border border-border">
            <h3 className="text-sm font-medium text-foreground mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <div className="flex justify-between">
                <span>{totalStems} stems</span>
                <span>₹{flowerCost}</span>
              </div>
              <div className="flex justify-between">
                <span>Wrapping</span>
                <span>{wrappingCost === 0 ? "Free" : `₹${wrappingCost}`}</span>
              </div>
              {cardMessage && (
                <div className="flex justify-between">
                  <span>Message Card</span>
                  <span>₹49</span>
                </div>
              )}
            </div>
            <div className="border-t border-border pt-3 flex justify-between text-foreground font-medium mb-4">
              <span>Total</span>
              <span>₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex flex-col gap-2">
              {step < 3 ? (
                <Button className="rounded-full" onClick={() => setStep(step + 1)} disabled={step === 0 && totalStems === 0}>
                  Next Step
                </Button>
              ) : (
                <Button className="rounded-full" onClick={handleAddToCart} disabled={totalStems === 0 || added}>
                  {added ? "Added to Cart!" : "Add to Cart"}
                </Button>
              )}
              {step > 0 && (
                <Button variant="outline" className="rounded-full" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
