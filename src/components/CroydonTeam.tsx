const teamPlaceholders = [
  {
    role: "Manager",
    name: "Name to be added",
    bio: "Photo and a short introduction from the Croydon Manager will be added here.",
  },
  {
    role: "Deputy Manager",
    name: "Name to be added",
    bio: "Photo and a short introduction from the Croydon Deputy Manager will be added here.",
  },
];

export function CroydonTeam() {
  return (
    <section className="border-b border-eden-gold/25 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs uppercase tracking-[0.4em] text-eden-green">
            The Croydon team
          </p>
          <h2
            className="text-4xl font-light leading-tight text-charcoal md:text-5xl"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Meet the people leading <span className="script text-eden-green">Eden Croydon.</span>
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-charcoal-light">
            The nursery&apos;s Manager and Deputy Manager will be introduced here, so families can put names and faces to the team before a visit.
          </p>
        </div>

        <div
          className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0"
          aria-label="Croydon management team"
        >
          {teamPlaceholders.map((member) => (
            <article
              key={member.role}
              className="min-w-[82vw] snap-center rounded-[1.75rem] border border-charcoal/10 bg-ivory-warm p-6 shadow-sm sm:min-w-0 md:p-8"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="grid aspect-square w-32 flex-none place-items-center rounded-full border border-dashed border-eden-gold bg-stone-light text-eden-green">
                  <div className="text-center">
                    <svg viewBox="0 0 24 24" className="mx-auto h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
                      <circle cx="12" cy="8" r="3.5" />
                      <path d="M5 20c.7-4 3-6 7-6s6.3 2 7 6" />
                    </svg>
                    <span className="mx-auto mt-2 block max-w-20 text-[8px] leading-tight uppercase tracking-[0.08em]">
                      Photo<br />to be added
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-eden-green">
                    {member.role}
                  </p>
                  <h3 className="mt-2 text-2xl font-light text-charcoal">{member.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal-light">{member.bio}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-5 text-xs leading-relaxed text-text-muted sm:hidden">
          Swipe to view both team cards.
        </p>
      </div>
    </section>
  );
}
