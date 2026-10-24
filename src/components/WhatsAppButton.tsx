"use client";

import { BUSINESS, whatsappLink } from "@/data/business";

/**
 * Floating WhatsApp CTA — bottom-right on every public page.
 * Uses the official green WhatsApp glyph for instant recognition.
 */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message ${BUSINESS.practitioner.firstName} on WhatsApp`}
      className="whatsapp-floating fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 group"
      style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))" }}
    >
      {/* Pulse ring */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping"
      />

      {/* Button */}
      <span className="relative flex items-center gap-3 bg-[#25D366] hover:bg-[#1DA851] transition-colors duration-300 rounded-full pl-4 pr-5 py-3 shadow-[0_12px_36px_-8px_rgba(37,211,102,0.5)]">
        <svg
          viewBox="0 0 32 32"
          fill="white"
          className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
          aria-hidden
        >
          <path d="M16.003 3C9.37 3 4 8.37 4 15.001c0 2.39.7 4.61 1.9 6.48L4 29l7.74-1.85a11.96 11.96 0 0 0 4.26.84h.01C22.63 27.99 28 22.62 28 15.992 28 12.78 26.75 9.77 24.48 7.5A11.93 11.93 0 0 0 16.003 3zm0 2.18c2.63 0 5.1 1.03 6.96 2.89a9.77 9.77 0 0 1 2.88 6.95c0 5.44-4.42 9.86-9.87 9.86h-.01c-1.48 0-2.93-.36-4.22-1.04l-.3-.16-4.58 1.1 1.12-4.47-.2-.32a9.78 9.78 0 0 1-1.5-5.2C6.28 9.55 10.63 5.18 16.003 5.18zm-5.33 5.32c-.26 0-.68.1-1.04.5-.35.4-1.36 1.33-1.36 3.24 0 1.92 1.39 3.77 1.58 4.03.2.26 2.7 4.35 6.7 5.94 3.33 1.32 4 1.06 4.72.99.73-.06 2.35-.95 2.68-1.88.33-.93.33-1.72.23-1.88-.1-.17-.36-.26-.75-.46-.4-.2-2.35-1.16-2.72-1.3-.36-.13-.63-.2-.89.2-.26.4-1.02 1.28-1.25 1.55-.23.26-.46.3-.86.1-.4-.2-1.68-.62-3.2-1.97-1.18-1.05-1.98-2.35-2.22-2.75-.23-.4-.02-.62.18-.82.18-.18.4-.46.6-.7.2-.23.26-.4.4-.66.13-.26.07-.5-.03-.7-.1-.2-.86-2.18-1.2-2.98-.32-.77-.65-.66-.9-.67-.23 0-.5 0-.76 0z" />
        </svg>
        <span
          className="hidden sm:inline text-white text-xs tracking-[0.18em] uppercase font-medium"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Chat to {BUSINESS.practitioner.firstName}
        </span>
      </span>
    </a>
  );
}
