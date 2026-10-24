import type { Metadata } from "next";
import { whatsappLink } from "@/data/business";
import { IMAGES } from "@/data/images";
import { PageHero } from "@/components/PageHero";
import { EnquiryButton } from "@/components/EnquiryModal";
import { FundingEligibilityChecker } from "@/components/FundingEligibilityChecker";

export const metadata: Metadata = {
  title: "Government Funding & Funded Hours | Eden Childcare Group",
  description:
    "Funded childcare from 9 months for eligible working parents, 2-year-old funding, 15 and 30 funded hours, Tax-Free Childcare and Universal Credit support at Eden Childcare Group — Streatham, Croydon, Rochester and Holden Park.",
};

const officialGuides = [
  {
    number: "01",
    title: "30 hours for working parents",
    body: "Check the full work, income, age and residence rules for Free Childcare for Working Parents.",
    href: "https://www.gov.uk/free-childcare-if-working",
  },
  {
    number: "02",
    title: "Early Learning for 2-year-olds",
    body: "See which benefits, support needs and family circumstances can qualify a 2-year-old for 15 hours.",
    href: "https://www.gov.uk/help-with-childcare-costs/free-childcare-2-year-olds-extra-support",
  },
  {
    number: "03",
    title: "Tax-Free Childcare",
    body: "Read how childcare accounts work and check the age, work, income and other eligibility rules.",
    href: "https://www.gov.uk/tax-free-childcare",
  },
];

export default function FundingPage() {
  return (
    <>
      <PageHero
        eyebrow="Government Funding"
        title={<>Funded childcare,<br /><span className="script text-eden-green">made simple.</span></>}
        description="Answer two quick questions for a useful starting point, then confirm your entitlement through the official GOV.UK service."
        image={IMAGES.roomToddlers}
        action={{ href: "/contact", label: "Ask about funding" }}
      />

      <section className="border-y border-charcoal/10 bg-surface-warm py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-eden-green">
              Two-question quick check
            </p>
            <h2
              className="text-4xl font-light leading-tight text-charcoal md:text-5xl"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              See what your family may be able to claim.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-charcoal-light md:text-base">
              This gives a likely starting point only. The official calculator checks the income,
              residence, benefits and family details that cannot be covered in two questions.
            </p>
          </div>

          <FundingEligibilityChecker />

          <div className="mt-16 md:mt-20">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-eden-green">Official guidance</p>
                <h2
                  className="mt-3 text-3xl font-light text-charcoal md:text-4xl"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  Check the full rules on GOV.UK.
                </h2>
              </div>
              <p className="max-w-lg text-sm leading-relaxed text-charcoal-light">
                These links open the current government guidance in a new tab.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {officialGuides.map((guide) => (
                <a
                  key={guide.title}
                  href={guide.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-64 flex-col rounded-[1.5rem] border border-charcoal/10 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-eden-green hover:shadow-xl hover:shadow-eden-green/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eden-green md:p-8"
                >
                  <span
                    className="text-3xl font-light text-eden-green"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    {guide.number}
                  </span>
                  <h3 className="mt-7 text-2xl font-light leading-tight text-charcoal">
                    {guide.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-charcoal-light">{guide.body}</p>
                  <span className="mt-auto pt-7 text-xs font-medium uppercase tracking-[0.18em] text-eden-green">
                    Read on GOV.UK <span aria-hidden="true">↗</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* We'll help you claim */}
      <section className="border-y border-eden-green/10 bg-sage-soft/55 py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-mauve-dark mb-5">
              We&apos;ll help you claim
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-charcoal leading-tight"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Bring your questions to a tour.
            </h2>
          </div>
          <div className="space-y-5 text-charcoal-light leading-relaxed">
            <p>
              Tell us your child&apos;s age, the days you need and your situation. We
              will talk you through which funded hours and schemes you are likely to
              qualify for, and how they combine — so you know your real costs before
              you decide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <EnquiryButton
                intent="Book a tour - funding questions"
                className="px-8 py-4 bg-mauve text-ivory text-xs tracking-[0.25em] uppercase font-medium hover:bg-mauve-dark transition-colors duration-300 text-center rounded-full"
              >
                Book a Tour
              </EnquiryButton>
              <a
                href={whatsappLink(
                  "Hi Philomena, could you help me understand which childcare funding my family can claim at Eden?",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-eden-green/20 bg-sage-soft/70 px-8 py-4 text-center text-xs font-medium uppercase tracking-[0.25em] text-mauve transition duration-300 hover:border-eden-green/40 hover:bg-sage-soft"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
