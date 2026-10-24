"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { BUSINESS } from "@/data/business";
import { NURSERY_PHOTOS, NurseryPhoto } from "@/data/nursery-media";
import { EnquiryButton } from "./EnquiryModal";
import { getNurseryPhotos } from "@/sanity/lib/nursery-photos";
export function NurseryGallery({allphotos}: {allphotos: Record<string, NurseryPhoto[]>}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [slug, setSlug] = useState("croydon");
  const selected = BUSINESS.locations.find(item => item.slug === slug)!;
  const photos = allphotos[slug] ?? [];
  return <>
    <div className="grid gap-6 md:grid-cols-2">
      {BUSINESS.locations.map(location => {
        const cover = allphotos[location.slug][0];
        const hover = allphotos[location.slug][1];
        return <button key={location.slug} type="button" onClick={() => {setSlug(location.slug); dialog.current?.showModal();}}
          className="group overflow-hidden rounded-3xl border border-charcoal/10 bg-white text-left shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-eden-green">
          <span className="relative block aspect-[16/10] overflow-hidden bg-sage-soft">
            {cover ? <Image src={cover.src} alt={cover.alt} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /> : <span className="flex h-full items-center justify-center text-3xl font-light text-eden-green">Holden Park</span>}
            {hover && <Image src={hover.src} alt="" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />}
          </span>
          <span className="block p-7"><span className="block text-3xl font-light text-charcoal" style={{fontFamily:"var(--font-fraunces)"}}>{location.shortName}</span><span className="mt-3 block text-sm text-eden-green">{cover ? "View nursery photos" : "View nursery details"} →</span></span>
        </button>;
      })}
    </div>
    <dialog ref={dialog} aria-labelledby="nursery-gallery-title" className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto rounded-3xl bg-ivory p-0 text-charcoal shadow-2xl backdrop:bg-black/60" onClick={event => {if(event.target === event.currentTarget) dialog.current?.close();}}>
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-charcoal/10 bg-ivory p-5 md:p-7"><h2 id="nursery-gallery-title" className="text-2xl font-light">Inside Eden {selected.shortName}</h2><button type="button" onClick={() => dialog.current?.close()} aria-label="Close nursery gallery" className="h-11 w-11 rounded-full border border-charcoal/20">×</button></div>
      <div className="p-5 md:p-7">
        {photos.length ? <div className="grid gap-5 sm:grid-cols-2">{photos.map(photo => <figure key={photo.src}><Image src={photo.src} alt={photo.alt} width={1200} height={900} className="aspect-[4/3] w-full rounded-2xl object-cover" /><figcaption className="mt-2 text-sm text-charcoal-light">{photo.alt}</figcaption></figure>)}</div> : <p className="py-8 text-lg">New photos of Holden Park are coming soon. Book a visit to see the rooms and meet the team.</p>}
        <div className="mt-7"><EnquiryButton location={selected.shortName} intent="Book a tour" onOpen={() => dialog.current?.close()} className="inline-flex rounded-full bg-eden-green px-7 py-3 text-white">Book a tour</EnquiryButton></div>
      </div>
    </dialog>
  </>;
}
