"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { BUSINESS } from "@/data/business";
import { IMAGES } from "@/data/images";

const TEAM_EVENT = "eden:open-team";

type TeamButtonProps = {
  children: ReactNode;
  className?: string;
};

export function TeamButton({ children, className }: TeamButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(TEAM_EVENT))}
      className={className}
      data-team-trigger
    >
      {children}
    </button>
  );
}

export function TeamModal() {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const close = () => {
    setIsOpen(false);
    window.setTimeout(() => previousFocusRef.current?.focus(), 0);
  };

  useEffect(() => {
    const handleOpen = () => {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      setIsOpen(true);
      window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    };
    window.addEventListener(TEAM_EVENT, handleOpen);
    return () => window.removeEventListener(TEAM_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => event.key === "Escape" && close();
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-charcoal/55 p-0 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={(event) => event.target === event.currentTarget && close()}>
      <section role="dialog" aria-modal="true" aria-labelledby={titleId} className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] border border-charcoal/10 bg-ivory shadow-2xl sm:rounded-[2rem]">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-eden-gold/25 bg-ivory/95 px-6 py-5 backdrop-blur-md sm:px-9">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-eden-green">The people behind Eden</p>
            <h2 id={titleId} className="mt-1 text-3xl font-light text-charcoal" style={{ fontFamily: "var(--font-fraunces)" }}>Meet the team</h2>
          </div>
          <button ref={closeButtonRef} type="button" onClick={close} className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border border-charcoal/10 bg-white text-xl text-charcoal transition hover:border-eden-green hover:text-eden-green" aria-label="Close team window">x</button>
        </div>

        <div className="grid gap-8 px-6 py-8 sm:px-9 md:grid-cols-[0.9fr_1.1fr] md:py-10">
          <article className="overflow-hidden rounded-[1.75rem] border border-charcoal/10 bg-white shadow-sm">
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-light">
              <Image src={IMAGES.aboutHero.baseUrl} alt={`${BUSINESS.practitioner.fullName}, ${BUSINESS.practitioner.role}`} fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-light text-charcoal" style={{ fontFamily: "var(--font-fraunces)" }}>{BUSINESS.practitioner.fullName}</h3>
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                <dt className="text-text-muted">Title</dt><dd className="text-charcoal-light">{BUSINESS.practitioner.role}</dd>
                <dt className="text-text-muted">Nursery</dt><dd className="text-charcoal-light">Eden Childcare Group</dd>
              </dl>
            </div>
          </article>

          <div className="flex flex-col justify-center">
            <p className="text-sm leading-relaxed text-charcoal-light">Eden is founder-led, and every nursery has its own early-years team. A visit gives you time to meet the people who will care for your child and ask about their daily routine.</p>
            <div className="mt-6 rounded-[1.5rem] border border-eden-green/20 bg-sage-soft/70 p-6">
              <p className="text-[10px] uppercase tracking-[0.28em] text-eden-green">Meet your nursery team</p>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-light">Ask who will support your child, how the team communicates with parents and what a typical day looks like.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
