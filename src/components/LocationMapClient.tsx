"use client";

import dynamic from "next/dynamic";

const LocationMap = dynamic(
  () => import("./LocationMap").then((module) => module.LocationMap),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-[2rem] border border-charcoal/10 bg-sage-soft/60 p-8 text-center text-sm text-charcoal-light">
        Loading nursery map…
      </div>
    ),
  },
);

export function LocationMapClient() {
  return <LocationMap />;
}
