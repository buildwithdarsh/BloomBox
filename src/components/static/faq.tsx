"use client";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteData } from "@/lib/mock-data";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-primary/10 rounded-xl ${className ?? ""}`}
    />
  );
}

export function FAQ() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 700);
    return () => clearTimeout(timer);
  }, []);

  const { faqs } = siteData;

  return (
    <section id="faq" className="py-16 sm:py-24 px-5 sm:px-6 bg-muted/50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-xs sm:text-sm tracking-[0.25em] uppercase text-primary mb-3 font-medium">
            Common Questions
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-foreground">
            Frequently Asked Questions
          </h2>
        </div>

        {loaded ? (
          <Accordion className="space-y-2 sm:space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-xl px-4 sm:px-6 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base text-foreground font-medium hover:no-underline py-4 sm:py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4 sm:pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="space-y-2 sm:space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14 sm:h-16" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
