"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BUSINESS } from "@/data/business";

type NurseryLocation = (typeof BUSINESS.locations)[number];

const locationAliases: Record<NurseryLocation["slug"], string> = {
  croydon: "south london thornton heath pawsons road cr0 cr02qa",
  streatham: "south london lambeth streatham high road sw16 sw166eg",
  rochester: "medway kent st justus clifton close me2 me22hg",
  "holden-park": "southborough tunbridge wells kent prospect road gospel hall tn4 tn40eh",
};

function normalise(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function matches(location: NurseryLocation, query: string) {
  const postcode = normalise(location.postcode);
  const searchable = normalise(
    [
      location.name,
      location.shortName,
      location.line1,
      location.line2,
      location.city,
      location.region,
      location.postcode,
      postcode.replaceAll(" ", ""),
      locationAliases[location.slug],
    ].join(" "),
  );

  return normalise(query)
    .split(" ")
    .filter(Boolean)
    .every((term) => searchable.includes(term));
}

function postcodeFrom(value: string) {
  return value.match(/\b([A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2})\b/i)?.[1]?.replace(/\s+/g, "") ?? "";
}

function distanceInKm(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
) {
  const earthRadiusKm = 6371;
  const radians = (degrees: number) => (degrees * Math.PI) / 180;
  const latitudeDelta = radians(to.lat - from.lat);
  const longitudeDelta = radians(to.lng - from.lng);
  const firstLatitude = radians(from.lat);
  const secondLatitude = radians(to.lat);
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(firstLatitude) * Math.cos(secondLatitude) * Math.sin(longitudeDelta / 2) ** 2;

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

export function HomepageNurseryLocator() {
  const [search, setSearch] = useState("");
  const [postcodeLookup, setPostcodeLookup] = useState<{
    postcode: string;
    matches: NurseryLocation[];
    status: "checking" | "ready" | "error";
    distances?: Record<string, number>;
  }>({ postcode: "", matches: [], status: "ready" });
  const query = search.trim();
  const postcode = postcodeFrom(query);

  const directMatches = useMemo(
    () => (query ? BUSINESS.locations.filter((location) => matches(location, query)) : []),
    [query],
  );

  useEffect(() => {
    if (!query || directMatches.length > 0 || !postcode) {
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setPostcodeLookup({ postcode, matches: [], status: "checking" });
      try {
        const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          setPostcodeLookup({ postcode, matches: [], status: "ready" });
          return;
        }

        const payload = (await response.json()) as {
          result?: { latitude?: number; longitude?: number } | null;
        };
        const latitude = payload.result?.latitude;
        const longitude = payload.result?.longitude;

        if (typeof latitude !== "number" || typeof longitude !== "number") {
          setPostcodeLookup({ postcode, matches: [], status: "ready" });
          return;
        }

        const origin = { lat: latitude, lng: longitude };
        const nearby = BUSINESS.locations
          .map((location) => ({
            location,
            distance: distanceInKm(origin, location.coordinates),
          }))
          .sort((first, second) => first.distance - second.distance);

        setPostcodeLookup({ postcode, matches: nearby.map(item => item.location), distances: Object.fromEntries(nearby.map(item => [item.location.slug, item.distance])), status: "ready" });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setPostcodeLookup({ postcode, matches: [], status: "error" });
      }
    }, 500);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [directMatches, postcode, query]);

  const postcodeStatus = !query || directMatches.length > 0
    ? "idle"
    : !postcode
      ? "ready"
      : postcodeLookup.postcode === postcode
        ? postcodeLookup.status
        : "checking";
  const nearbyPostcodeMatches = postcode && postcodeLookup.postcode === postcode ? postcodeLookup.matches : [];
  const matchesForSearch = directMatches.length > 0 ? directMatches : nearbyPostcodeMatches;

  return (
    <div className="w-full rounded-[1.75rem] border border-charcoal/10 bg-white/95 p-5 text-left shadow-[0_18px_55px_rgba(43,42,38,0.08)] backdrop-blur-sm sm:p-7">
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-[0.32em] text-eden-green">
          Find your nearest nursery
        </p>
        <h2
          className="mt-3 text-2xl font-light leading-tight text-charcoal sm:text-3xl"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Come and join the <span className="script text-eden-green">Eden family.</span>
        </h2>
      </div>

      <label className="relative mt-5 block">
        <span className="sr-only">Enter your address, area or postcode</span>
        <span
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-eden-green"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4.5 4.5" />
          </svg>
        </span>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          type="search"
          autoComplete="postal-code"
          placeholder="Enter your address or postcode"
          className="h-14 w-full rounded-full border border-charcoal/15 bg-white pl-12 pr-5 text-sm text-charcoal shadow-sm outline-none transition placeholder:text-charcoal-light/60 focus:border-eden-green focus:ring-4 focus:ring-eden-green/10"
        />
      </label>

      <div className={query ? "mt-4" : ""} aria-live="polite" aria-atomic="true">
        {query && postcodeStatus === "checking" && (
          <p className="text-center text-xs leading-relaxed text-charcoal-light">
            Checking for Eden nurseries near that postcode…
          </p>
        )}

        {query && postcodeStatus !== "checking" && matchesForSearch.length > 0 && (
          <>
          {postcode && directMatches.length === 0 && <p className="mb-3 text-center text-xs text-charcoal-light">Nearest first · straight-line distances from your postcode, not driving distances.</p>}
          <div className="grid gap-2 sm:grid-cols-2" aria-label="Matching Eden nurseries">
            {matchesForSearch.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="group rounded-2xl border border-charcoal/10 bg-white px-4 py-3 transition hover:border-eden-green hover:bg-sage-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eden-green"
              >
                <span className="flex items-center justify-between gap-3">
                  <span>
                    <span className="block text-sm font-medium text-charcoal group-hover:text-eden-green">
                      {location.shortName}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-charcoal-light">
                      {location.line2}, {location.postcode}
                    </span>
                    {postcode && directMatches.length === 0 && postcodeLookup.distances?.[location.slug] !== undefined && <span className="mt-1 block text-xs text-eden-green">{(postcodeLookup.distances[location.slug] / 1.609344).toFixed(1)} miles away</span>}
                  </span>
                  <span className="text-lg text-eden-green" aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
          </>
        )}

        {query && postcodeStatus === "error" && (
          <div className="rounded-2xl border border-charcoal/10 bg-white px-5 py-4 text-center">
            <p className="text-sm font-medium text-charcoal">We could not check that postcode just now</p>
            <p className="mt-1 text-xs leading-relaxed text-charcoal-light">
              Try the nursery area instead, or use View Locations below.
            </p>
          </div>
        )}

        {query && postcodeStatus === "ready" && matchesForSearch.length === 0 && (
          <div className="rounded-2xl border border-charcoal/10 bg-white px-5 py-4 text-center">
            <p className="text-sm font-medium text-charcoal">No results nearby</p>
            <p className="mt-1 text-xs leading-relaxed text-charcoal-light">
              Try Croydon, Streatham, Rochester, Tunbridge Wells or a local postcode.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
