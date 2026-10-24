import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BUSINESS, LOCATION_SERVICES, openStreetMapEmbedUrl, roadNameWithoutNumber, whatsappLink } from "@/data/business";
import { ActivityCards } from "@/components/ActivityCards";
import { NURSERY_PHOTOS } from "@/data/nursery-media";

import { EnquiryButton } from "@/components/EnquiryModal";
import { getNurseryPhotos } from "@/sanity/lib/nursery-photos";
const photos = await getNurseryPhotos();

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BUSINESS.locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = BUSINESS.locations.find((item) => item.slug === slug);
  if (!location) return {};
  const titleName = location.shortName.toLowerCase().includes("nursery")
    ? location.shortName
    : `${location.shortName} Nursery`;

  return {
    title: `${titleName} | Eden Childcare Group`,
    description: `${location.strapline} ${location.display}.`,
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  const location = BUSINESS.locations.find((item) => item.slug === slug);
  if (!location) notFound();

  const locationWhatsApp = whatsappLink(
    `Hi Philomena, I found Eden Childcare online - could I ask about ${location.shortName} availability and book a tour?`,
  );
  const locationPhone = "phone" in location ? location.phone : BUSINESS.phone;
  const locationServices = location.services.map((serviceKey) => LOCATION_SERVICES[serviceKey]);
  const nurseryLabel = location.comingSoon ? "our new nursery" : location.shortName;
  const mapEmbedUrl = openStreetMapEmbedUrl(location.coordinates);
  const roomNames = locationServices.map((service) => service.title).join(" and ");
  const locationFacts = [
    `Area: ${location.localArea}`,
    `Rooms: ${roomNames}`,
    `Availability: ${location.availability.headline}`,
    ...("hours" in location ? [`Opening hours: ${location.hours}`] : []),
  ];
  const visitSteps = [
    "Tell us your child's age, preferred start date and the days you need.",
    "We'll confirm current spaces, funding options and the room that matches their age.",
    "Visit the nursery to meet the team, see the rooms and ask any final questions.",
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-charcoal/10 bg-ivory pb-16 pt-20 md:pb-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          {NURSERY_PHOTOS[slug][0] && <Image src={photos[slug][0].src} alt="" fill sizes="100vw" className="object-cover opacity-80" />}
          <div className="absolute inset-0 bg-gradient-to-b from-ivory/85 via-ivory/78 to-ivory" />
        </div>
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-end gap-10 px-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xs tracking-[0.4em] uppercase text-mauve-dark mb-6">
              {location.comingSoon ? "Eden — new nursery" : `Eden ${location.shortName}`}
            </p>
            <h1
              className="text-5xl md:text-7xl font-light leading-tight text-charcoal"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              {location.comingSoon ? (
                <>
                  Opening
                  <br />
                  <span className="script text-mauve">September 2026.</span>
                </>
              ) : (
                <>
                  {location.shortName}
                  <br />
                  <span className="script text-mauve">nursery care.</span>
                </>
              )}
            </h1>
            <p className="mt-8 text-lg text-charcoal-light leading-relaxed max-w-2xl">
              {location.overview}
            </p>
          </div>
{/* nursery page card  */}
          <div className="rounded-[2rem] border border-charcoal/10 border-t-4 border-t-eden-gold bg-white/95 p-7 shadow-[0_22px_60px_rgba(43,42,38,0.10)] backdrop-blur-sm md:p-8 lg:col-span-5">
            <p className="text-[10px] tracking-[0.3em] uppercase text-mauve-dark mb-4">
              {location.comingSoon ? "Register your interest" : "Visit this nursery"}
            </p>
            {location.comingSoon ? (
              <p className="text-charcoal-light leading-relaxed mb-6">
                {location.availability.note}
              </p>
            ) : (
              <address className="not-italic text-charcoal leading-relaxed mb-6">
                <span className="block font-medium">Eden Childcare {location.shortName}</span>
                <span className="block text-charcoal-light">{roadNameWithoutNumber(location.line1)}</span>
                <span className="block text-charcoal-light">{location.line2}</span>
                <span className="block text-charcoal-light">{location.city}</span>
                <span className="block text-charcoal-light">{location.postcode}</span>
                <a href={locationPhone.telUrl} className="mt-3 block text-eden-green underline decoration-eden-gold underline-offset-4">
                  {locationPhone.display}
                </a>
                <span className="mt-2 block text-sm text-charcoal-light">Opening hours: {location.hours}</span>
              </address>
            )}
            {!location.comingSoon && (
              <div className="mb-6 rounded-[1.75rem] border border-mauve/15 bg-mauve-soft/60 p-5">
                <p className="text-[10px] tracking-[0.28em] uppercase text-mauve-dark mb-2">
                  {location.availability.label}
                </p>
                <p className="text-lg font-light text-charcoal" style={{ fontFamily: "var(--font-fraunces)" }}>
                  {location.availability.headline}
                </p>
                <p className="mt-2 text-sm text-charcoal-light leading-relaxed">
                  {location.availability.note}
                </p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href={locationWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-mauve px-6 py-3.5 text-center text-xs font-medium uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-mauve-dark"
              >
                {location.comingSoon ? "Register interest" : "Ask on WhatsApp"}
              </a>
              {!location.comingSoon && (
                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-eden-green/20 bg-sage-soft/70 px-6 py-3.5 text-center text-xs font-medium uppercase tracking-[0.2em] text-mauve transition hover:border-eden-green/40 hover:bg-sage-soft"
                >
                  Open in Maps
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-charcoal/10 bg-surface-warm py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-charcoal/10 bg-white p-7 shadow-[0_18px_50px_rgba(43,42,38,0.06)] md:p-9">
            <p className="mb-5 text-xs uppercase tracking-[0.4em] text-mauve-dark">
              Nursery details
            </p>
            <h2
              className="mb-8 text-4xl font-light text-charcoal md:text-5xl"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Eden {location.shortName} at a glance.
            </h2>
            <div className="divide-y divide-charcoal/10">
              {locationFacts.map((item) => (
                <div key={item} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <span className="mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-full bg-sage-soft text-sm text-eden-green" aria-hidden="true">✓</span>
                  <p className="leading-relaxed text-charcoal-light">{item}</p>
                </div>
              ))}
            </div>
            <Link href="/locations" className="mt-8 inline-flex rounded-full border border-eden-green/20 bg-sage-soft/70 px-6 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-eden-green transition hover:border-eden-green/40 hover:bg-sage-soft">
              Compare nurseries
            </Link>
          </div>

          <div className="rounded-[2rem] bg-eden-green p-7 text-white shadow-[0_22px_60px_rgba(64,93,37,0.18)] md:p-9">
            <p className="mb-5 text-xs uppercase tracking-[0.4em] text-white/70">
              Plan your visit
            </p>
            <h2
              className="mb-8 text-4xl font-light text-white md:text-5xl"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Come and see the nursery in person.
            </h2>
            <div className="divide-y divide-white/20">
              {visitSteps.map((item) => (
                <div key={item} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <span className="mt-2 h-2 w-2 flex-none rounded-full bg-eden-gold" aria-hidden="true" />
                  <p className="leading-relaxed text-white/85">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section className="border-b border-charcoal/10 bg-white py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs tracking-[0.4em] uppercase text-mauve-dark mb-5">
              Rooms at {nurseryLabel}
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-charcoal mb-5"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Rooms and age groups at this nursery.
            </h2>
            <p className="text-charcoal-light leading-relaxed">
              Children are supported in age-appropriate groups, with routines, activities and care shaped around their stage. Ask the team which room best fits your child and what spaces are currently available.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {locationServices.map((service, index) => (
              <article key={service.title} className="relative flex flex-col overflow-hidden rounded-[2rem] border border-eden-green/15 bg-white p-7 shadow-[0_18px_50px_rgba(43,42,38,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(64,93,37,0.12)] md:p-8">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-eden-green" aria-hidden="true" />
                <div className="mb-6 flex items-center justify-between gap-4">
                  <p className="rounded-full bg-sage-soft px-4 py-2 text-[10px] uppercase tracking-[0.26em] text-mauve-dark">
                    {service.age}
                  </p>
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-full border border-eden-gold/45 bg-surface-warm text-xs font-medium text-eden-green" aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>
                <h3
                  className="mb-3 text-3xl font-light text-charcoal"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {service.title}
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-charcoal-light">
                  {service.summary}
                </p>
                <EnquiryButton
                  intent={`Enquiry about ${service.title}`}
                  location={location.shortName}
                  className="mt-auto inline-flex items-center justify-between gap-4 rounded-full bg-eden-green px-6 py-4 text-left text-[11px] font-medium uppercase tracking-[0.16em] text-white transition hover:bg-sage-dark"
                >
                  <span>Enquire about {service.title}</span>
                  <span aria-hidden="true">→</span>
                </EnquiryButton>
              </article>
            ))}
          </div>
        </div>
      </section>


      <section className="border-b border-charcoal/10 bg-surface-warm py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs tracking-[0.4em] uppercase text-mauve-dark mb-5">
              Activities at {nurseryLabel}
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-charcoal mb-5"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Play, learning and daily rhythm.
            </h2>
            <p className="text-charcoal-light leading-relaxed">
              These activities are available across Eden nurseries, with the team adapting each day to the children&apos;s age, room and needs.
            </p>
          </div>

          <ActivityCards />
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-6 px-6 lg:grid-cols-5">
          <div className="flex flex-col justify-between rounded-[2rem] bg-eden-green p-8 text-white shadow-[0_22px_60px_rgba(64,93,37,0.18)] md:p-10 lg:col-span-2">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.4em] text-white/70">
                Next Step
              </p>
              <h2
                className="mb-5 text-4xl font-light text-white"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                {location.comingSoon
                  ? "Register your interest in our new nursery."
                  : `Book a visit to Eden ${location.shortName}.`}
              </h2>
              <p className="leading-relaxed text-white/80">
                {location.comingSoon
                  ? "Tell us your child's age and the days you'll need. We'll be in touch the moment enrolment opens for September 2026."
                  : "Tell us your child's age, ideal start date and the days you need. The team will confirm current spaces and arrange the right tour time."}
              </p>
            </div>
            <EnquiryButton
              intent={location.comingSoon ? "Register interest" : "Book a tour"}
              location={location.shortName}
              className="mt-8 rounded-full bg-white px-8 py-4 text-center text-xs font-medium uppercase tracking-[0.22em] text-eden-green transition hover:bg-surface-warm"
            >
              {location.comingSoon ? "Register your interest" : `Enquire about ${location.shortName}`}
            </EnquiryButton>
          </div>

          {location.comingSoon ? (
            <div className="flex min-h-[360px] items-center justify-center rounded-[2rem] border border-eden-green/15 bg-sage-soft/55 p-8 text-center lg:col-span-3">
              <p className="text-charcoal-light leading-relaxed">
                The exact location for our new nursery will be announced
                soon. Register your interest to hear first.
              </p>
            </div>
          ) : (
            <div className="min-h-[360px] overflow-hidden rounded-[2rem] border border-charcoal/10 bg-white shadow-[0_18px_50px_rgba(43,42,38,0.07)] lg:col-span-3">
              <iframe
                src={mapEmbedUrl}
                title={`Map for Eden ${location.shortName}`}
                width="100%"
                height="360"
                className="h-[360px] w-full"
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
