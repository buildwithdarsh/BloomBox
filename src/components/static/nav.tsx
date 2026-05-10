"use client";

import { useCallback, useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#collections", label: "Collections" },
  { href: "#occasions", label: "Occasions" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is in view
  useEffect(() => {
    const ids = links.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.replace("#", "");
      setMobileOpen(false);
      // Slight delay so the menu closing animation isn't janky
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, mobileOpen ? 300 : 0);
    },
    [mobileOpen]
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 flex items-center justify-between h-14 sm:h-16">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`text-lg sm:text-xl font-light tracking-wider transition-colors z-50 ${
            mobileOpen
              ? "text-foreground"
              : scrolled
                ? "text-foreground"
                : "text-white"
          }`}
        >
          BloomBox
        </a>

        {/* Desktop */}
        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`text-xs tracking-widest uppercase transition-colors hover:text-primary ${
                activeSection === link.href.replace("#", "")
                  ? "text-primary"
                  : scrolled
                    ? "text-muted-foreground"
                    : "text-white/70"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger / close */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 -mr-2 z-50 transition-colors ${
            mobileOpen
              ? "text-foreground"
              : scrolled
                ? "text-foreground"
                : "text-white"
          }`}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile full-screen menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-background transition-all duration-300 ease-out ${
          mobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-1 pb-safe">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`text-2xl font-light tracking-wide py-3 px-6 rounded-xl transition-all duration-200 ${
                activeSection === link.href.replace("#", "")
                  ? "text-primary bg-primary/10"
                  : "text-foreground hover:text-primary hover:bg-muted"
              }`}
              style={{
                transitionDelay: mobileOpen ? `${i * 40}ms` : "0ms",
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen
                  ? "translateY(0)"
                  : "translateY(8px)",
              }}
            >
              {link.label}
            </a>
          ))}

          {/* Quick contact shortcut on mobile */}
          <div
            className="mt-8 flex flex-col items-center gap-2 text-sm text-muted-foreground"
            style={{
              transitionDelay: mobileOpen ? `${links.length * 40}ms` : "0ms",
              opacity: mobileOpen ? 1 : 0,
            }}
          >
            <a
              href="tel:+919876543210"
              className="hover:text-primary transition-colors"
            >
              +91 98765 43210
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
