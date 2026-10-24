"use client";

import { useState } from "react";
import { FAQS } from "@/data/faqs";

/**
 * FAQ accordion — shown on home page before the final CTA.
 * One open at a time to encourage readers to engage with one question fully.
 */
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-32 bg-white border-y border-stone-border/50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-xs tracking-[0.4em] uppercase text-mauve-dark mb-4">
            Before You Book
          </p>
          <h2
            className="text-4xl md:text-5xl font-light text-charcoal"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Questions, <span className="script text-mauve">answered.</span>
          </h2>
          <p className="mt-6 text-charcoal-light max-w-2xl mx-auto">
            The questions families ask most. If yours isn&apos;t here, message the
            Eden team and we&apos;ll help.
          </p>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-stone-border/60 border-y border-stone-border/60">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-5 md:py-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-base md:text-lg font-normal transition-colors duration-200 ${
                      isOpen ? "text-mauve-dark" : "text-charcoal group-hover:text-mauve"
                    }`}
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    {faq.q}
                  </span>
                  <span
                    aria-hidden
                    className={`flex-shrink-0 w-6 h-6 flex items-center justify-center border border-mauve/40 transition-all duration-300 ${
                      isOpen ? "bg-mauve text-ivory rotate-45" : "text-mauve"
                    }`}
                  >
                    <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="5" y1="0" x2="5" y2="10" />
                      <line x1="0" y1="5" x2="10" y2="5" />
                    </svg>
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm md:text-base text-charcoal-light leading-relaxed pr-10">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
