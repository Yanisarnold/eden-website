import type { Metadata } from "next";
import { BUSINESS, whatsappLink } from "@/data/business";
import { IMAGES } from "@/data/images";
import { ContactLocations } from "@/components/ContactLocations";
import { EnquiryButton } from "@/components/EnquiryModal";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact Eden Childcare Group",
  description: "Contact Eden Childcare Group by phone, email or WhatsApp and view details for your nearest nursery.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Eden"
        title={<>We&apos;re here<br /><span className="script text-eden-green">when you need us.</span></>}
        description="Contact the Eden team directly, or choose a nursery below to see its details and ask about rooms, fees or availability."
        image={IMAGES.roomToddlers}
      />

      <section className="border-b border-charcoal/10 bg-surface-warm py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="group rounded-[1.5rem] bg-eden-green p-7 text-white shadow-[0_18px_45px_rgba(64,93,37,0.16)] transition hover:bg-sage-dark">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/70">WhatsApp</p>
              <p className="mt-3 text-xl font-light text-white" style={{ fontFamily: "var(--font-fraunces)" }}>{BUSINESS.phone.display}</p>
              <p className="mt-2 text-xs leading-relaxed text-white/80">The quickest way to ask a short question.</p>
              <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white">Message the team <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span>
            </a>
            <a href={BUSINESS.phone.telUrl} className="rounded-[1.5rem] border border-charcoal/10 bg-white p-7 shadow-[0_14px_35px_rgba(43,42,38,0.04)] transition hover:border-eden-green/45 hover:bg-sage-soft/30">
              <p className="text-[10px] uppercase tracking-[0.3em] text-eden-green">Call Eden</p>
              <p className="mt-3 text-xl font-light text-charcoal" style={{ fontFamily: "var(--font-fraunces)" }}>{BUSINESS.phone.display}</p>
              <p className="mt-2 text-xs leading-relaxed text-charcoal-light">General enquiries, Monday to Friday, 8am to 7pm.</p>
            </a>
            <a href={`mailto:${BUSINESS.email}`} className="rounded-[1.5rem] border border-charcoal/10 bg-white p-7 shadow-[0_14px_35px_rgba(43,42,38,0.04)] transition hover:border-eden-green/45 hover:bg-sage-soft/30">
              <p className="text-[10px] uppercase tracking-[0.3em] text-eden-green">Email</p>
              <p className="mt-3 break-all text-xl font-light text-charcoal" style={{ fontFamily: "var(--font-fraunces)" }}>{BUSINESS.email}</p>
              <p className="mt-2 text-xs leading-relaxed text-charcoal-light">The team aims to reply within 24 hours.</p>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-9 max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-eden-green">Choose your nursery</p>
            <h2 className="text-4xl font-light leading-tight text-charcoal md:text-5xl" style={{ fontFamily: "var(--font-fraunces)" }}>Choose a nursery to see its address, contact details and map.</h2>
          </div>
          <ContactLocations />
        </div>
      </section>

      <section className="border-y border-eden-gold/30 bg-stone-light py-16 text-center md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs uppercase tracking-[0.35em] text-eden-green">Prefer one quick form?</p>
          <h2 className="mt-4 text-4xl font-light text-charcoal md:text-5xl" style={{ fontFamily: "var(--font-fraunces)" }}>Tell us what your family needs.</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-charcoal-light">Share your nursery, child&apos;s age and questions. Arranging a visit is optional and the team will confirm any preferred date.</p>
          <EnquiryButton intent="General contact enquiry" className="mt-8 rounded-full bg-eden-green px-9 py-4 text-xs font-medium uppercase tracking-[0.22em] text-white transition hover:bg-sage-dark">
            Start an enquiry
          </EnquiryButton>
        </div>
      </section>
    </>
  );
}
