import Image from "next/image";
import Link from "next/link";
import { IMAGES, sized, type CuratedImage } from "@/data/images";
import { Reviews } from "@/components/Reviews";
import { FAQ } from "@/components/FAQ";
import { EnquiryButton } from "@/components/EnquiryModal";
import { HomepageNurseryLocator } from "@/components/HomepageNurseryLocator";
import { ActivityCards } from "@/components/ActivityCards";

interface RoomCard {
  title: string;
  age: string;
  description: string;
  image: CuratedImage;
}

const rooms: RoomCard[] = [
  {
    title: "Toddlers",
    age: "15 months – 3 years",
    description:
      "From 15 months, children learn through play, movement, stories, songs and early mark-making, with a steady routine for meals, rest and outdoor time.",
    image: IMAGES.roomToddlers,
  },
  {
    title: "Pre-school",
    age: "3 – 4 years",
    description:
      "Pre-school children build confidence with phonics, early numeracy, fine-motor activities and creative projects. Ask the team how funded hours can apply to your chosen days and sessions.",
    image: IMAGES.roomPreschool,
  },
];

type SectionIconName =
  | "nursery"
  | "room"
  | "funding"
  | "visit"
  | "creative"
  | "outdoors"
  | "learning"
  | "routine";

const visitSteps: Array<{
  title: string;
  text: string;
  icon: SectionIconName;
  tone: string;
}> = [
  {
    title: "Choose your nursery",
    text: "Start with the Eden nursery closest to home or work: Streatham, Croydon, Rochester or Tunbridge Wells.",
    icon: "nursery",
    tone: "bg-[#EEF4E7]",
  },
  {
    title: "Check the right room",
    text: "Tell us your child's age and the days you need — we'll guide you every step of the way.",
    icon: "room",
    tone: "bg-[#FFF3DF]",
  },
  {
    title: "Ask about funding",
    text: "We can talk through funded hours, Tax-Free Childcare and any other help that applies to your family.",
    icon: "funding",
    tone: "bg-[#EEF4E7]",
  },
  {
    title: "Visit before you decide",
    text: "Meet the team, see the rooms, and ask anything you need before choosing a place.",
    icon: "visit",
    tone: "bg-[#F8F0E4]",
  },
];

type EssentialIconName = "care" | "hours" | "early-years" | "languages" | "support" | "locations";

const parentEssentials: Array<{
  icon: EssentialIconName;
  text: string;
  tone: string;
}> = [
  {
    icon: "care",
    text: "Small, familiar rooms where every child gets caring, personal attention",
    tone: "bg-sage-soft",
  },
  {
    icon: "hours",
    text: "Long-day care to fit around your family, open 7am–7pm",
    tone: "bg-[#FFF3DF]",
  },
  {
    icon: "early-years",
    text: "Loving toddler and pre-school care for little ones aged 15 months to 4 years",
    tone: "bg-[#F3F6EC]",
  },
  {
    icon: "languages",
    text: "A team who speak English, French and Arabic, so every child feels understood",
    tone: "bg-[#FFF7EA]",
  },
  {
    icon: "support",
    text: "Extra care and attention for children with additional needs, allergies or asthma",
    tone: "bg-[#EEF4E7]",
  },
  {
    icon: "locations",
    text: "Proudly welcoming families at our nurseries in Streatham, Croydon, Rochester and Tunbridge Wells",
    tone: "bg-[#F8F0E4]",
  },
];

function ParentEssentialIcon({ name }: { name: EssentialIconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "care" && (
        <>
          <path d="M12 20.3S4.5 15.7 4.5 9.6A4.1 4.1 0 0 1 12 7.3a4.1 4.1 0 0 1 7.5 2.3c0 6.1-7.5 10.7-7.5 10.7Z" />
          <path d="M9.2 11.2c.8 1.1 1.7 1.7 2.8 1.7s2-.6 2.8-1.7" />
        </>
      )}
      {name === "hours" && (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3.2 2" />
        </>
      )}
      {name === "early-years" && (
        <>
          <rect x="3.5" y="12.5" width="7" height="7" rx="1.2" />
          <rect x="13.5" y="12.5" width="7" height="7" rx="1.2" />
          <path d="m12 3.8 4.1 6.7H7.9L12 3.8Z" />
        </>
      )}
      {name === "languages" && (
        <>
          <path d="M4 5.2h10.5v8H8.2L4 16.5V5.2Z" />
          <path d="M10 16h6l4 3v-9.5h-2.8" />
          <path d="M7 9h4.5" />
        </>
      )}
      {name === "support" && (
        <>
          <path d="M12 3.5 19 6v5.3c0 4.4-2.8 7.5-7 9.2-4.2-1.7-7-4.8-7-9.2V6l7-2.5Z" />
          <path d="M12 15.5s-3.2-1.9-3.2-4.4a1.8 1.8 0 0 1 3.2-1 1.8 1.8 0 0 1 3.2 1c0 2.5-3.2 4.4-3.2 4.4Z" />
        </>
      )}
      {name === "locations" && (
        <>
          <path d="M19 10c0 5.2-7 10.5-7 10.5S5 15.2 5 10a7 7 0 1 1 14 0Z" />
          <circle cx="12" cy="10" r="2.2" />
        </>
      )}
    </svg>
  );
}

function SectionIcon({ name }: { name: SectionIconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "nursery" && (
        <>
          <path d="m4 10 8-6 8 6" />
          <path d="M6.5 9.5V20h11V9.5" />
          <path d="M10 20v-5h4v5" />
        </>
      )}
      {name === "room" && (
        <>
          <rect x="3.5" y="12.5" width="7" height="7" rx="1.2" />
          <rect x="13.5" y="12.5" width="7" height="7" rx="1.2" />
          <path d="m12 3.8 4.1 6.7H7.9L12 3.8Z" />
        </>
      )}
      {name === "funding" && (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M14.8 8.3h-3.2a2.1 2.1 0 0 0 0 4.2h.8a2.1 2.1 0 0 1 0 4.2H9" />
          <path d="M12 6.5v11" />
        </>
      )}
      {name === "visit" && (
        <>
          <rect x="4" y="5.5" width="16" height="14" rx="2" />
          <path d="M8 3.5v4M16 3.5v4M4 10h16" />
          <path d="m9 14 2 2 4-4" />
        </>
      )}
      {name === "creative" && (
        <>
          <path d="M12 4a8 8 0 1 0 0 16h1.2a1.8 1.8 0 0 0 0-3.6H12a1.5 1.5 0 0 1 0-3h2.4A5.6 5.6 0 0 0 20 7.8C20 5.7 16.4 4 12 4Z" />
          <circle cx="8" cy="9" r=".8" fill="currentColor" stroke="none" />
          <circle cx="11" cy="7" r=".8" fill="currentColor" stroke="none" />
          <circle cx="15" cy="8" r=".8" fill="currentColor" stroke="none" />
        </>
      )}
      {name === "outdoors" && (
        <>
          <circle cx="8" cy="8" r="3" />
          <path d="M8 2.5V1M8 15v-1.5M2.5 8H1M15 8h-1.5M4.1 4.1 3 3M13 13l-1.1-1.1" />
          <path d="M7 20c4.8-.2 9.2-3.2 11-8 1.2 5.3-1.8 9-6.5 9A8 8 0 0 1 7 20Z" />
          <path d="M8 19c2.5-1.2 4.8-3 6.7-5.2" />
        </>
      )}
      {name === "learning" && (
        <>
          <path d="M4 5.5h5.2c1.6 0 2.8.8 2.8 2.4V20c0-1.6-1.2-2.4-2.8-2.4H4V5.5Z" />
          <path d="M20 5.5h-5.2c-1.6 0-2.8.8-2.8 2.4V20c0-1.6 1.2-2.4 2.8-2.4H20V5.5Z" />
        </>
      )}
      {name === "routine" && (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3.2 2" />
          <path d="M5.5 4.8 4 3.3M18.5 4.8 20 3.3" />
        </>
      )}
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero — a clear image, message and action sequence. */}
      <section className="relative isolate overflow-hidden bg-ivory">
            <figure className="absolute inset-0 -z-10">
              <Image
                src={sized(IMAGES.heroChildren, 1600, 82)}
                alt={IMAGES.heroChildren.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ivory/95 via-ivory/80 to-ivory/10"
                aria-hidden="true"
              />
            </figure>
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-28 lg:py-36">
          <div className="max-w-xl">
            <div className="text-left">
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-eden-green sm:text-xs">
                Nursery care from 15 months to 4 years
              </p>
              <h1
                className="mt-5 text-[3.15rem] font-light leading-[0.93] tracking-[-0.035em] text-charcoal sm:text-6xl lg:text-[4rem] xl:text-[4.75rem]"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                <span className="block lg:whitespace-nowrap">A small group,</span>
                <span className="block lg:whitespace-nowrap">built around</span>
                <span className="script block text-eden-green">your child.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-charcoal-light sm:text-lg">
                Calm, considered early-years care where every child is known,
                every family is supported and each day builds confidence.
              </p>

              <div className="mt-8 flex">
                <EnquiryButton
                  intent="Book a tour"
                  className="inline-flex min-h-13 w-full items-center justify-center rounded-full bg-eden-green px-8 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-white transition hover:bg-sage-dark sm:w-auto sm:min-w-48"
                >
                  Book a Tour
                </EnquiryButton>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Location search follows the hero instead of competing with it. */}
      <section className="bg-[#DE9342] py-10 md:py-14">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <HomepageNurseryLocator />
        </div>
      </section>

      {/* Funding route — kept near the top because cost support is a primary parent question. */}
      <section className="bg-mauve py-14 text-ivory md:py-18">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2
            className="text-3xl font-light leading-tight md:text-5xl"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Explore your childcare funding options.
          </h2>
          <Link
            href="/funding"
            className="mt-8 inline-flex justify-center rounded-full bg-white px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-mauve transition hover:bg-ivory-warm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Check your eligibility
          </Link>
        </div>
      </section>

      {/* Visit-first enquiry path */}
      <section className="border-b border-stone-border/60 bg-white py-18 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-4">
              <p className="text-xs tracking-[0.4em] uppercase text-mauve-dark mb-5">
                How to Join Eden
              </p>
              <h2
                className="text-4xl md:text-5xl font-light leading-tight text-charcoal"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Find the right room.
                <br />
                <span className="script text-mauve">Visit when you&apos;re ready.</span>
              </h2>
              <p className="mt-6 text-charcoal-light leading-relaxed">
                Tell us your child&apos;s age, the days you need and when you&apos;d like
                them to start. We&apos;ll help you contact the nearest Eden nursery,
                check the right room and arrange a visit.
              </p>
              <EnquiryButton
                intent="General nursery enquiry"
                className="inline-block mt-8 px-8 py-4 bg-mauve text-ivory text-xs tracking-[0.25em] uppercase font-medium hover:bg-mauve-dark transition-colors duration-300 rounded-full"
              >
                Start an Enquiry
              </EnquiryButton>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {visitSteps.map((step, index) => (
                <article
                  key={step.title}
                  className={`min-h-60 rounded-[1.75rem] border border-charcoal/10 p-6 shadow-[0_12px_30px_rgba(64,93,37,0.08)] md:p-7 ${step.tone}`}
                >
                  <div className="mb-7 flex items-center justify-between gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-eden-green text-white shadow-[0_10px_24px_rgba(64,93,37,0.18)]">
                      <SectionIcon name={step.icon} />
                    </span>
                    <span className="text-sm font-medium tracking-[0.18em] text-eden-green/55" aria-hidden="true">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mb-3 text-2xl font-light text-charcoal">
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-charcoal-light">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Parent essentials — high-contrast, icon-led and easy to scan. */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-4xl">
            <p className="mb-4 text-xs uppercase tracking-[0.32em] text-eden-green">
              Why families choose Eden
            </p>
            <h2 className="text-4xl font-light leading-[1.04] text-charcoal sm:text-5xl lg:text-6xl">
              Practical nursery care,
              <br className="hidden sm:block" />
              <span className="script text-eden-green">built around family life.</span>
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {parentEssentials.map((item) => (
              <article
                key={item.text}
                className={`flex min-h-32 items-center gap-5 rounded-[1.75rem] p-5 shadow-[inset_0_0_0_1px_rgba(43,42,38,0.045)] sm:gap-6 sm:p-6 ${item.tone}`}
              >
                <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-[1.35rem] bg-gradient-to-br from-eden-green via-sage-light to-eden-gold text-white shadow-[0_12px_28px_rgba(64,93,37,0.2)] sm:h-[4.5rem] sm:w-[4.5rem]">
                  <ParentEssentialIcon name={item.icon} />
                </span>
                <p className="text-[1.08rem] font-medium leading-[1.42] text-charcoal sm:text-xl">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section className="py-24 md:py-32 bg-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.4em] uppercase text-mauve-dark mb-4">
              Our Rooms
            </p>
            <h2
              className="text-4xl md:text-5xl font-light mauve-underline text-charcoal"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              15 months to 4 years
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rooms.map((r) => (
              <article
                key={r.title}
                className="service-card group relative overflow-hidden rounded-[1.75rem] border border-stone-border bg-white"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-mauve opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                <div className="relative aspect-[16/9] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-center bg-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${sized(r.image, 1200, 75)})`,
                      backgroundColor: r.image.color,
                    }}
                    role="img"
                    aria-label={r.image.alt}
                  />
                </div>

                <div className="relative p-8 md:p-10">
                  <h3
                    className="text-2xl font-light text-charcoal mb-2"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    {r.title}
                  </h3>
                  <p className="text-xs tracking-[0.15em] uppercase text-mauve mb-4">
                    {r.age}
                  </p>
                  <p className="text-sm text-charcoal-light leading-relaxed">
                    {r.description}
                  </p>
                  <Link
                    href="/programmes"
                    className="inline-block mt-6 text-xs tracking-[0.2em] uppercase text-mauve hover:text-mauve-dark transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-20 md:py-24 bg-white border-y border-stone-border/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10 md:mb-12">
            <p className="text-xs tracking-[0.4em] uppercase text-mauve-dark mb-5">
              Activities
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-charcoal mb-5"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Daily life at Eden.
            </h2>
            <p className="text-charcoal-light leading-relaxed">
              From playful discovery to quiet rest, every part of the day at Eden is designed to help children learn, grow and feel truly at home.
            </p>
          </div>
          <ActivityCards />
        </div>
      </section>

      {/* Built around your child — feature section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 relative aspect-[4/5] md:aspect-[5/6] overflow-hidden order-2 lg:order-1 rounded-3xl">
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{
                  backgroundImage: `url(${sized(IMAGES.joyfulPlay, 1600, 80)})`,
                  backgroundColor: IMAGES.joyfulPlay.color,
                }}
                role="img"
                aria-label={IMAGES.joyfulPlay.alt}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-mauve/10 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-auto">
                <div className="inline-flex items-center gap-3 rounded-[1.75rem] border border-mauve/30 bg-white/95 px-5 py-3 shadow-lg backdrop-blur-sm">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-5 h-5 text-mauve flex-shrink-0"
                    aria-hidden
                  >
                    <path d="M12 21s-7.5-5-7.5-11A4.5 4.5 0 0112 6.5 4.5 4.5 0 0119.5 10c0 6-7.5 11-7.5 11z" />
                  </svg>
                  <div>
                    <p
                      className="text-[10px] tracking-[0.3em] uppercase text-mauve-dark"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      Inclusive nursery care
                    </p>
                    <p
                      className="text-xs text-charcoal mt-0.5"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      ASD · ADHD · speech · allergies welcome
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <p className="text-xs tracking-[0.4em] uppercase text-mauve-dark mb-5">
                Why Eden
              </p>
              <h2
                className="text-4xl md:text-5xl font-light leading-[1.05] text-charcoal mb-8"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Care shaped around
                <br />
                <span className="script text-mauve">each child.</span>
              </h2>
              <div className="space-y-5 text-charcoal-light leading-relaxed text-base md:text-lg">
                <p>
                  Eden is built on familiar faces, calm rooms and close relationships with every family. Every child settles into an age-appropriate room with a steady routine and all the time they need to feel truly at home, at their own pace.
                </p>
                <p>
                  Our team speaks English, French and Arabic, helping families from all backgrounds communicate with warmth and ease — and we&apos;re always happy to explore other ways to support communication too. We welcome children of all abilities and needs, and our team is SEND trained. If your child is autistic, has ADHD, speech and language needs, allergies, asthma or any other additional needs, do let us know before your visit — we&apos;ll be glad to talk through how we can support them safely and well, together with you.
                </p>
              </div>

              <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {[
                  "15 & 30 hours funded childcare",
                  "Accepted: Tax-Free Childcare & Universal Credit childcare element",
                  "Multilingual team — English, French & Arabic",
                  "SEN-supportive, inclusive care",
                  "Nurseries across London and Kent",
                  "Welcoming children from 15 months to 4 years",
                  "School pick-up and drop-off service",
                  "After-school club available",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-charcoal"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-mauve flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/programmes"
                  className="px-8 py-4 bg-mauve text-ivory text-xs tracking-[0.25em] uppercase font-medium hover:bg-mauve-dark transition-colors duration-300 text-center rounded-full"
                >
                  See Our Programmes
                </Link>
                <EnquiryButton
                  intent="Book a tour"
                  className="rounded-full border border-eden-green/20 bg-sage-soft/70 px-8 py-4 text-center text-xs font-medium uppercase tracking-[0.25em] text-mauve transition duration-300 hover:border-eden-green/40 hover:bg-sage-soft"
                >
                  Book a Tour
                </EnquiryButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy — From Philomena */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-ivory-warm">
        <div
          className="absolute inset-0 bg-center bg-cover opacity-20"
          style={{
            backgroundImage: `url(${sized(IMAGES.philosophy, 2000, 70)})`,
            backgroundColor: IMAGES.philosophy.color,
          }}
          role="img"
          aria-label={IMAGES.philosophy.alt}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory-warm/90 via-ivory-warm/80 to-ivory-warm" />

        <div className="relative max-w-4xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-14">
            <p className="text-xs tracking-[0.4em] uppercase text-mauve-dark mb-4">
              A note from Philomena
            </p>
            <h2
              className="text-4xl md:text-5xl font-light mauve-underline text-charcoal"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              The care I&apos;d want
              <br />
              <span className="script text-mauve">for my own child.</span>
            </h2>
          </div>

          <div className="space-y-6 text-charcoal-light leading-relaxed text-center md:text-lg">
            <p>
              I started out as an Ofsted-registered childminder, driven by one simple goal: to help families feel truly confident about the care their child received, every single day — safe, warm, personal and consistent.
            </p>
            <p>
              That same standard is the heartbeat of every Eden nursery today, shaping our teams, our daily routines, our safeguarding and the way we speak with families.
            </p>
            <p>
              Come and visit your nearest nursery, meet the team, and see for yourself how your child feels the moment they walk into the room.
            </p>
            <p
              className="pt-4 italic text-mauve"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              — Philomena Sadia, Founder
            </p>
            <EnquiryButton intent="Book a tour" className="inline-flex rounded-full bg-eden-green px-8 py-4 text-sm text-white">Book a tour</EnquiryButton>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <Reviews />

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-ivory to-mauve-soft">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2
            className="text-4xl md:text-5xl font-light mb-6 text-charcoal"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Ready to
            <br />
            <span className="script text-mauve">visit us?</span>
          </h2>
          <p className="text-charcoal-light mb-10 text-lg">
            Tours take about 30 minutes. Bring your child — we like meeting them
            as much as we like meeting you.
          </p>
          <EnquiryButton
            intent="Book a tour"
            className="inline-block px-12 py-4 bg-mauve text-ivory text-sm tracking-[0.2em] uppercase font-medium hover:bg-mauve-dark transition-colors duration-300 rounded-full"
          >
            Book a Tour
          </EnquiryButton>
        </div>
      </section>
    </>
  );
}
