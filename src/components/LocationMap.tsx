"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { BUSINESS } from "@/data/business";

type NurseryLocation = (typeof BUSINESS.locations)[number];
type MappableLocation = NurseryLocation & {
  coordinates: { lat: number; lng: number };
};

const mappableLocations = BUSINESS.locations.filter(
  (location) => location.coordinates,
) as MappableLocation[];

const markerIcon = (number: number, selected: boolean) =>
  L.divIcon({
    className: "eden-map-marker-wrap",
    html: `<span class="eden-map-marker${selected ? " is-selected" : ""}"><span>${number}</span></span>`,
    iconSize: [38, 46],
    iconAnchor: [19, 40],
    popupAnchor: [0, -34],
  });

function MapViewport({
  locations,
  selectedLocation,
}: {
  locations: MappableLocation[];
  selectedLocation?: MappableLocation;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation) {
      map.flyTo(
        [selectedLocation.coordinates.lat, selectedLocation.coordinates.lng],
        13,
        { duration: 0.7 },
      );
      return;
    }
    if (!locations.length) return;
    const bounds = L.latLngBounds(
      locations.map((location) => [location.coordinates.lat, location.coordinates.lng]),
    );
    map.fitBounds(bounds, { padding: [38, 38], maxZoom: 11 });
  }, [locations, map, selectedLocation]);

  return null;
}

function SelectedNurseryCard({ location }: { location: MappableLocation }) {
  return (
    <aside className="rounded-[1.25rem] border border-charcoal/10 bg-white p-4 shadow-[0_16px_38px_rgba(43,42,38,0.16)]">
      <div className="flex items-start gap-3.5">
        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-[1rem] bg-sage-soft text-eden-green">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 10c0 5.2-7 10.5-7 10.5S5 15.2 5 10a7 7 0 1 1 14 0Z" />
            <circle cx="12" cy="10" r="2.2" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-eden-green">Selected nursery</p>
          <h3
            className="mt-1 text-xl font-light text-charcoal"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            {location.shortName}
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-charcoal-light">
            {location.line1}, {location.line2}, {location.city} {location.postcode}
          </p>
          <Link
            href={`/locations/${location.slug}`}
            className="mt-3 inline-flex rounded-full bg-eden-green px-4 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white transition hover:bg-sage-dark"
          >
            View nursery
          </Link>
        </div>
      </div>
    </aside>
  );
}

export function LocationMap() {
  const [selectedSlug, setSelectedSlug] = useState(
    mappableLocations[0]?.slug ?? "",
  );
  const selectedLocation =
    mappableLocations.find((location) => location.slug === selectedSlug) ??
    mappableLocations[0];

  return (
    <div className="rounded-[2rem] border border-charcoal/10 bg-surface-warm p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1
          className="text-4xl font-light leading-[1.05] text-charcoal sm:text-5xl md:text-6xl"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Find your nearest <span className="script text-eden-green">nursery.</span>
        </h1>

        <div className="-mx-1 mt-6 overflow-x-auto px-1 pb-2" aria-label="Choose a nursery">
          <div className="flex min-w-max justify-start gap-2 sm:justify-center">
            {mappableLocations.map((location) => {
              const isSelected = location.slug === selectedLocation?.slug;
              return (
                <button
                  key={location.slug}
                  type="button"
                  onClick={() => setSelectedSlug(location.slug)}
                  className={`whitespace-nowrap rounded-full border px-4 py-2.5 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eden-green sm:px-5 sm:text-sm ${
                    isSelected
                      ? "border-eden-green bg-eden-green text-white shadow-sm"
                      : "border-eden-green/25 bg-white text-charcoal hover:border-eden-green hover:bg-sage-soft"
                  }`}
                  aria-pressed={isSelected}
                  aria-controls="eden-location-map"
                >
                  {location.shortName}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {selectedLocation && (
        <div className="mt-3 md:hidden">
          <SelectedNurseryCard location={selectedLocation} />
        </div>
      )}

      <div
        id="eden-location-map"
        className="relative mt-4 overflow-hidden rounded-[1.5rem] border border-charcoal/10 bg-white shadow-[0_18px_50px_rgba(64,93,37,0.10)]"
      >
        <MapContainer
          center={[51.42, -0.05]}
          zoom={10}
          scrollWheelZoom={false}
          className="eden-map"
          aria-label="Map showing Eden Childcare nursery locations"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapViewport
            locations={mappableLocations}
            selectedLocation={selectedLocation}
          />
          {mappableLocations.map((location, index) => (
            <Marker
              key={location.slug}
              position={[location.coordinates.lat, location.coordinates.lng]}
              icon={markerIcon(index + 1, location.slug === selectedLocation?.slug)}
              eventHandlers={{ click: () => setSelectedSlug(location.slug) }}
            />
          ))}
        </MapContainer>
        {selectedLocation && (
          <div className="absolute right-5 top-5 z-[1100] hidden w-[min(22rem,calc(100%-2.5rem))] md:block">
            <SelectedNurseryCard location={selectedLocation} />
          </div>
        )}
      </div>
    </div>
  );
}
