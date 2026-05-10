"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import type { DeliveryType } from "@/lib/types";

const deliveryOptions: { type: DeliveryType; label: string; desc: string; price: string }[] = [
  { type: "standard", label: "Standard", desc: "Same-day, 4–6 hour window", price: "₹49" },
  { type: "express", label: "Express", desc: "2–3 hours from now", price: "₹199" },
  { type: "midnight", label: "Midnight", desc: "11 PM – 12:30 AM", price: "₹249" },
  { type: "fixed-slot", label: "Fixed Slot", desc: "Specific 1-hour window", price: "₹149" },
];

export function CartClient() {
  const {
    items,
    itemCount,
    subtotal,
    deliveryType,
    deliveryFee,
    total,
    removeItem,
    updateQuantity,
    setDeliveryType,
    clearCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-20 text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-light text-foreground mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add some beautiful blooms to get started.</p>
        <Link href="/shop">
          <Button className="rounded-full px-8">Browse Arrangements</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 sm:py-12">
      <div className="hidden sm:flex items-center justify-between mb-8">
        <h1 className="text-2xl sm:text-3xl font-light text-foreground">Your Cart ({itemCount})</h1>
        <Button variant="ghost" size="sm" onClick={clearCart} className="text-muted-foreground">
          Clear all
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const sizeVariant = item.product.sizes.find((s) => s.size === item.size);
            const price = sizeVariant?.price ?? 0;

            return (
              <div key={item.id} className="flex gap-4 p-4 bg-card rounded-2xl border border-border">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0">
                  <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="112px" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link href={`/shop/${item.product.slug}`} className="text-sm font-medium text-foreground hover:text-primary truncate block">
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">{sizeVariant?.label ?? item.size}</p>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive p-1 shrink-0" aria-label={`Remove ${item.product.name} from cart`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  {item.addOns.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.addOns.map((a) => (
                        <Badge key={a.id} variant="secondary" className="text-[10px]">+ {a.name}</Badge>
                      ))}
                    </div>
                  )}
                  {item.giftWrap && <Badge variant="secondary" className="text-[10px] mt-1">Gift Wrapped</Badge>}
                  {item.messageCard && <Badge variant="secondary" className="text-[10px] mt-1 ml-1">Message Card</Badge>}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-7 h-7 rounded-full border border-border text-sm hover:bg-muted disabled:opacity-40"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full border border-border text-sm hover:bg-muted"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm font-medium">₹{(price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div>
          <div className="sticky top-20 p-5 bg-card rounded-2xl border border-border">
            <h2 className="text-sm font-medium text-foreground mb-4">Order Summary</h2>

            {/* Delivery options */}
            <div className="space-y-2 mb-4">
              {deliveryOptions.map((opt) => (
                <button
                  key={opt.type}
                  onClick={() => setDeliveryType(opt.type)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-sm border transition-colors ${
                    deliveryType === opt.type ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                  }`}
                >
                  <div>
                    <span className="font-medium text-foreground">{opt.label}</span>
                    <p className="text-xs text-muted-foreground">{opt.desc}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{opt.price}</span>
                </button>
              ))}
            </div>

            <div className="space-y-2 text-sm border-t border-border pt-4 mb-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between font-medium text-foreground text-base pt-2 border-t border-border">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <Button className="w-full rounded-full" size="lg">
              Proceed to Checkout
            </Button>
            <p className="text-[10px] text-muted-foreground text-center mt-2">
              UPI · Cards · Net Banking · Wallets
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
