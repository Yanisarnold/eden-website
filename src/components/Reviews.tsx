import { REVIEWS, REVIEW_SUMMARY } from "@/data/reviews";

/**
 * Light editorial reviews section — shown on home page before the final CTA.
 * Uses hard-coded data from reviews.ts (see that file for live-fetch upgrade path).
 */
export function Reviews() {
  return (
    <section className="relative bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-xs tracking-[0.4em] uppercase text-mauve-dark mb-4">
            In Their Own Words
          </p>
          <h2
            className="text-4xl md:text-5xl font-light text-charcoal mauve-underline"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            What parents <span className="script text-mauve">say.</span>
          </h2>

          {/* Rating summary */}
          <div className="mt-10 inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-1" aria-label={`${REVIEW_SUMMARY.averageRating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} />
              ))}
            </div>
            <p
              className="text-sm tracking-[0.15em] uppercase text-charcoal-light"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              <span className="text-mauve font-medium">
                {REVIEW_SUMMARY.averageRating.toFixed(1)}
              </span>{" "}
              average across{" "}
              <span className="text-mauve font-medium">
                {REVIEW_SUMMARY.totalReviews}+
              </span>{" "}
              verified reviews
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {REVIEWS.map((review) => (
            <figure
              key={review.id}
              className="relative flex flex-col gap-5 overflow-hidden rounded-[1.75rem] border border-eden-green/10 bg-gradient-to-br from-[#FFF8EA] via-[#F8F4E8] to-[#E8F1DF] p-8 shadow-[0_18px_45px_-30px_rgba(64,93,37,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_-28px_rgba(64,93,37,0.34)] md:p-10"
            >
              {/* Decorative mauve quote mark */}
              <span
                aria-hidden
                className="absolute top-4 right-6 text-6xl leading-none text-mauve/20 font-light select-none"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                &ldquo;
              </span>

              {/* Stars */}
              <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} small />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="flex-1 text-[17px] leading-relaxed text-charcoal md:text-lg"
                style={{ fontFamily: "var(--font-fraunces)", fontWeight: 300 }}
              >
                {review.quote}
              </blockquote>

              {/* Attribution */}
              <figcaption className="pt-5 border-t border-stone-border/60 flex items-center justify-between">
                <div>
                  <p className="text-base font-medium text-charcoal">
                    {review.name}
                  </p>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-text-muted mt-0.5">
                    {review.date}
                  </p>
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-mauve/70 font-medium">
                  via {review.source}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Star({ small = false }: { small?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={small ? "w-3.5 h-3.5 text-mauve" : "w-5 h-5 text-mauve"}
      aria-hidden
    >
      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7.1L12 17.3 5.7 21l1.7-7.1L2 9.2l7.1-.6L12 2z" />
    </svg>
  );
}
