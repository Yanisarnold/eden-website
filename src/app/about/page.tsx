import { IMAGES, sized } from "@/data/images";
import { BUSINESS } from "@/data/business";
import { PageHero } from "@/components/PageHero";
import { EnquiryButton } from "@/components/EnquiryModal";
import { TeamButton } from "@/components/TeamModal";

const values = [
  {
    title: "Personal care at every nursery",
    description:
      "Each Eden nursery has its own familiar team, age-appropriate rooms and steady daily routines. Parents know who is caring for their child and who to contact.",
  },
  {
    title: "A multilingual team",
    description:
      "English, French and Arabic are spoken across the team, helping families communicate comfortably and giving many children familiar words as they settle in.",
  },
  {
    title: "Inclusive, thoughtful care",
    description:
      "Eden welcomes children with autism, ADHD, speech and language differences, allergies and asthma. Philomena brings SENCO training, safeguarding leadership and years of hands-on childcare experience.",
  },
  {
    title: "Founder-led standards",
    description:
      "Philomena leads Eden's approach to care, safeguarding, staff development and communication with families. Each nursery team is responsible for the children and families they know.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Eden"
        title={<>From a trusted childminder<br /><span className="script text-eden-green">to a nursery built around you.</span></>}
        description={<>Eden Childcare Group is led by {BUSINESS.practitioner.fullName}, bringing a warm, family-centred approach to the rooms, routines and care offered across Eden.</>}
        image={IMAGES.aboutHero}
      >
        <TeamButton className="inline-flex rounded-full bg-eden-green px-9 py-4 text-xs font-medium uppercase tracking-[0.22em] text-white transition hover:bg-sage-dark">
          Meet the team
        </TeamButton>
      </PageHero>

      {/* Meet Philomena — bio */}
      <section className="py-20 md:py-28 border-y border-stone-border/60 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16 items-start">
            <div className="md:col-span-2">
              <div
                className="relative aspect-[4/5] overflow-hidden bg-stone-light"
                role="img"
                aria-label="Founder portrait — Philomena Sadia, in conversation with a child"
                style={{
                  backgroundImage: `url(${sized(IMAGES.aboutHero, 1200, 75)})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: IMAGES.aboutHero.color,
                }}
              />
              <div className="mt-5">
                <p
                  className="text-[10px] tracking-[0.35em] uppercase text-mauve-dark"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Founder &amp; Manager
                </p>
                <p
                  className="text-2xl font-light text-charcoal mt-1"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {BUSINESS.practitioner.fullName}
                </p>
              </div>
            </div>

            <div className="md:col-span-3">
              <h2
                className="text-3xl md:text-4xl font-light text-charcoal mb-8 leading-tight"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Over 12 years in early years,
                <br />
                <span className="script text-mauve">
                  carried into every Eden nursery.
                </span>
              </h2>
              <div className="space-y-5 text-charcoal-light leading-relaxed text-base md:text-lg">
                <p>
                  Philomena has worked in childcare for over 12 years, beginning
                  as an Ofsted-registered childminder before growing Eden into a
                  nursery and pre-school. Her background spans nursery
                  operations, staff recruitment and training, curriculum
                  development, safeguarding, SENCO support and parent engagement.
                </p>
                <p>
                  She has led teams, managed nursery routines and supported
                  children across the early years. Eden is built around that same
                  practical standard: children are known personally, routines are
                  consistent, and parents know who to speak to.
                </p>
                <p>
                  Today, Eden is a growing nursery group with trained teams,
                  clear routines and the same commitment to personal,
                  founder-led care.
                </p>
              </div>

              {/* Milestone stats */}
              <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-stone-border/60">
                <div>
                  <p
                    className="text-3xl font-light text-mauve"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    2014
                  </p>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-text-muted mt-2">
                    Ofsted-registered childminder
                  </p>
                </div>
                <div>
                  <p
                    className="text-3xl font-light text-mauve"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    12+
                  </p>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-text-muted mt-2">
                    Years Experience
                  </p>
                </div>
                <div>
                  <p
                    className="text-3xl font-light text-mauve"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    2025
                  </p>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-text-muted mt-2">
                    Opened Nursery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface-warm py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.4em] uppercase text-mauve-dark mb-4">
              How We Work
            </p>
            <h2
              className="text-4xl md:text-5xl font-light mauve-underline text-charcoal"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Our principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <div
                key={value.title}
                className={`service-card relative overflow-hidden rounded-[2rem] border border-charcoal/10 p-8 shadow-[0_18px_50px_rgba(43,42,38,0.06)] md:p-10 ${i % 2 === 0 ? "bg-white" : "bg-sage-soft/45"}`}
              >
                <div className="absolute inset-x-0 top-0 h-1.5 bg-eden-green" aria-hidden="true" />
                <span className="mb-6 grid h-10 w-10 place-items-center rounded-full border border-eden-gold/45 bg-white text-xs font-medium text-eden-green">
                  0{i + 1}
                </span>
                <h3
                  className="text-2xl font-light text-charcoal mb-4"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {value.title}
                </h3>
                <p className="text-sm text-charcoal-light leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-ivory to-mauve-soft">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2
            className="text-4xl font-light mb-6 text-charcoal"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Come and{" "}
            <span className="script text-mauve">meet us.</span>
          </h2>
          <p className="text-charcoal-light mb-10">
            Tours take about 30 minutes. Bring your child if you can — we like
            meeting them as much as we like meeting you.
          </p>
          <EnquiryButton
            intent="Book a tour"
            className="inline-block rounded-full bg-mauve px-12 py-4 text-sm font-medium uppercase tracking-[0.2em] text-ivory transition-colors duration-300 hover:bg-mauve-dark"
          >
            Book a Tour
          </EnquiryButton>
        </div>
      </section>
    </>
  );
}
