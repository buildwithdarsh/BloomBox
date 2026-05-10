"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { siteData } from "@/lib/mock-data";

type FormState = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [occasion, setOccasion] = useState("");

  const { shop } = siteData;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/static/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setFormState("success");
      form.reset();
      setOccasion("");
    } catch {
      setFormState("error");
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-24 px-5 sm:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-xs sm:text-sm tracking-[0.25em] uppercase text-primary mb-3 font-medium">
            Get in Touch
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-foreground">
            Send Us an Inquiry
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 sm:gap-16">
          {/* Form */}
          <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
            {formState === "success" ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-10 sm:py-12">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent flex items-center justify-center">
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8 text-accent-foreground"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-foreground">
                  Inquiry Sent!
                </h3>
                <p className="text-muted-foreground text-center text-sm max-w-xs">
                  Thank you for reaching out. We&apos;ll get back to you within
                  24 hours with a personalized response.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setFormState("idle")}
                  className="mt-2"
                >
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    required
                    className="h-11 sm:h-10 text-base sm:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="h-11 sm:h-10 text-base sm:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    required
                    className="h-11 sm:h-10 text-base sm:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occasion">Occasion</Label>
                  <select
                    id="occasion"
                    name="occasion"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="flex h-11 sm:h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select an occasion...</option>
                    <option value="wedding">Wedding</option>
                    <option value="birthday">Birthday</option>
                    <option value="corporate">Corporate</option>
                    <option value="sympathy">Sympathy</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about what you're looking for — flowers, date, any special requests..."
                    rows={4}
                    required
                    className="text-base sm:text-sm"
                  />
                </div>

                {formState === "error" && (
                  <p className="text-sm text-destructive">
                    Something went wrong. Please try again or call us directly.
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="w-full rounded-full h-11 sm:h-10 text-base sm:text-sm active:scale-[0.98]"
                >
                  {formState === "submitting"
                    ? "Sending..."
                    : "Send Inquiry"}
                </Button>
              </form>
            )}
          </div>

          {/* Shop Info */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-base sm:text-lg font-medium text-foreground mb-3 sm:mb-4">
                Visit Our Studio
              </h3>
              <div className="space-y-3 sm:space-y-4 text-muted-foreground text-sm">
                <div className="flex gap-3">
                  <svg
                    className="w-5 h-5 text-primary shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  <span>{shop.address}</span>
                </div>
                {/* Phone — tappable on mobile */}
                <a
                  href={`tel:${shop.phone.replace(/\s/g, "")}`}
                  className="flex gap-3 hover:text-primary transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-primary shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                  <span>{shop.phone}</span>
                </a>
                {/* Email — tappable on mobile */}
                <a
                  href={`mailto:${shop.email}`}
                  className="flex gap-3 hover:text-primary transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-primary shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  <span>{shop.email}</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-medium text-foreground mb-3 sm:mb-4">
                Opening Hours
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday – Friday</span>
                  <span className="font-medium text-foreground">
                    {shop.hours.weekdays}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium text-foreground">
                    {shop.hours.saturday}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-foreground">
                    {shop.hours.sunday}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-medium text-foreground mb-3 sm:mb-4">
                Follow Us
              </h3>
              <div className="flex gap-3 sm:gap-4">
                <a
                  href={shop.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors active:scale-95"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href={shop.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors active:scale-95"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href={shop.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors active:scale-95"
                  aria-label="Pinterest"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Map embed */}
            <div className="rounded-2xl overflow-hidden border border-border h-44 sm:h-52">
              <iframe
                src={shop.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BloomBox studio location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
