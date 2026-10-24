import { PageHero } from "@/components/PageHero";
import { IMAGES } from "@/data/images";
import { NurseryGallery } from "@/components/NurseryGallery";
import { getNurseryPhotos } from "@/sanity/lib/nursery-photos";
export const metadata = {
  title: "Gallery | Eden Childcare Group",
  description: "Explore photos from Eden's nursery rooms in Croydon, Streatham and Rochester, and arrange a visit to your nearest nursery.",
};
  const allPhotos = await getNurseryPhotos();
export default function GalleryPage() {
  return <>
    <PageHero eyebrow="Gallery" title={<>A first look inside<br /><span className="script text-eden-green">Eden Childcare.</span></>}
      description="Choose your nursery to explore its rooms, play spaces and learning corners. Hover for a preview, or tap to see the gallery."
      image={IMAGES.homeHero} action={{href:"/contact", label:"Book a tour"}} />
    <section className="bg-ivory pb-24"><div className="mx-auto max-w-6xl px-6"><NurseryGallery allphotos={allPhotos} /></div></section>
  </>;
}
