import Link from "next/link";
import { BUSINESS, whatsappLink } from "@/data/business";

type Availability = {
  label: string;
  headline: string;
  note: string;
};

type AvailabilityBannerProps = {
  availability?: Availability;
  locationName?: string;
};

const defaultAvailability: Availability = {
  label: "Current availability",
  headline: "Now enrolling across our rooms",
  note: "Call or WhatsApp the team for the latest room-by-room details and to arrange a visit.",
};

export function AvailabilityBanner({ availability = defaultAvailability, locationName }: AvailabilityBannerProps) {
  const message = locationName
    ? `Hi Philomena, could I ask about current spaces at Eden ${locationName} and book a tour?`
    : BUSINESS.whatsappPrefill;

  return (
    <section className="bg-mauve text-ivory border-y border-mauve-dark/20">
      <div className="max-w-7xl mx-auto px-6 py-5 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
          <div className="lg:col-span-3">
            <p className="text-[10px] tracking-[0.35em] uppercase text-ivory/75">
              {availability.label}
            </p>
          </div>
          <div className="lg:col-span-6">
            <h2 className="text-2xl md:text-3xl font-light" style={{ fontFamily: "var(--font-fraunces)" }}>
              {availability.headline}
            </h2>
            <p className="mt-2 text-sm md:text-base text-ivory/85 leading-relaxed">
              {availability.note}
            </p>
          </div>
          <div className="lg:col-span-3 flex lg:justify-end">
            <Link
              href={whatsappLink(message)}
              className="inline-flex w-full sm:w-auto justify-center border border-ivory/45 bg-white/10 px-5 py-3 text-xs tracking-[0.22em] uppercase text-ivory hover:bg-ivory hover:text-mauve transition-all"
              target="_blank"
            >
              Check availability
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
