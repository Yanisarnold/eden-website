"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BUSINESS, whatsappLink } from "@/data/business";
import { EnquiryButton } from "@/components/EnquiryModal";

/**
 * Bottom sticky parent CTA.
 * The client asked for a simple visitor journey: do not overload parents online,
 * make it easy to visit a nursery in person.
 */
export function StickyCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const threshold = pathname === "/" ? 520 : 140;
      setIsVisible(window.scrollY > threshold);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [pathname]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-mauve/20 bg-ivory/95 backdrop-blur-md shadow-[0_-12px_40px_rgba(43,42,38,0.08)] transition-all duration-300 ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      role="region"
      aria-label="Book a nursery tour"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden md:block flex-1 min-w-0">
            <p
              className="text-[10px] tracking-[0.28em] uppercase text-mauve-dark"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Spaces and tours
            </p>
            <p className="text-sm text-charcoal-light truncate">
              The best way to choose Eden is to visit your nearest nursery and meet the team.
            </p>
          </div>

          <EnquiryButton
            intent="Book a tour"
            className="flex-1 rounded-full bg-mauve px-5 py-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-ivory transition-colors duration-300 hover:bg-mauve-dark md:flex-none sm:px-8"
          >
            Book a Tour
          </EnquiryButton>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-full border border-eden-green/20 bg-sage-soft/70 px-5 py-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-mauve transition duration-300 hover:border-eden-green/40 hover:bg-sage-soft md:flex-none sm:px-8"
          >
            WhatsApp
          </a>

          <a
            href={BUSINESS.phone.telUrl}
            className="hidden sm:inline-flex px-5 py-3 text-xs tracking-[0.2em] uppercase font-medium text-charcoal-light hover:text-mauve transition-colors"
          >
            Call
          </a>
        </div>
      </div>
    </div>
  );
}
