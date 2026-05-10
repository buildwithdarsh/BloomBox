"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { PiHouse, PiStorefront, PiFlowerTulip, PiShoppingBag, PiUser } from "react-icons/pi";

const tabs = [
  { href: "/", label: "Home", icon: PiHouse },
  { href: "/shop", label: "Shop", icon: PiStorefront },
  { href: "/bouquet-builder", label: "Builder", icon: PiFlowerTulip },
  { href: "/cart", label: "Cart", icon: PiShoppingBag },
  { href: "/profile", label: "Profile", icon: PiUser },
];

export function MobileNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  // Don't show on static brochure pages
  if (pathname.startsWith("/static")) return null;

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border pb-safe">
      <div className="flex items-center justify-around h-14">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <span className="relative">
                <Icon className="w-5 h-5" />
                {tab.label === "Cart" && itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </span>
              <span className="text-[10px] font-medium leading-none">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
