import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "@/data/business";
import { IMAGES } from "@/data/images";
import { PageHero } from "@/components/PageHero";
import { FeeButton } from "@/components/FeeButton";

export const metadata: Metadata = {
  title: "Fees | Eden Childcare Group",
  description:
    "Request the current Eden Childcare fee information for your chosen nursery, room and sessions.",
};

const feeFactors = [
  {
    title: "Your nursery",
    copy: "Choose the Eden nursery closest to home or work. The team will send the current fee information for that location.",
  },
  {
    title: "Your child’s room",
    copy: "Fees can depend on your child’s age group, start date and the room or care pattern that fits them best.",
  },
  {
    title: "Your funded hours",
    copy: "If you may be eligible for funded hours, we can talk through how they apply to the sessions and days you need.",
  },
];

export default function FeesPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title={<>Clear fees,<br /><span className="script text-eden-green">no guesswork.</span></>}
        description="Fees depend on the Eden nursery, your child's room, the days you need and any funded hours that apply. Contact us for the current fee information for your family."
        image={IMAGES.roomPreschool}
        action={{ href: "/contact", label: "Ask about fees" }}
      />

      <section className="border-y border-eden-gold/30 bg-stone-light py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-2xl">
            <p className="mb-4 text-xs tracking-[0.35em] uppercase text-eden-green">Your fee breakdown</p>
            <h2 className="text-4xl font-light text-charcoal md:text-5xl" style={{ fontFamily: "var(--font-fraunces)" }}>
              We&apos;ll make the numbers easy to understand.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {feeFactors.map((factor, index) => (
              <article key={factor.title} className="rounded-[1.5rem] border border-charcoal/10 bg-white p-7">
                <p className="mb-5 text-4xl font-light text-eden-green" style={{ fontFamily: "var(--font-fraunces)" }}>0{index + 1}</p>
                <h3 className="mb-3 text-2xl font-light text-charcoal" style={{ fontFamily: "var(--font-fraunces)" }}>{factor.title}</h3>
                <p className="text-sm leading-relaxed text-charcoal-light">{factor.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-5 text-xs tracking-[0.35em] uppercase text-eden-green">What to have ready</p>
            <h2 className="text-4xl font-light leading-tight text-charcoal md:text-5xl" style={{ fontFamily: "var(--font-fraunces)" }}>
              Tell us what your week looks like.
            </h2>
          </div>
          <div className="rounded-[1.5rem] border border-charcoal/10 bg-sage-soft/60 p-7 md:p-9">
            <ul className="space-y-4 text-sm leading-relaxed text-charcoal-light">
              {[
                "Which Eden nursery is most convenient",
                "Your child’s age and preferred start date",
                "The days and hours you need",
                "Whether you want to ask about funded hours",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-eden-green" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/locations" className="mt-8 inline-flex rounded-full bg-eden-green px-7 py-3.5 text-xs font-medium tracking-[0.2em] uppercase text-white transition hover:bg-sage-dark">
              View nurseries
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-eden-gold/30 bg-stone-light py-16 text-center">
        <p className="mb-4 text-xs tracking-[0.35em] uppercase text-eden-green">Need the latest details?</p>
        <h2 className="mx-auto max-w-2xl text-4xl font-light text-charcoal md:text-5xl" style={{ fontFamily: "var(--font-fraunces)" }}>
          We&apos;ll send the right fee information for your chosen nursery.
        </h2>
        <FeeButton className="mt-8 inline-flex rounded-full bg-eden-green px-9 py-4 text-xs font-medium tracking-[0.22em] uppercase text-white transition hover:bg-sage-dark" />
        <p className="mt-5 text-sm text-charcoal-light">Or call {BUSINESS.phone.display}.</p>
      </section>
    </>
  );
}
