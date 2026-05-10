import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { CartProvider } from "@/providers/cart-provider";
import { UserProvider } from "@/providers/user-provider";

export const metadata: Metadata = {
  title: {
    template: "%s — BloomBox",
    default: "BloomBox — Fresh Flowers Delivered in Bangalore",
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <CartProvider>
        <SiteHeader />
        <main className="min-h-[calc(100svh-3.5rem)] pb-16 sm:pb-0">
          {children}
        </main>
        <div className="hidden sm:block">
          <SiteFooter />
        </div>
        <MobileNav />
      </CartProvider>
    </UserProvider>
  );
}
