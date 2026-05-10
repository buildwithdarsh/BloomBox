import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { PiFlower, PiInstagramLogo, PiFacebookLogo, PiPinterestLogo } from "react-icons/pi";

const shopLinks = [
  { href: "/shop", label: "All Arrangements" },
  { href: "/shop?category=bouquets", label: "Bouquets" },
  { href: "/shop?category=indoor-plants", label: "Indoor Plants" },
  { href: "/shop?category=dried-flowers", label: "Dried Flowers" },
  { href: "/subscriptions", label: "Subscriptions" },
];

const companyLinks = [
  { href: "/florists", label: "Our Florists" },
  { href: "/events", label: "Weddings & Events" },
  { href: "/care-guides", label: "Care Guides" },
  { href: "/static", label: "About BloomBox" },
];

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-lg font-light text-background tracking-wide">
              <PiFlower className="w-5 h-5" />
              BloomBox
            </Link>
            <p className="text-xs sm:text-sm text-background/50 mt-2 leading-relaxed max-w-xs">
              Handcrafted blooms for every moment. Fresh, seasonal flowers arranged with love and delivered to your doorstep.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://instagram.com/bloombox.in" target="_blank" rel="noopener noreferrer" className="text-background/40 hover:text-background transition-colors" aria-label="Instagram">
                <PiInstagramLogo className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/bloombox.in" target="_blank" rel="noopener noreferrer" className="text-background/40 hover:text-background transition-colors" aria-label="Facebook">
                <PiFacebookLogo className="w-5 h-5" />
              </a>
              <a href="https://pinterest.com/bloombox_in" target="_blank" rel="noopener noreferrer" className="text-background/40 hover:text-background transition-colors" aria-label="Pinterest">
                <PiPinterestLogo className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-background/60 mb-3 font-medium">
              Shop
            </h4>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/50 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-background/60 mb-3 font-medium">
              Company
            </h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/50 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-background/60 mb-3 font-medium">
              Contact
            </h4>
            <div className="space-y-2 text-sm text-background/50">
              <a href="tel:+919876543210" className="block hover:text-background transition-colors">
                +91 98765 43210
              </a>
              <a href="mailto:hello@bloombox.in" className="block hover:text-background transition-colors">
                hello@bloombox.in
              </a>
              <p className="text-xs leading-relaxed">
                42, Lotus Lane, Koramangala 5th Block, Bangalore 560095
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-6 sm:my-8 bg-background/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/40">
          <p>&copy; {new Date().getFullYear()} BloomBox. All rights reserved.</p>
          <p>
            Powered by{" "}
            <a
              href="https://build.withdarsh.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-background/60 transition-colors underline underline-offset-2"
            >
              Darsh Gupta
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
