"use client";

import Image from "next/image";
import { useState } from "react";
import { ACTIVITY_CARDS } from "@/data/business";

export function ActivityCards() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {ACTIVITY_CARDS.map((activity) => {
        const active = selected === activity.title;
        return (
          <button key={activity.title} type="button" aria-pressed={active}
            onClick={() => setSelected(active ? null : activity.title)}
            className="group relative isolate min-h-80 overflow-hidden rounded-[1.75rem] bg-sage-soft p-7 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-eden-green">
            <Image src={activity.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`-z-20 object-cover transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 ${active ? "opacity-100" : "opacity-0"}`} />
            <span className={`absolute inset-0 -z-10 bg-black/65 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 ${active ? "opacity-100" : "opacity-0"}`} />
            <span className={`block transition-colors group-hover:text-white group-focus-visible:text-white ${active ? "text-white" : "text-charcoal"}`}>
              <span className="mb-8 block text-xs uppercase tracking-[0.2em]">Discover daily life ↗</span>
              <span className="mb-3 block text-2xl font-light" style={{fontFamily:"var(--font-fraunces)"}}>{activity.title}</span>
              <span className="block text-sm leading-relaxed">{activity.summary}</span>
              <span className="mt-6 block text-xs underline underline-offset-4">{active ? "Hide photo" : "View photo"}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
