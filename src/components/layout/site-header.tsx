"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PiMagnifyingGlass, PiShoppingBag, PiUser, PiHeart, PiSignOut, PiFlower } from "react-icons/pi";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/subscriptions", label: "Subscriptions" },
  { href: "/bouquet-builder", label: "Build Your Own" },
  { href: "/florists", label: "Florists" },
  { href: "/events", label: "Weddings & Events" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { user, isLoggedIn, login, logout } = useUser();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-background/90 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center gap-2 text-lg sm:text-xl font-light tracking-wider transition-colors ${
              !scrolled && isHome ? "text-white" : "text-foreground"
            }`}
          >
            <PiFlower className="w-5 h-5 sm:w-6 sm:h-6" />
            BloomBox
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs tracking-widest uppercase transition-colors hover:text-primary ${
                  pathname.startsWith(link.href)
                    ? "text-primary font-medium"
                    : !scrolled && isHome
                      ? "text-white/70"
                      : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${
                !scrolled && isHome
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : ""
              }`}
              aria-label="Search"
            >
              <PiMagnifyingGlass className="w-5 h-5" />
            </Button>

            {/* Wishlist — desktop only */}
            <Link href="/profile" className="hidden sm:block">
              <Button
                variant="ghost"
                size="icon"
                className={`h-9 w-9 ${
                  !scrolled && isHome
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : ""
                }`}
                aria-label="Wishlist"
              >
                <PiHeart className="w-5 h-5" />
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className={`h-9 w-9 ${
                  !scrolled && isHome
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : ""
                }`}
                aria-label="Cart"
              >
                <PiShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-primary text-primary-foreground text-[10px] font-medium rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`inline-flex items-center justify-center h-9 w-9 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer ${
                  !scrolled && isHome
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
                aria-label="Account"
              >
                <PiUser className="w-5 h-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {isLoggedIn ? (
                  <>
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem render={<Link href="/profile" />}>
                      My Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem render={<Link href="/profile" />}>
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <PiSignOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onClick={login}>
                    Sign In (Demo)
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
