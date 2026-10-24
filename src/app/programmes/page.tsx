import { IMAGES, sized, type CuratedImage } from "@/data/images";
import { BUSINESS } from "@/data/business";
import { PageHero } from "@/components/PageHero";
import { EnquiryButton } from "@/components/EnquiryModal";

interface Programme {
  title: string;
  age: string;
  description: string[];
  features: string[];
  image: CuratedImage;
}

const programmes: Programme[] = [
  {
    title: "Toddlers",
    age: "15 months – 3 years",
    description: [
      "From 15 months, children learn through free play, guided activities, outdoor time, meals and rest, with a steady routine that helps them feel secure.",
      "Books, songs and everyday conversation in English, French and Arabic support early communication and give many children familiar words throughout the day.",
    ],
    features: [
      "Indoor and outdoor play",
      "Natural materials and sensory play",
      "Stories and songs in English, French and Arabic",
      "Mark-making and early writing",
      "Support with toilet training",
    ],
    image: IMAGES.roomToddlers,
  },
  {
    title: "Pre-school",
    age: "3 – 4 years",
    description: [
      "Pre-school children build the skills they will use in reception through phonics, early numeracy, fine-motor activities, creative projects and group routines.",
      "If you use funded hours, the nursery team can explain how they apply to your chosen days and sessions and direct you to the official eligibility guidance.",
    ],
    features: [
      "Phonics and pre-reading",
      "Early numeracy and counting",
      "Fine-motor and pencil control",
      "Creative projects and problem-solving",
      "Preparing for reception routines",
    ],
    image: IMAGES.roomPreschool,
  },
];

const fundingNotes = [
  "Meals, snacks, nappies and parent-app updates vary by nursery and session.",
  "Settling-in visits are agreed with your nursery before the start date.",
  "Funded hours can be combined with paid sessions where available.",
  "Funding administration depends on your nursery and local authority; the team will explain the next steps.",
];

export default function ProgrammesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Programmes"
        title={<>Two rooms.<br /><span className="script text-eden-green">One philosophy.</span></>}
        description="From 15 months to 4 years, every age has its own space, its own rhythm, and its own key-worker team — built around the way children learn at that stage."
        image={IMAGES.roomPreschool}
        action={{ href: "/contact", label: "Book a tour" }}
      />

      {/* Programme detail */}
      <section className="pb-24 bg-ivory">
        <div className="max-w-5xl mx-auto px-6 space-y-20">
          {programmes.map((p, i) => (
            <article
              key={p.title}
              className="group overflow-hidden rounded-[1.75rem] border border-charcoal/10 bg-white shadow-sm transition-shadow hover:shadow-[0_18px_45px_rgba(64,93,37,0.1)]"
            >
              <div className="relative aspect-[16/10] sm:aspect-[21/9] overflow-hidden">
                <div
                  className="absolute inset-0 bg-center bg-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  style={{
                    backgroundImage: `url(${sized(p.image, 1800, 75)})`,
                    backgroundColor: p.image.color,
                  }}
                  role="img"
                  aria-label={p.image.alt}
                />
                <div className="absolute bottom-6 left-8 md:left-12">
                  <span className="inline-flex rounded-full bg-charcoal px-3 py-1.5 text-xs uppercase tracking-[0.3em] text-white shadow-sm">
                    0{i + 1}
                  </span>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <h2
                  className="text-3xl md:text-4xl font-light text-charcoal"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {p.title}
                </h2>
                <p className="text-sm text-mauve mt-1 italic">{p.age}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
                  <div className="space-y-4">
                    {p.description.map((para, j) => (
                      <p
                        key={j}
                        className="text-sm text-charcoal-light leading-relaxed"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                  <div>
                    <h4 className="text-[10px] tracking-[0.3em] uppercase text-mauve-dark mb-4">
                      What&apos;s in the day
                    </h4>
                    <ul className="space-y-3">
                      {p.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm text-charcoal-light"
                        >
                          <span className="text-mauve mt-0.5">—</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Funding strip */}
      <section className="py-20 bg-stone-light border-y border-stone-border/60">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.4em] uppercase text-mauve-dark mb-3">
              Funding & Fees
            </p>
            <h2
              className="text-3xl md:text-4xl font-light text-charcoal"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              We accept every government scheme.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 max-w-3xl mx-auto">
            {BUSINESS.funding.map((f) => (
              <div key={f} className="flex items-center gap-3 text-sm text-charcoal">
                <span className="w-1.5 h-1.5 rounded-full bg-mauve flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
          <ul className="mt-10 max-w-3xl mx-auto space-y-2">
            {fundingNotes.map((n) => (
              <li
                key={n}
                className="text-xs text-text-muted leading-relaxed flex items-start gap-2"
              >
                <span className="text-mauve">·</span>
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-ivory to-mauve-soft">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2
            className="text-4xl font-light mb-6 text-charcoal"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Want to see{" "}
            <span className="script text-mauve">the rooms?</span>
          </h2>
          <p className="text-charcoal-light mb-10">
            Tours are 30 minutes. Bring your child if you can — they&apos;ll
            tell you everything you need to know within five minutes of being
            in the door.
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
