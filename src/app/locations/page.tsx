import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BUSINESS, roadNameWithoutNumber, whatsappLink } from "@/data/business";
import { NURSERY_PHOTOS } from "@/data/nursery-media";
import { LocationMapClient } from "@/components/LocationMapClient";
import { EnquiryButton } from "@/components/EnquiryModal";
import { FeeButton } from "@/components/FeeButton";
import { getNurseryPhotos } from "@/sanity/lib/nursery-photos";
const photos = await getNurseryPhotos();


export const metadata: Metadata = {
  title: "Our Nurseries | Eden Childcare Group",
  description:
    "Find Eden Childcare Group nurseries in Croydon, Streatham, Rochester and Holden Park in Tunbridge Wells.",
};

export default function LocationsPage() {
  return (
    <>
      <section className="bg-white py-8 md:py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <LocationMapClient />
        </div>
      </section>

      <section id="nurseries" className="bg-white pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs tracking-[0.35em] uppercase text-eden-green">Our nursery locations</p>
              <h2
                className="text-4xl font-light text-charcoal md:text-5xl"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                A warm welcome, wherever you start.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-charcoal-light">
              Every location has its own page with the address, rooms, map and quickest route to ask about a place.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {BUSINESS.locations.map((location, index) => {
              const cover = photos[location.slug][0];
              const address = `${roadNameWithoutNumber(location.line1)}, ${location.line2}, ${location.city}, ${location.postcode}`;
              const phone = "phone" in location ? location.phone : BUSINESS.phone;

              return (
                <article
                  key={location.shortName}
                  className="group flex min-h-full flex-col overflow-hidden rounded-[1.8rem] border border-charcoal/10 bg-white shadow-[0_12px_35px_rgba(64,93,37,0.06)] transition duration-300 hover:-translate-y-1 hover:border-eden-green/45 hover:shadow-[0_20px_45px_rgba(64,93,37,0.12)]"
                >
                  <div className="relative aspect-[1.48] overflow-hidden bg-stone-light">
                    {cover ? <Image
                      src={cover.src}
                      alt={cover.alt}
                      fill
                      loading={index < 2 ? "eager" : "lazy"}
                      sizes="(max-width: 1024px) 100vw, 25vw"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    /> : <div className="flex h-full items-center justify-center bg-sage-soft text-3xl text-eden-green">Eden Holden Park</div>}
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase text-eden-green shadow-sm">
                      {location.comingSoon ? "Opening soon" : "Eden nursery"}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <h3
                      className="text-3xl font-light text-charcoal"
                      style={{ fontFamily: "var(--font-fraunces)" }}
                    >
                      {location.shortName}
                    </h3>
                    <p className="mt-3 min-h-[3.5rem] text-sm leading-relaxed text-charcoal-light">
                      {address}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                      <a href={phone.telUrl} className="text-eden-green underline decoration-eden-gold underline-offset-4 hover:text-eden-green">
                        {phone.display}
                      </a>
                      <a href={`mailto:${BUSINESS.email}`} className="text-eden-green underline decoration-eden-gold underline-offset-4 hover:text-eden-green">
                        Email us
                      </a>
                    </div>

                    <div className="mt-auto pt-6">
                      <Link
                        href={`/locations/${location.slug}`}
                        className="flex w-full items-center justify-center rounded-full bg-eden-green px-5 py-3.5 text-center text-xs font-medium tracking-[0.16em] uppercase text-white transition hover:bg-sage-dark"
                      >
                        Explore location
                      </Link>
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <FeeButton
                          slug={location.slug} location={location.shortName}
                          className="flex items-center justify-center rounded-full border border-eden-green/20 bg-sage-soft/60 px-3 py-3 text-center text-[11px] font-medium tracking-[0.08em] uppercase text-eden-green transition hover:border-eden-green/40 hover:bg-sage-soft"
                        />
                        <EnquiryButton
                          intent={location.comingSoon ? "Register interest" : "Book a tour"}
                          location={location.shortName}
                          className="flex items-center justify-center rounded-full border border-eden-green/20 bg-sage-soft/60 px-3 py-3 text-center text-[11px] font-medium tracking-[0.08em] uppercase text-eden-green transition hover:border-eden-green/40 hover:bg-sage-soft"
                        >
                          {location.comingSoon ? "Register" : "Book"}
                        </EnquiryButton>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-charcoal/10 bg-surface-warm py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2">
          <div>
            <p className="mb-5 text-xs tracking-[0.4em] uppercase text-eden-green">Admissions</p>
            <h2
              className="text-4xl font-light leading-tight text-charcoal md:text-5xl"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Find the Eden nursery closest to you.
            </h2>
          </div>
          <div className="space-y-5 leading-relaxed text-charcoal-light">
            <p>
              For current availability, funded places and tour times, contact the Eden team directly. We&apos;ll confirm spaces at the nursery nearest you and help arrange a visit.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <EnquiryButton intent="Book a tour" className="rounded-full bg-eden-green px-8 py-4 text-center text-xs font-medium tracking-[0.25em] uppercase text-white transition hover:bg-sage-dark">
                Book a tour
              </EnquiryButton>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="rounded-full border border-eden-green/20 bg-sage-soft/70 px-8 py-4 text-center text-xs font-medium uppercase tracking-[0.25em] text-eden-green transition hover:border-eden-green/40 hover:bg-sage-soft">
                WhatsApp Eden
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
