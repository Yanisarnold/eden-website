import Link from "next/link";
import { BUSINESS, whatsappLink } from "@/data/business";
import { Logo } from "@/components/Logo";

const aboutLinks = [
  { href: "/about", label: "About Eden" },
  { href: "/programmes", label: "Programmes" },
  { href: "/locations", label: "Our Nurseries" },
  { href: "/gallery", label: "Gallery" },
  { href: "/funding", label: "Funding" },
  { href: "/fees", label: "Fees" },
];

const policyRequests = [
  "Safeguarding policy",
  "Privacy information",
  "Complaints procedure",
];

export function Footer() {
  return (
    <footer className="border-t-4 border-eden-gold bg-eden-green text-white">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-14 md:pt-18">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr_0.9fr_1fr] lg:gap-10">
          <div>
            <div className="inline-flex rounded-[1.25rem] bg-white px-4 py-1 shadow-sm">
              <Logo size="sm" className="!h-[76px] md:!h-[70px]" />
            </div>
            <p
              className="mt-6 max-w-sm text-2xl font-light leading-tight text-white"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              A small group, <span className="script text-white/85">built around your child.</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
              Warm, personal early-years care across Croydon, Streatham, Rochester and Holden Park.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-white/85">
              Contact Eden
            </h2>
            <div className="mt-5 space-y-3 text-sm leading-relaxed text-white/80">
              <a className="block transition hover:text-white" href={BUSINESS.phone.telUrl}>
                {BUSINESS.phone.display}
              </a>
              <a className="block break-words transition hover:text-white" href={`mailto:${BUSINESS.email}`}>
                {BUSINESS.email}
              </a>
              <p>
                <span className="block">Opening times: {BUSINESS.hours[0].time}</span>
                <span className="block">{BUSINESS.hours[0].day}</span>
              </p>
              <a
                href={whatsappLink("Hi Philomena, I would like to ask about an Eden nursery place.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-full border border-white/55 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-eden-green"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-white/85">
              About
            </h2>
            <nav className="mt-5 grid gap-3 text-sm text-white/80" aria-label="Footer navigation">
              {aboutLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" className="transition hover:text-white">Contact</Link>
            </nav>
          </div>

          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-white/85">
              Policies
            </h2>
            <div className="mt-5 grid gap-3 text-sm text-white/80">
              {policyRequests.map((policy) => (
                <a
                  key={policy}
                  href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent(`Request for ${policy}`)}`}
                  className="transition hover:text-white"
                >
                  {policy} <span className="text-white/50">(request a copy)</span>
                </a>
              ))}
              <a
                href="https://reports.ofsted.gov.uk/provider/16/2811658"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                Ofsted information <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p className="fine-print">© {new Date().getFullYear()} {BUSINESS.tradingName}. All rights reserved.</p>
          <p className="fine-print">Ofsted registration: {BUSINESS.ofsted.urn}</p>
        </div>
      </div>
    </footer>
  );
}
