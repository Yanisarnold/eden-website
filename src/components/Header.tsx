"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { EnquiryButton } from "./EnquiryModal";
import { BUSINESS, roadNameWithoutNumber, whatsappLink } from "@/data/business";

const aboutLinks = [
  { href: "/about", label: "About Eden" },
  { href: "/programmes", label: "Programmes" },
  { href: "/gallery", label: "Gallery" },
];

const admissionsLinks = [
  { href: "#book-a-tour", label: "Book a tour", enquiry: true },
  { href: "/funding", label: "Funding", enquiry: false },
  { href: "/fees", label: "Fees", enquiry: false },
];

type DropdownLink = {
  href: string;
  label: string;
  subLabel?: string;
  enquiry?: boolean;
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };
  const groupIsActive = (links: { href: string }[]) => links.some((link) => isActive(link.href));
  const locationsActive = pathname.startsWith("/locations");

  const deskLink = (active: boolean) =>
    `text-xs tracking-[0.24em] transition-colors duration-300 ${
      active ? "text-mauve" : "text-charcoal-light hover:text-mauve"
    }`;
  const mobileLink = (active: boolean) =>
    `text-lg tracking-[0.1em] transition-colors ${
      active ? "text-mauve" : "text-charcoal hover:text-mauve"
    }`;

  const locationSubLabel = (location: (typeof BUSINESS.locations)[number]) => {
    if (location.comingSoon) return "Opening September 2026";
    const roadName = roadNameWithoutNumber(location.line1);
    return [roadName, location.line2].filter(Boolean).join(", ");
  };

  const dropdown = (label: string, active: boolean, links: DropdownLink[]) => {
    const isOpen = openDropdown === label;

    return (
    <div
      className="relative py-3"
      onMouseEnter={() => setOpenDropdown(label)}
      onMouseLeave={() => setOpenDropdown(null)}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onFocus={() => setOpenDropdown(label)}
        onClick={() => setOpenDropdown(isOpen ? null : label)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpenDropdown(null);
            event.currentTarget.blur();
          }
        }}
        className={`${deskLink(active)} inline-flex items-center gap-2`}
      >
        {label}
        <svg
          viewBox="0 0 10 6"
          className={`h-1.5 w-2.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          aria-hidden="true"
        >
          <path d="m1 1 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        className={`absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 rounded-2xl border border-stone-border/60 bg-white p-2 shadow-xl transition-all duration-200 ${
          isOpen ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-2 opacity-0"
        }`}
      >
        {links.map((link) => {
          const content = (
            <>
              <span className={link.subLabel ? "block" : ""}>{link.label}</span>
              {link.subLabel && <span className="mt-1 block text-xs leading-snug text-charcoal-light/70">{link.subLabel}</span>}
            </>
          );
          const className = `block w-full rounded-xl px-4 py-3 text-left text-sm transition-colors hover:bg-mauve-soft hover:text-mauve ${isActive(link.href) ? "text-mauve" : "text-charcoal-light"}`;
          return link.enquiry ? (
            <EnquiryButton key={`${label}-${link.href}-${link.label}`} intent="Book a tour" className={className}>
              {content}
            </EnquiryButton>
          ) : (
            <Link key={`${label}-${link.href}-${link.label}`} href={link.href} className={className}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
    );
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm shadow-mauve/5">
      <div className="bg-mauve text-ivory">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-1 px-4 py-2 text-center sm:flex-row sm:gap-3 sm:px-6">
          <p className="text-[10px] uppercase tracking-[0.22em] text-ivory/95 sm:text-xs">
            Now enrolling — ask about your child&apos;s room
          </p>
          <span className="hidden h-3 w-px bg-ivory/35 sm:inline" />
          <Link
            href={whatsappLink("Hi Philomena, could I check current Eden nursery availability and book a visit?")}
            target="_blank"
            className="text-[10px] uppercase tracking-[0.22em] underline decoration-ivory/45 underline-offset-4 hover:text-ivory/80 sm:text-xs"
          >
            Check availability
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2">
        <Link href="/" className="flex items-center gap-3">
          <Logo size="sm" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
          <Link href="/" aria-current={isActive("/") ? "page" : undefined} className={deskLink(isActive("/"))}>
            Home
          </Link>
          {dropdown("About Eden", groupIsActive(aboutLinks), aboutLinks)}
          {dropdown(
            "Our Nurseries",
            locationsActive,
            [
              { href: "/locations", label: "All nurseries" },
              ...BUSINESS.locations.map((location) => ({
                href: `/locations/${location.slug}`,
                label: location.shortName,
                subLabel: locationSubLabel(location),
              })),
            ],
          )}
          {dropdown("Admissions", groupIsActive(admissionsLinks), admissionsLinks)}
          <Link
            href="/contact"
            aria-current={isActive("/contact") ? "page" : undefined}
            className="rounded-full border-2 border-mauve px-5 py-2.5 text-xs font-medium tracking-[0.18em] text-mauve transition hover:bg-mauve hover:text-ivory"
          >
            Contact
          </Link>
          <EnquiryButton
            intent="Book a tour"
            className="ml-1 rounded-full bg-mauve px-6 py-3 text-xs font-medium tracking-[0.2em] text-ivory transition hover:bg-mauve-dark"
          >
            Book a tour
          </EnquiryButton>
        </nav>

        <button
          className="flex flex-col gap-1.5 rounded-full p-2 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className={`block h-0.5 w-6 bg-mauve transition-transform duration-300 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-mauve transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-mauve transition-transform duration-300 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute inset-x-0 top-full z-40 max-h-[85vh] overflow-y-auto bg-charcoal/65 px-4 py-5 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="rounded-[1.75rem] bg-white px-6 py-8 shadow-2xl shadow-charcoal/30 ring-1 ring-ivory/25" onClick={(event) => event.stopPropagation()}>
            <nav className="flex flex-col gap-6">
              <Link href="/" onClick={() => setMobileOpen(false)} className={mobileLink(isActive("/"))}>
                Home
              </Link>

              <div className="border-y border-stone-border/40 py-5">
                <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-eden-green">About Eden</p>
                <div className="grid gap-3 pl-3">
                  {aboutLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-base text-charcoal-light hover:text-mauve">{link.label}</Link>)}
                </div>
              </div>

              <div className="border-b border-stone-border/40 pb-5">
                <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-eden-green">Our Nurseries</p>
                <div className="grid gap-3 pl-3">
                  <Link href="/locations" onClick={() => setMobileOpen(false)} className="text-base text-charcoal-light hover:text-mauve">All nurseries</Link>
                  {BUSINESS.locations.map((location) => (
                    <Link key={location.slug} href={`/locations/${location.slug}`} onClick={() => setMobileOpen(false)} className="text-base text-charcoal-light hover:text-mauve">
                      <span className="block">{location.shortName}</span>
                      <span className="mt-1 block text-xs text-charcoal-light/70">{locationSubLabel(location)}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-b border-stone-border/40 pb-5">
                <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-eden-green">Admissions</p>
                <div className="grid gap-3 pl-3">
                  {admissionsLinks.map((link) => link.enquiry ? (
                    <EnquiryButton key={`${link.href}-${link.label}`} intent="Book a tour" onOpen={() => setMobileOpen(false)} className="text-left text-base text-charcoal-light hover:text-mauve">{link.label}</EnquiryButton>
                  ) : (
                    <Link key={`${link.href}-${link.label}`} href={link.href} onClick={() => setMobileOpen(false)} className="text-base text-charcoal-light hover:text-mauve">{link.label}</Link>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-full border-2 border-mauve px-6 py-3 text-center text-sm tracking-[0.2em] text-mauve transition hover:bg-mauve hover:text-ivory"
              >
                Contact
              </Link>

              <EnquiryButton intent="Book a tour" onOpen={() => setMobileOpen(false)} className="mt-1 rounded-full bg-mauve px-6 py-3 text-center text-sm tracking-[0.2em] text-ivory shadow-lg shadow-mauve/25 transition hover:bg-mauve-dark">
                Book a tour
              </EnquiryButton>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
