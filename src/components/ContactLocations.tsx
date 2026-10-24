"use client";

import { useState } from "react";
import { BUSINESS, openStreetMapEmbedUrl, roadNameWithoutNumber } from "@/data/business";
import { EnquiryButton } from "@/components/EnquiryModal";

export function ContactLocations() {
  const [selectedSlug, setSelectedSlug] = useState("streatham");
  const selected =
    BUSINESS.locations.find((location) => location.slug === selectedSlug) ??
    BUSINESS.locations[0];
  const phone = "phone" in selected ? selected.phone : BUSINESS.phone;
  const mapEmbedUrl = openStreetMapEmbedUrl(selected.coordinates);

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {BUSINESS.locations.map((location) => {
          const isSelected = location.slug === selected.slug;
          return (
            <button
              key={location.slug}
              type="button"
              onClick={() => setSelectedSlug(location.slug)}
              aria-pressed={isSelected}
              className={`rounded-[1.25rem] border p-5 text-left transition-all ${
                isSelected
                  ? "border-eden-green bg-eden-green text-white shadow-lg shadow-eden-green/15"
                  : "border-charcoal/10 bg-white text-charcoal hover:border-eden-green/45 hover:bg-sage-soft/45"
              }`}
            >
              <span className={`block text-[10px] uppercase tracking-[0.28em] ${isSelected ? "text-white/75" : "text-eden-green"}`}>
                Eden nursery
              </span>
              <span className="mt-2 block text-xl font-light" style={{ fontFamily: "var(--font-fraunces)" }}>
                {location.shortName}
              </span>
              <span className={`mt-1 block text-xs ${isSelected ? "text-white/80" : "text-charcoal-light"}`}>
                {location.region}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid overflow-hidden rounded-[1.75rem] border border-charcoal/10 bg-white shadow-[0_18px_50px_rgba(64,93,37,0.08)] lg:grid-cols-5">
        <div className="flex flex-col p-7 md:p-9 lg:col-span-2">
          <p className="text-[10px] uppercase tracking-[0.3em] text-eden-green">Selected nursery</p>
          <h2 className="mt-3 text-3xl font-light text-charcoal" style={{ fontFamily: "var(--font-fraunces)" }}>
            Eden Childcare {selected.shortName}
          </h2>
          <address className="mt-5 not-italic text-sm leading-relaxed text-charcoal-light">
            <span className="block">{roadNameWithoutNumber(selected.line1)}</span>
            <span className="block">{selected.line2}</span>
            <span className="block">{selected.city}</span>
            <span className="block">{selected.postcode}</span>
          </address>
          <a href={phone.telUrl} className="mt-4 text-sm text-eden-green underline decoration-eden-gold/70 underline-offset-4 hover:text-sage-dark">
            {phone.display}
          </a>
          <p className="mt-3 text-sm leading-relaxed text-charcoal-light">
            Opening hours: {selected.hours}
          </p>
          <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row lg:flex-col">
            <EnquiryButton
              intent={`Enquiry about ${selected.shortName}`}
              location={selected.shortName}
              className="rounded-full bg-eden-green px-6 py-3.5 text-center text-xs font-medium uppercase tracking-[0.18em] text-white transition hover:bg-sage-dark"
            >
              Enquire about this nursery
            </EnquiryButton>
            <a href={selected.mapsUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-eden-green/20 bg-sage-soft/70 px-6 py-3.5 text-center text-xs font-medium uppercase tracking-[0.18em] text-eden-green transition hover:border-eden-green/40 hover:bg-sage-soft">
              Open in maps
            </a>
          </div>
        </div>
        <div className="relative min-h-[340px] bg-stone-light lg:col-span-3">
          <iframe
            key={selected.slug}
            src={mapEmbedUrl}
            title={`Map for Eden Childcare ${selected.shortName}`}
            width="100%"
            height="340"
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
