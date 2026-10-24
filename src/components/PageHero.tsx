import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { CuratedImage } from "@/data/images";
import { EnquiryButton } from "@/components/EnquiryModal";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  image: CuratedImage;
  action?: { href: string; label: string };
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, image, action, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-charcoal/10 bg-white">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src={image.baseUrl}
          alt=""
          fill
          loading="eager"
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white" />
      </div>

      <div className="mx-auto max-w-5xl px-6 pb-20 pt-28 text-center md:pb-28 md:pt-40">
        <p className="mb-6 text-xs tracking-[0.4em] uppercase text-eden-green">{eyebrow}</p>
        <h1
          className="text-5xl font-light leading-tight text-charcoal md:text-7xl"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          {title}
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-charcoal-light">{description}</p>
        {(children || action) && (
          <div className="mt-10 flex flex-col items-center gap-4">
            {children}
            {action && action.href === "/contact" ? (
              <EnquiryButton
                intent={action.label}
                className="inline-flex rounded-full bg-eden-green px-9 py-4 text-xs font-medium tracking-[0.22em] uppercase text-white transition hover:bg-sage-dark"
              >
                {action.label}
              </EnquiryButton>
            ) : action ? (
              <Link
                href={action.href}
                className="inline-flex rounded-full bg-eden-green px-9 py-4 text-xs font-medium tracking-[0.22em] uppercase text-white transition hover:bg-sage-dark"
              >
                {action.label}
              </Link>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
